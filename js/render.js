const NAV_ITEMS = [
  { id: 'intro', label: 'Intro' },
  { id: 'research', label: 'Research' },
  { id: 'publications', label: 'Publications' },
  { id: 'presentations', label: 'Presentations' },
  { id: 'projects', label: 'Projects' },
  { id: 'photo-album', label: 'Photos' }
];

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatInlineBreaks(value) {
  return escapeHtml(value).replaceAll('&lt;br&gt;', '<br>');
}

function renderStats(stats) {
  return stats.map(({ value, label }) => `
    <div class="metric-item">
      <strong>${escapeHtml(value)}</strong>
      <span>${escapeHtml(label).replace(' ', '<br>')}</span>
    </div>
  `).join('');
}

function renderBio(paragraphs) {
  return paragraphs.map(text => `<p>${escapeHtml(text)}</p>`).join('');
}

function renderFocus(items) {
  return items.map(({ title, description }) => `
    <article class="list-entry">
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(description)}</p>
    </article>
  `).join('');
}

function renderEducation(items) {
  return items.map(({ period, degree, institution, detail }) => `
    <article class="list-row">
      <div class="list-meta">${escapeHtml(period)}</div>
      <div>
        <h3>${escapeHtml(degree)}</h3>
        <p class="item-subtitle">${escapeHtml(institution)}</p>
        <p>${escapeHtml(detail)}</p>
      </div>
    </article>
  `).join('');
}

function renderHonors(items) {
  return items.map(({ year, title, meta }) => `
    <article class="list-row">
      <span class="list-meta">${escapeHtml(year)}</span>
      <div>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(meta)}</p>
      </div>
    </article>
  `).join('');
}

function renderProjects(items) {
  return items.map(({ period, title, support, outcome }, index) => `
    <article class="list-row project-item ${index > 1 ? 'project-hidden' : ''}" ${index > 1 ? 'data-extra-project="true"' : ''}>
      <div class="list-meta project-year">${escapeHtml(period)}</div>
      <div>
        <h3>${escapeHtml(title)}</h3>
        <p class="item-subtitle">${escapeHtml(support)}</p>
        <p>${escapeHtml(outcome)}</p>
      </div>
    </article>
  `).join('');
}

function renderPublications(items, type) {
  return items.map((item, index) => `
    <article class="list-row publication-item ${index > 1 && type === 'published' ? 'publication-hidden' : ''}" ${index > 1 && type === 'published' ? 'data-extra-publication="true"' : ''}>
      <span class="list-meta">${escapeHtml(item.year || item.status)}</span>
      <div class="publication-content ${type !== 'published' ? 'publication-content-text-only' : ''}">
        ${type === 'published' ? `
          ${(item.link || item.url) ? `
            <a
              class="publication-thumb-link"
              href="${escapeHtml(item.link || item.url)}"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open ${escapeHtml(item.title)}"
            >
              ${item.figure ? `
                <img
                  class="publication-thumb publication-thumb-image"
                  src="${escapeHtml(item.figure)}"
                  alt="${escapeHtml(item.figureAlt || `Figure for ${item.title}`)}"
                >
              ` : `
                <div class="publication-thumb" aria-hidden="true">
                  <span>Figure</span>
                </div>
              `}
            </a>
          ` : `
            <div class="publication-thumb" aria-label="Figure placeholder for ${escapeHtml(item.journal)} ${escapeHtml(item.year)}">
              ${item.figure ? `
                <img
                  class="publication-thumb publication-thumb-image"
                  src="${escapeHtml(item.figure)}"
                  alt="${escapeHtml(item.figureAlt || `Figure for ${item.title}`)}"
                >
              ` : `
                <span>Figure</span>
              `}
            </div>
          `}
        ` : ''}
        <div class="publication-copy">
        <p class="item-subtitle">${escapeHtml(item.authors)}</p>
        <h3>
          ${(item.link || item.url) ? `
            <a class="publication-title-link" href="${escapeHtml(item.link || item.url)}" target="_blank" rel="noopener noreferrer">
              ${escapeHtml(item.title)}
            </a>
          ` : `
            ${escapeHtml(item.title)}
          `}
        </h3>
        <p class="publication-meta">${escapeHtml(item.journal)}${item.detail ? `, ${escapeHtml(item.detail)}` : ''}</p>
        </div>
      </div>
    </article>
  `).join('');
}

