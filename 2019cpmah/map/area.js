class area {
    constructor(obj) {
        this.cName = obj.cName;
        this.eName = "";
        // this.type = feature.geometry.type;
        // this.coordinates = feature.geometry.coordinates;
        this.fillColor = color(255, 0, 0)//createRandomColor();
        this.path = obj.path;
        // console.log(this.properties, this.coordinates);
        this.offset = 0;
    }
    reSize() {
        for (let i = 0; i < this.path.length; i++) {
            for (let j = 0; j < this.path[i].length; j++) {
                for (let k = 0; k < this.path[i][j].length; k++) {
                    this.path[i][j][k] = size2newSize(this.path[i][j][k]);
                }
            }
        }
    }
    show() {
        fill(this.fillColor);
        //noStroke();
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
        let A = point;
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
            const sortByY = [B.y, C.y].sort((a, b) => a - b)
            if (sortByY[0] <= A.y && sortByY[1] > A.y) {
                const m = (C.x - B.x) / (C.y - B.y);
                const f = B.x + m * (A.y - B.y);
                if (A.x >= f) {
                    leftSide++;
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
                let temp = this.isPointInPolyline({ "x": x, "y": y }, this.path[i][j]);

                leftSide += temp[0];
                upSide += temp[1];
            }
            if (leftSide % 2 === 1) {
                // console.log(this.cName, leftSide, upSide);
                //this.fillColor = createRandomColor();
                this.offset = 5;
                this.fillColor = alpha(0);
                return true;
            }
        }
        this.offset = 0;
        this.fillColor = color(255, 0, 0);
        return false;
    }
}