export function initInteractions() {
  initNavigation();
  initPublicationToggle();
  initPresentationToggle();
  initHeroSlideshow();
}

function initNavigation() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  const links = nav.querySelectorAll('a');
  const sections = [...document.querySelectorAll('.section-anchor')];

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }

        links.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: '-35% 0px -50% 0px', threshold: 0.1 }
  );

  sections.forEach(section => observer.observe(section));
}

function initPublicationToggle() {
  const button = document.querySelector('.publication-toggle');

  if (!button) {
    return;
  }

  button.addEventListener('click', () => {
    const items = document.querySelectorAll('[data-extra-publication="true"]');
    const expanded = button.dataset.expanded === 'true';

    items.forEach(item => item.classList.toggle('publication-hidden', expanded));
    button.dataset.expanded = String(!expanded);
    button.textContent = expanded ? 'Show more' : 'Show less';
  });
}

function initPresentationToggle() {
  const button = document.querySelector('.presentation-toggle');

  if (!button) {
    return;
  }

  button.addEventListener('click', () => {
    const items = document.querySelectorAll('[data-extra-presentation="true"]');
    const expanded = button.dataset.expanded === 'true';

    items.forEach(item => item.classList.toggle('presentation-hidden', expanded));
    button.dataset.expanded = String(!expanded);
    button.textContent = expanded ? 'Show more presentations' : 'Show less';
  });
}

function initHeroSlideshow() {
  const slideshow = document.querySelector('[data-slideshow]');

  if (!slideshow) {
    return;
  }

  const slides = [...slideshow.querySelectorAll('.hero-slide')];

  if (slides.length < 2) {
    return;
  }

  let activeIndex = 0;

  window.setInterval(() => {
    slides[activeIndex].classList.remove('is-active');
    slides[activeIndex].setAttribute('aria-hidden', 'true');

    activeIndex = (activeIndex + 1) % slides.length;

    slides[activeIndex].classList.add('is-active');
    slides[activeIndex].removeAttribute('aria-hidden');
  }, 2600);
}