function splitVenue(value) {
  const parts = String(value).split(',').map(part => part.trim());

  if (parts.length < 2) {
    return {
      event: value,
      location: ''
    };
  }

  return {
    event: parts.slice(0, -1).join(', '),
    location: parts.at(-1)
  };
}

function formatLabel(value) {
  if (!value) {
    return '';
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function renderPresentations(items) {
  const internationalItems = items.filter(item => item.region === 'international');

  return internationalItems.map((item, index) => {
    const venue = splitVenue(item.venue);
    const isHidden = index > 1;

    return `
    <article class="presentation-entry ${isHidden ? 'presentation-hidden' : ''}" ${isHidden ? 'data-extra-presentation="true"' : ''}>
      <div class="tag-row">
        <span class="tag tag-${escapeHtml(item.type)}">${escapeHtml(formatLabel(item.type))}</span>
        <span class="tag tag-${escapeHtml(item.region)}">${escapeHtml(formatLabel(item.region))}</span>
      </div>
      <div>
        <h3>${escapeHtml(item.title)}</h3>
        <p class="item-subtitle">${escapeHtml(venue.event)}</p>
        ${venue.location ? `<p>${escapeHtml(venue.location)}</p>` : ''}
        ${item.note ? `<p>${escapeHtml(item.note)}</p>` : ''}
      </div>
    </article>
  `;
  }).join('');
}

function renderSkills(items) {
  return items.map(({ category, description }) => `
    <article class="list-entry">
      <h3>${escapeHtml(category)}</h3>
      <p>${escapeHtml(description)}</p>
    </article>
  `).join('');
}

function renderResponsibilities(items) {
  return items.map(({ period, title, detail }) => `
    <article class="list-row">
      <span class="list-meta">${escapeHtml(period)}</span>
      <div>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(detail)}</p>
      </div>
    </article>
  `).join('');
}

function renderPrograms(items) {
  return items.map(({ year, title, detail }) => `
    <article class="list-row">
      <span class="list-meta">${escapeHtml(year)}</span>
      <div>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(detail)}</p>
      </div>
    </article>
  `).join('');
}

function renderHeroSlides(items = []) {
  return items.map((item, index) => `
    <img
      class="hero-slide ${index === 0 ? 'is-active' : ''}"
      src="${escapeHtml(item.src)}"
      alt="${escapeHtml(item.alt)}"
      ${index === 0 ? '' : 'aria-hidden="true"'}
    >
  `).join('');
}

export function render(data) {
  const nav = document.getElementById('site-nav');
  const app = document.getElementById('app');

  nav.innerHTML = NAV_ITEMS.map(({ id, label }) => `
    <a href="#${id}">${label}</a>
  `).join('');

  app.innerHTML = `
    <section class="hero section-anchor" id="intro">
      <div class="hero-copy">
        <div class="hero-slideshow" data-slideshow>
          ${renderHeroSlides(data.site.heroSlides)}
        </div>
        <h1>${escapeHtml(data.site.title)}</h1>
        <p class="hero-tagline">${escapeHtml(data.site.tagline)}</p>
        <p class="hero-subtagline hero-affiliation">${formatInlineBreaks(data.site.subtagline)}</p>
        <div class="hero-actions">
          <a class="button-primary" href="mailto:${escapeHtml(data.contact.email)}">Email</a>
          <a class="button-secondary" href="Curriculum%20Vitae%20(CV)_Sangwoo%20Eom_.docx">Curriculum Vitae</a>
        </div>
      </div>
    </section>

    <section class="content-grid">
      <div class="section-block section-anchor" id="research">
        <div class="section-heading">
          <p class="section-kicker">Overview</p>
          <h2>Research profile</h2>
        </div>
        <div class="overview-grid">
          <div class="rich-copy">
            ${renderBio(data.bio)}
          </div>
        </div>
        <aside class="metrics-panel" aria-label="Research highlights">
          ${renderStats(data.stats)}
        </aside>
      </div>

      
      <div class="section-block section-anchor" id="profile">
        <div class="section-heading">
          <p class="section-kicker">Profile</p>
          <h2>Academic profile</h2>
        </div>
        <div class="subsection">
          <div class="subsection-heading">
            <h3>Education</h3>
          </div>
          <div class="simple-list">
            ${renderEducation(data.education)}
          </div>
        </div>
        <div class="subsection">
          <div class="subsection-heading">
            <h3>Honors</h3>
          </div>
          <div class="simple-list">
            ${renderHonors(data.honors)}
          </div>
        </div>
      </div>



        <div class="subsection section-anchor" id="projects">
          <div class="section-heading">
            <h2>Projects</h2>
          </div>
          <div class="simple-list">
            ${renderProjects(data.projects)}
          </div>
          ${data.projects.length > 2 ? '<button class="button-secondary project-toggle" type="button">Show more projects</button>' : ''}
        </div>
      <div class="section-block section-anchor" id="publications">
        <div class="section-heading">
          <p class="section-kicker">Publications</p>
          <h2>Publications</h2>
        </div>
        <div class="publication-group">
          <div class="simple-list">
            ${renderPublications(data.publications.published, 'published')}
          </div>
          <button class="button-secondary publication-toggle" type="button">Show more publications</button>
        </div>
        <div class="publication-group">
          <div class="group-label">In progress</div>
          <div class="simple-list">
            ${renderPublications(data.publications.inPrep, 'inPrep')}
          </div>
        </div>
      </div>



      <div class="section-block section-anchor" id="technical-background">
        <div class="section-heading">
          <p class="section-kicker">Methods</p>
          <h2>Technical background</h2>
        </div>
        <div class="subsection">
          <div class="subsection-heading">
            <h3>Tools and methods</h3>
          </div>
          <div class="list-grid">
            ${renderSkills(data.skills)}
          </div>
        </div>
        <div class="subsection">
          <div class="subsection-heading">
            <h3>Programs and collaborations</h3>
          </div>
          <div class="simple-list">
            ${renderPrograms(data.programs)}
          </div>
        </div>
      </div>

      <div class="section-block section-anchor" id="presentations">
        <div class="section-heading">
          <p class="section-kicker">Presentations</p>
          <h2>Presentations</h2>
        </div>
        <div class="simple-list">
          ${renderPresentations(data.presentations)}
        </div>
        ${data.presentations.filter(item => item.region === 'international').length > 2 ? '<button class="button-secondary presentation-toggle" type="button">Show more presentations</button>' : ''}
      </div>

      <div class="section-block section-anchor" id="photo-album">
        <div class="section-heading">
          <p class="section-kicker">Photo Album</p>
          <h2>Photos</h2>
        </div>
        <div class="photo-slider">
          <button class="photo-slider-button photo-slider-button-prev" type="button" data-photo-nav="prev" aria-label="Scroll photos left">&#8249;</button>
          <button class="photo-slider-button photo-slider-button-next" type="button" data-photo-nav="next" aria-label="Scroll photos right">&#8250;</button>
          <div class="photo-track" data-photo-track aria-label="Photo album placeholders" tabindex="0">
            <div class="photo-slot"><span>Add photo</span></div>
            <div class="photo-slot"><span>Add photo</span></div>
            <div class="photo-slot"><span>Add photo</span></div>
            <div class="photo-slot"><span>Add photo</span></div>
            <div class="photo-slot"><span>Add photo</span></div>
            <div class="photo-slot"><span>Add photo</span></div>
          </div>
        </div>
      </div>

    </section>
  `;
}
















