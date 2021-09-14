const fs = require('fs');
let arrayOfWordsAndHashes = [];

const file = process.argv.slice(2)[0];
const myHash = process.argv.slice(2)[1];

const myText = fs.readFile(`./${file}`, 'utf8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        const wordsToArray = data.split('\n');

        for (let i = 0; i < wordsToArray.length; i++) {
            arrayOfWordsAndHashes = wordsToArray.map(el => el.split('\t'));
        }

        const passwordArray = arrayOfWordsAndHashes.filter(el => el[1] === myHash);
        const password = passwordArray[0][0];
        fs.appendFileSync('result.txt', password);
        console.log('success!');
    }
});

