var $ = window.$ = window.jQuery = require('jquery');

// carousel
import 'slick-carousel';
import '../../node_modules/slick-carousel/slick/slick.scss';
import '../../node_modules/slick-carousel/slick/slick-theme.scss';

import venobox from 'venobox';
// import '../../node_modules/venobox/venobox/venobox.css';

var playButton = require('../assets/img/play_svg.svg');

$(function () {
    $('.play-button').attr('src', playButton);

    $('#home-projects-container').slick({
        dots: true,
        slidesToShow: 1,
        arrows: true,
        infinite: false
    });

    $('#team-slider').slick({
        dots: false,
        slidesToShow: 4,
        arrows: true,
        infinite: false,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 733,
                settings: {
                    slidesToShow: 1,
                    centerMode: true
                }
            },
            {
                breakpoint: 490,
                settings: {
                    slidesToShow: 1,
                    centerMode: false
                }
            }
        ]
    });
    $('.venobox').venobox();
});

