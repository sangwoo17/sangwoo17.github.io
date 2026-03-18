const NAV_ITEMS = [
  { id: 'intro', label: 'Intro' },
  { id: 'research', label: 'Profile' },
  { id: 'projects', label: 'Projects' },
  { id: 'publications', label: 'Publications' },
  { id: 'presentations', label: 'Presentations' },
  { id: 'research-background', label: 'Research background' },
];


const TECHNICAL_BACKGROUND_IMAGES = {
  'Experimental Design': [
    'images/photo/Experimental Design_Photoexperiment.jpg',
    'images/photo/Experimental Design_Continuous Equilibrium Method.jpg'
  ],
  Fieldwork: [
    'images/photo/Fieldwork_Arctic Ocean.jpg',
    'images/photo/Fieldwork_Aquaculture (Geojae-Hansan Bay).jpg',
    'images/photo/Fieldwork_Hyeongsan River Estuary.jpg',
    'images/photo/Fieldwork_Paro Lake.jpg'
  ],
  'Mercury Analysis': [
    'images/photo/Mercury Analysis_Continuous DGM measurement.jpg',
    'images/photo/Hg Analysis_Methylation rate measurement.jpg',
    'images/photo/Hg Analysis_Photoreduction rate measurement.jpg'
  ],
  Others: [
    'images/photo/Others_SPE for seawater DOM.jpg'
  ]
};


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
        ${institution ? `<p class="item-subtitle">${escapeHtml(institution)}</p>` : ''}
        ${detail ? `<p>${escapeHtml(detail)}</p>` : ''}
      </div>
    </article>
  `).join('');
}

function renderHonors(items) {
  return [...items]
    .sort((a, b) => String(b.year).localeCompare(String(a.year)))
    .map(({ year, title, meta }, index) => `
    <article class="list-row honor-item ${index > 1 ? 'honor-hidden' : ''}" ${index > 1 ? 'data-extra-honor="true"' : ''}>
      ${year ? `<span class="list-meta">${escapeHtml(year)}</span>` : '<span class="list-meta"></span>'}
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
    const isHidden = index > 1;

    return `
    <article class="presentation-entry ${isHidden ? 'presentation-hidden' : ''}" ${isHidden ? 'data-extra-presentation="true"' : ''}>
      <div class="tag-row">
        <span class="tag tag-${escapeHtml(item.type)}">${escapeHtml(formatLabel(item.type))}</span>
        <span class="tag tag-${escapeHtml(item.region)}">${escapeHtml(formatLabel(item.region))}</span>
      </div>
      <div>
        <h3>${escapeHtml(item.title)}</h3>
        <p class="item-subtitle">${escapeHtml(item.venue)}</p>
        ${item.note ? `<p>${escapeHtml(item.note)}</p>` : ''}
      </div>
    </article>
  `;
  }).join('');
}

