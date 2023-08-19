import { FetchInfo } from './fetch-requests';

const errorEl = document.querySelector('.error-el');
const recipesTable = document.querySelector('.js-card-items');
const ratingOpenBtn = document.querySelector('.open-rating-btn');
const ratingPopUpEl = document.querySelector('.container-rating');

ratingOpenBtn.addEventListener('click', openRatingPopUp);
function openRatingPopUp() {
  ratingPopUpEl.classList.toggle('is-hidden');
}

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
      return `
      <li class="recipe-card rad-img" id="${_id}">
  <div class="card-thumb">
    <img class="card-image" src="${preview}" alt="Image of " />
  </div>
  <div class="card-info">
    <h3 class="card-title">${title}</h3>
    <p class="card-description">${description}</p>
    <div class="card-rating-and-button">
      <div class="rating">
        <div class="rating-value">${rating}</div>
        <div class="rating-body">
          <div class="rating-active"></div>
          <div class="rating-items">
            <input
              type="radio"
              class="rating-item"
              name="recipe-rating"
              value="1"
            />
            <input
              type="radio"
              class="rating-item"
              name="recipe-rating"
              value="2"
            />
            <input
              type="radio"
              class="rating-item"
              name="recipe-rating"
              value="3"
            />
            <input
              type="radio"
              class="rating-item"
              name="recipe-rating"
              value="4"
            />
            <input
              type="radio"
              class="rating-item"
              name="recipe-rating"
              value="5"
            />
          </div>
        </div>
      </div>
      <button class="base-btn btn-card" type="button">See recipe</button>
    </div>
  </div>
  <span class="add-favorite">♡</span>
</li>`;
    })
    .join('');
  recipesTable.innerHTML = cardsO;
  showRating();
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

// ----------------

function showRating() {
  const ratings = document.querySelectorAll('.rating');
  if (ratings.length > 0) {
    initRatings();
  }

  function initRatings() {
    let ratingActive, ratingVale;
    for (let index = 0; index < ratings.length; index += 1) {
      const rating = ratings[index];
      initRatings(rating);
    }

    function initRatings(rating) {
      initRatingVars(rating);
      setRatingActiveWidth();
    }

    function initRatingVars(rating) {
      ratingActive = rating.querySelector('.rating-active');
      ratingVale = rating.querySelector('.rating-value');
    }

    function setRatingActiveWidth(index = ratingVale.innerHTML) {
      const ratingActiveWidth = index / 0.05;
      ratingActive.style.width = `${ratingActiveWidth}%`;
    }
  }
}
