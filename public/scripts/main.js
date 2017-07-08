// Initialize the scene, camera, and global variables
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
let earthMesh,
    starMesh,
    rotating = 0.005;

// Initialize the renderer and append to the HTML
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a new sphere
const earthGeo = new THREE.SphereGeometry(24, 32, 32);
const starGeo = new THREE.SphereGeometry(500, 32, 32);

// Initialize the texture loader
const loader = new THREE.TextureLoader();

// Load the textures
const earthMap = loader.load('./img/earthmap1k.jpg');
const earthBump = loader.load('./img/earthbump1k.jpg');
const earthSpec = loader.load('./img/earthspec1k.jpg');
const starfield = loader.load('./img/starfield.jpg');

const earthMat = new THREE.MeshPhongMaterial(
    {
        map: earthMap,
        bumpMap: earthBump,
        bumpScale: 0.5,
        specularMap: earthSpec,
        specular: 0x222222
    }
);

const starMat = new THREE.MeshBasicMaterial(
    {
        map: starfield,
        side: THREE.BackSide
    }
);

starMesh = new THREE.Mesh(starGeo, starMat);
// scene.add(starMesh);

earthMesh = new THREE.Mesh(earthGeo, earthMat);
earthMesh.add(starMesh);
scene.add(earthMesh);

// Position the camera back
camera.position.z = 200;

// Create and add lights to the scene
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x404040, 4);
directionalLight.position.set(3, 3, 3);
directionalLight.target.position.set(0, 0, 0);
// scene.add(directionalLight);
earthMesh.add(directionalLight);

scene.add(earthMesh);

// Start the rendering loop
render();

// Initialize interactive variables
let isDragging = false;
let previousPos = {
    x: 0,
    y: 0
};

// If the mouse is clicked, alter the rotation of the earth
$(renderer.domElement).on('mousedown', () => {
    isDragging = true;
    rotating = 0;
    previousPos = {
        x: 0,
        y: 0
    };
})
.on('mousemove', (event) => {
    if(isDragging){
        if(!previousPos.x && !previousPos.y){
            setPrevious();
        }else{
            let changeX = event.pageX - previousPos.x,
                changeY = event.pageY - previousPos.y;

            setPrevious();

            earthMesh.rotation.x += changeY * 0.005;
            earthMesh.rotation.y += changeX * 0.005;
        }
    }
});

// If released, reset the interactive variables
$(document).on('mouseup', () => {
    isDragging = false;
    rotating = 0.005;
});

// The render loop
function render(){
    requestAnimationFrame(render);
    earthMesh.rotation.y += rotating;
    renderer.render(scene, camera);
}

// Setting the previous mouse coordinates to the current coordiantes
function setPrevious(){
    previousPos.x = event.pageX;
    previousPos.y = event.pageY;
}
