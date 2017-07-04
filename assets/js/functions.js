/**
 * Created by wushuyi on 2017/7/4.
 */

var camera, scene, renderer, canvas, ctx, video, controls;
var videoW, videoH;
var texture;

var texture_placeholder,
    isUserInteracting = false,
    onMouseDownMouseX = 0, onMouseDownMouseY = 0,
    lon = 0, onMouseDownLon = 0,
    lat = 0, onMouseDownLat = 0,
    phi = 0, theta = 0,
    distance = 500,
    onPointerDownPointerX = 0,
    onPointerDownPointerY = 0,
    onPointerDownLon = 0,
    onPointerDownLat = 0;


function init() {

    var container, mesh;

    container = document.getElementById('container');

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
    camera.target = new THREE.Vector3(0, 0, 0);
    controls = new THREE.DeviceOrientationControls( camera );

    scene = new THREE.Scene();

    var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    video = document.querySelector('#video');
    console.log(video);
    enableInlineVideo(video);
    // video.style.display = 'block';
    videoW = 828;
    videoH = 414;
    // video.style.display = 'none';
    canvas = document.createElement('canvas');
    canvas.width = videoW;
    canvas.height = videoH;
    ctx = canvas.getContext('2d');
    video.play();
    // document.body.appendChild(canvas);


     texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    // texture.format = THREE.RGBFormat;

    var material = new THREE.MeshBasicMaterial({map: texture});

    mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
    animate();
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}


function animate() {

    requestAnimationFrame(animate);

    update();

}

function update() {
    ctx.drawImage(video, 0, 0, videoW, videoH);
    texture.needsUpdate = true;
    controls.update();
    renderer.render(scene, camera);

}

var onClick = function () {
    init();
    document.removeEventListener('click', onClick);
};
document.addEventListener('click', onClick, false);
