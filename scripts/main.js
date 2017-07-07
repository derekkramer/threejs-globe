const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
var mesh;

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// add icosahedron
const geometry = new THREE.SphereGeometry(24, 32, 32);
// THREE.ImageUtils.crossOrigin = true;

const textureLoader = new THREE.TextureLoader();
textureLoader.crossOrigin = true;

textureLoader.load('https://c1.staticflickr.com/3/2521/3884071286_edb50f8137_b.jpg', function(texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);

    const material = new THREE.MeshLambertMaterial({map: texture});
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    render();
});

camera.position.z = 100;

// so many lights
var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 0);
scene.add(light);

var light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(0, -1, 0);
scene.add(light);

var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 0, 0);
scene.add(light);

var light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(0, 0, 1);
scene.add(light);

var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, -1);
scene.add(light);

var light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(-1, 0, 0);
scene.add(light);

var render = function() {
    requestAnimationFrame(render);
    mesh.rotation.y += 0.001;
    renderer.render(scene, camera);
};
