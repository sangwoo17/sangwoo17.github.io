# sangwoo17.github.io

Sangwoo Eom의 개인 포트폴리오 웹사이트입니다.
GitHub Pages를 통해 자동으로 인터넷에 배포됩니다.

---

## 폴더 구조

```
sangwoo17.github.io/
│
├── index.html          ← 웹페이지 뼈대 (섹션 위치만 잡아둠, 내용 없음)
│
├── data/
│   └── profile.json    ← ✏️ 모든 내용(논문, 발표, 소개 등)이 저장된 파일
│
├── js/
│   └── main.js         ← profile.json을 읽어 화면에 채워 넣는 코드
│
├── css/
│   └── style.css       ← 디자인·색상·글꼴 등 시각적인 스타일 전담
│
└── README.md           ← 이 설명 파일
```

### 각 파일이 하는 일

| 파일 | 역할 | 비유 |
|------|------|------|
| `index.html` | 페이지의 **뼈대** — 섹션들의 빈 자리를 잡아둡니다 | 빈 액자 틀 |
| `data/profile.json` | **모든 내용** — 이름, 논문, 발표 목록 등 데이터 | 액자에 들어갈 사진 |
| `js/main.js` | `profile.json`을 읽어 `index.html`에 **채워 넣는** 코드 | 사진을 액자에 끼워 넣는 사람 |
| `css/style.css` | 색상, 글꼴, 여백 등 **시각적 디자인** | 액자 디자인·색깔 |

---

## 내용 업데이트 방법

**논문, 발표, 소개글 등을 수정/추가할 때는 `data/profile.json` 파일만 편집하면 됩니다.**
HTML이나 JS 파일은 건드릴 필요가 없습니다.

### profile.json 구조

```
{
  "name": 이름,
  "title": 직함,
  "institution": 소속,
  "contact": { 연락처 },
  "bio": 소개글,
  "interests": [ 연구 관심사 목록 ],
  "education": [ 학력 목록 ],
  "honors": [ 수상 목록 ],
  "publications": {
    "published": [ 출판된 논문 목록 ],
    "inPrep": [ 준비 중인 논문 목록 ]
  },
  "presentations": {
    "international": [ 국제 학회 목록 ],
    "domestic": [ 국내 학회 목록 ]
  },
  "skills": [ 기술 목록 ]
}
```

### 논문 한 편 추가하는 예시

`data/profile.json`을 열고 `"published"` 배열에 아래 형식으로 추가합니다:

```json
{
  "authors": "<strong>Eom, S.</strong>; 공저자...",
  "title": "논문 제목.",
  "journal": "저널명",
  "info": "권(호) (연도), 페이지."
}
```

---

## 디자인 수정 방법

`css/style.css` 파일 맨 위의 `:root { }` 블록에서 색상과 너비를 바꿀 수 있습니다:

```css
:root {
  --bg: #fafafa;       /* 배경색 */
  --text: #222;        /* 본문 글자색 */
  --muted: #666;       /* 흐릿한 보조 글자색 */
  --accent: #2a6496;   /* 링크·강조 색 */
  --max-width: 720px;  /* 본문 최대 너비 */
}
```

---

## GitHub Pages 배포 방법

1. 이 저장소를 GitHub에 `push` 합니다.
2. GitHub 저장소 → **Settings** → **Pages** 메뉴로 이동합니다.
3. **Branch** 를 `main`으로 설정하고 저장합니다.
4. 잠시 후 `https://sangwoo17.github.io` 주소로 자동 배포됩니다.

> 파일을 수정하고 다시 push 하면 보통 1–2분 안에 사이트가 업데이트됩니다.
