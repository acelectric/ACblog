class LearnUnit {
    constructor() {
        // 單字
        this.vocabulary
        // 描述(詞性,中文意思,例句)
        this.descriptions
        // 出題頻率
        this.frequency
        // 答題次數
        this.answerTimes = 0
        // 正確次數
        this.correctTimes = 0
        // 相關詞(同義詞,衍伸詞,反義詞)
        this.relates
        // 備註
        this.remarks
    }
}
class Description {
    constructor() {
        // 詞性
        this.partOfSpeech
        // 中文意思
        this.meaning
        // 例句
        this.sentences
    }
}
class Sentence {
    constructor() {
        this.text
        this.meaning
    }
}
class Relate {
    constructor() {
        this.type
        this.text
    }
}
class Remark {
    constructor() {
        this.title
        this.text
    }
}