---
title: gsap.fromTo()
description: Элементтерді бастапқы күйден соңғы күйге анимациялау - толық бақылау
---

# gsap.fromTo()

**gsap.fromTo()** — бастапқы және соңғы күйді бірге анықтауға мүмкіндік береді. Бұл анимацияны толық бақылауға қажет болғанда қолданылады.

## Негізгі синтаксис

```javascript
gsap.fromTo(target, fromVars, toVars);
```

- **target** — анимацияланатын элемент
- **fromVars** — бастапқы күй параметрлері
- **toVars** — соңғы күй параметрлері (+ анимация параметрлері)

## Неге fromTo() қолдану керек?

| Әдіс            | Қашан қолдану                        |
| --------------- | ------------------------------------ |
| `gsap.to()`     | Соңғы күйді ғана білгенде            |
| `gsap.from()`   | Бастапқы күйді ғана білгенде         |
| `gsap.fromTo()` | Екеуін де толық бақылағыңыз келгенде |

## Қарапайым мысалдар

### Позицияны өзгерту

```javascript
gsap.fromTo(
  ".box",
  { x: -100 }, // бастапқы күй
  { x: 100, duration: 1 } // соңғы күй
);
```

### Opacity анимациясы

```javascript
gsap.fromTo(".box", { opacity: 0 }, { opacity: 1, duration: 0.5 });
```

### Бірнеше қасиет

```javascript
gsap.fromTo(
  ".box",
  {
    x: -200,
    opacity: 0,
    scale: 0.5,
  },
  {
    x: 0,
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: "power2.out",
  }
);
```

## Практикалық мысалдар

### Прогресс бар

```javascript
gsap.fromTo(".progress-bar", { width: "0%" }, { width: "75%", duration: 2, ease: "power1.out" });
```

### Санауыш анимациясы

```javascript
const counter = { value: 0 };

gsap.fromTo(
  counter,
  { value: 0 },
  {
    value: 1000,
    duration: 2,
    ease: "power1.out",
    onUpdate: () => {
      document.querySelector(".counter").textContent = Math.round(counter.value);
    },
  }
);
```

### Fade in/out цикл

```javascript
gsap.fromTo(
  ".pulse",
  { opacity: 0.3 },
  {
    opacity: 1,
    duration: 0.5,
    repeat: -1,
    yoyo: true,
  }
);
```

### Слайд шоу элементі

```javascript
// Элемент оңнан кіріп, солға шығады
gsap.fromTo(
  ".slide",
  { x: "100%" },
  {
    x: "-100%",
    duration: 10,
    ease: "none",
    repeat: -1,
  }
);
```

## Stagger қолдану

```javascript
gsap.fromTo(
  ".card",
  {
    y: 50,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.15,
    ease: "power2.out",
  }
);
```

## immediateRender

`fromTo()` әдепкі бойынша бірден бастапқы күйді қолданады:

```javascript
gsap.fromTo(
  ".box",
  { x: -100 },
  {
    x: 100,
    duration: 1,
    delay: 2,
    immediateRender: false, // delay біткенге дейін күту
  }
);
```

## Қай әдісті қолдану керек?

```javascript
// CSS-те: .box { opacity: 1; transform: translateX(0); }

// 1. Қазіргі күйден соңғы күйге
gsap.to(".box", { x: 200 });
// 0 → 200

// 2. Бастапқы күйден қазіргі күйге
gsap.from(".box", { x: -200 });
// -200 → 0

// 3. Толық бақылау
gsap.fromTo(".box", { x: -200 }, { x: 200 });
// -200 → 200
```

## Келесі қадам

Анимация [қасиеттерін](/docs/negizderi/kasietter) толығырақ зерттеңіз.
