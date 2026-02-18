---
title: MorphSVG плагині
description: GSAP MorphSVG плагині арқылы формалар арасында морфинг жасау
---

# MorphSVG плагині

MorphSVG — GSAP Club плагині, SVG формалары арасында тегіс морфинг жасауға мүмкіндік береді.

## Орнату

MorphSVG — Club GreenSock мүшелігі қажет плагин:

```javascript
// Club мүшелері үшін
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);
```

## Негізгі қолдану

### Қарапайым морфинг

```html
<svg viewBox="0 0 200 200">
  <path id="start" d="M100,20 L180,180 L20,180 Z" fill="#0ae448" />
</svg>
```

```javascript
// Үшбұрыштан шеңберге
gsap.to("#start", {
  morphSVG: "#circle", // Мақсат формасы
  duration: 2,
  ease: "power2.inOut",
});

// Немесе path data тікелей
gsap.to("#start", {
  morphSVG: "M100,20 A80,80 0 1,1 99.9,20",
  duration: 2,
});
```

### Мақсат форма HTML-да

```html
<svg viewBox="0 0 200 200">
  <path id="shape1" d="..." fill="#0ae448" />
  <path id="shape2" d="..." fill="none" visibility="hidden" />
</svg>
```

```javascript
gsap.to("#shape1", {
  morphSVG: "#shape2",
  duration: 2,
});
```

## Конфигурация опциялары

### type параметрі

```javascript
gsap.to("#shape", {
  morphSVG: {
    shape: "#target",
    type: "rotational", // "linear" | "rotational"
  },
  duration: 2,
});
```

- `linear` — Нүктелер тікелей жылжиды
- `rotational` — Нүктелер орталықтан айналады (әдепкі)

### origin параметрі

```javascript
gsap.to("#shape", {
  morphSVG: {
    shape: "#target",
    origin: "50% 50%", // Морфинг орталығы
  },
  duration: 2,
});
```

### shapeIndex параметрі

```javascript
gsap.to("#shape", {
  morphSVG: {
    shape: "#target",
    shapeIndex: 3, // Бастапқы нүкте индексі
  },
  duration: 2,
});

// "auto" мәні ең жақсы сәйкестікті табады
gsap.to("#shape", {
  morphSVG: {
    shape: "#target",
    shapeIndex: "auto",
  },
  duration: 2,
});
```

## Күрделі формалар

### Көп path морфингі

```html
<svg viewBox="0 0 400 200">
  <g id="icon1">
    <path d="..." />
    <path d="..." />
    <circle cx="..." cy="..." r="..." />
  </g>
  <g id="icon2" visibility="hidden">
    <path d="..." />
    <path d="..." />
    <rect x="..." y="..." width="..." height="..." />
  </g>
</svg>
```

```javascript
// Топтағы барлық элементтер морфингі
gsap.to("#icon1 > *", {
  morphSVG: (i, el) => `#icon2 > *:nth-child(${i + 1})`,
  duration: 1,
  stagger: 0.1,
});
```

### Әртүрлі элементтер арасында

```javascript
// Шеңберден path-қа
gsap.to("circle", {
  morphSVG: "#targetPath",
  duration: 2,
});

// Тіктөртбұрыштан path-қа
gsap.to("rect", {
  morphSVG: "#targetPath",
  duration: 2,
});
```

## convertToPath()

Кез келген SVG элементін path-қа айналдыру:

```javascript
// Барлық элементтерді path-қа айналдыру
MorphSVGPlugin.convertToPath("circle, rect, ellipse, polygon");

// Нақты элементті
MorphSVGPlugin.convertToPath("#myRect");
```

## Практикалық мысалдар

### Иконка ауысуы

```html
<svg id="menuIcon" viewBox="0 0 100 100">
  <path id="line1" d="M20,30 L80,30" />
  <path id="line2" d="M20,50 L80,50" />
  <path id="line3" d="M20,70 L80,70" />
</svg>
```

```javascript
const tl = gsap.timeline({ paused: true });

tl.to("#line1", {
  morphSVG: "M20,50 L80,50",
  duration: 0.3,
})
  .to(
    "#line2",
    {
      opacity: 0,
      duration: 0.1,
    },
    0
  )
  .to(
    "#line3",
    {
      morphSVG: "M20,50 L80,50",
      duration: 0.3,
    },
    0
  )
  .to("#line1", {
    rotation: 45,
    transformOrigin: "center",
    duration: 0.3,
  })
  .to(
    "#line3",
    {
      rotation: -45,
      transformOrigin: "center",
      duration: 0.3,
    },
    "<"
  );

// Toggle
let isOpen = false;
document.querySelector("#menuIcon").addEventListener("click", () => {
  isOpen ? tl.reverse() : tl.play();
  isOpen = !isOpen;
});
```

### Логотип трансформациясы

```javascript
const logoTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#logo",
    start: "top center",
    end: "bottom center",
    scrub: true,
  },
});

logoTl.to("#logoPath", {
  morphSVG: "#simplifiedLogo",
  duration: 1,
});
```

### Hover эффектісі

```javascript
const shapes = document.querySelectorAll(".morph-shape");

shapes.forEach((shape) => {
  const originalD = shape.getAttribute("d");
  const hoverD = shape.dataset.hoverPath;

  shape.addEventListener("mouseenter", () => {
    gsap.to(shape, {
      morphSVG: hoverD,
      duration: 0.3,
    });
  });

  shape.addEventListener("mouseleave", () => {
    gsap.to(shape, {
      morphSVG: originalD,
      duration: 0.3,
    });
  });
});
```

## findShapeIndex()

Ең жақсы shapeIndex табу:

```javascript
// Интерактивті құрал
MorphSVGPlugin.findShapeIndex("#shape1", "#shape2");
```

Бұл функция консольде интерфейс ашады, онда әртүрлі shapeIndex мәндерін көруге болады.

## Кеңестер

1. **Path оптимизациясы** — Күрделі формаларды жеңілдетіңіз
2. **shapeIndex** — "auto" көп жағдайда жақсы жұмыс істейді
3. **convertToPath** — Морфинг алдында қолданыңыз
4. **Бірдей нүкте саны** — Міндетті емес, бірақ жақсы нәтиже береді

## Қорытынды

MorphSVG — SVG анимацияларының ең қуатты құралдарының бірі. Формалар арасындағы тегіс ауысулар сайтқа интерактивтілік пен визуалды тартымдылық қосады.
