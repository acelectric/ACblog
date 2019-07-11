class area {
    constructor(feature) {
        this.cName = feature.properties.C_Name;
        this.type = feature.geometry.type;
        this.coordinates = feature.geometry.coordinates;
        this.fillColor = createRandomColor();
        this.strokeColor = color(0);
        this.path = [];
        // console.log(this.properties, this.coordinates);
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
        for (let j = 0; j < this.path.length; j++) {
            fill(areas[i].fillColor);
            beginShape();
            for (let k = 0; k < this.path[j].length; k++) {
                if (k > 0) beginContour();
                for (let l = 0; l < this.path[j][k].length; l++) {
                    let point = this.path[j][k][l];
                    vertex(point[0], -point[1]);
                }
                if (k > 0) endContour();
            }
            endShape();
        }
    }
    changeColor() {
        this.fillColor = createRandomColor();
    }
    isPointInArea(x, y) {
        let leftSide = 0;



        return leftSide % 2 === 1;
    }
}