var address = 'https://acblog.nctu.me/2019cpmah/';

function addChildInContent(resource = '', label = 'div') {
    let temp = document.createElement(label);
    temp.innerHTML = resource;
    document.getElementById('content').appendChild(temp);
    return temp;
}
function ajaxNav() {
    let header = document.createElement('div');
    header.id = 'header';
    document.body.appendChild(header);

    var navXhr = new XMLHttpRequest();
    navXhr.open('GET', address + 'data/nav.json');
    navXhr.send('null');
    navXhr.onload = function () {
        let obj = JSON.parse(navXhr.responseText);
        document.getElementById('header').innerHTML = obj.feature;

        $('#hamburger').click(function () {
            $(this).css('display', 'none');
            $('#hamburger-close').css('display', 'block');
            $('.nav-item').css('display', 'block');
        });
        $('#hamburger-close').click(function () {
            $(this).css('display', 'none');
            $('#hamburger').css('display', 'flex');
            $('.nav-item').css('display', 'none');
        });
    }
}
function ajaxFooter() {
    let footer = document.createElement('div');
    footer.id = 'footer';
    document.body.appendChild(footer);

    var footerXhr = new XMLHttpRequest();
    footerXhr.open('GET', address + 'data/footer.json');
    footerXhr.send('null');
    footerXhr.onload = function () {
        let obj = JSON.parse(footerXhr.responseText);
        document.getElementById('footer').innerHTML = obj.feature;
    }
}
function initPage(contentClass = '', mode = 'noSave') {
    let temp = document.body.innerHTML;
    document.body.innerHTML = '';
    ajaxNav();
    let content = document.createElement('div');
    content.id = 'content';
    content.className += contentClass;
    if (mode == 'save') {
        content.innerHTML = temp;
    }
    document.body.appendChild(content);
    ajaxFooter();
    let back = document.createElement('div');
    back.id = 'back';
    document.body.appendChild(back);
}
function ajaxPage(page, link) {
    initPage('');

    let xhr = new XMLHttpRequest();
    xhr.open('GET', address + 'data/raw/' + page + '.json');
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
            temp.className += ' img-small'
            temp.src = address + "img/img" + obj.img[i] + ".jpg";
            temp.onclick = function () {
                let imgViewContainer = addChildInContent();
                imgViewContainer.className = 'img-view-container';
                imgViewContainer.onclick = function () {
                    imgViewContainer.parentNode.removeChild(imgViewContainer);
                }
                let cross = document.createElement('div');
                cross.className = 'cross';
                imgViewContainer.appendChild(cross);
                let imgView = document.createElement('img');
                imgView.src = temp.src;
                imgView.className = 'img-view';
                imgViewContainer.appendChild(imgView);
            }
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
                if (link == 'all') {
                    addChildInContent().style.height = '30px';
                }
            }
            addChildInContent().style.height = '80px';

            if (link == '簡介' || link == 'all') {
                addChildInContent('級別 : ' + obj.level).classList += ' text';
                //addChildInContent().style.height = '20px';
                addChildInContent('開放時間 : ' + obj.openingHours).classList += ' text';
                //addChildInContent().style.height = '20px';
                addChildInContent('門票資訊 : ' + obj.ticket).classList += ' text';
                //addChildInContent().style.height = '20px';
                addChildInContent('地址 : ' + obj.address).classList += ' text';
                //addChildInContent().style.height = '20px';

                addChildInContent('交通方式：<br />').classList += ' text';
                //addChildInContent().style.height = '20px';
                let labelCount = 0;
                for (let i = 0; i < obj.traffic.length; i++) {
                    if (obj.traffic[i][0] == '<a>') {
                        let container = addChildInContent();
                        container.className += ' text';
                        let temp = document.createElement('a');
                        temp.innerHTML = obj.traffic[i][1];
                        temp.className += 'sourceA';
                        temp.href = obj.traffic[i][1];
                        container.appendChild(temp);
                        labelCount++;
                    } else if (obj.traffic[i][0] == '<img>') {
                        let container = addChildInContent();
                        container.className += ' text';
                        let temp = document.createElement('img');
                        temp.src = address + 'img/img' + obj.traffic[i][1] + '.jpg';
                        temp.className += 'articleImg';
                        container.appendChild(temp);
                        labelCount++;
                    } else {
                        let temp = addChildInContent((i + 1 - labelCount) + "." + obj.traffic[i][0]);
                        temp.classList += ' text';
                        addChildInContent(obj.traffic[i][1]).classList += ' text';
                    }
                    //addChildInContent().style.height = '10px';
                }
                let mapContainer = addChildInContent();
                mapContainer.style.textAlign = 'center';
                let googleMap = document.createElement('iframe');
                googleMap.src = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyDUhIo7me0xLxCnncSfh9iE9RFs5c1XNJI&language=zh-tw&q=' + obj.name;
                googleMap.frameBorder = "0";
                googleMap.id = 'googleMap';
                mapContainer.appendChild(googleMap);
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
    back.innerText = 'back';
    back.style.display = 'block';
    back.onclick = function () {
        location.reload();
    };
}

