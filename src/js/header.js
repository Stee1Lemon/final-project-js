// console.log('3. Header');
import { openOrderModal } from './order-pop-up';
import { resetLocalStorageFilters } from './local-storage';

// --------------------------------------------Активні посилання навігації сайту

document.addEventListener("DOMContentLoaded", (evt) => {
  console.log('Loaded');
  const linkHome = document.querySelector('.header-link-home');
  const linkFav = document.querySelector('.header-link-fav');
   console.log(linkHome, linkFav);

  function onLinkClick(link) {
    linkHome.classList.remove("js-link");
    linkFav.classList.remove("js-link");
    link.classList.add("js-link");
  }

  linkHome.addEventListener('click', (evt) => {
    console.log('Push HOME');
    onLinkClick(linkHome);
  });

  linkFav.addEventListener('click', (evt) => {
    onLinkClick(linkFav);
    console.log('Push FAV');
  })

});   // При загрузці HTML-документа




// document.addEventListener("DOMContentLoaded", function() {
//         const headerLinkHome = document.getElementById("home-link");
//         const headerLinkFavorites = document.getElementById("favorites-link");

//         function setActiveLink(link) {
//             headerLinkHome.classList.remove("active");
//             headerLinkFavorites.classList.remove("active");
//             link.classList.add("active");
//         }

//         headerLinkHome.addEventListener("click", function(event) {
//             setActiveLink( headerLinkHome);
//         });

//         headerLinkFavorites.addEventListener("click", function(event) {
//             setActiveLink(headerLinkFavorites);
//         });

//         if (window.location.pathname.includes("Favorites.html")) {
//             setActiveLink(headerLinkFavorites);
//         } else {
//             setActiveLink(headerLinkHome);
//         }
// });


// ----------------------------------------------Мобільне меню
(() => {
  const refs = {
    openMenuBtn: document.querySelector('[data-menu-open]'),
    closeMenuBtn: document.querySelector('[data-menu-close]'),
    menu: document.querySelector('[data-menu]'),
  };

  refs.openMenuBtn.addEventListener('click', toggleMenu);
  refs.closeMenuBtn.addEventListener('click', toggleMenu);

  function toggleMenu() {
    refs.menu.classList.toggle('is-hidden');
    document.body.classList.toggle('no-scroll');
  }
})();

// ---------------------------------------Зміна теми сайта користувачем

let theme = null;
const switcherEl = document.querySelectorAll('.js-switch'); //Вибираємо всі світчери на сторінці.
const bodyEl = document.querySelector('body');

switcherEl.forEach(input => {
  // Перевіряємо положення світчера і присвоюємо змінній theme відповідне значення
  input.addEventListener('change', function () {
    if (input.checked === false) {
      theme = 'light';
      bodyEl.classList.remove('dark');
      localStorage.setItem('theme', theme);
    } else {
      theme = 'dark';
      changeTheme(theme);
      localStorage.setItem('theme', theme);
    }
  });
});
// Функція зміни теми
function changeTheme(themeName) {
  bodyEl.classList.add('dark');
}

// Перевіряємо, чи є в локалсторідж значення теми і записуємо в змінну theme
let activeTheme = localStorage.getItem('theme');
if (activeTheme === null || activeTheme === 'light') {
  switcherEl.forEach(input => {
    //приводимо положення світчера у відповідність до вибраної теми
    input.checked = false;
  });
} else if (activeTheme === 'dark') {
  changeTheme('dark');
  switcherEl.forEach(input => {
    //приводимо положення світчера у відповідність до вибраної теми
    input.checked = true;
  });
}

// ----------------------------------------------------Іконка корзина

const basketEl = document.querySelector('.header-basket');
basketEl.addEventListener('click', openOrderModal);

// ----------------------------------------Зброс локалсторідж по фільтрам
homeEl.addEventListener('click', resetLocalStorageFilters);
