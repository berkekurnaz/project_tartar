const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/src/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/src/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/src/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/src/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

var isTotalCheckCount = 0;
var isTotalCheckTrueCount = 0;
var isTotalCheckFalseCount = 0;

var countAngry = 0;
var countDisgusted = 0;
var countFearful = 0;
var countHappy = 0;
var countNeutral = 0;
var countSad = 0;
var countSurprised = 0;

var lastDetection = [];

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    lastDetection = detections[0];
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
})

setInterval(checkTheStudent, 3000);

function checkTheStudent(){
  isTotalCheckCount = isTotalCheckCount + 1;
  if(lastDetection != undefined){
    isTotalCheckTrueCount = isTotalCheckTrueCount + 1;
    checkStudentEmotion(lastDetection.expressions);
  }else{
    isTotalCheckFalseCount = isTotalCheckFalseCount + 1;
  }

  console.log(isTotalCheckCount + " - " + isTotalCheckTrueCount + " - " + isTotalCheckFalseCount);
  console.log("Neutral: " + countNeutral + " - Happy: " + countHappy);
}


function checkStudentEmotion(expression){
  if(expression.angry > 0.80){
    countAngry = countAngry + 1;
  }else if(expression.disgusted > 0.80){
    countDisgusted = countDisgusted + 1;
  }else if(expression.fearful > 0.80){
    countFearful = countFearful + 1;
  }else if(expression.happy > 0.80){
    countHappy = countHappy + 1;
  }else if(expression.neutral > 0.80){
    countNeutral = countNeutral + 1;
  }else if(expression.sad > 0.80){
    countSad = countSad + 1;
  }else if(expression.surprised > 0.80){
    countSurprised = countSurprised + 1;
  }else{

  }
}

setLanguageByParameters();

function setLanguageByParameters(){
  const urlParams = new URLSearchParams(window.location.search);
  var lang = urlParams.get('l');
  if(lang == "eng"){
    document.getElementById("txtSessionTime").innerHTML = "Session Time";
    document.getElementById("btnEnd").innerHTML = "End of the session";
  }else if(lang == "tr"){
    document.getElementById("txtSessionTime").innerHTML = "Oturum Süresi";
    document.getElementById("btnEnd").innerHTML = "Oturumu Kapat";
  }
}

$("#btnEnd").click(function(){
  var baseUrl = "/src/result.html?";

  baseUrl += "l=eng&";

  baseUrl += "m="+ document.getElementById("minutes").innerHTML + "&";
  baseUrl += "s="+ document.getElementById("seconds").innerHTML + "&";

  baseUrl += "1=" + isTotalCheckCount +"&";
  baseUrl += "2=" + isTotalCheckTrueCount +"&";
  baseUrl += "3=" + isTotalCheckFalseCount +"&";

  baseUrl += "4=" + countAngry +"&";
  baseUrl += "5=" + countDisgusted +"&";
  baseUrl += "6=" + countFearful +"&";
  baseUrl += "7=" + countHappy +"&";
  baseUrl += "8=" + countNeutral +"&";
  baseUrl += "9=" + countSad +"&";
  baseUrl += "10=" + countSurprised +"&";

  window.open(baseUrl , "_self");
});