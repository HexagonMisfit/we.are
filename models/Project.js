var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Project Model
 * ==========
 */
var Project = new keystone.List('Project');

Project.add({
	title: {type: String, required: true, initial: true, unique: true, index: true, default: ''},
	slug: {type: String, required: true, initial: true, unique: true, index: true, default: ''},
	p1: {type: Types.Textarea, max: 400, initial: true, required: true, index: true, default: ''},
	p2: {type: Types.Textarea, max: 400, initial: true, required: true, index: true, default: ''},
	p3: {type: Types.Textarea, max: 400, initial: true, required: true, index: true, default: ''},
	secret: {type: Types.Boolean, initial: true, default: false}
});


/**
 * Registration
 */
Project.defaultColumns = 'title, slug, p1, p2, p3, secret';
Project.register();