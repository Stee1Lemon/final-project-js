import { FetchInfo } from './fetch-requests';

const categoriesBtnEl = document.querySelector('.categories-btn-js');
const categoriesListEl = document.querySelector('.categories-list-js');

let categoryBtns = [];

function getCategories() {
  const categories = new FetchInfo();
  categories
    .fetchAllCategories()
    .then(resp => {
      categoriesListEl.insertAdjacentHTML(
        'afterbegin',
        createCategoriesMarkUp(resp.data)
      );
      const btns = document.querySelectorAll('.category-btn');
      categoryBtns = [...btns];
    })
    .catch(err => {
      console.log(err);
      categoriesListEl.insertAdjacentHTML(
        'afterbegin',
        `
            <p class="categories-err">
            We are sorry, something went wrong. Please, reload the page!
            </p>
            `
      );
    });
}

getCategories();

function createCategoriesMarkUp(arr) {
  return arr
    .map(
      ({ name }) => `
          <li class="category">
          <button class="category-btn" type="button">${name}</button>
          </li>
          `
    )
    .join('');
}

categoriesBtnEl.addEventListener('click', handlerAllCategoriesBtn);

function handlerAllCategoriesBtn() {
  getAllRecipes();
  makeBtnNotActive();
}

function getAllRecipes() {
    const allRecipes = new FetchInfo();
    allRecipes.fetchAllRecipesPerPage(limit = 9)
    .then(resp => {
      //   функ що приймає масив resp.data.results і рендерить всі рецепти (innerHTML)
    })
    .catch(err => console.log(err));
  //   функ що малює помилку при рендері всіх рецептів на місці рецептів і приймає рядок повідомлення ('We are sorry. Something went wrong. Please, try reload the page.')
}

categoriesListEl.addEventListener('click', handlerCategoryBtn);

function handlerCategoryBtn(ev) {
  if (ev.target.nodeName !== 'BUTTON') {
    return;
  }
  makeBtnNotActive();

  if (ev.target.classList.contains('category-btn-active')) {
    return;
  }
  ev.target.classList.add('category-btn-active');
  const nameOfCategory = ev.target.textContent;
  getRecipesByCategory(nameOfCategory);
}

function getRecipesByCategory(category) {
    const recipesByCategory = new FetchInfo();
    recipesByCategory.fetchByCategory(category, page = 1, limit = 9)
    .then(resp => {
      if (resp.data.results.length === 0) {
        // функ що малює помилку при рендері рецептів рецептів по категорії на місці рецептів і приймає рядок повідомлення ('We are sorry. There are no recipes in this category.');
      }
      //   функ що приймає масив resp.data.results і рендерить картки по категоріі with innerHTML
    })
    .catch(err => console.log(err));
  //   функ що малює помилку при рендері рецептів по категорії на місці рецептів і приймає рядок повідомлення ('We are sorry. Something went wrong. Please, try reload the page.')
}

function makeBtnNotActive() {
  categoryBtns.map(btn => {
    if (btn.classList.contains('category-btn-active')) {
      btn.classList.remove('category-btn-active');
    }
  });
}
