import { TweenMax } from '../../node_modules/gsap/TweenMax.js';
import { brandColors } from './theming.js';
var $ = require('jquery');
var _ = require('lodash');

/**********************************************************************/
/* THREE.JS code initialize scene, draw basic floating blueLight cube */
/**********************************************************************/
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
var mouse = {
    z: -20
};

window.addEventListener('mousemove', _.throttle(onMouseMove, 150));

// copy initial camera rotation so we can tween from it to a new one in slo mo based on mouse movement

var startRotation = new THREE.Euler().copy(camera.rotation);

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (event.clientY / window.innerHeight) * 2 - 1;

    // set a camera rotation value to tween to

    TweenMax.to(camera.rotation, 7.5, { x: startRotation.y - mouse.y / 5, y: startRotation.x - mouse.x / 5 });
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

    cube.name = 'cube' + i;

    scene.add(cube);
}

// Animate the scene

var animate = function () {
    requestAnimationFrame(animate);
    _.forEach(scene.children, function (object) {
        object.position.z -= 0.0001;
        object.position.x += object.xVelocity;
        object.position.y += object.yVelocity;
        object.rotation.x += object.xRotationRate;
        object.rotation.y += object.yRotationRate;;
    });

    var startRotation = new THREE.Euler().copy(camera.rotation);

    renderer.render(scene, camera);
};

animate();

// Draw it on a canvas fixed behind everything in the site

$('canvas').addClass('fixed-canvas');