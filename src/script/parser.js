import axios from 'axios';
import { uniqueId } from 'lodash';

const parser = (url) => axios
  .get(
    `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(
      url,
    )}`,
  )
  .then((response) => {
    const DOMparser = new DOMParser();
    return Promise.resolve(
      DOMparser.parseFromString(response.data.contents, 'text/xml'),
    );
  })
  .catch((err) => {
    if (err.message === 'Network Error') {
      return Promise.reject('NetworkError');
    }
    return Promise.reject(err);
  });

const getPosts = (newDocument) => {
  const items = newDocument.querySelectorAll('item');
  const posts = [];
  items.forEach((item) => {
    const title = item.querySelector('title').textContent;

    const description = item.querySelector('description').textContent;

    const url = item.querySelector('link').textContent;

    posts.push({
      title,
      description,
      url,
      id: uniqueId(),
    });
  });

  return posts;
};

export default (url) => parser(url)
  .then((result) => {
    if (result.querySelector('parsererror')) {
      return Promise.resolve('noRSS');
    }
    const posts = getPosts(result);
    const description = result.querySelector('description').textContent;
    const feedName = result.querySelector('title').textContent;
    return Promise.resolve({ feedName, description, posts });
  })
  .catch((err) => {
    console.log(err);
  });
// export default (url) => axiosGet(url)
//   .then((newDocument) => {
//     if (newDocument.querySelector('parsererror')) {
//       throw new Error('noRSS');
//     }
//     console.log(url);
//     console.log(newDocument);
//     const description = newDocument.querySelector('description').textContent;
//     const feedName = newDocument.querySelector('title').textContent;
//     const postsNodeList = newDocument.querySelectorAll('item');

//     const feedsPosts = { feedName, description, posts: getPosts(postsNodeList) };
//     return Promise.resolve(feedsPosts);
//   })
//   .catch((err) => Promise.reject(err));
