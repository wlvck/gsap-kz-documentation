# GSAP Қазақша Құжаттама — TODO

## ✅ 1-кезең: Инфрақұрылым (Аяқталды)

### Орнату

- [x] Nuxt 3 жоба құру
- [x] Tailwind CSS орнату
- [x] GSAP орнату
- [x] Nuxt Content v3 конфигурациялау
- [x] ESLint + @nuxt/eslint орнату
- [x] Prettier орнату
- [x] Husky + lint-staged орнату
- [x] TypeScript + vue-tsc орнату

### Негізгі компоненттер

- [x] DocsLayout.vue — негізгі layout
- [x] DocsSidebar.vue — сол жақ навигация + мобильді меню
- [x] pages/docs/[...slug].vue — құжаттама беттері
- [x] pages/index.vue — басты бет (hero + features)
- [x] layouts/docs.vue — құжаттама layout

### Стильдер

- [x] GSAP түстер палитрасы (tailwind.config.ts)
- [x] Типография (@tailwindcss/typography)
- [x] Dark theme (негізгі)
- [x] Prose стильдер (pages/docs/[...slug].vue)

### Навигация

- [x] Негізгі бөлімдер тізімі (DocsSidebar)
- [x] Белсенді бет белгіленуі (isActive)
- [x] URL routing ([...slug].vue)
- [x] Ашылатын суб-тақырыптар (collapsible)

---

## ✅ 2-кезең: Контент құрылымы (Аяқталды)

### Markdown файлдар құру (30 файл)

- [x] kirisspe/ — Кіріспе (4 файл)
- [x] negizderi/ — Негіздер (5 файл)
- [x] easing/ — Easing (3 файл)
- [x] timeline/ — Timeline (3 файл)
- [x] scrolltrigger/ — ScrollTrigger (4 файл)
- [x] plaginder/ — Плагиндер (5 файл)
- [x] utilitalar/ — Утилиталар (3 файл)
- [x] freimworktar/ — Фреймворктар (2 файл)

### Қосымша функционал

- [x] useGsapVersion composable — динамикалық GSAP нұсқасы
- [x] content.config.ts — Nuxt Content v3 конфигурация

---

## ✅ 3-кезең: UI компоненттер (Аяқталды)

### Код блоктары

- [x] Copy button
- [x] Syntax highlighting (Shiki) — Nuxt Content v3 әдепкі
- [x] Filename көрсету

### Арнайы блоктар

- [x] Callout компоненті (Tip, Warning, Info, Danger)

---

## ✅ 4-кезең: Responsive (Аяқталды)

- [x] Mobile навигация (DocsSidebar)
- [x] Mobile menu toggle
- [x] Tablet layout оңтайландыру
- [x] Touch interactions

---

## ✅ 5-кезең: Қосымша функционал (Аяқталды)

- [x] Іздеу функциясы (⌘K)
- [x] Прогресс индикаторы (скролл)
- [x] GitHub сілтемелер
- [x] Table of Contents (оң жақ)

---

## ✅ 6-кезең: Деплой (Аяқталды)

- [x] Vercel конфигурация
- [x] SEO мета тегтер
- [x] Open Graph мета тегтер

---

## ✅ 7-кезең: UI жақсартулар (Аяқталды)

### Header жаңарту

- [x] Жаңа навигация элементтері:
  - [x] Docs сілтемесі
  - [x] Showcases сілтемесі
  - [x] Байланыс dropdown (Email + Telegram)
- [x] Header дизайнын жақсарту

### Showcases бөлімі

- [x] pages/showcases.vue — негізгі бет
- [x] Сайт карточкалары (сурет, атау, сипаттама, сілтеме)
- [x] Категориялар/тегтер бойынша фильтр
- [x] Showcases деректер файлы (TypeScript)

### Қосымша UI элементтер

- [x] ScrollToTop батырмасы (жоғары көтерілу)
- [x] Lenis smooth scroll интеграциясы

---

## ✅ 8-кезең: Контентті толықтыру (Аяқталды)

### SVG анимация (5 файл)

- [x] svg/negizderi.md — SVG негіздері
- [x] svg/path-animacia.md — Path анимация
- [x] svg/morphsvg.md — MorphSVG плагині
- [x] svg/drawsvg.md — DrawSVG плагині
- [x] svg/motionpath.md — MotionPath плагині

### Жетілдірілген техникалар (7 файл)

