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

function normalizationVocabulary(vocabulary) {
    return vocabulary[0].toUpperCase() + vocabulary.substring(1).toLowerCase();
}

function createCardForOneVocabulary(word) {
    let card = document.createElement('div');

    let cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    card.appendChild(cardHeader);

    let cardHeaderRow = document.createElement('div');
    cardHeaderRow.classList.add('row');
    cardHeaderRow.classList.add('mx-0');
    cardHeader.appendChild(cardHeaderRow);

    let vocabulary = document.createElement('h4');
    vocabulary.classList.add('mr-auto');
    vocabulary.classList.add('my-auto');
    vocabulary.innerHTML = normalizationVocabulary(word.vocabulary);
    cardHeaderRow.appendChild(vocabulary);

    let frequency = document.createElement('div');
    frequency.classList.add('my-auto');
    console.log(word.vocabulary + ":" + word.frequency);
    for (let i = 0; i < word.frequency; i++) {
        let frequencyStar = document.createElement('span');
        frequencyStar.dataset["feather"] = "star";
        frequency.appendChild(frequencyStar);
    }
    cardHeaderRow.appendChild(frequency);
    feather.replace();

    let cardBody = document.createElement('div');
    vocabulary.onclick = function () {
        cardBody.classList.toggle("d-none");
    }
    cardBody.classList.add('card-body');
    cardBody.classList.add('d-none');

    for (let i = 0; i < word.descriptions.length; i++) {
        let cardBodyRow = document.createElement('div');
        cardBody.appendChild(cardBodyRow);
        cardBodyRow.classList.add('row');
        //cardBodyRow.classList.add('mx-0');
        cardBodyRow.classList.add('mb-4');

        //cardBodyRow.style.backgroundColor = "#888";

        let vocabulary = document.createElement('h5');
        vocabulary.innerHTML = normalizationVocabulary(word.vocabulary);
        vocabulary.classList.add('my-auto');
        vocabulary.classList.add('col');
        cardBodyRow.appendChild(vocabulary);
        let partOfSpeech = document.createElement('div');
        partOfSpeech.innerHTML = word.descriptions[i].partOfSpeech;
        partOfSpeech.classList.add('badge');
        partOfSpeech.classList.add('badge-primary');
        partOfSpeech.classList.add('my-auto');
        //partOfSpeech.classList.add('');
        cardBodyRow.appendChild(partOfSpeech);

        let meaning = document.createElement('div');
        meaning.classList.add('col');
        meaning.innerHTML = word.descriptions[i].meaning;
        cardBodyRow.appendChild(meaning);

        let sentences = document.createElement('div');
        sentences.classList.add('mb-3');
        //sentences.style.border = "1px solid black";
        for (let j = 0; j < word.descriptions[i].sentences.length; j++) {
            let sentence = document.createElement('div');
            sentence.classList.add("bg-gray");
            sentence.classList.add("mb-2");
            sentences.appendChild(sentence);
            let text = document.createElement('div');
            text.innerHTML = word.descriptions[i].sentences[j].text;
            text.classList.add("mb-1");
            sentence.appendChild(text);
            let meaning = document.createElement('div');
            meaning.innerHTML = word.descriptions[i].sentences[j].meaning;
            sentence.appendChild(meaning);
        }
        cardBody.append(sentences);
    }

    let relates = document.createElement('div');
    relates.classList.add("mb-2");
    cardBody.appendChild(relates);
    for (let i = 0; i < word.relates.length; i++) {
        let relate = document.createElement('div');
        relate.classList.add("row");
        relate.classList.add("mx-0");
        relate.classList.add("mb-1");
        relates.appendChild(relate);

        let type = document.createElement('div');
        type.innerHTML = word.relates[i].type;
        type.classList.add('badge');
        type.classList.add('badge-primary');
        type.classList.add("col-1");
        relate.appendChild(type);
        let text = document.createElement('div');
        text.innerHTML = word.relates[i].text;
        text.classList.add("col");
        relate.appendChild(text);
    }

    for (let i = 0; i < word.remarks.length; i++) {
        let title = document.createElement('div');
        title.innerHTML = word.remarks[i].title;
        title.classList.add('badge');
        title.classList.add('badge-primary');
        title.classList.add("col-2");
        //title.classList.add("mb-1");
        cardBody.appendChild(title);
        let text = document.createElement('div');
        text.innerHTML = word.remarks[i].text;
        text.classList.add("border-bold");
        text.classList.add("mb-1");
        cardBody.appendChild(text);
    }
    let timeline = document.createElement('footer');
    timeline.innerHTML = word.timeline;
    timeline.classList.add('blockquote-footer');
    timeline.classList.add('text-right');
    cardBody.appendChild(timeline);

    card.classList.add('card');
    card.appendChild(cardBody);
    //console.log(card.innerHTML);
    return card;
}
function practiceMainPageDataProcess(res) {
    let datas = res.data;
    for (let i = 0; i < datas.length; i++) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', './data/vocabularys/' + datas[i].e + '.json');
        xhr.send();
        xhr.onload = function () {
            let obj = JSON.parse(xhr.responseText);
            let card = createCardForOneVocabulary(obj);
            document.getElementById('practice').appendChild(card);
        }
    }

}
function init() {
    feather.replace();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', './data/overview.json');
    xhr.send();
    xhr.onload = function () {
        let obj = JSON.parse(xhr.responseText)
        overviewMainPageDataProcess(obj);
        practiceMainPageDataProcess(obj);
    }
}
init();