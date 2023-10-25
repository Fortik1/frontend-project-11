import i18next from 'i18next';
import checkValidUrl from './script/checkValidUrl.js';
import newState from './script/view.js';
import ru from './locales/ru.js';
import parser from './script/parser.js';
import render, { createFeedHTML } from './script/render.js';

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
      ru,
    },
  });

  const modalButton = (el) => {
    const postId = el.dataset.id;
    const post = state.posts.find(({ id }) => postId === id);
    const { title, description } = post;
    document.querySelector('.modal-header').textContent = title;
    document.querySelector('.modal-body').textContent = description;
  };

  const getUniqueArr = (newArr, stateS = state) => {
    const nameSet = new Set(stateS.posts.map((el) => el.title));
    const uniqArr = newArr.filter((el) => !nameSet.has(el.title));
    return uniqArr;
  };

  //  https://lorem-rss.herokuapp.com/feed?length=3&unit=second&interval=5
  const update = (stateS) => {
    stateS.useUrl.forEach((url) => {
      parser(url)
        .then((res) => {
          console.log(res, '2');
          const newPost = getUniqueArr(res.posts, stateS);
          newState(state).posts = [...newPost, ...stateS.posts];
        })
        .catch((err) => console.log(err))
        .finally(() => setTimeout(() => update(stateS), 5000));
    });
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const url = formData.get('url').trim();
    const input = document.querySelector('#url-input');
    const button = document.querySelector('button[type="submit"]');
    button.disabled = true;
    checkValidUrl(url, state.useUrl)
      .then((result) => {
        parser(result)
          .then((res) => {
            if (res === 'noRSS') {
              newState(state).status = 'noRSS';
              button.disabled = false;
              return;
            }
            state.feeds.push(res.feedName);
            const newPost = getUniqueArr(res.posts);

            newPost.forEach((element) => {
              state.posts.push(element);
            });
            newState(state).state = 'OK';
            render(newPost);
            createFeedHTML(res);
            document.querySelectorAll('[data-bs-toggle]')
              .forEach((el) => {
                el.addEventListener('click', () => modalButton(el));
              });

            state.useUrl.push(result);
            input.value = '';
            input.focus();
            button.disabled = false;
          })
          .catch((err) => {
            newState(state).status = err;
            button.disabled = false;
          })
          .finally(() => update(state));
      })
      .catch((err) => {
        newState(state).status = err;
        button.disabled = false;
      });
  });
  update(newState(state));
};

// const nameSet = new Set(arr1.map(el => el.name));
// const newArr = arr2.filter(el => !nameSet.has(el.name));

// const newArr = arr2.reduce((acc, el) => {
//   const a = arr1.map((elArr1) => el.name === elArr1.name)
//   if (!a.includes(true)) acc.push(el);
//   return acc;
// }, []);
