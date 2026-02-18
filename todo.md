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
- [ ] Ашылатын суб-тақырыптар (collapsible)

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

## 🎨 3-кезең: UI компоненттер (Орындалуда)

### Код блоктары

- [x] Copy button
- [ ] Syntax highlighting (Shiki) — Nuxt Content v3 әдепкі
- [ ] Filename көрсету

### Арнайы блоктар

- [x] Callout компоненті (Tip, Warning, Info, Danger)

---

## 📱 4-кезең: Responsive

- [x] Mobile навигация (DocsSidebar)
- [x] Mobile menu toggle
- [ ] Tablet layout оңтайландыру
- [ ] Touch interactions

---

## 🔍 5-кезең: Қосымша функционал

- [ ] Іздеу функциясы
- [ ] Тақырып ауыстыру (dark/light)
- [ ] Прогресс индикаторы
- [ ] GitHub сілтемелер
- [x] Table of Contents (оң жақ)

---

## 🚢 6-кезең: Деплой

- [ ] Vercel/Netlify конфигурация
- [ ] Domain орнату
- [ ] SEO мета тегтер
- [ ] Open Graph суреттер

---

## Белгілер

- [ ] Жасалмаған
- [x] Аяқталған
- [~] Орындалуда
