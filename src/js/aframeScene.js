import { brandColors } from './theming.js';
import '../assets/video/Merica.mp4';

AFRAME.registerComponent('foo', {
    init: function() {
        console.log('debug foo component');
    }
});

$(function () {
    var sceneEl = document.querySelector('a-scene');
    var videoLeft = document.querySelector('#video-left');
    var videoRight = document.querySelector('#video-right');
    var mariposaVid = document.querySelector('#mariposa-chandelier');

    var fooComponent = document.querySelector('#foo');
    fooComponent.setAttribute('foo');
    
    videoLeft.addEventListener('click', playVideo);
    videoRight.addEventListener('click', playVideo);

    function playVideo(video) {
        if (mariposaVid.paused === true) {
            mariposaVid.play();
        } else {
            mariposaVid.pause();
        }
    }
});
