//save output to "word_list.txt" file
const fs = require('fs');

const file = process.argv.slice(2)[0];

const myText = fs.readFile('./pan_tadeusz.txt', 'utf8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        const textWithJustChars = data.replace(/[?.,\/#!$%\^&\*;:{}=\-_`~()\n\r<>\u2014\u00AB\u2026\u00BB]/g, "");
        const textToArray = textWithJustChars.split(' ').filter(el => el != '');
        const textWithNoRepetitions = textToArray.filter((el, index) => textToArray.indexOf(el) === index);
        const textToSaveWithNewLines = textWithNoRepetitions.join('\n');
        fs.appendFileSync('word_list.txt', textToSaveWithNewLines);
        console.log('success!');
    }
});



