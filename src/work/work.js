// vendor js files
window.$ = window.jQuery = require('jquery');
window._ = require('lodash');

// assets
require('./assets/daniel_sierra_project.jpg');
require('./assets/mariposa_1280x720.jpg');
require('./assets/play_svg.svg');

// our scripts
import '../shared/nav.js';
import './workAnimation.js';

// import our scss last
import '../sass/main.scss';

var projects = [
    {
        title: 'Mariposa Chandelier',
        href: 'work/mariposa.html',
        id: '01',
        img: './assets/mariposa_1280x720.jpg',
        blurb: 'Ecteturn chendelier cool apartment complex have fun with it. Gibberish filler content to look real and explain space taken up by blurb element. Life is much better when spent with friends and close colleagues, is what they say.',
        stats: {
            "Location": "Denver, CO",
            "Technologies used": "Unity, Processing, Custom-built LED arrays",
            "Year": "2014"
        }
    },
    {
        title: 'Music Visualizer',
        href: 'work/music-visualizer.html',
        id: '02',
        img: './assets/daniel_sierra_project.jpg',
        blurb: 'The champagne room on Christmas Eve is not really the time or place for ideological battles. Ok etc, have fun, etc, then taking from his wallet an old schedule of trains he\'ll say "I told you when I came I was a stranger".',
        stats: {
            "Location": "Anywhere and everywhere",
            "Technologies used": "Processing, MIDI Controllers",
            "Year": "Ongoing"
        }
    },
    {
        title: 'Coachella VIP Party',
        href: 'work/coachella-vip-party.html',
        id: '03',
        img: './assets/mariposa_1280x720.jpg',
        blurb: 'Rock climbing can be a very challenging and rewarding adventure, but the risks are multiplied to the extent that intoxicants are involved. Having fun with technology is a likely outcome of learning to write code.',
        stats: {
            "Location": "Indio, CA",
            "Technologies used": "Xbox Kinect, Processing, Computer vision software",
            "Year": "2015"
        }
    },
    {
        title: 'VR Ballet Experience',
        href: 'work/vr-ballet-experience.html',
        id: '04',
        img: './assets/daniel_sierra_project.jpg',
        blurb: 'Ballet fun is great in love with the modern age, office of smellography kicks in when you know your time is right to get level-headed and exit stage left. Smoking prohibited in cockpit of spacecraft.',
        stats: {
            "Location": "Seattle, WA",
            "Technologies Used": "Unity, HTC Vive, Cinema 4D, Motion capture",
            "Year": "2017"
        }
    },
    {
        title: 'Digital Fish Tank',
        href: 'work/digital-fish-tank.html',
        id: '05',
        img: './assets/mariposa_1280x720.jpg',
        blurb: 'Lorem ipsum consectetur halogen ipso facto. And then taking from his wallet an old schedule of trains, a big sandwich made of cookie dough deep fried in fat carved from last night\'s roast. Billy Grippo top eastside producer.',
        stats: {
            "Location": "Hillsboro, OR",
            "Technologies Used": "Unity, Computer vision technology",
            "Year": "2017"
        }
    }
];

$(document).ready(function () {
    var projectLinks = $('.project-li');

    var activeProject = {};

    projects.forEach(function (project) {
        projectLinks.each(function (link) {
            if ($(projectLinks[link]).attr('data') === project.id) {
                $(projectLinks[link]).children().text(project.title);
                $(projectLinks[link]).children().attr('href', project.href);
            }
        });
    });

    function setActiveProject(id) {
        if (id !== activeProject.id) {
            activeProject = _.find(projects, { id: id });
            $('.work-header-text').fadeOut('fast', function () {
                $('.work-header-text').text(activeProject.title);
                $('.work-header-text').fadeIn();
            });
            $('.project-number').text(activeProject.id);
            $('.project-blurb').fadeOut('fast', function () {
                $('.project-blurb').text(activeProject.blurb);
                $('.project-blurb').fadeIn();
            });
            $('#project-img').fadeOut('fast', function () {
                $('#project-img').attr('src', activeProject.img);
                $('#project-img').fadeIn();
            });
            $('.project-stats').fadeOut('fast', function () {
                var keys = Object.keys(activeProject.stats);
                for (var i = 0; i < keys.length; i++) {
                    $('#stat-' + i.toString() + '-key').text(keys[i]);
                    $('#stat-' + i.toString() + '-value').text(activeProject.stats[keys[i]]);
                }
                $('.project-stats').fadeIn();
            });
        }
    }

    projectLinks.on('mouseenter', function (ev) {
        projectLinks.removeClass('active light-text');
        $(this).addClass('active light-text');
        setActiveProject($(this).attr('data'));
    });
    setActiveProject('01');
});
