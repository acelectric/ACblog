

let taiwanJSON;

let areas = new Array(22);

// const minX = 118.21296102851583;
// const minY = 21.902704350222184;
// const maxX = 122.00490580661933;
// const maxY = 26.17537080357254;

// let sizeX = Math.round(maxX - minX);
// let sizeY = Math.round(maxY - minY);
const size = 855;
// const scl = 200;
const margin = 0;

let newSize;
let scl;

let canvas;

let eName = [["連江縣", "LJF"], ["金門縣", "JME"], ["宜蘭縣", "ILA"], ["新竹縣", "HSQ"], ["苗栗縣", "MIA"], ["彰化縣", "CHA"], ["南投縣", "NAN"], ["雲林縣", "YUN"], ["嘉義縣", "CYQ"], ["屏東縣", "PIF"], ["臺東縣", "TTT"], ["花蓮縣", "HUA"], ["澎湖縣", "PEN"], ["基隆市", "KEE"], ["新竹市", "HSZ"], ["嘉義市", "CYI"], ["臺北市", "TPE"], ["高雄市", "KHH"], ["新北市", "TPQ"], ["臺中市", "TXG"], ["臺南市", "TNN"], ["桃園市", "TAO"]];

function coordinate2xy(coordinate) {
    let x = (coordinate[0] - minX) * scl;
    let y = (coordinate[1] - minY) * scl;
    x = Math.round(x);
    y = Math.round(y);
    y = height - y;
    return [x, y];
}

function size2newSize(point) {
    return [point[0] * scl, point[1] * scl];
}

function createRandomColor() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    return color(r, g, b);
}

function preload() {
    mapJSON = loadJSON(address + "map/map.json");
}
var a;
function setup() {
    ajaxMapPage(mapJSON.feature);
    newSize = windowWidth < windowHeight ? windowWidth : windowHeight;
    newSize -= margin * 2;
    newSize -= 100; // nav's height
    scl = newSize / size;
    canvas = createCanvas(newSize + margin * 2, newSize + margin * 2);
    canvas.parent("content");
    //createCanvas(sizeX * scl + margin * 2, sizeY * scl + margin * 2);


    mapJSON = mapJSON.feature;
    for (let i = 0; i < mapJSON.length; i++) {
        areas[i] = new area(mapJSON[i]);
        areas[i].reSize();
    }
    console.log(areas);

    for (let i = 0; i < areas.length; i++) {
        createA(address + 'result/' + areas[i].eName + ".html", "").id(areas[i].eName);
    }



    //-------------
    // noLoop();
    //frameRate(10);
    //console.log(JSON.stringify(areas, ["cName", "eName", "path"]));
}
function draw() {
    background(color('transpatent'));
    for (let i = 0; i < areas.length; i++) {
        areas[i].show();
    }

    let inAreas = false;
    for (let i = 0; i < areas.length; i++) {
        if (areas[i].isPointInArea(mouseX, mouseY)) {
            areas[i].showName();
            areas[i].fillColor = color('#C06014');
            let a = document.getElementById('optionList');
            a.options[i].selected = true;


            inAreas = true;
        }
    }
    if (inAreas) {
        cursor('pointer');
    } else {
        cursor('default');
    }

}
function mousePressed() {
    for (let i = 0; i < areas.length; i++) {
        if (areas[i].isPointInArea(mouseX, mouseY)) {
            document.getElementById(areas[i].eName).click();
            console.log(document.getElementById('areas').value);
        }
    }
}
function mouseMoved() {
}