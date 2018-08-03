var vid, playbtn, pictureBtn, pictureBox, cameraBtn, cameraBox, container;


function initializePlayer() {
    vid = document.getElementById("video");

    container = document.getElementById("container");
    playbtn = document.getElementById("playPauseBtn");
    playbtn.addEventListener("click", playPause, false);

    pictureBtn = document.getElementById("pictureBtn");
    pictureBtn.addEventListener("click", pictureSettings, false);
    pictureBox = document.getElementById("pictureSettings");

    cameraBtn = document.getElementById("cameraBtn");
    cameraBtn.addEventListener("click", cameraSettings, false);
    cameraBox = document.getElementById("cameraSettings");

    controlComponent = document.getElementById("videoControls");



}
window.onload = initializePlayer();
pictureBox.style.display = "none";
cameraBox.style.display = "none";



window.addEventListener('mouseup', function (event) {
    if (event.target != pictureBox && event.target.parentNode.parentNode != pictureBox && event.target.parentNode.parentNode.parentNode != pictureBox) {
        pictureBox.style.display = "none";
    }
    if (event.target != cameraBox && event.target.parentNode.parentNode != cameraBox && event.target.parentNode.parentNode.parentNode != pictureBox) {
        cameraBox.style.display = "none";
    }
});


function mousein() {
    controlComponent.style.visibility = 'inherit';
}

function mouseout() {
    controlComponent.style.visibility = 'hidden';
}


function playPause() {
    if (container.style.display === "none") {
        container.style.display = "block";
    } else {
        container.style.display = "none";
    }
}

function pictureSettings() {
    if (pictureBox.style.display === "none") {
        pictureBox.style.display = "block";
    } else {
        pictureBox.style.display = "none";
    }
}

function cameraSettings() {
    if (cameraBox.style.display === "none") {
            cameraBox.style.display = "block";
    } else {
        cameraBox.style.display = "none";
    }
}

// use ES6 arrow function
const initDraw = (canvas) => {
    // Put variables on the top of the function scope
    const mouse = {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0
    };
    let element = null;
    let endOneDraw = true;
    let x1, y1, x2, y2, coord1, coord2;

    // Name: e or event? the style should be uniform
    const setMousePosition = (event) => {
        // always use let rather than var
        let ev = event || window.event; //Moz || IE
        if (ev.pageX) { //Moz
            mouse.x = ev.pageX + window.pageXOffset;
            mouse.y = ev.pageY + window.pageYOffset;
        } else if (ev.clientX) { //IE
            mouse.x = ev.clientX + document.body.scrollLeft;
            mouse.y = ev.clientY + document.body.scrollTop;
        }
    };

    canvas.onmousemove = (event) => {
        setMousePosition(event);
        if (!endOneDraw) {
            element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
            element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
            element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x - 100 + 'px' : mouse.startX - 100 + 'px';
            element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y - 200 + 'px' : mouse.startY - 200 + 'px';
        }
    }

    canvas.onclick = (event) => { 
        if (endOneDraw) {
            if (element) {
                console.log('Clearing...');
                canvas.removeChild(element);
                element = null;
                console.log('Cleared.');
            }
            console.log("Begin to draw...");
            coord1 = [event.clientX, event.clientY];
            // deconstructive assignment
            [x1, y1] = coord1;
            document.getElementById('textArea1').innerHTML = coord1.join(', ');
            mouse.startX = mouse.x;
            mouse.startY = mouse.y;
            element = document.createElement('div');
            element.className = 'rectangle';
            element.style.left = `${mouse.x}px`;
            element.style.top = `${mouse.y}px`
            canvas.appendChild(element);
            canvas.style.cursor = "crosshair";
            endOneDraw = false;
        } else {
            coord2 = [event.clientX, event.clientY];
            document.getElementById("textArea2").innerHTML = coord2.join(', ');
            [x2, y2] = coord2;
            let offsetX = Math.abs(x1 - x2);
            let offsetY = Math.abs(y1 - y2);
            document.getElementById("textArea3").innerHTML = `${offsetX}, ${offsetY}`;
            canvas.style.cursor = 'default';
            endOneDraw = true;
            console.log("Finished.");
        }
    }
}

initDraw(document.getElementById('drawArea'));