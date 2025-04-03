let swiper = new Swiper(".slider_centerline-wrapper-la", {
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 30,
  zoom: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination-zoom-la",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
let swiper_1 = new Swiper(".image-banner-slider-autoplay-swiper-la", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination_1",
    clickable: true,
  },
});

let swiper_2 = new Swiper(".slider_fixed_in_product-la", {
  slidesPerView: 3, 
  slidesPerGroup: 3,
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 8,
      freeMode: true, 
    },
    660: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 8,
      freeMode: true, 
    },
    990: {
      slidesPerView: 3, 
      slidesPerGroup: 3,
      spaceBetween: 8,
      freeMode: false, 
      allowTouchMove: false,
    },
  },
});
const standartSliders = document.querySelectorAll('.swiper-slider-standart-container-la');

standartSliders.forEach(slider => {
  const standartSliderCenter = slider.getAttribute('aria-selected-standart') === 'true';

  new Swiper(slider, {
    slidesPerView: 4,
    slidesPerGroup: 1,
    spaceBetween: 10,
    centeredSlides: standartSliderCenter || false,
    loop: true,
    pagination: {
      el: slider.querySelector(".swiper-pagination"),
    },
    navigation: {
      nextEl: slider.querySelector(".swiper-button-next"),
      prevEl: slider.querySelector(".swiper-button-prev"),
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 8,
      },
      660: {
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 8,
      },
      990: {
        slidesPerView: 4,
        slidesPerGroup: 1,
        spaceBetween: 8,
      },
    },
  });
});

 
const historySection = document.querySelector('.history_section_wrapper-la');

function initializeSwiper() {
  const isHistorySectionExist = historySection;
  if (!isHistorySectionExist) return;
  if (window.innerWidth < 990) {
    historySection.classList.add('swiper');
    historySection.classList.add('min-swiper-in-history-slider');

    let swiper_4 = new Swiper(".min-swiper-in-history-slider", {
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination_history",
        clickable: true,
      },
    });
  }
}

initializeSwiper();

window.addEventListener('resize', initializeSwiper);

const items = document.querySelectorAll(".fix-slider-items-la");
const prevButton = document.querySelector(".swiper-butt-prev-fidex-continer");
const nextButton = document.querySelector(".swiper-butt-next-fidex-continer");

let slideItemCount = 3; 
const totalItems = items.length; 

function updateVisibility() {
  items.forEach((item, index) => {
    if (index < slideItemCount && index >= slideItemCount - 3) {
      item.classList.remove('index-item-opacity');
      item.classList.add('visible-fixed-la'); 
    } else {
      item.classList.add('index-item-opacity');
      item.classList.remove('visible-fixed-la');
    }
  });
}

nextButton && nextButton.addEventListener('click', function () {
  if (slideItemCount < totalItems) {
    slideItemCount += 3;
    updateVisibility();
  }
});

prevButton && prevButton.addEventListener('click', function () {
  if (slideItemCount > 3) {
    slideItemCount -= 3;
    updateVisibility();
  }
});
updateVisibility();
