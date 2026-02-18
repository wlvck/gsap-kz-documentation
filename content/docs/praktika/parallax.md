---
title: Parallax эффект
description: GSAP ScrollTrigger арқылы parallax анимациялар жасау
---

# Parallax эффект

Parallax — әртүрлі қабаттар әртүрлі жылдамдықпен қозғалатын эффект. Тереңдік иллюзиясын жасайды.

## Негізгі parallax

```javascript
gsap.to(".parallax-bg", {
  y: "50%",
  ease: "none",
  scrollTrigger: {
    trigger: ".parallax-section",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});
```

## Көп қабатты parallax

```html
<section class="parallax-section">
  <div class="parallax-layer layer-1"></div>
  <div class="parallax-layer layer-2"></div>
  <div class="parallax-layer layer-3"></div>
  <div class="parallax-content">
    <h2>Контент</h2>
  </div>
</section>
```

```javascript
const layers = [
  { element: ".layer-1", speed: 0.1 },
  { element: ".layer-2", speed: 0.3 },
  { element: ".layer-3", speed: 0.5 },
];

layers.forEach(({ element, speed }) => {
  gsap.to(element, {
    yPercent: speed * 100,
    ease: "none",
    scrollTrigger: {
      trigger: ".parallax-section",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
});
```

## Сурет parallax

```css
.parallax-image-container {
  height: 100vh;
  overflow: hidden;
}

.parallax-image {
  height: 120%;
  width: 100%;
  object-fit: cover;
}
```

```javascript
gsap.to(".parallax-image", {
  yPercent: -20,
  ease: "none",
  scrollTrigger: {
    trigger: ".parallax-image-container",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});
```

## Horizontal parallax

```javascript
gsap.to(".horizontal-element", {
  x: "200px",
  ease: "none",
  scrollTrigger: {
    trigger: ".section",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});
```

## Scale parallax

```javascript
gsap.from(".scale-element", {
  scale: 0.8,
  ease: "none",
  scrollTrigger: {
    trigger: ".section",
    start: "top bottom",
    end: "center center",
    scrub: true,
  },
});
```

## Rotation parallax

```javascript
gsap.to(".rotate-element", {
  rotation: 360,
  ease: "none",
  scrollTrigger: {
    trigger: ".section",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});
```

## Opacity parallax

```javascript
gsap.to(".fade-element", {
  opacity: 0,
  ease: "none",
  scrollTrigger: {
    trigger: ".section",
    start: "center center",
    end: "bottom top",
    scrub: true,
  },
});
```

## Mouse parallax

```javascript
const parallaxContainer = document.querySelector(".parallax-container");
const parallaxElements = document.querySelectorAll(".parallax-mouse");

parallaxContainer.addEventListener("mousemove", (e) => {
  const rect = parallaxContainer.getBoundingClientRect();
  const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
  const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

  parallaxElements.forEach((el) => {
    const speed = parseFloat(el.dataset.speed) || 1;

    gsap.to(el, {
      x: x * 50 * speed,
      y: y * 50 * speed,
      duration: 0.5,
      ease: "power2.out",
    });
  });
});
```

## 3D parallax

```javascript
const scene = document.querySelector(".parallax-3d");

scene.addEventListener("mousemove", (e) => {
  const rect = scene.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;

  gsap.to(".parallax-3d-layer", {
    rotateY: x * 20,
    rotateX: -y * 20,
    transformPerspective: 1000,
    duration: 0.5,
    ease: "power2.out",
  });
});
```

## Text parallax

```javascript
const textLines = document.querySelectorAll(".parallax-text");

textLines.forEach((line, i) => {
  const direction = i % 2 === 0 ? 1 : -1;

  gsap.to(line, {
    x: 100 * direction,
    ease: "none",
    scrollTrigger: {
      trigger: line,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
});
```

## Staggered parallax

```javascript
gsap.utils.toArray(".stagger-parallax").forEach((el, i) => {
  gsap.to(el, {
    y: (i + 1) * -50,
    ease: "none",
    scrollTrigger: {
      trigger: ".stagger-section",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
});
```

## Pin + parallax

```javascript
const pinSection = document.querySelector(".pin-parallax");

gsap
  .timeline({
    scrollTrigger: {
      trigger: pinSection,
      start: "top top",
      end: "+=200%",
      pin: true,
      scrub: 1,
    },
  })
  .to(".bg-layer", { y: "-50%", scale: 1.2 })
  .to(".fg-layer", { y: "-100%" }, 0)
  .from(".text-layer", { opacity: 0, y: 100 }, 0.3);
```

## Responsive parallax

```javascript
const mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {
  // Desktop parallax
  gsap.to(".parallax-element", {
    y: "-30%",
    ease: "none",
    scrollTrigger: {
      trigger: ".section",
      scrub: true,
    },
  });
});

mm.add("(max-width: 767px)", () => {
  // Mobile — parallax жоқ немесе аз
  gsap.to(".parallax-element", {
    y: "-10%",
    ease: "none",
    scrollTrigger: {
      trigger: ".section",
      scrub: true,
    },
  });
});
```

## Толық мысал

```javascript
function initParallax() {
  // Hero parallax
  gsap.to(".hero-bg", {
    y: "40%",
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  // Section backgrounds
  gsap.utils.toArray(".section-bg").forEach((bg) => {
    gsap.to(bg, {
      y: "30%",
      ease: "none",
      scrollTrigger: {
        trigger: bg.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  // Floating elements
  gsap.utils.toArray(".float-parallax").forEach((el, i) => {
    const speed = parseFloat(el.dataset.speed) || 0.5;
    const direction = i % 2 === 0 ? 1 : -1;

    gsap.to(el, {
      y: `${100 * speed * direction}px`,
      rotation: 15 * direction,
      ease: "none",
      scrollTrigger: {
        trigger: el.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  // Text reveal with parallax
  gsap.utils.toArray(".parallax-reveal").forEach((el) => {
    gsap.from(el, {
      y: 100,
      opacity: 0,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        end: "top 50%",
        scrub: 1,
      },
    });
  });
}

initParallax();
```

## Performance

```javascript
// will-change қосу
gsap.set(".parallax-layer", {
  willChange: "transform",
});

// GPU acceleration
gsap.to(".parallax-layer", {
  y: "50%",
  force3D: true, // GPU-да render
  ease: "none",
  scrollTrigger: {
    trigger: ".section",
    scrub: true,
  },
});
```

## Кеңестер

1. **scrub** — true немесе сан (жылдамдық үшін)
2. **willChange** — Performance үшін қосыңыз
3. **Mobile** — Parallax азайтыңыз немесе өшіріңіз
4. **Overflow** — Container-де hidden қойыңыз

## Қорытынды

Parallax эффект — визуалды тереңдік пен интерактивтілік қосады. ScrollTrigger scrub режимі parallax жасауды өте қарапайым етеді.
