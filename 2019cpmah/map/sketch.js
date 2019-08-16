

let taiwanJSON;

let areas = new Array(22);

// const minX = 118.21296102851583;
// const minY = 21.902704350222184;
// const maxX = 122.00490580661933;
// const maxY = 26.17537080357254;

// let sizeX = Math.round(maxX - minX);
// let sizeY = Math.round(maxY - minY);

const sizeX = 473;
const sizeY = 679;

// const sizeX = 850;
// const sizeY = 855;
// const scl = 200;
const margin = 0;

let newSize;
let sclX = 1, sclY = 1;

let canvas;

let eName = [["連江縣", "LJF"], ["金門縣", "JME"], ["宜蘭縣", "ILA"], ["新竹縣", "HSQ"], ["苗栗縣", "MIA"], ["彰化縣", "CHA"], ["南投縣", "NAN"], ["雲林縣", "YUN"], ["嘉義縣", "CYQ"], ["屏東縣", "PIF"], ["臺東縣", "TTT"], ["花蓮縣", "HUA"], ["澎湖縣", "PEN"], ["基隆市", "KEE"], ["新竹市", "HSZ"], ["嘉義市", "CYI"], ["臺北市", "TPE"], ["高雄市", "KHH"], ["新北市", "TPQ"], ["臺中市", "TXG"], ["臺南市", "TNN"], ["桃園市", "TAO"]];
let colors = [
    "#7B6CEC",
    "#8492EC",
    "#01DCAA",
    "#7CD167",
    "#C673D8",
    "#C9A51C",
    "#834710",
    "#7E83D6",
    "#73E446",
    "#C7878E",
    "#83BA03",
    "#DA2D94",
    "#5340A2",
    "#CC4BBA",
    "#6773f5",
    "#E4C77B",
    "#956518",
    "#A26B8E",
    "#7297C2",
    "#03AA49",
    "#C11147",
    "#E60A75"
]

const canIn = {
    all: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, true, true, true],
    national: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, true, true, true],
    municipality: [false, true, true, true, false, false, false, true, false, false, false, false, true, true, false, false, false, false, false, false, false, false],
    county: [true, false, false, false, true, true, true, false, true, true, true, true, false, false, true, true, true, true, false, true, true, true]
}

let textsPosition = [
    [414, 18], [361, 89], [359, 51], [290, 76], [281, 128], [114.5, 112], [224, 165], [197, 225], [142, 273], [119, 323]
    , [182, 383], [28.5, 317], [114, 438], [181, 469], [170, 551], [244, 298], [377, 157], [330, 315], [259, 490], [55.5, 205], [4.5, 402], [153.5, 62]
];



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

function createRandomColor(eName) {
    let r = Math.round(Math.random() * 170);
    let g = Math.round(Math.random() * 170);
    let b = Math.round(Math.random() * 170);
    // console.log(color(r + 80, g + 80, b + 80));
    return color(r + 80, g + 80, b + 80);
}

function preload() {
    let address = 'https://acblog.nctu.me/2019cpmah/'
    mapJSON = loadJSON(address + "map/map.json");
    allJSON = loadJSON(address + "data/categorys/all.json");
}
var a;
let bigPage;
let smallPage;
let smallSmallPage;

let pointBlocks = [[29, 302], [67.5, 321]];
let pointBlocks2 = [[11.5, 98], [150.5, 115]];
let pointLine = [[45.5, 326], [158.5, 365]];
let pointLine2 = [[256, 100], [155, 107]];

