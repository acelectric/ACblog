let nowPage = "login";
let pages = ["login", "register", "forgetPassword", "packageInfo", "uploadData"];

let hasLogin = false;

function openPage(page) {
    let pageIndex = pages.indexOf(page);

    if (pageIndex == 0) {
        hasLogin = false;
    }

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

function login() {
    hasLogin = true;
    openPage('packageInfo');
}