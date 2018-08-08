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
    let startX, startY, startCoord, endCoord;

    // Name: e or event? the style should be uniform
    const setMousePosition = (event) => {
        // always use let rather than var
        let ev = event || window.event;  // Moz || IE
        if (ev.pageX) {  // Moz
            mouse.x = ev.pageX + window.pageXOffset;
            mouse.y = ev.pageY + window.pageYOffset;
        } else if (ev.clientX) { // IE
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
            element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y - 100 + 'px' : mouse.startY - 100 + 'px';
        }
    }

    canvas.onclick = (event) => {
        let top = parseInt($('.container').css( "top" ).split('px')[0]);
        let left = parseInt($('.container').css( "left" ).split('px')[0]);
        if (endOneDraw) {

            if (element) {
                canvas.removeChild(element);
                element = null;
            }

            startCoord = [event.clientX - left, event.clientY - top];
            [startX, startY] = startCoord;
            document.getElementById('textArea1').innerHTML = startCoord.join(', ');
            mouse.startX = mouse.x;
            mouse.startY = mouse.y;
            element = document.createElement('div');
            element.className = 'rectangle';
            element.style.left = `${mouse.x}px`;
            element.style.top = `${mouse.y}px`;
            canvas.appendChild(element);
            canvas.style.cursor = "crosshair";
            endOneDraw = false;
        } else {
            endCoord = [event.clientX - left, event.clientY - top];
            document.getElementById("textArea2").innerHTML = endCoord.join(', ');
            let offsetX = Math.abs(startX - endCoord[0]);
            let offsetY = Math.abs(startY - endCoord[1]);
            document.getElementById("textArea3").innerHTML = `${offsetX}, ${offsetY}`;
            canvas.style.cursor = 'default';
            endOneDraw = true;
        }
    }
}

initDraw(document.getElementById('drawArea'));

function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

function rgbToHex(R,G,B) {return "#" + toHex(R)+toHex(G)+toHex(B)}
function toHex(n) {
    n = parseInt(n,10);
    if (isNaN(n)) return "00";
    n = Math.max(0,Math.min(n,255));
    return "0123456789ABCDEF".charAt((n-n%16)/16)
        + "0123456789ABCDEF".charAt(n%16);
}

function colorMix(color1,color2,value){
    var color1Value = value;
    var color2Value = 100 - value;

    var colorR = ((color1Value/100) * hexToR(color1)) +
        ((color2Value/100) * hexToR(color2));
    var colorB = ((color1Value/100) * hexToB(color1)) +
        ((color2Value/100) * hexToB(color2));
    var colorG = ((color1Value/100) * hexToG(color1)) +
        ((color2Value/100) * hexToG(color2));

    return rgbToHex(colorR,colorG,colorB);
}

$(document).ready(function(){
    $(".slider").on("change mousemove", function() {
        var color2 = "#a1dffc";
        var color1 = "#f9d475";
        $(this).css("background-color",colorMix(color1,color2,this.value));
    });
});

