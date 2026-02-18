---
title: MotionPath
description: GSAP MotionPathPlugin - элементтерді SVG жолы бойынша қозғалту
---

# MotionPath

**MotionPathPlugin** — элементтерді SVG path немесе координаттар бойынша қозғалтуға мүмкіндік береді.

## Орнату

```javascript
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);
```

## Негізгі қолданылуы

### SVG path бойынша

```javascript
gsap.to(".rocket", {
  duration: 5,
  motionPath: {
    path: "#flight-path", // SVG path элементі
    align: "#flight-path",
    autoRotate: true,
  },
});
```

### Координаттар бойынша

```javascript
gsap.to(".ball", {
  duration: 2,
  motionPath: {
    path: [
      { x: 0, y: 0 },
      { x: 100, y: -50 },
      { x: 200, y: 0 },
      { x: 300, y: 50 },
    ],
  },
});
```

## motionPath параметрлері

### path

Қозғалыс жолы:

```javascript
motionPath: {
  path: "#myPath",           // SVG path селектор
  path: pathElement,          // DOM элемент
  path: "M0,0 C50,50 100,0",  // SVG path string
  path: [{x:0,y:0}, {x:100,y:100}], // координаттар
}
```

### align

Элементті жолға туралау:

```javascript
motionPath: {
  path: "#myPath",
  align: "#myPath", // жолдың өзіне туралау
  alignOrigin: [0.5, 0.5], // орталықтан
}
```

### autoRotate

Бағытқа қарай автоматты бұрылу:

```javascript
motionPath: {
  path: "#myPath",
  autoRotate: true,     // әдепкі: 0°
  autoRotate: 90,       // +90° қосу
  autoRotate: [0, 0, 0], // [x, y, add] - орталық + қосымша бұрыш
}
```

### start / end

Жолдың қай бөлігін қолдану:

```javascript
motionPath: {
  path: "#myPath",
  start: 0,    // басы (0 = 0%)
  end: 1,      // соңы (1 = 100%)
  start: 0.25, // 25%-дан
  end: 0.75,   // 75%-ға дейін
}
```

### curviness

Қисықтық деңгейі (координаттар үшін):

```javascript
motionPath: {
  path: [{x:0,y:0}, {x:100,y:100}, {x:200,y:0}],
  curviness: 1,   // қалыпты (әдепкі)
  curviness: 0,   // түзу сызықтар
  curviness: 2,   // күшті қисық
}
```

## Практикалық мысалдар

### Ұшақ ұшуы

```html
<svg viewBox="0 0 500 300">
  <path id="flight-path" d="M50,150 Q125,50 250,150 T450,150" fill="none" stroke="#ccc" />
</svg>
<div class="plane">✈️</div>
```

```javascript
gsap.to(".plane", {
  duration: 4,
  repeat: -1,
  ease: "none",
  motionPath: {
    path: "#flight-path",
    align: "#flight-path",
    autoRotate: true,
    alignOrigin: [0.5, 0.5],
  },
});
```

### Доп секіру

```javascript
gsap.to(".ball", {
  duration: 2,
  repeat: -1,
  ease: "none",
  motionPath: {
    path: [
      { x: 0, y: 0 },
      { x: 50, y: -80 },
      { x: 100, y: 0 },
      { x: 150, y: -60 },
      { x: 200, y: 0 },
      { x: 250, y: -40 },
      { x: 300, y: 0 },
    ],
    curviness: 1.5,
  },
});
```

### Орбита

```javascript
gsap.to(".satellite", {
  duration: 10,
  repeat: -1,
  ease: "none",
  motionPath: {
    path: [
      { x: 200, y: 0 },
      { x: 0, y: 100 },
      { x: -200, y: 0 },
      { x: 0, y: -100 },
      { x: 200, y: 0 },
    ],
    curviness: 2,
  },
});
```

### Инфографика сызығы

```javascript
const points = document.querySelectorAll(".data-point");

points.forEach((point, i) => {
  gsap.from(point, {
    duration: 1,
    delay: i * 0.2,
    motionPath: {
      path: "#data-line",
      align: "#data-line",
      start: i / points.length,
      end: i / points.length,
    },
    scale: 0,
    opacity: 0,
  });
});
```

## MotionPathHelper

Жолды визуалды редакциялау (Club GreenSock):

```javascript
MotionPathHelper.create(".element", {
  path: "#myPath",
  // Экранда редактор пайда болады
});
```

## arrayToRawPath()

Координаттарды raw path-қа түрлендіру:

```javascript
const path = MotionPathPlugin.arrayToRawPath([
  { x: 0, y: 0 },
  { x: 100, y: 50 },
  { x: 200, y: 0 },
]);
```

## getRelativePosition()

Жолдағы салыстырмалы позиция:

```javascript
const position = MotionPathPlugin.getRelativePosition(
  pathElement,
  0.5, // 50% позициясы
  true // align
);
console.log(position.x, position.y);
```

## Келесі қадам

[TextPlugin](/docs/plaginder/text) — мәтін анимациялары.
