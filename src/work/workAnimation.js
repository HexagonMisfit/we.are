window.$ = window.jQuery = require('jquery');

import { brandColors } from '../shared/theming.js';

var scene = new THREE.Scene();
var geometry;

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, -20);
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

function makeTile(size, res) {
    geometry = new THREE.Geometry();

    for (var i = 0; i <= res; i++) {

        for (var j = 0; j <= res; j++) {
            var z = j * size;
            var x = i * size;
            var position = new THREE.Vector3(x, Math.random() * size - 1/2 * size, z);
            console.log(position);
            var addFace = (i > 0) && (j > 0);
            makeQuad(geometry, position, addFace, res + 1);
        }

    }
    return geometry;
}

function makeQuad(geometry, position, addFace, verts) {
    geometry.vertices.push(position);
    if (addFace) {

        var index1 = geometry.vertices.length - 1;
        var index2 = index1 - 1;
        var index3 = index1 - verts;
        var index4 = index1 - verts - 1;

        geometry.faces.push(new THREE.Face3(index2, index3, index1));
        geometry.faces.push(new THREE.Face3(index2, index4, index3));
    }
}

var geometry = makeTile(17, 20);

var material = new THREE.MeshBasicMaterial({ color: brandColors.lavendarIsh, wireframe: true });
var mesh = new THREE.Mesh(geometry, material);
var pivot = new THREE.Object3D();
pivot.add(mesh);
scene.add(camera);
scene.add(pivot);
mesh.position.set(-140,140,300);
mesh.rotation.set(-10,0,0);
camera.lookAt(pivot.position);
console.log('log camera', camera);

function rotate(object, speed) {
    object.rotation.x += speed[0];
    object.rotation.y += speed[1];
}

$(document).ready(function () {

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('deviceorientation', onWindowResize, false);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }

    $('#work-body').prepend(renderer.domElement);
    renderer.domElement.id = 'work-background-scene';
    console.log('log background scene', renderer.domElement);
    console.log('log scene', scene);

    //animate the scene

    function animate() {
        requestAnimationFrame(animate);
        render();
    };

    function render() {
        // rotate(pivot, [0,0.001]);
        renderer.render(scene, camera);
    }

    animate();
});
