import onChange from 'on-change';

export const newState = (state) => onChange(state, (path, value) => {
  const textDanger = document.querySelector('.text-danger');
  const input = document.querySelector('#url-input');
  textDanger.innerHTML = '';
  input.classList.remove('is-invalid');

    switch(value) {
      case 'repeat': {
        textDanger.innerHTML = 'RSS уже существует';
        input.classList.add('is-invalid');
        break;
      }
      case 'Error URL': {
        textDanger.innerHTML = 'Ссылка должна быть валидным URL';
        input.classList.add('is-invalid');
        break;
      }
    }
});
