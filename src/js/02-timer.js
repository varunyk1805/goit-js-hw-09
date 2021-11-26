import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Ukrainian } from "flatpickr/dist/l10n/uk.js"

flatpickr.localize(Ukrainian);
require("flatpickr/dist/themes/dark.css");

const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds');
// const values = document.querySelectorAll('.value');

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
            window.alert("Please choose a date in the future")
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

    days.textContent = addLeadingZero(endTime.days);
    hours.textContent = addLeadingZero(endTime.hours);
    minutes.textContent = addLeadingZero(endTime.minutes);
    seconds.textContent = addLeadingZero(endTime.seconds);
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