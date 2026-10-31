(function () {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dots .dot');
  let index = 0;
  let timer;

  function show(i) {
    index = i;
    slides.forEach((el, n) => el.classList.toggle('is-active', n === i));
    dots.forEach((el, n) => {
      el.classList.toggle('is-active', n === i);
      el.setAttribute('aria-selected', n === i ? 'true' : 'false');
    });
  }

  function next() {
    show((index + 1) % slides.length);
  }

  function startAutoplay() {
    clearInterval(timer);
    timer = setInterval(next, 7000);
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      show(Number(dot.dataset.goto));
      startAutoplay();
    });
  });

  if (slides.length > 1) {
    startAutoplay();
  }
})();