function formatTechnicalImageTitle(src) {
  const filename = String(src).split('/').pop() || '';
  const baseName = filename.replace(/\.[^.]+$/, '');
  const afterUnderscore = baseName.includes('_') ? baseName.split('_').slice(1).join('_') : baseName;

  return afterUnderscore
    .replaceAll('_', ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function renderSkills(items) {
  const categoryMap = new Map(items.map(item => [item.category, item]));
  const orderedItems = [
    categoryMap.get('Experimental Design'),
    categoryMap.get('Fieldwork'),
    categoryMap.get('Mercury Analysis')
  ].filter(Boolean);
  const otherItems = items.filter(item => !orderedItems.includes(item));

  if (otherItems.length) {
    orderedItems.push({
      category: 'Others',
      placeholderLabel: otherItems.map(item => item.category).join(' / ')
    });
  }

  return orderedItems.map(({ category, placeholderLabel }) => {
    const sources = TECHNICAL_BACKGROUND_IMAGES[category] || [];
    const titles = sources.map(src => formatTechnicalImageTitle(src));
    const title = titles[0] || placeholderLabel || category;
    const hasSlider = sources.length > 1;

    return `
    <article class="list-entry technical-card">
      <h3>${escapeHtml(category)}</h3>
      <div class="technical-image-placeholder${sources.length ? ' technical-image-frame' : ''}${hasSlider ? ' technical-slider' : ''}" ${sources.length ? '' : `role="img" aria-label="${escapeHtml(category)} image placeholder"`} ${hasSlider ? `data-technical-slider data-slider-title="${escapeHtml(title)}"` : ''}>
        ${hasSlider ? `
          <button class="technical-slider-control technical-slider-prev" type="button" aria-label="Previous ${escapeHtml(category)} image">&#8249;</button>
          <div class="technical-slider-frame">
            <div class="technical-slider-viewport">
              <div class="technical-slider-track">
                ${sources.map((src, index) => `
                  <figure class="technical-slide${index === 0 ? ' is-active' : ''}" data-technical-title="${escapeHtml(titles[index])}" ${index > 0 ? 'aria-hidden="true"' : ''}>
                    <img class="technical-image" src="${escapeHtml(src)}" alt="${escapeHtml(titles[index])}" loading="lazy">
                  </figure>
                `).join('')}
              </div>
            </div>
          </div>
          <button class="technical-slider-control technical-slider-next" type="button" aria-label="Next ${escapeHtml(category)} image">&#8250;</button>
        ` : sources.length ? `<img class="technical-image" src="${escapeHtml(sources[0])}" alt="${escapeHtml(title)}" loading="lazy">` : `<span>${escapeHtml(placeholderLabel || category)}</span>`}
      </div>
      <p class="technical-image-title"${hasSlider ? ' data-technical-caption' : ''}>${escapeHtml(title)}</p>
    </article>
  `;
  }).join('');
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
  return [...items]
    .sort((a, b) => String(b.year).localeCompare(String(a.year)))
    .map(({ year, title, detail }, index) => `
    <article class="list-row program-item ${index > 1 ? 'program-hidden' : ''}" ${index > 1 ? 'data-extra-program="true"' : ''}>
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
      <div class="hero-copy hero-layout">
        <div class="hero-media">
          <img class="hero-photo" src="images/photo/20210601_Photoexperiment.jpg" alt="Sangwoo Eom profile photo">
        </div>
        <div class="hero-content">
          <h1>${escapeHtml(data.site.title)}</h1>
          <p class="hero-tagline">${escapeHtml(data.site.tagline)}</p>
          <p class="hero-subtagline hero-affiliation">${formatInlineBreaks(data.site.subtagline)}</p>
          <div class="hero-actions">
            <a class="button-primary" href="mailto:${escapeHtml(data.contact.email)}">Email</a>
            <a class="button-secondary" href="https://scholar.google.com/citations?user=YOUR_PROFILE_ID" target="_blank" rel="noreferrer">Google Scholar</a>
            <a class="button-secondary" href="Curriculum%20Vitae%20(CV)_Sangwoo%20Eom_.docx">Curriculum Vitae</a>
          </div>
        </div>
      </div>
    </section>

    <section class="content-grid">
      <div class="section-block section-anchor" id="research">
        <div class="section-heading">
          <p class="section-kicker">Overview</p>
          <h2>Research interests</h2>
        </div>
        <div class="overview-grid">
          <div class="simple-list">
            ${renderFocus(data.focusAreas)}
          </div>
        </div>
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
          ${data.honors.length > 2 ? '<button class="button-secondary honor-toggle" type="button">Show more</button>' : ''}
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

      <div class="section-block section-anchor" id="programs">
        <div class="section-heading">
          <p class="section-kicker">Programs</p>
          <h2>Programs and collaborations</h2>
        </div>
        <div class="simple-list">
          ${renderPrograms(data.programs)}
        </div>
        ${data.programs.length > 2 ? '<button class="button-secondary program-toggle" type="button">Show more</button>' : ''}
      </div>

      <div class="section-block section-anchor" id="research-background">
        <div class="section-heading">
          <p class="section-kicker">Methods</p>
          <h2>Research background</h2>
        </div>
        <div class="subsection">
          <div class="list-grid">
            ${renderSkills(data.skills)}
          </div>
        </div>
      </div>


    </section>
  `;
}
















