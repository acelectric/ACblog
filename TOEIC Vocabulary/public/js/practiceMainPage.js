/**
 * require list
 * -------------------
 * util.js
 * 
 * -------------------
 */


function createCardHeaderElement(word, cardBody) {
    let vocabulary = document.createElement('h4');
    vocabulary.classList.add('mr-auto');
    vocabulary.classList.add('my-auto');
    vocabulary.innerHTML = normalizationVocabulary(word.vocabulary);
    vocabulary.onclick = function () {
        cardBody.classList.toggle('d-none');
    }

    let frequency = document.createElement('div');
    frequency.classList.add('my-auto');
    for (let i = 0; i < word.frequency; i++) {
        let frequencyStar = document.createElement('span');
        frequencyStar.dataset["feather"] = "star";
        frequency.appendChild(frequencyStar);
    }

    let cardHeaderRow = document.createElement('div');
    cardHeaderRow.classList.add('row');
    cardHeaderRow.classList.add('mx-0');
    cardHeaderRow.appendChild(vocabulary);
    cardHeaderRow.appendChild(frequency);

    let cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    cardHeader.appendChild(cardHeaderRow);
    return cardHeader;
}

function createSentenceElement(description, j) {
    let text = document.createElement('div');
    text.innerHTML = description.sentences[j].text;
    text.classList.add("mb-1");

    let meaning = document.createElement('div');
    meaning.innerHTML = description.sentences[j].meaning;

    let sentence = document.createElement('div');
    sentence.classList.add("bg-gray");
    sentence.classList.add("mb-2");
    sentence.appendChild(text);
    sentence.appendChild(meaning);
    return sentence;
}

function createDescriptionElement(word, i) {
    let description = document.createElement('div');
    let descriptionRow = document.createElement('div');
    description.appendChild(descriptionRow);
    descriptionRow.classList.add('row');
    descriptionRow.classList.add('mb-4');


    let vocabulary = document.createElement('h5');
    vocabulary.innerHTML = normalizationVocabulary(word.vocabulary);
    vocabulary.classList.add('my-auto');
    vocabulary.classList.add('col');
    descriptionRow.appendChild(vocabulary);
    let partOfSpeech = document.createElement('div');
    partOfSpeech.innerHTML = word.descriptions[i].partOfSpeech;
    partOfSpeech.classList.add('badge');
    partOfSpeech.classList.add('badge-primary');
    partOfSpeech.classList.add('my-auto');
    descriptionRow.appendChild(partOfSpeech);

    let meaning = document.createElement('div');
    meaning.classList.add('col');
    meaning.innerHTML = word.descriptions[i].meaning;
    descriptionRow.appendChild(meaning);

    let sentences = document.createElement('div');
    sentences.classList.add('mb-3');
    for (let j = 0; j < word.descriptions[i].sentences.length; j++) {
        let sentence = createSentenceElement(word.descriptions[i], j);
        sentences.appendChild(sentence);
    }
    description.append(sentences);
    return description;
}
function createRelateElement(relateData) {
    let type = document.createElement('div');
    type.innerHTML = relateData.type;
    type.classList.add('badge');
    type.classList.add('badge-primary');
    type.classList.add("col-1");

    let text = document.createElement('div');
    text.innerHTML = relateData.text;
    text.classList.add("col");

    let relate = document.createElement('div');
    relate.classList.add("row");
    relate.classList.add("mx-0");
    relate.classList.add("mb-1");
    relate.appendChild(type);
    relate.appendChild(text);

    return relate;
}
function createRemarkElement(remarkData) {
    let title = document.createElement('div');
    title.innerHTML = remarkData.title;
    title.classList.add('badge');
    title.classList.add('badge-primary');
    title.classList.add("col-2");

    let text = document.createElement('div');
    text.innerHTML = remarkData.text;
    text.classList.add("border-bold");
    text.classList.add("mb-1");

    let remark = document.createElement('div');
    remark.appendChild(title);
    remark.appendChild(text);

    return remark;
}
function createCardBodyElement(word) {
    let descriptions = document.createElement('div');
    for (let i = 0; i < word.descriptions.length; i++) {
        let description = createDescriptionElement(word, i);
        descriptions.appendChild(description);
    }

    let relates = document.createElement('div');
    relates.classList.add("mb-2");
    for (let i = 0; i < word.relates.length; i++) {
        let relate = createRelateElement(word.relates[i]);
        relates.appendChild(relate);
    }

    let remarks = document.createElement('div');
    for (let i = 0; i < word.remarks.length; i++) {
        let remark = createRemarkElement(word.remarks[i]);
        remarks.appendChild(remark);
    }

    let timeline = document.createElement('footer');
    timeline.innerHTML = word.timeline;
    timeline.classList.add('blockquote-footer');
    timeline.classList.add('text-right');

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.classList.add('d-none');
    cardBody.appendChild(descriptions);
    cardBody.appendChild(relates);
    cardBody.appendChild(remarks);
    cardBody.appendChild(timeline);
    return cardBody;
}

function createCardElement(word) {
    let cardBody = createCardBodyElement(word);
    let cardHeader = createCardHeaderElement(word, cardBody);

    let card = document.createElement('div');
    card.classList.add('card');
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    return card;
}
function practiceMainPageDataProcess(res) {
    let datas = res.data;
    for (let i = 0; i < datas.length; i++) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', address + 'vocabularys/' + datas[i].e + '.json');
        xhr.send();
        xhr.onload = function () {
            let obj = JSON.parse(xhr.responseText);
            let card = createCardElement(obj);
            document.getElementById('practice').appendChild(card);
            feather.replace();
        }
    }

}