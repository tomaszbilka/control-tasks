//secret password: injects3crets
const hiddenMessage = document.querySelector('.popup');
const secretParent = document.querySelector('.secret');
const passwordArr = [];
let countToFive = 0;
let counting;

const checkForKonami = (e) => {
  stopCountingToFive();
  startCountingToFive();

  if (e.key === 'Escape' || e.keyCode === 27) {
    clearPasswordArr();
    stopCountingToFive();
  } else {
    passwordArr.push(e.key);
    if (passwordArr.join('') === 'injects3crets') {
      stopCountingToFive();
      clearPasswordArr();
      fetchSecret();
    }
  }
};

const startCountingToFive = () => {
  counting = setInterval(() => {
    countToFive++;
    if (countToFive === 5) {
      clearPasswordArr();
      stopCountingToFive();
      clearCounter();
    }
  }, 1000);
};

const stopCountingToFive = () => {
  clearInterval(counting);
  clearCounter();
};

const clearPasswordArr = () => {
  passwordArr.length = 0;
};

const clearCounter = () => {
  countToFive = 0;
};

const fetchSecret = async () => {
  fetch('https://api.github.com/repos/elixir-lang/elixir/issues')
    .then((res) => res.json())
    .then((res) => showSecret(res))
    .catch((err) => console.log(err));
};

const showSecret = (data) => {
  const newDataUsers = data.map((el) => el.user.login).slice(0, 5);
  const newDataTitles = data.map((el) => el.title).slice(0, 5);

  for (let i = 0; i < newDataUsers.length; i++) {
    makeSecretList(newDataUsers[i], newDataTitles[i]);
  }

  hiddenMessage.classList.remove('hide');
  setTimeout(hideSecret, 15000);
};

const hideSecret = () => {
  hiddenMessage.classList.add('hide');
  clearSecretMessage();
};

const makeSecretList = (user, title) => {
  const secretContent = document.createElement('div');
  secretContent.classList.add('secret-text');
  secretContent.innerText = `USER:   ${user}   TITLE:   ${title}`;
  secretParent.appendChild(secretContent);
};

const clearSecretMessage = () => {
  secretParent.innerHTML = '';
};

document.addEventListener('keyup', checkForKonami);
