
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


