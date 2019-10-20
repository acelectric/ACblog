/** 
 * require list
 * -------------------
 * overviewMainPage.js
 * practiceMainPage.js
 * util.js
 * addWord.js
 * -------------------
 * outside
 * -------------------
 * jQuery.js
 * popper.js
 * feather.js
 * -------------------
 */


function hideSidebar() {
    let sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle("d-block");
}
let nowMainPageID = 'overview';
function changeMainPage(link, mainPageID) {
    document.getElementsByClassName('active')[0].classList.toggle('active');
    link.classList.toggle('active');

    document.getElementById(nowMainPageID).classList.toggle('d-none');
    document.getElementById(mainPageID).classList.toggle('d-none');
    nowMainPageID = mainPageID;
    hideSidebar();
}

function init() {
    feather.replace();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', address + 'overview.json');
    xhr.send();
    xhr.onload = function () {
        let obj = JSON.parse(xhr.responseText)
        overviewMainPageDataProcess(obj);
        practiceMainPageDataProcess(obj);
    }
}
init();