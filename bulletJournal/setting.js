var load;
var canvas;

var cols = 28;
var rows = 42;
var blockSize = 19;
var layout = [];
var auxiliaryLines = [];

var styleMode = {
    fill: 'fill',
    blank: 'blank',
    cross: 'cross',
    dot: 'dot',
    circle: 'circle',
}

var auxiliaryLineMode = {
    vertical: 'vertical',
    horizontal: 'horizontal'
}
var mode = {
    line: 'line',
    block: 'block',
    none: 'none'
}
var gui;

//JSON.stringify 的過濾器
//https://blog.fundebug.com/2017/08/17/what-you-didnt-know%20about-json-stringify/
let replacer = function (key, value) {
    if(key === 'color') {
        return value === '#ffffff' ? undefined: value;
    }
    if(key === 'style') {
        return value === 'blank' ? undefined: value;
    }
    if(key === 'i'||key === 'j'||key === 'x'||key === 'y') {
        return undefined;
    }
    return value;
};

var setting = {
    mode: mode.block,
    styleMode: styleMode.fill,
    auxiliaryLineMode: auxiliaryLineMode.horizontal,
    color:'#000000',
    layout:function(){
        console.log(JSON.stringify(layout,replacer));
    },
}