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
        circle(this.x, this.y, this.rNow);
        if (target == 0) {
            strokeWeight(this.r * 0.03);
            noFill();
            stroke(this.fillColor);
            circle(this.x, this.y, this.rNow * 1.1);
        }
        textAlign(CENTER, CENTER);
        textSize(this.rNow / 3);
        noStroke();
        fill(255);
        text(this.text, this.x, this.y);
        if (this.rNow < this.r) {
            this.rNow += this.r / 20;
        } else {
            this.rNow = this.r;
        }
    }

    isMouseInArea() {
        let a = Math.abs(this.x - mouseX);
        let b = Math.abs(this.y - mouseY);
        let c = Math.sqrt(a * a + b * b);
        if (c <= this.r) {
            return true;
        }
    }
}
let img;
function preload() {
    // let address = 'https://acblog.nctu.me/2019cpmah/'
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
    let colors = ["#775253", "#0C1B33", "#7A306C", "#03B5AA", "#eb6e21"];

    if (height < width) {
        // 電腦
        // case1
        // const maxSR = height / 8 < width / 8 ? height / 8 : width / 8;
        // const maxBR = width / 4 < height / 2 ? width / 4 : height / 2;
        // obj.push(new Circle(width / 4, height / 2, maxBR * 0.9));
        // obj.push(new Circle(5 * width / 8, 3 * height / 13, maxSR));
        // obj.push(new Circle(5 * width / 8, 8 * height / 13, maxSR));
        // obj.push(new Circle(7 * width / 8, 5 * height / 13, maxSR));
        // obj.push(new Circle(7 * width / 8, 10 * height / 13, maxSR));



        const length = height / 2;
        const br = length * 0.7;
        const sr = br / 3;
        const scl = 1.2; //case2
        // const scl = Math.sqrt(2) * (length - br) / sr;
        obj.push(new Circle(width / 2, height / 2, br * (0.6 / 0.7)));
        obj.push(new Circle(width / 2 - length + sr * scl, 0 + sr * scl, sr));
        obj.push(new Circle(width / 2 - length + sr * scl, height - sr * scl, sr));
        obj.push(new Circle(width / 2 + length - sr * scl, 0 + sr * scl, sr));
        obj.push(new Circle(width / 2 + length - sr * scl, height - sr * scl, sr));


        // let r1 = height / 8 < width / 8 ? height / 8 : width / 8;
        // const br = (height / 2) * 0.9;
        // line(0, height / 2, width, height / 2);
        // line(width / 4, 0, width / 4, height);
        // let rb = width / 4 < height / 2 ? width / 4 : height / 2;
        // rb = rb < r1 * 3.5 ? rb : r1 * 3.5;
        // circle(width / 4, height / 2, rb);
        // line(width / 2, 0, width / 2, height);
        // line(3 * width / 4, 0, 3 * width / 4, height);
        // line(width / 2, height / 8, width, height / 8);
        // line(width / 2, 2 * height / 8, width, 2 * height / 8);
        // line(width / 2, 3 * height / 8, width, 3 * height / 8);
        // line(width / 2, 5 * height / 8, width, 5 * height / 8);
        // line(width / 2, 6 * height / 8, width, 6 * height / 8);
        // line(width / 2, 7 * height / 8, width, 7 * height / 8);

        // // let r1 = height / 8 < width / 8 ? height / 8 : width / 8;
        // circle(5 * width / 8, 2 * height / 8, height / 8);


        // const maxSR = height / 12;
        // const maxBR = width / 4 < height / 2 ? width / 4 : height / 2;
        // const r = height / 8;
        // let offset = (width / 2 - 2 * r) / 3;
        // obj.push(new Circle(width / 4, height / 2, r * 3.5));
        // obj.push(new Circle(5 * width / 8, 2 * height / 8, r));
        // obj.push(new Circle(5 * width / 8, 5 * height / 8, r));
        // obj.push(new Circle(7 * width / 8, 3 * height / 8, r));
        // obj.push(new Circle(7 * width / 8, 6 * height / 8, r));


    } else {
        // 手機
        const maxSR = width / 8;
        const maxBR = height / 4;
        obj.push(new Circle(width / 2, height / 4, maxBR / 1.15));
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