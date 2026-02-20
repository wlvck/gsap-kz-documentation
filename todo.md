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

## 🔄 11-кезең: Effects Playground (NEW)

### Phase 1: Core Infrastructure

#### 1.1 Create base page and layout

- [x] Create `pages/effects/index.vue` — main effects gallery page
- [x] Create `pages/effects/[category]/[effect].vue` — individual effect page
- [x] Create `pages/effects/[category]/index.vue` — category listing page
- [x] Add "Effects" link to header navigation
- [x] Create `layouts/effects.vue` — effects layout with sidebar

#### 1.2 Create EffectPlayground component

- [x] Create `components/effects/EffectPlayground.vue` — main playground wrapper
- [ ] Structure:
  ```
  ┌─────────────────────────────────────────────────┐
  │  Demo Area (animation preview)                  │
  │  ┌─────────────────────────────────────────┐   │
  │  │                                         │   │
  │  │     "GSAP Қазақша құжаттама"            │   │
  │  │     (animated text)                     │   │
  │  │                                         │   │
  │  └─────────────────────────────────────────┘   │
  ├─────────────────────────────────────────────────┤
  │  Controls: [Text Input] [Play] [Reset]          │
  ├─────────────────────────────────────────────────┤
  │  Code Tabs: [Vue] [Script] [CSS]                │
  │  ┌─────────────────────────────────────────┐   │
  │  │ <template>                              │   │
  │  │   <div ref="textRef">{{ text }}</div>   │   │
  │  │ </template>                             │   │
  │  └─────────────────────────────────────────┘   │
  │  [Copy Code]                                    │
  └─────────────────────────────────────────────────┘
  ```

#### 1.3 Create CodeTabs component

- [x] Create `components/effects/CodeTabs.vue`
- [x] Three tabs: Vue (template), Script (JS/TS), CSS
- [x] Syntax highlighting with Shiki
- [x] Copy button for each tab
- [x] Copy all code button

#### 1.4 Create EffectControls component

- [x] Create `components/effects/EffectControls.vue`
- [x] Text input field (v-model)
- [x] Play button — run animation
- [x] Reset button — reset to initial state
- [x] Default text: "GSAP Қазақша құжаттама"

### Phase 2: Effects Data Structure (Аяқталды)

#### 2.1 Create effects data types

- [x] Create `types/effects.ts`:

  ```typescript
  interface Effect {
    id: string;
    name: string;
    nameKz: string;
    category: EffectCategory;
    description: string;
    descriptionKz: string;
    code: {
      vue: string;
      script: string;
      css: string;
    };
    defaultText: string;
  }

  type EffectCategory =
    | "text"
    | "scroll"
    | "image"
    | "card"
    | "navigation"
    | "button"
    | "container"
    | "loading"
    | "svg"
    | "cursor"
    | "micro"
    | "3d";
  ```

#### 2.2 Create effects registry

- [x] Create `data/effects/index.ts` — effects registry
- [x] Create `data/effects/text.ts` — text effects (16 effects)
- [x] Create helper function `getEffectsByCategory()`
- [x] Create helper function `getEffectById()`
- [x] Update pages to use effects registry
- [x] Update EffectPlayground with dynamic animations

### Phase 3: First Effect — Text Fade In (Аяқталды)

#### 3.1 Implement Text Fade In effect

- [x] Create `data/effects/text/fade-in.ts` (included in text.ts with 16 effects):

  ```typescript
  export const textFadeIn: Effect = {
    id: "text-fade-in",
    name: "Fade In",
    nameKz: "Пайда болу",
    category: "text",
    description: "Simple fade in animation",
    descriptionKz: "Қарапайым пайда болу анимациясы",
    code: {
      vue: `<template>
    <div ref="textRef" class="text-4xl font-bold">
      {{ text }}
    </div>
  </template>`,
      script: `const textRef = ref<HTMLElement>()
  const text = ref('GSAP Қазақша құжаттама')
  
  const play = () => {
    gsap.fromTo(textRef.value, 
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' }
    )
  }`,
      css: `.text-4xl {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }
  .font-bold {
    font-weight: 700;
  }`,
    },
    defaultText: "GSAP Қазақша құжаттама",
  };
  ```

#### 3.2 Create effect page for Text Fade In

- [x] Create working demo with user text input
- [x] Display code in tabs
- [x] Play/Reset functionality
- [x] Copy code functionality

