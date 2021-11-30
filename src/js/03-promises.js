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

const submitForm = event => {
  let delay = Number(delayInput.value);
  let step = Number(stepInput.value);
  let amount = Number(amountInput.value);

  event.preventDefault();

  if (amount === 0) return;
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay);
    delay += step;
  };
};

submitBtn.addEventListener('click', submitForm);