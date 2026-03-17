export function initInteractions() {
  initNavigation();
  initPublicationToggle();
  initProjectToggle();
}

function initNavigation() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  const links = nav ? nav.querySelectorAll('a') : [];
  const sections = [...document.querySelectorAll('.section-anchor')];

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  links.forEach(link => {
    link.addEventListener('click', () => {
      if (nav && toggle) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  if (!sections.length || !links.length) {
    return;
  }

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
    button.textContent = expanded ? 'Show more publications' : 'Show fewer publications';
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
    button.textContent = expanded ? 'Show more projects' : 'Show fewer projects';
  });
}
