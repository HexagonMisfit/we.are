import { brandColors } from './theming.js';
import { TweenMax } from '../../node_modules/gsap/TweenMax';
var $ = require('jquery');
var _ = require('lodash');

/**********************************************************************/
/* THREE.JS code initialize scene, draw basic floating blueLight cube */
/**********************************************************************/
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var cubes = [];
camera.position.z = 5;
var lookAtPosition = new THREE.Vector3();
var mousePos = new THREE.Vector3();

window.addEventListener('mousemove', _.throttle(onMouseMove, 100));
var width = window.innerWidth;
var height = window.innerHeight;

// copy initial camera rotation so we can tween from it to a new one in slo mo based on mouse movement

var startRotation = new THREE.Euler().copy(camera.rotation);

function onMouseMove(event) {
    TweenMax.to(mousePos, 5, {x: (event.clientX / width) * 2 - 1});
    TweenMax.to(mousePos, 5, {y: -((event.clientY / height) * 2 - 1)});
}

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(brandColors.magentaDark, 1);
document.body.appendChild(renderer.domElement);

var cubeGeometry = new THREE.BoxGeometry(3, 3, 3);

for (var i = 0; i < 100; i++) {

    var cubeMaterial = new THREE.MeshBasicMaterial({ color: brandColors.blueLight });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cube.position.x = (Math.random() * 20) - 10;
    cube.position.y = (Math.random() * 20) - 10;
    cube.position.z = (Math.random() * 8) - 4;

    var cubeScale = Math.random() / 3 + 0.05;

    cube.scale.x = cubeScale;
    cube.scale.y = cubeScale;
    cube.scale.z = cubeScale;

    cube.rotation.y = Math.random();
    cube.rotation.x = Math.random();

    cube.yVelocity = (0.5 - Math.random()) / 1000;
    cube.xVelocity = (0.5 - Math.random()) / 1000;

    cube.xRotationRate = Math.random() / 400;
    cube.yRotationRate = Math.random() / 400;

    cubes.push(cube);
    scene.add(cube);
}

// Animate the scene

var animate = function () {
    requestAnimationFrame(animate);
    lookAtPosition.x = mousePos.x;
    lookAtPosition.y = mousePos.y;
    for (var i = 0; i < cubes.length; i++) {
        cubes[i].position.z -= 0.0001;
        cubes[i].position.x += cubes[i].xVelocity;
        cubes[i].position.y += cubes[i].yVelocity;
        cubes[i].rotation.x += cubes[i].xRotationRate;
        cubes[i].rotation.y += cubes[i].yRotationRate;;
    }
    camera.lookAt(lookAtPosition);
    renderer.render(scene, camera);
};

animate();

// Draw it on a canvas fixed behind everything in the site

$('canvas').addClass('fixed-canvas');