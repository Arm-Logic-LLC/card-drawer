const footerMenuItems = document.querySelectorAll('.link_list_continer-la');
const footerMenuItemPlusClass = 'active-mobile-select-plus-la';
const footerMenuItemMinusClass = 'active-mobile-select-minus-la';
const aTags = document.querySelectorAll('a');
      aTags.forEach((el) => {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          if (el.hasAttribute('data-set')) {
            localStorage.removeItem('lastCollectionURL');
            localStorage.removeItem('collectionMetaTitle');
          }
          window.location.href = el.href; 
        });
    })

// function updateCartCount() {
//   const cartCountBubble = document.querySelector(".cart-count-bubble-la");
//   const cartCountHeader = document.querySelector(".cart-count-header-la");


//   document.addEventListener("DOMContentLoaded", function() {

//   fetch('/cart.js')
//     .then(response => response.json())
//     .then(data => {
//       const itemCount = data.item_count; // Get the cart's item count
  
//       if (itemCount > 0) {
//         // If the item count is greater than 0, add the class to the cartCountBubble
//         cartCountBubble.classList.add("product-form-active-la");
//       } else {
//         // Optionally, remove the class if the count is 0
//         cartCountBubble.classList.remove("product-form-active-la");
//       }
//     })
//     .catch(error => console.error('Error fetching cart data:', error));
  
// }
//   )}
// updateCartCount();


footerMenuItems.forEach((el) => {
    el.addEventListener('click', () => {
        if (el.classList.contains(footerMenuItemPlusClass)) {
            el.classList.remove(footerMenuItemPlusClass);
            el.classList.add(footerMenuItemMinusClass);
        } else if (el.classList.contains(footerMenuItemMinusClass)) {
            el.classList.remove(footerMenuItemMinusClass);
            el.classList.add(footerMenuItemPlusClass);
        } else {
            el.classList.add(footerMenuItemMinusClass);
        }
    });
});

const apiKey = "ira_JTdD9D6Wp9vCZCSOV6cvV3tGIQ7M7Z2DBYz7";
const url = `https://api.ipregistry.co/?key=${apiKey}`;
const continerInternashnal = document.querySelector('.internation_region-la');

fetch(url)
  .then(response => response.json())
  .then(data => {
    const countryName = data.location.country.name;
    const countryFlag = data.location.country.flag.twemoji;

    const countryDiv = document.createElement("div");
    countryDiv.innerHTML = `
      <span class="ship-to-internashnal-la">Ship to: </span>
      <img class="flag_internashnal-la" src="${countryFlag}" alt="Country Flag">
      <span class="title_internashnal-la">${countryName}</span>
    `;
    continerInternashnal.appendChild(countryDiv);
  })
  .catch(error => {
    console.error("Fetch error:", error);
  });
