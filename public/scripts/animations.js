function checkZoom(zoomLoc){
    if(zoomLoc === 'florida'){
        rotating = false;

        let startX = camera.position.x,
            startY = camera.position.y,
            endX = 100 * Math.sin(Math.PI / 36) + (earthMesh.rotation.y * 2),
            endY = 100 * Math.sin(Math.PI / 12),
            stepX = (endX - startX) / 100,
            stepY = (endY - startY) / 100,
            stepZ = (50 - camera.position.z) / 100;

        camera.position.x += stepX;
        camera.position.y += stepY;
        camera.position.z += stepZ;

        cameraStep--;

        if(cameraStep === 0){
            loc = '';
            cameraStep = 500;
            rotating = true;
        }
    }
}
