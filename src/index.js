// vendor js files
window.$ = window.jQuery = require('jquery');
window._ = require('lodash');
import 'three';

/* global THREE */

// our scripts
import { brandColors } from './shared/theming.js';
import './shared/nav.js';

// import our scss last
import './sass/main.scss';


$(function () {

    /************/
    /* UI Stuff */
    /************/

    var scrollControl = new ScrollMagic.Controller();

    var fadeAndRiseTween1 = TweenMax.staggerTo('.fade-1', 0.8, { autoAlpha: 1, y: 0, ease: Power4.easeOut }, 0.1);
    var fadeAndRiseScene1 = new ScrollMagic.Scene({
        triggerHook: 0.8,
        triggerElement: '#trigger-1',
        reverse: false
    })
        .setTween(fadeAndRiseTween1)
        .addTo(scrollControl);

    var fadeAndRiseTween2 = TweenMax.staggerTo('.fade-2', 0.8, { autoAlpha: 1, y: 0, ease: Power4.easeOut }, 0.1);
    var fadeAndRiseScene2 = new ScrollMagic.Scene({
        triggerHook: 0.8,
        triggerElement: '#trigger-2',
        reverse: false
    })
        .setTween(fadeAndRiseTween2)
        .addTo(scrollControl);

    var fadeAndRiseTween3 = TweenMax.staggerTo('.fade-3', 0.8, { autoAlpha: 1, y: 0, ease: Power4.easeOut }, 0.1);
    var fadeAndRiseScene3 = new ScrollMagic.Scene({
        triggerHook: 0.8,
        triggerElement: '#trigger-3',
        reverse: false
    })
        .setTween(fadeAndRiseTween3)
        .addTo(scrollControl);

    function isMobile() {
        var Uagent = navigator.userAgent || navigator.vendor || window.opera;
        return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(Uagent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(Uagent.substr(0, 4)));
    };

    if (!isMobile()) {
        console.log('not mobile');
    }

    /****************/
    //HOME ANIMATION//
    /****************/

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 3);

    var target = new THREE.Object3D();
    var targetZ = -15;
    target.position.set(0, 0, targetZ);
    var temp = target.position.clone();

    var cube;
    var cubeMesh;
    var cubePositions = [];
    var cubeRotationVelocities = [];
    var cubeScale;

    var width = window.innerWidth;
    var height = window.innerHeight;

    var mouseX = 0;
    var mouseY = 0;
    var halfWidth = width / 2;
    var halfHeight = height / 2;

    var yOffset = 30;

    var lerpRate = 1 / 250;

        function onInitHome() {
            var ascend1 = $('.ascend-1');
            TweenMax.to($('body'), 0.75, { autoAlpha: 1, ease: Power2.easeOut });
            TweenMax.staggerTo(ascend1, 1, { autoAlpha: 1, y: 0, ease: Power3.easeOut }, 0.1);
        }

        $('.hero-container').mousemove(onMouseMove);

        function onMouseMove(event) {

            //set the temp position to a value based on mouse position

            mouseX = event.clientX - halfWidth;
            mouseY = event.clientY - halfHeight;
            temp.set(mouseX / 100, -mouseY / 100, targetZ);
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

        var cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
        var cubeMaterial = new THREE.MeshBasicMaterial({ color: brandColors.aqua });
        var cubeGroup = new THREE.Group();

        for (var i = 0; i < 30; i++) {

            //make 30 cubes of random sizes and place them randomly with a y-offset

            cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube = new THREE.Object3D();
            cube.add(cubeMesh);

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
            cubeRotationVelocities.push([Math.random() / 400, Math.random() / 400]);
        }

        scene.add(cubeGroup);

        // Animate the scene

        var animate = function () {
            requestAnimationFrame(animate);
            render();
        };

        var render = function () {
            for (var i = 0; i < cubeGroup.children.length; i++) {
                rotate(cubeGroup.children[i], cubeRotationVelocities[i]);
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