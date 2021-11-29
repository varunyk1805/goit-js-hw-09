import Notiflix from 'notiflix';

const createPromise = (position, delay) => {
  new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  })
    .then((value) => {
      Notiflix.Notify.success(value);
    })
    .catch((error) => {
      Notiflix.Notify.failure(error);
    });
};

const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');
const submitBtn = document.querySelector('button[type="submit"]');

let delay = 0;
let step = 0;
let amount = 0;

delayInput.addEventListener('blur', () => {
  delay = Number(delayInput.value);
})
stepInput.addEventListener('blur', () => {
  step = Number(stepInput.value);
})
amountInput.addEventListener('blur', () => {
  amount = Number(amountInput.value);
})

const submitForm = (event) => {
  event.preventDefault();
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay);
    delay += step;
  }

  delayInput.value = '';
  stepInput.value = '';
  amountInput.value = '';
}

submitBtn.addEventListener('click', submitForm);