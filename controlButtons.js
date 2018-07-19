var vid, playbtn;

function initializePlayer() {
    vid = document.getElementById("video");
    playbtn = document.getElementById("playPauseBtn");
    playbtn.addEventListener("click", playPause, false);

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