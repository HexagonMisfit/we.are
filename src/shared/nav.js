var routes = ['home', 'team', 'work', 'contact'];

$(document).ready(function () {

    var navLink = $('.nav-link');
    var pageWipe = $('#page-wipe');

    function loadAll() {
        TweenMax.to(pageWipe, 0, { width: '100%', bottom: 0, left: 0, top: 0, right: 0 });
        routes.forEach(function (route) {
            var routeContainer = $('#' + route + '-container');
            routeContainer.hide();
            return routeContainer.load('./templates/' + route + '.html');
        });
    }

    function wipeIn(current, next) {
        $('#' + current + '-container').hide();
        $('#' + next + '-container').show();
        TweenMax.to(pageWipe, 0.65, { width: 0, bottom: '100%', left: '100%', ease: Power4.easeIn });
    };

    function wipeOut(current, next) {
        function loadNext() {
            wipeIn(current, next);
        }
        TweenMax.to(pageWipe, 0, { top: 0, left: 0, bottom: 0, height: '100%', width: 0 });
        TweenMax.to(pageWipe, 0.65, { right: 0, width: '100%', ease: Power4.easeIn, onComplete: loadNext });
    }

    window.onhashchange = function (ev) {
        let current = ev.oldURL.split('#')[1];
        let next = ev.newURL.split('#')[1];
        if(!current) {
            current = 'home';
        }
        var activeNavLink = $('.active-nav-link');
        activeNavLink.removeClass('active-nav-link');
        $('#' + next + '-button').addClass('active-nav-link');

        wipeOut(current, next);
    }

    function onInit() {
        $.when(loadAll()).then(function () {
            var hash = window.location.hash.split('#')[1];
            if (hash) {
                $('#' + hash + '-button').addClass('active-nav-link');
                $('#' + hash + '-container').show();
                wipeIn('home', hash);
            } else {
                wipeIn('home', 'home');
            }
        });
    }

    onInit();

});