const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;

const getRandomHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const backgroundColorBody = () => {
    body.style.backgroundColor = getRandomHexColor();
};

stopBtn.setAttribute('disabled', 'true');

body.style.height = '90vmin';

const styleBtn = btn => {
    btn.style.display = 'block';
    btn.style.marginLeft = 'auto';
    btn.style.marginRight = 'auto';
    btn.style.width = '30vmin';
    btn.style.height = '15vmin';
    btn.style.fontSize = '4vmin';
    btn.style.textTransform = 'uppercase';

    if (btn === startBtn) {
        btn.style.marginTop = '15vmin';
        btn.style.borderTopLeftRadius = '15vmin';
        btn.style.borderTopRightRadius = '15vmin';
    }

    if (btn === stopBtn) {
        btn.style.borderBottomLeftRadius = '15vmin';
        btn.style.borderBottomRightRadius = '15vmin';
    }
}
styleBtn(startBtn);
styleBtn(stopBtn);

startBtn.addEventListener('click', () => {
    timerId = setInterval(backgroundColorBody, 1000);
    startBtn.setAttribute('disabled', 'true');
    stopBtn.removeAttribute('disabled');

});

stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    stopBtn.setAttribute('disabled', 'true');
    startBtn.removeAttribute('disabled');
});