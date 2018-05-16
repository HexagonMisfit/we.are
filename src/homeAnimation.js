import { brandColors } from './shared/theming';
import { Raycaster } from 'three';
$(function () {
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 3);

    var target = new THREE.Object3D();
    var targetZ = -200;
    target.position.set(0, 0, targetZ);
    var temp = target.position.clone();

    var INTERSECTED;

    var cube;
    var cubeMesh;
    var cubePositions = [];
    var cubeMeshes = [];
    var cubeRotationVelocities = [];
    var cubeScale;

    var width = window.innerWidth;
    var height = window.innerHeight;

    var mouse = new THREE.Vector2();
    var halfWidth = width / 2;
    var halfHeight = height / 2;

    var yOffset = 30;

    var lerpRate = 1 / 100;

    function onInitHome() {
        var ascend1 = $('.ascend-1');
        TweenMax.to($('body'), 0.75, { autoAlpha: 1, ease: Power2.easeOut });
        TweenMax.staggerTo(ascend1, 1, { autoAlpha: 1, y: 0, ease: Power3.easeOut }, 0.1);
    }

    $('.hero-container').mousemove(onMouseMove);

    function onMouseMove(event) {

        //set the temp position to a value based on mouse position

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        temp.set(mouse.x * 100, mouse.y * 100, targetZ);
    }

    function lerpCameraTarget() {
        target.position.lerp(temp, lerpRate);
    }

    function toPositions() {

        //bring the cubes into view

        TweenMax.staggerTo(cubePositions, 2, { y: '+=' + yOffset, ease: Power4.easeOut }, 0.02);
    }

    function rotate(object, speed) {
        object.rotation.x += speed[0];
        object.rotation.y += speed[1];
    }

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    var cubeGeometry, cubeMaterial;
    var cubeGroup = new THREE.Group();

    var raycaster = new THREE.Raycaster();

    for (var i = 0; i < 60; i++) {

        //make 30 cubes of random sizes and place them randomly with a y-offset

        cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
        cubeMaterial = new THREE.MeshBasicMaterial({ wireframe: true, color: brandColors.warmGray });
        cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube = new THREE.Object3D();
        cube.add(cubeMesh);

        cubeMeshes.push(cubeMesh);

        cubeScale = Math.random() / 3 + 0.35;
        cube.scale.x = cubeScale;
        cube.scale.y = cubeScale;
        cube.scale.z = cubeScale;

        var x = Math.random() * 20 - 10;
        var y = Math.random() * 20 - 10 - yOffset;
        var z = Math.random() * -15;

        cube.position.set(x, y, z);

        cubePositions.push(cube.position);

        cube.rotation.y = Math.random();
        cube.rotation.x = Math.random();

        cubeGroup.add(cube);
        cubeRotationVelocities.push([Math.random() / 300, Math.random() / 300]);
    }

    scene.add(cubeGroup);

    // Animate the scene

    var animate = function () {
        requestAnimationFrame(animate);
        render();
    };

    function setHexColor() {
        if (INTERSECTED.currentHex !== 0x000000) {
            INTERSECTED.material.color.set(0x000000);
            INTERSECTED.currentHex = 0x000000;
        } else {
            INTERSECTED.material.color.set(brandColors.warmGray);
            INTERSECTED.currentHex = brandColors.warmGray;
        }
    }

    var render = function () {
        for (var i = 0; i < cubeGroup.children.length; i++) {
            rotate(cubeGroup.children[i], cubeRotationVelocities[i]);
        }

        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(cubeMeshes);
        if (intersects.length > 0) {
            if (!INTERSECTED) {
                INTERSECTED = intersects[0].object;
                setHexColor();
            }
            else if (INTERSECTED && INTERSECTED.uuid !== intersects[0].object.uuid) {
                INTERSECTED = intersects[0].object;
                setHexColor();
            }  
        } else {
            INTERSECTED = null;
        }

        lerpCameraTarget();
        camera.lookAt(target.position);
        renderer.render(scene, camera);
    }

    // Draw it in the dom and add resize event listener

    $('#home-home').prepend(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('deviceorientation', onWindowResize, false);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }

    renderer.domElement.id = "header-canvas";

    onInitHome();
    animate();
    toPositions();
});