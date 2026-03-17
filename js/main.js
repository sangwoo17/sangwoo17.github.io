import { render } from './render.js';
import { initInteractions } from './interactions.js';

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
    render(data);
    initInteractions();
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
