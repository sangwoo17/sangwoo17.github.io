export function initInteractions() {
  initNavigation();
  initReveal();
  initPresentationFilters();
  initCopyEmail();
  initPublicationToggle();
  initCountUp();
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
    { rootMargin: '-40% 0px -45% 0px', threshold: 0.1 }
  );

  sections.forEach(section => observer.observe(section));
}

function initReveal() {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  items.forEach(item => observer.observe(item));
}

function initPresentationFilters() {
  const section = document.getElementById('presentations');

  if (!section) {
    return;
  }

  const state = {
    region: 'all',
    type: 'all'
  };

  section.addEventListener('click', event => {
    const button = event.target.closest('.filter-button');

    if (!button) {
      return;
    }

    const group = button.dataset.filterGroup;
    const value = button.dataset.filterValue;
    state[group] = value;

    section.querySelectorAll(`.filter-button[data-filter-group="${group}"]`).forEach(item => {
      item.classList.toggle('active', item === button);
    });

    section.querySelectorAll('.presentation-item').forEach(card => {
      const regionMatch = state.region === 'all' || card.dataset.region === state.region;
      const typeMatch = state.type === 'all' || card.dataset.type === state.type;
      card.hidden = !(regionMatch && typeMatch);
    });
  });
}

function initCopyEmail() {
  document.addEventListener('click', async event => {
    const button = event.target.closest('.copy-email');

    if (!button) {
      return;
    }

    try {
      await navigator.clipboard.writeText(button.dataset.email);
      showToast('Email copied');
    } catch (error) {
      console.error(error);
      showToast('Copy failed');
    }
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
    button.textContent = expanded ? 'Show more publications' : 'Show fewer publications';
  });
}

function initCountUp() {
  const stats = document.querySelectorAll('.stat-card');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }

        const valueNode = entry.target.querySelector('.stat-value');
        const rawValue = entry.target.dataset.count;
        const numeric = Number.parseInt(rawValue, 10);

        if (Number.isNaN(numeric)) {
          valueNode.textContent = rawValue;
          observer.unobserve(entry.target);
          return;
        }

        const suffix = rawValue.replace(String(numeric), '');
        const duration = 900;
        const start = performance.now();

        const tick = now => {
          const progress = Math.min((now - start) / duration, 1);
          valueNode.textContent = `${Math.round(progress * numeric)}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };

        requestAnimationFrame(tick);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach(stat => observer.observe(stat));
}

function showToast(message) {
  const existing = document.querySelector('.toast');

  if (existing) {
    existing.remove();
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, 1800);
}
