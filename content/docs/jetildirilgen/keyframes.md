---
title: Keyframes
description: GSAP keyframes арқылы күрделі анимация тізбектері
---

# Keyframes

Keyframes — бір элементке бірнеше анимация кезеңін анықтау. CSS keyframes-ке ұқсас, бірақ қуаттырақ.

## Негізгі қолдану

### Массив синтаксисі

```javascript
gsap.to(".box", {
  keyframes: [
    { x: 100, duration: 1 },
    { y: 50, duration: 0.5 },
    { rotation: 360, duration: 1 },
    { scale: 1.5, duration: 0.5 },
  ],
});
```

### Қасиет негізді синтаксис

```javascript
gsap.to(".box", {
  keyframes: {
    x: [0, 100, 100, 0], // 4 кезең
    y: [0, 0, 50, 50],
    rotation: [0, 0, 180, 360],
  },
  duration: 2,
  ease: "power2.inOut",
});
```

## Массив keyframes

### Толық конфигурация

```javascript
gsap.to(".box", {
  keyframes: [
    {
      x: 100,
      duration: 1,
      ease: "power2.out",
    },
    {
      y: 100,
      duration: 0.5,
      ease: "bounce.out",
    },
    {
      rotation: 360,
      duration: 1,
      ease: "power1.inOut",
    },
  ],
});
```

### Пайызбен (CSS-тәрізді)

```javascript
gsap.to(".box", {
  keyframes: [
    { x: 0, y: 0 }, // 0%
    { x: 100, y: -50 }, // 25%
    { x: 200, y: 0 }, // 50%
    { x: 100, y: 50 }, // 75%
    { x: 0, y: 0 }, // 100%
  ],
  duration: 2,
  ease: "none",
});
```

## Қасиет негізді keyframes

### Негізгі мысал

```javascript
gsap.to(".box", {
  keyframes: {
    x: [0, 100, 100, 0, 0],
    y: [0, 0, 100, 100, 0],
    scale: [1, 1.2, 1, 0.8, 1],
  },
  duration: 3,
});
```

### easeEach

Әр кезең арасындағы ease:

```javascript
gsap.to(".box", {
  keyframes: {
    x: [0, 100, 0],
    easeEach: "power2.inOut", // Әр кезең үшін
  },
  duration: 2,
  ease: "none", // Жалпы ease өшіру
});
```

## Уақытты басқару

### duration массиві

```javascript
gsap.to(".box", {
  keyframes: [
    { x: 100, duration: 1 },
    { y: 100, duration: 0.5 }, // Жылдамырақ
    { x: 0, duration: 1 },
    { y: 0, duration: 0.5 },
  ],
});
```

### Жалпы duration

```javascript
gsap.to(".box", {
  keyframes: [{ x: 100 }, { y: 100 }, { x: 0 }, { y: 0 }],
  duration: 2, // Барлық keyframes үшін бөлінеді
});
```

## Практикалық мысалдар

### Секіру эффектісі

```javascript
gsap.to(".ball", {
  keyframes: [
    { y: 0 },
    { y: 200, ease: "power2.in", duration: 0.5 },
    { y: 0, ease: "power2.out", duration: 0.5 },
    { y: 150, ease: "power2.in", duration: 0.4 },
    { y: 0, ease: "power2.out", duration: 0.4 },
    { y: 80, ease: "power2.in", duration: 0.3 },
    { y: 0, ease: "power2.out", duration: 0.3 },
  ],
});
```

### Пульс эффектісі

```javascript
gsap.to(".pulse", {
  keyframes: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.8, 1],
  },
  duration: 1,
  repeat: -1,
  ease: "power1.inOut",
});
```

### Жүргізу анимациясы

```javascript
gsap.to(".car", {
  keyframes: [
    { x: 0, rotation: 0 },
    { x: 100, rotation: 5, ease: "power2.in" },
    { x: 250, rotation: 0, ease: "none" },
    { x: 350, rotation: -5, ease: "power2.out" },
    { x: 400, rotation: 0 },
  ],
  duration: 3,
});
```

### Иконка анимациясы

```javascript
gsap.to(".icon", {
  keyframes: {
    rotation: [0, -10, 10, -10, 10, 0],
    scale: [1, 1.1, 1.1, 1.1, 1.1, 1],
  },
  duration: 0.5,
  ease: "power1.inOut",
});
```

### Мәтін пайда болуы

```javascript
gsap.from(".text", {
  keyframes: [
    { opacity: 0, y: 30, scale: 0.8 },
    { opacity: 0.5, y: 15, scale: 0.9 },
    { opacity: 1, y: 0, scale: 1 },
  ],
  duration: 1,
  ease: "power3.out",
});
```

## Stagger-мен қолдану

```javascript
gsap.to(".box", {
  keyframes: [
    { y: -50, rotation: -10 },
    { y: 0, rotation: 0 },
  ],
  duration: 0.6,
  stagger: 0.1,
  repeat: -1,
  yoyo: true,
});
```

## Timeline-мен салыстыру

### Keyframes

```javascript
gsap.to(".box", {
  keyframes: [{ x: 100 }, { y: 100 }, { x: 0 }, { y: 0 }],
  duration: 2,
});
```

### Timeline эквиваленті

```javascript
const tl = gsap.timeline();
tl.to(".box", { x: 100, duration: 0.5 })
  .to(".box", { y: 100, duration: 0.5 })
  .to(".box", { x: 0, duration: 0.5 })
  .to(".box", { y: 0, duration: 0.5 });
```

## Қашан не қолдану

| Keyframes            | Timeline            |
| -------------------- | ------------------- |
| Бір элемент          | Бірнеше элемент     |
| Қарапайым тізбек     | Күрделі оркестрация |
| Қайталанатын pattern | Позициялау қажет    |
| Қысқа жазу           | Толық бақылау       |

## repeat және yoyo

```javascript
gsap.to(".box", {
  keyframes: [{ scale: 1 }, { scale: 1.2 }, { scale: 1 }],
  duration: 1,
  repeat: -1, // Шексіз қайталау
  yoyo: true, // Артқа қайту
});
```

## immediateRender

```javascript
gsap.to(".box", {
  keyframes: [
    { x: 0, y: 0 },
    { x: 100, y: 50 },
  ],
  immediateRender: true, // Бірінші keyframe бірден қолданылады
  duration: 1,
});
```

## Кеңестер

1. **Массив** — Әр кезеңге жеке duration/ease
2. **Қасиет негізді** — Қарапайым қасиет өзгерістері
3. **easeEach** — Кезеңдер арасы тегістігі үшін
4. **Timeline** — Күрделі логика үшін жақсырақ

## Қорытынды

Keyframes — бір элементке күрделі анимация тізбегін жазудың қысқа жолы. CSS keyframes-тен айырмашылығы — толық JavaScript бақылауы және GSAP экосистемасының барлық мүмкіндіктері.
