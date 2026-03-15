// ── interactions.js ──────────────────────────────────────────────
// 모든 인터랙티브 동작을 담당합니다.
// render.js가 DOM을 다 채운 뒤 initInteractions()를 호출하세요.

export function initInteractions() {
  initScrollFade();
  initScrollSpy();
  initPresentationFilter();
  initCopyEmail();
}

// ── 1. 스크롤 페이드인 ────────────────────────────────────────────
// 화면에 들어오는 section / header / footer 요소를 부드럽게 표시합니다.
function initScrollFade() {
  const targets = document.querySelectorAll('main > *, footer');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // 한 번 나타나면 해제
        }
      });
    },
    { threshold: 0.08 }
  );
  targets.forEach(el => {
    el.classList.add('fade-item');
    observer.observe(el);
  });
}

// ── 2. 스크롤 스파이 (현재 섹션 nav 하이라이트) ─────────────────────
function initScrollSpy() {
  const sectionIds = ['about', 'research', 'education', 'publications', 'presentations', 'skills'];
  const navLinks = document.querySelectorAll('nav a');

  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(a => {
          a.classList.toggle(
            'nav-active',
            a.getAttribute('href') === '#' + entry.target.id
          );
        });
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(el => observer.observe(el));
}

// ── 3. 발표 목록 필터 (All / Oral / Poster) ──────────────────────
function initPresentationFilter() {
  const section = document.getElementById('presentations');
  if (!section) return;

  section.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    const filter = btn.dataset.filter;

    // 버튼 active 상태 변경
    section.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // li 요소 show/hide
    section.querySelectorAll('.pres-list li').forEach(li => {
      const match = filter === 'all' || li.dataset.type === filter;
      li.style.display = match ? '' : 'none';
    });
  });
}

// ── 4. 이메일 클릭 시 클립보드 복사 + 토스트 알림 ────────────────────
function initCopyEmail() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.copy-email');
    if (!btn) return;

    const email = btn.dataset.email;
    navigator.clipboard.writeText(email).then(() => showToast('Email copied!'));
  });
}

function showToast(msg) {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);

  // 애니메이션: 나타났다가 사라짐
  requestAnimationFrame(() => {
    toast.classList.add('toast-show');
    setTimeout(() => {
      toast.classList.remove('toast-show');
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, 2000);
  });
}
