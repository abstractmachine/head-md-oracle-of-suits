// the blendshapes we are going to track
let leftEyeBlink = 0.0;
let rightEyeBlink = 0.0;
let jawOpen = 0.0;

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

  // clear the canvas
  background(128);

  if (isVideoReady()) {
    // show video frame
    image(videoElement, 0, 0);
  }

  // get detected faces
  let faces = getFaceLandmarks();

  // see blendshapes.txt for full list of possible blendshapes
  leftEyeBlink = getBlendshapeScore('eyeBlinkLeft');
  rightEyeBlink = getBlendshapeScore('eyeBlinkRight');
  jawOpen = getBlendshapeScore('jawOpen');

  // if we have at least one face
  if (faces && faces.length > 0) {
    // draw eyes and mouth for the first face
    drawEyes(faces[0]);
    drawMouth(faces[0]);
  }

  fill(255);
  noStroke();
  textSize(16);
  text("leftEyeBlink: " + leftEyeBlink.toFixed(2), 10, height - 60);
  text("rightEyeBlink: " + rightEyeBlink.toFixed(2), 10, height - 40);
  text("jawOpen: " + jawOpen.toFixed(2), 10, height - 20);

}


function drawEyes(landmarks) {

  // see features.txt for full list of possible features
  let leftEyeEdges = getFeatureEdges(landmarks, 'FACE_LANDMARKS_LEFT_EYE');
  let leftIrisEdges = getFeatureEdges(landmarks, 'FACE_LANDMARKS_LEFT_IRIS');
  let rightEyeEdges = getFeatureEdges(landmarks, 'FACE_LANDMARKS_RIGHT_EYE');
  let rightIrisEdges = getFeatureEdges(landmarks, 'FACE_LANDMARKS_RIGHT_IRIS');

  if (leftEyeEdges.length === 0 || rightEyeEdges.length === 0) return;

  // fill left eye area
  stroke(255, 255, 0);
  strokeWeight(1);
  noFill();
  beginShape();
  for (const edge of leftEyeEdges) {
    const p = markToPixel(edge.a, videoElement.width, videoElement.height);
    if (p) {
      vertex(p.x, p.y);
    }
  }
  endShape(CLOSE);

  // if left eye is NOT blinking, fill it
  noStroke();
  fill(0, 255, 0);
  if (leftEyeBlink < 0.5) {
    beginShape();
    for (const edge of leftIrisEdges) {
      const p = markToPixel(edge.a, videoElement.width, videoElement.height);
      if (p) {
        vertex(p.x, p.y);
      }
    }
    endShape(CLOSE);
  }

  if (rightEyeBlink < 0.5) {
    // if right eye is NOT blinking, fill it
    noStroke();
    fill(0, 0, 255);
    beginShape();
    for (const edge of rightIrisEdges) {
      const p = markToPixel(edge.a, videoElement.width, videoElement.height);
      if (p) {
        vertex(p.x, p.y);
      }
    }
    endShape(CLOSE);
  }

  // fill right eye area
  stroke(255, 255, 0);
  strokeWeight(1);
  noFill();
  beginShape();
  for (const edge of rightEyeEdges) {
    const p = markToPixel(edge.a, videoElement.width, videoElement.height);
    if (p) {
      vertex(p.x, p.y);
    }
  }
  endShape(CLOSE);

}

function drawMouth(landmarks) {

  let mouthEdges = getFeatureEdges(landmarks, 'FACE_LANDMARKS_LIPS');

  if (mouthEdges.length === 0) return;

  if (jawOpen > 0.5) {
    fill(255, 0, 255);
  } else {
    noFill();
  }

  // fill mouth area
  stroke(255, 255, 0);
  strokeWeight(1);
  beginShape();
  for (const edge of mouthEdges) {
    const p = markToPixel(edge.a, videoElement.width, videoElement.height);
    if (p) {
      vertex(p.x, p.y);
    }
  }
  endShape(CLOSE);

}


