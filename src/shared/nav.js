$(document).ready(function () {

    var body = $('body');
    var navLink = $('.nav-link');
    var link = $('.link');
    var pageWipe = $('#page-wipe');
    var currentPage;
    var activeNavItem;

    function clearActiveLinkClass() {
        $(navLink).each(function(el) {
            if($(navLink[el]).hasClass('active-nav-link')) {
                $(navLink[el]).removeClass('active-nav-link');
            }
        })
    }

    function setActiveNavItem(url) {
    
        var next = url.split('/');
        activeNavItem = next[next.length - 1];
        if(activeNavItem) {
            clearActiveLinkClass();
            var activeButton = $('#'+ activeNavItem + '-button');
            activeButton.addClass('active-nav-link');
        }
    }

    function wipeIn() {
        currentPage = location.href;
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

    link.on('click', function (ev) {
        ev.preventDefault();
        if (currentPage !== ev.currentTarget.href) {
            wipeOut(ev.currentTarget.href);
        }
    });
    onInit();
    $(window).bind("pageshow", function(event) {
        if (event.originalEvent.persisted) {
            onInit();
        }
    });
});