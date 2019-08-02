
let fs = require("fs");

let fileCount = 29
let datas = new Array(fileCount);

let readFinishCount = 0;

let processDatas = function () {
    let objs = { "feature": [] };
    for (let i = 0; i < datas.length; i++) {
        //console.log(i + 1 + ':' + datas[i].name);
        let obj = {
            "json": i + 1,
            "name": "",
            "link": [],
            "img": []
        }
        obj.name = datas[i].name;
        for (let j = 0; j < datas[i].article.length; j++) {
            obj.link.push(datas[i].article[j][0]);
        }
        obj.link.push("資料來源");
        obj.img = datas[i].img;
        objs.feature.push(obj);
    }
    let str = JSON.stringify(objs);
    fs.writeFile('all.json', str, 'utf-8', function (error) {
        if (error) console.log(error);
        console.log("done");

    });
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


// fs.readFile(1 + '.json', 'utf-8', function (error, data) {
//     if (error) throw error;

//     console.log(data)
// });