# GSAP Қазақша Құжаттама — Claude Нұсқаулығы

## Жоба туралы

Бұл GSAP (GreenSock Animation Platform) кітапханасының қазақ тіліндегі толық құжаттамасы. Мақсат — қазақстандық фронтенд әзірлеушілерге GSAP-ты түсінікті тілде үйрету.

## Tech Stack

- **Framework:** Nuxt 3
- **Styling:** Tailwind CSS
- **Animation:** GSAP
- **Content:** Markdown файлдар `content/` папкасында

## Жоба құрылымы

```
gsap-docs/
├── app/
│   ├── components/
│   │   ├── DocsLayout.vue      # Негізгі layout
│   │   ├── DocsSidebar.vue     # Сол жақ навигация
│   │   ├── DocsContent.vue     # Контент аймағы
│   │   ├── CodeBlock.vue       # Код блоктары
│   │   └── TableOfContents.vue # Оң жақ мазмұны
│   ├── pages/
│   │   ├── index.vue           # Басты бет
│   │   └── docs/
│   │       └── [...slug].vue   # Динамикалық құжаттама беттері
│   └── layouts/
│       └── docs.vue            # Құжаттама layout
├── content/
│   └── docs/                   # Markdown құжаттама файлдары
├── public/
├── nuxt.config.ts
├── tailwind.config.ts
├── claude.md                   # Осы файл
└── todo.md                     # Тапсырмалар тізімі
```

## Дизайн жүйесі

### Түстер (GSAP стилі)

```
--gsap-bg-primary: #0e100f       # Негізгі фон
--gsap-bg-secondary: #161817     # Екінші фон
--gsap-bg-tertiary: #1c1e1d      # Карточка фоны
--gsap-green: #0ae448            # Жасыл акцент
--gsap-green-dark: #0ba934       # Қою жасыл
--gsap-text-primary: #fffce1     # Негізгі мәтін
--gsap-text-secondary: #a1a1a6   # Екінші мәтін
--gsap-border: #2a2d2b           # Жиектер
```

### Типография

- **Headings:** Inter, bold
- **Body:** Inter, regular
- **Code:** JetBrains Mono / Fira Code

## Компоненттер

### DocsSidebar
- Барлық бөлімдер тізімі
- Ашылатын суб-тақырыптар
- Белсенді бет белгіленуі
- Мобильді toggle

### DocsContent
- Markdown рендеринг
- Код блоктары syntax highlighting
- Кеңес/ескерту блоктары

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
pnpm dev      # Development server
pnpm build    # Production build
pnpm preview  # Preview production
```
