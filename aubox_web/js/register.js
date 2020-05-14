function register() {
    let companyname = $('#R_companyname').val();
    let principal = $('#R_principal').val();
    let account = $('#R_account').val();
    let password = $('#R_password').val();
    let passwordAgain = $('#R_passwordAgain').val();
    let email = $('#R_email').val();
    console.log(companyname);
    console.log(principal);
    console.log(account);
    console.log(password, passwordAgain);
    console.log(email);
    if (password != passwordAgain) {
        alert("兩次輸入密碼不一致");
    } else {
        let uri = apiAddress + "CRegister?companyname=" + companyname + "&principal="
            + principal + "&account=" + account + "&password=" + password + "&email=" + email;
        let res = encodeURI(uri);

        $.get(res, function (data, status) {
            //alert("Data: " + data + "\nStatus: " + status);
            if (data != '"True"') {
                console.log(data);
                alert("ERROR: " + status);
            }
            openPage('login');
        });
    }
}