function eNameToCName(target) {
    let map = [["連江縣", "LJF"], ["金門縣", "JME"], ["宜蘭縣", "ILA"], ["新竹縣", "HSQ"], ["苗栗縣", "MIA"], ["彰化縣", "CHA"], ["南投縣", "NAN"], ["雲林縣", "YUN"], ["嘉義縣", "CYQ"], ["屏東縣", "PIF"], ["臺東縣", "TTT"], ["花蓮縣", "HUA"], ["澎湖縣", "PEN"], ["基隆市", "KEE"], ["新竹市", "HSZ"], ["嘉義市", "CYI"], ["臺北市", "TPE"], ["高雄市", "KHH"], ["新北市", "TPQ"], ["臺中市", "TXG"], ["臺南市", "TNN"], ["桃園市", "TAO"], ["總覽", "all"], ["國定古蹟", "national"], ["直轄市定古蹟", "municipality"], ["縣(市)定古蹟", "county"]];
    let result = "none";
    for (let i = 0; i < map.length; i++) {
        if (target == map[i][1]) {
            result = map[i][0];
            break;
        }
    }
    return result;
}
function generateBox(obj) {
    let temp;
    temp = addChildInContent();
    temp.classList += ' box';
    let boxImg = document.createElement('div');
    boxImg.classList += ' box-img';
    boxImg.style.backgroundImage = 'url(' + address + 'img/img' + obj.img[0] + '.jpg' + ')';
    boxImg.onclick = function () {
        ajaxPage(obj.json, 'all');
    };
    temp.appendChild(boxImg);
    let boxText = document.createElement('div');
    boxText.classList += ' box-text';
    boxText.innerHTML = obj.name;
    temp.appendChild(boxText);
    let boxLinkContainer = document.createElement('div');
    boxLinkContainer.classList += 'box-link-container';
    for (let i = 0; i < obj.link.length; i++) {
        let boxLink = document.createElement('div');
        boxLink.classList += 'box-link';
        boxLink.innerHTML += obj.link[i];
        boxLink.onclick = function () {
            ajaxPage(obj.json, obj.link[i]);
        };
        boxLinkContainer.appendChild(boxLink);
    }
    temp.appendChild(boxLinkContainer);
    return temp;
}
function ajaxClassificationPage(category) {
    const categorys = ['KEE', 'TPQ', 'TPE', 'TAO', 'HSQ', 'HSZ', 'MIA', 'TXG', 'CHA', 'YUN', 'CYQ', 'CYI', 'TNN', 'KHH', 'PIF', 'NAN', 'ILA', 'HUA', 'TTT', 'JME', 'PEN', 'LJF', 'all', 'national', 'municipality', 'county'];

    initPage('flex');
    if (categorys.indexOf(category) != -1) {
        // 正確的類別
    } else {
        category = 'none';
    }
    let titleStr = eNameToCName(category);
    let title = addChildInContent(titleStr, 'h1');
    title.className += ' text';

    let bigPages = ['all', 'national', 'municipality', 'county'];
    if (bigPages.indexOf(category) != -1) {
        let smallPages = ['KEE', 'TPQ', 'TPE', 'TAO', 'HSQ', 'HSZ', 'MIA', 'TXG', 'CHA', 'YUN', 'CYQ', 'CYI', 'TNN', 'KHH', 'PIF', 'NAN', 'ILA', 'HUA', 'TTT', 'JME', 'PEN', 'LJF'];
        let options = [];
        for (let i = 0; i < smallPages.length; i++) {
            const temp = eNameToCName(smallPages[i]);
            let obj = { "eName": smallPages[i], "cName": temp };
            options.push(obj);
        }
        console.log(options);
        createSelectOption(options, function () {
            console.log(category, optionList.value);
            createClassificationSubPage(category, optionList.value);
        });
    }



    // load each box
    let xhr = new XMLHttpRequest();
    xhr.open('GET', address + 'data/categorys/' + category + '.json');
    xhr.send('null');
    xhr.onload = function () {

        let obj = JSON.parse(xhr.responseText);
        obj = obj.feature;
        for (let i = 0; i < obj.length; i++) {
            generateBox(obj[i]);
        }

    };

}

function createClassificationSubPage(bigPage, smallPage) {
    let temp = document.getElementById('optionSetContainer');
    document.getElementById('content').innerHTML = "";
    let titleStr = eNameToCName(bigPage);
    titleStr += '-';
    titleStr += eNameToCName(smallPage);
    let title = addChildInContent(titleStr, 'h1');
    title.className += ' text';
    document.getElementById('content').appendChild(temp);



    let xhr = new XMLHttpRequest();
    xhr.open('GET', address + 'data/categorys/' + bigPage + '.json');
    xhr.send('null');
    xhr.onload = function () {
        let obj = JSON.parse(xhr.responseText);
        obj = obj.feature;
        for (let i = 0; i < obj.length; i++) {
            if (obj[i].area == smallPage) {
                generateBox(obj[i]);
            }
        }
    }
}

function createSelectOption(options, buttonOnclockFunc) {
    let optionSetContainer = addChildInContent();
    optionSetContainer.id = 'optionSetContainer';
    optionSetContainer.className += ' option-set-container';

    let optionList = addChildInContent('', 'select');
    optionList.id = 'optionList';
    optionList.className += ' option-list';
    for (let i = 0; i < options.length; i++) {
        let temp = addChildInContent(options[i].cName, 'option');
        temp.value = options[i].eName;
        optionList.appendChild(temp);
    }

    let optionButton = addChildInContent('GO');
    optionButton.id = 'optionButton';
    optionButton.className += ' option-button';
    optionButton.onclick = buttonOnclockFunc;

    optionSetContainer.appendChild(optionList);
    optionSetContainer.appendChild(optionButton);
    return optionSetContainer;
}

function ajaxMapPage(areas) {
    initPage('flex-center');

    let title = addChildInContent('古蹟地圖', 'h1');
    title.className += ' text';

    createSelectOption(areas, function () {
        location.assign(address + 'result/' + optionList.value + '.html');
    });

}