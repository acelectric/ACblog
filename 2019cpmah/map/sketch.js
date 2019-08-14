

let taiwanJSON;

let areas = new Array(22);

// const minX = 118.21296102851583;
// const minY = 21.902704350222184;
// const maxX = 122.00490580661933;
// const maxY = 26.17537080357254;

// let sizeX = Math.round(maxX - minX);
// let sizeY = Math.round(maxY - minY);

const sizeX = 519;
const sizeY = 679;

// const sizeX = 850;
// const sizeY = 855;
// const scl = 200;
const margin = 0;

let newSize;
let sclX, sclY;

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
    return [point[0] * sclX, point[1] * sclX];
}

function createRandomColor() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    return color(r, g, b);
}

function preload() {
    mapJSON = loadJSON(address + "map/map.json");
    allJSON = loadJSON(address + "data/categorys/all.json");
}
var a;
let bigPage;
function setup() {
    let urlParams = new URLSearchParams(window.location.search);

    // console.log(urlParams.get('p'));
    bigPage = urlParams.get('p');
    if (bigPage == null) {
        bigPage = 'all';
    }
    ajaxMapPage(mapJSON.feature, bigPage);


    let content = document.getElementById('container');
    if (content.offsetWidth < 1024) {
        newSize = content.offsetWidth < content.offsetHeight ? content.offsetWidth : content.offsetHeight;
        canvas = createCanvas(newSize, newSize * (sizeY / sizeX));
        canvas.parent(content);
        sclX = newSize / sizeX;
        sclY = (newSize * (sizeY / sizeX)) / sizeY;
    } else {
        newSize = content.offsetHeight;
        canvas = createCanvas(newSize / (sizeY / sizeX), newSize);
        canvas.parent(content);
        sclX = (newSize / (sizeY / sizeX)) / sizeX;
        sclY = newSize / sizeY;
    }
    // newSize = windowWidth < windowHeight ? windowWidth : windowHeight;
    // newSize -= margin * 2;
    // newSize -= 100; // nav's height
    //createCanvas(sizeX * scl + margin * 2, sizeY * scl + margin * 2);


    mapJSON = mapJSON.feature;
    for (let i = 0; i < mapJSON.length; i++) {
        areas[i] = new area(mapJSON[i]);
        areas[i].reSize();
    }
    // console.log(areas);

    /*for (let i = 0; i < areas[21].path.length; i++) {
        for (let j = 0; j < areas[21].path[i].length; j++) {
            for (let k = 0; k < areas[21].path[i][j].length; k++) {
                areas[21].path[i][j][k][1] += 200;
            }
        }
    }
    for (let i = 0; i < areas[19].path.length; i++) {
        for (let j = 0; j < areas[19].path[i].length; j++) {
            for (let k = 0; k < areas[19].path[i][j].length; k++) {
                areas[19].path[i][j][k][0] += 250;
            }
        }
    }
    let maxX = -1, minX = 900, maxY = -1, minY = 900;
    let modiflyPoint = function (target) {
        for (let i = 0; i < areas[target].path.length; i++) {
            for (let j = 0; j < areas[target].path[i].length; j++) {
                for (let k = 0; k < areas[target].path[i][j].length; k++) {
                    areas[target].path[i][j][k][0] -= 239;
                    areas[target].path[i][j][k][1] -= 176;

                    if (areas[target].path[i][j][k][0] > maxX) {
                        maxX = areas[target].path[i][j][k][0];
                    } else if (areas[target].path[i][j][k][0] < minX) {
                        minX = areas[target].path[i][j][k][0];
                    }
                    if (areas[target].path[i][j][k][1] > maxY) {
                        maxY = areas[target].path[i][j][k][1];
                    } else if (areas[target].path[i][j][k][1] < minY) {
                        minY = areas[target].path[i][j][k][1];
                    }
                }
            }
        }
    }
    for (let i = 0; i < areas.length; i++) {
        modiflyPoint(i);
    }
    console.log(minX, maxX, minY, maxY);
    */

    //-------------
    // noLoop();
    //frameRate(10);
    // console.log(JSON.stringify(areas, ["cName", "eName", "path"]));
}
function draw() {
    background(color(255));
    for (let i = 0; i < areas.length; i++) {
        areas[i].show();
    }

    let inAreas = false;
    for (let i = 0; i < areas.length; i++) {
        if (areas[i].isPointInArea(mouseX, mouseY)) {
            areas[i].showName();
            areas[i].fillColor = color('#C06014');
            // let a = document.getElementById('optionList');
            // a.options[i].selected = true;


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
            // document.getElementById(areas[i].eName).click();
            createClassificationSubPage(bigPage, areas[i].eName);
        }
    }
}
function mouseMoved() {
}