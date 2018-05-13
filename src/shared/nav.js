$(document).ready(function () {

    var body = $('body');
    var navLink = $('.nav-link');
    var pageWipe = $('#page-wipe');
    var currentPage = location.href;
    var activeNavItem;

    function setActiveNavItem(url) {
        var current = currentPage.split('/');
        currentNavItem = current[current.length - 1];
        if(currentNavItem) {
            thisButton = $('#' + currentNavItem + '-button');
            thisButton.removeClass('active-nav-link');
        }

        var next = url.split('/');
        activeNavItem = next[next.length - 1];
        if(activeNavItem) {
            var activeButton = $('#'+ activeNavItem + '-button');
            activeButton.addClass('active-nav-link');
        }
    }

    function wipeIn() {
        TweenMax.to(body, 0.0, {autoAlpha: 1});
        setActiveNavItem(currentPage);
        TweenMax.to(pageWipe, 0.65, { width: 0, bottom: '100%', left: '100%', ease: Power4.easeIn });
    };

    function wipeOut(next) {
        function loadNext() {
            location.href = next;
        }
        setActiveNavItem(next);
        TweenMax.to(pageWipe, 0, { top: 0, left: 0, bottom: 0, width: 0 });
        TweenMax.to(pageWipe, 0.65, { top: 0, left: 0, bottom: 0, right: 0, width: '100%', ease: Power4.easeIn, onComplete: loadNext });
    }

    function onInit() {
        wipeIn();
    }

    navLink.on('click', function (ev) {
        console.log(ev);
        ev.preventDefault();
        if (currentPage !== ev.currentTarget.href) {
            wipeOut(ev.currentTarget.href);
        }
    });
    onInit();
});