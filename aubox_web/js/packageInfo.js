let data = [{ r: "王小明", s: "陳小美", t: "2020-03-05", l: "包裹已送達" },
{ r: "張美君", s: "王小明", t: "2020-03-06", l: "包裹已送達" },
{ r: "王小明", s: "鐘子豪", t: "2020-03-08", l: "包裹已送達" },
{ r: "朱蘭劭", s: "張其珊", t: "2020-03-15", l: "包裹已送達" },
{ r: "林韋康", s: "王雅龍", t: "2020-04-02", l: "包裹已送達" },
{ r: "杜政廷", s: "盧淳啟", t: "2020-04-16", l: "包裹達物流中心" },
{ r: "李雅婷", s: "閻宜靜", t: "2020-04-25", l: "包裹達物流中心" },
{ r: "郭俊吉", s: "許行依", t: "2020-04-30", l: "包裹達物流中心" },
{ r: "江淑惠", s: "張婉婷", t: "2020-05-01", l: "包裹運送中" }];
function loadPackageInfo() {
    let uri = apiAddress + "Company_listQRcode?company=" + companyName;
    let res = encodeURI(uri);
    let objs = [];
    $.get(res, function (data, status) {
        //alert("Data: " + data + "\nStatus: " + status);
        console.log(data);
        // if (data != '"True"') {
        //     console.log(data);
        //     alert("ERROR: " + status);
        // }
        objs = JSON.parse(data);
        console.log(objs);
        console.log(table);
        document.getElementById('packageInfoTable').innerHTML = table;
        for (let i = 0; i < objs.length; i++) {
            $.get(apiAddress + "Packagedata_Get?QRcode=" + objs[i], function (data, status) {
                //alert("Data: " + data + "\nStatus: " + status);
                console.log(data);
                // if (data != '"True"') {
                //     console.log(data);
                //     alert("ERROR: " + status);
                // }
                objs[i] = JSON.parse(data);
                console.log(objs);
                //addPackageInfoRow(objs[i].QRcode, objs[i].Rname, objs[i].Sname, objs[i].Deliveryman, objs[i].time, objs[i].nowpackage);
                addPackageInfoRow(objs[i]);
            });
        }
    });
}
let packageInfoList = ["QRcode", "Rname", "Raddress", "Rcellphone", "Rboxnumber", "Sname", "Saddress",
    "Scellphone", "time", "nowpackage", "company", "Deliveryman", "sign", "picture"];

function addPackageInfoOneBlock(data, index) {
    let el = document.createElement('th');
    el.innerHTML = data;
    if (packageInfoList[index] == "nowpackage") {
        data = parseInt(data, 10);
        el.innerHTML = packageStatus[data];
    }
    if (packageInfoList[index] == "sign") {
        if (data == "0") {
            el.innerHTML = "x";
        } else {
            let link = document.createElement('a');
            //data = JSON.parse(data);
            link.href = data;
            link.target = "_blank";
            link.innerHTML = "link";
            el.innerHTML = "";
            el.appendChild(link)
        }
    }
    if (packageInfoList[index] == "picture") {
        if (data == "0" || data == undefined) {
            el.innerHTML = "x";
        } else {
            let link = document.createElement('a');
            //data = JSON.parse(data);
            link.href = data;
            link.target = "_blank";
            link.innerHTML = "link";
            el.innerHTML = "";
            el.appendChild(link)
        }
    }
    return el;
}
function addPackageInfoRow(obj) {
    let packageInfoTable = document.getElementById('packageInfoTable');

    let tr = document.createElement('tr');

    for (let i = 0; i < packageInfoList.length; i++) {
        tr.appendChild(addPackageInfoOneBlock(obj[packageInfoList[i]], i));
    }

    packageInfoTable.appendChild(tr);
}
