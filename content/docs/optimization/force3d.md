---
title: force3D параметрі
description: GSAP force3D параметрі арқылы GPU acceleration қосу
---

# force3D параметрі

`force3D` — GSAP-тың transform анимацияларын GPU-да орындауға мәжбүрлейтін параметр.

## Қалай жұмыс істейді

```javascript
// force3D: true кезінде
gsap.to(".box", {
  x: 100,
  force3D: true,
});
// Нәтиже: transform: translate3d(100px, 0px, 0px)

// force3D: false кезінде
gsap.to(".box", {
  x: 100,
  force3D: false,
});
// Нәтиже: transform: translateX(100px)
```

## Глобалды орнату

```javascript
// Барлық анимациялар үшін
gsap.defaults({
  force3D: true,
});

// Немесе "auto" (әдепкі)
gsap.defaults({
  force3D: "auto",
});
```

## force3D мәндері

### true

```javascript
gsap.to(".box", {
  x: 100,
  force3D: true,
});
// translate3d қолданады, анимациядан кейін де қалады
```

### false

```javascript
gsap.to(".box", {
  x: 100,
  force3D: false,
});
// translate немесе matrix қолданады
```

### "auto" (әдепкі)

```javascript
gsap.to(".box", {
  x: 100,
  force3D: "auto",
});
// Анимация кезінде translate3d
// Анимациядан кейін translateX-ке оралады
```

## Қашан қолдану керек

### force3D: true

- Жиі анимацияланатын элементтер
- Scroll анимациялары
- Игра сияқты интерактивті қосымшалар

### force3D: false

- Субпиксель дәлдігі қажет (мәтін)
- Қарапайым, бір реттік анимациялар
- z-index мәселелері болғанда

### force3D: "auto"

- Көп жағдайда жақсы таңдау
- Performance мен сапа арасындағы баланс

## Практикалық мысалдар

### Parallax

```javascript
// Parallax әрқашан force3D: true қолданыңыз
gsap.to(".parallax-layer", {
  y: "50%",
  force3D: true,
  ease: "none",
  scrollTrigger: {
    trigger: ".section",
    scrub: true,
  },
});
```

### Мәтін анимациясы

```javascript
// Мәтін үшін force3D: false (субпиксель рендеринг)
gsap.from(".text-char", {
  y: 20,
  opacity: 0,
  force3D: false, // Мәтін сапасын сақтау
  stagger: 0.02,
});
```

### Infinite animation

```javascript
// Шексіз анимацияларда force3D: true
gsap.to(".spinner", {
  rotation: 360,
  duration: 1,
  ease: "none",
  repeat: -1,
  force3D: true, // GPU-да қалады
});
```

## Мәселелер

### Blurry мәтін

```javascript
// Мәселе: translate3d мәтінді бұлдыратуы мүмкін
gsap.to(".text", {
  x: 100,
  force3D: true, // Мәтін blur болуы мүмкін
});

// Шешім: force3D: false немесе "auto"
gsap.to(".text", {
  x: 100,
  force3D: "auto", // Анимациядан кейін қалыпты рендеринг
});
```

### z-index мәселелері

```javascript
// translate3d жаңа stacking context жасайды
gsap.to(".element", {
  x: 100,
  force3D: true,
  // z-index күтпеген әрекет етуі мүмкін
});

// Шешім: z параметрін қосу
gsap.to(".element", {
  x: 100,
  z: 0.01, // Stacking context анық
  force3D: true,
});
```

## Conditional force3D

```javascript
// Device-қа байланысты
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

gsap.defaults({
  force3D: isMobile ? true : "auto",
});
```

## Performance тестілеу

```javascript
// Chrome DevTools > Performance panel
// "Rendering" > "Layer borders" қосыңыз

// force3D: true болғанда элемент бөлек layer болады
gsap.to(".test-element", {
  x: 100,
  force3D: true,
  duration: 2,
});

// Layer count-ты бақылаңыз
```

## GPU vs CPU

| force3D: true (GPU) | force3D: false (CPU)       |
| ------------------- | -------------------------- |
| Жылдам              | Баяу (үлкен анимацияларда) |
| Бөлек layer         | Бір layer                  |
| Көп жады            | Аз жады                    |
| Мәтін blur мүмкін   | Анық мәтін                 |

## Best practices

```javascript
// 1. Глобалды "auto" қолдану
gsap.defaults({ force3D: "auto" });

// 2. Scroll анимацияларда true
gsap.to(".scroll-element", {
  y: 100,
  force3D: true,
  scrollTrigger: { scrub: true },
});

// 3. Мәтін анимацияларда false немесе auto
gsap.from(".heading", {
  y: 50,
  force3D: false,
});

// 4. Шексіз анимацияларда true
gsap.to(".loader", {
  rotation: 360,
  force3D: true,
  repeat: -1,
});
```

## Debugging

```javascript
// Transform мәнін тексеру
const el = document.querySelector(".box");

gsap.to(el, {
  x: 100,
  force3D: true,
  onComplete: () => {
    console.log(el.style.transform);
    // "translate3d(100px, 0px, 0px)"
  },
});
```

## Кеңестер

1. **"auto"** — Көп жағдайда жақсы
2. **true** — Scroll, parallax, infinite анимацияларда
3. **false** — Мәтін, субпиксель дәлдігі қажет жерде
4. **Test** — Нақты performance-ты тексеріңіз

## Қорытынды

`force3D` — GPU acceleration-ді басқарудың негізгі құралы. "auto" әдепкі мән ретінде жақсы, бірақ нақты жағдайларда true немесе false қолдану пайдалы.
