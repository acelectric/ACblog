class Circle {
    constructor(x, y, r, text = 'text', href) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.text = text;
        this.href = address + href;
        this.fillColor = color('#C06014');
        this.initFillColor = this.fillColor;
        this.rNow = 0;
    }
    setHref(href) {
        this.href = address + href;
    }
    show(target = 1) {
        noStroke(color('#C06014'));
        fill(this.fillColor);
        circle(this.x, this.y, (this.rNow / 0.8) * 0.9);
        if (target == 0) {
            strokeWeight(this.r * 0.03);
            noFill();
            stroke(this.fillColor);
            circle(this.x, this.y, (this.rNow / 0.8) * 0.9);
        }
        textAlign(CENTER, CENTER);
        textSize(this.rNow / 3);
        noStroke();
        fill(255);
        text(this.text, this.x, this.y);
        if (this.rNow < this.r * 0.8) {
            this.rNow += this.r / 20;
        }
    }

    isMouseInArea() {
        let a = Math.abs(this.x - mouseX);
        let b = Math.abs(this.y - mouseY);
        let c = Math.sqrt(a * a + b * b);
        if (c <= this.r * 0.9) {
            return true;
        }
    }
}
let img;
function preload() {
    img = loadImage(address + 'bg1.jpg');
}

let obj = [];
function setup() {
    angleMode(DEGREES);
    let container = document.getElementById('canvas');
    let cvs = createCanvas(container.offsetWidth, container.offsetHeight);
    cvs.parent(container);

    let texts = ["台灣古蹟", "國定古蹟", "直轄市定古蹟", "縣市定古蹟", "製作團隊"];
    let title = "台\n灣\n古\n蹟";
    let hrefs = ["index.html", "map.html?p=national", "map.html?p=municipality", "map.html?p=county", "aboutUs.html"];
    let colors = ["#775253", "#0C1B33", "#7A306C", "#03B5AA", "#212922"];

    if (height < width) {
        // 電腦
        const maxSR = height / 8;
        const maxBR = width / 4;
        obj.push(new Circle(width / 4, height / 2, maxBR));
        obj.push(new Circle(5 * width / 8, height / 8, maxSR));
        obj.push(new Circle(7 * width / 8, 3 * height / 8, maxSR));
        obj.push(new Circle(5 * width / 8, 5 * height / 8, maxSR));
        obj.push(new Circle(7 * width / 8, 7 * height / 8, maxSR));
    } else {
        // 手機
        const maxSR = width / 8;
        const maxBR = height / 4;
        obj.push(new Circle(width / 2, height / 4, maxBR));
        obj.push(new Circle(width / 8, 5 * height / 8, maxSR));
        obj.push(new Circle(3 * width / 8, 7 * height / 8, maxSR));
        obj.push(new Circle(5 * width / 8, 5 * height / 8, maxSR));
        obj.push(new Circle(7 * width / 8, 7 * height / 8, maxSR));
    }


    for (i = 0; i < obj.length; i++) {
        // obj[i].startX = bigX;
        // obj[i].startY = bigY;
        obj[i].text = texts[i];
        obj[i].setHref(hrefs[i]);
        obj[i].initFillColor = color(colors[i]);
    }

}
function draw() {
    // background(255);
    image(img, 0, 0, width, height);
    let c = 'default';
    for (i = 0; i < obj.length; i++) {
        obj[i].show(i);
        if (obj[i].isMouseInArea()) {
            obj[i].fillColor = color('#9b29ff');
            c = 'pointer';
        } else {
            obj[i].fillColor = obj[i].initFillColor;
        }
    }
    cursor(c);
}
function mousePressed() {
    for (let i = 0; i < obj.length; i++) {

        if (obj[i].isMouseInArea()) {
            location.assign(obj[i].href);
        } else {

        }
    }
}