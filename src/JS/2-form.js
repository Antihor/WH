import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let formData = {};
const formRef = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';

formRef.addEventListener('input', onInput);
formRef.addEventListener('submit', onSubmit);

function onSubmit(ev) {
  ev.preventDefault();
  const { email, message } = ev.target;
  const e = email.value.trim();
  const m = message.value.trim();
  formData = {
    email: e,
    message: m,
  };

  if (e === '' || m === '') {
    return iziToast.error({
      title: '',
      message: 'Please fill in all fields',
      position: 'bottomLeft',
    });
  }
  console.log(formData);
  ev.target.reset();
  localStorage.removeItem(localStorageKey);
}

function onInput(ev) {
  formData[ev.target.name] = ev.target.value.trim();
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
}

if (localStorage.getItem(localStorageKey)) {
  formData = JSON.parse(localStorage.getItem(localStorageKey));

  for (let key in formData) {
    formRef.elements[key].value = formData[key];
  }
}
