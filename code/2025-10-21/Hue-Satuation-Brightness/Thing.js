// a class defines a concept of a "thing"
class Thing {
    // a constructor initializes a thing with properties
    // we only want x,y position for now
    constructor(x,y) {
        this.x = x;
        this.y = y;
        // random hue between 0 and 360
        // but only 6 different values
        this.hue = floor(random(6)) * 60;
        this.saturation = 100;
        this.brightness = 100;
    }
    // a method to draw the thing
    draw() {
        // use Hue, Saturation, Brightness color mode
        colorMode(HSB);
        fill(this.hue, this.saturation, this.brightness);
        // remove the outline
        noStroke();
        // draw a circle at the thing's position
        circle(this.x, this.y, width*0.1);
    }
}