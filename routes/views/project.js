var keystone = require('keystone');
Project = keystone.list('Project');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.data = {};

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'project';

	view.on('init', function(next) {
		var urlArr = req.url.split('/');
		if(urlArr[1] === 'secret') {
			Project.model.findOne()
				.where('slug', urlArr[2])
				.exec(function(err, results) {
					if(results && results.length) {
						locals.data.project = results[0];
					}
					next(err);
				});
		} else {
			Project.model.find()
				.where('secret', false)
				.where('slug', urlArr[2])
				.exec(function(err, results) {
					if(results && results.length) {
						locals.data.project = results[0];
					}
					next(err);
				});
		}
	});

	// Render the view
	view.render('project', {
		layout: 'base',
		scriptSrc: '../js/project.bundle.js',
		stylesSrc: '../style.css'
	});
};