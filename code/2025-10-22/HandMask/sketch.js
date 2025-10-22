// create an array to hold the permimeters
let handPerimeters = [];
// offscreen buffers (created in setup / recreated on resize)
let gBuffer, gMask;
// create an offset for the outline of the perimeter to be bigger
const outlineOffset = 50;

function setup() {

  // full window canvas
  createCanvas(640, 480);

  // prepare offscreen buffers once
  gBuffer = createGraphics(width, height);
  gMask = createGraphics(width, height);

  // initialize MediaPipe settings
  setupHands();
  // start camera using MediaPipeHands.js helper
  setupVideo();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // recreate buffers to match new canvas size (avoid allocating each frame)
  gBuffer = createGraphics(width, height);
  gMask = createGraphics(width, height);
}


function draw() {
  // clear the canvas
  background(255);

  // if the video connection is ready
  if (isVideoReady()) {
    // draw the capture image
    image(videoElement, 0, 0);
  }

  // use thicker lines for drawing hand connections
  strokeWeight(2);

  // make sure we have detections to draw
  if (detections) {

    // clear previous frame's perimeters
    handPerimeters = [];

    // for each detected hand
    for (let hand of detections.multiHandLandmarks) {
      detectPerimeter(hand);
    } // end of hands loop

  } // end of if detections

  // now that we have all perimeters
  // erase everything that is outside any of the hand perimeters
  if (handPerimeters.length) {

    // draw the current video frame into the offscreen buffer
    gBuffer.clear();
    gBuffer.image(videoElement, 0, 0, width, height);

    // build mask: white where hand should remain
    gMask.clear();
    gMask.noStroke();
    gMask.fill(255);
    for (let perimeter of handPerimeters) {
      if (!perimeter || !perimeter.length) continue;
      gMask.beginShape();
      for (let p of perimeter) gMask.vertex(p.x, p.y);
      gMask.endShape(CLOSE);
    }

    // apply mask to the video buffer: destination-in keeps only masked pixels
    gBuffer.drawingContext.save();
    gBuffer.drawingContext.globalCompositeOperation = 'destination-in';
    gBuffer.image(gMask, 0, 0);
    gBuffer.drawingContext.restore();

    // draw a white background and then the masked buffer (hands only)
    background(255);
    image(gBuffer, 0, 0, width, height);

  }

} // end of draw

function detectPerimeter(landmarks) {

  // draw concave perimeter around the hand
  const perimeter = getHandPerimeter(landmarks);
  if (perimeter.length) {
    stroke(0, 150, 255);
    fill(0, 150, 255, 60);
    strokeWeight(2);
    beginShape();
    for (let p of perimeter) vertex(p.x, p.y);
    endShape(CLOSE);
  }

  // push this perimeter to the array
  handPerimeters.push(perimeter);

}


function drawLandmarks(landmarks) {

  noStroke();
  // set fill color for landmarks
  fill(255, 0, 0);

  for (let mark of landmarks) {
    // adapt the coordinates (0..1) to video coordinates
    let x = mark.x * videoElement.width;
    let y = mark.y * videoElement.height;
    circle(x, y, 6);
  }

}


function drawConnections(landmarks) {

  // set stroke color for connections
  stroke(0, 255, 0);

  // iterate through each connection
  for (let connection of HAND_CONNECTIONS) {
    // get the two landmarks to connect
    const a = landmarks[connection[0]];
    const b = landmarks[connection[1]];
    // skip if either landmark is missing
    if (!a || !b) continue;
    // landmarks are normalized [0..1], (x,y) with origin top-left
    let ax = a.x * videoElement.width;
    let ay = a.y * videoElement.height;
    let bx = b.x * videoElement.width;
    let by = b.y * videoElement.height;
    line(ax, ay, bx, by);
  }

}

// new helper: returns ordered perimeter points (concave hull) for MediaPipe 21-landmark hand
function getHandPerimeter(landmarks) {
  if (!landmarks || landmarks.length < 21) return [];
  const toCanvas = i => ({ x: landmarks[i].x * videoElement.width, y: landmarks[i].y * videoElement.height });
  const lerpPoint = (A, B, t = 0.6) => ({ x: A.x * (1 - t) + B.x * t, y: A.y * (1 - t) + B.y * t });

  // create two interpolated wrist-base points to restore the rounded palm base
  const wrist = toCanvas(0);
  const baseLeft = lerpPoint(wrist, toCanvas(17), 0.6);   // toward pinky side
  const baseRight = lerpPoint(wrist, toCanvas(5), 0.6);   // toward index/thumb side

  // raw perimeter (walks outer contour)
  const pts = [
    baseLeft,
    toCanvas(17), toCanvas(18), toCanvas(19), toCanvas(20),
    toCanvas(16), toCanvas(15), toCanvas(14), toCanvas(13),
    toCanvas(12), toCanvas(11), toCanvas(10), toCanvas(9),
    toCanvas(8), toCanvas(7), toCanvas(6), toCanvas(5),
    toCanvas(4), toCanvas(3), toCanvas(2), toCanvas(1),
    baseRight
  ].filter(p => p && isFinite(p.x) && isFinite(p.y));

  // helper: normalize vector
  const norm = v => {
    const l = Math.hypot(v.x, v.y) || 1;
    return { x: v.x / l, y: v.y / l };
  };

  // compute signed area to get orientation
  let area = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length];
    area += a.x * b.y - b.x * a.y;
  }

  // offset only convex (exterior) vertices
  const out = [];
  for (let i = 0; i < pts.length; i++) {
    const prev = pts[(i - 1 + pts.length) % pts.length];
    const cur = pts[i];
    const next = pts[(i + 1) % pts.length];

    const v1 = { x: cur.x - prev.x, y: cur.y - prev.y };
    const v2 = { x: next.x - cur.x, y: next.y - cur.y };
    const cross = v1.x * v2.y - v1.y * v2.x;

    // convex if cross has same sign as area
    const isConvex = cross * area > 0;

    if (!isConvex || outlineOffset === 0) {
      out.push(cur);
      continue;
    }

    // outward normals for each adjacent edge (depends on polygon orientation)
    let n1, n2;
    if (area > 0) { // CCW polygon -> outward is right normal
      n1 = norm({ x: v1.y, y: -v1.x });
      n2 = norm({ x: v2.y, y: -v2.x });
    } else { // CW polygon -> outward is left normal
      n1 = norm({ x: -v1.y, y: v1.x });
      n2 = norm({ x: -v2.y, y: v2.x });
    }

    // bisector of the two normals (fall back to n1 if degenerate)
    let bx = n1.x + n2.x, by = n1.y + n2.y;
    const bl = Math.hypot(bx, by);
    let bis;
    if (bl < 1e-6) bis = n1;
    else bis = { x: bx / bl, y: by / bl };

    // apply offset outward along bisector
    out.push({ x: cur.x + bis.x * outlineOffset, y: cur.y + bis.y * outlineOffset });
  }

  return out;
}
