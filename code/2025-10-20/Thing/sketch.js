let things = [];

class Thing {
  constructor(x, y) {
    this.x = x;
    this.y = y
  }
  draw() {
    this.x += random(-1.0, 1.0)
    this.y += random(-1.0, 1.0)
    circle(this.x, this.y, 50)
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for (let t of things) {
    t.draw();
  }
}

function mousePressed() {
  things.push(new Thing(mouseX, mouseY));
}