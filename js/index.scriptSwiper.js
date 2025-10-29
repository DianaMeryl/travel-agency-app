export function initCarousels() {
  const exploreContainers = document.querySelectorAll(
    ".gallery .swiper:not(.swiper-initialized)"
  );
   const testimonialsContainers = document.querySelectorAll(
    ".gallery-testimonials .swiper:not(.swiper-initialized)"
  );

  exploreContainers.forEach((container) => {
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

  testimonialsContainers.forEach((container) => {
    new Swiper(".gallery-testimonials .swiper", {
      slidesPerView: 1,
      spaceBetween: 35,
      loop: false,
      keyboard: {
        enabled: true,
      },
      mousewheel: true,
      navigation: {
        nextEl: ".gallery-testimonials__btn-next",
        prevEl: ".gallery-testimonials__btn-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        // 992: {
        //   slidesPerView: 3,
        // },
      },
      on: {
        init: () => {
          console.log("✅ Carousel init");
        },
      },
    });
  });
}
