
let address = "./data/";


function normalizationVocabulary(vocabulary) {
    return vocabulary[0].toUpperCase() + vocabulary.substring(1).toLowerCase();
}

function strongKeyWord(target, keyword) {
    let pattern = new RegExp(keyword + "[a-zA-Z]*", "gi");
    let answer = target.replace(pattern, "<strong>$&</strong>");
    // console.log(target);
    // console.log(answer);
    return answer;
}

function speakSomething(something) {
    let synth = window.speechSynthesis;
    let u = new SpeechSynthesisUtterance();
    // u.lang = 'zh-TW';
    // u.text = "你要讀出的中文內容";
    u.text = something;

    let en_us = [];
    let voices = synth.getVoices();
    for (let i = 0; i < voices.length; i++) {
        if (voices[i].lang == "en-US") {
            en_us.push(voices[i]);
        }
    }

    let random = Math.round(Math.random() * en_us.length);
    u.voice = en_us[random];
    //console.log(voices);
    //console.log(u.voice, en_us.length);
    synth.speak(u);
}
