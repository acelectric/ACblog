let taiwanJSON;
const scaleX = 0.000785569666066603 * 1000
const scaleY = 0.0005688545404540484 * 1000
const translateX = 116.7062384090001
const translateY = 20.697301579000055


function preload() {
    taiwanJSON = loadJSON("https://acblog.nctu.me/topoTaiwan.json")
}

function setup() {
    createCanvas(600, 600);
    background(51);
    //console.log(taiwanJSON.arcs);
    data = taiwanJSON.arcs;

    //translate(width / 2, height / 2);
    translate(translateX, translateY);
    for (let i = 0; i < data.length; i++) {
        let str = "";
        for (let j = 1; j < data[i].length; j++) {
            str += "(";
            str += data[i][j][0];
            str += ",";
            str += data[i][j][1];
            str += ")";
            stroke(255);
            point(data[i][j][0] * scaleX, data[i][j][1] * scaleY);
            stroke(color(255, 0, 0));
            point(data[i][j][0], data[i][j][1]);
        }
        console.log(str);
    }
}
function draw() {

}