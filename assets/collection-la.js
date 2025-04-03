let currentUrl = window.location.pathname + window.location.search;
let buttonLinks = document.querySelectorAll(".link_url_menu-la");
let collectionLinks = document.querySelectorAll(".active_name_icons_all");
const swiperActiveCenter = document.querySelectorAll(".swiper-items-my-la");
const collectionGridTwo = document.querySelector(".grid-two-products-la");
const urlParams = new URLSearchParams(window.location.search);
const clickFilterPosition = document.querySelector(".title_filter-la");
const activeFilterPosition = document.querySelector(".filter-sorty-position");
const bodyPosition = document.body;
const fadeIn = document.querySelectorAll(".all_sizeing");
const elementFilter = document.querySelector(".filter_collection-la");
const closeFilterOverlay = document.querySelector(".close-filter-overlay-la");
const titleSortBy = document.querySelector(
  ".title-continer-in-selected-sort-by"
);
const activeSortBy = document.querySelector(".select-sort-by");
const closeSortByPlus = document.querySelector(".filter-close-plus-la");
const closeSortByMinus = document.querySelector(".filter-close-minus-la");
const labelSize = document.querySelectorAll(".list-all-0 li label");
const inputChange = document.querySelectorAll(".list-all-0 li label input");
const optionInpute = document.querySelectorAll(".filter-option-inpute-la");
const containerGridLa = document.querySelector(".collection-product-section-la")
const query = window.location.search;


titleSortBy.addEventListener("click", () => {
  activeSortBy.classList.toggle("active");
  titleSortBy.classList.toggle("active-title-sort-by");
  closeSortByPlus.classList.toggle("active");
  closeSortByMinus.classList.toggle("active");
});

if (containerGridLa) {
    if (query.includes('sort_by') || query.includes('filter') || query.includes('sort_by') && query.includes('filter') ) {
      containerGridLa.classList.add('unset_product_costm-la'); 
    }
}

document
  .querySelectorAll('.filter_sorting_by input[type="checkbox"]')
  .forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      document.getElementById("loading").style.display = "block";
      updateProductCount();
    });
  });
function updateProductCount() {
  const form = document.querySelector(".filter_sorting_by");
  const formData = new FormData(form);
  const queryString = new URLSearchParams(formData).toString();
  const url = `${window.location.pathname}?${queryString}&view=grid`;
  fetch(url, {
    method: "GET",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  })
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");
      const filteredProductCount = doc
        .querySelector(".show-results-btn-la")
        .getAttribute("data-products-count");
      localStorage.setItem("filteredProductCount", filteredProductCount);
      document.getElementById("filtered-results-count").innerText =
        filteredProductCount;
      document.getElementById("loading").style.display = "none";
    })
    .catch((error) => {
      console.error("Error fetching product count:", error);
      document.getElementById("loading").style.display = "none";
    });
}
const showBtn = document.querySelector(".show-results-btn-la");
showBtn &&
  showBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target.closest("form"));
    const queryString = new URLSearchParams(formData).toString();
    let url = `${window.location.pathname}?${queryString}`;
    const viewParam = new URLSearchParams(window.location.search).get("view");

    if (viewParam === "grid") {
      url += "&view=grid";
    } else if (viewParam === "grid-big") {
      url += "&view=grid-big";
    } else if (viewParam === "grid-small") {
      url += "&view=grid-small";
    }

    window.location.href = url;
  });

window.addEventListener("load", () => {
  const totalProductCount = document
    .querySelector(".show-results-btn-la")
    .getAttribute("data-products-count");
  const filteredProductCount = localStorage.getItem("filteredProductCount");

  document.getElementById("filtered-results-count").innerText =
    filteredProductCount || totalProductCount;
});

