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
    return [x, y];
}

function createRandomColor() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    return color(r, g, b);
}

function preload() {
    taiwanJSON = loadJSON("https://acblog.nctu.me/taiwan.geo.json")
}

function setup() {
    createCanvas(sizeX * scl + margin * 2, sizeY * scl + margin * 2);
    background(color(0, 0, 0, 0));
    translate(0 + margin, height - margin);
    for (let i = 0; i < taiwanJSON.features.length; i++) {
        let feature = taiwanJSON.features[i];
        areas[i] = new area(feature);
    }
    // frameRate(10);
    // console.log(areas);
    translate(0 + margin, height - margin);
    for (let i = 0; i < areas.length; i++) {
        // if (counter === i) areas[i].show();
        areas[i].show();
    }
    //-------------
    console.log(JSON.stringify(areas, ["cName", "path", "C_Name"]));
    noLoop();
}
// let counter = 0;
function draw() {
    background(51);
    // counter = (counter + 1) % areas.length;
    translate(0 + margin, height - margin);
    for (let i = 0; i < areas.length; i++) {
        // if (counter === i) areas[i].show();
        areas[i].show();

        // for (let j = 0; j < areas[i].path.length; j++) {
        //     fill(areas[i].fillColor);
        //     beginShape();
        //     for (let k = 0; k < areas[i].path[j].length; k++) {
        //         if (k > 0) beginContour();
        //         for (let l = 0; l < areas[i].path[j][k].length; l++) {
        //             let point = areas[i].path[j][k][l];
        //             // let x = (point[0] - minX) * scl;
        //             // let y = (point[1] - minY) * scl;
        //             let x = point[0];
        //             let y = point[1];
        //             vertex(x, -y);
        //         }
        //         console.log(k);
        //         if (k > 0) endContour();
        //     }
        //     endShape();
        // }
    }
}