var vid, playbtn, pictureBtn, pictureBox, cameraBtn, cameraBox;

// var x = event.clientX;
// var y = event.clientY;



function initializePlayer() {
    vid = document.getElementById("video");
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
    if (vid.paused) {
        vid.play();
    } else {
        vid.pause();
        // document.getElementById('playPauseBtn').value="x";
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

function changeText() {
    var x = event.clientX;
    var y = event.clientY;
    var coor = "X: " + x + ", Y: " + y;
    var flag = true;
    if (flag === true) {
        flag = false;
        document.getElementById("textArea1").innerHTML = coor;
    } else {
        document.getElementById("textArea2").innerHTML = coor;
        flag = true;
    }
}