class data {
    constructor() {
        this.name = "";
        this.area = "TAO";
        this.level = "";
        this.local = {
            "address": "",
            "longitude": "",
            "latitude": "",
            "traffic": []
        };
        this.ticket = "";
        this.openingHours = "";
        this.source = [];
        this.article = "";
    }

}

let fs = require("fs");
let now = new data();
now = {
    "name": "李騰芳古宅",
    "area": "TAO",
    "level": "國定古蹟",
    "location": {
        "address": "桃園市大溪區月眉路34號",
        "longitude": 1,
        "latitude": 1,
        "traffic": []
    },
    "ticket": "",
    "openingHours": "",
    "source": [],
    "article": ""
}
let str = JSON.stringify(now);
console.log(str);

fs.writeFile('1.json', str, 'utf8', function (error) {
    if (error) {
        console.log(error);
        return false;
    }
    console.log("寫入成功");
});