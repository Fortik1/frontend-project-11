import axios from 'axios';
import _ from 'lodash';

const axiosGet = (url) =>
  axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`)
    .then((result) => {
      const parser = new DOMParser();
      return Promise.resolve(parser.parseFromString(result.data.contents, 'text/xml'));
    })
    .catch((err) => Promise.reject(err.message))

export default (url) => 
axiosGet(url)
  .then((newDocument) => {
    if (newDocument.querySelector('parsererror')) {
      return Promise.resolve('noRSS');
    }
    const feedName = newDocument.querySelector('title').innerHTML;

    const posts = newDocument.querySelectorAll('item');
    console.log(posts);
  })
  .catch((err) => Promise.reject(err))

