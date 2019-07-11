let taiwanJSON;

let areas = new Array(22);

const minX = 118.21296102851583;
const minY = 21.902704350222184;
const maxX = 122.00490580661933;
const maxY = 26.17537080357254;

let sizeX = maxX - minX;
let sizeY = maxY - minY;
const scl = 200;
const margin = 0;

function coordinate2xy(coordinate) {
    let x = (coordinate[0] - minX) * scl;
    let y = (coordinate[1] - minY) * scl;
    x = Math.round(x);
    y = Math.round(y);
    y = height - y;
    return [x, y];
}

function createRandomColor() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    return color(r, g, b);
}

function preload() {
    mapJSON = loadJSON("https://acblog.nctu.me/2019cpmah/map.json");
}

function setup() {
    createCanvas(sizeX * scl + margin * 2, sizeY * scl + margin * 2);
    background(color(0, 0, 0, 0));
    //translate(0 + margin, height - margin);

    mapJSON = mapJSON.feature;
    for (let i = 0; i < mapJSON.length; i++) {
        console.log(mapJSON[i]);
        areas[i] = new area(mapJSON[i]);
    }

    //-------------
    console.log(JSON.stringify(areas, ["cName", "path"]));
    noLoop();
}
// let counter = 0;
function draw() {
    background(51);
    // counter = (counter + 1) % areas.length;
    // translate(0 + margin, height - margin);
    for (let i = 0; i < areas.length; i++) {
        // if (counter === i) areas[i].show();
        areas[i].show();
    }
}
function mousePressed() {
    //function mouseMoved() {
    for (let i = 0; i < areas.length; i++) {
        areas[i].isPointInArea(mouseX, mouseY);
    }
}