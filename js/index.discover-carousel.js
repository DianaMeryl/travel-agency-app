import { carouselPhotosSlides } from '../data/discover.photo-slides.js';

const AUTO_PLAY_INTERVAL = 4000;
const TRANSITION_STYLE = 'transform 0.6s ease';

export function initDiscoverCarousel() {
  const container = document.querySelector('[data-component="discover-carousel"]');
  if (!container) return;

  const viewport = container.querySelector('.discover-carousel__viewport');
  const track = container.querySelector('.discover-carousel__track');
  const prevBtn = container.querySelector('.discover-carousel__btn-prev');
  const nextBtn = container.querySelector('.discover-carousel__btn-next');

  if (!viewport || !track || !prevBtn || !nextBtn) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let visibleCount = getVisibleCount();
  let currentIndex = 0;
  let isTransitioning = false;

  let autoplayId = null;
  let resizeTimer = 0;

  function getVisibleCount() {
    if (window.matchMedia('(min-width: 992px)').matches) return 5;
    if (window.matchMedia('(min-width: 678px)').matches) return 4;
    return 1;
  }

  function createSlide({ src, alt }, { isClone = false } = {}) {
    const slide = document.createElement('div');
    slide.className = 'discover-carousel__slide';
    slide.setAttribute('role', 'listitem');
    if (isClone) slide.setAttribute('aria-hidden', 'true');

    const img = document.createElement('img');
    img.className = 'discover-carousel__image';
    img.src = src;
    img.alt = alt;

    slide.appendChild(img);
    return slide;
  }

  function applySlideSizing(slideEl) {
    const GAP = 20;
    slideEl.style.flex = `0 0 calc((100% - ${(visibleCount - 1) * GAP}px) / ${visibleCount})`;
  }

  function updateTransform(shouldAnimate) {
    if (!visibleCount) return;

    const GAP = 20;
     const slideWidth = (viewport.clientWidth - (visibleCount - 1) * GAP) / visibleCount;

    const offset = currentIndex * (slideWidth + GAP);

    if (!shouldAnimate) {
      track.style.transition = 'none';
    } else {
      track.style.transition = TRANSITION_STYLE;
    }

    track.style.transform = `translateX(-${offset}px)`;

    if (!shouldAnimate) {
      track.getBoundingClientRect();
      requestAnimationFrame(() => {
        track.style.transition = '';
      });
    }
  }

  function buildSlides(targetRealIndex = 0) {
    track.innerHTML = '';
    visibleCount = Math.min(getVisibleCount(), carouselPhotosSlides.length);

    if (visibleCount === 0) return;

    const baseSlides = carouselPhotosSlides.map((data) => createSlide(data));
    const leadingClones = carouselPhotosSlides
      .slice(-visibleCount)
      .map((data) => createSlide(data, { isClone: true }));
    const trailingClones = carouselPhotosSlides
      .slice(0, visibleCount)
      .map((data) => createSlide(data, { isClone: true }));

    [...leadingClones, ...baseSlides, ...trailingClones].forEach((slideEl) => {
      applySlideSizing(slideEl);
      track.appendChild(slideEl);
    });

    currentIndex = targetRealIndex + visibleCount;
    updateTransform(false);
  }

  function normalizeIndex(rawIndex, referenceVisibleCount = visibleCount) {
    const total = carouselPhotosSlides.length;
    const relative = rawIndex - referenceVisibleCount;
    return ((relative % total) + total) % total;
  }

  function moveNext({ fromUser = false } = {}) {
    if (isTransitioning || !visibleCount) return;
    isTransitioning = true;
    currentIndex += 1;
    updateTransform(true);
    if (fromUser) resetAutoplay();
  }

  function movePrev({ fromUser = false } = {}) {
    if (isTransitioning || !visibleCount) return;
    isTransitioning = true;
    currentIndex -= 1;
    updateTransform(true);
    if (fromUser) resetAutoplay();
  }

  function handleTransitionEnd(event) {
    if (event.target !== track) return;

    const totalSlides = carouselPhotosSlides.length;

    if (currentIndex >= totalSlides + visibleCount) {
      currentIndex -= totalSlides;
      updateTransform(false);
    } else if (currentIndex < visibleCount) {
      currentIndex += totalSlides;
      updateTransform(false);
    }

    isTransitioning = false;
  }

  function stopAutoplay() {
    if (!autoplayId) return;
    window.clearInterval(autoplayId);
    autoplayId = null;
  }

  function startAutoplay() {
    if (prefersReducedMotion.matches || document.visibilityState !== 'visible' || !visibleCount) return;
    if (autoplayId) return;

    autoplayId = window.setInterval(() => {
      moveNext();
    }, AUTO_PLAY_INTERVAL);
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  function handleInteractionStart() {
    stopAutoplay();
  }

  function handleInteractionEnd() {
    startAutoplay();
  }

  function handlePrefersReducedMotionChange(event) {
    if (event.matches) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  }

  function handleResize() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      const previousVisible = visibleCount;
      const activeRealIndex = normalizeIndex(currentIndex, previousVisible);
      buildSlides(activeRealIndex);
      startAutoplay();
    }, 150);
  }

  nextBtn.addEventListener('click', () => moveNext({ fromUser: true }));
  prevBtn.addEventListener('click', () => movePrev({ fromUser: true }));
  track.addEventListener('transitionend', handleTransitionEnd);

  container.addEventListener('mouseenter', handleInteractionStart);
  container.addEventListener('mouseleave', handleInteractionEnd);
  container.addEventListener('focusin', handleInteractionStart);
  container.addEventListener('focusout', (event) => {
    if (!container.contains(event.relatedTarget)) {
      handleInteractionEnd();
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  if (typeof prefersReducedMotion.addEventListener === 'function') {
    prefersReducedMotion.addEventListener('change', handlePrefersReducedMotionChange);
  } 

  window.addEventListener('resize', handleResize);

  buildSlides();
  startAutoplay();
}
