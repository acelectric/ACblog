function randomString(length) {
    length = length || 32;
    let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    /****預設去掉了容易混淆的字元oOLl,9gq,Vv,Uu,I1****/
    let charLength = chars.length;
    let result = '';
    for (i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
}

function setQRcode(id) {
    $('#qrcode').qrcode({
        width: 200,
        height: 200,
        text: id
    });
    console.log(id);
}

function submit() {
    let randomID = randomString(10);
    setQRcode(randomID);
    $('#submit').toggleClass('d-none');
    $('#uploadData').attr('readonly', 1);

    let uri = apiAddress + "PRegister?";
    let getDataList = ["Rname", "Raddress", "Rcellphone", "Sname", "Saddress", "Scellphone", "Rboxnumber", "Deliveryman"];
    for (let i = 0; i < getDataList.length; i++) {
        if (i != 0) {
            uri += '&';
        }
        let inputElement = $("#" + getDataList[i]);
        uri += getDataList[i] + "=" + inputElement.val();
        inputElement.attr('readonly', 1);
        //console.log(uri);
    }
    uri += "&QRcode=" + randomID + "&company=" + companyName;
    let res = encodeURI(uri);

    $.get(res, function (data, status) {
        //alert("Data: " + data + "\nStatus: " + status);
        console.log(data);
        if (data != '"True"') {
            console.log(data);
            alert("ERROR: " + status);
        }
    });

    window.print();
}
