export function initCarousels() {
  const containers = document.querySelectorAll(
    ".gallery .swiper:not(.swiper-initialized)"
  );

  containers.forEach((container) => {
    new Swiper(".gallery .swiper", {
      slidesPerView: 1,
      spaceBetween: 25,
      loop: true,
      keyboard: {
        enabled: true,
      },
      mousewheel: true,
      navigation: {
        nextEl: ".gallery__btn-next",
        prevEl: ".gallery__btn-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
      },
      on: {
        init: () => {
          console.log("✅ Carousel init");
        },
      },
    });
  });
}
