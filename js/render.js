const NAV_ITEMS = [
  ['intro', 'Intro'],
  ['research', 'Research'],
  ['publications', 'Publications'],
  ['profile', 'Profile'],
  ['presentations', 'Presentations'],
  ['contact', 'Contact']
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
  return items.map(({ period, title, support, outcome }) => `
    <article class="list-row">
      <div class="list-meta">${escapeHtml(period)}</div>
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
    <article class="list-row publication-item ${index > 2 && type === 'published' ? 'publication-hidden' : ''}" ${index > 2 && type === 'published' ? 'data-extra-publication="true"' : ''}>
      <span class="list-meta">${escapeHtml(item.year || item.status)}</span>
      <div>
        <p class="item-subtitle">${escapeHtml(item.authors)}</p>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.journal)}${item.detail ? `, ${escapeHtml(item.detail)}` : ''}</p>
      </div>
    </article>
  `).join('');
}

function renderPresentations(items) {
  return items.map(item => `
    <article class="list-row">
      <div class="list-meta">${escapeHtml(item.year)}</div>
      <div>
        <h3>${escapeHtml(item.title)}</h3>
        <p class="item-subtitle">${escapeHtml(item.venue)}</p>
        <p>${escapeHtml(item.region)} / ${escapeHtml(item.type)}${item.note ? ` / ${escapeHtml(item.note)}` : ''}</p>
      </div>
    </article>
  `).join('');
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

export function render(data) {
  const nav = document.getElementById('site-nav');
  const app = document.getElementById('app');

  nav.innerHTML = NAV_ITEMS.map(([id, label]) => `<a href="#${id}">${label}</a>`).join('');

  app.innerHTML = `
    <section class="hero section-anchor" id="intro">
      <div class="hero-copy">
        <h1>${escapeHtml(data.site.title)}</h1>
        <p class="hero-subtagline">${formatInlineBreaks(data.site.subtagline)}</p>
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
          <aside class="metrics-panel" aria-label="Research highlights">
            ${renderStats(data.stats)}
          </aside>
        </div>
        <div class="subsection">
          <div class="subsection-heading">
            <h3>Selected projects</h3>
          </div>
          <div class="simple-list">
            ${renderProjects(data.projects)}
          </div>
        </div>
      </div>

      <div class="section-block section-anchor" id="publications">
        <div class="section-heading">
          <p class="section-kicker">Publications</p>
          <h2>Selected publications</h2>
        </div>
        <div class="publication-group">
          <div class="group-label">Published</div>
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

      <div class="section-block split-layout section-anchor" id="profile">
        <div>
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
          <div class="subsection">
            <div class="subsection-heading">
              <h3>Mentoring and teaching</h3>
            </div>
            <div class="simple-list">
              ${renderResponsibilities(data.responsibilities)}
            </div>
          </div>
        </div>
        <div>
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
      </div>

      <div class="section-block section-anchor" id="presentations">
        <div class="section-heading">
          <p class="section-kicker">Presentations</p>
          <h2>Conference presentations</h2>
        </div>
        <div class="simple-list">
          ${renderPresentations(data.presentations)}
        </div>
      </div>

      <div class="section-block section-anchor" id="contact">
        <div class="section-heading">
          <p class="section-kicker">Contact</p>
          <h2>Contact</h2>
        </div>
        <div class="contact-panel">
          <p>For research collaboration, postdoctoral opportunities, or questions about mercury biogeochemistry, please get in touch.</p>
          <div class="contact-list">
            <a class="contact-link" href="mailto:${escapeHtml(data.contact.email)}">${escapeHtml(data.contact.email)}</a>
            <a class="contact-link" href="tel:${escapeHtml(data.contact.phone)}">${escapeHtml(data.contact.phone)}</a>
            <p>${escapeHtml(data.contact.address)}</p>
          </div>
        </div>
      </div>
    </section>
  `;
}
