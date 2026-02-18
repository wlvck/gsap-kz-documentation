---
title: Flip
description: GSAP Flip - FLIP анимация техникасы арқылы layout өзгерістерін анимациялау
---

# Flip

**Flip** — элементтің позициясын, өлшемін немесе layout-ын өзгерткенде тегіс анимация жасауға мүмкіндік беретін плагин.

FLIP = **F**irst, **L**ast, **I**nvert, **P**lay

## Орнату

```javascript
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);
```

## FLIP концепциясы

1. **First** — бастапқы күйді сақтау
2. **Last** — соңғы күйге өзгерту
3. **Invert** — айырмашылықты есептеу
4. **Play** — анимациялау

## Негізгі қолданылуы

```javascript
// 1. Бастапқы күйді сақтау
const state = Flip.getState(".box");

// 2. Layout өзгерту (CSS немесе DOM)
document.querySelector(".box").classList.toggle("active");

// 3. Анимациялау
Flip.from(state, {
  duration: 0.5,
  ease: "power2.out",
});
```

## Flip.getState()

Элементтің күйін сақтау:

```javascript
// Бір элемент
const state = Flip.getState(".box");

// Бірнеше элемент
const state = Flip.getState(".item");

// Қосымша қасиеттер
const state = Flip.getState(".box", {
  props: "backgroundColor,borderRadius", // CSS қасиеттер
});
```

## Flip.from()

Сақталған күйден анимациялау:

```javascript
Flip.from(state, {
  duration: 0.5,
  ease: "power2.out",
  stagger: 0.1,
  absolute: true, // position: absolute қолдану
  scale: true, // scale өзгерісін анимациялау
  nested: true, // nested элементтер
  onComplete: () => console.log("Done"),
});
```

## Практикалық мысалдар

### Grid to List

```javascript
const items = document.querySelectorAll(".item");
const toggleBtn = document.querySelector(".toggle");

toggleBtn.addEventListener("click", () => {
  // Күйді сақтау
  const state = Flip.getState(items);

  // Layout өзгерту
  document.querySelector(".container").classList.toggle("list-view");

  // Анимациялау
  Flip.from(state, {
    duration: 0.5,
    ease: "power2.out",
    stagger: 0.05,
  });
});
```

### Element reorder

```javascript
const container = document.querySelector(".container");
const items = document.querySelectorAll(".item");

function shuffle() {
  // Күйді сақтау
  const state = Flip.getState(items);

  // DOM реттеу
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  shuffled.forEach((item) => container.appendChild(item));

  // Анимациялау
  Flip.from(state, {
    duration: 0.6,
    ease: "power1.out",
    stagger: 0.05,
  });
}
```

### Tab switching

```javascript
const tabs = document.querySelectorAll(".tab");
const indicator = document.querySelector(".indicator");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Күйді сақтау
    const state = Flip.getState(indicator);

    // Indicator позициясын өзгерту
    tab.appendChild(indicator);

    // Анимациялау
    Flip.from(state, {
      duration: 0.3,
      ease: "power2.out",
    });
  });
});
```

### Expand card

```javascript
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    const state = Flip.getState(card);

    card.classList.toggle("expanded");

    Flip.from(state, {
      duration: 0.5,
      ease: "power2.out",
      scale: true,
    });
  });
});
```

### Move between containers

```javascript
function moveItem(item, newContainer) {
  const state = Flip.getState(item);

  // DOM-да жылжыту
  newContainer.appendChild(item);

  Flip.from(state, {
    duration: 0.4,
    ease: "power2.out",
  });
}
```

## Flip.to()

Соңғы күйге қарай анимациялау:

```javascript
// Соңғы күйді сақтау
const finalState = Flip.getState(".box");

// Бастапқы күйге қайтару
document.querySelector(".box").classList.remove("active");

// Соңғы күйге анимациялау
Flip.to(finalState, {
  duration: 0.5,
});
```

## Flip.fit()

Элементті басқа элементке сәйкестендіру:

```javascript
// .box элементін .target элементіне сәйкестендіру
Flip.fit(".box", ".target", {
  duration: 0.5,
  scale: true,
});
```

## absolute параметрі

Layout ағынынан шығару:

```javascript
Flip.from(state, {
  absolute: true, // position: absolute қолданады
});
```

## spin параметрі

Айналдыру қосу:

```javascript
Flip.from(state, {
  spin: 1, // 360° айналу
  spin: -2, // -720° кері айналу
});
```

## Келесі қадам

[MotionPath](/docs/plaginder/motionpath) — SVG жолы бойынша қозғалыс.
