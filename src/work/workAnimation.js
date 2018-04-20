window.$ = window.jQuery = require('jquery');

import { brandColors } from '../shared/theming.js';
import { noise } from '../shared/noise.js';

(function () {
    var scene = new THREE.Scene();
    var geometry;
    var clock = new THREE.Clock();
    var time = 0;
    var gridSize = 17
    var p = 0;

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    function updateVertices() {
        geometry.verticesNeedUpdate = true;
        geometry.vertices.forEach(function (vertex) {
            p = noise.perlin3(vertex.x, vertex.z, Math.sin(time));
            vertex.y += p;
            if (vertex.y >= 20 || vertex.y < -20) {
                p = -p;
                // console.log(vertex.y);
            }
        });
    }

    function makeTile(size, res) {
        geometry = new THREE.Geometry();

        for (var i = 0; i <= res; i++) {

            for (var j = 0; j <= res; j++) {
                var z = j * size + (Math.random() - 0.5) * size;
                var x = i * size + (Math.random() - 0.5) * size;
                var position = new THREE.Vector3(x, noise.perlin3(x, z, time) * size, z);
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

    var geometry = makeTile(gridSize, 50);

    var material = new THREE.MeshBasicMaterial({ color: brandColors.lavendarIsh, wireframe: true });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    mesh.position.set(-400, -55, 0);
    scene.add(camera);
    camera.position.set(0, 10, -20);
    camera.lookAt(scene.position);

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

        //animate the scene

        function animate() {
            requestAnimationFrame(animate);
            render();
        };

        function render() {

            time = clock.getDelta();
            // updateVertices();
            renderer.render(scene, camera);
        }

        animate();
    });
})();
