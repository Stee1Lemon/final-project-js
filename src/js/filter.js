import { debounce } from 'lodash';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import '../css/filter.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { FetchInfo } from './fetch-requests.js';

const filters = new FetchInfo();

const selectArea = document.querySelector('.area-select');
const selectIngredients = document.querySelector('.ingredients-select');
const selectTime = document.querySelector('.time-select');
const inputSubmit = document.querySelector('.search-input');

selectArea?.addEventListener('change', selectedArea);
selectIngredients?.addEventListener('change', selectedIngredient);
selectTime?.addEventListener('change', selectedTime);
inputSubmit?.addEventListener('input', debounce(handlerInput, 300));

let searchArea = '';
let searchIngredient = ''; 
let searchTime = ''; 
let searchText = '';

export const fullFilter = {
  search: searchText,
  time: searchTime,
  area: searchArea,
  ingredients: searchIngredient,
};

const defaultTimeOption = 
  '<option class="" value="" selected>0 min</option>';

function timesMarkup() {
  let secondsStep = [];
  for (let minutes = 5; minutes <= 120; minutes += 5) {
    secondsStep.push(`${minutes}`);
  }
  let timeMarkup = secondsStep
    .map(minute => {
      return `<option value="${minute}">${minute} min</option>`;
    })
    .join('');
    const selectTimeMarkup = defaultTimeOption + timeMarkup;
  selectTime.insertAdjacentHTML('beforeend', selectTimeMarkup);

  new SlimSelect({
    select: selectTime,
  });
}

timesMarkup();

const defaultAreaOption =
  '<option class="" value="" selected>Region</option>';

filters
  .fetchAllAreas()
  .then(resp => {
    const areasMarkup = resp.data
      .map(area => {
        return `<option class="sisi dodo" value="${area.name}">${area.name}</option>`;
      })
      .join('');
      const selectAreaMarkup = defaultAreaOption + areasMarkup;
      selectArea.insertAdjacentHTML('beforeend', selectAreaMarkup);
      
      new SlimSelect({
        select: selectArea,
      });
  })
  .catch(() => {
    Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
  });

  const defaultIngredientsOption =
    '<option value="" selected>Product</option>';

filters
  .fetchAllIngredients()
  .then(resp => {
    const ingredientsMarkup = resp.data
      .map(ingredient => {
        return `<option value="${ingredient.name}">${ingredient.name}</option>`;
      })
      .join('');
      const selectIngredientsMarkup =
        defaultIngredientsOption + ingredientsMarkup;
    selectIngredients.insertAdjacentHTML('beforeend', selectIngredientsMarkup);

    new SlimSelect({
      select: selectIngredients,
    });
  })
  .catch(() => {
    Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
  });

function handlerInput(evt) {
  searchText = evt.target.value.trim().toLowerCase();
  updateFullFilter();
}

function selectedTime(evt) {
  searchTime = evt.currentTarget.value;
  updateFullFilter();
}

function selectedArea(evt) {
  searchArea = evt.currentTarget.value;
  updateFullFilter();
}

function selectedIngredient(evt) {
  searchIngredient = evt.currentTarget.value;
  updateFullFilter();
}

function updateFullFilter() {
  fullFilter.search = searchText;
  fullFilter.time = searchTime;
  fullFilter.area = searchArea;
  fullFilter.ingredients = searchIngredient;
  console.log(fullFilter);
}