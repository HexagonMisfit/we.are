var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Teammate Model
 * ==========
 */
var Teammate = new keystone.List('Teammate');

Teammate.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	role: {type: Types.Text, max: 30, initial: true, required: true, index: true, default: ''},
	profile: {type: Types.Textarea, max: 400, initial: true, required: true, index: true, default: ''}
});


/**
 * Registration
 */
Teammate.defaultColumns = 'name, email, role, profile';
Teammate.register();