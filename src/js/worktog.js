// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const formDom = document.querySelector('.worktog-form');
const iconSuccessForm = document.querySelector('.worktog-form-icon');
const backdropDom = document.querySelector('.backdrop');
const modalBtnCloseDom = document.querySelector('.worktog-modal-btn');
const pattern = /^\w+(\.\w+)?@[a-zA-Z_]+\.[a-zA-Z]{2,3}$/;
const dataSend = { email: '', comment: '' };
const BASE_URL_POST = 'https://portfolio-js.b.goit.study/api/requests';
const modalWrapperDom = document.querySelector('.worktog-modal-wrapper');

formDom.addEventListener('input', handleChange);

function handleChange(event) {
  if (event.target.name === 'email' && event.target.value) {
    if (pattern.test(`${event.target.value}`)) {
      iconSuccessForm.classList.add('valid');
    } else {
      iconSuccessForm.classList.remove('valid');
    }
    dataSend.email = event.target.value;
  }
  if (event.target.name === 'message' && event.target.value) {
    dataSend.comment = event.target.value;
  }
}

formDom.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  event.target.default = true;

  fetch(BASE_URL_POST, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataSend),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      modalWrapperDom.innerHTML = `
      <h3 class="worktog-modal-title">${data.title}</h3> 
      <p class="wortog-modal-text">${data.message}</p>`;
      backdropDom.classList.add('is-open');
      getModal();
    })
    .catch(error => {
      iziToast.error({
        title: 'Warning',
        message: `Data status is ${error.message} unsuccessful!`,
      });
      console.log(error);
    })
    .finally(() => {
      event.target.default = false;
    });

  iconSuccessForm.classList.remove('valid');
  formDom.reset();
}

function getModal() {
  backdropDom.classList.add('is-open');
  document.addEventListener('keydown', handleEsc);
  backdropDom.addEventListener('click', handleClick);
}

function handleEsc(event) {
  if (event.code == 'Escape') {
    backdropDom.classList.remove('is-open');
    document.removeEventListener('keydup', handleEsc);
    backdropDom.removeEventListener('click', handleClick);
  }
}

function handleClick(event) {
  const isClickIbackdrop = backdropDom === event.target;
  const icClickBtnClose =
    event.target.closest('.worktog-modal-btn') === modalBtnCloseDom;

  if (isClickIbackdrop || icClickBtnClose) {
    backdropDom.classList.remove('is-open');
    document.removeEventListener('keydup', handleEsc);
    backdropDom.removeEventListener('click', handleClick);
  }
}
