window.$ = window.jQuery = require('jquery');

import { brandColors } from '../shared/theming.js';
import { noise } from '../shared/noise.js';

(function () {
    var scene = new THREE.Scene();
    var geometry;
    var clock = new THREE.Clock();
    var time = 0;

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    scene.add(camera);
    camera.position.set(0, 0, -3);
    camera.lookAt(scene.position);

    var pointLight = new THREE.PointLight(0xFFFFFF, 1, 100);
    pointLight.position.set(2,3,-2);
    scene.add(pointLight);

    $(document).ready(function () {

        window.addEventListener('resize', onWindowResize, false);
        window.addEventListener('deviceorientation', onWindowResize, false);

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.render(scene, camera);
        }

        var sphereGeometry = new THREE.SphereGeometry(1,128,128);
        var material = new THREE.MeshBasicMaterial({wireframe: true});
        var sphere = new THREE.Mesh(sphereGeometry, material);
        scene.add(sphere);

        var k = 3;

        function update() {
            time += clock.getDelta();
            for(var i = 0; i < sphere.geometry.vertices.length; i++) {
                var p = sphere.geometry.vertices[i];
                p.normalize().multiplyScalar(1+0.3 * noise.perlin3(p.x * k + time/2, p.y * k, p.z * k));
            }
            sphere.geometry.computeVertexNormals();
            sphere.geometry.verticesNeedUpdate = true;
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