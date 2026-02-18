---
title: Easing негіздері
description: GSAP анимацияларындағы жеделдету функциялары - easing түсінігі
---

# Easing негіздері

**Easing** — анимацияның уақыт бойынша қалай өзгеретінін анықтайтын функция. Ол анимацияға табиғи, тірі көрініс береді.

## Easing деген не?

Easing-сіз анимация сызықтық (linear) болады — бірқалыпты жылдамдықпен жүреді. Бұл механикалық және табиғи емес көрінеді.

```javascript
// Сызықтық анимация (роботтай)
gsap.to(".box", {
  x: 200,
  duration: 1,
  ease: "none", // немесе "linear"
});

// Табиғи анимация (тірі)
gsap.to(".box", {
  x: 200,
  duration: 1,
  ease: "power2.out",
});
```

## Easing түрлері

### Негізгі бағыттар

| Бағыт    | Сипаттама                  |
| -------- | -------------------------- |
| `.in`    | Баяу бастап, жылдам аяқтау |
| `.out`   | Жылдам бастап, баяу аяқтау |
| `.inOut` | Баяу бастап, баяу аяқтау   |

### Мысал

```javascript
// ease: "power2.in"   — баяу бастау
// ease: "power2.out"  — баяу аяқтау (ең көп қолданылады)
// ease: "power2.inOut" — баяу бастау және аяқтау
```

## Негізгі ease түрлері

### Power (қуат)

Қарапайым жеделдету. Сан неғұрлым үлкен болса, соғұрлым айырмашылық көп.

```javascript
gsap.to(".box", { x: 200, ease: "power1.out" }); // жұмсақ
gsap.to(".box", { x: 200, ease: "power2.out" }); // орташа
gsap.to(".box", { x: 200, ease: "power3.out" }); // күшті
gsap.to(".box", { x: 200, ease: "power4.out" }); // өте күшті
```

### Back (артқа)

Мақсаттан асып кетіп, қайта оралады:

```javascript
gsap.to(".box", {
  x: 200,
  ease: "back.out",
  // ease: "back.out(1.7)", // күштілігі (әдепкі: 1.7)
});
```

### Bounce (серпу)

Доптай секіру эффекті:

```javascript
gsap.to(".box", {
  y: 200,
  ease: "bounce.out",
});
```

### Elastic (серпімді)

Резеңке сияқты созылу эффекті:

```javascript
gsap.to(".box", {
  x: 200,
  ease: "elastic.out",
  // ease: "elastic.out(1, 0.3)", // amplitude, period
});
```

### Circ (дөңгелек)

Дөңгелек қисық:

```javascript
gsap.to(".box", {
  x: 200,
  ease: "circ.out",
});
```

### Expo (экспоненциалды)

Өте күшті жеделдету:

```javascript
gsap.to(".box", {
  x: 200,
  ease: "expo.out",
});
```

### Sine (синус)

Өте жұмсақ, табиғи:

```javascript
gsap.to(".box", {
  x: 200,
  ease: "sine.out",
});
```

## Қай ease-ті қашан қолдану?

| Жағдай                         | Ұсынылатын ease                   |
| ------------------------------ | --------------------------------- |
| UI элементтері (батырма, меню) | `power2.out` немесе `power3.out`  |
| Модал терезе ашу               | `power2.out` немесе `back.out`    |
| Элемент жоғалу                 | `power2.in`                       |
| Скролл анимация                | `power1.out` немесе `none`        |
| Назар аудару                   | `bounce.out` немесе `elastic.out` |
| Табиғи қозғалыс                | `sine.inOut`                      |

## Ease визуализациясы

Төмендегі интерактивті визуализаторды қолданып, әртүрлі ease функцияларын салыстырыңыз:

::EasingVisualizer{ease="power2.out" showControls showComparison}
::

## Практикалық мысалдар

### Батырма hover эффекті

```javascript
// Hover кезінде
gsap.to(".button", {
  scale: 1.05,
  duration: 0.2,
  ease: "power2.out",
});

// Hover тоқтағанда
gsap.to(".button", {
  scale: 1,
  duration: 0.2,
  ease: "power2.out",
});
```

### Модал терезе

```javascript
// Ашу
gsap.fromTo(
  ".modal",
  { scale: 0.8, opacity: 0 },
  { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.2)" }
);

// Жабу
gsap.to(".modal", {
  scale: 0.8,
  opacity: 0,
  duration: 0.2,
  ease: "power2.in",
});
```

### Dropdown меню

```javascript
// Ашу
gsap.fromTo(
  ".dropdown",
  { height: 0, opacity: 0 },
  { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
);
```

## Келесі қадам

[Ease түрлері](/docs/easing/turleri) — барлық ease түрлерінің толық тізімі.
