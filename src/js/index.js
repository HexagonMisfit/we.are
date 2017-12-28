// vendor js files
var $ = require('jquery');
var _ = require('lodash');
import { brandColors } from './theming.js';
import { TweenMax, TimelineLite } from '../../node_modules/gsap/TweenMax.js';
import ScrollMagic from 'ScrollMagic';
import '../../node_modules/scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js';

// our scripts
import './anim.js';
import '../sass/main.scss';

$(function () {

    /**************/
    /* UI Stuff */
    /**************/

    // Check if user is using iPhone; if so, use iOS default scrolling behavior for now
    // TODO: Dopify mobile experience by 50%

    function isMobile() {
        var Uagent = navigator.userAgent || navigator.vendor || window.opera;
        return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(Uagent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(Uagent.substr(0, 4)));
    };

    /**************/
    /* Navigation */
    /**************/

    // Store info about the various pages. This will be a single page application, 
    // so all pages except for the active one will need to be hidden.

    var pages = {
        home: {
            sections: ['hero', 'contact'],
            name: 'home',
            backgroundColor: brandColors.blueDark,
            transitionTextColor: brandColors.nearWhite
        },
        work: {
            sections: ['project1'],
            name: 'work',
            backgroundColor: brandColors.nearBlack,
            transitionTextColor: brandColors.brightYellow
        },
        team: {
            sections: ['team'],
            name: 'team',
            backgroundColor: brandColors.magentaLight,
            transitionTextColor: brandColors.blueLight
        },
        vr: {
            sections: ['vr'],
            name: 'vr',
            backgroundColor: brandColors.brightYellow,
            transitionTextColor: brandColors.magentaLight
        }
    };

    var activePage = pages.home;

    var viewSection = 0;
    var backgroundPlane;

    var scrollControl = new ScrollMagic.Controller();
    var scrollScene = new ScrollMagic.Scene({
        triggerElement: '#main-nav',
        triggerHook: 0,
        reverse: false
    })
    .setClassToggle("#main-nav", "fixed-nav")
        // .addIndicators()
        .addTo(scrollControl);

    function initHome() {
        _.forIn(pages, function (page) {
            TweenMax.to($('#' + page.name + '-container'), 0, { autoAlpha: 0 });
            TweenMax.to($('#' + page.name + '-flash-text'), 0, { autoAlpha: 0 });
            TweenMax.to('.navigation', 0.25, { autoAlpha: 0.97, ease: Power3.easeIn });
            TweenMax.to($('#' + activePage.name + '-container'), 0.25, { autoAlpha: 1, ease: Power3.easeIn });
            TweenMax.to($('#' + activePage.name + '-button'), 0.1, { className: '+= nav-link-active' });
        });
    }

    initHome();

    // Navigate between pages and animate page transitions

    function navigateTo(name) {

        var currentPageContainer = $('#' + activePage.name + '-container');
        var nextPageContainer = $('#' + name + '-container');

        var currentActiveNavButton = $('#' + activePage.name + '-button');
        var nextActiveNavButton = $('#' + name + '-button');

        var navArray = _.keys(pages);

        function flashNextSection() {
            var activeFlashSection = $('#' + name + '-flash');
            var activeFlashText = $('#' + name + '-flash-text');

            console.log(activeFlashSection);
            console.log(activeFlashText);

            var tl = new TimelineLite();

            // set flash container background color and text color

            tl.to(activeFlashSection, 0, { backgroundColor: activePage.backgroundColor })
                .to(activeFlashText, 0, { color: activePage.transitionTextColor })

                // show flash container and hide current page/nav

                .to(currentPageContainer, 0, { autoAlpha: 0 }, 0)
                .to(activeFlashSection, 0, { autoAlpha: 1 }, 0)
                .to(activeFlashText, 0, { autoAlpha: 1 }, 0)
                .to('.home-nav', 0, { autoAlpha: 0 }, 0)

                // flash through some different colors

                .to(activeFlashSection, 0, { backgroundColor: activePage.transitionTextColor }, 0.5)
                .to(activeFlashText, 0, { color: activePage.backgroundColor }, 0.5)
                .to(activeFlashSection, 0, { backgroundColor: pages[name].backgroundColor }, 1)
                .to(activeFlashText, 0, { color: pages[name].transitionTextColor }, 1)

                // hide flash section, show next section

                .to(activeFlashSection, 0, { autoAlpha: 0 }, 1.5)
                .to(activeFlashText, 0, { autoAlpha: 0 }, 1.5)
                .to(nextPageContainer, 0, { autoAlpha: 1 }, 1.5)
                .to('.home-nav', 0, { autoAlpha: 0.95 }, 1.5);
        }

        // Apply active nav button class to next active nav, remove it from current one

        removeActiveNavClass(currentActiveNavButton);
        addActiveNavClass(nextActiveNavButton);

        // Determine index of active page and next page in navArray.
        // TweenMax.to(currentPageContainer, 0, { autoAlpha: 0 });
        // TweenMax.to(nextPageContainer, 0.5, { autoAlpha: 1, ease: Power2.easeIn });
        flashNextSection();


        activePage = pages[name];
    }

    var navLink = $('.nav-link');

    function addActiveNavClass(element) {
        element.addClass('nav-link-active');
    }

    function removeActiveNavClass(element) {
        element.removeClass('nav-link-active');
    }

    navLink.click(function () {
        console.log('clicked navLink', this.id);

        if (this.id === 'home-button') {
            navigateTo('home');
        }
        if (this.id === 'work-button') {
            navigateTo('work');
        }
        if (this.id === 'team-button') {
            navigateTo('team');
        }
        if (this.id === 'vr-button') {
            navigateTo('vr');
        }
    });

    navLink.mousedown(function () {
        this.add
    });

    navLink.mouseup(function () {
        TweenMax.to(this, 0.1, { className: '-=nav-link-clicked' });
    });

    /**********************/
    /* Home page UI stuff */
    /**********************/

});