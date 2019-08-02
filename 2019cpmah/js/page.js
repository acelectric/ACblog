function ajaxPage(page, link) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://acblog.nctu.me/2019cpmah/data/' + page + '.json');
    xhr.send('null');
    xhr.onload = function () {
        let obj = JSON.parse(xhr.responseText);
        // console.log(obj);
        addChildInContent(obj.name, 'h1');
        addChildInContent('', 'hr');

        let divContainer = addChildInContent();
        // console.log(divContainer);
        divContainer.classList.value += ' img-container';

        for (let i = 0; i < obj.img.length; i++) {
            let temp = document.createElement('img');
            temp.src = "https://acblog.nctu.me/2019cpmah/img/img" + obj.img[i] + ".jpg";
            divContainer.appendChild(temp);
        }


        if (link !== null) {
            for (let i = 0; i < obj.article.length; i++) {
                if (link == obj.article[i][0] || link == 'all') {
                    let temp;
                    temp = addChildInContent(obj.article[i][0], 'h1');
                    temp.classList.value += ' text';
                    temp = addChildInContent(obj.article[i][1]);
                    temp.classList.value += ' text';
                }
            }
            addChildInContent().style.height = '10px';

            if (link == '簡介' || link == 'all') {
                addChildInContent('級別 : ' + obj.level).classList += ' text';
                addChildInContent('開放時間 : ' + obj.openingHours).classList += ' text';
                addChildInContent('門票資訊 : ' + obj.ticket).classList += ' text';

                addChildInContent('交通方式：<br />').classList += ' text';
                for (let i = 0; i < obj.traffic.length; i++) {
                    let temp = addChildInContent((i + 1) + "." + obj.traffic[i][0]);
                    temp.classList += ' text';
                    addChildInContent(obj.traffic[i][1]).classList += ' text';
                    addChildInContent().style.height = '30px';
                }
            }

            if (link == '資料來源' || link == 'all') {
                let source = addChildInContent('資料來源 : <br />');
                source.classList += ' text';

                for (let i = 0; i < obj.source.length; i++) {
                    let a = document.createElement('a');
                    a.innerHTML = obj.source[i] + '<br />';
                    a.href = obj.source[i];
                    a.classList += ' sourceA';
                    source.appendChild(a);
                }
            }

        }

    }

    let back = document.getElementById('back');
    back.style.display = 'block';
    back.onclick = function () {
        location.reload();
    };
}

function ajaxclassificationPage(category) {
    let categorys = ['KEE', 'TPQ', 'TPE', 'TAO', 'HSQ', 'HSZ', 'MIA', 'TXG', 'CHA', 'YUN', 'CYQ', 'CYI', 'TNN', 'KHH', 'PIF', 'NAN', 'ILA', 'HUA', 'TTT', 'JME', 'PEN', 'LJF', 'all', 'national', 'municipality', 'county'];


    if (categorys.indexOf(category) != -1) {
        // 正確的類別
    } else {
        category = 'none';
    }
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://acblog.nctu.me/2019cpmah/data/' + category + '.json');
    xhr.send('null');
    xhr.onload = function () {
        let generateBox = function (obj) {
            let temp;
            temp = addChildInContent();
            temp.classList += ' box';
            let boxImg = document.createElement('div');
            boxImg.classList += ' box-img';
            boxImg.style.backgroundImage = 'url(' + 'https://acblog.nctu.me/2019cpmah/img/img' + obj.img[0] + '.jpg' + ')';
            temp.appendChild(boxImg);
            let boxText = document.createElement('div');
            boxText.classList += ' box-text';
            boxText.innerHTML = obj.name;
            temp.appendChild(boxText);
            for (let i = 0; i < obj.link.length; i++) {
                let boxLink = document.createElement('div');
                boxLink.classList += 'box-link';
                boxLink.innerHTML += obj.link[i];
                boxLink.onclick = function () {
                    document.getElementById('content').innerHTML = '';
                    ajaxPage(obj.json, obj.link[i]);
                };
                temp.appendChild(boxLink);
            }
            return temp;
        }
        let obj = JSON.parse(xhr.responseText);
        obj = obj.feature;
        for (let i = 0; i < obj.length; i++) {
            let xhr = new XMLHttpRequest();
            let json = 'https://acblog.nctu.me/2019cpmah/data/' + obj[i].json + '.json';
            xhr.open('GET', json);
            xhr.send('null');
            xhr.onload = function () {
                generateBox(obj[i]);
            };
        }

    };

}

