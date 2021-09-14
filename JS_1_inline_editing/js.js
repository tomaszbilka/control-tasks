const container = document.querySelector('.container')
const liveTyping = document.querySelector('.liveTyping');

const changeToInput = () => {
    const inputArea = document.createElement('input');
    inputArea.setAttribute("type", "text");
    inputArea.setAttribute("placeholder", "type here!");
    inputArea.setAttribute("onchange", "handleInputChange(this.value)");
    container.appendChild(inputArea);
    container.removeChild(liveTyping);
}

function handleInputChange(text) {
    const newText = text;
    liveTyping.innerText = newText;
    const inputArea = document.querySelector('input');
    container.removeChild(inputArea);
    container.appendChild(liveTyping);
}



liveTyping.addEventListener("click", changeToInput);


