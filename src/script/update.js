import parser from "./parser.js";
import render from "./render.js";

const getUniqueArr = (newArr, state) => {
  const nameSet = new Set(state.posts.map((el) => el.title));
  const uniqArr = newArr.filter((el) => !nameSet.has(el.title));
  return uniqArr;
};

export const update = (state) => {
  state.useUrl.forEach(url => {
    parser(url)
      .then((newData) => {
        const newPost = getUniqueArr(newData.posts, state);
        if (newPost.length !== 0) {
          watchingPost(state).posts = [ ...newPost, ...state.posts ];
        }
        console.log(newPost);
        render(newPost);
      })
      .catch((err) => console.log(err))
      .finally(() => setTimeout(() => update(state), 5000));
  })
}