document
  .querySelector(".all-delete-url-la")
  .addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("filteredProductCount");

    const totalProductCount = document
      .querySelector(".show-results-btn-la")
      .getAttribute("data-products-count");
    document.getElementById("filtered-results-count").innerText =
      totalProductCount;
    localStorage.setItem("selectedParams", JSON.stringify({}));
    const firstLink = collectionLinks[0];

    if (firstLink) {
      const collectionLinkUrl = firstLink.getAttribute("href");
      const url = new URL(collectionLinkUrl, window.location.origin);

      const pathname = url.pathname;
      const viewParam = url.searchParams.get("view");

      if (window.innerWidth >= 989) {
        if (viewParam === "grid") {
          window.location.href = `${pathname}`;
        } else if (viewParam === "grid-big") {
          window.location.href = `${pathname}?view=grid-big`;
        } else if (viewParam === "grid-small") {
          window.location.href = `${pathname}?view=grid-small`;
        }
      } else {
        if (viewParam === "grid") {
          window.location.href = `${pathname}?view=grid-big`;
        } else if (viewParam === "grid-small") {
          window.location.href = `${pathname}?view=grid-small`;
        }
      }
    } 
  });

const checkboxes = document.querySelectorAll(".sort-checkbox֊la");
const checkboxsNone = document.querySelectorAll(
  ".list_select-filter-la li label input"
);

let selectedParams = {};

checkboxsNone.forEach((input) => {
  input.addEventListener("change", (event) => {
    const currentInput = event.target;
    const isChecked = currentInput.checked;
    const currentInputId = currentInput.id;

    if (isChecked) {
      const getSelectedParams = localStorage.getItem("selectedParams") ?? "{}";
      const parsedData = JSON.parse(getSelectedParams);
      selectedParams = {
        ...parsedData,
        [currentInputId]: isChecked,
      };
      localStorage.setItem("selectedParams", JSON.stringify(selectedParams));
    } else {
      delete selectedParams[currentInputId];
      localStorage.setItem("selectedParams", JSON.stringify(selectedParams));
    }
  });
});

inputChange.forEach((el) => {
  el.addEventListener("change", () => {
    const parentLi = el.closest("li");
    if (el.checked) {
      parentLi.classList.add("checked-la");
    } else {
      parentLi.classList.remove("checked-la");
    }
  });
});

checkboxsNone.forEach((check) => {
  check.addEventListener("change", function () {
    if (this.checked) {
      this.classList.add("active-option-inpute-la");
    } else {
      this.classList.remove("active-option-inpute-la");
    }
  });
});
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    const basePath = window.location.pathname;
    const sortValue = this.dataset.value;
    const currentSearchParams = new URLSearchParams(window.location.search);

    if (this.classList.contains("active-checkbox-la")) {
      this.classList.remove("active-checkbox-la");
      currentSearchParams.set("sort_by", "default"); 
    } else {
      checkboxes.forEach((otherCheckbox) => {
        otherCheckbox.classList.remove("active-checkbox-la");
      });
      this.classList.add("active-checkbox-la");
      currentSearchParams.set("sort_by", sortValue);
    }

    const sortParam = `sort_by=${currentSearchParams.get("sort_by")}`;
    currentSearchParams.delete("sort_by"); 
    const remainingParams = currentSearchParams.toString();
    
    const newUrl = `${basePath}?${sortParam}${remainingParams ? `&${remainingParams}` : ""}`;

    if (newUrl !== window.location.href) {
      window.location.href = newUrl; 
    }
  });
});
   
let hasRun = false;

const setMobileView = () => {
  const isMobile = window.innerWidth <= 989; 
  const url = new URL(window.location); 
  const searchParams = url.searchParams; 
  const currentView = searchParams.get('view'); 

  if (isMobile) {
    if (currentView !== 'grid-big' && currentView !== 'grid-small') {
      searchParams.set('view', 'grid-big'); 
      window.location.href = url.toString(); 
    }
    return; 
  }
  if (!isMobile) {
    if (currentView === null || (currentView !== 'grid' && currentView !== 'grid-big' && currentView !== 'grid-small')) {
      searchParams.set('view', 'grid'); 
      window.location.href = url.toString(); 
    }
  }
};

if (!hasRun) {
  setMobileView();
  hasRun = true;
  
}



