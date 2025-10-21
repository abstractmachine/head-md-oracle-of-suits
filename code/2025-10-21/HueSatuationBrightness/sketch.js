// an box containing a bunch of things
let things = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  // draw all the things
  for (let thing of things) {
    thing.draw();
  }
}

function mousePressed() {
  // create a new thing at mouse position
  let newThing = new Thing(mouseX, mouseY);
  things.push(newThing);
}
