// Set the origins of all launch paths
const pathRotations = {
    'florida': [
        {
            'x': 1.05,
            'y': 1.4,
            'z': 0.58
        }
    ],
    'vandenberg': [
        {
            'x': 0.68,
            'y': 1.98,
            'z': 0
        },
        {
            'x': 2.2,
            'y': 3,
            'z': 1.15
        },
        {
            'x': -1.27,
            'y': -15,
            'z': -1.01
        }
    ]
}

// Set the position coordinates of the launch path
function setPositions(orbit) {
    if(orbit === 'leo'){
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

            let newTheta = Math.abs(2 * Math.PI - theta);

            x = r * Math.cos(newTheta);
            y = 0;
            z = r * Math.sin(newTheta);

            pos[index++] = x;
            pos[index++] = y;
            pos[index++] = z;
        }
    }else if(orbit === 'meo'){
        let pos = path.geometry.attributes.position.array,
            step = (2 * Math.PI) / (MAX_POINTS / 4),
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

            let newTheta = Math.abs(2 * Math.PI - theta);

            x = r * Math.cos(newTheta);
            y = 0;
            z = r * Math.sin(newTheta);

            pos[index++] = x;
            pos[index++] = y;
            pos[index++] = z;
        }

        for (let theta = 0; theta < 2 * Math.PI; theta += step) {

            let newTheta = Math.abs(2 * Math.PI - theta);
            let ellipseModifier = 1;

            if(theta > 1.5 * Math.PI){
                ellipseModifier = 1.5;
            }

            x = r * ellipseModifier * Math.cos(newTheta);
            y = 0;
            z = r * 1.5 * Math.sin(newTheta);

            pos[index++] = x;
            pos[index++] = y;
            pos[index++] = z;
        }

        for (let theta = 0; theta < 2 * Math.PI; theta += step) {

            let newTheta = Math.abs(2 * Math.PI - theta);

            x = r * 1.5 * Math.cos(newTheta);
            y = 0;
            z = r * 1.5 * Math.sin(newTheta);

            pos[index++] = x;
            pos[index++] = y;
            pos[index++] = z;
        }
    }else if(orbit === 'heo'){
        let pos = path.geometry.attributes.position.array,
            step = (2 * Math.PI) / (MAX_POINTS / 4),
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

            let newTheta = Math.abs(2 * Math.PI - theta);

            x = r * Math.cos(newTheta);
            y = 0;
            z = r * Math.sin(newTheta);

            pos[index++] = x;
            pos[index++] = y;
            pos[index++] = z;
        }

        for (let theta = 0; theta < 2 * Math.PI; theta += step) {

            let newTheta = Math.abs(2 * Math.PI - theta);
            let ellipseModifier = 1;

            if(theta > 1.5 * Math.PI){
                ellipseModifier = 2;
            }

            x = r * ellipseModifier * Math.cos(newTheta);
            y = 0;
            z = r * 2 * Math.sin(newTheta);

            pos[index++] = x;
            pos[index++] = y;
            pos[index++] = z;
        }

        for (let theta = 0; theta < 2 * Math.PI; theta += step) {

            let newTheta = Math.abs(2 * Math.PI - theta);

            x = r * 2 * Math.cos(newTheta);
            y = 0;
            z = r * 2 * Math.sin(newTheta);

            pos[index++] = x;
            pos[index++] = y;
            pos[index++] = z;
        }
    }
}

function setDirection(orig, angle){
    path.rotation.x -= pathRotations[orig][angle]['x'];
    path.rotation.y -= pathRotations[orig][angle]['y'];
    path.rotation.z -= pathRotations[orig][angle]['z'];
}
