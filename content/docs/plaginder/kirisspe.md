---
title: Плагиндер туралы
description: GSAP плагиндері - қосымша мүмкіндіктер мен функционал
---

# GSAP Плагиндері

GSAP-тың қуаты оның плагиндер экожүйесінде. Плагиндер қосымша мүмкіндіктер береді: drag-and-drop, мәтін анимациялары, қозғалыс жолдары және т.б.

## Плагин түрлері

### Тегін плагиндер

Барлық жобаларда тегін қолдануға болады:

| Плагин               | Сипаттама                        |
| -------------------- | -------------------------------- |
| **ScrollTrigger**    | Скролл анимациялары              |
| **Draggable**        | Drag-and-drop функционалы        |
| **Flip**             | FLIP анимациялары                |
| **MotionPathPlugin** | SVG жолы бойынша қозғалыс        |
| **TextPlugin**       | Мәтінді өзгерту                  |
| **Observer**         | Скролл, touch, pointer оқиғалары |

### Club GreenSock плагиндері

Ақылы Club GreenSock мүшелігімен:

| Плагин             | Сипаттама              |
| ------------------ | ---------------------- |
| **MorphSVGPlugin** | SVG пішіндерін морфтау |
| **DrawSVGPlugin**  | SVG сызықтарын салу    |
| **SplitText**      | Мәтінді бөлу           |
| **ScrollSmoother** | Тегіс скролл           |
| **GSDevTools**     | Дебаг құралдары        |

## Плагинді орнату

### NPM арқылы

```bash
npm install gsap
```

Барлық тегін плагиндер `gsap` пакетіне кіреді:

```javascript
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { TextPlugin } from "gsap/TextPlugin";

// Плагиндерді тіркеу
gsap.registerPlugin(Draggable, Flip, MotionPathPlugin, TextPlugin);
```

### CDN арқылы

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@latest/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@latest/dist/Draggable.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@latest/dist/Flip.min.js"></script>
```

## registerPlugin()

Плагинді қолданар алдында міндетті түрде тіркеу керек:

```javascript
// Бір плагин
gsap.registerPlugin(ScrollTrigger);

// Бірнеше плагин
gsap.registerPlugin(ScrollTrigger, Draggable, Flip);
```

### Неге тіркеу керек?

1. **Tree-shaking** — қолданылмаған код жойылады
2. **Қақтығыстарды болдырмау** — плагиндер дұрыс жүктеледі
3. **Версия үйлесімділігі** — GSAP core-мен үйлесімділік

## Плагин тексеру

```javascript
// Плагин тіркелген бе?
console.log(gsap.plugins.scrollTrigger); // ScrollTrigger немесе undefined
console.log(gsap.plugins.draggable); // Draggable немесе undefined
```

## Келесі қадамдар

- [Draggable](/docs/plaginder/draggable) — drag-and-drop
- [Flip](/docs/plaginder/flip) — FLIP анимациялары
- [MotionPath](/docs/plaginder/motionpath) — жол бойынша қозғалыс
- [TextPlugin](/docs/plaginder/text) — мәтін анимациялары
