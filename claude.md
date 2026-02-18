# GSAP Қазақша Құжаттама — Claude Нұсқаулығы

## Жоба туралы

Бұл GSAP (GreenSock Animation Platform) кітапханасының қазақ тіліндегі толық құжаттамасы. Мақсат — қазақстандық фронтенд әзірлеушілерге GSAP-ты түсінікті тілде үйрету.

## Tech Stack

- **Framework:** Nuxt 3/4
- **Styling:** Tailwind CSS
- **Animation:** GSAP
- **Content:** Nuxt Content v3
- **Smooth Scroll:** Lenis (жоспарда)

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

## Беттер құрылымы

### Header навигациясы

- **Logo** — GSAP Қазақша
- **Docs** — /docs (құжаттама)
- **Showcases** — /showcases (сайттар галереясы)
- **Байланыс** — dropdown:
  - Email: [почта мекенжайы]
  - Telegram: [telegram сілтемесі]
- **GitHub** — репозиторий сілтемесі
- **Іздеу** — ⌘K

### Негізгі беттер

- `/` — Басты бет (hero, features, quick links)
- `/docs/[...slug]` — Құжаттама беттері
- `/showcases` — GSAP қолданған сайттар галереясы

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

## Компоненттер

### Бар компоненттер

- `DocsSidebar.vue` — Сол жақ навигация
- `Callout.vue` — Tip/Warning/Info блоктары
- `TableOfContents.vue` — Оң жақ мазмұны

### Қосылатын компоненттер

- `ScrollToTop.vue` — Жоғары көтерілу батырмасы
- `ShowcaseCard.vue` — Сайт карточкасы
- `ContactDropdown.vue` — Байланыс dropdown
- `EasingVisualizer.vue` — Easing визуализаторы

## Showcases бөлімі

### Карточка құрылымы

```typescript
interface Showcase {
  id: string;
  title: string; // Сайт атауы
  description: string; // Қысқаша сипаттама
  url: string; // Сайт сілтемесі
  image: string; // Скриншот
  tags: string[]; // ['ScrollTrigger', 'SplitText', ...]
  featured?: boolean; // Ерекшеленген
}
```

### Деректер сақтау

- `data/showcases.json` немесе `content/showcases/` папкасында

## Smooth Scroll (Lenis)

### Орнату

```bash
pnpm add lenis
```

### Интеграция

```typescript
// plugins/lenis.client.ts
import Lenis from "lenis";

export default defineNuxtPlugin(() => {
  const lenis = new Lenis();

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return {
    provide: {
      lenis,
    },
  };
});
```

## PWA конфигурация

### Модуль

```bash
pnpm add -D @vite-pwa/nuxt
```

### nuxt.config.ts

```typescript
export default defineNuxtConfig({
  modules: ["@vite-pwa/nuxt"],
  pwa: {
    manifest: {
      name: "GSAP Қазақша Құжаттама",
      short_name: "GSAP KZ",
      theme_color: "#0ae448",
      background_color: "#0e100f",
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
  },
});
```

## Әзірлеу ережелері

1. **Қазақ тілі** — Барлық контент қазақша, техникалық терминдер сақталады
2. **Қарапайым тіл** — Түсінікті, жаңадан бастаушыларға арналған
3. **Көп мысал** — Әр түсініктемеге код мысалы
4. **GSAP стилі** — Қара фон, жасыл акценттер

## Командалар

```bash
pnpm dev      # Development server
pnpm build    # Production build
pnpm preview  # Preview production
pnpm lint     # ESLint тексеру
pnpm format   # Prettier форматтау
```

## Байланыс

- **Email:** [почта мекенжайы]
- **Telegram:** [telegram сілтемесі]
- **GitHub:** [репозиторий сілтемесі]
