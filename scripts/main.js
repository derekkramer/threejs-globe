const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
var mesh;

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(24, 32, 32);
// THREE.ImageUtils.crossOrigin = true;

const textureLoader = new THREE.TextureLoader();
textureLoader.crossOrigin = true;

textureLoader.load('https://c1.staticflickr.com/3/2521/3884071286_edb50f8137_b.jpg', texture => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);

    const material = new THREE.MeshLambertMaterial({map: texture});
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    render();
});

camera.position.z = 200;

const light = new THREE.AmbientLight(0x404040, 4);
scene.add(light);

var render = function() {
    requestAnimationFrame(render);
    mesh.rotation.y += 0.005;
    renderer.render(scene, camera);
};
