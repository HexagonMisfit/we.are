import '../../node_modules/lodash/lodash.js';
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/gsap/TweenMax.js';

var $ = require('jquery');

/***********/
/* Theming */
/***********/
var brandColors = {
    magentaLight: 0xFF0066,
    magentaDark: 0xB21252,
    blueLight: 0x14ACCC,
    blueDark: 0x0995B2,
    brightYellow: 0xFFE919,
    nearWhite: 0xfafafa,
    nearBlack: 0x060606
}
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

var startRotation = new THREE.Euler().copy(camera.rotation);

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (event.clientY / window.innerHeight) * 2 - 1;
    TweenMax.to(camera.rotation, 5, {x: startRotation.y - mouse.y/10, y: startRotation.x - mouse.x/10});
}

// revert to original rotation
camera.rotation.copy(startRotation);

// Tween


var renderer = new THREE.WebGLRenderer();
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

    cube.yVelocity = 0.0001 - Math.random() / 1000;
    cube.xVelocity = 0.0001 - Math.random() / 1000;

    cube.name = 'cube' + i;

    scene.add(cube);
}

// Animate the scene

var animate = function () {
    requestAnimationFrame(animate);
    _.forEach(scene.children, function (object) {
        object.position.z -= 0.0003;
        object.position.x += object.xVelocity;
        object.position.y += object.yVelocity;
        object.rotation.x += Math.random() / 400;
        object.rotation.y += Math.random() / 400;
    });

    var startRotation = new THREE.Euler().copy(camera.rotation);

    renderer.render(scene, camera);
};

animate();

// Draw it on a canvas fixed behind everything in the site

$('canvas').addClass('fixed-canvas');