import { render } from './render.js';
import { initInteractions } from './interactions.js';

function reorderPublicationText() {
  document.querySelectorAll('.publication-copy').forEach(node => {
    const authors = node.querySelector('.item-subtitle');
    const title = node.querySelector('h3');
    const journal = node.querySelector('.publication-meta, p:last-of-type');

    if (!authors || !title || !journal) {
      return;
    }

    node.append(title, authors, journal);
  });
}

function highlightPrimaryAuthor() {
  document.querySelectorAll('.publication-copy .item-subtitle').forEach(node => {
    node.innerHTML = node.textContent.replaceAll('Eom, S.', '<strong>Eom, S.</strong>');
  });
}

async function bootstrap() {
  const app = document.getElementById('app');

  try {
    const response = await fetch('data/profile.json');

    if (!response.ok) {
      throw new Error(`Failed to load portfolio data: ${response.status}`);
    }

    const data = await response.json();
    data.site.heroSlides.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    render(data);
    initInteractions();
    reorderPublicationText();
    highlightPrimaryAuthor();
  } catch (error) {
    console.error(error);
    app.innerHTML = `
      <section class="load-error">
        <p>Unable to load portfolio content.</p>
      </section>
    `;
  }
}

bootstrap();
