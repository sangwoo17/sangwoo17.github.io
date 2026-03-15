// ── Entry point ─────────────────────────────────────────────────
// profile.json을 불러와 렌더링 → 인터랙션 초기화 순서로 실행합니다.

import { render } from './render.js';
import { initInteractions } from './interactions.js';

fetch('data/profile.json')
  .then(res => res.json())
  .then(data => {
    render(data);
    initInteractions();
  })
  .catch(err => console.error('profile.json 로드 실패:', err));
