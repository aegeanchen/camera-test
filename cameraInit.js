var videoElement = document.querySelector("video");
var videoSelect = document.querySelector("select#videoSource");
var selectors = [videoSelect];
var mediaStreamTrack;

var _isWBAvailable = false;

function gotDevices(deviceInfos) {
  console.log("gotDevices.");
  // Handles being called several times to update labels. Preserve values.
  var values = selectors.map(function(select) {
    return select.value;
  });
  selectors.forEach(function(select) {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  });
  for (var i = 0; i !== deviceInfos.length; ++i) {
    var deviceInfo = deviceInfos[i];
    var option = document.createElement('option');
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || 'camera ' + (videoSelect.length + 1);
      videoSelect.appendChild(option);
    }
  }
  selectors.forEach(function(select, selectorIndex) {
    if (Array.prototype.slice.call(select.childNodes).some(function(n) {
      return n.value === values[selectorIndex];
    })) {
      select.value = values[selectorIndex];
    }
  });
}

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

function gotStream(stream) {
  console.log("gotStream.");
  window.stream = stream;
  videoElement.srcObject = stream;  //Shows the video here.
  mediaStreamTrack = stream.getVideoTracks()[0];
  return navigator.mediaDevices.enumerateDevices();
}

function canvasSetup()
{
  setTimeout(function(){
    const canvas = document.getElementById("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const context = canvas.getContext("2d");

    setInterval(function(){
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    }, 33);

    checkConstraints();
  }, 2000);
}

function checkConstraints()
{
  var wbRange = document.getElementById("wbRange");
  setTimeout(function(){
    let capabilities = mediaStreamTrack.getCapabilities();
    if(capabilities.whiteBalanceMode)
    {
      _isWBAvailable = true;
      wbRange.disabled = false;
      console.log("WB available.");
      // Enable WB slider?
    }
    else
    {
      _isWBAvailable = false;
      wbRange.disabled = true;
      console.log("WB not available.");
      // Disable WB slider.
    }
  }, 1000);
}

function applyConstraints(wbValue)
{
  if(_isWBAvailable)
  {
    console.log("wbValue = " + wbValue);
    mediaStreamTrack.applyConstraints({
      advanced: [{
        whiteBalanceMode: "manual",
        colorTemperature: wbValue,
      }]
    });
    let settings = mediaStreamTrack.getSettings();
    console.log("Settings: " + JSON.stringify(settings));
  }
  else
  {
    console.log("WB not available.");
  }
}

function start() {
  console.log("start.");
  if (window.stream) {
    window.stream.getTracks().forEach(function(mediaStreamTrack) {
      mediaStreamTrack.stop();
    });
  }
  var videoSource = videoSelect.value;
  var constraints = {
    audio: false,
    video: {
      deviceId: videoSource ? {exact: videoSource} : undefined,
      width: {ideal: 1280},
      height: {ideal: 720},
      frameRate: {ideal: 30},
    },
  };
  // console.log("start end.");
  navigator.mediaDevices.getUserMedia(constraints).
      then(gotStream).then(gotDevices).then(canvasSetup).catch(handleError);
}

videoSelect.onchange = start;

start();

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}


