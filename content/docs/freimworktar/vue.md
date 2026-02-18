---
title: Vue-да GSAP
description: Vue 3 фреймворкінде GSAP анимацияларын қолдану
---

# Vue-да GSAP

Vue 3-те GSAP қолдану үшін Composition API және lifecycle hooks қолданамыз.

## Орнату

```bash
npm install gsap
```

## Негізгі қолданылуы

### ref + onMounted

```vue
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

const boxRef = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.to(boxRef.value, {
      x: 200,
      duration: 1,
    });
  });
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <div ref="boxRef" class="box">Box</div>
</template>
```

## gsap.context() қолдану

```vue
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

const containerRef = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(".title", { y: 50, opacity: 0 });
    gsap.from(".content", { y: 30, opacity: 0, delay: 0.2 });
    gsap.from(".button", { scale: 0.8, opacity: 0, delay: 0.4 });
  }, containerRef.value);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <div ref="containerRef">
    <h1 class="title">Title</h1>
    <p class="content">Content</p>
    <button class="button">Button</button>
  </div>
</template>
```

## Timeline қолдану

```vue
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

const containerRef = ref(null);
const tl = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    tl.value = gsap
      .timeline()
      .from(".hero-title", { y: 100, opacity: 0, duration: 0.8 })
      .from(".hero-text", { y: 50, opacity: 0 }, "-=0.4")
      .from(".hero-button", { scale: 0.8, opacity: 0 }, "-=0.2");
  }, containerRef.value);
});

onUnmounted(() => {
  ctx?.revert();
});

// Timeline басқару
const replay = () => {
  tl.value?.restart();
};
</script>

<template>
  <div ref="containerRef">
    <h1 class="hero-title">Welcome</h1>
    <p class="hero-text">Description</p>
    <button class="hero-button" @click="replay">Replay</button>
  </div>
</template>
```

## Hover эффекттері

```vue
<script setup>
import { ref } from "vue";
import gsap from "gsap";

const cardRef = ref(null);

const onMouseEnter = () => {
  gsap.to(cardRef.value, {
    scale: 1.05,
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    duration: 0.3,
  });
};

const onMouseLeave = () => {
  gsap.to(cardRef.value, {
    scale: 1,
    boxShadow: "0 0 0 rgba(0,0,0,0)",
    duration: 0.3,
  });
};
</script>

<template>
  <div ref="cardRef" class="card" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    Hover me
  </div>
</template>
```

## ScrollTrigger

```vue
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(".card", {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 80%",
      },
    });
  }, sectionRef.value);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section ref="sectionRef">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
  </section>
</template>
```

## Reactive data-мен

```vue
<script setup>
import { ref, watch } from "vue";
import gsap from "gsap";

const isOpen = ref(false);
const contentRef = ref(null);

watch(isOpen, (newValue) => {
  gsap.to(contentRef.value, {
    height: newValue ? "auto" : 0,
    opacity: newValue ? 1 : 0,
    duration: 0.3,
  });
});

const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div>
    <button @click="toggle">Toggle</button>
    <div ref="contentRef" class="content" style="overflow: hidden">Collapsible content</div>
  </div>
</template>
```

## Composable құру

```javascript
// composables/useGsap.js
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

export function useGsap(animation) {
  const elementRef = ref(null);
  let ctx;

  onMounted(() => {
    ctx = gsap.context(() => {
      animation(elementRef.value);
    });
  });

  onUnmounted(() => {
    ctx?.revert();
  });

  return elementRef;
}
```

```vue
<script setup>
import { useGsap } from "@/composables/useGsap";
import gsap from "gsap";

const boxRef = useGsap((el) => {
  gsap.from(el, { x: -100, opacity: 0, duration: 1 });
});
</script>

<template>
  <div ref="boxRef" class="box">Animated Box</div>
</template>
```

## v-for элементтері

```vue
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

const items = ref(["Item 1", "Item 2", "Item 3", "Item 4"]);
const listRef = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(".list-item", {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
    });
  }, listRef.value);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <ul ref="listRef">
    <li v-for="item in items" :key="item" class="list-item">
      {{ item }}
    </li>
  </ul>
</template>
```

## Transition компонентімен

```vue
<script setup>
import gsap from "gsap";

const onEnter = (el, done) => {
  gsap.from(el, {
    opacity: 0,
    y: 20,
    duration: 0.3,
    onComplete: done,
  });
};

const onLeave = (el, done) => {
  gsap.to(el, {
    opacity: 0,
    y: -20,
    duration: 0.3,
    onComplete: done,
  });
};
</script>

<template>
  <Transition @enter="onEnter" @leave="onLeave" :css="false">
    <div v-if="show" class="modal">Modal Content</div>
  </Transition>
</template>
```

## Маңызды ережелер

1. **ref қолдану** — DOM элементтеріне қол жеткізу
2. **onUnmounted cleanup** — memory leak болдырмау
3. **gsap.context()** — скопинг және cleanup
4. **nextTick** — DOM жаңартылғаннан кейін анимация

## Қорытынды

Vue 3-те GSAP қолдану оңай — Composition API, refs және gsap.context() арқылы анимацияларды дұрыс басқаруға болады.
