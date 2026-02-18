---
title: Hero секция
description: GSAP арқылы әсерлі hero секция анимациялары
---

# Hero секция

Hero секция — сайттың бірінші экраны. Әсерлі анимациялар келушілерді тартады.

## Негізгі құрылым

```html
<section class="hero">
  <div class="hero-content">
    <h1 class="hero-title">
      <span>Болашақты</span>
      <span>бүгін</span>
      <span>жасаймыз</span>
    </h1>
    <p class="hero-subtitle">Инновациялық шешімдер мен заманауи технологиялар</p>
    <div class="hero-cta">
      <button class="btn-primary">Бастау</button>
      <button class="btn-secondary">Көбірек білу</button>
    </div>
  </div>
  <div class="hero-visual">
    <img src="hero-image.jpg" alt="Hero" />
  </div>
</section>
```

## Базалық анимация

```javascript
const heroTl = gsap.timeline();

heroTl
  .from(".hero-title span", {
    y: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power3.out",
  })
  .from(
    ".hero-subtitle",
    {
      y: 30,
      opacity: 0,
      duration: 0.6,
    },
    "-=0.3"
  )
  .from(
    ".hero-cta button",
    {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.4,
    },
    "-=0.2"
  )
  .from(
    ".hero-visual",
    {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    },
    "-=0.6"
  );
```

## Split text эффекті

### Әріптерге бөлу

```javascript
// SplitText плагинімен (Club)
const split = new SplitText(".hero-title", { type: "chars, words" });

gsap.from(split.chars, {
  y: 100,
  opacity: 0,
  rotationX: -90,
  stagger: 0.02,
  duration: 0.8,
  ease: "back.out(1.7)",
});
```

### Manual split

```javascript
// Қолмен бөлу
const title = document.querySelector(".hero-title");
const text = title.textContent;
title.innerHTML = text
  .split("")
  .map((char) => `<span class="char">${char === " " ? "&nbsp;" : char}</span>`)
  .join("");

gsap.from(".char", {
  y: 50,
  opacity: 0,
  stagger: 0.03,
  duration: 0.5,
  ease: "power3.out",
});
```

## Parallax hero

```javascript
// Background parallax
gsap.to(".hero-bg", {
  y: "30%",
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});

// Content parallax
gsap.to(".hero-content", {
  y: "50%",
  opacity: 0,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "center top",
    scrub: true,
  },
});
```

## Gradient анимация

```css
.hero {
  background: linear-gradient(45deg, var(--color1), var(--color2), var(--color3));
  background-size: 400% 400%;
}
```

```javascript
gsap.to(".hero", {
  "--color1": "#0ae448",
  "--color2": "#3eff7a",
  "--color3": "#0ba934",
  duration: 5,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
});

// Background position animation
gsap.to(".hero", {
  backgroundPosition: "100% 100%",
  duration: 10,
  repeat: -1,
  yoyo: true,
  ease: "none",
});
```

## 3D эффекттер

```javascript
// Perspective container
gsap.set(".hero", { perspective: 1000 });

// 3D title
gsap.from(".hero-title", {
  rotationX: 90,
  transformOrigin: "center bottom",
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
});

// 3D cards
gsap.from(".hero-card", {
  rotationY: -45,
  z: -200,
  opacity: 0,
  stagger: 0.2,
  duration: 0.8,
  ease: "power2.out",
});
```

## Mouse interaction

```javascript
const hero = document.querySelector(".hero");
const visual = document.querySelector(".hero-visual");

hero.addEventListener("mousemove", (e) => {
  const rect = hero.getBoundingClientRect();
  const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
  const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

  gsap.to(visual, {
    rotationY: x * 10,
    rotationX: -y * 10,
    duration: 0.5,
    ease: "power2.out",
  });
});

hero.addEventListener("mouseleave", () => {
  gsap.to(visual, {
    rotationY: 0,
    rotationX: 0,
    duration: 0.5,
  });
});
```

## Floating elements

```javascript
// Floating shapes
gsap.to(".float-element", {
  y: "random(-20, 20)",
  x: "random(-10, 10)",
  rotation: "random(-5, 5)",
  duration: "random(2, 4)",
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
  stagger: {
    each: 0.2,
    from: "random",
  },
});
```

## Typing эффект

```javascript
const text = "Болашақты бүгін жасаймыз";
const element = document.querySelector(".hero-title");

gsap.to(element, {
  text: {
    value: text,
    delimiter: "",
  },
  duration: 2,
  ease: "none",
});
```

## Video background

```javascript
const video = document.querySelector(".hero-video");

// Кіру анимациясы
gsap.from(video, {
  scale: 1.2,
  opacity: 0,
  duration: 2,
  ease: "power2.out",
});

// Scroll-да overlay
gsap.to(".video-overlay", {
  opacity: 0.8,
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});
```

## Counter анимация

```javascript
const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  const target = parseInt(counter.dataset.target);

  gsap.to(counter, {
    innerText: target,
    duration: 2,
    snap: { innerText: 1 },
    ease: "power2.out",
    scrollTrigger: {
      trigger: counter,
      start: "top 80%",
    },
  });
});
```

## Толық мысал

```javascript
function initHero() {
  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
  });

  // Initial states
  gsap.set(".hero-content", { opacity: 0 });
  gsap.set(".hero-visual img", { scale: 1.2, opacity: 0 });

  // Animation sequence
  tl.to(".hero-content", { opacity: 1, duration: 0.1 })
    .from(".hero-title span", {
      y: 100,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
    })
    .from(
      ".hero-subtitle",
      {
        y: 30,
        opacity: 0,
        duration: 0.6,
      },
      "-=0.5"
    )
    .from(
      ".hero-cta",
      {
        y: 20,
        opacity: 0,
        duration: 0.4,
      },
      "-=0.3"
    )
    .to(
      ".hero-visual img",
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      },
      "-=1"
    );

  // Scroll animations
  gsap.to(".hero-content", {
    y: 100,
    opacity: 0,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "center top",
      scrub: 1,
    },
  });

  // Floating decorations
  gsap.to(".hero-decoration", {
    y: "random(-30, 30)",
    rotation: "random(-15, 15)",
    duration: "random(3, 5)",
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    stagger: 0.5,
  });
}

// Run on load
window.addEventListener("load", initHero);
```

## Responsive hero

```javascript
const mm = gsap.matchMedia();

mm.add("(min-width: 1024px)", () => {
  // Desktop animation
  gsap.from(".hero-title", { x: -100, opacity: 0, duration: 1 });
  gsap.from(".hero-visual", { x: 100, opacity: 0, duration: 1 });
});

mm.add("(max-width: 1023px)", () => {
  // Mobile animation
  gsap.from(".hero-title", { y: 50, opacity: 0, duration: 0.6 });
  gsap.from(".hero-visual", { y: 30, opacity: 0, duration: 0.6, delay: 0.2 });
});
```

## Кеңестер

1. **Performance** — Hero критикалық, оптимизация қажет
2. **Loading** — Суреттер жүктелгенше күтіңіз
3. **Mobile** — Қарапайым анимациялар қолданыңыз
4. **Timing** — Бірінші секундта назар аударыңыз

## Қорытынды

Hero секция анимациялары бірінші әсерді қалыптастырады. Split text, parallax және mouse interaction эффекттері сайтты ерекше етеді.
