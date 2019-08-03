
let fs = require("fs");

let fileCount = 44
let datas = new Array(fileCount);

let readFinishCount = 0;

let createJsonFile = function (name, objs) {
    let str = JSON.stringify(objs);
    fs.writeFile(name + '.json', str, 'utf-8', function (error) {
        if (error) console.log(error);
        console.log(name + " done!");
    });
}

let processDatas = function () {
    let objs = { "feature": [] };
    for (let i = 0; i < datas.length; i++) {
        //console.log(i + 1 + ':' + datas[i].name);
        let obj = {
            "json": i + 1,
            "name": "",
            "link": [],
            "img": [],
            "level": "",
            "area": ""
        }
        obj.name = datas[i].name;
        for (let j = 0; j < datas[i].article.length; j++) {
            obj.link.push(datas[i].article[j][0]);
        }
        obj.link.push("資料來源");
        obj.img = datas[i].img;
        obj.level = datas[i].level;
        obj.area = datas[i].area;
        objs.feature.push(obj);
    }
    createJsonFile('all', objs);

    let nationalObjs = { "feature": [] };
    let municipalityObjs = { "feature": [] };
    let countyObjs = { "feature": [] };
    for (let i = 0; i < objs.feature.length; i++) {
        if (objs.feature[i].level == '國定古蹟') {
            nationalObjs.feature.push(objs.feature[i]);
        } else if (objs.feature[i].level == '直轄市定古蹟') {
            municipalityObjs.feature.push(objs.feature[i]);
        } else if (objs.feature[i].level == '縣(市)定古蹟') {
            countyObjs.feature.push(objs.feature[i]);
        } else {
            console.log("'" + objs.feature[i].level + "'");
        }
    }
    createJsonFile('national', nationalObjs);
    createJsonFile('municipality', municipalityObjs);
    createJsonFile('county', countyObjs);

    let areas = ['KEE', 'TPQ', 'TPE', 'TAO', 'HSQ', 'HSZ', 'MIA', 'TXG', 'CHA', 'YUN', 'CYQ', 'CYI', 'TNN', 'KHH', 'PIF', 'NAN', 'ILA', 'HUA', 'TTT', 'JME', 'PEN', 'LJF'];



    for (let i = 0; i < areas.length; i++) {
        let areaObjs = { "feature": [] };
        for (let j = 0; j < objs.feature.length; j++) {
            if (areas[i] == objs.feature[j].area) {
                areaObjs.feature.push(objs.feature[j]);
            }
        }
        createJsonFile(areas[i], areaObjs);
    }
};



for (let i = 1; i <= fileCount; i++) {
    fs.readFile(i + '.json', 'utf-8', function (error, data) {
        if (error) console.log(error);

        let obj = JSON.parse(data)
        datas[i - 1] = obj;
        readFinishCount++;
        if (readFinishCount == fileCount) {
            processDatas();
        }
    });
}
