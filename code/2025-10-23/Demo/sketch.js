// the blendshapes we are going to track
function setup() {
  // full window canvas
  createCanvas(windowWidth, windowHeight);
  // initialize MediaPipe
  setupFace();
  setupVideo();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {

  // get detected faces
  let faces = getFaceLandmarks();

  noseSneer = getBlendshapeScore('noseSneerLeft') + getBlendshapeScore('noseSneerRight');
  noseSneer = map(noseSneer, 0, 0.00001, 0, 1.0);
  // see blendshapes.txt for full list of possible blendshapes
  jawOpen = getBlendshapeScore('jawOpen');

  // if the jaw is open set background to blue, if closed set to red
  if (jawOpen < 0.5) {
    background(0, 0, 255);
  } else {
    background(255, 0, 0);
  }

  if (isVideoReady()) {
    // show video frame
    image(videoElement, 0, 0);
  }

  // draw the leftEyeBlink value in text under the video
  fill(255);
  textSize(32);
  text('jawOpen: ' + jawOpen, 20, videoElement.height + 20, width, 200);
  text('noseSneer: ' + nf(noseSneer,0,10), 20, videoElement.height + 60, width, 200);

}
