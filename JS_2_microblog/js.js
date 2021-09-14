const listsBoard = document.querySelector('.list');
const inputText = document.querySelector('.header__input');
const addBtn = document.querySelector('.header__button');
const noTaskTyped = document.querySelector('.header__info');
const taskTyped = document.querySelector('.header__info__add');
const header = document.querySelector('.header');
const editPanel = document.querySelector('.edit-panel');
const editPanelInput = document.querySelector('.edit-panel__input');
const closePanelInput = document.querySelector('.edit-panel__button--cancel');
const addPanelInput = document.querySelector('.edit-panel__button--add');
const deleteIcon = document.querySelector('.delete-all__icon');
const amountOfPosts = document.querySelector('.numberOfPosts');
let parToChange = '';
let startedPosts = [];

let id = 1;

function addTask() {
    //check if text putted
    if (inputText.value == '') {
        noTaskTyped.classList.remove('hide');
        return
    } else {
        noTaskTyped.classList.add('hide');
        //show add info for 1s
        taskTyped.classList.remove('hide');
        setTimeout(() => {
            taskTyped.classList.add('hide')
        }, 1000);
    }
    //delete info about empty list
    removeEmptyInfo();

    //add task to list
    const content = inputText.value;
    const task = document.createElement('div');
    task.classList.add('list__task');
    task.id = `${id}`
    task.innerHTML =
        `
            <div class='list__task__tools'>
            <div class='score__wrapp'>
                <button class='score-up'><i class='far fa-thumbs-up'></i></button>
                <div class='score'>0</div>
                <button class='score-down'><i class='far fa-thumbs-down'></i></button>
            </div>
            <button class='edit'>EDIT</button>
            <button class='delete'><i class='fas fa-times'></i></button>
            </div>
            <p>${content}</p>
        `
    listsBoard.appendChild(task);
    inputText.value = '';
    id++;
    updateNumberOfPosts();
}

function emptyList() {
    if (listsBoard.innerHTML == '') {
        const emptyInfo = document.createElement('div');
        emptyInfo.classList.add('header__empty-list');
        emptyInfo.innerHTML = 'no post added yet...'
        header.appendChild(emptyInfo);
    }
};

checkClick = e => {
    if (e.target.closest('button')) {
        if (e.target.closest('button').classList.contains('score-up')) {
            upScore(e);
        } else if (e.target.closest('button').classList.contains('score-down')) {
            downScore(e);
        } else if (e.target.closest('button').classList.contains('edit')) {
            editTask(e);
        } else if (e.target.closest('button').classList.contains('delete')) {
            deleteTask(e);
        }
    }
}

const upScore = e => {
    const scoreToChange = e.target.closest('.score-up').nextElementSibling;
    const currentScore = parseInt(scoreToChange.innerText);
    const newScore = currentScore + 5;
    scoreToChange.innerText = newScore;
}

const downScore = e => {
    const scoreToDown = e.target.parentNode.parentNode.children[1];
    const currentScore = parseInt(scoreToDown.innerText);
    const newScore = currentScore - 5;
    scoreToDown.innerText = newScore;
}


const deleteTask = e => {
    const itemToDelete = e.target.closest('.list__task');
    listsBoard.removeChild(itemToDelete);
    if (listsBoard.innerHTML === '') {
        addEmptyInfo();
    }
    updateNumberOfPosts();
}

const editTask = e => {
    parToChange = e.target.parentNode.closest('div').nextElementSibling;
    let editedText = parToChange.innerHTML;
    editPanel.classList.remove('hide');
    editPanelInput.value = editedText;
    addPanelInput.addEventListener('click', addEditPanelValue);
    editPanelInput.addEventListener('keyup', enterKeyAdd);
}

const enterKey = e => {
    if (e.keyCode === 13) {
        addTask();
    }
}

const enterKeyAdd = e => {
    if (e.keyCode === 13) {
        addEditPanelValue();
    }
}


function removeEmptyInfo() {
    const infoToRemove = header.lastChild;
    infoToRemove.style.visibility = 'hidden';
    showBin();

}

function addEmptyInfo() {
    const infoToRemove = header.lastChild;
    infoToRemove.style.visibility = 'visible';
    hideBin();
}

const closeEditPanel = () => {
    editPanel.classList.add('hide');
    editPanelInput.value = '';
}

const addEditPanelValue = (element) => {
    let editedValue = editPanelInput.value;
    parToChange.innerHTML = editedValue;
    addPanelInput.removeEventListener('click', addEditPanelValue);
    closeEditPanel();
    editPanelInput.removeEventListener('keyup', enterKeyAdd);
}

function showBin() {
    deleteIcon.style.color = 'rgb(192, 50, 50)';
    deleteIcon.style.cursor = 'pointer';
    deleteIcon.addEventListener('click', deleteAllTask);
}

function hideBin() {
    deleteIcon.style.color = 'rgb(74, 118, 240)';
    deleteIcon.style.cursor = 'auto';
    deleteIcon.removeEventListener('click', deleteAllTask);
}

function deleteAllTask() {
    listsBoard.innerHTML = '';
    id = 1;
    addEmptyInfo();
    updateNumberOfPosts();
}

function updateNumberOfPosts() {
    const howManyPosts = listsBoard.childElementCount;
    amountOfPosts.innerText = howManyPosts;
}

emptyList();


//import starting posts from file
fetch("./posts.json")
    .then((resolve, reject) => {
        return resolve.json();
    })
    .then(function (data) {
        const arr = Object.values(data);
        for (let key in arr) {
            makeStartedPost(`${arr[key]}`)
        }

    });
//show starting posts
const makeStartedPost = text => {
    removeEmptyInfo();
    const content = text;
    const task = document.createElement('div');
    task.classList.add('list__task');
    task.id = `${id}`
    task.innerHTML =
        `
            <div class='list__task__tools'>
            <div class='score__wrapp'>
                <button class='score-up'><i class='far fa-thumbs-up'></i></button>
                <div class='score'>0</div>
                <button class='score-down'><i class='far fa-thumbs-down'></i></button>
            </div>
            <button class='edit'>EDIT</button>
            <button class='delete'><i class='fas fa-times'></i></button>
            </div>
            <p>${content}</p>
        `
    listsBoard.appendChild(task);
    inputText.value = '';
    id++;
    updateNumberOfPosts();
}


//eventListeners:
addBtn.addEventListener('click', addTask);
listsBoard.addEventListener('click', checkClick);
inputText.addEventListener('keyup', enterKey);
closePanelInput.addEventListener('click', closeEditPanel);