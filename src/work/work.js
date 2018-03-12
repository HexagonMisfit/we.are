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

var projects = [
    {
        title: 'Mariposa Chandelier',
        id: '0',
        backgroundColor: brandColors.brightYellow,
        img: './assets/mariposa_1280x720.jpg',
        blurb: 'ecteturn chendelier cool apartment complex have fun with it. And then taking from his wallet an old schedule of trains he\'ll say "I told you when I came I was a stranger".'
    },
    {
        title: 'Music Visualizer',
        id: '1',
        backgroundColor: brandColors.salmonPink,
        img: './assets/daniel_sierra_project.jpg',
        blurb: 'Lorchendelier cool apartment complex have fun with it. And then taking from his wallet an old schedule of trains he\'ll say "I told you when I came I was a stranger".'
    },
    {
        title: 'Coachella VIP Party',
        id: '2',
        backgroundColor: brandColors.lavendarIsh,
        img: './assets/daniel_sierra_project.jpg',
        blurb: 'Lorem ipsum consecteturn chendelier cool apartment complex have fun with it. And then taking from his wallet an old schedule of trains he\'ll say "I told you when I came I was a stranger".'
    },
    {
        title: 'VR Ballet Experience',
        id: '3',
        backgroundColor: brandColors.seafoamGreen,
        img: './assets/daniel_sierra_project.jpg',
        blurb: 'balle fun is great in love with the modern age, last time we met an old schedule of trains he\'ll say "I told you when I came I was a stranger".'
    },
    {
        title: 'Digital Fish Tank',
        id: '4',
        backgroundColor: brandColors.blueLight,
        img: './assets/daniel_sierra_project.jpg',
        blurb: 'Lorem ipsum cons apartment complex have fun with it. And then taking from his wallet an old schedule of trains he\'ll say "I told you when I came I was a stranger".'
    },
];

$(document).ready(function () {
    var projectLinks = $('.project-li');

    var activeProject = projects[0];

    projects.forEach(function(project) {
        projectLinks.each(function(link) {
            console.log();
            if($(projectLinks[link]).attr('data') === project.id) {
                $(projectLinks[link]).children().text(project.title);
            }
        });
    })

    function setActiveProject(id) {
        activeProject = _.find(projects, { id: id });   
        $('.work-header-text').text(activeProject.title)
        $('.project-blurb').fadeOut('fast', function() {
            $('.project-blurb').text(activeProject.blurb); 
            $('.project-blurb').fadeIn(); 
        });
        $('#project-img').fadeOut('fast', function () {
            $('#project-img').attr('src', activeProject.img);
            $('#project-img').fadeIn();
        });
    }

    projectLinks.on('mouseenter', function (ev) {
        projectLinks.removeClass('active light-text');
        $(this).addClass('active light-text');
        setActiveProject($(this).attr('data'));
    });
    setActiveProject('0');
});
