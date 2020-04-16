function loadPackageInfo() {
    let packageInfoTable = document.getElementById('packageInfoTable');
    let rand = Math.floor(Math.random() * 100);
    for (let i = 0; i < rand; i++) {
        let tr = document.createElement('tr');
        let id = document.createElement('th');
        id.scope = "row";
        id.innerHTML = i + 1;
        tr.appendChild(id);
        let recieve = document.createElement('th');
        recieve.innerHTML = randomString(5);
        let sender = document.createElement('th');
        sender.innerHTML = randomString(5);
        let time = document.createElement('th');
        time.innerHTML = randomString(5);
        let link = document.createElement('th');
        link.innerHTML = randomString(5);
        tr.appendChild(recieve);
        tr.appendChild(sender);
        tr.appendChild(time);
        tr.appendChild(link);
        packageInfoTable.appendChild(tr);
    }
}
window.onload = function () {
    loadPackageInfo();
}