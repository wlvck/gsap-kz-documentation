---
title: registerPlugin()
description: GSAP плагиндерін тіркеу және баптау
---

# registerPlugin()

`gsap.registerPlugin()` — GSAP плагиндерін тіркеу үшін қолданылады. Плагинді қолданар алдында тіркеу міндетті.

## Негізгі қолдану

```javascript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

// Плагиндерді тіркеу
gsap.registerPlugin(ScrollTrigger, Draggable);
```

## Неге қажет?

### Tree-shaking

Тіркелмеген плагиндер build кезінде жойылады:

```javascript
// Тіркелмесе, tree-shaking жояды
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Тіркегеннен кейін ғана қолдануға болады
gsap.registerPlugin(ScrollTrigger);
```

### Build құралдары

Webpack, Vite, Rollup сияқты құралдар тіркелмеген import-тарды "unused" деп санайды.

## Барлық плагиндер

### Тегін плагиндер

```javascript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";

gsap.registerPlugin(
  ScrollTrigger,
  Draggable,
  MotionPathPlugin,
  TextPlugin,
  Flip,
  Observer,
  ScrollToPlugin,
  EaselPlugin,
  PixiPlugin
);
```

### Club плагиндері

```javascript
// Club мүшелігі қажет
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { GSDevTools } from "gsap/GSDevTools";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { PhysicsPropsPlugin } from "gsap/PhysicsPropsPlugin";
import { CustomEase } from "gsap/CustomEase";
import { CustomWiggle } from "gsap/CustomWiggle";
import { CustomBounce } from "gsap/CustomBounce";

gsap.registerPlugin(
  DrawSVGPlugin,
  MorphSVGPlugin,
  SplitText
  // ... т.б.
);
```

## Бір рет тіркеу

Плагинді бір рет тіркесе жеткілікті:

```javascript
// main.js немесе app.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Енді кез келген файлда қолдануға болады
```

## Vue.js-те қолдану

```javascript
// main.js
import { createApp } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const app = createApp(App);
app.provide("gsap", gsap);
app.mount("#app");
```

## registerEffect()

Custom эффекттерді тіркеу:

```javascript
gsap.registerEffect({
  name: "fade",
  effect: (targets, config) => {
    return gsap.to(targets, {
      opacity: 0,
      duration: config.duration,
      ease: config.ease,
    });
  },
  defaults: {
    duration: 1,
    ease: "power2.out",
  },
  extendTimeline: true,
});

// Қолдану
gsap.effects.fade(".box");

// Timeline-да
tl.fade(".box", { duration: 0.5 });
```

### Күрделі эффект

```javascript
gsap.registerEffect({
  name: "slideIn",
  effect: (targets, config) => {
    const tl = gsap.timeline();
    tl.from(targets, {
      x: config.direction === "left" ? -100 : 100,
      opacity: 0,
      duration: config.duration,
      stagger: config.stagger,
      ease: config.ease,
    });
    return tl;
  },
  defaults: {
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
    direction: "left",
  },
  extendTimeline: true,
});

// Қолдану
gsap.effects.slideIn(".cards", { direction: "right" });
```

## registerEase()

Custom ease тіркеу:

```javascript
gsap.registerEase("myEase", (progress) => {
  // Custom easing функциясы
  return progress * progress * (3 - 2 * progress);
});

// Қолдану
gsap.to(".box", {
  x: 100,
  ease: "myEase",
});
```

## Плагин нұсқасын тексеру

```javascript
console.log("GSAP:", gsap.version);
console.log("ScrollTrigger:", ScrollTrigger.version);
```

## defaults()

Глобалды әдепкі мәндер:

```javascript
gsap.defaults({
  duration: 1,
  ease: "power2.out",
});

// Енді duration мен ease көрсетпесе де болады
gsap.to(".box", { x: 100 });
```

## Қателер

### "X is not a function"

```javascript
// Қате: Плагин тіркелмеген
gsap.to(".box", {
  scrollTrigger: { trigger: ".box" }, // Error!
});

// Дұрыс: Алдымен тіркеу
gsap.registerPlugin(ScrollTrigger);
gsap.to(".box", {
  scrollTrigger: { trigger: ".box" },
});
```

### SSR қателері

```javascript
// SSR қолдайтын фреймворктарда
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
```

## Кеңестер

1. **Бір жерде тіркеу** — Entry point-та тіркеңіз
2. **Tree-shaking** — Қолданатын плагиндерді ғана import
3. **SSR** — Client-side тексеру қосыңыз
4. **Нұсқалар** — GSAP және плагин нұсқаларын сәйкестендіріңіз

## Қорытынды

`gsap.registerPlugin()` — GSAP плагиндерін қолданудың міндетті қадамы. Дұрыс тіркеу tree-shaking-пен үйлесімділік пен SSR қолдауын қамтамасыз етеді.
