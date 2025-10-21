// create the ripples array
let ripples = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  // draw all ripples
  for (let ripple of ripples) {
    ripple.draw();
  }
  // remove dead ripples
  ripples = ripples.filter(ripple => ripple.alive);
}

function mousePressed() {
  let ripple = new Ripple(mouseX, mouseY);
  // add ripple to an array or draw it directly
  ripples.push(ripple);
  print(ripples.length);
}
