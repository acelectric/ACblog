var howManyFunc = 0;
class Line {
    constructor(f,funcName = (++howManyFunc).toString()) {
        if(funcName != howManyFunc.toString())
            howManyFunc--;

        this.simplef = f;
        this.name = funcName;

        
        this.setting = {
            isShow:true,
            color: [Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255)],
            x:0,
            point:'(0,0)'
        };
        this.lineGui = gui.addFolder(this.name);
        this.lineGui.add(this.setting,'x');
        this.lineGui.add(this.setting,'point').listen();
        this.lineGui.add(this.setting,'isShow');
        this.lineGui.addColor(this.setting,'color').listen();

    }
    f(x) {//對表示式處理成繪圖格式
        x /= blockSizeX;
        let representation = this.simplef(x);
        representation *= blockSizeY;
        return representation;
    }
    show(m = setting.mode) {//畫線
        noFill();
        stroke(color(this.setting.color));
        if (m == mode.discrete) {
            //離散
            for (let i = 0; i >= -centerX; i -= blockSizeX) {
                let x = i;
                let y = -this.f(x);
                strokeWeight(3);
                line(x, 0, x, y);
                ellipse(x, y, 5);
            }
            for (let i = 0; i <= width - centerX; i += blockSizeX) {
                let x = i;
                let y = -this.f(x);
                strokeWeight(3);
                line(x, 0, x, y);
                ellipse(x, y, 5);
            }
        } else if (m == mode.continuous) {
            //連續
            let prevX = -centerX;
            let prevY = -this.f(prevX);
            for (let i = -centerX; i <= width - centerX; i++) {
                let x = i;
                let y = -this.f(x);
                strokeWeight(3);
                line(prevX, prevY, x, y);
                prevX = x;
                prevY = y;
            }
        }
        this.display();
    }
    display() {//顯示點
        //let nowX = mouseX - centerX;//滑鼠的點
        let nowX = this.setting.x * blockSizeX;//輸入的點
        let nowY = this.f(nowX);
        let content = '(' + Math.round(nowX / blockSizeX * 100) / 100 + ',' + Math.round(nowY / blockSizeY * 100) / 100 + ')';
        this.setting.point = content;
        fill(255, 0, 0, 200);
        noStroke();
        ellipse(nowX, -nowY, 10);
    }
}