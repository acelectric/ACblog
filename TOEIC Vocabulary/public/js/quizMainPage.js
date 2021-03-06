/*
 * require list
 * -------------------
 * practiceMainPage.js
 * util.js
 * 
 * -------------------
 */

let cards = [];
function quizMainPageDataProcess(res) {
    let datas = res.data;
    let randomList = [];
    for (let i = 0; i < datas.length; i++) {
        randomList.push(datas[i].e);
    }
    let shuffle = function (a, b) {
        let num = Math.random() > 0.5 ? -1 : 1;
        return num;
    }
    randomList.sort(shuffle);
    //console.log(randomList);
    for (let i = 0; i < randomList.length; i++) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', address + 'vocabularys/' + randomList[i] + '.json');
        xhr.send();
        xhr.onload = function () {
            let obj = JSON.parse(xhr.responseText);
            let card = createCardElement(obj);
            card.classList.add('d-none');
            //document.getElementById('quiz').innerHTML = "";
            document.getElementById('quiz').append(card);
            feather.replace();
            cards.push(card);
            changeCard();
        }
    }
}
let now = 0;
function changeCard() {
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.add('d-none');
    }
    cards[now].classList.toggle('d-none');
}
document.onkeydown = function (e) {
    let keyCode = e.keyCode;
    if (keyCode == 37) {
        //console.log("<<<");
        if (now > 0) {
            now--;
            changeCard();
        }
    } else if (keyCode == 39) {
        //console.log(">>>")

        if (now < cards.length - 1) {
            now++;
            changeCard();
        }
    } else if (keyCode == 40) {
        //console.log("down");
        cards[now].querySelector(".card-body").classList.toggle('d-none');
    } else {
        console.log(keyCode);
    }
}
