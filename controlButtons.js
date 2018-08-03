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

initDraw(document.getElementById('drawArea'));

function initDraw(canvas) {
    function setMousePosition(e) {
        var ev = e || window.event; //Moz || IE
        if (ev.pageX) { //Moz
            mouse.x = ev.pageX + window.pageXOffset;
            mouse.y = ev.pageY + window.pageYOffset;
        } else if (ev.clientX) { //IE
            mouse.x = ev.clientX + document.body.scrollLeft;
            mouse.y = ev.clientY + document.body.scrollTop;
        }
    };

    var mouse = {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0
    };
    var element = null;
    var x1, y1, x2, y2, coor1, coor2;

    canvas.onmousemove = function (e) {
        setMousePosition(e);
        if (element !== null) {
            element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
            element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
            element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x - 100 + 'px' : mouse.startX - 100 + 'px';
            element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y - 200 + 'px' : mouse.startY - 200 + 'px';
        }
    }

    canvas.onclick = function (e) {
        if (element !== null) {
            element = null;
            x2 = event.clientX;
            y2 = event.clientY;
            coor2 = x2 + ", " + y2;
            document.getElementById("textArea2").innerHTML = coor2;
            var coor1 = document.getElementById("textArea1").innerHTML;
            var x1 = coor1.split(',')[0];
            var y1 = coor1.split(',')[1];
            var x = Math.abs(x1 - x2);
            var y = Math.abs(y1 - y2);
            document.getElementById("textArea3").innerHTML = x + ", " + y;
            canvas.style.cursor = "default";
            console.log("finished.");
        } else {
            // var removeElement = document.getElementsByClassName('rectangle');

            console.log("begun.");
            x1 = event.clientX;
            y1 = event.clientY;
            coor1 = x1 + ", " + y1;
            document.getElementById("textArea1").innerHTML = coor1;
            mouse.startX = mouse.x;
            mouse.startY = mouse.y;
            // var toRemove = document.getElem.

            element = document.createElement('div');
            element.className = 'rectangle';
            element.style.left = mouse.x + 'px';
            element.style.top = mouse.y + 'px';
            canvas.appendChild(element);
            canvas.style.cursor = "crosshair";
        }
    }
}