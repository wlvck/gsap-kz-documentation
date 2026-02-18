---
title: SVG Path анимация
description: SVG path элементтерін GSAP арқылы анимациялау
---

# SVG Path анимация

SVG `<path>` элементі — ең қуатты SVG примитиві. Кез келген форманы сызуға мүмкіндік береді.

## Path негіздері

Path элементі `d` атрибуты арқылы анықталады:

```html
<svg width="200" height="200" viewBox="0 0 200 200">
  <path d="M 10 80 Q 95 10 180 80" fill="none" stroke="#0ae448" stroke-width="3" />
</svg>
```

### Path командалары

| Команда | Сипаттама                  |
| ------- | -------------------------- |
| M       | Move to (жылжу)            |
| L       | Line to (сызық)            |
| H       | Horizontal line (көлденең) |
| V       | Vertical line (тік)        |
| C       | Cubic bezier curve         |
| Q       | Quadratic bezier curve     |
| A       | Arc (доға)                 |
| Z       | Close path (жабу)          |

## Stroke анимациясы

### stroke-dasharray және stroke-dashoffset

Бұл қасиеттер path сызығын анимациялау үшін қолданылады:

```javascript
// Path ұзындығын алу
const path = document.querySelector("#myPath");
const length = path.getTotalLength();

// Бастапқы күй
gsap.set("#myPath", {
  strokeDasharray: length,
  strokeDashoffset: length,
});

// Анимация — path "сызылу" эффектісі
gsap.to("#myPath", {
  strokeDashoffset: 0,
  duration: 2,
  ease: "power2.inOut",
});
```

### Практикалық мысал: Сызық анимациясы

```html
<svg width="400" height="200" viewBox="0 0 400 200">
  <path
    id="signature"
    d="M 50 150 C 100 50, 150 50, 200 100 S 300 150, 350 100"
    fill="none"
    stroke="#0ae448"
    stroke-width="4"
    stroke-linecap="round"
  />
</svg>
```

```javascript
const signature = document.querySelector("#signature");
const length = signature.getTotalLength();

gsap.fromTo(
  "#signature",
  {
    strokeDasharray: length,
    strokeDashoffset: length,
  },
  {
    strokeDashoffset: 0,
    duration: 3,
    ease: "power1.inOut",
  }
);
```

## Path морфинг (негізгі)

Екі path арасында морфинг жасау (бірдей нүкте саны қажет):

```html
<svg width="200" height="200" viewBox="0 0 200 200">
  <path id="morphPath" d="M 100 20 L 180 180 L 20 180 Z" fill="#0ae448" />
</svg>
```

```javascript
// Үшбұрыштан шаршыға
gsap.to("#morphPath", {
  attr: {
    d: "M 30 30 L 170 30 L 170 170 L 30 170 Z",
  },
  duration: 2,
  ease: "power2.inOut",
});
```

> **Ескерту:** Күрделі морфинг үшін MorphSVG плагинін қолданыңыз.

## Path бойынша қозғалыс

Элементті path бойымен жылжыту:

```javascript
// Қарапайым тәсіл (MotionPath плагинсіз)
gsap.to("#element", {
  motionPath: {
    path: "#myPath",
    align: "#myPath",
    alignOrigin: [0.5, 0.5],
  },
  duration: 3,
  ease: "none",
});
```

## Stroke қасиеттері

```javascript
gsap.to("#myPath", {
  stroke: "#ff6b6b", // Түс
  strokeWidth: 5, // Қалыңдық
  strokeLinecap: "round", // Ұш формасы: butt, round, square
  strokeLinejoin: "round", // Қосылыс формасы: miter, round, bevel
  strokeMiterlimit: 4, // Miter шегі
  strokeOpacity: 0.8, // Мөлдірлік
  duration: 1,
});
```

## Күрделі мысал: Логотип анимациясы

```html
<svg width="300" height="100" viewBox="0 0 300 100">
  <path id="line1" d="M 20 50 L 80 50" stroke="#0ae448" stroke-width="4" fill="none" />
  <path id="line2" d="M 100 20 L 100 80" stroke="#0ae448" stroke-width="4" fill="none" />
  <path id="line3" d="M 120 50 L 180 50" stroke="#0ae448" stroke-width="4" fill="none" />
  <circle id="dot" cx="250" cy="50" r="0" fill="#0ae448" />
</svg>
```

```javascript
const tl = gsap.timeline();

// Әр сызықтың ұзындығын есептеу
["#line1", "#line2", "#line3"].forEach((id, i) => {
  const path = document.querySelector(id);
  const length = path.getTotalLength();

  gsap.set(id, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });

  tl.to(
    id,
    {
      strokeDashoffset: 0,
      duration: 0.5,
      ease: "power2.out",
    },
    i * 0.2
  );
});

// Нүкте пайда болуы
tl.to(
  "#dot",
  {
    attr: { r: 15 },
    duration: 0.3,
    ease: "back.out(1.7)",
  },
  "-=0.2"
);
```

## getTotalLength() функциясы

Path ұзындығын алу үшін:

```javascript
const path = document.querySelector("#myPath");
const totalLength = path.getTotalLength();

console.log(`Path ұзындығы: ${totalLength}px`);
```

## getPointAtLength() функциясы

Path бойындағы нүктенің координаталарын алу:

```javascript
const path = document.querySelector("#myPath");
const point = path.getPointAtLength(100);

console.log(`X: ${point.x}, Y: ${point.y}`);
```

## Кеңестер

1. **Path ұзындығы** — Анимация алдында есептеп алыңыз
2. **stroke-linecap** — "round" жақсы көрінеді
3. **Оптимизация** — Қарапайым path қолданыңыз
4. **Fallback** — Path қолдамайтын браузерлер үшін дайындалыңыз

## Қорытынды

SVG Path анимациясы — веб-дизайндағы ең әсерлі эффекттердің бірі. stroke-dasharray және stroke-dashoffset қасиеттерін меңгеру арқылы кез келген сызықты анимациялауға болады.
