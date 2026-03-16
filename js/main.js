import { render } from './render.js';
import { initInteractions } from './interactions.js';

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