### Phase 4: Effects Gallery Page (Аяқталды)

#### 4.1 Create effects gallery

- [x] Create `pages/effects/index.vue`
- [x] Display all categories as sections
- [x] Show effect cards with preview thumbnail
- [x] Link to individual effect pages

#### 4.2 Create EffectCard component

- [x] Create `components/effects/EffectCard.vue`
- [x] Show effect name (KZ)
- [x] Mini preview or icon
- [x] Category badge
- [x] Link to effect page

#### 4.3 Create effects sidebar

- [x] Create `components/effects/EffectsSidebar.vue`
- [x] List all categories
- [x] Expandable subcategories with effects list
- [x] Active effect highlighting

### Phase 5: Styling and Polish

#### 5.1 Design system

- [ ] Use GSAP color palette (dark theme)
- [ ] Demo area: dark background with subtle border
- [ ] Code area: github-dark theme
- [ ] Consistent spacing and typography

#### 5.2 Animations

- [ ] Page transitions
- [ ] Tab switching animation
- [ ] Button hover effects
- [ ] Smooth scroll between sections

---

## 📋 Effects Catalog (150+ effects)

### Text (Мәтін) — 20 effects

- [ ] fade-in — Fade in
- [ ] fade-in-up — Fade in from bottom
- [ ] fade-in-down — Fade in from top
- [ ] fade-in-left — Fade in from left
- [ ] fade-in-right — Fade in from right
- [ ] scale-in — Scale in
- [ ] rotate-in — Rotate in
- [ ] chars-fade — Characters fade in (SplitText)
- [ ] chars-slide — Characters slide up
- [ ] chars-random — Characters random order
- [ ] words-fade — Words fade in
- [ ] words-slide — Words slide
- [ ] lines-reveal — Lines reveal
- [ ] lines-mask — Lines with mask
- [ ] typewriter — Typewriter effect
- [ ] typewriter-cursor — Typewriter with cursor
- [ ] text-scramble — Text scramble/decode
- [ ] glitch — Glitch effect
- [ ] counter — Number counter
- [ ] hover-underline — Underline on hover

### Scroll (Скролл) — 15 effects

- [ ] scroll-fade-in — Fade in on scroll
- [ ] scroll-slide-up — Slide up on scroll
- [ ] scroll-slide-left — Slide left on scroll
- [ ] scroll-slide-right — Slide right on scroll
- [ ] scroll-scale — Scale on scroll
- [ ] scroll-rotate — Rotate on scroll
- [ ] parallax-simple — Simple parallax
- [ ] parallax-multi — Multi-layer parallax
- [ ] parallax-bg — Background parallax
- [ ] parallax-mouse — Mouse parallax
- [ ] pin-simple — Simple pin
- [ ] pin-animation — Pin with animation
- [ ] horizontal-scroll — Horizontal scroll section
- [ ] scroll-progress — Scroll progress bar
- [ ] scrub-animation — Scrub animation

### Image (Сурет) — 18 effects

- [ ] image-fade — Image fade in
- [ ] image-clip — Clip reveal
- [ ] image-mask — Mask reveal
- [ ] image-slide — Slide reveal
- [ ] image-curtain — Curtain effect
- [ ] image-zoom-hover — Zoom on hover
- [ ] image-pan-hover — Pan on hover
- [ ] image-tilt — 3D tilt on hover
- [ ] image-overlay — Overlay on hover
- [ ] image-caption — Caption reveal
- [ ] slider-basic — Basic slider
- [ ] slider-infinite — Infinite slider
- [ ] slider-draggable — Draggable slider
- [ ] lightbox — Lightbox animation
- [ ] masonry-reveal — Masonry reveal
- [ ] image-crossfade — Image crossfade
- [ ] before-after — Before/after slider

### Card (Карточка) — 14 effects

- [ ] card-lift — Lift with shadow
- [ ] card-tilt — 3D tilt
- [ ] card-flip — Flip front/back
- [ ] card-expand — Expand
- [ ] card-glow — Glow effect
- [ ] card-border — Border animation
- [ ] card-gradient — Gradient shift
- [ ] card-content-slide — Content slide
- [ ] card-overlay — Overlay reveal
- [ ] card-icon — Icon animation
- [ ] cards-stagger — Cards stagger in
- [ ] cards-grid — Grid reveal
- [ ] cards-random — Random reveal

