const NAV_ITEMS = [
  ['intro', 'Intro'],
  ['focus', 'Focus'],
  ['projects', 'Projects'],
  ['publications', 'Publications'],
  ['presentations', 'Presentations'],
  ['experience', 'Experience'],
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

function renderStats(stats) {
  return stats.map(({ value, label }) => `
    <article class="stat-card reveal" data-count="${escapeHtml(value)}">
      <strong class="stat-value">${escapeHtml(value)}</strong>
      <span class="stat-label">${escapeHtml(label)}</span>
    </article>
  `).join('');
}

function renderBio(paragraphs) {
  return paragraphs.map(text => `<p>${escapeHtml(text)}</p>`).join('');
}

function renderFocus(items) {
  return items.map(({ title, description }, index) => `
    <article class="focus-card reveal" style="--delay:${index * 0.08}s">
      <span class="eyebrow">0${index + 1}</span>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(description)}</p>
    </article>
  `).join('');
}

function renderEducation(items) {
  return items.map(({ period, degree, institution, detail }) => `
    <article class="timeline-item reveal">
      <div class="timeline-meta">${escapeHtml(period)}</div>
      <div class="timeline-body">
        <h3>${escapeHtml(degree)}</h3>
        <p class="timeline-title">${escapeHtml(institution)}</p>
        <p>${escapeHtml(detail)}</p>
      </div>
    </article>
  `).join('');
}

function renderHonors(items) {
  return items.map(({ year, title, meta }) => `
    <article class="list-item reveal">
      <span class="list-year">${escapeHtml(year)}</span>
      <div>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(meta)}</p>
      </div>
    </article>
  `).join('');
}

function renderProjects(items) {
  return items.map(({ period, title, support, outcome }) => `
    <article class="project-card reveal">
      <div class="project-topline">
        <span>${escapeHtml(period)}</span>
        <span>${escapeHtml(support)}</span>
      </div>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(outcome)}</p>
    </article>
  `).join('');
}

function renderPublications(items, type) {
  return items.map((item, index) => `
    <article class="publication-item reveal ${index > 2 && type === 'published' ? 'publication-hidden' : ''}" ${index > 2 && type === 'published' ? 'data-extra-publication="true"' : ''}>
      <span class="publication-year">${escapeHtml(item.year || item.status)}</span>
      <div>
        <p class="publication-authors">${escapeHtml(item.authors)}</p>
        <h3>${escapeHtml(item.title)}</h3>
        <p class="publication-meta">${escapeHtml(item.journal)}${item.detail ? `, ${escapeHtml(item.detail)}` : ''}</p>
      </div>
    </article>
  `).join('');
}

function renderPresentations(items) {
  return items.map(item => `
    <article class="presentation-item reveal" data-region="${escapeHtml(item.region)}" data-type="${escapeHtml(item.type)}">
      <div class="presentation-meta">
        <span>${escapeHtml(item.year)}</span>
        <span class="chip">${escapeHtml(item.region)}</span>
        <span class="chip chip-ghost">${escapeHtml(item.type)}</span>
      </div>
      <div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.venue)}${item.note ? ` - ${escapeHtml(item.note)}` : ''}</p>
      </div>
    </article>
  `).join('');
}

function renderSkills(items) {
  return items.map(({ category, description }) => `
    <article class="skill-card reveal">
      <h3>${escapeHtml(category)}</h3>
      <p>${escapeHtml(description)}</p>
    </article>
  `).join('');
}

function renderResponsibilities(items) {
  return items.map(({ period, title, detail }) => `
    <article class="list-item reveal">
      <span class="list-year">${escapeHtml(period)}</span>
      <div>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(detail)}</p>
      </div>
    </article>
  `).join('');
}

function renderPrograms(items) {
  return items.map(({ year, title, detail }) => `
    <article class="program-item reveal">
      <span>${escapeHtml(year)}</span>
      <div>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(detail)}</p>
      </div>
    </article>
  `).join('');
}

function renderReferences(items) {
  return items.map(({ name, role, email }) => `
    <article class="reference-card reveal">
      <h3>${escapeHtml(name)}</h3>
      <p>${escapeHtml(role)}</p>
      <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
    </article>
  `).join('');
}

export function render(data) {
  const nav = document.getElementById('site-nav');
  const app = document.getElementById('app');

  nav.innerHTML = NAV_ITEMS.map(([id, label]) => `<a href="#${id}">${label}</a>`).join('');

  app.innerHTML = `
    <section class="hero section-anchor" id="intro">
      <div class="hero-copy reveal">
        <p class="section-kicker">Marine biogeochemistry portfolio</p>
        <h1>${escapeHtml(data.site.title)}</h1>
        <p class="hero-tagline">${escapeHtml(data.site.tagline)}</p>
        <p class="hero-subtagline">${escapeHtml(data.site.subtagline)}</p>
        <div class="hero-actions">
          <a class="button-primary" href="mailto:${escapeHtml(data.contact.email)}">Email</a>
          <button class="button-secondary copy-email" type="button" data-email="${escapeHtml(data.contact.email)}">Copy email</button>
        </div>
      </div>
      <aside class="hero-panel reveal">
        <div class="orbital-card">
          <p class="panel-label">Based at</p>
          <h2>${escapeHtml(data.contact.location)}</h2>
          <p>${escapeHtml(data.contact.address)}</p>
          <div class="contact-stack">
            <a href="mailto:${escapeHtml(data.contact.email)}">${escapeHtml(data.contact.email)}</a>
            <a href="tel:${escapeHtml(data.contact.phone)}">${escapeHtml(data.contact.phone)}</a>
          </div>
        </div>
      </aside>
    </section>

    <section class="stats-grid">
      ${renderStats(data.stats)}
    </section>

    <section class="content-grid">
      <div class="section-block section-anchor" id="about">
        <div class="section-heading reveal">
          <p class="section-kicker">Profile</p>
          <h2>Researching mercury where chemistry meets the ocean surface.</h2>
        </div>
        <div class="rich-copy reveal">
          ${renderBio(data.bio)}
        </div>
      </div>

      <div class="section-block section-anchor" id="focus">
        <div class="section-heading reveal">
          <p class="section-kicker">Focus areas</p>
          <h2>Three recurring themes across lab work, field campaigns, and modeling.</h2>
        </div>
        <div class="focus-grid">
          ${renderFocus(data.focusAreas)}
        </div>
      </div>

      <div class="section-block split-layout">
        <div class="section-anchor" id="education">
          <div class="section-heading reveal">
            <p class="section-kicker">Education</p>
            <h2>Academic path</h2>
          </div>
          <div class="timeline">
            ${renderEducation(data.education)}
          </div>
        </div>
        <div class="section-anchor" id="honors">
          <div class="section-heading reveal">
            <p class="section-kicker">Recognition</p>
            <h2>Honors and fellowships</h2>
          </div>
          <div class="stack-list">
            ${renderHonors(data.honors)}
          </div>
        </div>
      </div>

      <div class="section-block section-anchor" id="projects">
        <div class="section-heading reveal">
          <p class="section-kicker">Projects</p>
          <h2>Funded research and applied investigation.</h2>
        </div>
        <div class="project-grid">
          ${renderProjects(data.projects)}
        </div>
      </div>

      <div class="section-block section-anchor" id="publications">
        <div class="section-heading reveal">
          <p class="section-kicker">Publications</p>
          <h2>Journal work spanning estuaries, wet deposition, and Arctic waters.</h2>
        </div>
        <div class="publication-group">
          <div class="group-label reveal">Published</div>
          ${renderPublications(data.publications.published, 'published')}
          <button class="button-secondary reveal publication-toggle" type="button">Show more publications</button>
        </div>
        <div class="publication-group">
          <div class="group-label reveal">In progress</div>
          ${renderPublications(data.publications.inPrep, 'inPrep')}
        </div>
      </div>

      <div class="section-block section-anchor" id="presentations">
        <div class="section-heading reveal">
          <p class="section-kicker">Presentations</p>
          <h2>Conference activity across domestic and international venues.</h2>
        </div>
        <div class="filter-bar reveal">
          <button class="filter-button active" type="button" data-filter-group="region" data-filter-value="all">All regions</button>
          <button class="filter-button" type="button" data-filter-group="region" data-filter-value="international">International</button>
          <button class="filter-button" type="button" data-filter-group="region" data-filter-value="domestic">Domestic</button>
          <button class="filter-button active" type="button" data-filter-group="type" data-filter-value="all">All formats</button>
          <button class="filter-button" type="button" data-filter-group="type" data-filter-value="oral">Oral</button>
          <button class="filter-button" type="button" data-filter-group="type" data-filter-value="poster">Poster</button>
        </div>
        <div class="presentation-list">
          ${renderPresentations(data.presentations)}
        </div>
      </div>

      <div class="section-block split-layout section-anchor" id="experience">
        <div>
          <div class="section-heading reveal">
            <p class="section-kicker">Experience</p>
            <h2>Teaching, mentoring, and lab responsibility.</h2>
          </div>
          <div class="stack-list">
            ${renderResponsibilities(data.responsibilities)}
          </div>
        </div>
        <div>
          <div class="section-heading reveal">
            <p class="section-kicker">Programs</p>
            <h2>Key collaborations and training contexts.</h2>
          </div>
          <div class="program-list">
            ${renderPrograms(data.programs)}
          </div>
        </div>
      </div>

      <div class="section-block section-anchor" id="skills">
        <div class="section-heading reveal">
          <p class="section-kicker">Technical stack</p>
          <h2>Methods and tools used across field, wet-lab, and computational work.</h2>
        </div>
        <div class="skills-grid">
          ${renderSkills(data.skills)}
        </div>
      </div>

      <div class="section-block section-anchor" id="contact">
        <div class="section-heading reveal">
          <p class="section-kicker">Contact</p>
          <h2>For collaboration, graduate research, and Arctic mercury projects.</h2>
        </div>
        <div class="contact-grid">
          <article class="contact-card reveal">
            <p class="panel-label">Direct</p>
            <a class="contact-link" href="mailto:${escapeHtml(data.contact.email)}">${escapeHtml(data.contact.email)}</a>
            <a class="contact-link" href="tel:${escapeHtml(data.contact.phone)}">${escapeHtml(data.contact.phone)}</a>
            <p>${escapeHtml(data.contact.address)}</p>
          </article>
          <div class="reference-grid">
            ${renderReferences(data.references)}
          </div>
        </div>
      </div>
    </section>
  `;
}
