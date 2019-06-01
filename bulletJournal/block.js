class block {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.x = i * blockSize;
        this.y = j * blockSize;
        this.style = styleMode.blank;
        this.color = '#ffffff';
    }

    show() {
        let col = color(this.color);
        switch (this.style) {
            case styleMode.fill:
                noStroke();
                fill(col);
                rect(this.x, this.y, blockSize, blockSize);
                break;
            case styleMode.cross:
                stroke(col);
                line(this.x, this.y, this.x + blockSize, this.y + blockSize);
                line(this.x + blockSize, this.y, this.x, this.y + blockSize);
                break;
            case styleMode.dot:
                fill(col);
                ellipse(this.x + blockSize / 2, this.y + blockSize / 2, 3);
                break;
            case styleMode.circle:
                fill(col);
                ellipse(this.x + blockSize / 2, this.y + blockSize / 2, 9);
                break;
        }
        this.showBlank();
    }
    showBlank() {
        stroke(51, 30)
        noFill();
        rect(this.x, this.y, blockSize, blockSize);
    }
}