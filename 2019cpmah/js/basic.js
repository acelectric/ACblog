let addChildInContent = function (resource = '', label = 'div') {
    let temp = document.createElement(label);
    temp.innerHTML = resource;
    document.getElementById('content').appendChild(temp);
    return temp;
}
var navXhr = new XMLHttpRequest();
navXhr.open('GET', 'https://acblog.nctu.me/2019cpmah/data/nav.json');
navXhr.send('null');
navXhr.onload = function () {
    let obj = JSON.parse(navXhr.responseText);
    document.getElementById('header').innerHTML = obj.nav;
}
var footerXhr = new XMLHttpRequest();
footerXhr.open('GET', 'https://acblog.nctu.me/2019cpmah/data/footer.json');
footerXhr.send('null');
footerXhr.onload = function () {
    let obj = JSON.parse(footerXhr.responseText);
    document.getElementById('footer').innerHTML = obj.footer;
}