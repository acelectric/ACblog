let fs = require('fs');

let categorys = ['KEE', 'TPQ', 'TPE', 'TAO', 'HSQ', 'HSZ', 'MIA', 'TXG', 'CHA', 'YUN', 'CYQ', 'CYI', 'TNN', 'KHH', 'PIF', 'NAN', 'ILA', 'HUA', 'TTT', 'JME', 'PEN', 'LJF', 'all', 'national', 'municipality', 'county'];

function createHtmlForCategory(template, categorysIndex) {
    while (template.match(/\$\$\$/)) {
        template = template.replace('$$$', 'national');
    }
    fs.writeFile('../result/' + categorys[categorysIndex] + '.html', template, 'utf-8', function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log(categorys[categorysIndex] + '.html complete');
        }
    });
}
fs.readFile('template.html', 'utf-8', function (error, data) {
    if (error) console.log(error);
    for (let i = 0; i < categorys.length; i++) {
        createHtmlForCategory(data, i);
    }
});