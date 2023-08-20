// //console.log('10.Favorites page');

import recipies from './test-mock';
import cardsMarkUp from './recipes-cards';

const heroImgMob = document.querySelector('.fav-hero-img-mob');
const categoriesContainer = document.querySelector('.fav-categories');
const cardsContainer = document.querySelector('.fav-recipes');
const categoriesSection = document.querySelector('.fav-categories');
const categoryBtn = document.querySelector('.fav-category-btn');
const objRecipeCard = document.querySelector('.obj-recipe-card');
const notifWithHat = document.querySelector('.fav-notification');
const categories = [];

function showNotifyWithHat() {
  console.log('recipies', recipies);
  if (!recipies.length) {
    heroImgMob.classList.add('is-hidden');
    categoriesSection.classList.add('is-hidden');
    cardsContainer.classList.add('is-hidden');
    notifWithHat.classList.remove('is-hidden');
  }
}
showNotifyWithHat();

//categoriesSection.addEventListener('click', onClick);

function onClick(evt) {
  if (!evt.target.name) {
    return;
  }
  console.log('click', evt.target.name);

  createCards(evt.target.name);
}

function createCards(btnName) {
  const cardInfo = recipies.filter(({ category }) => {
    return btnName === category;
  });
  console.log('cardInfo', cardInfo);
  recipesTable = cardsContainer;
  console.log('recipesTable', recipesTable);
  //cardsContainer.innerHTML = createCardsMarkup(recipiesArray);
  cardsMarkUp(cardInfo);

  if (btnName === 'all') {
    cardsMarkUp(recipies);
  }
}

function getCategories(recipies) {
  console.log('recipies', recipies);
  recipies.forEach(({ category }) => {
    if (categories.includes(category)) {
      return;
    }
    categories.push(category);
    console.log('categories', categories);
  });
  renderCategories(categories);
}

function renderCategories(categories) {
  const markup = categories
    .map(item => {
      return `<button type="button" name="${item}" class="fav-category-btn">${item}</button>`;
    })
    .join('');

  //categoriesContainer.insertAdjacentHTML('beforeend', markup);
}

// function createCardsMarkup(recipiesArray) {
//   return recipiesArray
//     .map(({ _id, preview, title, description, rating }) => {
//       return `<li class="fav-recipe-card recipe-card">
//                 <object class="obj-recipe-card">
//                   <div class="rad-img card-thumb fav-card-thumb">
//                     <img class="fav-card-image card-image" src="${preview}" alt="" />
//                   </div>
//                   <div class="card-info">
//                     <h3 class="card-title" id="${_id}">${title}</h3>
//                     <p class="card-description">${description}</p>
//                     <div class="card-rating-button">
//                       <div>
//                         <p class="card-rating">${rating}</p>
//                         <span class="card-stars">★★★★★</span>
//                       </div>
//                       <button class="base-btn btn-card" type="button">See recipe</button>
//                     </div>
//                   </div>
//                   <span class="add-favorite">♡</span>
//                 </object>
//               </li>`;
//     })
//     .join('');
// }

//const recipies = JSON.parse(localStorage.getItem(''));

getCategories(recipies); //() <- тут мають передатись дані з localStorage

// function cardsMarkup(recipies) {
//   cardsContainer.innerHTML = createCardsMarkup(recipies);
// }

//cardsMarkUp(recipies);
