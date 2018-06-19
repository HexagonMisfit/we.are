/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('routes', middleware.trailingSlashes);
keystone.pre('render', middleware.flashMessages);

// Redirect to specified url after signin

keystone.set('signin redirect', function(user, req, res){
  var url = (user.isAdmin) ? '/keystone' : req.url;
  res.redirect(url);
});

// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function (app) {

	// Views

	app.get('/', routes.views.home);

	app.get('/vr', routes.views.vr);

	app.get('/contact', routes.views.contact);

	app.get('/team', routes.views.team);

	app.get('/work/:id', routes.views.project);

	app.get('/work', routes.views.work);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:

	app.all('/secret*', middleware.requireUser);

	app.get('/secret/:id', routes.views.project);

	app.get('/secret', routes.views.work);

};
