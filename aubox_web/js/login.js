function login() {
    account = $('#account').val();
    password = $('#password').val();
    let uri = apiAddress + "Companydata_Get?account=" + account + "&password=" + password;
    let res = encodeURI(uri);
    if (account == "" || password == "") {
        alert("ERROR: 請輸入帳號及密碼");
    } else {
        $.get(res, function (data, status) {
            //alert("Data: " + data + "\nStatus: " + status);
            //alert("ERROR: " + status);
            let obj = JSON.parse(data);
            console.log(obj);
            if (obj.account != account) {
                hasLogin = false;
                alert("錯誤的帳號或密碼");
                console.log("ERROR: " + status);
            } else {
                hasLogin = true;
                companyName = obj.companyname;
                loadPackageInfo();
                openPage('packageInfo');
            }


        });
    }

}