// console.log('4. Hero');

// import { FetchInfo, FetchInfoByFilter } from './fetch-requests';

// // const heroTest = new FetchInfo();

// // heroTest.fetchAllAreas().then(response => console.log(response.data[0]));

// const filter = new FetchInfoByFilter(gdgfdg);

// filter.fetchFilteredItems().then(response => console.log(response));

import Swiper, {  Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'


import axios from 'axios';
const paginationPosition = document.querySelector('.swiper-pagination');
const swiperSlide = document.querySelector('.swiper-slide');

const swiperWrapper = document.querySelector('.swiper-wrapper');

const fetchListItems = async () => {
  const events = await axios.get(`https://tasty-treats-backend.p.goit.global/api/events`);
  return events.data;
};

fetchListItems()
  .then(response => {
     console.log(response);
    swiperRendering(response);
    const swiper = new Swiper('.swiper', {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 1,
      modules: [Pagination],
      pagination: {
        el: '.swiper-pagination',
      },
    });

    // paginationPosition.style.position = "trelative";

  })
  .catch(err => console.log(err))




function swiperRendering(elements) {
  const markup = elements.map((element) => {
    return ` 
    <div class="swiper-slide">
      <div class="cook-name">
        <img class="cook" src="${element.cook.imgWebpUrl}" />
      </div>
    </div></div>
    <div class="swiper-slide">
      <div class="main-dish-bg">
        <img  class="pic" src="${element.topic.previewWebpUrl}" />
      </div>
    </div>
    <div class="swiper-slide">
      <div class="big-dish-bg">
        <img class="zoom-dish" src="${element.topic.imgWebpUrl}" />
      </div>
    </div>
    `;
  })
  .join("");
  swiperWrapper.insertAdjacentHTML("beforeend", markup);

};

  // return ` 
  //   <div class="swiper-slide"><img class="cook" src="${element.cook.imgWebpUrl}" /></div>
  //   <div class="swiper-slide"><div class="main-dish-bg"><img  class="pic" src="${element.topic.previewWebpUrl}" /></div></div>
  //   <div class="swiper-slide"><div class="big-dish-bg"><img src="${element.topic.imgWebpUrl}" /> </div></div>
  //   `;