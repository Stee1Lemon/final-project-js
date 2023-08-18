import { FetchInfo } from './fetch-requests';

const errorEl = document.querySelector('.error-el');
const recipesTable = document.querySelector('.js-card-items');
// const sectionEl = document.querySelector('.card-section');

const recipes = new FetchInfo();

export async function doRecipesCards() {
  const recipes = new FetchInfo();
  try {
    const page = await recipes.fetchAllRecipesPerPage(9);
    cardsMarkUp(page.data.results);
  } catch (error) {
    errorEl.classList.remove('is-hidden');
    console.log(error.message);
  }
}

doRecipesCards();

export function cardsMarkUp(cardInfo) {
  const cardsO = cardInfo
    .map(({ _id, preview, title, description, rating }) => {
      return `<li class="recipe-card">
      <div class="rad-img card-thumb">
        <img class="card-image" src="${preview}" alt="Image of ${title}" />
      </div>
      <div class="card-info">
        <h3 class="card-title">${title}</h3>
        <p class="card-description">
          ${description}
        </p>
        <div class="card-rating-button">
          <div>
            <p class="card-rating">${rating}</p>
            <span class="card-stars">★★★★★</span>
          </div>
          <button class="base-btn btn-card" type="button">See recipe</button>
        </div>
      </div>
      <span class="add-favorite" id="${_id}">♡</span>`;
    })
    .join('');
  recipesTable.innerHTML = cardsO;
  addToFavoriteListener();
}

function addToFavoriteListener() {
  const btnAddToFavoriteEl = document.querySelectorAll('.add-favorite');
  btnAddToFavoriteEl.forEach(el => {
    el.addEventListener('click', addToFavoriteItem);
  });
}

function addToFavoriteItem(event) {
  console.log('ok', event.currentTarget.id);
  const recipeId = event.currentTarget.id;
  recipes.fetchRecipeById(recipeId).then(resp => {
    // console.log(resp.data);
    addToLocalStorage(resp.data);
  });
}

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

function addToLocalStorage(recipe) {
  const toFavorite = [
    {
      ...recipe,
      favorite: true,
    },
  ];
  console.log(toFavorite);
  localStorage.setItem('toFavorite', JSON.stringify(toFavorite));
}
