async function init() {
  try {
    const mod = await import('./index.scriptSwiper.js');
    if (mod && typeof mod.initCarousels === 'function') {
      mod.initCarousels();
    } else if (mod && typeof mod.default === 'function') {
      mod.default();
    } else {
      console.warn('Swiper downloaded, but initCarousels not found');
    }
  } catch (err) {
    console.error('Error import Swiper:', err);
  }
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]',
).length;
let loadedPartialsCount = 0;

document.body.addEventListener('htmx:afterOnLoad', () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});
