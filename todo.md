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

## 🔄 8-кезең: Контентті толықтыру

### SVG анимация (5 файл)

- [ ] svg/negizderi.md — SVG негіздері
- [ ] svg/path-animacia.md — Path анимация
- [ ] svg/morphsvg.md — MorphSVG плагині
- [ ] svg/drawsvg.md — DrawSVG плагині
- [ ] svg/motionpath.md — MotionPath плагині

### Жетілдірілген техникалар (7 файл)

- [ ] jetildirilgen/stagger.md — Stagger анимациялар
- [ ] jetildirilgen/keyframes.md — Keyframes
- [ ] jetildirilgen/responsive.md — Responsive анимация
- [ ] jetildirilgen/context.md — GSAP Context
- [ ] jetildirilgen/matchmedia.md — matchMedia()
- [ ] jetildirilgen/registerplugin.md — registerPlugin()
- [ ] jetildirilgen/ticker.md — GSAP Ticker

### Практикалық жобалар (10 файл)

- [ ] praktika/navbar.md — Navbar анимация
- [ ] praktika/hero.md — Hero секция
- [ ] praktika/card-hover.md — Карточка hover эффекті
- [ ] praktika/page-transition.md — Бет ауысу анимациясы
- [ ] praktika/parallax.md — Parallax эффект
- [ ] praktika/text-reveal.md — Мәтін reveal
- [ ] praktika/image-gallery.md — Сурет галереясы
- [ ] praktika/loading.md — Loading анимация
- [ ] praktika/scroll-progress.md — Скролл прогресс
- [ ] praktika/landing.md — Толық лендинг

### Оңтайландыру (5 файл)

- [ ] optimization/performance.md — Performance кеңестер
- [ ] optimization/will-change.md — will-change қасиеті
- [ ] optimization/force3d.md — force3D параметрі
- [ ] optimization/lazy-rendering.md — Lazy rendering
- [ ] optimization/errors.md — Жиі кездесетін қателер

### Анықтамалық (4 файл)

- [ ] reference/properties.md — Барлық қасиеттер
- [ ] reference/easing.md — Барлық easing түрлері
- [ ] reference/callbacks.md — Барлық callbacks
- [ ] reference/glossary.md — Терминдер сөздігі

---

## 🔄 9-кезең: Интерактивті элементтер

### Easing визуализаторы

- [ ] EasingVisualizer.vue компоненті
- [ ] Canvas/SVG арқылы қисық сызу
- [ ] "Ойнату" батырмасы — анимация preview
- [ ] Барлық easing түрлерін салыстыру
- [ ] Easing бетіне интеграция

---

## 🔄 10-кезең: PWA / Offline режим

- [ ] @vite-pwa/nuxt орнату
- [ ] Service Worker конфигурация
- [ ] Manifest.json (иконкалар, түстер)
- [ ] Offline fallback бет
- [ ] Cache стратегиясы (контент, assets)

---

## Белгілер

- [ ] Жасалмаған
- [x] Аяқталған
- [~] Орындалуда
