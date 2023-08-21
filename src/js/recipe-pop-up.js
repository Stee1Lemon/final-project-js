// import { all } from 'axios';
// import { join } from 'lodash';
// import { FetchInfo } from './fetch-requests';
// import { showRating } from './rating-pop-up.js';
// import { createModal } from './open-any-modal.js';

// const recipes = new FetchInfo();

// const recipeContainer = document.querySelector('.modal-recipe-content');
// const btnOpenRecipe = document.querySelector('.open-modal-recipe');

// btnOpenRecipe?.addEventListener('click', createModal);

// recipes.fetchRecipeById(id).then(recipeObj => {
//   console.log(recipeObj.data);
//   recipeModalMarkup(recipeObj.data);
// });

export function recipeModalMarkup(resipeData) {
  const {
    youtube,
    preview,
    title,
    rating,
    time,
    ingredients,
    tags,
    instructions,
  } = resipeData;

  const videoOrImage = () => {
    if (youtube) {
      const videoId = youtube.split('v=')[1];
      const embedLink = `https://www.youtube.com/embed/${videoId}`;
      const video = `<iframe class="recipe-modal-video" src="${embedLink}" width="295" height="295"></iframe>`;
      return video;
    }
    return `<img class="recipe-modal-img" src="${preview}" width="295" height="295"></img>`;
  };

  const ingredientsList = ingredients
    .map(
      ingredient =>
        `<li class="recipe-modal-ingredients-item"><span class="ingredients-name-span">${ingredient.name}</span><span class="ingredients-measure-span">${ingredient.measure}</span></li>`
    )
    .join('');

  const ifTags = () => {
    if (tags[0] === '') {
      return '';
    }
    const tagslist = tags
      .map(
        tag =>
          `<li class="recipe-modal-tag-item">
                <span class="recipe-modal-teg-span">#${tag}</span>
            </li>`
      )
      .join('');
    return tagslist;
  };

  const paragrapsOfRecipe = instructions.split(/\r\n\r\n|\r\n/);

  const paragrapsMarkup = paragrapsOfRecipe
    .map(
      paragraph =>
        `<p class="recipe-modal-instructions-paragraph">${paragraph}</p>`
    )
    .join('');

  const recipeMarkup = `<div class="video-or-image-wrap">${videoOrImage()}</div>
        <h2 class="recipe-modal-title">${title}</h2>
        <div class="raring-time-tags"></div>
        <div class="rating-time-wrap">
            <div class="rating-recipe-modal rating">
                <div class="rating-value-modal rating-value">${rating}</div>
                    <div class="rating-body">
                        <div class="rating-active"></div>
                            <div class="rating-items">
                  <input type="radio" class="rating-item" name="recipe-rating" value="1"/>
                  <input type="radio" class="rating-item" name="recipe-rating" value="2"/>
                  <input type="radio" class="rating-item" name="recipe-rating" value="3"/>
                  <input type="radio" class="rating-item" name="recipe-rating" value="4"/>
                  <input type="radio" class="rating-item" name="recipe-rating" value="5"/>
                            </div>
                    </div>
                </div>
        <p class="recipe-modal-time">${time}min</p>
        </div>
            <ul class="modal-ingredients-list">
            ${ingredientsList}
            </ul>
        <div class="recipe-modal-tags">
            <ul class="modal-tags-list">
            ${ifTags()}
            </ul>
        </div>
        <div class="recipe-modal-instructions-wrap">
            ${paragrapsMarkup}
        </div>
        `;
  recipeContainer.innerHTML = recipeMarkup;
  // showRating();
}
