var brandColors = {
    magentaLight: 0xFF0066,
    magentaDark: 0xB21252,
    blueLight: 0x14ACCC,
    blueDark: 0x0995B2,
    brightYellow: 0xFFE919
}

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight - 2 );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 3, 3, 3 );
var material = new THREE.MeshBasicMaterial( { color: brandColors.blueLight } );
var cube = new THREE.Mesh( geometry, material );

scene.background = new THREE.Color(brandColors.magentaLight);
scene.add( cube );

cube.rotation.x = 0.5;
cube.rotation.y = 0.5;

camera.position.z = 5;

var animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.y += 0.001;

    renderer.render(scene, camera);
};

animate();