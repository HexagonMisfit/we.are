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
	blurb: {type: Types.Textarea, max: 400, initial: true, index: true, default: ''},
	p1: {type: Types.Textarea, max: 400},
	p2: {type: Types.Textarea, max: 400},
	p3: {type: Types.Textarea, max: 400},
	thumb: {type: Types.Relationship, required: true, initial: true, ref: 'FileUpload'},
	img1: {type: Types.Relationship, ref: 'FileUpload'},
	img2: {type: Types.Relationship, ref: 'FileUpload'},
	img3: {type: Types.Relationship, ref: 'FileUpload'},
	video: {type: Types.Relationship, ref: 'FileUpload'},
	secret: {type: Types.Boolean, default: false},
	order: {type: Number, required: true, initial: true}
});


/**
 * Registration
 */
Project.defaultColumns = 'title, secret, slug, order';
Project.register();