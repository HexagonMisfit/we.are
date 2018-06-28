var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * File Upload Model
 * ===========
 * A database model for uploading images to the local file system
 */

var FileUpload = new keystone.List('FileUpload');

var myStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: keystone.expandPath('./public/uploads/files'), // required; path where the files should be stored
    publicPath: '/public/uploads/files', // path where files will be served
  }
});

FileUpload.add({
  name: { type: Types.Key, index: true},
  file: {
    type: Types.File,
    storage: myStorage,
  },
  url: {type: String, default: '/public/uploads/files/'}
});


FileUpload.defaultColumns = 'name, url';
FileUpload.register();