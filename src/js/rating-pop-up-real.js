const ratingOpenBtn = document.querySelector('.open-rating-btn');
const ratingPopUpEl = document.querySelector('.container-rating');
const ratingCloseBtn = document.querySelector('.rating-btn-close');

ratingOpenBtn.addEventListener('click', toggleRatingPopUp);
ratingCloseBtn.addEventListener('click', toggleRatingPopUp);

function toggleRatingPopUp() {
  ratingPopUpEl.classList.toggle('is-hidden');
}

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

export { showRating };
