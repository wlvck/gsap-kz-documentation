---
title: MotionPath плагині
description: GSAP MotionPath плагині арқылы элементтерді жол бойынша жылжыту
---

# MotionPath плагині

MotionPath — элементтерді SVG path немесе кез келген жол бойынша анимациялау плагині.

## Орнату

```javascript
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);
```

> MotionPath — тегін плагин, Club мүшелігі қажет емес.

## Негізгі қолдану

### SVG Path бойынша қозғалыс

```html
<svg viewBox="0 0 400 200">
  <path
    id="flightPath"
    d="M20,100 Q100,20 200,100 T380,100"
    fill="none"
    stroke="#333"
    stroke-width="2"
  />
  <circle id="plane" cx="20" cy="100" r="10" fill="#0ae448" />
</svg>
```

```javascript
gsap.to("#plane", {
  motionPath: {
    path: "#flightPath",
    align: "#flightPath",
    alignOrigin: [0.5, 0.5],
  },
  duration: 3,
  ease: "power1.inOut",
});
```

### Қарапайым синтаксис

```javascript
// Тек path көрсету
gsap.to("#element", {
  motionPath: "#myPath",
  duration: 2,
});
```

## Конфигурация опциялары

### path

Жол көзі:

```javascript
gsap.to("#el", {
  motionPath: {
    path: "#svgPath", // SVG path селекторы
    // немесе
    path: "M0,0 C100,0 100,100 200,100", // Path data
    // немесе
    path: [
      // Координаталар массиві
      { x: 0, y: 0 },
      { x: 100, y: 50 },
      { x: 200, y: 0 },
    ],
  },
  duration: 2,
});
```

### align

Элементті path-қа туралау:

```javascript
gsap.to("#el", {
  motionPath: {
    path: "#path",
    align: "#path", // Path-қа туралау
  },
  duration: 2,
});
```

### alignOrigin

Туралау нүктесі:

```javascript
gsap.to("#el", {
  motionPath: {
    path: "#path",
    align: "#path",
    alignOrigin: [0.5, 0.5], // Ортасынан [x, y]
  },
  duration: 2,
});
```

### autoRotate

Жол бағытына қарай айналу:

```javascript
gsap.to("#el", {
  motionPath: {
    path: "#path",
    autoRotate: true, // Жол бағытына қарау
    // немесе
    autoRotate: 90, // 90° қосымша бұрылыс
  },
  duration: 2,
});
```

### start және end

Жолдың бөлігі бойынша қозғалыс:

```javascript
gsap.to("#el", {
  motionPath: {
    path: "#path",
    start: 0.2, // 20%-дан бастау
    end: 0.8, // 80%-да аяқтау
  },
  duration: 2,
});
```

### offsetX және offsetY

Ығысу:

```javascript
gsap.to("#el", {
  motionPath: {
    path: "#path",
    align: "#path",
    offsetX: 10, // X бойынша ығысу
    offsetY: -5, // Y бойынша ығысу
  },
  duration: 2,
});
```

## Практикалық мысалдар

### Ұшақ ұшуы

```html
<svg viewBox="0 0 500 300">
  <path
    id="route"
    d="M50,250 Q150,50 250,150 T450,50"
    fill="none"
    stroke="#ccc"
    stroke-dasharray="5,5"
  />
  <g id="airplane">
    <polygon points="0,-10 20,0 0,10 5,0" fill="#0ae448" />
  </g>
</svg>
```

```javascript
gsap.to("#airplane", {
  motionPath: {
    path: "#route",
    align: "#route",
    alignOrigin: [0.5, 0.5],
    autoRotate: true,
  },
  duration: 4,
  ease: "power1.inOut",
  repeat: -1,
});
```

### Орбита анимациясы

```javascript
// Шеңбер бойынша айналу
gsap.to("#satellite", {
  motionPath: {
    path: [
      { x: 100, y: 0 },
      { x: 0, y: 100 },
      { x: -100, y: 0 },
      { x: 0, y: -100 },
      { x: 100, y: 0 },
    ],
    curviness: 1.5,
  },
  duration: 3,
  repeat: -1,
  ease: "none",
});
```

### Координаталар массиві

```javascript
gsap.to("#ball", {
  motionPath: {
    path: [
      { x: 0, y: 0 },
      { x: 100, y: -50 },
      { x: 200, y: 0 },
      { x: 300, y: -100 },
      { x: 400, y: 0 },
    ],
    curviness: 1.25, // Қисықтық дәрежесі
    autoRotate: true,
  },
  duration: 3,
  ease: "power1.inOut",
});
```

### ScrollTrigger-мен біріктіру

```javascript
gsap.to("#car", {
  motionPath: {
    path: "#road",
    align: "#road",
    alignOrigin: [0.5, 0.5],
    autoRotate: true,
  },
  scrollTrigger: {
    trigger: "#scene",
    start: "top center",
    end: "bottom center",
    scrub: 1,
  },
});
```

## Утилита функциялары

### arrayToRawPath()

Координаталарды RawPath-қа айналдыру:

```javascript
const points = [
  { x: 0, y: 0 },
  { x: 100, y: 50 },
  { x: 200, y: 0 },
];

const rawPath = MotionPathPlugin.arrayToRawPath(points, {
  curviness: 1,
});
```

### getRawPath()

SVG path-тан RawPath алу:

```javascript
const rawPath = MotionPathPlugin.getRawPath("#myPath");
```

### getRelativePosition()

Екі элемент арасындағы қатынасты позицияны алу:

```javascript
const pos = MotionPathPlugin.getRelativePosition("#element", "#container", [0.5, 0.5], [0.5, 0.5]);
```

### convertToPath()

Кез келген SVG формасын path-қа айналдыру:

```javascript
MotionPathPlugin.convertToPath("circle, rect, ellipse");
```

## curviness параметрі

```javascript
gsap.to("#el", {
  motionPath: {
    path: points,
    curviness: 0, // Тік сызықтар
    // curviness: 1,   // Қалыпты қисықтық
    // curviness: 2,   // Күшті қисықтық
  },
  duration: 2,
});
```

## type параметрі

```javascript
gsap.to("#el", {
  motionPath: {
    path: points,
    type: "cubic", // Cubic bezier (әдепкі)
    // type: "thru",   // Нүктелер арқылы өту
    // type: "soft",   // Жұмсақ қисықтар
  },
  duration: 2,
});
```

## MotionPath Editor

GSAP MotionPath Editor — визуалды құрал:

```javascript
// Debug режимінде жолды көрсету
MotionPathPlugin.arrayToRawPath(points, {
  curviness: 1,
});

// Жолды SVG ретінде көрсету
gsap.set("#debugPath", {
  attr: {
    d: MotionPathPlugin.rawPathToString(rawPath),
  },
});
```

## Кеңестер

1. **alignOrigin** — Элемент ортасы үшін [0.5, 0.5]
2. **autoRotate** — Бағытқа қарай айналу үшін
3. **curviness** — Тегіс қозғалыс үшін 1-2
4. **ease: "none"** — Тұрақты жылдамдық үшін

## Қорытынды

MotionPath — күрделі қозғалыс траекторияларын жасаудың ең қуатты құралы. SVG path немесе координаталар массиві арқылы кез келген жолды анықтауға болады.
