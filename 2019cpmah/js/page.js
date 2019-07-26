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

                addChildInContent('交通方式：<br />');
                for (let i = 0; i < obj.traffic.length; i++) {
                    addChildInContent((i + 1) + obj.traffic[i][0]);
                    addChildInContent(obj.traffic[i][1]);
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
}