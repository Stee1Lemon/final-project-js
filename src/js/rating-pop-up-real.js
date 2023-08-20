const ratingOpenBtn = document.querySelector('.open-rating-btn');
const ratingPopUpEl = document.querySelector('.container-rating');
const ratingCloseBtn = document.querySelector('.rating-btn-close');

ratingOpenBtn.addEventListener('click', toggleRatingPopUp);
ratingCloseBtn.addEventListener('click', toggleRatingPopUp);

function toggleRatingPopUp() {
  ratingPopUpEl.classList.toggle('is-hidden');
}
