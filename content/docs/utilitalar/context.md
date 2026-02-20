---
title: gsap.context()
description: GSAP context - анимацияларды топтау, скоптау және тазалау
---

# gsap.context()

**gsap.context()** — анимацияларды топтауға, скоптауға және бір әрекетпен тазалауға мүмкіндік береді. Vue сияқты фреймворктарда өте пайдалы.

## Неге context қажет?

1. **Cleanup** — барлық анимацияларды бір `revert()` арқылы тазалау
2. **Scoping** — селекторлар тек белгілі DOM аймағында іздейді
3. **Memory leaks** — компонент unmount кезінде анимацияларды жою

## Негізгі қолданылуы

```javascript
const ctx = gsap.context(() => {
  // Бұл анимациялар context-ке тіркеледі
  gsap.to(".box", { x: 100 });
  gsap.to(".circle", { scale: 2 });
});

// Кейінірек барлығын тазалау
ctx.revert();
```

## Scoping

DOM элементіне скоптау:

```javascript
const ctx = gsap.context(() => {
  // ".box" тек container ішінен ізделеді
  gsap.to(".box", { x: 100 });
}, containerElement);

// немесе селектор арқылы
const ctx = gsap.context(() => {
  gsap.to(".box", { x: 100 });
}, ".my-component");
```

## add() әдісі

Кейінірек анимация қосу:

```javascript
const ctx = gsap.context(() => {
  gsap.to(".box", { x: 100 });
});

// Кейінірек қосу
ctx.add(() => {
  gsap.to(".circle", { scale: 2 });
});

// Барлығы revert-пен тазаланады
ctx.revert();
```

## revert()

Барлық анимацияларды тазалау:

```javascript
const ctx = gsap.context(() => {
  gsap.to(".box", { x: 100, duration: 2 });
  gsap.to(".title", { opacity: 0 });

  ScrollTrigger.create({
    trigger: ".section",
    // ...
  });
});

// Барлығын жою (tweens, ScrollTriggers, т.б.)
ctx.revert();
```

## kill()

Тазалау (CSS өзгерістерін сақтау):

```javascript
// revert() — CSS-ті бастапқы күйге қайтарады
ctx.revert();

// kill() — CSS өзгерістерін сақтайды
ctx.kill();
```

## Vue-да қолдану

```vue
<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";

const container = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.to(".box", { x: 100 });
    gsap.to(".title", { opacity: 1 });
  }, container.value);
});

onUnmounted(() => {
  ctx.revert();
});
</script>

<template>
  <div ref="container">
    <div class="box">Box</div>
    <h1 class="title">Title</h1>
  </div>
</template>
```

## Параметрлер

### scope

Скоп элементі:

```javascript
gsap.context(callback, scope);
// scope: DOM элемент немесе селектор
```

### conditions

Шартты анимациялар:

```javascript
const ctx = gsap.context((self) => {
  // self.conditions арқылы шарттар
  self.add("desktop", () => {
    gsap.to(".box", { x: 200 });
  });

  self.add("mobile", () => {
    gsap.to(".box", { x: 100 });
  });
});

// Шартты іске қосу
ctx.desktop(); // desktop анимациясы
ctx.mobile(); // mobile анимациясы
```

## matchMedia-мен бірге

```javascript
const ctx = gsap.context(() => {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 800px)", () => {
    gsap.to(".box", { x: 200 });
  });

  mm.add("(max-width: 799px)", () => {
    gsap.to(".box", { x: 100 });
  });
});

// Барлығын тазалау
ctx.revert();
```

## ScrollTrigger-мен

```javascript
const ctx = gsap.context(() => {
  gsap.to(".box", {
    x: 200,
    scrollTrigger: {
      trigger: ".box",
      start: "top center",
    },
  });

  ScrollTrigger.create({
    trigger: ".section",
    // ...
  });
});

// ScrollTrigger-лер де тазаланады
ctx.revert();
```

## ignore()

Белгілі анимацияларды context-тен шығару:

```javascript
const ctx = gsap.context(() => {
  gsap.to(".box", { x: 100 }); // context-ке кіреді

  ctx.ignore(() => {
    gsap.to(".global", { opacity: 1 }); // context-ке кірмейді
  });
});
```

## Келесі қадам

[gsap.matchMedia()](/docs/utilitalar/matchmedia) — responsive анимациялар.
