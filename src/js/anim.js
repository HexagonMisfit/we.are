// import '../../node_modules/three/build/three.js';
// var THREE = require('three');
import '../../node_modules/three/examples/js/loaders/ColladaLoader.js';
import '../../node_modules/jquery/dist/jquery.min.js';

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

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color(0xFFFFFF);

// Cube
// TODO: make a cool geometry and animate it. Maybe an extruded hexagon with a cloud-ring of cubes orbiting it.

var loader = new THREE.ColladaLoader();
console.log('loader', loader);

var cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
var cubeMaterial = new THREE.MeshBasicMaterial({ color: brandColors.blueLight });
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(cube);

cube.rotation.x = 0.5;
cube.rotation.y = 0.5;

// Background plane

var planeGeometry = new THREE.PlaneGeometry(50, 50, 32);
var planeMaterial = new THREE.MeshBasicMaterial({ color: brandColors.magentaLight, side: THREE.DoubleSide });
var pinkPlane = new THREE.Mesh(planeGeometry, planeMaterial);
pinkPlane.position.z = -10;
pinkPlane.name = '0';

scene.add(pinkPlane);

// Camera

camera.position.z = 5;

// Animate the scene

var animate = function () {
    requestAnimationFrame(animate);
    cube.rotation.y += 0.001;
    renderer.render(scene, camera);
};

animate();

// Draw it on a canvas fixed behind everything in the site

$('canvas').addClass('fixed-canvas');