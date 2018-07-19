"use strict";

// setTimeout(imageWebRTC, 2000);
setTimeout(setupCanvas, 2000);

function imageWebRTC()
{
  console.log("imageWebRTC");
  var track = window.stream.getVideoTracks()[0];
  const imageCapture = new ImageCapture(track);

  // var supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
  // console.log("Constraints: " + JSON.stringify(supportedConstraints));

  var capabilities = track.getCapabilities();
  console.log("Capabilities: " + JSON.stringify(capabilities));

  if(capabilities.whiteBalanceMode)
  {
    console.log("WB supported");
    track.applyConstraints({advanced: [{
      whiteBalanceMode: "manual",
      colorTemperature: 15,
      // saturation: 0, // (0 to ?)
      // sharpness: 1,

    }]});
    setTimeout(function(){
      var settings = track.getConstraints();
      console.log("Settings: " + JSON.stringify(settings));
    }, 3000);
  }

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // const canvas2 = document.getElementById("canvas2");
  // const context = canvas2.getContext("2d");

  // const image = document.getElementById("image");

  // setInterval(canvasFrame, 16);
  canvasFrame();

  function canvasFrame()
  {
    imageCapture.grabFrame().then(updateImg).catch(err => console.log("No frame available: ", err));
  }
  function updateImg(imgData)
  {
    canvas.width = imgData.width;
    canvas.height = imgData.height;
    // canvas2.width = imgData.width;
    // canvas2.height = imgData.height;

    ctx.drawImage(imgData, 0, 0);

    var imageData = ctx.getImageData(0,0, canvas.width, canvas.height);
    var data = imageData.data;
    // var pixel = 5*959 + 1;
    // console.log("R: " + data[pixel] + " G: " + data[pixel+1] + " B: " + data[pixel+2] + " A: " + data[pixel+3]);
    // for(var i = 0; i<data.length; i+=4)
    // {
    //   var grey = (data[i] * 0.299 + data[i+1] * 0.587 + data[i+2] * 0.114);
    //   var Cb = (data[i+1] - grey)/1.772;
    //   var Cr = (data[i] - grey)/1.402;
    //
    //   data[i] = Cr;
    //   data[i+1] = grey - (Cb + Cr);
    //   data[i+2] = Cb;
    //   // data[i+1] *= 1.2;
    //   // data[i+2] *= 1.4;
    //   // red>(green+blue)/2? ((green + blue)/2): red;
    //
    //
    //   // Greyscale
    //
    //   // var grey = (data[i] * 0.299 + data[i+1] * 0.587 + data[i+2] * 0.114);
    //   // data[i] = grey;
    //   // data[i+1] = grey;
    //   // data[i+2] = grey;
    // }
    // context.putImageData(imageData, 0, 0);
    canvasFrame();
    // ctx.putImageData(imageData, 0, 0);
    // setTimeout(function(){
    //   console.log("Updatad");
    // }, 4000);
  }
}

function setupCanvas()
{
  console.log("setupCanvas");
  var video = document.getElementById("video");
  const width = video.videoWidth;
  const height = video.videoHeight;;
  console.log("Width: ", width)
  var track;

  setTimeout(function(){
    track = window.stream.getVideoTracks()[0];
    var supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
    console.log("Supported constraints: " + JSON.stringify(supportedConstraints));
    setTimeout(constraints, 4000);
  }, 2000);

  function constraints()
  {
    var capabilities = track.getCapabilities();
    console.log("Capabilities: " + JSON.stringify(capabilities));
    if(capabilities.whiteBalanceMode)
    {
      console.log("WB supported");
      track.applyConstraints({advanced: [{
        whiteBalanceMode: "manual",
        colorTemperature: 15,
      }]});
    }
    else {
      console.log("NADA");
    }
  }


  var canvas2 = document.getElementById("canvas2");
  canvas2.width = width;
  canvas2.height = height;

  var context = canvas2.getContext("2d");
  setInterval(drawToCanvas, 16);

  function drawToCanvas()
  {
    context.drawImage(video, 0, 0, width, height);
  }
}
