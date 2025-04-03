document.addEventListener("DOMContentLoaded", () => {
  const bodyProduct = document.body;
  const zoomItems = document.querySelector(".product-zoom-la");
  const imageZoom = document.querySelectorAll(".image_product_unset img");
  const closeZoomModal = document.querySelector(".close_zoom_button-la");
  const itemProduct = document.querySelectorAll(
    ".media-product-items-la, .mobile-media-product-items-la"
  );
  const itemProductImages = document.querySelectorAll('.mobile-media-product-items-la')
  const headerPosition = document.querySelector(".header-la");
  const announcementPosition = document.querySelector(".announcement_bar-la");
  const recentlyPosition = document.querySelector(".recently-viewed-la");
  const description = document.querySelector(
    ".product-description-text-wrapper-la"
  );
  const viewButton = document.getElementById("toggle-button-la");
  const collapsibleBtn = document.querySelectorAll(".collapsible-part-la");
  const closeButton = document.querySelectorAll(".x-icon-collapsible");
  const containerCollapsible = document.querySelectorAll(
    ".collapsible-container-la"
  );
  const videoIcon = document.querySelectorAll('.icon-video-play-parent-la')
  
  const sliderWithTitle = document.querySelector(".style-with-slider-la");
  const sliderWithContainer = document.querySelector(
    ".swiper-slider-with-container-la"
  );
  const sliderAlsoContainer = document.querySelector(
    ".swiper-slider-also-container-la"
  );
  const sliderAlsoTitle = document.querySelector(".style-also-slider-la");
  const productSticky = document.querySelector(".left-section-wrapper-info-la");

if (productSticky) {
  let lastScrollTop = 0; 

  window.addEventListener("scroll", () => {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > lastScrollTop) {
      productSticky.classList.remove("product-sticky-la");
    } else {
      productSticky.classList.add("product-sticky-la");
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; 
  });
}


  if (sliderWithTitle && sliderWithContainer) {
    sliderWithTitle.classList.add("active-title");
    sliderWithContainer.classList.add("active-container");
  }

  function activateSlider(
    activeTitle,
    activeContainer,
    inactiveTitle,
    inactiveContainer
  ) {
    inactiveTitle.classList.remove("active-title");
    inactiveContainer.classList.remove("active-container");
    activeTitle.classList.add("active-title");
    activeContainer.classList.add("active-container");
  }

  if (
    sliderWithTitle &&
    sliderWithContainer &&
    sliderAlsoTitle &&
    sliderAlsoContainer
  ) {
    sliderWithTitle.addEventListener("click", () => {
      activateSlider(
        sliderWithTitle,
        sliderWithContainer,
        sliderAlsoTitle,
        sliderAlsoContainer
      );
    });

    sliderAlsoTitle.addEventListener("click", () => {
      activateSlider(
        sliderAlsoTitle,
        sliderAlsoContainer,
        sliderWithTitle,
        sliderWithContainer
      );
    });
  }
  collapsibleBtn &&
  collapsibleBtn.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation()
      let scrollTop = window.scrollY || document.documentElement.scrollTop;
      bodyProduct.style.top = `-${scrollTop}px`;
      bodyProduct.style.position = "fixed";
      bodyProduct.style.width = "100%";
      bodyProduct.style.overflowY = "scroll";
      el.classList.add("active-collapsible-la");
      el.parentElement.classList.add("active-container-la");
      headerPosition.parentElement.classList.add(
        "header-collapsible-overflow-la"
      );
      recentlyPosition && recentlyPosition.classList.add("recently-collapsible-overflow-la");
      announcementPosition.parentElement.classList.add(
        "announcement-collapsible-overflow-la"
      );
    });
  });
  if (window.innerWidth <= 989) {
    if (collapsibleBtn) {
      collapsibleBtn.forEach((el) => {
        el.addEventListener("click", () => {
          if (productSticky)
            productSticky.classList.add("product-position-remove");

        headerPosition.parentElement.classList.remove(
          "header-collapsible-overflow-la"
        );
        announcementPosition.parentElement.classList.remove(
          "announcement-collapsible-overflow-la"
        );
        });
      });
    }

    if (closeButton) {
      closeButton.forEach((el) => {
        el.addEventListener("click", () => {
          if (productSticky)
            productSticky.classList.remove("product-position-remove");
        });
      });
    }

    window.addEventListener("resize", () => {
      if (productSticky) {
        if (window.innerWidth > 989) {
          if (productSticky)
            productSticky.classList.add("product-position-remove");
        } else {
          if (productSticky)
            productSticky.classList.remove("product-position-remove");
        }
      }
    });
  }

  closeButton &&
    closeButton.forEach((el) => {
      el.addEventListener("click", () => {
        let scrollTop = Math.abs(parseInt(bodyProduct.style.top, 10)) || 0;
        bodyProduct.style.position = "";
        bodyProduct.style.top = "";
        bodyProduct.style.overflow = "";
        window.scrollTo(0, scrollTop);
        recentlyPosition && recentlyPosition.classList.remove("recently-collapsible-overflow-la");
        collapsibleBtn.forEach((el) => {
          el.classList.remove("active-collapsible-la");
          el.parentElement.classList.remove("active-container-la");
          setTimeout(() => {
            headerPosition.parentElement.classList.remove(
              "header-collapsible-overflow-la"
            );
            announcementPosition.parentElement.classList.remove(
              "announcement-collapsible-overflow-la"
            );
          }, 300);
        });
      });
    });
  
    if (containerCollapsible) {
      containerCollapsible.forEach((container) => {
        container.addEventListener("click", (e) => {
     if (e.target === e.currentTarget) { 
          let scrollTop = Math.abs(parseInt(bodyProduct.style.top, 10)) || 0;
          bodyProduct.style.position = "";
          bodyProduct.style.top = "";
          bodyProduct.style.overflow = "";
    
          if (productSticky) {
            productSticky.classList.remove("product-position-remove");
          }
    
          collapsibleBtn.forEach((el) => {
            el.classList.remove("active-collapsible-la");
            el.parentElement.classList.remove("active-container-la");
    
            setTimeout(() => {
              headerPosition.parentElement.classList.remove(
                "header-collapsible-overflow-la"
              );

              recentlyPosition && recentlyPosition.classList.remove("recently-collapsible-overflow-la");
              announcementPosition.parentElement.classList.remove(
                "announcement-collapsible-overflow-la"
              );
            }, 300);
          });
    
          window.scrollTo({ top: scrollTop, left: 0, behavior: "instant" });
         }
        });
      });
    }
    

  if (description) {
    if (description.scrollHeight > description.clientHeight) {
      viewButton.style.display = "block";
    }
  }

  viewButton &&
    viewButton.addEventListener("click", function () {
      if (description.style.height) {
        description.style.height = null;
        viewButton.textContent = "view more";
      } else {
        description.style.height = "unset";
        viewButton.textContent = "view less";
      }
    });
    const productImagesZoomSwiper = new Swiper(".product-zoom-la", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        989: {
          allowTouchMove: false,
        },
      },
      on: {
        slideChange: function () {
          document.querySelectorAll(".imageZoom").forEach((el) => {
            el.style.transform = `translate(-50%, -50%) scale(1)`;
          });
        },
      },
    });
    
    
    
  const mobileImagesSliderSwiper = new Swiper(".mobile-media-product-la", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
    zoom: true,
    
  });
  // videoIcon.forEach((icon) => {
  //   icon.addEventListener('click', (event) => {
  //     event.preventDefault();  
  //     event.stopImmediatePropagation(); 
  //     const slides = document.querySelectorAll('.swiper-slide');
      
  //     slides.forEach((slide, index) => {
  //       const slideMediaType = slide.getAttribute('data-media-type');
  //       if (slideMediaType === 'video' || slideMediaType === 'external_video') {
  //           mobileImagesSliderSwiper.slideTo(index);
  //       }
  //     });
  //   });
  // });

  // itemProductImages.forEach((el) => {
  //   const slideMediaType = el.getAttribute('data-media-type');
  //       if (slideMediaType === 'video' || slideMediaType === 'external_video') {
  //         itemProductImages.forEach((el) => {
  //           const chaildElm = el.querySelector('.icon-video-play-parent-la')
  //           const slideImageType = el.getAttribute('data-media-type');
  //           if(slideImageType === 'image'){
  //             chaildElm.classList.add('icon-video-available-play-la') 
  //           }
  //         })
  //       }
  // })

  const stileWithSliderSwiper = new Swiper(".swiper-slider-also-container-la", {
    slidesPerView: 2.5,
    spaceBetween: 8,
    navigation: {
      nextEl: ".swiper-button-next-also-with-la",
      prevEl: ".swiper-button-prev-also-with-la",
    },
    breakpoints:{
      '989':{
          slidesPerView: 3,
      }
    },
  });
  const stileAlsoSliderSwiper = new Swiper(".swiper-slider-with-container-la", {
    slidesPerView: 2.5,
    spaceBetween: 8,
    breakpoints:{
      '989':{
          slidesPerView: 3,
      }
    },
    navigation: {
      nextEl: ".swiper-button-next-also-with-la",
      prevEl: ".swiper-button-prev-also-with-la",
    },
  });
  itemProduct &&
    itemProduct.forEach((el) => {
      el.addEventListener("click", () => {
        zoomItems.classList.add("zoom-active-la");
        bodyProduct.classList.add("bodyOverflow");
        let slideIndex = [...el.parentElement.children].indexOf(el);

        productImagesZoomSwiper.slideTo(slideIndex);
        mobileImagesSliderSwiper.slideTo(slideIndex);
      });
    });

  closeZoomModal &&
    closeZoomModal.addEventListener("click", () => {
      zoomItems.classList.remove("zoom-active-la");
      bodyProduct.classList.remove("bodyOverflow");
      imageZoom.forEach((el) => {
        if (window.innerWidth > 989) {
          el.style.transform = `scale(1.6) translate(-31.25%, -31.25%)`;
        } else {
          el.style.transform = `scale(1) translate(-50%, -50%)`;
        }
        el.style.left = "50%";
        el.style.top = "50%";
      });
    });

  const handleDesktopZoom = (el) => {
    let zoomLevel = 1;
    let isDragging = false;
    let startX, startY, initialX, initialY;

    el.addEventListener("click", (e) => {
      if (isDragging) {
        isDragging = false;
        return;
      }
      if (zoomLevel === 1) {
        zoomLevel = 2;
        el.style.transform = `scale(2.2) translate(-22.72%, -22.72%)`;
        el.style.cursor = 'zoom-in'

      } else if (zoomLevel === 2) {
        zoomLevel = 3;
        el.style.transform = `scale(3) translate(-16.66%, -16.66%)`;
        el.style.cursor = 'zoom-out'
      } else {
        zoomLevel = 1;
        el.style.transform = `scale(1.6) translate(-31.25%, -31.25%)`;
        el.style.left = "50%";
        el.style.top = "50%";
        el.style.cursor = 'zoom-in'

      }
    });

    el.addEventListener("mousedown", (e) => {
      e.preventDefault();
      isDragging = false;
      startX = e.clientX;
      startY = e.clientY;
      initialX = el.offsetLeft;
      initialY = el.offsetTop;
      document.addEventListener("mousemove", onMouseMove);
    });

    const onMouseMove = (e) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        isDragging = true;
      }

      if (zoomLevel === 2) {
        if (
          initialX + dx > window.innerWidth / 4.5 &&
          initialX + dx < window.innerWidth / 1.3
        ) {
          el.style.left = initialX + dx + "px";
        }
        if (
          initialY + dy > window.innerWidth / 7 &&
          initialY + dy < window.innerWidth / 3.3
        ) {
          el.style.top = initialY + dy + "px";
        }
      }
      if (zoomLevel === 3) {
        if (
          initialX + dx > window.innerWidth / 3.1 &&
          initialX + dx < window.innerWidth / 1.5
        ) {
          el.style.left = initialX + dx + "px";
        }
        if (
          initialY + dy > window.innerWidth / 9 &&
          initialY + dy < window.innerWidth / 3
        ) {
          el.style.top = initialY + dy + "px";
        }
      }
    };

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", onMouseMove);
    });
  };

  const handleMobileZoom = (el) => {
    let zoomLevel = 1,
      initialDistance = 0;
    let translateX = 0,
      translateY = 0;
    let startX = 0,
      startY = 0;
    let isDragging = false;
    let lastTap = 0;
    let isPinching = false;
  
    const setTransform = (animate = false) => {
      el.style.transition = animate ? "transform 0.3s ease-out" : "none";
      el.style.transform = `translate(-50%, -50%) translate(${translateX}px, ${translateY}px) scale(${zoomLevel})`;
  
      productImagesZoomSwiper.allowTouchMove = zoomLevel === 1;
    };
  
    function getDistance(touches) {
      if (touches.length < 2) return 0;
      const dx = touches[1].clientX - touches[0].clientX;
      const dy = touches[1].clientY - touches[0].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    }
  
    el.addEventListener("touchstart", (e) => {
      if (e.touches.length === 2) {
        isPinching = true;
        initialDistance = getDistance(e.touches);
        el.style.transition = "none";
        return;
      }
  
      if (isPinching) return;
  
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      lastTap = currentTime;
  
      if (tapLength < 300 && tapLength > 0) {
        zoomLevel = zoomLevel === 1 ? 2 : 1;
        translateX = 0;
        translateY = 0;
        setTransform(true);
        return;
      }
  
      if (e.touches.length === 1 && zoomLevel > 1) {
        isDragging = true;
        startX = e.touches[0].clientX - translateX;
        startY = e.touches[0].clientY - translateY;
        el.style.transition = "none";
      }
    });
  
    el.addEventListener("touchmove", (e) => {
      if (zoomLevel > 1) {
        e.stopPropagation(); 
        e.preventDefault();
      }
  
      if (isPinching && e.touches.length === 2) {
        const newDistance = getDistance(e.touches);
        if (initialDistance > 0) {
          const scaleChange = newDistance / initialDistance;
          zoomLevel = Math.max(1, Math.min(3, zoomLevel * scaleChange));
        }
        initialDistance = newDistance;
        setTransform(false);
        return;
      }
  
      if (e.touches.length === 1 && isDragging && zoomLevel > 1) {
        translateX = e.touches[0].clientX - startX;
        translateY = e.touches[0].clientY - startY;
        setTransform(false);
      }
    });
  
    el.addEventListener("touchend", (e) => {
      if (e.touches.length === 0) {
        isPinching = false;
      }
      isDragging = false;
      if (zoomLevel === 1) {
        translateX = 0;
        translateY = 0;
        el.dataset.zoomed = "false";
      }
      setTransform(false);
    });
  };
  
  
  imageZoom &&
    imageZoom.forEach((el) => {
      if (window.innerWidth > 989) {
        handleDesktopZoom(el);
      } else {
        handleMobileZoom(el);
      }
    });
});
