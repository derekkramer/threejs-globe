// Initialize the scene, camera, and global variables
const scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000),
    MAX_POINTS = 1000;

// Initialize global variables
let drawCount,
    earthMesh,
    starMesh,
    path,
    rotating = true,
    rotatingStep = 0.001,
    loc = '',
    cameraStep = 500;

// Initialize the renderer and append to the HTML
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up camera orbital controls, auto rotation, and zoom bounds
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 30;
controls.maxDistance = 500;
// controls.autoRotate = true;
controls.autoRotateSpeed = 3.0;

// Create new eath and star field spheres
const earthGeo = new THREE.SphereGeometry(24, 32, 32);
const starGeo = new THREE.SphereGeometry(500, 32, 32);

// Create launch path geometry
let pathGeo = new THREE.BufferGeometry();

// Set the launch path attributes
let positions = new Float32Array(MAX_POINTS * 3); // 3 vertices per point
pathGeo.addAttribute('position', new THREE.BufferAttribute(positions, 3));

// Start the draw range for the launch path
drawCount = 2;
pathGeo.setDrawRange(0, drawCount);

// Initialize the texture loader
const loader = new THREE.TextureLoader();

// Load the textures
const earthMap = loader.load('./img/earthmap1k.jpg');
const earthBump = loader.load('./img/earthbump1k.jpg');
const earthSpec = loader.load('./img/earthspec1k.jpg');
const starfield = loader.load('./img/starfield.jpg');

const earthMat = new THREE.MeshPhongMaterial({map: earthMap, bumpMap: earthBump, bumpScale: 0.5, specularMap: earthSpec, specular: 0x222222});

const starMat = new THREE.MeshBasicMaterial({map: starfield, side: THREE.BackSide});

// Set the launch path material
const pathMat = new THREE.LineBasicMaterial({color: 0xff0000, linewidth: 10});

// Create the starfield mesh
starMesh = new THREE.Mesh(starGeo, starMat);

// Create the launch path mesh
path = new THREE.Line(pathGeo, pathMat);

earthMesh = new THREE.Mesh(earthGeo, earthMat);
earthMesh.add(starMesh);
earthMesh.add(path);
scene.add(earthMesh);

// Position the camera back
camera.position.z = 200;

// Create and add lights to the scene
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x404040, 4);
directionalLight.position.set(3, 3, 3);
directionalLight.target.position.set(0, 0, 0);
scene.add(directionalLight);

scene.add(earthMesh);

// Set the coordinates of the launch path
setPositions();

// Set the origin of the launch path
path.rotation.x -= 1.05;
path.rotation.y -= 1.4;
path.rotation.z -= 0.58;

setTimeout(() => loc = 'florida', 5000);

// Start the rendering loop
render();

// Reset the render area on window resize
$(window).on('resize', onWindowResize);

// The render loop
function render() {
    requestAnimationFrame(render);

    // Rotate the earth incrementally
    if(rotating){
        earthMesh.rotation.y += rotatingStep;
    }

    // Update the orbital controls
    controls.update();

    checkZoom(loc);

    if(drawCount < MAX_POINTS){
        drawCount++;
    }

    // Update the draw range with the incremeneted draw count
    path.geometry.setDrawRange(0, drawCount);

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Set the position coordinates of the launch path
function setPositions() {

    let pos = path.geometry.attributes.position.array,
        step = (2 * Math.PI) / (MAX_POINTS / 2),
        r = 30,
        index = 0,
        x,
        y,
        z,
        takeoff = MAX_POINTS / 10;

    for (let theta = 0; theta < 2 * Math.PI; theta += step) {

        let newTheta = Math.abs(2 * Math.PI - theta),
            modifier = 1;

        if (theta < takeoff * step) {
            modifier = (Math.sqrt(theta) / Math.sqrt(takeoff * step)) * 0.2 + 0.8;
        }

        x = r * Math.cos(newTheta) * modifier;
        y = 0;
        z = r * Math.sin(newTheta) * modifier;

        pos[index++] = x;
        pos[index++] = y;
        pos[index++] = z;
    }

    for (let theta = 0; theta < 2 * Math.PI; theta += step) {

        let newTheta = Math.abs(2 * Math.PI - theta),
            modifier = 1;

        x = r * Math.cos(newTheta) * modifier;
        y = 0;
        z = r * Math.sin(newTheta) * modifier;

        pos[index++] = x;
        pos[index++] = y;
        pos[index++] = z;
    }
}
