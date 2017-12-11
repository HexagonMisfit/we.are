var brandColors = {
    magentaLight: 0xFF0066,
    magentaDark: 0xB21252,
    blueLight: 0x14ACCC,
    blueDark: 0x0995B2,
    brightYellow: 0xFFE919,
    nearWhite: 0xfafafa,
    nearBlack: 0x060606
}

//THREE.JS code initialize scene, draw basic floating blueLight cube

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(3, 3, 3);
var material = new THREE.MeshBasicMaterial({ color: brandColors.blueLight });
var cube = new THREE.Mesh(geometry, material);

scene.background = new THREE.Color(brandColors.magentaLight);
scene.add(cube);

cube.rotation.x = 0.5;
cube.rotation.y = 0.5;

camera.position.z = 5;

var animate = function () {
    requestAnimationFrame(animate);

    cube.rotation.y += 0.001;

    renderer.render(scene, camera);
};

animate();

//GSAP UI animations

var navLink = $('.nav-link');

navLink.hover(function () {
    TweenMax.to(this, 0.3, {
        color: brandColors.magentaLight,
        backgroundColor: brandColors.nearWhite
    })
}, function () {
    TweenMax.to(this, 0.3, {
        color: brandColors.nearWhite,
        backgroundColor: brandColors.magentaLight
    })
});

navLink.mousedown(
    function () {
        TweenMax.to(this, 0.1, {
            color: brandColors.nearWhite,
            backgroundColor: brandColors.blueLight
        })
    });

navLink.mouseup(
    function () {
        TweenMax.to(this, 0.1, {
            color: brandColors.magentaLight,
            backgroundColor: brandColors.nearWhite
        })
    });

navLink.bind('touchstart',
    function () {
        TweenMax.to(this, 0.1, {
            backgroundColor: brandColors.blueLight,
            borderBottom: 'solid 1px ' + brandColors.brightYellow
        })
    }).bind('touchend', function () {
        TweenMax.to(this, 0.3, {
            backgroundColor: brandColors.magentaLight,
            borderBottom: 'solid 1px ' + brandColors.magentaLight
        })
    });

navLink.on("touchstart",
    TweenMax.to(this, 0.1, {
        backgroundColor: brandColors.blueLight,
        borderBottom: 'solid 1px FFE919'
    }), false)

navLink.on("touchend",
    TweenMax.to(this, 0.1, {
        backgroundColor: brandColors.magentaLight,
        borderBottom: 'solid 1px FFE919'
    }), false)