- [x] jetildirilgen/stagger.md — Stagger анимациялар
- [x] jetildirilgen/keyframes.md — Keyframes
- [x] jetildirilgen/responsive.md — Responsive анимация
- [x] jetildirilgen/context.md — GSAP Context
- [x] jetildirilgen/matchmedia.md — matchMedia()
- [x] jetildirilgen/registerplugin.md — registerPlugin()
- [x] jetildirilgen/ticker.md — GSAP Ticker

### Практикалық жобалар (10 файл)

- [x] praktika/navbar.md — Navbar анимация
- [x] praktika/hero.md — Hero секция
- [x] praktika/card-hover.md — Карточка hover эффекті
- [x] praktika/page-transition.md — Бет ауысу анимациясы
- [x] praktika/parallax.md — Parallax эффект
- [x] praktika/text-reveal.md — Мәтін reveal
- [x] praktika/image-gallery.md — Сурет галереясы
- [x] praktika/loading.md — Loading анимация
- [x] praktika/scroll-progress.md — Скролл прогресс
- [x] praktika/landing.md — Толық лендинг

### Оңтайландыру (5 файл)

- [x] optimization/performance.md — Performance кеңестер
- [x] optimization/will-change.md — will-change қасиеті
- [x] optimization/force3d.md — force3D параметрі
- [x] optimization/lazy-rendering.md — Lazy rendering
- [x] optimization/errors.md — Жиі кездесетін қателер

### Анықтамалық (4 файл)

- [x] reference/properties.md — Барлық қасиеттер
- [x] reference/easing.md — Барлық easing түрлері
- [x] reference/callbacks.md — Барлық callbacks
- [x] reference/glossary.md — Терминдер сөздігі

---

## ✅ 9-кезең: Интерактивті элементтер (Аяқталды)

### Easing визуализаторы

- [x] EasingVisualizer.vue компоненті
- [x] Canvas/SVG арқылы қисық сызу
- [x] "Ойнату" батырмасы — анимация preview
- [x] Барлық easing түрлерін салыстыру
- [x] Easing бетіне интеграция

---

## ✅ 10-кезең: PWA / Offline режим (Аяқталды)

- [x] @vite-pwa/nuxt орнату
- [x] Service Worker конфигурация
- [x] Manifest.json (иконкалар, түстер)
- [x] Offline fallback бет
- [x] Cache стратегиясы (контент, assets)

---

## ✅ 11-кезең: Effects Playground — Base (Аяқталды)

### Phase 1-5: Core Infrastructure

- [x] pages/effects/index.vue — effects gallery page
- [x] pages/effects/[category]/[effect].vue — individual effect page
- [x] pages/effects/[category]/index.vue — category listing page
- [x] Effects link in header navigation
- [x] EffectPlayground.vue component
- [x] CodeTabs.vue — Vue/Script/CSS tabs with syntax highlighting
- [x] EffectControls.vue — text input, play/reset buttons
- [x] EffectCard.vue — category cards
- [x] EffectsSidebar.vue — navigation sidebar
- [x] Effects data structure (types/effects.ts)
- [x] Text effects (16 effects)
- [x] Scroll effects (5 effects)
- [x] Button effects (5 effects)
- [x] Loading effects (5 effects)

---

## ✅ 12-кезең: Category-Specific Playgrounds (Аяқталды)

### 12.1 Architecture Refactor

- [x] Playground components created in `components/effects/playgrounds/`
- [x] `TextPlayground.vue` — text input + play/reset
- [x] `HoverPlayground.vue` — hover-triggered effects (buttons, cards)
- [x] `ScrollPlayground.vue` — scrollable container with ScrollTrigger
- [x] `LoadingPlayground.vue` — auto-playing loop, restart button
- [x] `playgroundType` field added to Effect interface
- [x] Effect page dynamically loads correct playground
- [x] Button effects use HoverPlayground (interactive hover)
- [x] CodeTabs syntax highlighting fixed (placeholder system)

---

## ✅ 13-кезең: Effects Library толықтыру (Аяқталды)

- [x] Text — 23/23 effects
- [x] Scroll — 15/15 effects
- [x] Button — 14/14 effects
- [x] Loading — 14/14 effects
- [x] Image — 17/17 effects
- [x] Card — 13/13 effects
- [x] Navigation — 14/14 effects
- [x] Container — 12/12 effects
- [x] SVG — 10/10 effects
- [x] Cursor — 6/6 effects
- [x] Micro — 12/12 effects
- [x] 3D — 5/5 effects

**Барлығы: 155 effects ✅**

---

## 🔄 14-кезең: Learning Path (CURRENT)

Interactive learning roadmap page — from Beginner to Шебер (Master) with animated skill tree.

