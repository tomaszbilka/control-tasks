const fs = require('fs');
const md5 = require('js-md5');

const file = process.argv.slice(2)[0];

const myText = fs.readFile(`./${file}`, 'utf8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        const wordsToArray = data.split('\n');
        const wordsWithHashes = wordsToArray.map(el => {
            const hash = md5(el);
            return el + '\t' + hash
        });
        const wordsToText = wordsWithHashes.join('\n');
        fs.appendFileSync('rainbow_word_list.txt', wordsToText);
        console.log('success!');
    }
});
