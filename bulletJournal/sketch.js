function setup() {
    canvas = createCanvas(cols * blockSize + 1, rows * blockSize + 1);
    canvas.parent('canvas');
    background(255);
    layout = new Array(cols);
    for (let i = 0; i < cols; i++) {
        layout[i] = new Array(rows);
        for (let j = 0; j < rows; j++) {
            layout[i][j] = new block(i, j);
        }
    }

    stroke(color(255, 0, 0));
    line(0, height / 2, width, height / 2);
    line(width / 2, height, width / 2, 0);
    //gui setup
    gui = new dat.GUI({ autoPlace: false });
    gui.domElement.id = 'gui';
    document.getElementById('canvas').appendChild(gui.domElement);
    gui.add(setting, 'mode', Object.keys(mode));
    gui.add(setting, 'styleMode', Object.keys(styleMode));
    gui.add(setting, 'auxiliaryLineMode', Object.keys(auxiliaryLineMode));
    gui.addColor(setting, 'color');
    gui.add(setting, 'layout');
    auxiliaryLineGui = gui.addFolder('輔助線');
    auxiliaryLineGui.open();


    let a = new auxiliaryLine(Math.floor(width / 2));
    a.mode = auxiliaryLineMode.vertical;
    auxiliaryLines.push(a);
    let b = new auxiliaryLine(Math.floor(height / 2));
    b.mode = auxiliaryLineMode.horizontal;
    auxiliaryLines.push(b);

}

function draw() {
    background(255);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            layout[i][j].show();
        }
    }
    for (let i = 0; i < auxiliaryLines.length; i++) {
        auxiliaryLines[i].show();
    }
}

function mouseDragged() {
    let temp = xyToij(mouseX, mouseY);
    if (temp === -1)
        return;
    switch (setting.mode) {
        case mode.block:
            if (setting.mode == mode.block) {
                layout[temp.i][temp.j].style = setting.styleMode;
                layout[temp.i][temp.j].color = setting.color;
            }
            break;
        case mode.line:
            break;
    }
    //console.log(temp);
}
function mousePressed() {
    let temp = xyToij(mouseX, mouseY);
    if (temp === -1)
        return;
    switch (setting.mode) {
        case mode.block:

            if (layout[temp.i][temp.j].style == setting.styleMode && layout[temp.i][temp.j].color == setting.color) {
                layout[temp.i][temp.j].style = setting.blank;
            } else {
                layout[temp.i][temp.j].style = setting.styleMode;
                layout[temp.i][temp.j].color = setting.color;
            }
            break;
        case mode.line:
            let offset;
            if (setting.auxiliaryLineMode === auxiliaryLineMode.vertical) {
                offset = temp.i * blockSize;
            } else if (setting.auxiliaryLineMode === auxiliaryLineMode.horizontal) {
                offset = temp.j * blockSize;
            }
            auxiliaryLines.push(new auxiliaryLine(offset));
            break;
    }
    //console.log(temp);
}

/**
 * xyToij(x,y)
 * 功能:將(x,y)座標轉換至(i,j)座標,
 * 若超出矩陣範圍,則輸出-1
 */
function xyToij(x, y) {
    x = Math.floor(x / blockSize);
    y = Math.floor(y / blockSize);
    if (x >= cols || y >= rows || x < 0 || y < 0) {
        return -1;
    }
    return { i: x, j: y };
}