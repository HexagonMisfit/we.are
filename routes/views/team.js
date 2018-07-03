var keystone = require('keystone'),
	Teammate = keystone.list('Teammate');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'team';
	locals.data = {};

	view.on('init', function(next) {
		Teammate.model.find()
			.populate('profilePic')
			.exec(function(err, results) {
				locals.data.teammates = results;
				next(err);
			});
	});

	// Render the view
	
	view.render('team', {
		layout: 'base',
		scriptSrc: 'js/team.bundle.js',
		stylesSrc: './style.css'
	});
};
