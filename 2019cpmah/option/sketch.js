class Circle {
    constructor(x, y, r, text = 'text', href) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.text = text;
        this.href = address + href;
        this.initX = x;
        this.initY = y;
        this.startX = x;
        this.startY = y;
        this.inAnimation = false;
        this.animationStop = false;
        this.fillColor = color('#C06014');
        this.initFillColor = this.fillColor;
    }
    setHref(href) {
        this.href = address + href;
    }
    show() {
        noStroke(color('#C06014'));
        fill(this.fillColor);
        circle(this.x, this.y, this.r);
        textAlign(CENTER, CENTER);
        textSize(this.r / 3);
        noStroke();
        fill(0);
        if (this.text == '台灣古蹟') {
            text(this.text, this.x, this.y - this.r / 6);
        } else if (this.text == '台\n灣\n古\n蹟') {
            text(this.text, this.x + this.r / 6, this.y);
        } else {
            text(this.text, this.x, this.y);
        }
    }
    animation(frame) {
        if (this.inAnimation == false) {
            this.x = this.startX;
            this.y = this.startY;
            this.inAnimation = true;
        }
        let xOffset = Math.abs(this.x - this.initX);
        let yOffset = Math.abs(this.y - this.initY);
        let xV = (this.initX - this.startX) / frame;
        let yV = (this.initY - this.startY) / frame;
        if (!this.animationStop && xOffset > Math.abs(xV) && yOffset > Math.abs(yV)) {
            this.x += xV;
            this.y += yV;
        } else {
            this.x = this.initX;
            this.y = this.initY;
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
    img = loadImage(address + 'bg1.jpg');
}

let obj = [];
function setup() {
    angleMode(DEGREES);
    let container = document.getElementById('canvas');
    let cvs = createCanvas(container.offsetWidth, container.offsetHeight);
    cvs.parent(container);
    let pointX = 0, pointY = height / 2;

    let texts = ["台灣古蹟", "國定古蹟", "直轄市定古蹟", "縣市定古蹟", "製作團隊"];
    let title = "台\n灣\n古\n蹟";
    let hrefs = ["index.html", "map.html?p=national", "map.html?p=municipality", "map.html?p=county", "aboutUs.html"];
    let bigX;
    let bigY;
    let bigR;
    /*if (height < width) {
        // 電腦
        bigX = width / 2;
        bigY = height;

        let ans1 = width / 2 * (3 * cos(180 / 5) + 1);
        let ans2 = height / 4;
        bigR = ans1 < ans2 ? ans1 : ans2;
        bigR *= 2;


        obj.push(new Circle(bigX, bigY, bigR));
        for (i = 1; i <= 4; i++) {
            pointX = bigX - (3 / 2) * bigR * cos(i * 180 / 5);
            pointY = bigY - (3 / 2) * bigR * sin(i * 180 / 5);
            obj.push(new Circle(pointX, pointY, bigR * (1 / 3)));
        }
    } else {
        // 手機
        bigX = 0;
        bigY = height / 2;

        let ans1 = height / 2 * (3 * cos(180 / 5) + 1);
        let ans2 = width / 4;
        bigR = ans1 < ans2 ? ans1 : ans2;
        bigR *= 2;

        obj.push(new Circle(bigX, bigY, bigR));
        for (i = 4; i >= 1; i--) {
            pointX = bigX + (3 / 2) * bigR * sin(i * 180 / 5);
            pointY = bigY + (3 / 2) * bigR * cos(i * 180 / 5);
            obj.push(new Circle(pointX, pointY, bigR * (1 / 3)));
        }
        texts[0] = title;
    }*/

    obj.push(new Circle(0, height / 2, width / 3));
    obj.push(new Circle(width / 2, 2 * height / 13, height / 13));
    obj.push(new Circle(2 * width / 3, 5 * height / 13, height / 13));
    obj.push(new Circle(2 * width / 3, 8 * height / 13, height / 13));
    obj.push(new Circle(width / 2, 11 * height / 13, height / 13));

    for (i = 0; i < obj.length; i++) {
        obj[i].startX = bigX;
        obj[i].startY = bigY;
        obj[i].text = texts[i];
        obj[i].setHref(hrefs[i]);
    }

}
function draw() {
    // background(255);
    image(img, 0, 0, width, height);
    let c = 'default';
    for (i = 0; i < obj.length; i++) {
        obj[i].animation(30);
        obj[i].show();
        if (obj[i].isMouseInArea()) {
            obj[i].fillColor = color('#EDDBCD');
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