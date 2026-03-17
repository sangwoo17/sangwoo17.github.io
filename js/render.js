const NAV_ITEMS = [
  { id: 'intro', label: 'Intro' },
  { id: 'research', label: 'Research' },
  { id: 'publications', label: 'Publications' },
  { id: 'contact', label: 'Contact' }
];

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderBio(paragraphs = []) {
  return paragraphs.map(text => `<p>${escapeHtml(text)}</p>`).join('');
}

function renderEducation(items = []) {
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

function renderHonors(items = []) {
  return items.map(({ year, title, meta }) => `
    <article class="list-row compact-row">
      <div class="list-meta">${escapeHtml(year)}</div>
      <div>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(meta)}</p>
      </div>
    </article>
  `).join('');
}

function renderFocus(items = []) {
  return items.map(({ title, description }) => `
    <article class="list-entry concise-entry">
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(description)}</p>
    </article>
  `).join('');
}

function renderProjects(items = []) {
  return items.map(({ period, title, support, outcome }, index) => `
    <article class="list-row project-item ${index > 2 ? 'project-hidden' : ''}" ${index > 2 ? 'data-extra-project="true"' : ''}>
      <div class="list-meta">${escapeHtml(period)}</div>
      <div>
        <h3>${escapeHtml(title)}</h3>
        <p class="item-subtitle">${escapeHtml(support)}</p>
        <p>${escapeHtml(outcome)}</p>
      </div>
    </article>
  `).join('');
}

function renderPublications(items = [], type) {
  return items.map((item, index) => `
    <article class="list-row publication-item ${index > 3 && type === 'published' ? 'publication-hidden' : ''}" ${index > 3 && type === 'published' ? 'data-extra-publication="true"' : ''}>
      <div class="list-meta">${escapeHtml(item.year || item.status)}</div>
      <div class="publication-copy publication-copy-simple">
        <h3>
          ${(item.link || item.url) ? `
            <a class="publication-title-link" href="${escapeHtml(item.link || item.url)}" target="_blank" rel="noopener noreferrer">
              ${escapeHtml(item.title)}
            </a>
          ` : escapeHtml(item.title)}
        </h3>
        ${item.authors ? `<p class="item-subtitle">${escapeHtml(item.authors)}</p>` : ''}
        <p class="publication-meta">${escapeHtml(item.journal)}${item.detail ? `, ${escapeHtml(item.detail)}` : ''}</p>
      </div>
    </article>
  `).join('');
}

function renderContact(data) {
  return `
    <div class="contact-stack">
      <p><a class="contact-link" href="mailto:${escapeHtml(data.contact.email)}">${escapeHtml(data.contact.email)}</a></p>
      <p>${escapeHtml(data.contact.location)}</p>
      <p>${escapeHtml(data.contact.address)}</p>
    </div>
  `;
}

export function render(data) {
  const nav = document.getElementById('site-nav');
  const app = document.getElementById('app');
  const introText = data.bio?.[0] || '';
  const researchBio = data.bio?.slice(1) || [];

  nav.innerHTML = NAV_ITEMS.map(({ id, label }) => `<a href="#${id}">${label}</a>`).join('');

  app.innerHTML = `
    <section class="hero section-anchor" id="intro">
      <div class="hero-copy">
        <p class="hero-eyebrow">Environmental Biogeochemistry</p>
        <h1>${escapeHtml(data.site.title)}</h1>
        <p class="hero-tagline">${escapeHtml(data.site.tagline)}</p>
        <p class="hero-intro">${escapeHtml(introText)}</p>
        <div class="hero-actions">
          <a class="button-primary" href="mailto:${escapeHtml(data.contact.email)}">Contact</a>
          <a class="button-secondary" href="Curriculum%20Vitae%20(CV)_Sangwoo%20Eom_.docx">CV</a>
        </div>
      </div>
    </section>

    <section class="content-grid">
      <section class="section-block section-anchor" id="research">
        <div class="section-heading">
          <h2>Research</h2>
          <p>Research focus, current work, and academic background in one place.</p>
        </div>
        <div class="split-layout research-layout">
          <div>
            <div class="rich-copy">
              ${renderBio(researchBio)}
            </div>
            <div class="subsection">
              <div class="subsection-heading">
                <h3>Research areas</h3>
              </div>
              <div class="simple-list">
                ${renderFocus(data.focusAreas)}
              </div>
            </div>
          </div>
          <div class="sidebar-stack">
            <div class="subsection sidebar-panel">
              <div class="subsection-heading">
                <h3>Education</h3>
              </div>
              <div class="simple-list">
                ${renderEducation(data.education)}
              </div>
            </div>
            <div class="subsection sidebar-panel">
              <div class="subsection-heading">
                <h3>Honors</h3>
              </div>
              <div class="simple-list">
                ${renderHonors(data.honors)}
              </div>
            </div>
          </div>
        </div>
        <div class="subsection section-anchor" id="projects">
          <div class="subsection-heading section-heading-inline">
            <h3>Selected projects</h3>
          </div>
          <div class="simple-list">
            ${renderProjects(data.projects)}
          </div>
          ${data.projects.length > 3 ? '<button class="button-secondary project-toggle" type="button">Show more projects</button>' : ''}
        </div>
      </section>

      <section class="section-block section-anchor" id="publications">
        <div class="section-heading">
          <h2>Publications</h2>
          <p>Selected papers first, with works in progress listed separately.</p>
        </div>
        <div class="publication-group">
          <div class="simple-list">
            ${renderPublications(data.publications.published, 'published')}
          </div>
          ${data.publications.published.length > 4 ? '<button class="button-secondary publication-toggle" type="button">Show more publications</button>' : ''}
        </div>
        <div class="publication-group publication-group-secondary">
          <div class="subsection-heading">
            <h3>In progress</h3>
          </div>
          <div class="simple-list">
            ${renderPublications(data.publications.inPrep, 'inPrep')}
          </div>
        </div>
      </section>

      <section class="section-block section-anchor" id="contact">
        <div class="section-heading">
          <h2>Contact</h2>
          <p>For collaboration, research inquiries, or academic opportunities.</p>
        </div>
        <div class="contact-panel contact-panel-simple">
          ${renderContact(data)}
        </div>
      </section>
    </section>
  `;
}
