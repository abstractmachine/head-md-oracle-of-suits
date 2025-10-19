function setup() {
  createCanvas(displayWidth, displayHeight);
}

function draw() {
  diameter = dist(mouseX, mouseY, pmouseX, pmouseY);
  circle(mouseX, mouseY, diameter);
}

function mousePressed() {
  background(255);
}
