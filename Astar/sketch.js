function removeFromArray(arr, elt) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == elt) {
            arr.splice(i, 1);
        }
    }
}

function heuristic(a, b) {
    var d = dist(a.i, a.j, b.i, b.j);
    //var d = abs(a.i-b.i) + abs(a.j-b.j);
    //var d = 0;
    return d;
}

var cols = 100;
var rows = 100;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];

var start;
var end;

var w, h;
var path = [];

var diagonal = false;
var diagonalCheckbox;
var wallProbability;
var startButton;
var startFinding = false;

var complete = false;

function setup() {
    createCanvas(800, 800);

    diagonalCheckbox = createCheckbox("允許對角走法", diagonal);
    diagonalCheckbox.changed(diagonalCheckedEvent);

    wallProbability = createSlider(0, 1, 0, 0.01);
    showWallProbability = createSpan(wallProbability.value());

    startButton = createButton("開始");
    startButton.mousePressed(startPathFinding);

    w = width / cols;
    h = height / rows;

    background(0);
}
var test = 0;
function draw() {
    if (startFinding) {
        AStar();

        for (var i = 0; i < closedSet.length; i++) {
            closedSet[i].show(color(255, 0, 0));
        }

        for (var i = 0; i < openSet.length; i++) {
            openSet[i].show(color(0, 255, 0));
        }

        for (var i = 0; i < path.length; i++) {
            path[i].show(color(0, 0, 255));
        }

        start.show(color(255, 255, 0));
        end.show(color(255, 0, 255));
    }

    showWallProbability.html(floor(wallProbability.value()*100)+"%");
}

function AStar() {
    if (!complete) {
        if (openSet.length > 0) {
            //繼續

            var winner = 0;
            for (var i = 0; i < openSet.length; i++) {
                if (openSet[i].f < openSet[winner].f) {
                    winner = i;
                }
            }

            var current = openSet[winner];

            if (current == end) {
                console.log("DONE!");
                complete = true;
            }

            //openSet.remove(current);
            removeFromArray(openSet, current);
            closedSet.push(current);

            var neighbors = current.neighbors;
            for (var i = 0; i < neighbors.length; i++) {
                var neighbor = neighbors[i];

                if (!closedSet.includes(neighbor) && !neighbor.wall) {
                    var tempG = current.g + 1;

                    var newPath = false;
                    if (openSet.includes(neighbor)) {
                        if (tempG < neighbor.g) {
                            neighbor.g = tempG;
                            newPath = true;
                        }
                    } else {
                        neighbor.g = tempG;
                        newPath = true;
                        openSet.push(neighbor);
                    }
                    if (newPath) {
                        neighbor.h = heuristic(neighbor, end);
                        neighbor.f = neighbor.g + neighbor.h;
                        //neighbor.f = neighbor.h;
                        neighbor.previous = current;
                    }
                }


            }
        } else {
            //無解
            console.log("無解");
            complete = true;
            return;
        }
        //Find the path
        path = [];
        var temp = current;
        path.push(temp);
        while (temp.previous != undefined) {
            path.push(temp.previous);
            //console.log(temp.previous.i + "," + temp.previous.i);
            temp = temp.previous;
        }
    }
}