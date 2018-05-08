window.$ = window.jQuery = require('jquery');

import 'three';

import { brandColors } from '../shared/theming.js';
import { noise } from '../shared/noise.js';

(function () {
    var scene = new THREE.Scene();
    var geometry;
    var clock = new THREE.Clock();
    var time = 0;

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    scene.add(camera);
    camera.position.set(0, 0, -3);
    camera.lookAt(scene.position);

    $(document).ready(function () {

        window.addEventListener('resize', onWindowResize, false);
        window.addEventListener('deviceorientation', onWindowResize, false);

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.render(scene, camera);
        }

        var vertexShader = `
            uniform float time;
            varying vec3 vNormal;

            float rand(float n){
                return fract(sin(n) * 43758.5453123);
            }

            float noise(vec3 p){
                float fl = floor(p.x);
                float fc = fract(p.y);
                float fd = fract(p.z);
                return mix(rand(fl + fd), rand(fl + 1.0), fc);
            }

            void main() {

                vNormal = normal;
                float k = 1.0;
                float x = 1.0 + 0.3 * noise(position.x * k + time / 2.0, position.y * k, position.z * k);

                vec3 newPosition = position + vec3(x, 1.0, 1.0); 

                gl_Position = projectionMatrix *
                            modelViewMatrix *
                            vec4(newPosition + normal, 1.0);
            }
    `;

        var fragmentShader = `
            uniform float time;
            void main() {
                gl_FragColor = vec4(1.0,1.0,1.0,1.0);
            }
    `;

        var sphereGeometry = new THREE.SphereGeometry(1, 128, 128);

        var uniforms = {
            time: {
                value: time
            }
        }

        var material = new THREE.ShaderMaterial({
            wireframe: true,
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        });
        var sphere = new THREE.Mesh(sphereGeometry, material);
        scene.add(sphere);

        var k = 3;

        function update() {
            time += clock.getDelta();
            for (var i = 0; i < sphere.geometry.vertices.length; i++) {
                var p = sphere.geometry.vertices[i];
                p.normalize().multiplyScalar(1 + 0.3 * noise.perlin3(p.x * k + time / 2, p.y * k, p.z * k));
            }
            sphere.geometry.computeVertexNormals();
            sphere.geometry.verticesNeedUpdate = true;
            uniforms.time.value = time;
        };

        $('#team-container').prepend(renderer.domElement);
        renderer.domElement.id = 'team-background-scene';

        //animate the scene

        function animate() {
            render();
            requestAnimationFrame(animate, renderer.canvas);
        };

        function render() {
            update();
            renderer.render(scene, camera);
        }

        animate();
    });
})();