function setup() {
    let urlParams = new URLSearchParams(window.location.search);
    // console.log(urlParams);
    // console.log(urlParams.get('p'));
    bigPage = urlParams.get('p');
    smallPage = urlParams.get('sp');
    smallSmallPage = urlParams.get('ssp');

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
    // createCanvas(sizeX, sizeY);


    // newSize = windowWidth < windowHeight ? windowWidth : windowHeight;
    // newSize -= margin * 2;
    // newSize -= 100; // nav's height
    //createCanvas(sizeX * scl + margin * 2, sizeY * scl + margin * 2);
    if (smallPage != null && bigPage != null) {
        if (smallSmallPage != null) {
            // console.log(smallSmallPage);
            ajaxPage(smallSmallPage, 'all', bigPage, smallPage);

        } else {
            createClassificationSubPage(bigPage, smallPage);
        }
    }

    for (let i = 0; i < textsPosition.length; i++) {
        textsPosition[i] = size2newSize(textsPosition[i]);
    }
    mapJSON = mapJSON.feature;
    for (let i = 0; i < mapJSON.length; i++) {
        areas[i] = new area(mapJSON[i]);
        areas[i].reSize();
        areas[i].fillColor = colors[i];
        areas[i].initColor = areas[i].fillColor;

        areas[i].textPosition = textsPosition[i];
        if (canIn[bigPage][i] == false) {
            areas[i].fillColor = color(200);
            areas[i].initColor = areas[i].fillColor;
            // console.log(i);
        }
    }
    // console.log(areas);

    pointBlocks[0] = size2newSize(pointBlocks[0]);
    pointBlocks[1] = size2newSize(pointBlocks[1]);
    pointBlocks2[0] = size2newSize(pointBlocks2[0]);
    pointBlocks2[1] = size2newSize(pointBlocks2[1]);
    pointLine[0] = size2newSize(pointLine[0]);
    pointLine[1] = size2newSize(pointLine[1]);
    pointLine2[0] = size2newSize(pointLine2[0]);
    pointLine2[1] = size2newSize(pointLine2[1]);

    /*
    for (let i = 0; i < areas[19].path.length; i++) {
        for (let j = 0; j < areas[19].path[i].length; j++) {
            for (let k = 0; k < areas[19].path[i][j].length; k++) {
                areas[19].path[i][j][k][0] -= 20;
                areas[19].path[i][j][k][1] -= 50;
            }
        }
    }
    for (let i = 0; i < areas[20].path.length; i++) {
        for (let j = 0; j < areas[20].path[i].length; j++) {
            for (let k = 0; k < areas[20].path[i][j].length; k++) {
                areas[20].path[i][j][k][0] -= 30;
                areas[20].path[i][j][k][1] -= 150;
            }
        }
    }
    for (let i = 0; i < areas[21].path.length; i++) {
        for (let j = 0; j < areas[21].path[i].length; j++) {
            for (let k = 0; k < areas[21].path[i][j].length; k++) {
                areas[21].path[i][j][k][0] += 0;
                areas[21].path[i][j][k][1] += 0;
            }
        }
    }

    textsPosition[19][0] -= 10;
    textsPosition[19][1] -= 50;
    textsPosition[20][0] -= 30;
    textsPosition[20][1] -= 150;

    let maxX = -1, minX = 900, maxY = -1, minY = 900;
    let modiflyPoint = function (target) {
        for (let i = 0; i < areas[target].path.length; i++) {
            for (let j = 0; j < areas[target].path[i].length; j++) {
                for (let k = 0; k < areas[target].path[i][j].length; k++) {
                    // areas[target].path[i][j][k][0] += 29;

                    // areas[target].path[i][j][k][0] = Math.round(areas[target].path[i][j][k][0]);
                    // areas[target].path[i][j][k][1] = Math.round(areas[target].path[i][j][k][1]);

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
    }*/
    // for (let i = 0; i < textsPosition.length; i++) {
    //     textsPosition[i][0] += 29;
    // }
    // for (let i = 0; i < areas.length; i++) {
    //     areas[i].textPosition = textsPosition[i];
    // }
    // console.log(textsPosition);
    // console.log(minX, maxX, minY, maxY);


    //-------------
    // noLoop();
    //frameRate(10);
    // console.log(JSON.stringify(areas, ["cName", "eName", "path"]));
}
function draw() {
    background(color(0, 0, 0, 0));
    // background(255);
    for (let i = 0; i < areas.length; i++) {
        areas[i].show();
    }

    let inAreas = false;
    let notAllowed = false;
    for (let i = 0; i < areas.length; i++) {
        if (areas[i].isPointInArea(mouseX, mouseY)) {
            if (canIn[bigPage][i]) {
                areas[i].fillColor = color('#C06014');
                // let a = document.getElementById('optionList');
                // a.options[i].selected = true;
            }

            inAreas = true;
            if (!canIn[bigPage][i]) {
                inAreas = false;
                notAllowed = true;
            }
        }

    }
    if (canIn[bigPage][11] && mouseX > pointBlocks[0][0] && mouseX < pointBlocks[1][0] && mouseY > pointBlocks[0][1] && mouseY < pointBlocks[1][1]) {
        inAreas = true;
    } else if (canIn[bigPage][11] && mouseX > pointBlocks2[0][0] && mouseX < pointBlocks2[1][0] && mouseY > pointBlocks2[0][1] && mouseY < pointBlocks2[1][1]) {
        inAreas = true;
    }
    for (let i = 0; i < areas.length; i++) {
        areas[i].showName();
    }
    if (notAllowed) {
        cursor('not-allowed');
    } else if (inAreas) {
        cursor('pointer');
    } else {
        cursor('default');
    }
    stroke(0);
    line(pointLine[0][0], pointLine[0][1], pointLine[1][0], pointLine[1][1]);

    line(pointLine2[0][0], pointLine2[0][1], pointLine2[1][0], pointLine2[1][1]);
    // text('測試中', mouseX, mouseY);
}
function mousePressed(e) {
    e.stopPropagation();
    if (canIn[bigPage][11] && mouseX > pointBlocks[0][0] && mouseX < pointBlocks[1][0] && mouseY > pointBlocks[0][1] && mouseY < pointBlocks[1][1]) {
        history.pushState('', '', address + 'map.html?p=' + bigPage + '&sp=' + areas[11].eName);
        location.reload();
        return;
    } else if (canIn[bigPage][5] && mouseX > pointBlocks2[0][0] && mouseX < pointBlocks2[1][0] && mouseY > pointBlocks2[0][1] && mouseY < pointBlocks2[1][1]) {
        history.pushState('', '', address + 'map.html?p=' + bigPage + '&sp=' + areas[5].eName);
        location.reload();
        return;
    }
    for (let i = 0; i < areas.length; i++) {
        if (areas[i].isPointInArea(mouseX, mouseY) && canIn[bigPage][i]) {
            // document.getElementById(areas[i].eName).click();
            history.pushState('', '', address + 'map.html?p=' + bigPage + '&sp=' + areas[i].eName);
            location.reload();
        }
    }

    // console.log(mouseX, mouseY);
}
function touchStarted(e) {

}
function mouseMoved() {
}