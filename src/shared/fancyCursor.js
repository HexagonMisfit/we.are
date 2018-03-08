// fancy js cursor

$(document).ready(function () {

    var fancyCursor = $('#fancy-cursor');
    
    $('html').mousemove(function (ev) {
        fancyCursor.css({
            left: ev.pageX - 7,
            top: ev.pageY - 7
        });
    });
});