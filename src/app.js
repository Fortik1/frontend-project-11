import checkValidUrl from "./script/checkValidUrl.js";
import { newState } from "./script/view.js";

export default () => {
    const form = document.querySelector('form');

    const state = {
        useUrl: [],
        nowUrlLink: '',
        validUrl: '',
        error: '',
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const url = formData.get('url').trim();
        const input = document.querySelector('#url-input');

        checkValidUrl(url)
          .then((result) => {
            if (!state.useUrl.includes(result)) {
              state.useUrl.push(result);
              newState(state).nowUrlLink = result;
              input.value = '';
              input.focus();
            } else {
              newState(state).error = 'repeat';
            }
          })
          .catch((_err) => {
            newState(state).error = 'Error URL';
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