### Navigation (Навигация) — 14 effects

- [ ] navbar-hide — Hide on scroll
- [ ] navbar-shrink — Shrink on scroll
- [ ] navbar-bg-change — Background change
- [ ] navbar-blur — Blur effect
- [ ] hamburger-x — Hamburger to X
- [ ] menu-slide — Menu slide
- [ ] menu-fullscreen — Fullscreen menu
- [ ] menu-stagger — Menu items stagger
- [ ] dropdown-anim — Dropdown animation
- [ ] mega-menu — Mega menu reveal
- [ ] link-underline — Link underline
- [ ] link-fill — Link fill effect
- [ ] active-indicator — Active indicator
- [ ] breadcrumb — Breadcrumb animation

### Button (Батырма) — 14 effects

- [ ] btn-scale — Scale on hover
- [ ] btn-bg-slide — Background slide
- [ ] btn-border — Border animation
- [ ] btn-ripple — Ripple effect
- [ ] btn-magnetic — Magnetic effect
- [ ] btn-shine — Shine effect
- [ ] btn-3d-press — 3D press
- [ ] btn-click — Click feedback
- [ ] btn-loading — Loading state
- [ ] btn-success — Success state
- [ ] btn-error — Error state
- [ ] btn-icon-rotate — Icon rotate
- [ ] btn-icon-morph — Icon morph
- [ ] btn-icon-bounce — Icon bounce

### Container (Контейнер) — 12 effects

- [ ] gradient-anim — Gradient animation
- [ ] bg-color-transition — Color transition
- [ ] animated-shapes — Animated shapes
- [ ] particles — Particles background
- [ ] wave-anim — Wave animation
- [ ] divider-anim — Animated divider
- [ ] wave-divider — SVG wave divider
- [ ] diagonal-reveal — Diagonal reveal
- [ ] section-reveal — Section reveal
- [ ] section-transition — Section transition
- [ ] accordion — Accordion animation
- [ ] tabs — Tab animation

### Loading (Жүктелу) — 14 effects

- [ ] spinner — Simple spinner
- [ ] progress-bar — Progress bar
- [ ] logo-loader — Logo animation
- [ ] counter-loader — Counter loader
- [ ] skeleton — Skeleton loading
- [ ] page-fade — Page fade transition
- [ ] page-slide — Page slide transition
- [ ] page-curtain — Curtain transition
- [ ] page-circle — Circle expand
- [ ] page-diagonal — Diagonal wipe
- [ ] lazy-reveal — Lazy load reveal
- [ ] placeholder — Placeholder animation
- [ ] image-lazy — Image lazy reveal

### SVG (SVG) — 10 effects

- [ ] path-draw — Path draw
- [ ] path-erase — Path erase
- [ ] path-morph — Path morph
- [ ] path-follow — Follow path
- [ ] shape-morph — Shape morph
- [ ] shape-rotate — Shape rotate
- [ ] shape-scale — Shape scale
- [ ] icon-animated — Animated icons
- [ ] logo-reveal — Logo reveal
- [ ] logo-draw — Logo draw

### Cursor (Курсор) — 6 effects

- [ ] cursor-custom — Custom cursor
- [ ] cursor-follower — Cursor follower
- [ ] cursor-magnetic — Magnetic cursor
- [ ] cursor-text — Cursor with text
- [ ] cursor-blend — Blend mode cursor
- [ ] cursor-trail — Cursor trail

### Micro-interactions (Микро) — 12 effects

- [ ] input-focus — Input focus
- [ ] input-validation — Validation animation
- [ ] checkbox — Checkbox animation
- [ ] toggle — Toggle switch
- [ ] select — Select dropdown
- [ ] toast — Toast notification
- [ ] tooltip — Tooltip animation
- [ ] modal — Modal animation
- [ ] popover — Popover animation
- [ ] copy-feedback — Copy feedback
- [ ] like-heart — Like/heart animation
- [ ] bookmark — Bookmark animation

### 3D / Advanced (3D) — 5 effects

- [ ] 3d-card-flip — 3D card flip
- [ ] 3d-carousel — 3D carousel
- [ ] perspective-scroll — Perspective scroll
- [ ] 3d-text — 3D text
- [ ] parallax-3d — 3D parallax layers

---

## Белгілер

- [ ] Жасалмаған
- [x] Аяқталған
- [~] Орындалуда
