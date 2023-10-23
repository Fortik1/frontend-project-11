import { setLocale, string } from 'yup';

export default (url, urlList) => 
  new Promise((resolve, reject) => {
  setLocale({
    string: {
      url: () => 'ErrorValidURL',
      required: () => 'Empty',
    },
    notOneOf: () => 'repeat'
  })

  const shema = string().required().url().notOneOf(urlList, 'repeat');

  shema.validate(url)
    .then((result) => resolve(result))
    .catch((err) => reject(err.message));
  });
