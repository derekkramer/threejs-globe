// Basic point finding Sphere

// var geometry = new THREE.SphereGeometry( 0.2, 32, 32 );
// var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
// var sphere = new THREE.Mesh( geometry, material );
// sphere.position.x = 3.5;
// sphere.position.y = 10.6;
// sphere.position.z = 21.1;
// scene.add( sphere );


// --------------------


// Check all launch paths

// setPath('florida', 0, 'leo');
// setTimeout(() => {setPath('florida', 1, 'leo')}, 5000);
// setTimeout(() => {setPath('florida', 2, 'leo')}, 10000);
// setTimeout(() => {setPath('vandenberg', 0, 'leo')}, 15000);
// setTimeout(() => {setPath('vandenberg', 1, 'leo')}, 20000);
// setTimeout(() => {setPath('vandenberg', 2, 'leo')}, 25000);


// --------------------


// Original checkPath

// function checkPath(){
//     if(pathStep === 50){
//         setPath(
//             selection['origin'],
//             selection['trajectory'],
//             selection['orbit']
//         );
//     }
//
//     camera.lookAt(new THREE.Vector3(
//         zoom[selection['origin']]['camera']['x'],
//         zoom[selection['origin']]['camera']['y'],
//         zoom[selection['origin']]['camera']['z']
//     ));
//
//     pathStep--;
// }


// --------------------


// Origin drawPath

// function drawPath(){
//     setPath(
//         selection['origin'],
//         selection['trajectory'],
//         selection['orbit']
//     );
//
//     camera.lookAt(new THREE.Vector3(
//         zoom[selection['origin']]['camera']['x'],
//         zoom[selection['origin']]['camera']['y'],
//         zoom[selection['origin']]['camera']['z']
//     ));
//
//     pathStart = false;
//     outStart = true;
//     pathStep = 50;
//     controls.autoRotate = true;
//     // rotating = true;
//     controls.enabled = true;
// }
