---
title: Жиі кездесетін қателер
description: GSAP-ты қолданғанда жиі кездесетін қателер мен олардың шешімдері
---

# Жиі кездесетін қателер

GSAP-ты қолданғанда жиі кездесетін қателер мен олардың шешімдері.

## 1. Плагин тіркелмеген

### Қате

```javascript
// Error: ScrollTrigger is not defined
gsap.to(".box", {
  x: 100,
  scrollTrigger: { trigger: ".box" },
});
```

### Шешім

```javascript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.to(".box", {
  x: 100,
  scrollTrigger: { trigger: ".box" },
});
```

## 2. Элемент табылмады

### Қате

```javascript
// Элемент DOM-да жоқ
gsap.to(".box", { x: 100 }); // Жұмыс істемейді
```

### Шешім

```javascript
// DOM жүктелгенше күту
document.addEventListener("DOMContentLoaded", () => {
  gsap.to(".box", { x: 100 });
});

// Немесе Vue-да
onMounted(() => {
  gsap.to(".box", { x: 100 });
});
```

## 3. SSR қателері

### Қате

```
ReferenceError: document is not defined
```

### Шешім

```javascript
// SSR қолдайтын фреймворктарда window тексеру
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
```

## 4. Анимация қайталануы

### Қате

```javascript
// Әр click-те жаңа анимация қосылады
button.addEventListener("click", () => {
  gsap.to(".box", { x: "+=50" }); // x жинақталып кетеді
});
```

### Шешім

```javascript
// Алдыңғы анимацияны жою
button.addEventListener("click", () => {
  gsap.killTweensOf(".box");
  gsap.to(".box", { x: 100 });
});

// Немесе timeline қолдану
const tl = gsap.timeline({ paused: true });
tl.to(".box", { x: 100 });

button.addEventListener("click", () => {
  tl.restart();
});
```

## 5. ScrollTrigger refresh

### Қате

```javascript
// Динамикалық контент қосқанда ScrollTrigger дұрыс жұмыс істемейді
fetch("/api/content").then((data) => {
  container.innerHTML = data;
  // ScrollTrigger позициялары қате
});
```

### Шешім

```javascript
fetch("/api/content").then((data) => {
  container.innerHTML = data;
  ScrollTrigger.refresh(); // Позицияларды қайта есептеу
});
```

## 6. Memory leak

### Қате

```javascript
// Vue компонентінде cleanup жоқ
onMounted(() => {
  gsap.to(".box", { x: 100, repeat: -1 });
  // Компонент unmount болғанда анимация тоқтамайды
});
```

### Шешім

```javascript
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.to(".box", { x: 100, repeat: -1 });
  });
});

onUnmounted(() => {
  ctx?.revert(); // Cleanup
});
```

## 7. Selector қатесі

### Қате

```javascript
// Жолдың орнына элемент беру
const box = document.querySelector(".box");
gsap.to({ box }, { x: 100 }); // Қате!
```

### Шешім

```javascript
const box = document.querySelector(".box");
gsap.to(box, { x: 100 }); // Дұрыс
```

## 8. from vs fromTo

### Қате

```javascript
// from — элемент көрінбей кетуі мүмкін
gsap.from(".box", { opacity: 0 });
// Бірден opacity: 0 қойылады, содан кейін анимацияланады
```

### Шешім

```javascript
// set + from
gsap.set(".box", { opacity: 1 });
gsap.from(".box", { opacity: 0 });

// Немесе fromTo
gsap.fromTo(".box", { opacity: 0 }, { opacity: 1 });
```

## 9. Timeline position

### Қате

```javascript
const tl = gsap.timeline();
tl.to(".box1", { x: 100 });
tl.to(".box2", { x: 100 }, 0); // 0 = басынан
// .box2 анимациясы .box1-мен бірге басталады
```

### Шешім

```javascript
const tl = gsap.timeline();
tl.to(".box1", { x: 100 }).to(".box2", { x: 100 }); // Кезекпен

// Немесе позицияны анық көрсету
tl.to(".box2", { x: 100 }, ">"); // Алдыңғыдан кейін
```

## 10. Overwrite режимі

### Қате

```javascript
// Екі анимация конфликт
gsap.to(".box", { x: 100, duration: 2 });
gsap.to(".box", { x: 200, duration: 1 });
// Қайсысы жеңеді?
```

### Шешім

```javascript
// Overwrite режимін орнату
gsap.to(".box", { x: 100, duration: 2 });
gsap.to(".box", { x: 200, duration: 1, overwrite: true });

// Глобалды орнату
gsap.defaults({ overwrite: "auto" });
```

## 11. Responsive қателер

### Қате

```javascript
// Resize кезінде анимация дұрыс жұмыс істемейді
gsap.to(".box", {
  x: window.innerWidth / 2, // Бір рет есептеледі
});
```

### Шешім

```javascript
// Функция мәні қолдану
gsap.to(".box", {
  x: () => window.innerWidth / 2,
  scrollTrigger: {
    invalidateOnRefresh: true, // Resize кезінде қайта есептеу
  },
});
```

## 12. Stagger қатесі

### Қате

```javascript
// Stagger бір элементте
gsap.to(".single-box", {
  x: 100,
  stagger: 0.1, // Мағынасы жоқ
});
```

### Шешім

```javascript
// Stagger көп элементке
gsap.to(".boxes", {
  // Көп элемент
  x: 100,
  stagger: 0.1,
});
```

## Debugging кеңестері

```javascript
// 1. Console log
gsap.to(".box", {
  x: 100,
  onStart: () => console.log("Started"),
  onComplete: () => console.log("Completed"),
});

// 2. Markers қолдану
scrollTrigger: {
  markers: true,  // Визуалды debug
}

// 3. GSDevTools (Club)
GSDevTools.create();
```

## Checklist

- [ ] Плагин тіркелген бе?
- [ ] Элемент DOM-да бар ма?
- [ ] SSR тексеруі бар ма?
- [ ] Cleanup жасалған ба?
- [ ] ScrollTrigger.refresh() шақырылған ба?
- [ ] Overwrite режимі дұрыс па?

## Қорытынды

Көп қателер тіркеу, timing және cleanup-қа байланысты. Context қолдану және markers қосу debugging-ті жеңілдетеді.
