import { FetchInfo } from './fetch-requests';

const popularRecipes = new FetchInfo();
const popularListEl = document.querySelector('.popular-list-js');

async function getPopular() {
  try {
    const resp = await popularRecipes.fetchPopularRecipes();
    popularListEl.insertAdjacentHTML(
      'afterbegin',
      createPopularMarkUp(resp.data)
    );
  } catch (err) {
    console.log(err);
    popularListEl.innerHTML = `
                  <p class="popular-err">
                  We are sorry, something went wrong. Please, reload the page!
                  </p>
                  `;
  }
}

getPopular();

function createPopularMarkUp(arr) {
  return arr
    .map(({ title, description, preview, _id }) => {
      // CUT WORDS
      // const descArr = description.split(' ');
      // let newDescArr;
      // if (descArr.length > 12) {
      //   newDescArr = descArr.slice(0, 12);
      // description = newDescArr.join(' ') + '...';
      // }

      // CUT LETTERS

      let newTitle;
      if (title.length > 11) {
        newTitle = title.slice(0, 11);
        title = newTitle + '...';
      }

      let newDescription;
      if (description.length > 80) {
        newDescription = description.slice(0, 80);
        description = newDescription + '...';
      }

      const descriptionString = `
            <li class="popular-recipe" id="${_id}">
            <img class="popular-img" src="${preview}" alt="${title}">
            <div class="popular-desc-container">
            <h3 class="popular-recipe-title">${title}</h3>
            <p class="popular-recipe-descr">${description}</p>
            </div>
            </li>
            `;
      return descriptionString;
    })
    .join('');
}
