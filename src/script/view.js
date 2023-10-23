import onChange from 'on-change';
import i18next from 'i18next';

export const newState = (state) => onChange(state, (_path, value) => {
  const textDanger = document.querySelector('.text-danger');
  const input = document.querySelector('#url-input');
  textDanger.innerHTML = '';
  input.classList.remove('is-invalid');
  console.log(value);

    switch(value) {
      case 'repeat': {
        textDanger.innerHTML = i18next.t(value);
        input.classList.add('is-invalid');
        break;
      }
      case 'ErrorValidURL': {
        textDanger.innerHTML = i18next.t(value);
        input.classList.add('is-invalid');
        break;
      }
      case 'noRSS': {
        textDanger.innerHTML = i18next.t(value);
        input.classList.add('is-invalid');
        break;
      }
      case 'NetworkError': {
        textDanger.innerHTML = i18next.t(value);
        input.classList.add('is-invalid');
        break;
      }
    }
});
