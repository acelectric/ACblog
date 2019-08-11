let fs = require('fs');


// ===================
let fileCount = 155;
let address = 'https://acblog.nctu.me/2019cpmah/';
// ===================

let datas = new Array(fileCount);

let readFinishCount = 0;

let buildLogStr = "";
buildLogStr += '==============================================================\n';

let today = new Date();
let currentDateTime = today.getFullYear() + '年' + (today.getMonth() + 1) + '月' + today.getDate() + '日';
currentDateTime += '(' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() + ')';

buildLogStr += 'Date : ' + currentDateTime + '\n';
buildLogStr += 'fileCount : ' + fileCount + '\n';
buildLogStr += 'address : ' + address + '\n';

buildLogStr += '==============================================================\n';

fs.writeFileSync('build.log', buildLogStr, { "flag": "a" }, function (error) {
    if (error) {
        buildLog('END', error, "ERROR!");
    } else {
    }
});
function eNameToCName(target) {
    let map = [["連江縣", "LJF"], ["金門縣", "JME"], ["宜蘭縣", "ILA"], ["新竹縣", "HSQ"], ["苗栗縣", "MIA"], ["彰化縣", "CHA"], ["南投縣", "NAN"], ["雲林縣", "YUN"], ["嘉義縣", "CYQ"], ["屏東縣", "PIF"], ["臺東縣", "TTT"], ["花蓮縣", "HUA"], ["澎湖縣", "PEN"], ["基隆市", "KEE"], ["新竹市", "HSZ"], ["嘉義市", "CYI"], ["臺北市", "TPE"], ["高雄市", "KHH"], ["新北市", "TPQ"], ["臺中市", "TXG"], ["臺南市", "TNN"], ["桃園市", "TAO"], ["總覽", "all"], ["國定古蹟", "national"], ["直轄市定古蹟", "municipality"], ["縣(市)定古蹟", "county"]];
    let result = "none";
    for (let i = 0; i < map.length; i++) {
        if (target == map[i][1]) {
            result = map[i][0];
            break;
        }
    }
    return result;
}
function buildLog(func, message, status = 'NORMAL', ) {
    let str = "";
    if (status == 'ERROR!') {
        str += '==============================================================\n';
    }
    str += '[' + status + ']' + func + " ==> " + message + '\n';
    if (status == 'ERROR!') {
        str += '==============================================================\n';
    }
    fs.writeFile('build.log', str, { "flag": "a" }, function (error) {
        if (error) {
            buildLog('END', error, "ERROR!");
            console.log("ERROR");
        } else {
        }
    });
}

let createJsonFile = function (name, objs) {
    let str = JSON.stringify(objs);
    fs.writeFile('../data/categorys/' + name + '.json', str, 'utf-8', function (error) {
        if (error) {
            buildLog('createJsonFile', error, 'ERROR!');
        } else {
            buildLog('createJsonFile', '../data/categorys/' + name + '.json' + " done!");
        }
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
        if (obj.link[0] != '簡介') {
            buildLog('processDatas', 'json:' + obj.json + ',name:' + obj.name + '沒有簡介', '-WARN-');
            //console.log(obj.name + ' 沒有簡介');
        }
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
            buildLog("processDatas", "'" + objs.feature[i].level + "'", "-WARN-");
        }
    }
    createJsonFile('national', nationalObjs);
    createJsonFile('municipality', municipalityObjs);
    createJsonFile('county', countyObjs);

    let areas = ['KEE', 'TPQ', 'TPE', 'TAO', 'HSQ', 'HSZ', 'MIA', 'TXG', 'CHA', 'YUN', 'CYQ', 'CYI', 'TNN', 'KHH', 'PIF', 'NAN', 'ILA', 'HUA', 'TTT', 'JME', 'PEN', 'LJF'];



    for (let i = 0; i < areas.length; i++) {
        let areaObjs = { "feature": [] };
        let counter = 0;
        for (let j = 0; j < objs.feature.length; j++) {
            if (areas[i] == objs.feature[j].area) {
                areaObjs.feature.push(objs.feature[j]);
                counter++;
            }
        }
        if (counter == 0) {
            buildLog('processDatas', eNameToCName(areas[i]) + '未完成', '-WARN-');
        }
        createJsonFile(areas[i], areaObjs);
    }
    for (let i = 0; i < objs.feature.length; i++) {
        if (areas.indexOf(objs.feature[i].area) == -1) {
            buildLog('processDatas', objs.feature[i] + 'area may error', '-WARN-');
        }
    }
};


// process raw data to category data
for (let i = 1; i <= fileCount; i++) {
    fs.readFile('../data/raw/' + i + '.json', 'utf-8', function (error, data) {
        if (error) {
            buildLog('LINE-97', error, 'ERROR!');
        } else {
            let obj = JSON.parse(data)
            datas[i - 1] = obj;
            readFinishCount++;
            if (readFinishCount == fileCount) {
                processDatas();
            }
        }
    });
}

let matchToStr = function (data, match, str) {
    while (data.match(match)) {
        data = data.replace(match, str);
    }
    return data;
}

let categorys = ['KEE', 'TPQ', 'TPE', 'TAO', 'HSQ', 'HSZ', 'MIA', 'TXG', 'CHA', 'YUN', 'CYQ', 'CYI', 'TNN', 'KHH', 'PIF', 'NAN', 'ILA', 'HUA', 'TTT', 'JME', 'PEN', 'LJF', 'all', 'national', 'municipality', 'county'];

function createHtmlForCategory(template, categorysIndex) {
    // while (template.match(/\$\$\$/)) {
    //     template = template.replace('$$$', categorys[categorysIndex]);
    // }
    template = matchToStr(template, /\$\$\$/, categorys[categorysIndex]);
    fs.writeFile('../result/' + categorys[categorysIndex] + '.html', template, 'utf-8', function (error) {
        if (error) {
            buildLog('createHtmlForCategory', error, 'ERROR!');
        } else {
            buildLog('createHtmlForCategory', categorys[categorysIndex] + '.html complete');
        }
    });
}

// generate category html file by template.html
fs.readFile('template.html', 'utf-8', function (error, data) {
    if (error) {
        buildLog('LINE-135', error, 'ERROR!');
    } else {
        for (let i = 0; i < categorys.length; i++) {
            createHtmlForCategory(data, i);
        }
    }
});

// generate ../data/nav.json by nav.html
function generateElementJson(element) {
    fs.readFile(element + '.html', 'utf-8', function (error, data) {
        if (error) {
            buildLog('generateElementJson', error, 'ERROR!');
        } else {
            let updateData = matchToStr(data, /\$address\$/, address);
            let obj = { "feature": "" };
            obj.feature = updateData;
            let str = JSON.stringify(obj);
            fs.writeFile('../data/' + element + '.json', str, 'utf-8', function (error) {
                if (error) {
                    buildLog('generateElementJson', error, 'ERROR!');
                } else {
                    buildLog('generateElementJson', element + '.json' + ' complete');
                }
            });
        }
    });
}
// generate ../data/nav.json by nav.html
generateElementJson('nav');
// generate ../data/footer.json by footer.html
generateElementJson('footer');



