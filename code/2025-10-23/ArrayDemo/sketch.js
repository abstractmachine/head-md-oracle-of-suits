// Simple p5.js sketch that demonstrates creating many ephemeral objects (Thing),
// drawing them, and removing ("garbage collecting") them from an array when they expire.
// Comments are written for a smart Interaction Design master's student: focus is on
// behavior, reasoning and small design/implementation tradeoffs.

// Global array that holds all active Thing instances.
// We manage lifecycle (alive/dead) in each Thing and keep the array compact
// by removing dead Things each frame.
things = [];

// p5.js setup() — runs once at the start.
// Use it to create the canvas and perform initial setup.
function setup() {
  // create a canvas that fills the window.
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // p5.js draw() — runs continuously (~60fps by default).
  // Clear background with a mid-gray each frame.
  background(128);

  // A lightweight debug display: show the number of things in the center.
  // This is overwritten later after we set fill/textSize/textAlign, but kept here
  // to show the raw count before styling adjustments.
  text(things.length, width * 0.5, height * 0.5);

  // Draw all things.
  // We use a for-of loop which is expressive and avoids indexing boilerplate.
  // Each Thing knows how to draw itself (encapsulation).
  for (let each of things) {
    each.draw();
  }

  // Remove dead things using Array.prototype.filter.
  // Each Thing exposes a boolean `isAlive`. We rebuild `things` with only the
  // living ones — this is a common, simple pattern for managing collections
  // of transient objects in sketches/games.
  //
  // Note: filter creates a new array reference. For very high allocation rates
  // or tight performance budgets you might prefer in-place removal strategies
  // (splice while iterating backward) to avoid frequent GC pressure.
  things = things.filter(each => each.isAlive);

  // Styling for the final text display at the center.
  fill(255);           // white text
  textSize(32);        // readable size
  textAlign(CENTER, CENTER); // center both horizontally and vertically

  // Draw the number of things at the center with the styling above.
  text(things.length, width * 0.5, height * 0.5);
}

// p5.js mouseDragged() — called while the mouse is moved with a button pressed.
// Create a new Thing at the current mouse position and push it into the `things` array.
// Interaction note: mouseDragged produces continuous creation while the pointer moves,
// which produces a trail of Things that fade out.
function mouseDragged() {
  things.push(new Thing(mouseX));
}

// Thing class represents a single ephemeral particle.
// It encapsulates state (position, opacity, alive flag) and behavior (draw).
class Thing {
  // constructor initializes the Thing. We take no explicit x parameter here
  // (the code passes mouseX but the constructor itself reads mouseX/mouseY).
  // This simplifies creation but couples the class to the global input state.
  constructor() {
    // store the creation position
    this.x = mouseX;
    this.y = mouseY;

    // opacity is used both for drawing (alpha) and for lifecycle.
    this.opacity = 255;

    // isAlive flags whether the Thing should remain in the array.
    // We flip this to false when opacity falls to or below zero.
    this.isAlive = true;
  }

  // draw() updates state and renders the circle.
  // This method both mutates the Thing and draws it — common pattern for
  // simple entities in interactive sketches.
  draw() {
    // decay opacity each frame, creating a fade-out over time.
    this.opacity -= 5;

    // once fully faded, mark as dead so the filter step will remove it.
    if (this.opacity <= 0) {
      this.isAlive = false;
    }

    // drawing details:
    noStroke();                    // remove outline
    fill(255, 0, 0, this.opacity); // red with alpha according to opacity
    ellipse(this.x, this.y, 10, 10); // draw a small circle at the stored position
  }
}
