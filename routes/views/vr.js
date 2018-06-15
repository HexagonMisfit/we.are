var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'vr';

	// Render the view
	console.log('rendering vr');
	view.render('vr', {
		layout: 'vr',
		scriptSrc: 'js/vr.bundle.js'
	});
};