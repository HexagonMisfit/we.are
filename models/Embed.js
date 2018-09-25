var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Embed = new keystone.List('Embed');

Embed.add({
	name: { type: Types.Key, required: true, index: true, initial: true },
	HTML: { type: Types.Html, initial: true, required: true, unique: true, index: true, wysiwyg: false }
});

/**
 * Registration
 */
Embed.defaultColumns = 'name, HTML';
Embed.register();