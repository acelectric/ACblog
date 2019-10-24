
let descriptionsCount = [0];

function addSentencesTemplate(nowDescriptionsValue) {
    let sentencesTemplate = '<div class="form-group bg-gray py-2 ml-md-5"><div class="row"><div class="col-sm col-ml-1"><div class="row mb-2"><label for="sentences"class="col-sm-2 col-form-label mr-auto">英文</label><div class="col-sm"><input type="text" class="form-control" id="englishSentences$-$"name="englishSentences$-$" placeholder="english sentences" autocomplete="off"></div></div><div class="row"><label for="sentences"class="col-sm-2 col-form-label mr-auto">中文</label><div class="col-sm"><input type="text" class="form-control" id="chineseSentences$-$"name="chineseSentences$-$" placeholder="chinese sentences" autocomplete="off"></div></div></div></div></div>';
    descriptionsCount[nowDescriptionsValue]++;
    sentencesTemplate = sentencesTemplate.replace(/\$\-\$/g, nowDescriptionsValue + '-' + descriptionsCount[nowDescriptionsValue]);
    sentencesTemplate = sentencesTemplate.replace(/\$\$\$/g, descriptionsCount[nowDescriptionsValue]);
    let temp = document.createElement('div');
    temp.innerHTML = sentencesTemplate;
    document.getElementById('sentences' + nowDescriptionsValue).appendChild(temp);
}

function addDescriptionsTemplate() {
    let descriptionsTemplate = '<div class="form-group bg-gray py-2 ml-md-5"><div class="row"><div class="col-sm col-ml-1"><div class="form-group row"><label for="partOfSpeech" class="col-sm-2 col-form-label">詞性</label><div class="col-sm-4"><input type="text" class="form-control" id="partOfSpeech$$$" name="partOfSpeech$$$"placeholder="partOfSpeech" autocomplete="off"></div><label for="meaning" class="col-sm-2 col-form-label">注釋</label><div class="col-sm-4"><input type="text" class="form-control" id="meaning$$$" name="meaning$$$"placeholder="meaning" autocomplete="off"></div></div><div id="sentences$$$"><div class="row mb-2"><label for="sentences" class="col-6 col-sm-2 col-form-label mr-auto">例句</label><div class="col-auto my-auto"><span class="float-right" onclick="addSentencesTemplate($$$);"data-feather="plus-circle"></span></div></div><div class="form-group bg-gray py-2 ml-md-5"><div class="row"><div class="col-sm col-ml-1"><div class="row mb-2"><label for="sentences"class="col-sm-2 col-form-label mr-auto">英文</label><div class="col-sm"><input type="text" class="form-control" id="englishSentences$$$-0"name="englishSentences$$$-0" placeholder="english sentences" autocomplete="off"></div></div><div class="row"><label for="sentences"class="col-sm-2 col-form-label mr-auto">中文</label><div class="col-sm"><input type="text" class="form-control" id="chineseSentences$$$-0"name="chineseSentences$$$-0" placeholder="chinese sentences" autocomplete="off"></div></div></div></div></div></div></div></div></div>';
    descriptionsCount.push(0);
    descriptionsTemplate = descriptionsTemplate.replace(/\$\$\$/g, descriptionsCount.length - 1);
    let temp = document.createElement('div');
    temp.innerHTML = descriptionsTemplate;
    document.getElementById('descriptions').appendChild(temp);
    feather.replace();
}

let relatesCount = -1;
function addRelatesTemplate() {
    let relatesTemplate = '<div class="row"><div class="col-md-3 col-sm-12 mb-1"><select class="form-control" id="selectRelates$$$"><option>同義詞</option><option>反義詞</option><option>衍伸詞</option></select></div><div class="col-md-9 col-sm-12"><input type="text" class="form-control" id="relates$$$" name="relates$$$" placeholder="relates" autocomplete="off"></div></div>';
    relatesCount++;
    relatesTemplate = relatesTemplate.replace(/\$\$\$/g, relatesCount);
    let temp = document.createElement('div');
    temp.innerHTML = relatesTemplate;
    temp.classList.add('bg-gray');
    temp.classList.add('form-group');
    document.getElementById('relates').appendChild(temp);
}

let remarksCount = -1;
function addRemarksTemplate() {
    //let remarksTemplate = '<div class="row"><div class="col-md-3 col-sm-12 mb-1"><input type="text" class="form-control" id="remarksTitle$$$" name="remarksTitle$$$"placeholder="title" autocomplete="off"></div><div class="col-md-9 col-sm-12"><input type="text" class="form-control" id="remarksText$$$" name="remarksText$$$"placeholder="text" autocomplete="off"></div></div>';
    let remarksTemplate = '<div class="row"><div class="col-12 mb-1"><input type="text" class="form-control"id="remarksTitle$$$" name="remarksTitle$$$" placeholder="title" autocomplete="off"></div></div><div class="row"><div class="col-12"><textarea class="form-control" name="remarksText$$$" id="remarksText$$$" rows="3" placeholder="text" autocomplete="off"></textarea></div></div></div>';
    remarksCount++;
    remarksTemplate = remarksTemplate.replace(/\$\$\$/g, remarksCount);
    let temp = document.createElement('div');
    temp.innerHTML = remarksTemplate;
    temp.classList.add('bg-gray');
    temp.classList.add('form-group');
    document.getElementById('remarks').appendChild(temp);
}

function postaddWordData() {
    // collect data
    let req = new LearnUnit();
    req.vocabulary = document.getElementById('vocabulary').value;
    req.descriptions = [];
    for (let i = 0; i < descriptionsCount.length; i++) {
        req.descriptions.push(new Description());
        req.descriptions[i].partOfSpeech = document.getElementById('partOfSpeech' + i).value;
        req.descriptions[i].meaning = document.getElementById('meaning' + i).value;
        req.descriptions[i].sentences = [];
        for (let j = 0; j < descriptionsCount[i] + 1; j++) {
            req.descriptions[i].sentences.push(new Sentence());
            req.descriptions[i].sentences[j].text = document.getElementById('englishSentences' + i + '-' + j).value;
            req.descriptions[i].sentences[j].meaning = document.getElementById('chineseSentences' + i + '-' + j).value;
        }

        for (let i = 1; i <= 3; i++) {
            if (document.getElementById('frequency' + i).checked) {
                req.frequency = document.getElementById('frequency' + i).value;
            }
        }
    }
    req.relates = [];
    for (let i = 0; i < relatesCount + 1; i++) {
        req.relates[i] = new Relate();
        req.relates[i].type = document.getElementById('selectRelates' + i).value;
        req.relates[i].text = document.getElementById('relates' + i).value;
    }
    req.remarks = [];
    for (let i = 0; i < remarksCount + 1; i++) {
        req.remarks[i] = new Remark();
        req.remarks[i].title = document.getElementById('remarksTitle' + i).value;
        req.remarks[i].text = document.getElementById('remarksText' + i).value;
    }
    console.log(req);
    // post to server
    let xhr = new XMLHttpRequest();
    xhr.open('POST', './addWord');
    xhr.setRequestHeader('Content-type', 'application/json');
    let data = JSON.stringify(req);
    // xhr.send(data);
    xhr.send(data);
    xhr.onload = function () {
        console.log(xhr.responseText);
        let alert = document.getElementById('alert');

        let text = xhr.responseText;

        alert.innerHTML = '<div class="alert alert-success" role="alert">' + text +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button></div>';
    }

}