let taiwanJSON;

const minX = 118.21296102851583;
const minY = 21.902704350222184;
const maxX = 122.00490580661933;
const maxY = 26.17537080357254;

let sizeX = maxX - minX;
let sizeY = maxY - minY;
const scale = 200;
const margin = 0;

function createRandomColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return color(r, g, b);
}

function preload() {
    taiwanJSON = loadJSON("https://acblog.nctu.me/taiwan.geo.json")
}

function setup() {
    createCanvas(sizeX * scale + margin * 2, sizeY * scale + margin * 2);
    background(color(0, 0, 0));
    translate(0 + margin, height - margin);
    // fill(color("#EDDBCD"));
    fill(color(255, 0, 0))
    //console.log(taiwanJSON.features[0].geometry.coordinates[0][0]);
    for (let i = 0; i < taiwanJSON.features.length; i++) {
        let feature = taiwanJSON.features[i];
        switch (feature.geometry.type) {
            case "Polygon":
                stroke(0);
                fill(createRandomColor());
                for (let k = 0; k < feature.geometry.coordinates.length; k++) {
                    beginShape();
                    for (let j = 0; j < feature.geometry.coordinates[k].length; j++) {
                        coordinate = feature.geometry.coordinates[k][j];
                        x = (coordinate[0] - minX) * scale;
                        y = (coordinate[1] - minY) * scale;
                        vertex(x, -y);
                    }
                    endShape();
                }
                break;
            case "MultiPolygon":
                for (let k = 0; k < feature.geometry.coordinates.length; k++) {
                    stroke(0);
                    fill(createRandomColor());
                    beginShape();
                    for (let j = 0; j < feature.geometry.coordinates[k][0].length; j++) {
                        coordinate = feature.geometry.coordinates[k][0][j];
                        x = (coordinate[0] - minX) * scale;
                        y = (coordinate[1] - minY) * scale;
                        // x = (coordinate[0] - 118) * 100;
                        // y = (coordinate[1] - 21) * 100;
                        vertex(x, -y);
                    }
                    endShape();
                }
                break;
            default:
                console.log(feature.geometry.type);
                break;
        }

    }
}
function draw() {

}