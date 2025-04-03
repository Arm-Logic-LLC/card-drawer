  const modal = document.getElementById('productModal');
  const closeModal = document.querySelector('.modal-close');
  const slider = document.querySelector('.slider');
  const sliderItems = document.querySelectorAll('.slider-item');
  const prevButton = document.querySelector('.slider-control.prev');
  const nextButton = document.querySelector('.slider-control.next');
  let currentIndex = 0;
  let zoomLevel = 0;

  // Open Modal
  document.querySelectorAll('.media-product-items-la img').forEach((image) => {
    image.addEventListener('click', () => {
      modal.classList.add('active');
      currentIndex = 0; // Reset slider to first image
      updateSlider();
    });
  });

  // Close Modal
  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    resetZoom();
  });

  // Slider Controls
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : sliderItems.length - 1;
    updateSlider();
    resetZoom();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < sliderItems.length - 1) ? currentIndex + 1 : 0;
    updateSlider();
    resetZoom();
  });

  function updateSlider() {
    const offset = -currentIndex * 100;
    slider.style.transform = `translateX(${offset}%)`;
  }

  // Zoom Functionality
  sliderItems.forEach((item) => {
    const image = item.querySelector('.slider-image');
    image.addEventListener('click', () => {
      zoomLevel = (zoomLevel + 1) % 3; // 0 -> No Zoom, 1 -> 25%, 2 -> 50%
      if (zoomLevel === 0) {
        resetZoom();
      } else if (zoomLevel === 1) {
        image.classList.add('zoom-25');
        image.classList.remove('zoom-50');
      } else if (zoomLevel === 2) {
        image.classList.add('zoom-50');
        image.classList.remove('zoom-25');
      }
    });
  });

  function resetZoom() {
    zoomLevel = 0;
    sliderItems.forEach((item) => {
      const image = item.querySelector('.slider-image');
      image.classList.remove('zoom-25', 'zoom-50');
    });
  }





  