---
title: Бет ауысу анимациясы
description: GSAP арқылы беттер арасында тегіс ауысу
---

# Бет ауысу анимациясы

Page transitions — беттер арасындағы анимациялы ауысу. SPA және MPA сайттарда қолданылады.

## Негізгі концепция

```javascript
// Бет кеткенде
function pageOut() {
  return gsap.to(".page", {
    opacity: 0,
    y: -50,
    duration: 0.5,
  });
}

// Бет келгенде
function pageIn() {
  return gsap.from(".page", {
    opacity: 0,
    y: 50,
    duration: 0.5,
  });
}
```

## Overlay transition

### HTML құрылымы

```html
<div class="page-transition">
  <div class="transition-overlay"></div>
</div>
```

### CSS

```css
.page-transition {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
}

.transition-overlay {
  position: absolute;
  inset: 0;
  background: #0ae448;
  transform: scaleY(0);
  transform-origin: bottom;
}
```

### JavaScript

```javascript
const overlay = document.querySelector(".transition-overlay");

function transitionIn() {
  return gsap.timeline().to(overlay, {
    scaleY: 1,
    transformOrigin: "bottom",
    duration: 0.5,
    ease: "power4.inOut",
  });
}

function transitionOut() {
  return gsap.timeline().to(overlay, {
    scaleY: 0,
    transformOrigin: "top",
    duration: 0.5,
    ease: "power4.inOut",
  });
}

// Сілтемелерге қолдану
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");

    transitionIn().then(() => {
      window.location.href = href;
    });
  });
});

// Жаңа бет жүктелгенде
window.addEventListener("load", () => {
  transitionOut();
});
```

## Slide transition

```javascript
const slides = document.querySelectorAll(".transition-slide");

function slideTransition(direction = "left") {
  const tl = gsap.timeline();

  tl.to(slides, {
    xPercent: direction === "left" ? -100 : 100,
    stagger: 0.1,
    duration: 0.5,
    ease: "power4.inOut",
  })
    .set(slides, { xPercent: direction === "left" ? 100 : -100 })
    .to(slides, {
      xPercent: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power4.inOut",
    });

  return tl;
}
```

## Curtain эффект

```html
<div class="curtains">
  <div class="curtain"></div>
  <div class="curtain"></div>
  <div class="curtain"></div>
  <div class="curtain"></div>
  <div class="curtain"></div>
</div>
```

```javascript
const curtains = document.querySelectorAll(".curtain");

function curtainIn() {
  return gsap.to(curtains, {
    scaleY: 1,
    transformOrigin: "top",
    stagger: 0.1,
    duration: 0.4,
    ease: "power3.inOut",
  });
}

function curtainOut() {
  return gsap.to(curtains, {
    scaleY: 0,
    transformOrigin: "bottom",
    stagger: 0.1,
    duration: 0.4,
    ease: "power3.inOut",
  });
}
```

## Circle reveal

```css
.circle-transition {
  position: fixed;
  inset: 0;
  background: #0ae448;
  clip-path: circle(0% at 50% 50%);
  z-index: 9999;
}
```

```javascript
const circle = document.querySelector(".circle-transition");

function circleIn(x, y) {
  // Click позициясынан бастау
  gsap.set(circle, {
    clipPath: `circle(0% at ${x}px ${y}px)`,
  });

  return gsap.to(circle, {
    clipPath: `circle(150% at ${x}px ${y}px)`,
    duration: 0.8,
    ease: "power4.inOut",
  });
}

function circleOut(x, y) {
  return gsap.to(circle, {
    clipPath: `circle(0% at ${x}px ${y}px)`,
    duration: 0.6,
    ease: "power4.inOut",
  });
}

// Click позициясын қолдану
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");

    circleIn(e.clientX, e.clientY).then(() => {
      window.location.href = href;
    });
  });
});
```

## Vue Router transition

```vue
<template>
  <transition @before-leave="beforeLeave" @leave="leave" @enter="enter" :css="false">
    <router-view />
  </transition>
</template>

<script setup>
const beforeLeave = (el) => {
  gsap.set(el, { position: "absolute", width: "100%" });
};

const leave = (el, done) => {
  gsap.to(el, {
    opacity: 0,
    x: -100,
    duration: 0.4,
    onComplete: done,
  });
};

const enter = (el, done) => {
  gsap.from(el, {
    opacity: 0,
    x: 100,
    duration: 0.4,
    onComplete: done,
  });
};
</script>
```

