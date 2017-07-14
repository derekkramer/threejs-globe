const zoom = {
    'florida': {
        'x': 4,
        'y': 15,
        'camera': {
            'x': 3.5,
            'y': 10.6,
            'z': 21.1
        }
    },
    'vandenberg': {
        'x': -17,
        'y': 22,
        'camera': {
            'x': -9.55,
            'y': 13.85,
            'z': 17.2
        }
    }
};

let selection = {},
    zoomStep = 300,
    // pathStep = 50,
    outStep = 400,
    zoomStart = false,
    pathStart = false,
    outStart = false,
    drawCount = 0,
    startX,
    startY,
    endX,
    endY,
    stepX,
    stepY,
    stepZ;

function checkState(){
    if(selection['new']){
        zoomStart = true;
        selection['new'] = false;
    }

    if(zoomStart){
        checkZoom();

        zoomStep--;

        if(zoomStep === 0){
            zoomStart = false;
            pathStart = true;
            zoomStep = 300;
        }
    }

    if(pathStart){
        checkPath();

        // pathStep--;
        //
        // if(pathStep === 0){
        //     pathStart = false;
        //     outStart = true;
        //     pathStep = 50;
        //     controls.autoRotate = true;
        //     // rotating = true;
        //     controls.enabled = true;
        // }
    }

    if(outStart){
        checkOut();

        outStep--;

        if(outStep === 0){
            outStart = false;
            outStep = 400;
            selection = {};
        }
    }

    // Rotate the earth incrementally
    if(rotating){
        earthMesh.rotation.y += rotatingStep;
        console.log(earthMesh.rotation.y);
    }

    // Stop drawing if all points are displayed
    if(drawCount < MAX_POINTS){
        drawCount++;
    }

    // Update the draw range with the incremeneted draw count
    path.geometry.setDrawRange(0, drawCount);
}

function checkZoom(){
    if(zoomStep === 300){
        controls.autoRotate = false;
        rotating = false;
        controls.enabled = false;

        startX = camera.position.x;
        startY = camera.position.y;
        endX = zoom[selection['origin']]['x'];
        endY = zoom[selection['origin']]['y'];
        stepX = (endX - startX) / 300;
        stepY = (endY - startY) / 300;
        stepZ = (30 - camera.position.z) / 200;
    }

    camera.lookAt(new THREE.Vector3(
        zoom[selection['origin']]['camera']['x'],
        zoom[selection['origin']]['camera']['y'],
        zoom[selection['origin']]['camera']['z']
    ));

    camera.position.x += stepX;
    camera.position.y += stepY;

    // Zoom faster for a panoramic view
    if(zoomStep > 100){
        camera.position.z += stepZ;
    }
}

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

function checkPath(){
    setPath(
        selection['origin'],
        selection['trajectory'],
        selection['orbit']
    );

    camera.lookAt(new THREE.Vector3(
        zoom[selection['origin']]['camera']['x'],
        zoom[selection['origin']]['camera']['y'],
        zoom[selection['origin']]['camera']['z']
    ));

    pathStart = false;
    outStart = true;
    pathStep = 50;
    controls.autoRotate = true;
    // rotating = true;
    controls.enabled = true;
}

function checkOut(){
    stepZ = 170 / 400;

    camera.lookAt(new THREE.Vector3(
        zoom[selection['origin']]['camera']['x'],
        zoom[selection['origin']]['camera']['y'],
        zoom[selection['origin']]['camera']['z']
    ));

    camera.position.z += stepZ;
}
