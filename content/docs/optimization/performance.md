---
title: Performance кеңестер
description: GSAP анимацияларын оңтайландыру бойынша кеңестер
---

# Performance кеңестер

GSAP жылдам кітапхана, бірақ дұрыс қолданбасаңыз performance мәселелері туындауы мүмкін.

## Негізгі принциптер

### Transform қолданыңыз

```javascript
// Жақсы — GPU-да орындалады
gsap.to(".box", {
  x: 100,
  y: 50,
  scale: 1.2,
  rotation: 45,
});

// Нашар — layout reflow туғызады
gsap.to(".box", {
  left: "100px",
  top: "50px",
  width: "200px",
  height: "200px",
});
```

### force3D

```javascript
// GPU acceleration қосу
gsap.to(".box", {
  x: 100,
  force3D: true, // translate3d қолданады
});

// Глобалды орнату
gsap.defaults({ force3D: true });
```

## Layout thrashing

### Мәселе

```javascript
// Нашар — әр итерацияда layout reflow
elements.forEach((el) => {
  const width = el.offsetWidth; // Оқу
  gsap.set(el, { x: width }); // Жазу
});
```

### Шешім

```javascript
// Жақсы — алдымен барлығын оқу, кейін жазу
const widths = elements.map((el) => el.offsetWidth);

elements.forEach((el, i) => {
  gsap.set(el, { x: widths[i] });
});
```

## Selector кэштеу

```javascript
// Нашар — әр шақыруда DOM іздейді
gsap.to(".box", { x: 100 });
gsap.to(".box", { rotation: 45 });

// Жақсы — бір рет іздеу
const box = document.querySelector(".box");
gsap.to(box, { x: 100 });
gsap.to(box, { rotation: 45 });

// Немесе gsap.utils.toArray
const boxes = gsap.utils.toArray(".box");
gsap.to(boxes, { x: 100, stagger: 0.1 });
```

## Timeline оптимизация

```javascript
// Жақсы — бір timeline
const tl = gsap.timeline();
tl.to(".box1", { x: 100 }).to(".box2", { x: 100 }).to(".box3", { x: 100 });

// Нашар — көп бөлек tween
gsap.to(".box1", { x: 100 });
gsap.to(".box2", { x: 100, delay: 1 });
gsap.to(".box3", { x: 100, delay: 2 });
```

## ScrollTrigger оптимизация

### Batch қолдану

```javascript
// Жақсы — бір ScrollTrigger көп элемент үшін
ScrollTrigger.batch(".card", {
  onEnter: (elements) => {
    gsap.from(elements, {
      y: 50,
      opacity: 0,
      stagger: 0.1,
    });
  },
});

// Нашар — әр элементке жеке ScrollTrigger
document.querySelectorAll(".card").forEach((card) => {
  gsap.from(card, {
    y: 50,
    opacity: 0,
    scrollTrigger: {
      trigger: card,
    },
  });
});
```

### once: true

```javascript
// Анимация бір рет орындалып, ScrollTrigger жойылады
gsap.from(".section", {
  y: 100,
  opacity: 0,
  scrollTrigger: {
    trigger: ".section",
    once: true, // Қайта trigger болмайды
  },
});
```

### invalidateOnRefresh

```javascript
// Тек қажет кезде қолданыңыз
gsap.to(".box", {
  x: () => window.innerWidth,
  scrollTrigger: {
    trigger: ".box",
    invalidateOnRefresh: true, // Resize кезінде қайта есептейді
  },
});
```

## Анимация санын азайту

```javascript
// Нашар — 100 бөлек анимация
for (let i = 0; i < 100; i++) {
  gsap.to(`.box-${i}`, { x: 100 });
}

// Жақсы — stagger қолдану
gsap.to(".box", {
  x: 100,
  stagger: 0.02,
});
```

## will-change

```css
/* Анимация басталар алдында қосу */
.animated-element {
  will-change: transform, opacity;
}
```

```javascript
// JavaScript арқылы
gsap.set(".box", { willChange: "transform" });

// Анимациядан кейін алып тастау
gsap.to(".box", {
  x: 100,
  onComplete: () => {
    gsap.set(".box", { willChange: "auto" });
  },
});
```

## Cleanup

### Анимацияларды жою

```javascript
// Tween жою
const tween = gsap.to(".box", { x: 100 });
tween.kill();

// Timeline жою
const tl = gsap.timeline();
tl.kill();

// ScrollTrigger жою
const st = ScrollTrigger.create({ ... });
st.kill();

// Барлық ScrollTrigger-лерді жою
ScrollTrigger.killAll();
```

### Context қолдану

```javascript
// Vue компоненттерде
const ctx = gsap.context(() => {
  gsap.to(".box", { x: 100 });
  ScrollTrigger.create({ ... });
});

// Компонент unmount кезінде
ctx.revert();
```

## Lazy initialization

```javascript
// Көрінбейтін элементтерді анимацияламау
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      initAnimation(entry.target);
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll(".animate").forEach((el) => {
  observer.observe(el);
});
```

## Mobile оптимизация

```javascript
const mm = gsap.matchMedia();

mm.add("(max-width: 768px)", () => {
  // Қарапайым анимациялар
  gsap.to(".box", { opacity: 1, duration: 0.3 });
});

mm.add("(min-width: 769px)", () => {
  // Күрделі анимациялар
  gsap.to(".box", {
    x: 100,
    rotation: 360,
    scale: 1.2,
    duration: 1,
  });
});
```

## Profiling

```javascript
// Анимация уақытын өлшеу
console.time("animation");
gsap.to(".box", {
  x: 100,
  onComplete: () => console.timeEnd("animation"),
});

// DevTools Performance panel қолданыңыз
```

## Checklist

- [ ] transform қолдану (x, y, scale, rotation)
- [ ] force3D: true глобалды орнату
- [ ] Selector-ларды кэштеу
- [ ] ScrollTrigger.batch қолдану
- [ ] once: true мүмкіндігінше қолдану
- [ ] Cleanup жасау (kill, revert)
- [ ] Mobile-да анимацияларды азайту
- [ ] will-change дұрыс қолдану

## Қорытынды

GSAP өзі жылдам, бірақ дұрыс қолдану маңызды. Transform қасиеттерін қолданыңыз, DOM оқу/жазуды оптимизациялаңыз, және қажетсіз анимацияларды жойыңыз.
