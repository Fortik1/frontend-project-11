import axios from 'axios';
import _ from 'lodash';

const axiosGet = (url) =>
  axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`)
    .then((result) => {
      const parser = new DOMParser();
      return Promise.resolve(parser.parseFromString(result.data.contents, 'text/xml'));
    })
    .catch((err) => Promise.reject(err.message));

const getPosts = (postsNodeList) => {
  const posts = [];
  postsNodeList.forEach(element => {
    const getSelector = (selector) => element.querySelector(selector).innerHTML;
    const id = _.uniqueId();
    const title = getSelector('title');
    const link = getSelector('link');
    const description = getSelector('description');

    posts.push({ id, title, link, description});
  })
  return posts;
};

export default (url) => 
axiosGet(url)
  .then((newDocument) => {
    if (newDocument.querySelector('parsererror')) {
      return Promise.resolve('noRSS');
    }

    const description = newDocument.querySelector('description').innerHTML;
    const feedName = newDocument.querySelector('title').innerHTML;
    const postsNodeList = newDocument.querySelectorAll('item');

    const feedsPosts = { feedName, description, posts: getPosts(postsNodeList) };
    return Promise.resolve(feedsPosts);
  })
  .catch((err) => Promise.reject(err))