## Barba.js интеграция

```javascript
import barba from "@barba/core";
import gsap from "gsap";

barba.init({
  transitions: [
    {
      name: "default",
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
          y: -50,
          duration: 0.5,
        });
      },
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0,
          y: 50,
          duration: 0.5,
        });
      },
    },
  ],
});
```

## FLIP transition

```javascript
import { Flip } from "gsap/Flip";
gsap.registerPlugin(Flip);

function flipTransition(from, to) {
  // Бастапқы күйді сақтау
  const state = Flip.getState(from);

  // DOM өзгерту
  to.appendChild(from);

  // Анимация
  Flip.from(state, {
    duration: 0.5,
    ease: "power2.inOut",
    absolute: true,
  });
}
```

## Loading indicator

```javascript
class PageTransition {
  constructor() {
    this.overlay = document.querySelector(".transition-overlay");
    this.loader = document.querySelector(".transition-loader");
    this.isAnimating = false;
  }

  async navigateTo(url) {
    if (this.isAnimating) return;
    this.isAnimating = true;

    // Transition in + loader
    await gsap
      .timeline()
      .to(this.overlay, {
        scaleY: 1,
        duration: 0.5,
        ease: "power4.inOut",
      })
      .to(this.loader, {
        opacity: 1,
        duration: 0.2,
      });

    // Fetch new page
    const response = await fetch(url);
    const html = await response.text();

    // Update content
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const newContent = doc.querySelector(".page-content");
    document.querySelector(".page-content").innerHTML = newContent.innerHTML;

    // Update URL
    history.pushState({}, "", url);

    // Transition out
    await gsap
      .timeline()
      .to(this.loader, {
        opacity: 0,
        duration: 0.2,
      })
      .to(this.overlay, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.5,
        ease: "power4.inOut",
      });

    this.isAnimating = false;
  }
}
```

## Толық мысал

```javascript
class SmoothPageTransition {
  constructor() {
    this.overlay = document.querySelector(".page-overlay");
    this.content = document.querySelector(".page-content");
    this.links = document.querySelectorAll('a[href^="/"]');

    this.init();
  }

  init() {
    // Initial page animation
    this.pageEnter();

    // Link click handlers
    this.links.forEach((link) => {
      link.addEventListener("click", (e) => this.handleClick(e, link));
    });

    // Back/forward buttons
    window.addEventListener("popstate", () => this.handlePopState());
  }

  async handleClick(e, link) {
    e.preventDefault();
    const url = link.getAttribute("href");
    await this.navigateTo(url);
  }

  async handlePopState() {
    await this.navigateTo(window.location.pathname, false);
  }

  async navigateTo(url, pushState = true) {
    await this.pageLeave();

    const response = await fetch(url);
    const html = await response.text();

    // Update content
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    this.content.innerHTML = doc.querySelector(".page-content").innerHTML;

    if (pushState) {
      history.pushState({}, "", url);
    }

    await this.pageEnter();
  }

  pageLeave() {
    return gsap
      .timeline()
      .to(this.content, {
        opacity: 0,
        y: -30,
        duration: 0.3,
      })
      .to(this.overlay, {
        scaleY: 1,
        transformOrigin: "bottom",
        duration: 0.4,
        ease: "power3.inOut",
      });
  }

  pageEnter() {
    return gsap
      .timeline()
      .to(this.overlay, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.4,
        ease: "power3.inOut",
      })
      .from(
        this.content,
        {
          opacity: 0,
          y: 30,
          duration: 0.5,
        },
        "-=0.2"
      );
  }
}

new SmoothPageTransition();
```

## Кеңестер

1. **Performance** — Transition кезінде scroll өшіріңіз
2. **Back button** — popstate event қолданыңыз
3. **Loading** — Ұзақ жүктеу үшін индикатор қосыңыз
4. **Accessibility** — Screen reader-ге хабарлаңыз

## Қорытынды

Page transitions — сайт UX-ін айтарлықтай жақсартады. Overlay, slide, circle reveal эффекттері беттер арасында тегіс ауысуды қамтамасыз етеді.
