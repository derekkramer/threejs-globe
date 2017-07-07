const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
let mesh;
let rotating = 0.005;

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

    const material = new THREE.MeshPhongMaterial({map: texture});
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    render();
});

camera.position.z = 200;

const light = new THREE.AmbientLight(0x404040, 4);
scene.add(light);

let isDragging = false;
let previousPos = {
    x: 0,
    y: 0
};

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
            previousPos.x = event.pageX;
            previousPos.y = event.pageY;
        }else{
            let changeX = event.pageX - previousPos.x,
                changeY = event.pageY - previousPos.y;

            previousPos.x = event.pageX;
            previousPos.y = event.pageY;

            mesh.rotation.x += changeY * 0.005;
            mesh.rotation.y += changeX * 0.005;
        }
    }
});

$(document).on('mouseup', () => {
    isDragging = false;
    rotating = 0.005;
});

var render = function() {
    requestAnimationFrame(render);
    mesh.rotation.y += rotating;
    renderer.render(scene, camera);
};
