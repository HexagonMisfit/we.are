import { brandColors } from './theming.js';
// import { TweenMax, TimelineLite } from '../../node_modules/gsap/TweenMax';
// var $ = require('jquery');
// var _ = require('lodash');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var cube;
var cubeMesh;
var cubePositions = [];
var cubeRotationVelocities = [];
var cubeScale;
camera.position.z = 5;
var mousePos = new THREE.Vector3();

var width = window.innerWidth;
var height = window.innerHeight;
var yOffset = 30;

$(document).ready(function () {

    $('.hero-container').mousemove(_.throttle(onMouseMove, 100));

    // copy initial camera rotation so we can tween from it to a new one in slo mo based on mouse movement

    function onMouseMove(event) {
        var tempX = (event.clientX / width) * 2 - 1;
        var tempY = -((event.clientY / height) * 2 - 1);
        TweenMax.to(mousePos, 5, {
            x: tempX,
            y: tempY,
            onUpdate: function () {
                camera.lookAt(mousePos);
            }
        });
    }

    function toPositions() {
        TweenMax.staggerTo(cubePositions, 1.5, { y: '+=' + yOffset, ease: Power4.easeOut }, 0.02);
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

        cube.position.x = (Math.random() * 26) - 13;
        cube.position.y = (Math.random() * 26) - 13 - yOffset;
        cube.position.z = (Math.random() * 8) - 9;

        cubePositions.push(cube.position);

        cube.rotation.y = Math.random();
        cube.rotation.x = Math.random();

        cubeGroup.add(cube);
        cubeRotationVelocities.push([ Math.random() / 400, Math.random() / 400 ]);
    }

    scene.add(cubeGroup);

    // Animate the scene

    var animate = function () {
        requestAnimationFrame(animate);
        for (var i = 0; i < cubeGroup.children.length; i++) {
            rotate(cubeGroup.children[i], cubeRotationVelocities[i]);
        }
        renderer.render(scene, camera);
    };

    animate();
    toPositions();

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
});