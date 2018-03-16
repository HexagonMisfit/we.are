
// vendor files
window.$ = window.jQuery = require('jquery');

// our scripts
import { brandColors } from './theming.js';


/**************/
/* Navigation */
/**************/

$(document).ready(function () {
    var pageWipe = $('#page-wipe');

    function wipeIn() {
        // TweenMax.to(pageWipe, 0, {backgroundColor: brandColors.nearWhite});
        TweenMax.to(pageWipe, 0.75, { width: 0, bottom: '100%', left: '100%', ease: Power4.easeIn });
    };

    function wipeOut(ev) {
        function navigate() {
            window.location = ev.currentTarget.href;
        }
        TweenMax.to(pageWipe, 0, {top: 0, left: 0, bottom: 0, height: '100%', width: 0});
        TweenMax.to(pageWipe, 0.75, {right: 0, width: '100%', ease: Power4.easeIn, onComplete: navigate});
    }

    function onInit() {
        wipeIn();
    }

    onInit();

    function navigateTo(position) {
        //transition out of current page and navigate to other pages

    }

    var navLink = $('.nav-link');

    navLink.click(function (ev) {
        ev.preventDefault();
        console.log($(this));
        wipeOut(ev);
    });
});

