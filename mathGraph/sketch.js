const mode = {
    discrete: 'discrete',
    continuous: 'continuous'
};
var defaultSetting = {
    mode: mode.discrete,
    sizeX: 100,
    sizeY: 100
};
var setting;
var gui;

var GuiText = function () {
    this.function = '';
    this.addFunction = function () {
        tempStr = "funcList.push(new Line(function (x) { return " + this.function + ";}," + "this.function" + "));";
        eval(tempStr);
        this.function = '';
    };
    this.mode = defaultSetting.mode;
};


var blockSizeX = defaultSetting.sizeX;//1單位長 = blockSize個px
var blockSizeY = defaultSetting.sizeY;//1單位長 = blockSize個px

var funcList = [];

var centerX, centerY;

var isChange = true;

var rootDiv;

function setup() {
    createCanvas(displayWidth, displayHeight);
    //createCanvas(windowWidth, windowHeight);

    sliderX = createSlider(1, width * 5, blockSizeX);
    sliderY = createSlider(1, height * 5, blockSizeY);

    sliderX.position(10, 0);
    sliderY.position(width - height / 2 + 5, height / 2 - 10);

    sliderX.class('slider');
    sliderY.class('slider');

    sliderX.style('width:' + (width - 30) + 'px');
    sliderY.style('width:' + (height - 40) + 'px');
    sliderY.style('rotate', 90);

    centerX = width / 2;
    centerY = height / 2;


    //GUI setup
    setting = new GuiText();
    gui = new dat.GUI();
    gui.add(setting, 'function').listen();
    gui.add(setting, 'addFunction');
    gui.add(setting, 'mode', mode);

    //function setup
    //function (x) { return ;};
    
}
function draw() {
    blockSizeX = sliderX.value();
    blockSizeY = sliderY.value();

    translate(centerX, centerY);

    if (isChange) {
        background(51);
        showAxis();

        for (let i = 0; i < funcList.length; i++) {
            try {
                if (funcList[i].setting.isShow) {
                    funcList[i].show();
                }
            } catch (e) {
                gui.removeFolder(funcList[i].lineGui);
                funcList.splice(i, 1);
                throw e;
            }
        }
        isChange = false;
    }
}

function showAxis() {
    stroke(255);
    //draw x-axis
    strokeWeight(2);
    line(width - centerX, 0, -centerX, 0);
    strokeWeight(1);
    for (let i = 0; i > -centerX; i -= blockSizeX) {
        line(i, -5, i, 5);
    }
    for (let i = 0; i < width - centerX; i += blockSizeX) {
        line(i, -5, i, 5);
    }
    //draw y-axis
    strokeWeight(2);
    line(0, height - centerY, 0, -centerY);
    strokeWeight(1);
    for (let i = 0; i > -centerY; i -= blockSizeY) {
        line(-5, i, 5, i);
    }
    for (let i = 0; i < height - centerY; i += blockSizeY) {
        line(-5, i, 5, i);
    }
}

//監聽滑鼠
function mouseMoved() {
    isChange = true;
}
function mouseDragged() {
    centerX += mouseX - pmouseX;
    centerY += mouseY - pmouseY;
    isChange = true;
}

function mouseWheel(event) {
    if (event.delta > 0) {
        if(blockSizeX>5){
            sliderX.value(blockSizeX - 5);
            sliderY.value(blockSizeY - 5);
        }
    } else {
        sliderX.value(blockSizeX + 5);
        sliderY.value(blockSizeY + 5);
    }
    isChange = true;
}