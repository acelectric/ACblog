function mousePressed() {
    var i = floor(mouseX / w);
    var j = floor(mouseY / h);
    if (i < cols && j < rows) {
        //fill(color(128, 0, 128));
        //rect(i * w, j * h, w, h);
        console.log("grid[" + i + "][" + j + "].wall=true");
        //grid[i][j].wall = true;
    }

    /*// prevent default
    return false;*/
}

function diagonalCheckedEvent() {
    if (this.checked()) {
        diagonal = true;
        console.log(diagonal);
    } else {
        diagonal = false;
        console.log(diagonal);
    }
}

function startPathFinding() {
    //background(255);
    cols = setting.cols;
    rows = setting.rows;
    w = width / cols;
    h = height / rows;
    grid = new Array(cols);
    openSet = [];
    closedSet = [];
    path = [];
    complete = false;
    //二維陣列
    for (var i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j);
        }
    }
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }

    //start = grid[0][0];
    //end = grid[cols - 1][rows - 1];
    start = grid[floor(random(cols))][floor(random(rows))];
    end = grid[floor(random(cols))][floor(random(rows))];
    start.wall = false;
    end.wall = false;

    openSet.push(start);

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show(color(255));
        }
    }
    startFinding = true;
}