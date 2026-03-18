export function initInteractions() {
  initNavigation();
  initHonorToggle();
  initPublicationToggle();
  initPresentationToggle();
  initProjectToggle();
  initProgramToggle();
  initTechnicalSliders();
  initHeroSlideshow();
  initScrollReveal();
}

function initNavigation() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  const links = nav.querySelectorAll('a');
  const sections = [...document.querySelectorAll('.section-anchor')];
  const sectionNavMap = {
    intro: 'intro',
    research: 'research',
    profile: 'research',
    projects: 'projects',
    publications: 'publications',
    presentations: 'presentations',
    programs: 'research-background',
    'research-background': 'research-background',
  };

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

        const activeId = sectionNavMap[entry.target.id];

        if (!activeId) {
          return;
        }

        links.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
        });
      });
    },
    { rootMargin: '-35% 0px -50% 0px', threshold: 0.1 }
  );

  sections.forEach(section => observer.observe(section));
}

function initHonorToggle() {
  const button = document.querySelector('.honor-toggle');
  if (!button) {
    return;
  }
  button.addEventListener('click', () => {
    const items = document.querySelectorAll('[data-extra-honor="true"]');
    const expanded = button.dataset.expanded === 'true';
    items.forEach(item => item.classList.toggle('honor-hidden', expanded));
    button.dataset.expanded = String(!expanded);
    button.textContent = expanded ? 'Show more' : 'Show less';
  });
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
    button.textContent = expanded ? 'Show more presentations' : 'Show less presentations';
  });
}

function initProjectToggle() {
  const button = document.querySelector('.project-toggle');

  if (!button) {
    return;
  }

  button.addEventListener('click', () => {
    const items = document.querySelectorAll('[data-extra-project="true"]');
    const expanded = button.dataset.expanded === 'true';

    items.forEach(item => item.classList.toggle('project-hidden', expanded));
    button.dataset.expanded = String(!expanded);
    button.textContent = expanded ? 'Show more projects' : 'Show less projects';
  });
}

function initProgramToggle() {
  const button = document.querySelector('.program-toggle');

  if (!button) {
    return;
  }

  button.addEventListener('click', () => {
    const items = document.querySelectorAll('[data-extra-program="true"]');
    const expanded = button.dataset.expanded === 'true';

    items.forEach(item => item.classList.toggle('program-hidden', expanded));
    button.dataset.expanded = String(!expanded);
    button.textContent = expanded ? 'Show more' : 'Show less';
  });
}

function initTechnicalSliders() {
  const sliders = document.querySelectorAll('[data-technical-slider]');

  sliders.forEach(slider => {
    const track = slider.querySelector('.technical-slider-track');
    const slides = [...slider.querySelectorAll('.technical-slide')];
    const caption = slider.closest('.technical-card')?.querySelector('[data-technical-caption]');
    const prevButton = slider.querySelector('.technical-slider-prev');
    const nextButton = slider.querySelector('.technical-slider-next');

    if (!track || slides.length < 2 || !prevButton || !nextButton) {
      return;
    }

    let index = 0;

    const update = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex == index;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
      });

      if (caption) {
        caption.textContent = slides[index]?.dataset.technicalTitle || slider.dataset.sliderTitle || '';
      }
    };

    prevButton.addEventListener('click', () => {
      index = (index - 1 + slides.length) % slides.length;
      update();
    });

    nextButton.addEventListener('click', () => {
      index = (index + 1) % slides.length;
      update();
    });

    let touchStartX = 0;

    slider.addEventListener('touchstart', event => {
      touchStartX = event.changedTouches[0]?.clientX || 0;
    }, { passive: true });

    slider.addEventListener('touchend', event => {
      const touchEndX = event.changedTouches[0]?.clientX || 0;
      const deltaX = touchEndX - touchStartX;

      if (Math.abs(deltaX) < 32) {
        return;
      }

      index = deltaX > 0 ? (index - 1 + slides.length) % slides.length : (index + 1) % slides.length;
      update();
    }, { passive: true });

    update();
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


function initScrollReveal() {
  const nodes = [
    ...document.querySelectorAll('.section-block'),
    ...document.querySelectorAll('.section-heading'),
    ...document.querySelectorAll('.subsection'),
    ...document.querySelectorAll('.list-entry'),
    ...document.querySelectorAll('.list-row'),
    ...document.querySelectorAll('.publication-item'),
    ...document.querySelectorAll('.presentation-entry'),
    ...document.querySelectorAll('.button-secondary')
  ].filter((node, index, array) => array.indexOf(node) === index);

  if (!nodes.length) {
    return;
  }

  nodes.forEach((node, index) => {
    node.classList.add('reveal-on-scroll');
    node.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`);
  });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nodes.forEach(node => node.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.14 }
  );

  nodes.forEach(node => observer.observe(node));
}
