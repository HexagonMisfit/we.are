/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
		{ label: 'Work', key: 'work', href: '/work' },
		// { label: 'Team', key: 'team', href: '/team' },
		{ label: 'Contact', key: 'contac', href: '/contact' },
		// { label: 'VR', key: 'vr', href: '/vr' }
	];
	res.locals.user = req.user;
	next();
};

exports.trailingSlashes = function (req, res, next) {
  const test = /\?[^]*\//.test(req.url);
  if (req.url.substr(-1) === '/' && req.url.length > 1 && !test) {
  	res.redirect(301, req.url.slice(0, -1));
  }
  else
    next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		if(req.url) {
            res.redirect('/keystone/signin?from='+req.url);
        } else {
            res.redirect('/keystone/signin');
        }
	} else {
		next();
	}
};

