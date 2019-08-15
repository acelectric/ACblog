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
let obj = [];
function setup() {
    createCanvas(800, 800);
    angleMode(DEGREES);
    const theta = 180 / 5;
    const co = cos(theta);
    const si = sin(theta);
    console.log(co);
    let sr = height / (2 * (3 * co + 1));

    a = new Circle(0, height / 2, 2 * sr);
    obj.push(a);
    for (let i = 1; i <= 4; i++) {
        obj.push(new Circle(0 + 3 * sr * sin(i * theta), height / 2 - 3 * sr * cos(i * theta), sr));
    }

}
function draw() {
    background(51);
    a.show();
    for (let i = 0; i < obj.length; i++) {
        obj[i].show();
    }
    for (let i = 1; i < obj.length; i++) {
        line(a.x, a.y, obj[i].x, obj[i].y)
    }
}