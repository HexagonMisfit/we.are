window.$ = window.jQuery = require('jquery');

import { brandColors } from '../shared/theming.js';
import { noise } from '../shared/noise.js';

import 'three';
/*global THREE'*/

(function () {
    var scene = new THREE.Scene();
    var geometry;
    var clock = new THREE.Clock();
    var time = 0;
    var gridSize = 12.5;
    var gridRes = 360;
    var p = 0;
    var vertHeight = 0;
    var amplitude = 0.75;

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2500);
    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    function makeTile(size, res) {
        geometry = new THREE.Geometry();

        for (var i = 0; i <= res; i++) {
            for (var j = 0; j <= res; j++) {
                var z = j * size;
                var x = i * size;
                var position = new THREE.Vector3(x, 0, z);
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

    var vertexShader = `
        uniform float time;
        varying vec3 vNormal;

        float PI = 3.14159;
        float amplitude = 10.0;
        float repetition = 6.5;
        float speed = 0.3;
        void main() {

            vNormal = normal;
            float y = (cos(position.x * repetition + time * speed) * amplitude) + (cos(position.z * repetition + time * speed) * amplitude);

            vec3 newPosition = position + vec3(-y / 2.0, y, y / 2.0); 

            gl_Position = projectionMatrix *
                          modelViewMatrix *
                          vec4(newPosition + normal, 1.0);
        }
    `;

    var fragmentShader = `
        uniform float time;
        void main() {
            gl_FragColor = vec4(0.917, 0.321, 0.435,1.0);
        }
    `;

    var uniforms = {
        time: {
            value: time
        }
    }

    var shaderMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        wireframe: true
    });

    var mesh = new THREE.Mesh(geometry, shaderMaterial);

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
            uniforms.time.value = time;
            renderer.render(scene, camera);
        }
        animate();
    });
})();
