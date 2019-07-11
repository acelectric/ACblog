class area {
    constructor(obj) {
        this.cName = obj.cName;
        // this.type = feature.geometry.type;
        // this.coordinates = feature.geometry.coordinates;
        this.fillColor = createRandomColor();
        this.path = obj.path;
        // console.log(this.properties, this.coordinates);
        this.offset = 0;
    }
    show() {
        {/* make own json
        this.path = [];
        switch (this.type) {
            case "Polygon":
                stroke(0);
                fill(this.fillColor);
                beginShape();
                let temp = [];
                for (let i = 0; i < this.coordinates.length; i++) {
                    if (i > 0) beginContour();
                    let path = [];
                    for (let j = 0; j < this.coordinates[i].length; j++) {
                        let coordinate = this.coordinates[i][j];
                        let x = (coordinate[0] - minX) * scl;
                        let y = (coordinate[1] - minY) * scl;
                        x = Math.round(x);
                        y = Math.round(y);
                        vertex(x, -y);
                        path.push([x, y]);
                        //path.push(coordinate);
                        // console.log(x, -y);
                    }
                    if (i > 0) endContour();
                    temp.push(path);
                }
                this.path.push(temp);
                endShape();
                break;
            case "MultiPolygon":
                for (let i = 0; i < this.coordinates.length; i++) {
                    stroke(0);
                    fill(this.fillColor);
                    let path = [];
                    beginShape();
                    for (let j = 0; j < this.coordinates[i][0].length; j++) {
                        let coordinate = this.coordinates[i][0][j];
                        let x = (coordinate[0] - minX) * scl;
                        let y = (coordinate[1] - minY) * scl;
                        x = Math.round(x);
                        y = Math.round(y);
                        vertex(x, -y);
                        // path.push(coordinate);
                        path.push([x, y]);
                        // console.log(x, -y);
                    }
                    endShape();
                    this.path.push([path]);
                }
                break;
            default:
                stroke(0);
                fill(this.fillColor);
                beginShape(this.fillColor);
                for (let i = 0; i < this.coordinates.length; i++) {
                    if (i > 0) beginContour();
                    for (let j = 0; j < this.coordinates[i].length; j++) {
                        let coordinate = this.coordinates[i][j];
                        let x = (coordinate[0] - minX) * scl;
                        let y = (coordinate[1] - minY) * scl;
                        vertex(x, -y);
                        // console.log(x, -y);
                    }
                    if (i > 0) endContour();
                }
                endShape();
                //console.log("test");
                break;
        }
        console.log(this.type, this.path);
    */}
        fill(this.fillColor);
        noStroke();
        for (let i = 0; i < this.path.length; i++) {
            beginShape();
            for (let j = 0; j < this.path[i].length; j++) {
                if (j > 0) beginContour();
                for (let k = 0; k < this.path[i][j].length; k++) {
                    let point = this.path[i][j][k];
                    vertex(point[0] - this.offset, point[1] - this.offset);
                }
                if (j > 0) endContour();
            }
            endShape();
        }
    }
    changeColor() {
        this.fillColor = createRandomColor();
    }
    // 监听Canvas内部元素点击事件的三种方法
    // https://refined-x.com/2019/04/27/canvas-click/
    isPointInPolyline(point, polylinePoints) {
        let leftSide = 0;
        let upSide = 0;
        const A = point;
        for (let i = 0; i < polylinePoints.length; i++) {
            let B, C;
            if (i === polylinePoints.length - 1) {
                B = {
                    x: polylinePoints[i][0],
                    y: polylinePoints[i][1]
                };
                C = {
                    x: polylinePoints[0][0],
                    y: polylinePoints[0][1]
                };
            } else {
                B = {
                    x: polylinePoints[i][0],
                    y: polylinePoints[i][1]
                };
                C = {
                    x: polylinePoints[i + 1][0],
                    y: polylinePoints[i + 1][1]
                };
            }
            //判断左侧相交
            let sortByY = [B.y, C.y].sort((a, b) => a - b)
            if (sortByY[0] < A.y && sortByY[1] > A.y) {
                if (B.x < A.x || C.x < A.x) {
                    leftSide++;;
                }
            }
            // 判斷上側相交
            let sortByX = [B.x, C.x].sort((a, b) => a - b)
            if (sortByX[0] < A.x && sortByX[1] > A.x) {
                if (B.y < A.y || C.y < A.y) {
                    upSide++;;
                }
            }
        }
        return [leftSide, upSide];
    }
    isPointInArea(x, y) {
        for (let i = 0; i < this.path.length; i++) {
            let leftSide = 0;
            let upSide = 0;
            for (let j = 0; j < this.path[i].length; j++) {
                //console.log("test");
                let temp = this.isPointInPolyline({ "x": x, "y": y }, this.path[i][j]);
                if (j === 0) {
                    leftSide += temp[0];
                    upSide += temp[1];
                }


            }
            if (leftSide % 2 === 1 && upSide % 2 === 1) {
                console.log(this.cName);
                this.fillColor = createRandomColor();
                //this.offset = 5;
                return true;
            }
        }
        this.offset = 0;
        return false;
    }
}