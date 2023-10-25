import axios from 'axios';
import { uniqueId } from 'lodash';

const axiosGet = (url) => axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`)
  .then((result) => {
    const parser = new DOMParser();

    return Promise.resolve(parser.parseFromString(result.data.contents, 'text/xml'));
  })
  .catch((err) => Promise.reject(err.message));

const getPosts = (postsNodeList) => {
  const posts = [];
  postsNodeList.forEach((element) => {
    const getSelector = (selector) => element.querySelector(selector).textContent;
    const id = uniqueId();
    const title = getSelector('title');
    const link = getSelector('link');
    const description = getSelector('description');

    posts.push({
      id, title, link, description,
    });
  });
  return posts;
};

export default (url) => axiosGet(url)
  .then((newDocument) => {
    if (newDocument.querySelector('parsererror')) {
      throw new Error('noRSS');
    }
    console.log(url);
    console.log(newDocument);
    const description = newDocument.querySelector('description').textContent;
    const feedName = newDocument.querySelector('title').textContent;
    const postsNodeList = newDocument.querySelectorAll('item');

    const feedsPosts = { feedName, description, posts: getPosts(postsNodeList) };
    return Promise.resolve(feedsPosts);
  })
  .catch((err) => Promise.reject(err));
