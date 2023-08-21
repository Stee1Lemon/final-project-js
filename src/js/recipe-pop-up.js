import { all } from 'axios';
import { join } from 'lodash';
import { FetchInfo } from './fetch-requests';
import { showRating } from './rating-pop-up.js';
import { createModal } from './open-any-modal.js';
import { openRatingModal } from './rating-pop-up.js'

const recipes = new FetchInfo();

const btnOpenRecipe = document.querySelector('.open-modal-recipe');

btnOpenRecipe?.addEventListener('click', openRecipeModal);


const id = "6462a8f74c3d0ddd28897fbc";


function openRecipeModal(){
    console.log('click on open recipe btn');
    createModal(recipeModalContentMurkup());
    recipes.fetchRecipeById(id).then(recipeObj => {
        console.log(recipeObj.data);
        recipeModalMarkup(recipeObj.data);
      });
    showRating();
    const btnFav = document.querySelector('.btn-favorite');
    btnFav?.addEventListener('click', addOrRemoveFav);
    const btnRating = document.querySelector('.btn-give-rating');
    // btnRating.addEventListener('click', openRatingModal);
    btnRating?.addEventListener('click', giveRating);
}


function recipeModalContentMurkup() {
    return `<div class="modal-recipe">
        <button type="button" class="btn-recipe-close close-button">x</button>
        <div class="modal-recipe-content">  
        </div>
        <div class="recipe-modal-btn-wrap">
            <button type="button" class="base-btn btn-favorite">Add to favorite</button>
            <button type="button" class="base-btn btn-give-rating">Give a rating</button>
         </div>
    </div>
    </div>
`
}

function recipeModalMarkup(recipeData){
    const recipeContainer = document.querySelector('.modal-recipe-content');
    const videoOrImage = () => {
            if (recipeData.youtube) {
              const videoId = recipeData.youtube.split('v=')[1];
              const embedLink = `https://www.youtube.com/embed/${videoId}`;
              const video = `<iframe class="recipe-modal-video" src="${embedLink}" width="295" height="295"></iframe>`;
              return video;
            }
            return `<img class="recipe-modal-img" src="${recipeData.preview}" width="295" height="295"></img>`;
          };

    const ingredientsList = recipeData.ingredients.map(
      ingredient =>
        `<li class="recipe-modal-ingredients-item"><span class="ingredients-name-span">${ingredient.name}</span><span class="ingredients-measure-span">${ingredient.measure}</span></li>`
    )
    .join('');

  const ifTags = () => {
    if (recipeData.tags[0] === '') {
      return '';
    }
    const tagslist = recipeData.tags.map(
        tag =>
          `<li class="recipe-modal-tag-item">
                <span class="recipe-modal-teg-span">#${tag}</span>
            </li>`
      )
      .join('');
    return tagslist;
  };
  const paragrapsOfRecipe = recipeData.instructions.split(/\r\n\r\n|\r\n/);

  const paragrapsMarkup = paragrapsOfRecipe
    .map(
      paragraph =>
        `<p class="recipe-modal-instructions-paragraph">${paragraph}</p>`
    )
    .join('');
    const recipeMarkup =  `<div class="video-or-image-wrap">${videoOrImage()}</div>
             <h2 class="recipe-modal-title">${recipeData.title}</h2>
            <div class="raring-time-tags"></div>
            <div class="rating-time-wrap">
                <div class="rating-recipe-modal rating">
                    <div class="rating-value-modal rating-value">${recipeData.rating}</div>
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
            <p class="recipe-modal-time">${recipeData.time}min</p>
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
}


function addOrRemoveFav(){
    console.log('click on add to fav');
}

function giveRating(){
    // openRatingModal();
    console.log('click on give a rating');
}