import { brandColors } from './theming.js';
import '../assets/video/Merica.mp4';

AFRAME.registerComponent('foo', {
    init: function() {
        
    }
});

$(function () {
    var sceneEl = document.querySelector('a-scene');
    var videoBottomLeft = document.querySelector('#video-bottom-left');
    var videoBottomCenter = document.querySelector('#video-bottom-center');
    var videoBottomRight = document.querySelector('#video-bottom-right');
    var videoTopLeft = document.querySelector('#video-top-left');
    var videoTopCenter = document.querySelector('#video-top-center');
    var videoTopRight = document.querySelector('#video-top-right');
    var mariposaVid = document.querySelector('#mariposa-chandelier');

    var fooComponent = document.querySelector('#foo');
    fooComponent.setAttribute('foo');
    
    videoBottomLeft.addEventListener('click', playVideo);
    videoBottomCenter.addEventListener('click', playVideo);
    videoBottomRight.addEventListener('click', playVideo);
    videoTopLeft.addEventListener('click', playVideo);
    videoTopCenter.addEventListener('click', playVideo);
    videoTopRight.addEventListener('click', playVideo);

    function playVideo(video) {
        if (mariposaVid.paused === true) {
            mariposaVid.play();
        } else {
            mariposaVid.pause();
        }
    }
});
