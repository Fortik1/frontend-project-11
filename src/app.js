import i18next from 'i18next';
import checkValidUrl from './script/checkValidUrl.js';
import newState, { watchingFeeds, watchingPost } from './script/view.js';
import ru from './locales/ru.js';
import parser from './script/parser.js';
import update from './script/update.js';

export default () => {
  const form = document.querySelector('form');

  const state = {
    useUrl: [],
    validUrl: '',
    status: '',
    feeds: [],
    posts: [],
    startUpdate: false,
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

  //  https://lorem-rss.herokuapp.com/feed?length=3&unit=second&interval=5

  // const update = () => {
  //   state.useUrl.forEach((url) => {
  //     parser(url)
  //       .then((res) => {
  //         const newPost = getUniqueArr(res.posts, state);
  //         console.log('1')
  //         newState(state).posts = [...newPost, ...state.posts];
  //       })
  //       .catch((err) => console.log(err));
  //   });
  // };

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

            state.useUrl.push(result);
            watchingPost(state).posts.push(...res.posts);
            watchingFeeds(state).feeds.push(res);
            document.querySelectorAll('[data-bs-toggle]')
              .forEach((el) => {
                el.addEventListener('click', () => modalButton(el));
              });

            if (!state.startUpdate) {
              state.startUpdate = true;
              update(state);
            }
            input.value = '';
            input.focus();
            button.disabled = false;
            newState(state).state = 'OK';
          })
          .catch((err) => {
            newState(state).status = err.message;
            button.disabled = false;
          });
      })
      .catch((err) => {
        newState(state).status = err;
        button.disabled = false;
      });
  });
};

// const nameSet = new Set(arr1.map(el => el.name));
// const newArr = arr2.filter(el => !nameSet.has(el.name));

// const newArr = arr2.reduce((acc, el) => {
//   const a = arr1.map((elArr1) => el.name === elArr1.name)
//   if (!a.includes(true)) acc.push(el);
//   return acc;
// }, []);