### 14.1 Page Setup

- [x] Create `pages/learning-path.vue` — main learning path page
- [x] Add "Learning Path" link to header navigation
- [x] Create page layout with full-height scroll container

### 14.2 Data Structure

- [x] Create `data/learning-path.ts` — learning path data:
  ```typescript
  interface LearningStep {
    id: string;
    level: "beginner" | "intermediate" | "advanced" | "master";
    title: string;
    titleKz: string;
    description: string;
    descriptionKz: string;
    icon: string;
    docsLink: string; // Link to documentation page
    estimatedTime: string; // e.g., "30 min", "1 hour"
    topics: string[]; // Sub-topics covered
  }
  ```
- [x] Define learning steps for each level:

**🟢 Бастаушы (Beginner) — 6 steps:**

1. GSAP деген не? — Introduction
2. Орнату — Installation (CDN, npm)
3. gsap.to() — First animation
4. gsap.from() / fromTo() — Animation directions
5. Негізгі қасиеттер — Properties (x, y, opacity, scale, rotation)
6. Duration & Delay — Timing basics

**🟡 Орта деңгей (Intermediate) — 8 steps:** 7. Easing функциялары — Easing types 8. Timeline негіздері — Creating timelines 9. Timeline позициялау — Position parameter 10. Callbacks — onStart, onComplete, onUpdate 11. Stagger — Animating multiple elements 12. ScrollTrigger негіздері — Basic scroll animations 13. ScrollTrigger scrub — Scroll-linked animations 14. ScrollTrigger pin — Pinning elements

**🔴 Жетілдірілген (Advanced) — 8 steps:** 15. GSAP Context — Cleanup & scoping 16. matchMedia — Responsive animations 17. SVG анимация — Path drawing, morphing 18. Draggable — Drag interactions 19. Flip Plugin — Layout animations 20. SplitText — Text splitting 21. Custom Easing — Creating custom eases 22. Performance — Optimization techniques

**👑 Шебер (Master) — 4 steps:** 23. Complex Timelines — Nested timelines, labels 24. Plugin Development — Creating custom plugins 25. Framework Integration — React, Vue, Nuxt 26. Real Project — Build complete animated website

### 14.3 SVG Path Animation (Main Visual)

- [x] Create `components/learning/LearningPathSVG.vue` — main SVG component
- [x] Design SVG path connecting all steps (vertical winding road)
- [x] Implement DrawSVG effect — path draws as user scrolls
- [x] Add checkpoint circles on the path for each step
- [x] Animate checkpoints appearing when reached

### 14.4 Step Components

- [x] Create `components/learning/LearningStep.vue` — individual step card:
  - Level badge (color-coded: green/yellow/red/gold)
  - Step number
  - Title (Kazakh)
  - Description
  - Estimated time
  - Topics list
  - "Оқуға өту" button → links to docs
  - Completion checkbox (localStorage)
- [x] Create `components/learning/LevelHeader.vue` — level section header:
  - Level icon (emoji or SVG)
  - Level name
  - Progress indicator (X/Y completed)

### 14.5 Scroll Animations

- [x] ScrollTrigger for path drawing animation
- [x] Each step fades/slides in when scrolled into view
- [ ] Parallax effect on background elements
- [x] Progress indicator showing overall completion
- [x] Sticky level header while scrolling through level

### 14.6 Progress Tracking

- [x] Save completed steps to localStorage
- [x] Calculate overall progress percentage
- [x] Show progress bar at top of page
- [x] "Жалғастыру" (Continue) button — scrolls to first incomplete step
- [ ] Confetti animation when level completed
- [x] Special animation when reaching Шебер level (Шебер Finale section with trophy, stats, CTAs)

### 14.7 Interactive Elements

- [x] Hover effects on step cards
- [ ] Click to expand step details
- [ ] Mini preview animation for each step (shows what you'll learn)
- [ ] Keyboard navigation (arrow keys to move between steps)

### 14.8 Responsive Design

- [x] Mobile layout — vertical timeline
- [x] Tablet layout — adjusted spacing
- [x] Desktop layout — full visual experience
- [x] Touch-friendly interactions

### 14.9 Visual Polish

- [ ] Animated background (subtle particles or gradient)
- [x] Glowing effect on completed checkpoints (SVG path)
- [x] Level transition animations (when scrolling to new level)
- [ ] Sound effects (optional, toggle in settings)

---

## Белгілер

- [ ] Жасалмаған
- [x] Аяқталған
- [~] Орындалуда
