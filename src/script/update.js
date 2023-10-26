import parser from "./parser.js";
import render from "./render.js";
import newState from "./view.js";

const getUniqueArr = (newArr, state) => {
  const nameSet = new Set(state.posts.map((el) => el.title));
  const uniqArr = newArr.filter((el) => !nameSet.has(el.title));
  return uniqArr;
};

const update = (state) => {
  console.log(state)
  state.useUrl.forEach(url => {
    parser(url)
      .then((newData) => {
        const newPost = getUniqueArr(newData.posts, state);
        if (newPost.length !== 0) {
          newState(state).posts.push(...newPost);
          render(newPost);
        };
      })
      .catch((err) => console.log(err));
  })
  setTimeout(() => update(state), 5000);
}

export default update;