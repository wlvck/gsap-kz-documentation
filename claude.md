# GSAP Қазақша Құжаттама — Claude Нұсқаулығы

## Жоба туралы

Бұл GSAP (GreenSock Animation Platform) кітапханасының қазақ тіліндегі толық құжаттамасы. Мақсат — қазақстандық фронтенд әзірлеушілерге GSAP-ты түсінікті тілде үйрету.

## Tech Stack

- **Framework:** Nuxt 4
- **Styling:** Tailwind CSS
- **Animation:** GSAP
- **Content:** @nuxt/content v3 (Markdown файлдар `content/` папкасында)
- **Linting:** ESLint v9 + @nuxt/eslint
- **Formatting:** Prettier
- **Git Hooks:** Husky + lint-staged
- **Type Checking:** TypeScript + vue-tsc

## Жоба құрылымы

```
gsap-documentation/
├── components/
│   ├── DocsLayout.vue      # Негізгі layout (sidebar + content)
│   └── DocsSidebar.vue     # Сол жақ навигация + мобильді меню
├── pages/
│   ├── index.vue           # Басты бет
│   └── docs/
│       └── [...slug].vue   # Динамикалық құжаттама беттері
├── layouts/
│   └── docs.vue            # Құжаттама layout
├── content/
│   └── docs/
│       └── kirisspe/       # Кіріспе бөлімі (4 файл)
├── assets/
│   └── css/
│       └── tailwind.css    # Tailwind стильдер
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── .husky/
│   └── pre-commit          # Git hook (lint-staged)
├── nuxt.config.ts
├── tailwind.config.ts
├── eslint.config.mjs
├── .prettierrc
├── tsconfig.json
├── CLAUDE.md               # Осы файл
└── todo.md                 # Тапсырмалар тізімі
```

## Дизайн жүйесі

### Түстер (GSAP стилі)

Tailwind config-те анықталған:

```
gsap-bg-primary: #0e100f       # Негізгі фон
gsap-bg-secondary: #161817     # Екінші фон
gsap-bg-tertiary: #1c1e1d      # Карточка фоны
gsap-green: #0ae448            # Жасыл акцент
gsap-green-dark: #0ba934       # Қою жасыл
gsap-green-light: #3eff7a      # Ашық жасыл
gsap-text-primary: #fffce1     # Негізгі мәтін
gsap-text-secondary: #a1a1a6   # Екінші мәтін
gsap-text-muted: #6b6b70       # Өшірілген мәтін
gsap-border: #2a2d2b           # Жиектер
```

### Типография

- **Headings:** Inter, bold
- **Body:** Inter, regular
- **Code:** JetBrains Mono / Fira Code

## Компоненттер

### DocsLayout.vue

- Sidebar + main content wrapper
- Mobile menu toggle button
- Responsive layout (lg:ml-72)

### DocsSidebar.vue

- Навигация тізімі (navigation array)
- Белсенді бет белгіленуі (isActive)
- Мобильді toggle + backdrop
- Logo + branding

### pages/docs/[...slug].vue

- Nuxt Content v3 API (queryContent + ContentRenderer)
- Prose стильдер (typography)
- 404 fallback

## Құжаттама бөлімдері

1. **Кіріспе** — GSAP негіздері, орнату
2. **Негіздер** — to, from, fromTo, қасиеттер
3. **Easing** — Жеделдету функциялары
4. **Timeline** — Анимациялар тізбегі
5. **ScrollTrigger** — Скролл анимациялары
6. **SVG Анимация** — SVG-мен жұмыс
7. **Плагиндер** — Қосымша плагиндер
8. **Утилиталар** — Көмекші функциялар
9. **Жетілдірілген** — Күрделі техникалар
10. **Практика** — Нақты жобалар
11. **Фреймворктар** — React, Vue, Nuxt
12. **Оңтайландыру** — Performance
13. **Анықтамалық** — Толық анықтама
14. **Қосымша** — Ресурстар

## Әзірлеу ережелері

1. **Қазақ тілі** — Барлық контент қазақша, техникалық терминдер сақталады
2. **Қарапайым тіл** — Түсінікті, жаңадан бастаушыларға арналған
3. **Көп мысал** — Әр түсініктемеге код мысалы
4. **Интерактивті** — Мүмкіндігінше live demo

## Командалар

```bash
# Development
pnpm dev          # Development server (localhost:3000)
pnpm build        # Production build
pnpm generate     # Static site generation
pnpm preview      # Preview production build

# Code Quality
pnpm lint         # ESLint тексеру
pnpm lint:fix     # ESLint автотүзету
pnpm format       # Prettier форматтау
pnpm typecheck    # TypeScript тексеру

# Git hooks (автоматты)
# pre-commit: lint-staged (eslint + prettier)
```

## Nuxt Content API

```typescript
// pages/docs/[...slug].vue
const { data: page } = await useAsyncData(`docs-${slug.value}`, () =>
  queryContent(`/docs/${slug.value}`).findOne()
);

// Template
<ContentRenderer :value="page" />
```
