// ── render.js ────────────────────────────────────────────────────
// profile.json 데이터를 받아 각 섹션 DOM을 채워 넣는 함수 모음.
// 내용 변경은 profile.json만 수정하면 됩니다.

export function render(d) {
  renderHeader(d);
  renderBio(d.bio);
  renderInterests(d.interests);
  renderEducation(d.education);
  renderHonors(d.honors);
  renderPublications(d.publications);
  renderPresentations(d.presentations);
  renderSkills(d.skills);
  renderFooter(d);
}

// ── Header ──────────────────────────────────────────────────────
function renderHeader({ name, title, institution, contact }) {
  document.getElementById('header').innerHTML = `
    <h1>${name}</h1>
    <p class="subtitle">${title}</p>
    <p class="subtitle">${institution}</p>
    <p class="contact">
      <button class="copy-email" data-email="${contact.email}" title="Copy email">
        ${contact.email}
      </button>
      &nbsp;·&nbsp; ${contact.phone}
      &nbsp;·&nbsp; ${contact.location}
    </p>
  `;
}

// ── Bio ─────────────────────────────────────────────────────────
function renderBio(bio) {
  document.getElementById('bio').innerHTML = `<p>${bio}</p>`;
}

// ── Research Interests ──────────────────────────────────────────
function renderInterests(items) {
  const ul = items.map(({ title, desc }) => `
    <li>
      <strong>${title}</strong>
      <span>${desc}</span>
    </li>
  `).join('');

  document.getElementById('research').innerHTML = `
    <h2>Research Interests</h2>
    <ul class="interest-list">${ul}</ul>
  `;
}

// ── Education ───────────────────────────────────────────────────
function renderEducation(items) {
  const rows = items.map(({ period, degree, institution, note }) => `
    <div class="edu-item">
      <div class="year">${period}</div>
      <div class="detail">
        <strong>${degree}</strong>
        <span>${institution}${note ? '<br>' + note : ''}</span>
      </div>
    </div>
  `).join('');

  document.getElementById('education').innerHTML = `
    <h2>Education</h2>${rows}
  `;
}

// ── Honors ──────────────────────────────────────────────────────
function renderHonors(items) {
  const rows = items.map(({ year, desc }) => `
    <div class="honor-item">
      <div class="year">${year}</div>
      <div>${desc}</div>
    </div>
  `).join('');

  document.getElementById('honors').innerHTML = `
    <h2>Honors &amp; Awards</h2>${rows}
  `;
}

// ── Publications ────────────────────────────────────────────────
function renderPublications({ published, inPrep }) {
  const item = ({ authors, title, journal, info }) => `
    <li>
      ${authors} ${title}
      <span class="journal">${journal}</span> ${info}
    </li>
  `;

  document.getElementById('publications').innerHTML = `
    <h2>Publications</h2>
    <p class="pub-label">Published</p>
    <ul class="pub-list">${published.map(item).join('')}</ul>
    <p class="pub-label">In Preparation</p>
    <ul class="pub-list">${inPrep.map(item).join('')}</ul>
  `;
}

// ── Presentations ───────────────────────────────────────────────
function renderPresentations({ international, domestic }) {
  document.getElementById('presentations').innerHTML = `
    <h2>Presentations</h2>
    <div class="pres-filters">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="oral">Oral</button>
      <button class="filter-btn" data-filter="poster">Poster</button>
    </div>
    <p class="pub-label">International</p>
    <ul class="pres-list" id="pres-international">
      ${international.map(presItem).join('')}
    </ul>
    <p class="pub-label">Domestic (Korea)</p>
    <ul class="pres-list" id="pres-domestic">
      ${domestic.map(presItem).join('')}
    </ul>
  `;
}

function presItem({ year, venue, title, type, note }) {
  const noteHtml = note ? `<em> — ${note}</em>` : '';
  return `
    <li data-type="${type}">
      <span class="pres-year">${year}</span>
      <span>
        ${venue} "${title}"
        <span class="pres-tag tag-${type}">${type === 'oral' ? 'Oral' : 'Poster'}</span>
        ${noteHtml}
      </span>
    </li>
  `;
}

// ── Skills ──────────────────────────────────────────────────────
function renderSkills(items) {
  const cells = items.map(({ category, desc }) => `
    <div class="skill-item">
      <strong>${category}</strong>
      ${desc}
    </div>
  `).join('');

  document.getElementById('skills').innerHTML = `
    <h2>Technical Skills</h2>
    <div class="skill-grid">${cells}</div>
  `;
}

// ── Footer ──────────────────────────────────────────────────────
function renderFooter({ name, contact }) {
  document.getElementById('footer').innerHTML = `
    ${name} &nbsp;·&nbsp; GIST &nbsp;·&nbsp;
    <a href="mailto:${contact.email}">${contact.email}</a>
  `;
}
