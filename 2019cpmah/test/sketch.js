class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
    show() {
        noFill();
        stroke(255);
        circle(this.x, this.y, this.r);
    }
}
let a, b, c, d;
function setup() {
    createCanvas(355, 667);
    angleMode(DEGREES);
    const theta = 180 / 5;
    const co = cos(theta);
    const si = sin(theta);
    console.log(co);
    let sr = height / (2 * (3 * co + 1));

    a = new Circle(0, height / 2, 2 * sr);
    b = new Circle(0 + 3 * sr * si, height / 2 - 3 * sr * co, sr);
}
function draw() {
    background(51);
    a.show();
    b.show();
    c.show();
}