!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},r=e.parcelRequired7c6;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in t){var r=t[e];delete t[e];var a={id:e,exports:{}};return n[e]=a,r.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,n){t[e]=n},e.parcelRequired7c6=r);var a=r("8dmL2"),o=r("80JJg");r("i8Q71");var i,d,c=document.querySelector(".fav-hero-img-mob"),s=document.querySelector(".fav-categories"),l=document.querySelector(".fav-recipes"),u=document.querySelector(".fav-notification"),f=[];function v(e){l.innerHTML=(0,a.makeCardsMarkUp)(e),(0,o.showRating)(),(0,a.addToFavoriteListener)()}i=JSON.parse(localStorage.getItem("keyOfFavoritesCards")),function(){if(!i.length)c.classList.add("is-hidden"),s.classList.add("is-hidden"),l.classList.add("is-hidden"),u.classList.remove("is-hidden")}(),s&&(null==s||s.addEventListener("click",(function(e){if(!e.target.name)return;!function(e){var n=i.filter((function(n){var t=n.category;return e===t}));l.innerHTML=(0,a.makeCardsMarkUp)(n),"all"===e&&v(i);(0,o.showRating)(),(0,a.addToFavoriteListener)()}(e.target.name)}))),i.forEach((function(e){var n=e.category;f.includes(n)||f.push(n)})),d=f.map((function(e){return'<button type="button" name="'.concat(e,'" class="fav-category-btn">').concat(e,"</button>")})).join(""),s.insertAdjacentHTML("beforeend",d),v(i)}();
//# sourceMappingURL=favorites.6dc0d290.js.map