window.addEventListener("load", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const currentSortBy = urlParams.get("sort_by");

  inputChange.forEach((checkbox) => {
    const checkboxId = checkbox.id;
    const getSelectedParams = localStorage.getItem("selectedParams") ?? "{}";
    const parsedData = JSON.parse(getSelectedParams);
    const isExistingId = parsedData[checkboxId] ? true : false;
    const parentLi = checkbox.closest("li");

    if (isExistingId) {
      parentLi.classList.add("checked-la");
    } else {
      parentLi.classList.remove("checked-la");
    }
  });
  checkboxsNone.forEach((checkbox) => {
    const checkboxId = checkbox.id;
    const getSelectedParams = localStorage.getItem("selectedParams") ?? "{}";
    const parsedData = JSON.parse(getSelectedParams);
    const isExistingId = parsedData[checkboxId] ? true : false;
    const parentLi = checkbox.closest("li");

    if (isExistingId) {
      checkbox.classList.add("active-option-inpute-la");
    } else {
      checkbox.classList.remove("active-option-inpute-la");
    }
  });
  checkboxes.forEach((checkbox) => {
    const checkboxValue = checkbox.getAttribute("data-value");

    if (checkboxValue === currentSortBy) {
      checkbox.classList.add("active-checkbox-la");
    } else {
      checkbox.classList.remove("active-checkbox-la");
    }
  });
});

clickFilterPosition.addEventListener("click", () => {
  activeFilterPosition.classList.add("active-filter-by-sorting-la");
  bodyPosition.classList.add("body-position--filter-la");
});

closeFilterOverlay.addEventListener("click", () => {
  activeFilterPosition.classList.remove("active-filter-by-sorting-la");
  bodyPosition.classList.remove("body-position--filter-la");
});
activeFilterPosition.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    activeFilterPosition.classList.remove("active-filter-by-sorting-la");
    bodyPosition.classList.remove("body-position--filter-la");
  }
});
window.addEventListener("scroll", () => {
  const currentScrollTop =
    window.pageYOffset || document.documentElement.scrollTop;
  const initialPositionY = elementFilter.getBoundingClientRect().top;
  if (initialPositionY < currentScrollTop) {
    elementFilter.classList.add("filer-position-fixed");
  } else {
    elementFilter.classList.remove("filer-position-fixed");
  }
});
if (urlParams.get("view") === "grid-small") {
  collectionGridTwo.classList.add("collection-grid-two-la");
}

const currentPath = window.location.pathname;

buttonLinks.forEach(function (btLink) {
  const buttonLinkPath = new URL(btLink.getAttribute("href")).pathname;

  if (buttonLinkPath === currentPath) {
    btLink.classList.add("buttonLinkClick");
  }
});
fadeIn &&
  fadeIn.forEach((el) => {
    el.classList.add("fade-in-la");
  });
collectionLinks.forEach(function (cllLink) {
  const collectionLinkUrl = cllLink.getAttribute("href");

  if (collectionLinkUrl === currentUrl) {
    cllLink.classList.add("aria-selected");
  }
});

let swiperIsInitialized = false;
let swiper_collection;

function swiperSlider() {
  if (window.innerWidth <= 989) {
    if (typeof Swiper !== "undefined" && !swiperIsInitialized) {
      swiper_collection = new Swiper(".menu_list_collection-la", {
        loop: true,
        centeredSlides: true,
        slidesPerView: "auto",
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });

      const currentUrl = window.location.href;

      const buttonLinks = document.querySelectorAll(".link_url_menu-la");
      const swiperSlides = document.querySelectorAll(".swiper-slide");

      buttonLinks.forEach((btLink, index) => {
        const buttonLinkUrl = btLink.getAttribute("href");

        if (buttonLinkUrl === currentUrl) {
          btLink.classList.add("buttonLinkClick");

          swiperSlides.forEach((slide) =>
            slide.classList.remove("swiper-slide-active")
          );
          swiperSlides[index].classList.add("swiper-slide-active");

          swiper_collection.slideTo(index);
        }
      });
    }
  } else {
    swiper_collection && swiper_collection.disable();
    swiperIsInitialized = false;
  }
}
swiperSlider();
window.addEventListener("resize ", () => swiperSlider(), true);
