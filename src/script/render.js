const createElementCard = (name) => {
  const divCard = document.createElement('div');
  divCard.classList.add('card', 'border-0');

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  const divCardBody = document.createElement('div');
  divCardBody.classList.add('card-body');
  
  const title = document.createElement('h2');
  title.classList.add('card-title', 'h4');
  title.innerHTML = name;

  divCardBody.appendChild(title);
  divCardBody.appendChild(ul);
  divCard.appendChild(divCardBody);
  return divCard;
}

const createPostHTML = (post) => {
  const postUl = document.querySelector('.posts').querySelector('ul');
  const li = document.createElement('li');
  li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

  const a = document.createElement('a');
  a.href = post.link;
  a.classList.add('fw-bold');
  a.setAttribute('data-id', post.id);
  a.setAttribute('target', "_blank");
  a.setAttribute("el", "noopener noreferrer");
  a.innerHTML = post.title;

  const button = document.createElement('button');
  button.setAttribute("type", "button");
  button.setAttribute("data-id", post.id);
  button.setAttribute("data-bs-toggle", "modal");
  button.setAttribute("data-bs-target", "#modal");
  button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  button.innerHTML = "Просмотр";

  li.appendChild(a);
  li.appendChild(button);

  li.addEventListener('click', () => {
    a.classList.replace('fw-bold', 'fw-normal');
    a.classList.add('link-secondary');
  });
  postUl.prepend(li);
};

export const createFeedHTML = (name) => {
  const feedUl = document.querySelector('.feeds').querySelector('ul');

  const li = document.createElement('li');
  li.classList.add('list-group-item', 'border-0', 'boreder-end-0');

  const h3 = document.createElement('h3');
  h3.classList.add('h6', 'm-0');
  h3.innerHTML = name.feedName;

  const p = document.createElement('p');
  p.classList.add('m-0', 'small', 'text-black-50')
  p.innerHTML = name.description;

  li.appendChild(h3);
  li.appendChild(p);
  feedUl.prepend(li);
}

export default (data) => {
  if (!document.querySelector('.posts').innerHTML) {
    document.querySelector('.posts').appendChild(createElementCard('Посты'));
    document.querySelector('.feeds').appendChild(createElementCard('Фиды'));
  }

  data.forEach(element => {
    createPostHTML(element);
  });
}
