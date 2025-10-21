
// The Setup function runs once when you press the play button
function setup() {
  // Create a canvas that fill the entire window
  createCanvas(windowWidth, windowHeight);
}

// The Draw function runs continuously in a loop
function draw() {
    // Set a pulsing background like breathing white light
    let r = map(sin(frameCount * 0.05), -1, 1, 100, 255);
    background(r);
}
