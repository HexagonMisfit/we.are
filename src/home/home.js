window.$ = window.jQuery = require('jquery');

import {brandColors} from '../shared/theming.js';

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 3);

var target = new THREE.Object3D();
var targetZ = -15;
target.position.set(0, 0, targetZ);
var temp = target.position.clone();

var cube;
var cubeMesh;
var cubePositions = [];
var cubeRotationVelocities = [];
var cubeScale;

var width = window.innerWidth;
var height = window.innerHeight;

var mouseX = 0;
var mouseY = 0;
var halfWidth = width / 2;
var halfHeight = height / 2;

var yOffset = 30;

var lerpRate = 1/250;

$(document).ready(function () {

    function onInitHome() {
        console.log('onInit');
        var ascend1 = $('.ascend-1');
        TweenMax.to($('body'), 0.75, { autoAlpha: 1, ease: Power2.easeOut });
        TweenMax.staggerTo(ascend1, 1, { autoAlpha: 1, y: 0, ease: Power3.easeOut }, 0.1);
    }

    $('.hero-container').mousemove(onMouseMove);

    // copy initial camera rotation so we can tween from it to a new one in slo mo based on mouse movement

    function onMouseMove(event) {
        mouseX = event.clientX - halfWidth;
        mouseY = event.clientY - halfHeight;
        temp.set(mouseX / 100, -mouseY / 100, targetZ);
    }

    function lerpCameraTarget() {
        target.position.lerp(temp, lerpRate);
    }

    function toPositions() {
        TweenMax.staggerTo(cubePositions, 2, { y: '+=' + yOffset, ease: Power4.easeOut }, 0.02);
    }

    function rotate(object, speed) {
        object.rotation.x += speed[0];
        object.rotation.y += speed[1];
    }

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(brandColors.blueLight, 1);

    var cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
    var cubeMaterial = new THREE.MeshBasicMaterial({ color: brandColors.magentaDark });
    var cubeGroup = new THREE.Group();

    for (var i = 0; i < 30; i++) {

        cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube = new THREE.Object3D();
        cube.add(cubeMesh);

        cubeScale = Math.random() / 3 + 0.35;
        cube.scale.x = cubeScale;
        cube.scale.y = cubeScale;
        cube.scale.z = cubeScale;

        var x = Math.random() * 20 - 10;
        var y = Math.random() * 20 - 10 - yOffset;
        var z = Math.random() * -15;

        cube.position.set(x, y, z);

        cubePositions.push(cube.position);

        cube.rotation.y = Math.random();
        cube.rotation.x = Math.random();

        cubeGroup.add(cube);
        cubeRotationVelocities.push([Math.random() / 400, Math.random() / 400]);
    }

    scene.add(cubeGroup);

    // Animate the scene

    var animate = function () {
        requestAnimationFrame(animate);
        render();
    };

    var render = function() {
        for (var i = 0; i < cubeGroup.children.length; i++) {
            rotate(cubeGroup.children[i], cubeRotationVelocities[i]);
        }
        lerpCameraTarget();
        camera.lookAt(target.position);
        renderer.render(scene, camera);
    }

    // Draw it in the dom and add resize event listener

    $('#home-home').prepend(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('deviceorientation', onWindowResize, false);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }

    renderer.domElement.id = "header-canvas";

    onInitHome();
    animate();
    toPositions();
});