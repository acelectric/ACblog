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
    let randomID = randomString(32);
    $('#qrcode').qrcode({
        width: 200,
        height: 200,
        text: randomID
    });
    console.log(randomID);
}

function submit() {
    setQRcode(123);
    $('#submit').toggleClass('d-none');
    $('input').attr('readonly', 1);

    let form = document.getElementById('form');

    window.print();
}
