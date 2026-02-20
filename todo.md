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

## 🔄 13-кезең: Expand Effects Library (CURRENT)

### Text (Мәтін) — 23/23 done ✅

- [x] fade-in, fade-in-up, fade-in-down, fade-in-left, fade-in-right
- [x] scale-in, rotate-in
- [x] chars-fade, chars-slide, chars-random
- [x] words-fade, words-slide
- [x] lines-reveal, lines-mask
- [x] typewriter
- [x] glitch — Glitch effect
- [x] counter — Number counter
- [x] bounce-in, elastic-in, blur-in, flip-in
- [x] text-scramble — Text scramble/decode
- [x] hover-underline — Underline on hover

### Scroll (Скролл) — 15/15 done ✅

- [x] scroll-fade-in, parallax-simple, pin-simple, scroll-progress, scrub-animation
- [x] scroll-slide-up, scroll-slide-left, scroll-slide-right
- [x] scroll-scale, scroll-rotate
- [x] parallax-multi, parallax-bg, parallax-mouse
- [x] pin-animation, horizontal-scroll

### Button (Батырма) — 14/14 done ✅

- [x] btn-scale, btn-bg-slide, btn-border, btn-ripple, btn-magnetic
- [x] btn-shine, btn-3d-press
- [x] btn-click, btn-loading, btn-success, btn-error
- [x] btn-icon-rotate, btn-icon-morph, btn-icon-bounce

### Loading (Жүктелу) — 14/14 done ✅

- [x] spinner, progress-bar, logo-loader, skeleton, dots-bounce
- [x] counter-loader
- [x] page-fade, page-slide, page-curtain, page-circle, page-diagonal
- [x] lazy-reveal, placeholder, image-lazy

### Image (Сурет) — 0/17

- [ ] image-fade, image-clip, image-mask, image-slide, image-curtain
- [ ] image-zoom-hover, image-pan-hover, image-tilt
- [ ] image-overlay, image-caption
- [ ] slider-basic, slider-infinite, slider-draggable
- [ ] lightbox, masonry-reveal, image-crossfade, before-after

### Card (Карточка) — 0/13

- [ ] card-lift, card-tilt, card-flip, card-expand
- [ ] card-glow, card-border, card-gradient
- [ ] card-content-slide, card-overlay, card-icon
- [ ] cards-stagger, cards-grid, cards-random

### Navigation (Навигация) — 0/14

- [ ] navbar-hide, navbar-shrink, navbar-bg-change, navbar-blur
- [ ] hamburger-x, menu-slide, menu-fullscreen, menu-stagger
- [ ] dropdown-anim, mega-menu
- [ ] link-underline, link-fill, active-indicator, breadcrumb

### Container (Контейнер) — 0/12

- [ ] gradient-anim, bg-color-transition, animated-shapes
- [ ] particles, wave-anim
- [ ] divider-anim, wave-divider, diagonal-reveal
- [ ] section-reveal, section-transition
- [ ] accordion, tabs

### SVG (SVG) — 0/10

- [ ] path-draw, path-erase, path-morph, path-follow
- [ ] shape-morph, shape-rotate, shape-scale
- [ ] icon-animated, logo-reveal, logo-draw

### Cursor (Курсор) — 0/6

- [ ] cursor-custom, cursor-follower, cursor-magnetic
- [ ] cursor-text, cursor-blend, cursor-trail

### Micro-interactions (Микро) — 0/12

- [ ] input-focus, input-validation, checkbox, toggle, select
- [ ] toast, tooltip, modal, popover
- [ ] copy-feedback, like-heart, bookmark

### 3D / Advanced — 0/5

- [ ] 3d-card-flip, 3d-carousel, perspective-scroll
- [ ] 3d-text, parallax-3d

---

## Белгілер

- [ ] Жасалмаған
- [x] Аяқталған
- [~] Орындалуда
