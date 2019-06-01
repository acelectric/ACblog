class auxiliaryLine {
    constructor(offset) {
        this.offset = offset;
        this.mode = setting.auxiliaryLineMode;
        this.index = auxiliaryLines.length;
        this.controller = auxiliaryLineGui.add(this, 'delete');
        this.controller.name(this.index+" : delete");
    }
    show() {
        stroke(color(255, 0, 0));
        switch (this.mode) {
            case auxiliaryLineMode.vertical:
                line(this.offset, 0, this.offset, height);
                textSize(15);
                noStroke();
                fill(color(255,0,0));
                text(this.index, this.offset+2, height - 5);
                break;
            case auxiliaryLineMode.horizontal:
                line(0, this.offset, width, this.offset);
                textSize(15);
                noStroke();
                fill(color(255,0,0));
                text(this.index, width - 10, this.offset);
                break;
        }
    }
    delete() {
        auxiliaryLines.splice(this.index, 1);
        auxiliaryLineGui.remove(this.controller);
        for (let i = this.index; i < auxiliaryLines.length; i++) {
            auxiliaryLines[i].index--;
            auxiliaryLines[i].controller.name(auxiliaryLines[i].index+" : delete");
        }

    }
}