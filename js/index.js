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

//cube

var cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
var cubeMaterial = new THREE.MeshBasicMaterial({ color: brandColors.blueLight });
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.background = new THREE.Color(0xFFFFFF);
scene.add(cube);


cube.rotation.x = 0.5;
cube.rotation.y = 0.5;

//background planes

var planeGeometry = new THREE.PlaneGeometry(50, 50, 32);
var planeMaterial = new THREE.MeshBasicMaterial({ color: brandColors.magentaLight, side: THREE.DoubleSide });
var pinkPlane = new THREE.Mesh(planeGeometry, planeMaterial);
pinkPlane.position.z = -10;
pinkPlane.name = '0';
console.log('pink plane', pinkPlane);

scene.add(pinkPlane);

planeMaterial = new THREE.MeshBasicMaterial({ color: brandColors.blueLight, side: THREE.DoubleSide });
var lightBluePlane = new THREE.Mesh(planeGeometry, planeMaterial);

lightBluePlane.position.z = -10;
lightBluePlane.position.y = -50;
lightBluePlane.name = '1';
console.log('lightBlue plane', lightBluePlane);

scene.add(lightBluePlane);

camera.position.z = 5;

var animate = function () {
    requestAnimationFrame(animate);

    cube.rotation.y += 0.001;

    renderer.render(scene, camera);
};

animate();

$('canvas').addClass('fixed-canvas');
console.log('fixedCanvas', $('.fixed-canvas'));

//GSAP UI animations

var sections = ['hero', 'contact'];
var viewSection = 0;
var backgroundPlane;
var nextBackgroundPlane;

function setCurrentBackgroundPlane () {
    backgroundPlane = scene.getObjectByName(viewSection.toString());
}

function scrollToSection () {
    TweenMax.to('body', 0.7, {scrollTo:"#" + viewSection.toString(), ease: Power3.easeOut});
}

setCurrentBackgroundPlane(viewSection);

function nextSection() {
    if(viewSection < sections.length - 1) {
        viewSection++;
        nextBackgroundPlane = scene.getObjectByName((viewSection).toString());
        TweenMax.staggerTo([backgroundPlane.position, nextBackgroundPlane.position], 0.7, {x:0, y: '+=50', z: -10, ease: Power3.easeOut}, 0);
        scrollToSection();
        setCurrentBackgroundPlane();
    }
}

function prevSection() {
    if(viewSection > 0) {
        viewSection--;
        nextBackgroundPlane = scene.getObjectByName((viewSection).toString());
        TweenMax.staggerTo([backgroundPlane.position, nextBackgroundPlane.position], 0.7, {x:0, y: '-=50', z: -10, ease: Power3.easeOut}, 0);
        scrollToSection();
        setCurrentBackgroundPlane();
    }
}

//capture user scroll

var startY;
var endY;
var startTime;

$('body').on('touchstart touchend', function(event) {
    event.preventDefault();
    console.log(event);
    if(event.type === 'touchstart') {
        startY = event.originalEvent.changedTouches['0'].clientY;
    } else if(event.type === 'touchend') {
        endY = event.originalEvent.changedTouches['0'].clientY;
        var dragAmt = startY - endY;
        console.log('dragAmt', dragAmt);
        if(dragAmt > 20) {
            nextSection();
        } else if (dragAmt < -20) {
            prevSection();
        }
    }
});

$('body').on('keydown', _.throttle(function(event) {
    if(event.keyCode === 40) {
        nextSection();
    } else if(event.keyCode === 38) {
        prevSection();
    }
}, 200));

$('body').on('mousewheel', _.throttle(function(event) {
    event.preventDefault();
    if(event.originalEvent.deltaY > 50) {
        console.log('next');
        nextSection();
    } else if(event.originalEvent.deltaY < -50) {
        console.log('prev');
        prevSection();
    }
}, 200));

// $('body').scroll(function(event){
// var st = $(this).scrollTop();
// if (st > lastScrollTop){
//    console.log('down scroll', lastScrollTop - st);
// } else {
//    console.log('up scroll', lastScrollTop-st);
// }
// lastScrollTop = st;
// });

var navLink = $('.nav-link');

navLink.hover(function () {
    TweenMax.to(this, 0.3, {
        color: brandColors.magentaLight,
        backgroundColor: brandColors.nearWhite
    });
}, function () {
    TweenMax.to(this, 0.3, {
        color: brandColors.nearWhite,
        backgroundColor: 'rgba(0,0,0,0)'
    });
});

navLink.mousedown(
    function () {
        TweenMax.to(this, 0.1, {
            backgroundColor: brandColors.brightYellow
        });
    });

navLink.mouseup(
    function () {
        TweenMax.to(this, 0.1, {
            backgroundColor: brandColors.nearWhite
        });
    });

navLink.bind('touchstart',
    function () {
        TweenMax.to(this, 0.1, {
            backgroundColor: brandColors.nearWhite,
            color: brandColors.magentaLight,
        });
    }).bind('touchend', function () {
        TweenMax.to(this, 0.3, {
            color: brandColors.nearWhite,
            backgroundColor: 'rgba(0,0,0,0)',
            borderBottom: 'none'
        });
    });