// vendor js files
window.$ = window.jQuery = require('jquery');

// assets
require('./assets/daniel_sierra_project.jpg');
require('./assets/mariposa_1280x720.jpg');
require('./assets/play_svg.svg');

// our scripts
import { brandColors } from '../shared/theming.js';
import '../shared/nav.js';
import '../shared/fancyCursor.js';

// sass
import '../sass/main.scss';

$(document).ready(function() {
    var projectLink = $('.project-li');

    projectLink.on('click', function(ev) {
        projectLink.removeClass('active');
        $(this).addClass('active');
        
    });
});
