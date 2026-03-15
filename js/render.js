// ── render.js ────────────────────────────────────────────────────
// profile.json 데이터를 받아 각 섹션 DOM을 채워 넣는 함수 모음.
// 내용 변경은 profile.json만 수정하면 됩니다.

// ── SVG 아이콘 모음 (14×14, stroke=currentColor) ─────────────────
const ICON = {
  research:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11l-4 5h14l-4-5V3"/></svg>`,
  education: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  honors:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  pubs:      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  pres:      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
  skills:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>`,
};

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
    </p>
  `;
}

// ── Bio ─────────────────────────────────────────────────────────
function renderBio(bio) {
  document.getElementById('bio').innerHTML = `<p>${bio}</p>`;
}

// ── Research Interests ──────────────────────────────────────────
function renderInterests(items) {
  const ul = items.map(({ title, desc }) =>
    `<li><span class="interest-title">${title}</span><span class="interest-desc">${desc}</span></li>`
  ).join('');

  document.getElementById('research').innerHTML = `
    <h2>${ICON.research} Research Interests</h2>
    <ul class="interest-list">${ul}</ul>
  `;
}

// ── Education ───────────────────────────────────────────────────
function renderEducation(items) {
  const rows = items.map(({ period, degree, institution, note }) =>
    `<div class="edu-item"><div class="year">${period}</div><div class="detail"><strong>${degree}</strong><span>${institution}${note ? '<br>' + note : ''}</span></div></div>`
  ).join('');

  document.getElementById('education').innerHTML = `<h2>${ICON.education} Education</h2>${rows}`;
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
    <h2>${ICON.honors} Honors &amp; Awards</h2>${rows}
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
    <h2>${ICON.pubs} Publications</h2>
    <p class="pub-label">Published</p>
    <ul class="pub-list">${published.map(item).join('')}</ul>
    <p class="pub-label">In Preparation</p>
    <ul class="pub-list">${inPrep.map(item).join('')}</ul>
  `;
}

// ── Presentations ───────────────────────────────────────────────
function renderPresentations({ international, domestic }) {
  document.getElementById('presentations').innerHTML = `
    <h2>${ICON.pres} Presentations</h2>
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
  const cells = items.map(({ category, desc }) =>
    `<div class="skill-item"><strong>${category}</strong>${desc}</div>`
  ).join('');

  document.getElementById('skills').innerHTML = `<h2>${ICON.skills} Technical Skills</h2><div class="skill-grid">${cells}</div>`;
}

// ── Footer ──────────────────────────────────────────────────────
function renderFooter({ name, contact }) {
  document.getElementById('footer').innerHTML = `
    ${name} &nbsp;·&nbsp; GIST &nbsp;·&nbsp;
    <a href="mailto:${contact.email}">${contact.email}</a>
  `;
}
