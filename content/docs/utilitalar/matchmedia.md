---
title: gsap.matchMedia()
description: GSAP matchMedia - responsive анимациялар құру
---

# gsap.matchMedia()

**gsap.matchMedia()** — экран өлшеміне байланысты әртүрлі анимациялар құруға мүмкіндік береді. CSS media queries сияқты, бірақ JavaScript анимациялары үшін.

## Негізгі қолданылуы

```javascript
const mm = gsap.matchMedia();

mm.add("(min-width: 800px)", () => {
  // Desktop анимациялар
  gsap.to(".box", { x: 200 });
});

mm.add("(max-width: 799px)", () => {
  // Mobile анимациялар
  gsap.to(".box", { x: 100 });
});
```

## Қалай жұмыс істейді?

1. Media query сәйкес келгенде — анимациялар құрылады
2. Media query сәйкес келмегенде — анимациялар автоматты тазаланады
3. Экран өлшемі өзгергенде — қайта орындалады

## Бірнеше breakpoint

```javascript
const mm = gsap.matchMedia();

// Mobile
mm.add("(max-width: 599px)", () => {
  gsap.to(".box", { x: 50, scale: 0.8 });
});

// Tablet
mm.add("(min-width: 600px) and (max-width: 1023px)", () => {
  gsap.to(".box", { x: 100, scale: 1 });
});

// Desktop
mm.add("(min-width: 1024px)", () => {
  gsap.to(".box", { x: 200, scale: 1.2 });
});
```

## Conditions объектісі

Бірнеше шартты бірге анықтау:

```javascript
const mm = gsap.matchMedia();

mm.add(
  {
    isDesktop: "(min-width: 1024px)",
    isTablet: "(min-width: 600px) and (max-width: 1023px)",
    isMobile: "(max-width: 599px)",
    reduceMotion: "(prefers-reduced-motion: reduce)",
  },
  (context) => {
    const { isDesktop, isTablet, isMobile, reduceMotion } = context.conditions;

    if (reduceMotion) {
      // Анимациясыз
      return;
    }

    if (isDesktop) {
      gsap.to(".box", { x: 200 });
    } else if (isTablet) {
      gsap.to(".box", { x: 100 });
    } else if (isMobile) {
      gsap.to(".box", { x: 50 });
    }
  }
);
```

## ScrollTrigger-мен

```javascript
const mm = gsap.matchMedia();

mm.add("(min-width: 800px)", () => {
  gsap.to(".box", {
    x: 200,
    scrollTrigger: {
      trigger: ".box",
      start: "top center",
      end: "bottom center",
      scrub: true,
      pin: true,
    },
  });
});

mm.add("(max-width: 799px)", () => {
  // Mobile-да pin жоқ
  gsap.to(".box", {
    x: 100,
    scrollTrigger: {
      trigger: ".box",
      start: "top 80%",
    },
  });
});
```

## prefers-reduced-motion

Қолданушы қалауын құрметтеу:

```javascript
const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
  // Толық анимациялар
  gsap.to(".box", {
    x: 200,
    rotation: 360,
    duration: 2,
  });
});

mm.add("(prefers-reduced-motion: reduce)", () => {
  // Қарапайым анимация немесе анимациясыз
  gsap.set(".box", { x: 200 });
});
```

## Dark mode

```javascript
const mm = gsap.matchMedia();

mm.add("(prefers-color-scheme: dark)", () => {
  gsap.to("body", { backgroundColor: "#1a1a1a", color: "#ffffff" });
});

mm.add("(prefers-color-scheme: light)", () => {
  gsap.to("body", { backgroundColor: "#ffffff", color: "#1a1a1a" });
});
```

## revert()

Барлық matchMedia анимацияларын тазалау:

```javascript
const mm = gsap.matchMedia();

mm.add("(min-width: 800px)", () => {
  gsap.to(".box", { x: 200 });
});

// Кейінірек тазалау
mm.revert();
```

## context-пен бірге

```javascript
const ctx = gsap.context(() => {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 800px)", () => {
    gsap.to(".box", { x: 200 });
  });
});

// ctx.revert() — matchMedia да тазаланады
ctx.revert();
```

## Vue-да қолдану

```vue
<script setup>
import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";

let mm;

onMounted(() => {
  mm = gsap.matchMedia();

  mm.add("(min-width: 800px)", () => {
    gsap.to(".box", { x: 200 });
  });

  mm.add("(max-width: 799px)", () => {
    gsap.to(".box", { x: 100 });
  });
});

onUnmounted(() => {
  mm?.revert();
});
</script>
```

## Практикалық мысал

```javascript
const mm = gsap.matchMedia();

mm.add(
  {
    isDesktop: "(min-width: 1024px)",
    isMobile: "(max-width: 1023px)",
    reducedMotion: "(prefers-reduced-motion: reduce)",
  },
  (context) => {
    const { isDesktop, isMobile, reducedMotion } = context.conditions;

    // Reduced motion тексеру
    const duration = reducedMotion ? 0 : 1;

    // Hero анимация
    gsap.from(".hero-title", {
      y: isDesktop ? 100 : 50,
      opacity: 0,
      duration,
    });

    // ScrollTrigger (тек desktop)
    if (isDesktop && !reducedMotion) {
      gsap.to(".parallax", {
        y: -100,
        scrollTrigger: {
          trigger: ".parallax",
          scrub: true,
        },
      });
    }
  }
);
```

## Келесі қадам

[Vue](/docs/freimworktar/vue) фреймворкінде GSAP қолдануды үйреніңіз.
