---
title: GSAP Context
description: gsap.context() арқылы анимацияларды топтау және басқару
---

# GSAP Context

`gsap.context()` — анимацияларды топтап, бірге басқаруға мүмкіндік береді. React, Vue сияқты фреймворктарда өте пайдалы.

## Негізгі қолдану

```javascript
const ctx = gsap.context(() => {
  gsap.to(".box", { x: 100 });
  gsap.to(".circle", { rotation: 360 });
  gsap.from(".text", { opacity: 0 });
});

// Барлық анимацияларды бірден жою
ctx.revert();
```

## Неге қажет?

### Мәселе: Cleanup қиындығы

```javascript
// Бұрынғы тәсіл — әр анимацияны сақтау керек
const anim1 = gsap.to(".box", { x: 100 });
const anim2 = gsap.to(".circle", { y: 50 });
const tl = gsap.timeline();

// Cleanup
anim1.kill();
anim2.kill();
tl.kill();
```

### Шешім: Context

```javascript
// Жаңа тәсіл — бәрі бір жерде
const ctx = gsap.context(() => {
  gsap.to(".box", { x: 100 });
  gsap.to(".circle", { y: 50 });
  gsap.timeline().to(".text", { opacity: 1 });
});

// Бір жолмен cleanup
ctx.revert();
```

## Scope параметрі

Селекторларды белгілі аймаққа шектеу:

```javascript
const ctx = gsap.context(() => {
  // ".box" тек #container ішінен ізделеді
  gsap.to(".box", { x: 100 });
}, "#container"); // Scope элементі
```

### Практикалық мысал

```html
<div id="section1">
  <div class="box"></div>
</div>
<div id="section2">
  <div class="box"></div>
</div>
```

```javascript
// Тек section1 ішіндегі .box анимацияланады
const ctx = gsap.context(() => {
  gsap.to(".box", { x: 100 });
}, "#section1");
```

## React-та қолдану

```jsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

function MyComponent() {
  const containerRef = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".box", { opacity: 0, y: 50 });
      gsap.to(".circle", { rotation: 360, repeat: -1 });
    }, containerRef);

    // Cleanup — компонент жойылғанда
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <div className="box">Box</div>
      <div className="circle">Circle</div>
    </div>
  );
}
```

## Vue-да қолдану

```vue
<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";

const containerRef = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(".box", { opacity: 0, y: 50 });
    gsap.to(".circle", { rotation: 360, repeat: -1 });
  }, containerRef.value);
});

onUnmounted(() => {
  ctx.revert();
});
</script>

<template>
  <div ref="containerRef">
    <div class="box">Box</div>
    <div class="circle">Circle</div>
  </div>
</template>
```

## add() әдісі

Кейін анимация қосу:

```javascript
const ctx = gsap.context(() => {
  gsap.to(".box", { x: 100 });
});

// Кейін қосу
ctx.add(() => {
  gsap.to(".new-element", { y: 50 });
});

// Немесе функция арқылы
ctx.add("myAnimation", () => {
  return gsap.to(".box", { rotation: 360 });
});
```

## ignore() әдісі

Context-тан тыс анимация:

```javascript
const ctx = gsap.context(() => {
  gsap.to(".box", { x: 100 });

  // Бұл анимация revert() кезінде жойылмайды
  ctx.ignore(() => {
    gsap.to(".permanent", { opacity: 1 });
  });
});

ctx.revert(); // .permanent анимациясы қалады
```

## conditions

Медиа сұраныстармен біріктіру:

```javascript
const ctx = gsap.context(() => {
  // Барлық breakpoint-тар үшін
  gsap.from(".header", { y: -100 });
});

ctx.add(() => {
  // Desktop-қа ғана
  const mm = gsap.matchMedia();
  mm.add("(min-width: 1024px)", () => {
    gsap.to(".sidebar", { x: 0 });
  });
});
```

## ScrollTrigger-мен

```javascript
const ctx = gsap.context(() => {
  gsap.to(".section", {
    x: 500,
    scrollTrigger: {
      trigger: ".section",
      start: "top center",
      end: "bottom center",
      scrub: true,
    },
  });
});

// ScrollTrigger-лер де жойылады
ctx.revert();
```

## revert() vs kill()

### revert()

```javascript
ctx.revert();
// - Барлық анимацияларды жояды
// - Элементтерді бастапқы күйге қайтарады
// - Inline стильдерді алып тастайды
```

### kill()

```javascript
ctx.kill();
// - Барлық анимацияларды жояды
// - Элементтер ағымдағы күйде қалады
// - Inline стильдер қалады
```

## Практикалық мысалдар

### Модал терезе

```javascript
class Modal {
  constructor(element) {
    this.element = element;
    this.ctx = null;
  }

  open() {
    this.ctx = gsap.context(() => {
      gsap.from(this.element, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
      });
      gsap.from(".modal-content", {
        y: 20,
        delay: 0.1,
      });
    }, this.element);
  }

  close() {
    gsap.to(this.element, {
      opacity: 0,
      scale: 0.9,
      duration: 0.2,
      onComplete: () => {
        this.ctx?.revert();
      },
    });
  }
}
```

### Tab компоненті

```javascript
function initTabs(container) {
  let activeCtx = null;

  const showTab = (tabContent) => {
    // Алдыңғы анимацияларды жою
    activeCtx?.revert();

    activeCtx = gsap.context(() => {
      gsap.from(tabContent, { opacity: 0, y: 20 });
      gsap.from(tabContent.querySelectorAll(".item"), {
        opacity: 0,
        x: -20,
        stagger: 0.1,
      });
    }, tabContent);
  };

  // Tab батырмаларына listener
  container.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const content = container.querySelector(btn.dataset.target);
      showTab(content);
    });
  });
}
```

### Infinite scroll

```javascript
class InfiniteScroll {
  constructor() {
    this.contexts = [];
  }

  addItems(items) {
    const ctx = gsap.context(() => {
      gsap.from(items, {
        opacity: 0,
        y: 50,
        stagger: 0.1,
      });
    });
    this.contexts.push(ctx);
  }

  cleanup() {
    // Барлық context-терді жою
    this.contexts.forEach((ctx) => ctx.revert());
    this.contexts = [];
  }
}
```

## Кеңестер

1. **Scope** — Компонент контейнеріне байлаңыз
2. **revert()** — Компонент unmount кезінде шақырыңыз
3. **Naming** — Үлкен жобаларда атау беріңіз
4. **ScrollTrigger** — Context ішінде жасаңыз

## Қорытынды

`gsap.context()` — GSAP 3.11+ нұсқасындағы маңызды жаңалық. Фреймворктармен жұмыс істегенде анимация cleanup-ты айтарлықтай жеңілдетеді және memory leak-тердің алдын алады.
