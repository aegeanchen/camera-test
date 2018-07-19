var vid, playbtn, pictureBtn, pictureBox, cameraBtn, cameraBox;

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

}
window.onload = initializePlayer();

function playPause() {
    if (vid.paused) {
        vid.play();
    } else {
        vid.pause();
        // playbtn.innerHTML = 'Play';
    }
}

function pictureSettings() {
    if (pictureBox.style.display === "none") {
        if (cameraBox.style.display === "block") {
            cameraBox.style.display = "none";
            pictureBox.style.display = "block";
        }
        pictureBox.style.display = "block";
    } else {
        pictureBox.style.display = "none";
    }
}

function cameraSettings() {
    if (cameraBox.style.display === "none") {
        if (pictureBox.style.display === "block") {
            pictureBox.style.display = "none";
            cameraBox.style.display = "block";
        } else {
            cameraBox.style.display = "block";
        }
    } else {
        cameraBox.style.display = "none";
    }
}
