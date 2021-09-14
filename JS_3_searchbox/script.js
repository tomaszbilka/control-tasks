const search = document.querySelector('.search');
const li = document.querySelectorAll('li');
const clearBtn = document.querySelector('.clear');
const ulParent = document.querySelector('ul');
let colorsArr = [];

const searchEngine = e => {
    colorsArr = [];
    const text = e.target.value.toLowerCase();

    li.forEach(el => {
        if (el.textContent.toLowerCase().indexOf(text) !== -1) {

            el.style.display = "block";
            const letters = new RegExp(text, 'gi');
            const insideText = el.textContent.replace(letters, `<span>${text}</span>`);
            el.innerHTML = insideText;
            el.addEventListener('click', changeColor);

        } else {
            el.style.display = "none";
            el.removeEventListener('click', changeColor);
            el.style.color = '#000';
        }
        if (el.style.display === 'block') colorsArr.push(el);
    });

    colorsArr.length === 1 ? document.title = colorsArr[0].innerText : null;
};

const clearInput = () => {
    const makredLetters = document.querySelectorAll('span');
    search.value = '';
    li.forEach(el => el.style.display = "block");
    makredLetters.forEach(el => el.style.backgroundColor = "#fff");
    li.forEach(el => {
        el.style.color = '#000';
        el.removeEventListener('click', changeColor);
    });
    document.title = 'searchbox';
}

const changeColor = e => {
    e.target.style.color = 'green';
}



search.addEventListener('keyup', searchEngine);
clearBtn.addEventListener('click', clearInput);
