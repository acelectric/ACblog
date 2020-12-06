let nowPage = "login";
let pages = ["login", "register", "forgetPassword", "packageInfo", "uploadData"];

let account = "";
let password = "";
let hasLogin = false;
let companyName = "testCompany";

let apiAddress = "http://120.101.8.52/aubox604/WebService1.asmx/";
let packageStatus = ["錯誤", "包裹運送中", "包裹成功送達", "收件者確認收貨"]
let table, uploadData;
function openPage(page) {
    let pageIndex = pages.indexOf(page);

    // if (pageIndex == 0) {
    //     hasLogin = false;
    // }

    if (hasLogin) {
        if (pageIndex != -1) {
            $("#" + nowPage).addClass("d-none");
            $("#" + page).removeClass("d-none");
            $("#" + nowPage + "_item").addClass("text-white");
            $("#" + nowPage + "_item").removeClass("text-theme");
            $("#" + page + "_item").addClass("text-theme");
            $("#" + page + "_item").removeClass("text-white");
            nowPage = page;
        }
        if (pages[pageIndex] == "packageInfo") {
            loadPackageInfo();
        }
        $('#login_item').text('登出');
    } else {
        if (pageIndex == 0 || pageIndex == 1 || pageIndex == 2) {
            $("#" + nowPage).addClass("d-none");
            $("#" + page).removeClass("d-none");
            $("#" + nowPage + "_item").addClass("text-white");
            $("#" + nowPage + "_item").removeClass("text-theme");
            $("#" + page + "_item").addClass("text-theme");
            $("#" + page + "_item").removeClass("text-white");
            nowPage = page;
        }
        $('#login_item').text('登入');
    }


}
window.onload = function () {
    table = document.getElementById('packageInfoTable').innerHTML;
    uploadData = document.getElementById('uploadData').innerHTML;
}
