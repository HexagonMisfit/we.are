// vendor js files
window.$ = window.jQuery = require('jquery');
window._ = require('lodash');

// assets
require('./assets/daniel_sierra_project.jpg');

// our scripts
import '../shared/nav.js';
import '../shared/workAnimation.js';
import '../shared/scroll.js';

// import our scss last
import '../shared/styles/main.scss';

console.log('project');
