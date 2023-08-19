import { FetchInfo } from './fetch-requests';

const errorEl = document.querySelector('.error-el');
const recipesTable = document.querySelector('.js-card-items');
// const sectionEl = document.querySelector('.card-section');

const recipes = new FetchInfo();

export function seeViewport() {
  let number = '6';
  const smallMedia = window.matchMedia('(max-width: 768px)');
  const largeMedia = window.matchMedia('(max-width: 1200px)');
  smallMedia.addEventListener('change', isPhone);
  largeMedia.addEventListener('change', isTablet);
  isPhone(smallMedia);

  function isPhone(event) {
    if (event.matches) {
      number = 6;
    } else {
      isTablet(largeMedia);
    }
  }

  function isTablet(event) {
    if (event.matches) {
      number = 8;
      // doRecipesCards(8);
    } else {
      number = 9;
    }
  }
  return number;
}
doRecipesCards();
export async function doRecipesCards() {
  try {
    const page = await recipes.fetchAllRecipesPerPage(seeViewport());
    cardsMarkUp(page.data.results);
  } catch (error) {
    errorEl.classList.remove('is-hidden');
    console.log(error.message);
  }
}

export function cardsMarkUp(cardInfo) {
  const cardsO = cardInfo
    .map(({ _id, preview, title, description, rating }) => {
      return `<li class="recipe-card" id="${_id}>
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
      <span class="add-favorite"">♡</span>`;
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
  const recipeId = event.currentTarget.id;
  recipes.fetchRecipeById(recipeId).then(resp => {
    addToLocalStorage(resp.data);
  });
}

function addToLocalStorage(recipe) {
  const toFavorite = [
    {
      ...recipe,
      favorite: true,
    },
  ];
  localStorage.setItem('toFavorite', JSON.stringify(toFavorite));
}
