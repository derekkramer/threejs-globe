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
    stepZ,
    lookX,
    lookY,
    lookZ;

function checkState(){
    if(selection['new']){
        resetState();
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
    }

    // Stop drawing if all points are displayed
    if(path.geometry.getAttribute('position') && drawCount < MAX_POINTS){
        drawCount++;
        updateShip();
    }

    // Reset the ship rotation and position once finished
    if(path.geometry.getAttribute('position') && drawCount === MAX_POINTS){
        resetShip();
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

    if(zoomStep > 200){
        lookX = (zoom[selection['origin']]['camera']['x'] / 100) * Math.abs(300 - zoomStep);
        lookY = (zoom[selection['origin']]['camera']['y'] / 100) * Math.abs(300 - zoomStep);
        lookZ = (zoom[selection['origin']]['camera']['z'] / 100) * Math.abs(300 - zoomStep);
    }

    camera.lookAt(new THREE.Vector3(
        lookX,
        lookY,
        lookZ
    ));

    camera.position.x += stepX;
    camera.position.y += stepY;

    // Zoom faster for a panoramic view
    if(zoomStep > 100){
        camera.position.z += stepZ;
    }
}

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

    if(outStep > 300){
        let zoomOut = zoom[selection['origin']]['camera'];
        lookX = zoomOut['x'] - (zoomOut['x'] / 100) * Math.abs(400 - outStep);
        lookY = zoomOut['y'] - (zoomOut['y'] / 100) * Math.abs(400 - outStep);
        lookZ = zoomOut['z'] - (zoomOut['z'] / 100) * Math.abs(400 - outStep);
    }

    camera.lookAt(new THREE.Vector3(
        lookX,
        lookY,
        lookZ
    ));

    camera.position.z += stepZ;
}

function updateShip(){
    if(drawCount === 1){
        let shipRotations = pathRotations[selection['origin']][selection['trajectory']]
        shipContainer.rotation.set(-shipRotations['x'], -shipRotations['y'], -shipRotations['z']);
    }

    let positions = path.geometry.attributes.position.array
    shipLight.position.set(
        positions[drawCount * 3 - 3],
        positions[drawCount * 3 - 2],
        positions[drawCount * 3 - 1]
    );
}

function resetShip(){
    shipContainer.rotation.set(0, 0, 0);
    shipLight.position.set(0, 0, 0);
}

function resetState(){
    zoomStep = 300;
    outStep = 400;
    zoomStart = false;
    pathStart = false;
    outStart = false;
}
