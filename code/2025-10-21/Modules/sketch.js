// create an empty array named things
let things = []

function setup() {
  // full window canvas
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  // draw all the things
  for (let i = 0; i < things.length; i++) {
    things[i].draw();
  }
}

function mousePressed() {
  // create a new thing at mouse position and add it to the things array
  let t = new Thing();
  // add a new Ting to the things array
  things.push(t);
}