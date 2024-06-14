import items from './bd.js';

const listProjects = document.querySelector('.list-projects');
const loadMoreBtn = document.querySelector('.button-projects');
const btnHide = document.querySelector('.button-hide-projects');

btnHide.style.display = 'none';

let currentIndex = 0;
const itemsPerPage = 3;

const currentItems = items.slice(currentIndex, currentIndex + itemsPerPage);

listProjects.insertAdjacentHTML('beforeend', createProjects(currentItems));

function createProjects(arr) {
  return arr
    .map(
      ({ id, title, description, img, img2x }) => `
    <li class='list-projects-li' data-id='${id}'>
   <img class='list-projects-img' src='${img2x}' alt='${title}' />
    <p class='list-projects-subtitle'>${description}</p>
    <h3 class='list-projects-title'>${title}</h3>
   <button class='button-projects-visit'>visit
    <svg class="projects-svg" width="24" height="24">
              <use href="../img/icons.svg#icon-gitbrowsre"></use>
            </svg>
   </button>
    </li>
    `
    )
    .join('');
}

loadMoreBtn.addEventListener('click', () => {
  currentIndex += itemsPerPage;
  const updatedItems = items.slice(currentIndex, currentIndex + itemsPerPage);
  const res = updatedItems.some(item => item.id === items.length);
  console.log(res);
  if (res) {
    loadMoreBtn.style.display = 'none';
    btnHide.style.display = 'block';
  }
  listProjects.insertAdjacentHTML('beforeend', createProjects(updatedItems));
});

btnHide.addEventListener('click', () => {
  listProjects.innerHTML = '';
  currentIndex = 0;
  listProjects.insertAdjacentHTML('beforeend', createProjects(currentItems));
  loadMoreBtn.style.display = 'block';
  btnHide.style.display = 'none';
});
