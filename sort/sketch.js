var list = [];
var processList = [];
var isStop = true;
var blockSize = 1;
var sortI, sortJ;

var pivotList = [];//for quicksort

m = {
    quickSort: "quickSort",
    bubbleSort: "bubbleSort",
    selectionSort: "selectionSort"
}
var mode = m.quickSort;
function init() {
    list = [];
    processList = [];
    pivotList = [];
    isStop = false;
    for (var i = 0; i < width / blockSize; i++) {
        list.push(new num(Math.floor(random() * height)));
    }
    sortI = 0;
    sortJ = 0;
    for (let i = 0; i < list.length; i++) {
        pivotList[i] = list[i].state == s.hasSort ? 1 : 0;
    }
    minIndex = 0;
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    btn = createButton('start/stop');
    btn.position(150, 10);
    btn.mousePressed(function () { isStop = !isStop; });
    btn = createButton('restart');
    btn.position(250, 10);
    btn.mousePressed(init);
    select = createSelect();
    select.position(10, 10);
    select.option('quick sort');
    select.option('bubble sort');
    select.option('selection sort');
    select.changed(function () {
        switch (select.value()) {
            case 'quick sort':
                mode = m.quickSort;
                break;
            case 'bubble sort':
                mode = m.bubbleSort;
                break;
            case 'selection sort':
                mode = m.selectionSort;
                break;
        }
    });
    background(0);
    for (var i = 0; i < width / blockSize; i++) {
        list.push(new num(Math.floor(random() * height)));
    }
    w = width / list.length;
    sortI = 0;
    sortJ = 0;
    for (let i = 0; i < list.length; i++) {
        pivotList[i] = list[i].state == s.hasSort ? 1 : 0;
    }

}
function draw() {
    frameRate(20);
    background(0);
    for (var i = 0; i < list.length; i++) {
        list[i].show(i);
    }
    if (!isStop) {

        switch (mode) {
            case m.quickSort:
                for (i = 0; i < 10&&!isStop; i++) {
                    quickSort();
                }
                break;
            case m.bubbleSort:
                for (i = 0; i < 1000&&!isStop; i++) {
                    bubbleSort();
                }
                break;
            case m.selectionSort:
                for (i = 0; i < 1000&&!isStop; i++) {
                    selectionSort();
                }
                break;
        }
    }
}
function swap(aIndex, bIndex) {
    let temp = list[aIndex];
    list[aIndex] = list[bIndex];
    list[bIndex] = temp;
}
let minIndex = 0;
function selectionSort() {
    clearProcess();
    if (list[sortJ].value < list[minIndex].value) {
        minIndex = sortJ;
    }
    list[minIndex].state = s.process;
    processList.push(minIndex);
    list[sortJ].state = s.process;
    processList.push(sortJ);

    sortJ++;
    if (sortJ == list.length) {
        swap(sortI, minIndex);
        list[sortI].state = s.hasSort;
        sortI++;
        sortJ = sortI;
        minIndex = sortJ;
    }
    if (sortI >= list.length) {
        isStop = true;
    }
}

function bubbleSort() {
    clearProcess();
    let i = list.length - 2 - sortI;
    if (i < 0 || list[i].state == s.hasSort) {
        if (sortI == list.length - sortJ - 1) {
            list[sortJ].state = s.hasSort;
            sortJ = (sortJ + 1) % list.length;
        }
        sortI = 0;
        return;
    }
    list[i].state = s.process;
    list[i + 1].state = s.process;
    processList.push(i);
    processList.push(i + 1);
    if (list[i].value > list[i + 1].value) {
        //console.log(i,list);
        swap(i, i + 1);
    }
    sortI = (++sortI) % list.length;
}

function quickSort() {
    clearProcess();
    //refresh pivotList
    for (let i = 0; i < list.length; i++) {
        pivotList[i] = list[i].state == s.hasSort ? 1 : 0;
    }
    //make left and right
    for (let i = 0; i < pivotList.length; i++) {
        if (pivotList[i] === 0) {
            left = i;
            while (pivotList[++i] === 0) {
            }
            right = i;
            break;
        }
    }
    if (left == right || left == right - 1) {
        list[left].state = s.hasSort;
    }
    list[left].state = s.process;
    processList.push(left);
    sortI = (left + 1) % list.length;
    sortJ = right - 1;
    pivot = list[left].value;
    while (1) {
        if (list[sortI].value > pivot) {
            if (list[sortJ].value < pivot) {
                list[sortI].state = s.process;
                processList.push(sortI);
                list[sortJ].state = s.process;
                processList.push(sortJ);
                swap(sortI, sortJ);
                //console.log("1",sortI, sortJ);
                break;
            } else {
                sortJ--;
                if (sortJ < sortI) {
                    swap(left, sortI - 1);
                    list[sortI - 1].state = s.hasSort;
                    //console.log("2",left, sortI - 1);
                    break;//is end
                }
            }
        } else {
            sortI++;
            if (sortI > sortJ) {
                swap(left, sortI - 1);
                list[sortI - 1].state = s.hasSort;
                //console.log("3",left, sortI - 1);
                break;//is end
            }
        }
    }
}

var s = {
    hasSort: "#00ff00",
    noSort: "#ffffff",
    process: "#ff0000"
}

class num {
    constructor(val) {
        this.value = val;
        this.state = s.noSort;
    }
    show(index) {
        noStroke();
        fill(this.state);
        rect(index * w, height - this.value, w, this.value);
    }
}
function clearProcess() {
    for (let i = 0; i < processList.length; i++) {
        let target = list[processList[i]].state;
        if (target == s.process) {
            list[processList[i]].state = s.noSort;
        }
    }
    processList = [];
}