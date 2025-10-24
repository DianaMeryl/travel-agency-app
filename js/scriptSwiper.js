(function () {
  function initCarousels() {
      const swiper = new Swiper(".gallery .swiper", {
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
            slidesPerView: 2
          },
          992: { 
            slidesPerView: 3 
          },
        },
        on: {
          init: () => {
            console.log('✅ Карусель ініціалізована. Карток видимих:');
          },
        },
      });

    }
  document.addEventListener('DOMContentLoaded', () => initCarousels());
  document.body.addEventListener('htmx:afterOnLoad', () => initCarousels());
  document.body.addEventListener('htmx:afterSwap', () => initCarousels());
})();






















// (function () {
//   const GAP = 25; // gap між картками

//   function initCarousel(track) {
//     if (!track || track._initialized) return;

//     const carouselRoot = track.closest('.carousel');
//     const nextBtn = carouselRoot.querySelector('.carousel-control-next');
//     const prevBtn = carouselRoot.querySelector('.carousel-control-prev');
//     const cards = Array.from(track.querySelectorAll('.custom-card'));

//     if (!nextBtn || !prevBtn || cards.length === 0) {
//       console.warn('❗ Карусель: кнопки або картки не знайдено');
//       return;
//     }

//     track._initialized = true;

//     let currentIndex = 0;
//     let cardWidth = cards[0].offsetWidth + GAP;

//     function getVisibleCards() {
//       return cards.filter(c => c.offsetParent !== null).length;
//     }

//     function updateSizes() {
//       cardWidth = cards[0].offsetWidth + GAP;
//       const visibleCards = getVisibleCards();
//       if (currentIndex > cards.length - visibleCards) {
//         currentIndex = Math.max(0, cards.length - visibleCards);
//       }
//       updateCarousel(false);
//     }

//     function updateCarousel(withTransition = true) {
//       const visibleCards = getVisibleCards();
//       const offset = -(currentIndex * cardWidth);
//       track.style.transition = withTransition ? 'transform 0.5s ease' : 'none';
//       track.style.transform = `translateX(${offset}px)`;
//     }

//     function onNext() {
//       const visibleCards = getVisibleCards();
//       currentIndex++;
//       if (currentIndex > cards.length - visibleCards) {
//         currentIndex = 0; // loop назад на початок
//       }
//       updateCarousel(true);
//     }

//     function onPrev() {
//       const visibleCards = getVisibleCards();
//       currentIndex--;
//       if (currentIndex < 0) {
//         currentIndex = cards.length - visibleCards; // loop назад на кінець
//       }
//       updateCarousel(true);
//     }

//     nextBtn.addEventListener('click', onNext);
//     prevBtn.addEventListener('click', onPrev);

//     // ResizeObserver, щоб адаптуватися під зміну ширини
//     const ro = new ResizeObserver(updateSizes);
//     ro.observe(track.parentElement);

//     // Перерахунок після завантаження картинок
//     let imagesLoaded = 0;
//     const images = track.querySelectorAll('img');
//     if (images.length) {
//       images.forEach(img => {
//         if (img.complete) imagesLoaded++;
//         else img.addEventListener('load', () => { imagesLoaded++; if (imagesLoaded === images.length) updateSizes(); });
//       });
//       if (imagesLoaded === images.length) updateSizes();
//     } else {
//       updateSizes();
//     }

//     console.log('✅ Карусель ініціалізована. Карток:', cards.length);
//   }

//   function initAllCarousels() {
//     document.querySelectorAll('.custom-cards-track').forEach(track => initCarousel(track));
//   }

//   document.addEventListener('DOMContentLoaded', initAllCarousels);
//   document.body.addEventListener('htmx:afterOnLoad', initAllCarousels);
//   document.body.addEventListener('htmx:afterSwap', initAllCarousels);
// })();
