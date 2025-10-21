// create an empty array
let values = [];
// create and oscillator
let osc;
// which note we are playing
let index = 0;
// start a countdown timer
let timer = 10;

function setup() {
  // fit the canvas to the window size
  createCanvas(windowWidth, windowHeight);

  // add 100 random values to the array
  for (let i = 0; i < 100; i++) {
    values.push(random(10, 220));
  }

  // start the oscillator
  osc = new p5.Oscillator('sine');
  osc.start();
}

function draw() {
  background(220);
  // draw a circle in the center of the canvas with the size based on the current note
  circle(width*0.5, height*0.5, values[index]*0.5);

  // count down
  timer -= 1;
  // if the timer reaches zero
  if (timer <= 0) {
    // play the current note
    osc.freq(values[index]);
    // move to the next note
    index += 1;
    // if we reach the end of the array, start over
    if (index >= values.length) {
      index = 0;
    }
    // reset the timer
    timer = 10;
  }
}
