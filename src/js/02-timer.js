import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Ukrainian } from "flatpickr/dist/l10n/uk.js"
import Notiflix from 'notiflix';

flatpickr.localize(Ukrainian);
require("flatpickr/dist/themes/dark.css");

Notiflix.Notify.init({
  width: '320px',
  position: 'center-top',
  distance: '10px',
  opacity: 1,
  fontSize: '16px'
});

const body = document.querySelector('body');
const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds');
const timerEl = document.querySelector('.timer');
const fieldEl = document.querySelectorAll('.field');
const valueEl = document.querySelectorAll('.value');
const labelEl = document.querySelectorAll('.label');

body.style.paddingLeft = '2vmin';

inputEl.style.fontSize = '3vmin';

startBtn.style.fontSize = '3vmin';
startBtn.style.textTransform = 'uppercase';

timerEl.style.display = 'flex';
timerEl.style.marginTop = '3vmin';

fieldEl.forEach(field => {
    field.style.display = 'flex';
    field.style.flexDirection = 'column';
    field.style.alignItems = 'center';
    field.style.marginLeft = '2vmin';
})

fieldEl[0].style.marginLeft = '0';

valueEl.forEach(value => {
    value.style.fontSize = '8vmin';
    value.style.lineHeight = '1.1';
});

labelEl.forEach(label => {
    label.style.fontSize = '3vmin';
    label.style.lineHeight = '1.1';
    label.style.textTransform = 'uppercase';

})

let currentDate = new Date();
let selectedDate = new Date();

startBtn.setAttribute('disabled', 'true');

let time = 0;

const convertMs = ms => {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
    return { days, hours, minutes, seconds };
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0];
        if (selectedDate.getTime() < currentDate.getTime()) {
            startBtn.setAttribute('disabled', 'true');
            // window.alert("Please choose a date in the future")
            Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            startBtn.removeAttribute('disabled');
            time = selectedDate.getTime() - currentDate.getTime();
            return time;
        }
    },
};

flatpickr('#datetime-picker', options);

const addLeadingZero = value => String(value).padStart(2, '0');

const timer = () => {
    const endTime = convertMs(time);

    daysEl.textContent = addLeadingZero(endTime.days);
    hoursEl.textContent = addLeadingZero(endTime.hours);
    minutesEl.textContent = addLeadingZero(endTime.minutes);
    secondsEl.textContent = addLeadingZero(endTime.seconds);
}

let timerId = null;

const interval = () => {
    timerId = setInterval(() => {
        if (time >= 1000) {
            currentDate = new Date();
            time = selectedDate.getTime() - currentDate.getTime();
            timer();
            return time;
        } else {
            clearInterval(timerId);
            startBtn.removeEventListener('click', interval);
        }
    }, 1000);
};

startBtn.addEventListener('click', interval);