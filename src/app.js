import checkValidUrl from "./script/checkValidUrl.js";
import { newState } from "./script/view.js";
import i18next from 'i18next';
import ru from './locales/ru.js';
import parser from "./script/parser.js";

export default () => {
    const form = document.querySelector('form');

    const state = {
        useUrl: [],
        validUrl: '',
        status: '',
        feeds: {}
    };

    i18next.init({
      lng: 'ru',
      debag: true, 
      resources: {
        ru
      }
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const url = formData.get('url').trim();
        const input = document.querySelector('#url-input');

        checkValidUrl(url, state.useUrl)
          .then((result) => {
            parser(url)
              .then((res) => {
                const button = document.querySelector('button[type="submit"]')
                button.disabled = true;
                if (res === 'noRSS') {
                  newState(state).status = 'noRSS';
                  button.disabled = false;
                  return;
                }
                state.useUrl.push(result);
                input.value = '';
                input.focus();
                button.disabled = false;
              })
              .catch((err) => newState(state).status = 'NetworkError');
          })
          .catch((err) => {
            newState(state).status = err;
          });
    });
}




// const nameSet = new Set(arr1.map(el => el.name));
// const newArr = arr2.filter(el => !nameSet.has(el.name));

// const newArr = arr2.reduce((acc, el) => {
//   const a = arr1.map((elArr1) => el.name === elArr1.name)
//   if (!a.includes(true)) acc.push(el);
//   return acc;
// }, []);
