var routes = ['home', 'team', 'work', 'contact', 'vr'];

$(document).ready(function () {

    function loadAll() {
        routes.forEach(function (route) {
            var routeContainer = $('#' + route + '-container');
            routeContainer.hide();
            return routeContainer.load('./templates/' + route + '.html');
        });
    }

    var navLink = $('.nav-link');

    var pageWipe = $('#page-wipe');
    function wipeIn() {
        TweenMax.to(pageWipe, 0.75, { width: 0, bottom: '100%', left: '100%', ease: Power4.easeIn });
    };

    function wipeOut(current, next) {
        function loadNext() {
            $('#' + current + '-container').hide();
            $('#' + next + '-container').show();
            wipeIn();
        }
        TweenMax.to(pageWipe, 0, { top: 0, left: 0, bottom: 0, height: '100%', width: 0 });
        TweenMax.to(pageWipe, 0.75, { right: 0, width: '100%', ease: Power4.easeIn, onComplete: loadNext });
    }

    window.onhashchange = function (ev) {
        let current = ev.oldURL.split('#')[1];
        let next = ev.newURL.split('#')[1];

        var activeNavLink = $('.active-nav-link');
        activeNavLink.removeClass('active-nav-link');
        $('#' + next + '-button').addClass('active-nav-link');

        wipeOut(current, next);
    }

    function onInit() {
        $.when(loadAll()).then(function () {
            if (!window.location.hash) {
                window.location = '#home';
                $('#home-button').addClass('active-nav-link');
                $('#home-container').show();
            }
            else {
                var hash = window.location.hash.split('#')[1];
                $('#' + hash + '-button').addClass('active-nav-link');
                $('#' + hash + '-container').show();
            }
            wipeIn();
        });
    }

    onInit();
});