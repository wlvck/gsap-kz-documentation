---
title: DrawSVG плагині
description: GSAP DrawSVG плагині арқылы SVG сызықтарын анимациялау
---

# DrawSVG плагині

DrawSVG — GSAP Club плагині, SVG stroke анимациясын жеңілдетеді. stroke-dasharray/dashoffset-ті автоматты басқарады.

## Орнату

```javascript
// Club мүшелері үшін
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);
```

## Негізгі қолдану

### Қарапайым сызу анимациясы

```html
<svg viewBox="0 0 200 100">
  <path id="myLine" d="M10,50 Q100,10 190,50" fill="none" stroke="#0ae448" stroke-width="3" />
</svg>
```

```javascript
// Сызықты толық сызу
gsap.from("#myLine", {
  drawSVG: 0, // 0% бастау
  duration: 2,
  ease: "power2.inOut",
});

// Немесе
gsap.to("#myLine", {
  drawSVG: "100%", // Толық сызу
  duration: 2,
});
```

### Пайызбен басқару

```javascript
// 0%-дан 50%-ға дейін
gsap.to("#myLine", {
  drawSVG: "50%",
  duration: 1,
});

// 25%-дан 75%-ға дейін
gsap.fromTo("#myLine", { drawSVG: "25%" }, { drawSVG: "75%", duration: 1 });

// Диапазон
gsap.to("#myLine", {
  drawSVG: "20% 80%", // Ортасы ғана
  duration: 1,
});
```

## drawSVG мәндері

| Мән          | Сипаттама                  |
| ------------ | -------------------------- |
| `0`          | Көрінбейді                 |
| `"100%"`     | Толық көрінеді             |
| `"50%"`      | Жартысы көрінеді (басынан) |
| `"0% 50%"`   | Басынан жартысына дейін    |
| `"50% 100%"` | Жартысынан соңына дейін    |
| `"25% 75%"`  | Ортаңғы бөлігі             |

## Анимация бағыты

### Басынан аяғына

```javascript
gsap.fromTo("#line", { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 2 });
```

### Аяғынан басына

```javascript
gsap.fromTo("#line", { drawSVG: "100% 100%" }, { drawSVG: "0% 100%", duration: 2 });
```

### Ортадан екі жаққа

```javascript
gsap.fromTo("#line", { drawSVG: "50% 50%" }, { drawSVG: "0% 100%", duration: 2 });
```

### Екі жақтан ортаға

```javascript
gsap.fromTo("#line", { drawSVG: "0% 100%" }, { drawSVG: "50% 50%", duration: 2 });
```

## Практикалық мысалдар

### Қол қойылымы анимациясы

```html
<svg viewBox="0 0 400 150">
  <path
    id="signature"
    d="M20,100 C50,20 100,20 130,80 S180,140 220,80 S280,20 320,80 S380,140 380,80"
    fill="none"
    stroke="#0ae448"
    stroke-width="4"
    stroke-linecap="round"
  />
</svg>
```

```javascript
gsap.from("#signature", {
  drawSVG: 0,
  duration: 3,
  ease: "power1.inOut",
});
```

### Логотип сызылуы

```html
<svg id="logo" viewBox="0 0 300 100">
  <path class="logo-line" d="M20,50 L80,50" />
  <path class="logo-line" d="M90,20 L90,80" />
  <path class="logo-line" d="M100,50 L160,50" />
  <circle class="logo-circle" cx="200" cy="50" r="30" fill="none" />
  <path class="logo-line" d="M240,20 L280,80" />
</svg>
```

```javascript
const tl = gsap.timeline();

tl.from(".logo-line", {
  drawSVG: 0,
  duration: 0.5,
  stagger: 0.2,
  ease: "power2.out",
}).from(
  ".logo-circle",
  {
    drawSVG: 0,
    duration: 1,
    ease: "power2.inOut",
  },
  "-=0.3"
);
```

### Жүктеу индикаторы

```html
<svg viewBox="0 0 100 100">
  <circle
    id="loader"
    cx="50"
    cy="50"
    r="40"
    fill="none"
    stroke="#0ae448"
    stroke-width="6"
    stroke-linecap="round"
  />
</svg>
```

```javascript
gsap.fromTo(
  "#loader",
  { drawSVG: "0% 0%", rotation: 0 },
  {
    drawSVG: "0% 80%",
    rotation: 360,
    duration: 1.5,
    ease: "power2.inOut",
    repeat: -1,
    transformOrigin: "center center",
  }
);
```

### Scroll-мен байланысты сызу

```javascript
gsap.to("#line", {
  drawSVG: "100%",
  scrollTrigger: {
    trigger: "#section",
    start: "top center",
    end: "bottom center",
    scrub: true,
  },
});
```

## Бірнеше элемент

### Stagger қолдану

```javascript
gsap.from(".line-group path", {
  drawSVG: 0,
  duration: 1,
  stagger: 0.1,
  ease: "power2.out",
});
```

### Timeline ішінде

```javascript
const tl = gsap.timeline();

tl.from("#line1", { drawSVG: 0, duration: 0.5 })
  .from("#line2", { drawSVG: 0, duration: 0.5 }, "-=0.3")
  .from("#line3", { drawSVG: 0, duration: 0.5 }, "-=0.3");
```

## Ұзындық негізінде

```javascript
// Пиксельмен
gsap.to("#line", {
  drawSVG: "100px", // 100 пиксель сызу
  duration: 1,
});

// Диапазон пиксельмен
gsap.to("#line", {
  drawSVG: "50px 150px",
  duration: 1,
});
```

## getLength()

Path ұзындығын алу:

```javascript
const length = DrawSVGPlugin.getLength("#myPath");
console.log(`Ұзындығы: ${length}px`);
```

## getPosition()

Ағымдағы күйді алу:

```javascript
const pos = DrawSVGPlugin.getPosition("#myPath");
console.log(`Басы: ${pos.start}, Соңы: ${pos.end}`);
```

## Кеңестер

1. **stroke-linecap: round** — Жақсы көрінеді
2. **fill: none** — Сызықтар үшін міндетті
3. **pathLength** — Дәл бақылау үшін қолданыңыз
4. **Transform origin** — Шеңберлер үшін орнатыңыз

## stroke-dasharray-мен салыстыру

| DrawSVG          | stroke-dasharray |
| ---------------- | ---------------- |
| Автоматты        | Қолмен есептеу   |
| Пайыз қолдауы    | Тек пиксель      |
| Қарапайым API    | Күрделі формула  |
| Диапазон қолдауы | Қиын             |

## Қорытынды

DrawSVG — SVG stroke анимациясының ең қарапайым жолы. stroke-dasharray/dashoffset-ті қолмен есептеудің орнына, пайызбен немесе диапазонмен жұмыс істеуге мүмкіндік береді.
