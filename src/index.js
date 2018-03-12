// vendor js files
window.$ = window.jQuery = require('jquery');

// our scripts
import { brandColors } from './shared/theming.js';
import './anim.js';
import './shared/nav.js';
import './shared/fancyCursor.js';

// import our scss last
import './sass/main.scss';

var body = $('body');

$(function () {

    /**************/
    /* UI Stuff */
    /**************/

    function onInit() {
        var ascend1 = $('.ascend-1');
        TweenMax.to(body, 0.75, { autoAlpha: 1, ease: Power2.easeOut });
        TweenMax.staggerTo(ascend1, 1, { autoAlpha: 1, y: 0, ease: Power3.easeOut }, 0.1);
    }

    var scrollControl = new ScrollMagic.Controller();

    var fadeAndRiseTween1 = TweenMax.staggerTo('.fade-1', 0.8, {autoAlpha: 1, y: 0, ease: Power4.easeOut }, 0.1);
    var fadeAndRiseScene1 = new ScrollMagic.Scene({
        triggerHook: 0.8,
        triggerElement: '#trigger-1',
        reverse: false
    })
        .setTween(fadeAndRiseTween1)
        .addTo(scrollControl);

    var fadeAndRiseTween2 = TweenMax.staggerTo('.fade-2', 0.8, { autoAlpha: 1, y: 0, ease: Power4.easeOut }, 0.1);
    var fadeAndRiseScene2 = new ScrollMagic.Scene({
        triggerHook: 0.8,
        triggerElement: '#trigger-2',
        reverse: false
    })
        .setTween(fadeAndRiseTween2)
        .addTo(scrollControl);

    var fadeAndRiseTween3 = TweenMax.staggerTo('.fade-3', 0.8, { autoAlpha: 1, y: 0, ease: Power4.easeOut }, 0.1);
    var fadeAndRiseScene3 = new ScrollMagic.Scene({
        triggerHook: 0.8,
        triggerElement: '#trigger-3',
        reverse: false
    })
        .setTween(fadeAndRiseTween3)
        .addTo(scrollControl);

    onInit();
});