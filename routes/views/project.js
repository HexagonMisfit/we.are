var keystone = require('keystone'),
	Project = keystone.list('Project');

// function handleHTML(project) {
// 	if(project.embed && project.embed.HTML) {
// 		project.embed.HTML = JSDOM.fragment(project.embed.HTML).firstChild.outerHTML;
// 		console.log(project.embed.HTML);
// 	}
// };

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.data = {};

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'project';

	view.on('init', function(next) {
		var urlArr = req.url.split('/');
		Project.model.findOne()
			.where('slug', urlArr[2]) 
			.where('secret', urlArr[1]==='secret')
			.populate('img1')
			.populate('img2')
			.populate('img3')
			.populate('video')
			.populate('embed')
			.exec(function(err, results) {				
				if(results) {
					locals.data.project = results;
				}
				next(err);
			});
	});

	// Render the view
	view.render('project', {
		layout: 'one-deep',
		scriptSrc: '../js/project.bundle.js',
		stylesSrc: '../style.css'
	});
};