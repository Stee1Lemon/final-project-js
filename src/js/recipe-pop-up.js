import { all } from "axios";
import { FetchInfo } from "./fetch-requests";

const recipes = new FetchInfo();


const recipeContainer = document.querySelector('.modal-recipe-content');


recipes.fetchRecipeById()
.then(data => {
    console.log(data);
    recipeMarkup(data);
});



function recipeMarkup(resipeData){
    const {youtube, title, rating, time, ingredients, tags, instructions} = resipeData; 
    console.log(resipeData);
    const recipeMarkup = `<iframe src="${youtube}" width="295" height="295"></iframe>
    <h2>${title}</h2>
    <p>${rating}</p>
    <p>${time} min</p>
    <p>${ingredients}</p>
    <p>${tags}</p>
    <p>${instructions}</p>
    `;
    recipeContainer.innerHTML = recipeMarkup;
}