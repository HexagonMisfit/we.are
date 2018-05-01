window.$ = window.jQuery = require('jquery');

import { brandColors } from '../shared/theming.js';
import { noise } from '../shared/noise.js';

import 'three';
import 'three/CopyShader';
import 'three/EffectComposer';
import 'three/HorizontalBlur';
import 'three/VerticalBlur';
import 'three/RenderPass';
import 'three/ShaderPass';
import 'three/ConvolutionShader';
import 'three/BloomPass';
/*global THREE'*/

(function () {
    var scene = new THREE.Scene();
    var geometry;
    var clock = new THREE.Clock();
    var time = 0;
    var gridSize = 10;
    var gridRes = 360;
    var p = 0;
    var vertHeight = 0;
    var salt = 0.01;

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2500);
    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    function updateVertices() {
        var index = 0;
        for (var i = 0; i <= gridRes; i++) {
            for (var j = 0; j <= gridRes; j++) {
                var vert = mesh.geometry.vertices[index];
                var iTime = Math.cos(i + time);
                var jTime = Math.cos(j + time);
                vertHeight = ((iTime * 0.2) * 20 * salt) + ((jTime * 0.2) * 20 * salt);
                vert.y = vertHeight;
                vert.z += 1 / 100 * jTime;
                index++;
            }
        }
        mesh.geometry.verticesNeedUpdate = true;
    }

    function makeTile(size, res) {
        geometry = new THREE.Geometry();

        for (var i = 0; i <= res; i++) {
            for (var j = 0; j <= res; j++) {
                var z = j * size;
                var x = i * size;
                var position = new THREE.Vector3(x, Math.cos(x * Math.PI * size) + Math.cos(z * Math.PI * size), z);
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

    var geometry = makeTile(gridSize, gridRes);

    var material = new THREE.MeshBasicMaterial({ color: brandColors.salmonPink, wireframe: true });
    var mesh = new THREE.Mesh(geometry, material);

    mesh.rotation.set(0, 45, 0);
    mesh.position.set(-1200, 300, 0);
    scene.add(mesh);

    camera.position.set(0, 800, 0);
    camera.rotateX(-90 * Math.PI / 180);
    scene.add(camera);

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

        //animate the scene

        function animate() {
            render();
            requestAnimationFrame(animate, renderer.canvas);
        };

        function render() {
            time += clock.getDelta();
            updateVertices();
            mesh.geometry.verticesNeedUpdate = true;
            renderer.render(scene, camera);
        }
        animate();
    });
})();
