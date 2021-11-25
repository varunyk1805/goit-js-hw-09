const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;

const getRandomHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const backgroundColorBody = () => {
    body.style.backgroundColor = getRandomHexColor();
};

startBtn.addEventListener('click', () => {
    timerId = setInterval(backgroundColorBody, 1000);
    startBtn.setAttribute('disabled', 'true');
});

stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    startBtn.removeAttribute('disabled');
});
