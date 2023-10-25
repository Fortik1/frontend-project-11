import checkValidUrl from "./script/checkValidUrl.js";
import { newState } from "./script/view.js";
import i18next from 'i18next';
import ru from './locales/ru.js';
import parser from "./script/parser.js";
import render, { createFeedHTML } from "./script/render.js";

export default () => {
    const form = document.querySelector('form');

    const state = {
        useUrl: [],
        validUrl: '',
        status: '',
        feeds: [],
        posts: [],
    };

    i18next.init({
      lng: 'ru',
      debag: true, 
      resources: {
        ru
      }
    })

    const getUniqueArr = (arrCheck, newArr) => {
      const nameSet = new Set(arrCheck.map(el => el.title));
      const uniqArr = newArr.filter(el => !nameSet.has(el.title));
      return uniqArr;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const url = formData.get('url').trim();
        const input = document.querySelector('#url-input');
        const button = document.querySelector('button[type="submit"]');
        button.disabled = true;
        checkValidUrl(url, state.useUrl)
          .then((result) => {
            parser(url)
              .then((res) => {
                if (res === 'noRSS') {
                  newState(state).status = 'noRSS';
                  button.disabled = false;
                  return;
                }
                state.feeds.push(res.feedName);
                const newPost = getUniqueArr(state.posts, res.posts);

                newPost.forEach(element => {
                  state.posts.push(element);
                });
                newState(state).state = 'OK';
                render(newPost);
                createFeedHTML(res);

                state.useUrl.push(result);
                input.value = '';
                input.focus();
                button.disabled = false;
              })
              .catch((err) => {
                newState(state).status = err;
                button.disabled = false;
              });
          })
          .catch((err) => {
            newState(state).status = err;
            button.disabled = false;
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
