var keystone = require('keystone'),
	Project = keystone.list('Project');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.data = {};

	// locals.section is used to set the currently selected
	// item in the header navigation.

	locals.section = 'work';

	view.on('init', function(next) {

		if(req.url.indexOf('secret') > -1) {
			Project.model.find()
				.sort('secret')
				.exec(function(err, results) {
					locals.data.projects = results;
					next(err);
				});
		} else {
			Project.model.find()
				.where('secret', false)
				.exec(function(err, results) {
					locals.data.projects = results;
					next(err);
				});
		}
	});

	// Render the view
	
	view.render('work', {
		layout: 'base',
		scriptSrc: 'js/work.bundle.js',
	});
};
