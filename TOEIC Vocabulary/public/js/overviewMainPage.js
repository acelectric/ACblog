/**
 * require list
 * -------------
 * -------------
 */

function overviewMainPageDataProcess(res) {
    let datas = res.data;
    let overviewTable = document.getElementById('overviewTable');
    for (let i = 0; i < datas.length; i++) {
        let tr = document.createElement('tr');
        let id = document.createElement('th');
        id.scope = "row";
        id.innerHTML = i + 1;
        tr.appendChild(id);
        let e = document.createElement('th');
        e.innerHTML = datas[i].e;
        let c = document.createElement('th');
        c.innerHTML = datas[i].c;
        tr.appendChild(e);
        tr.appendChild(c);
        overviewTable.appendChild(tr);
    }
}
