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
	blurb: {type: Types.Textarea, max: 400, required: true, default: ''},
	p1: {type: Types.Textarea, max: 400},
	p2: {type: Types.Textarea, max: 400},
	p3: {type: Types.Textarea, max: 400},
	img1: {type: Types.Relationship, ref: 'FileUpload', required: true, initial: false},
	img2: {type: Types.Relationship, ref: 'FileUpload'},
	img3: {type: Types.Relationship, ref: 'FileUpload'},
	video: {type: Types.Relationship, ref: 'FileUpload'}
});


/**
 * Registration
 */
Project.defaultColumns = 'title, secret, slug';
Project.register();