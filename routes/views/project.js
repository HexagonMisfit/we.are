var keystone = require('keystone');
Project = keystone.list('Project');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.data = {};

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'project';

	var backTo;

	view.on('init', function(next) {
		var urlArr = req.url.split('/');
		if(urlArr[1] === 'secret') {
			backTo = '../secret';
		} if (urlArr[1] === 'work') {
			backTo = '../work';
		}
		Project.model.findOne()
			.where('slug', urlArr[2])
			.exec(function(err, results) {				
				if(results) {
					locals.data.project = results;
					console.log('the project is ' + locals.data.project);
					next(err);
				}
			});
		
	});

	// Render the view
	view.render('project', {
		backTo: backTo,
		layout: 'project',
		scriptSrc: '../js/project.bundle.js',
		stylesSrc: '../style.css'
	});
};