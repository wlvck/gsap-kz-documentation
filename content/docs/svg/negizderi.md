---
title: SVG анимация негіздері
description: GSAP арқылы SVG элементтерін анимациялау негіздері
---

# SVG анимация негіздері

SVG (Scalable Vector Graphics) — веб-беттерде векторлық графиканы көрсету форматы. GSAP SVG элементтерін анимациялау үшін тамаша мүмкіндіктер ұсынады.

## SVG дегеніміз не?

SVG — бұл XML негізіндегі векторлық графика форматы. HTML ішінде тікелей қолдануға болады:

```html
<svg width="200" height="200" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="50" fill="#0ae448" />
  <rect x="20" y="20" width="60" height="60" fill="#fffce1" />
</svg>
```

## SVG элементтерін таңдау

SVG элементтерін CSS селекторлары арқылы таңдауға болады:

```javascript
// ID бойынша
gsap.to("#myCircle", { x: 100 });

// Class бойынша
gsap.to(".svg-shape", { scale: 1.5 });

// Tag бойынша
gsap.to("circle", { fill: "#ff0000" });

// Атрибут бойынша
gsap.to("[data-animate]", { opacity: 0.5 });
```

## Негізгі SVG қасиеттер

### Transform қасиеттері

```javascript
gsap.to("#shape", {
  x: 100, // Көлденең жылжу
  y: 50, // Тік жылжу
  scale: 2, // Масштаб
  rotation: 45, // Айналу (градус)
  skewX: 10, // X бойынша қисайту
  skewY: 5, // Y бойынша қисайту
});
```

### SVG-ге тән қасиеттер

```javascript
gsap.to("circle", {
  attr: {
    cx: 150, // Орталық X
    cy: 150, // Орталық Y
    r: 75, // Радиус
  },
  fill: "#ff6b6b", // Толтыру түсі
  stroke: "#ffffff", // Сызық түсі
  strokeWidth: 3, // Сызық қалыңдығы
  opacity: 0.8, // Мөлдірлік
});
```

### attr қасиеті

SVG атрибуттарын тікелей өзгерту үшін `attr` объектісін қолданамыз:

```javascript
gsap.to("rect", {
  attr: {
    width: 100,
    height: 100,
    rx: 10, // Бұрыш радиусы
    ry: 10,
  },
  duration: 1,
});
```

## Transform Origin

SVG элементтерінің transform origin әдепкі бойынша (0, 0) нүктесінде болады. Оны өзгерту үшін:

```javascript
gsap.to("#shape", {
  rotation: 360,
  transformOrigin: "center center", // Ортасынан айналу
  duration: 2,
});

// Басқа мәндер
gsap.to("#shape", {
  rotation: 360,
  transformOrigin: "50% 50%", // Пайызбен
});

gsap.to("#shape", {
  rotation: 360,
  transformOrigin: "100px 50px", // Пиксельмен
});
```

## SVG viewBox анимациясы

viewBox атрибутын анимациялау арқылы zoom эффектісін жасауға болады:

```javascript
gsap.to("svg", {
  attr: {
    viewBox: "50 50 100 100", // Zoom in
  },
  duration: 2,
});
```

## Практикалық мысал

```html
<svg id="demo" width="300" height="200" viewBox="0 0 300 200">
  <circle id="ball" cx="50" cy="100" r="30" fill="#0ae448" />
  <rect id="box" x="200" y="70" width="60" height="60" fill="#fffce1" />
</svg>
```

```javascript
// Timeline арқылы анимация
const tl = gsap.timeline({ repeat: -1, yoyo: true });

tl.to("#ball", {
  cx: 150,
  duration: 1,
  ease: "power2.inOut",
})
  .to(
    "#ball",
    {
      r: 50,
      fill: "#ff6b6b",
      duration: 0.5,
    },
    "-=0.5"
  )
  .to(
    "#box",
    {
      rotation: 45,
      transformOrigin: "center center",
      duration: 1,
    },
    "-=0.5"
  );
```

## SVG vs CSS Transform

| Қасиет    | SVG attr         | CSS Transform      |
| --------- | ---------------- | ------------------ |
| Дәлдік    | Жоғары           | Орташа             |
| Өнімділік | Жақсы            | Өте жақсы          |
| Қолдану   | Күрделі формалар | Қарапайым анимация |

## Кеңестер

1. **Transform origin** — SVG үшін әрқашан көрсетіңіз
2. **attr объектісі** — SVG атрибуттары үшін қолданыңыз
3. **will-change** — Күрделі анимацияларда қолданыңыз
4. **GPU acceleration** — `force3D: true` қосыңыз

## Қорытынды

SVG анимациясы GSAP-пен қуатты және икемді. Негізгі қасиеттерді меңгергеннен кейін, DrawSVG, MorphSVG және MotionPath плагиндерімен күрделі эффекттер жасауға болады.
