let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let LearnUnit = require('../public/js/LearnUnit.js');
let fs = require('fs');


// app.get('/', function (req, res) {
//     res.send('Hello World');
// })

function getTime() {
    let date = new Date();
    let str = "";

    str += date.getFullYear() + '/';

    let temp = date.getMonth() + 1;
    str += temp > 10 ? temp : ("0" + temp);
    str += '/';
    let temp = date.getDate() + 1;
    str += temp > 10 ? temp : ("0" + temp);
    str += ' ';
    let temp = date.getHours() + 1;
    str += temp > 10 ? temp : ("0" + temp);
    str += ':';
    let temp = date.getMinutes() + 1;
    str += temp > 10 ? temp : ("0" + temp);
    str += ':';
    let temp = date.getSeconds() + 1;
    str += temp > 10 ? temp : ("0" + temp);
    return str;
}


let Status = {
    success: "success",
    warning: "warning",
    danger: "danger"
}

app.post('/addWord', bodyParser.json(), function (req, res) {
    console.log(req.body);
    let obj = req.body;
    obj.timeline = getTime();

    fs.readFile("../public/data/overview.json", function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let overview = JSON.parse(data);
            if (overview.data.includes(obj.vocabulary)) {
                // not need add to overview
                console.log(obj.vocabulary + " was in overview!");
            } else {
                fs.writeFile("../public/data/vocabularys/" + obj.vocabulary + ".json", JSON.stringify(obj), function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(obj.vocabulary + " is finish!");
                    }
                });
                overview.data.push({ "e": obj.vocabulary, "c": obj.descriptions[0].meaning });
                fs.writeFile("../public/data/overview.json", JSON.stringify(overview), function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(obj.vocabulary + " is add to overview!");
                    }
                });
            }
        }
    });

    res.end(req.body.vocabulary + " is send to server!");

});
app.use('/', express.static('../public'));

let server = app.listen(8081, function () {

    let port = server.address().port;

    console.log("server at http://localhost:%s", port);

});
