var fs = require('fs')

const HEAD = {
    "label": "head",
    "attr": null,
    "html": null,
    "child": [{
        "label": "meta",
        "attr": [["charset", "utf-8"]],
    }, {
        "label": "meta",
        "attr": [["name", "viewport"], ["content", "width=device-width, initial-scale=1, maximum-scale=1"]]
    }, {
        "label": "title",
        "html": "home",
    }, {
        "label": "script",
        "attr": [["src", "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"]],
    }, {
        "label": "script",
        "attr": [["src", "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"],
        ["integrity", "sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"],
        ["crossorigin", "anonymous"]]
    }, {
        "label": "script",
        "attr": [["src", "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"],
        ["integrity", "sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k"],
        ["crossorigin", "anonymous"]]
    }, {
        "label": "script",
        "attr": [["src", "hamburger.js"], ["type", "text/javascript"]]
    }, {
        "label": "link",
        "attr": [["rel", "stylesheet"],
        ["href", "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"],
        ["integrity", "sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"],
        ["crossorigin", "anonymous"]]
    }, {
        "label": "link",
        "attr": [["rel", "stylesheet"], ["href", "default.css"], ["type", "text/css"]]
    }, {
        "label": "link",
        "attr": [["rel", "stylesheet"], ["href", "RWD.css"], ["type", "text/css"]]
    }, {
        "label": "link",
        "attr": [["rel", "shortcut icon"], ["href", "#"]]
    }]
};
const NAV = {
    "attr": [["id", "nav"], ["class", "nav color-ochre"]],
    "child": [{
        "attr": [["class", "nav-brand"]],
        "child": [{
            "label": "a",
            "attr": [["href", "#top"]],
            "html": "搜奇訪古",
        }, {
            "attr": [["id", "hamburger-close"]]
        }, {
            "attr": [["id", "hamburger"]],
            "child": [{}, {}, {}]
        }]
    }, {
        "attr": [["class", "nav-item"]],
        "child": [{
            "label": "a",
            "attr": [["href", "national.html"]],
            "html": "國定古蹟"
        }]
    }, {
        "attr": [["class", "nav-item"]],
        "child": [{
            "label": "a",
            "attr": [["href", "national.html"]],
            "html": "直轄市定古蹟"
        }]
    }, {
        "attr": [["class", "nav-item"]],
        "child": [{
            "label": "a",
            "attr": [["href", "national.html"]],
            "html": "縣(市)定古蹟"
        }]
    }, {
        "attr": [["class", "nav-item"]],
        "child": [{
            "label": "a",
            "attr": [["href", "national.html"]],
            "html": "古蹟地圖"
        }]
    }, {
        "attr": [["class", "nav-item"]],
        "child": [{
            "label": "a",
            "attr": [["href", "national.html"]],
            "html": "製作團隊"
        }]
    }, {
        "attr": [["class", "nav-item"]],
        "child": [{
            "label": "a",
            "attr": [["href", "national.html"]],
            "html": "資料來源"
        }]
    }]
}

function generate(table, tab) {
    let str = "";
    let tabStr = "";
    let oldTab = tab;
    const label = table.label == null ? "div" : table.label;

    // tab start
    for (let i = 0; i < tab; i++) {
        tabStr += "    ";
    }
    str += tabStr;

    // <head attr=""> start
    str += "<" + label;
    if (table.attr != null) {
        for (let i = 0; i < table.attr.length; i++) {
            const pair = table.attr[i];
            str += " " + pair[0] + "=" + '"' + pair[1] + '"';
        }
    }
    str += ">";

    // innerHtml start
    if (table.html != null) {
        str += table.html;
    }

    // child element start
    if (table.child != null) {
        tab++;
        str += "\n"
        for (let i = 0; i < table.child.length; i++) {
            const a = table.child[i];
            str += generate(a, tab) + "\n";
        }
    }

    // end label start
    if (oldTab !== tab) {
        str += tabStr + "</" + label + ">";
    } else {
        str += "</" + label + ">";
    }
    return str;
}

let str = "<!DOCTYPE html>\n<html>\n";
str += generate(HEAD, 0);
str += "\n<body>";
str += generate(NAV, 0);
str += "\n</body>";
str += "\n</html>";

fs.writeFile('../test.html', str, 'utf8', function (error) {
    if (error) {
        console.log(error);
        return false;
    }
    console.log("寫入成功");
});