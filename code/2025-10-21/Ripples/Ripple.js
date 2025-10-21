class Ripple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.diameter = 0;
        this.opacity = 255;
        this.alive = true;
    }

    draw() {
        noFill();
        // increase diameter to create expanding effect
        this.diameter += 5;
        // decrease opacity to create fading effect
        this.opacity -= 5;
        stroke(0, this.opacity);
        // are we still alive?
        if (this.opacity <= 0) {
            this.alive = false;
        }
        // draw the ripple
        circle(this.x, this.y, this.diameter);
    }
}