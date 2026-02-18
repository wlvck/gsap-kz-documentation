---
title: Loading анимация
description: GSAP арқылы loading экрандары мен индикаторлар жасау
---

# Loading анимация

Loading анимациялары — контент жүктелгенше пайдаланушыны бос күттірмейді және UX жақсартады.

## Spinner анимация

```html
<div class="spinner">
  <div class="spinner-ring"></div>
</div>
```

```css
.spinner-ring {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(10, 228, 72, 0.2);
  border-top-color: #0ae448;
  border-radius: 50%;
}
```

```javascript
gsap.to(".spinner-ring", {
  rotation: 360,
  duration: 1,
  ease: "none",
  repeat: -1,
});
```

## Dot loader

```html
<div class="dot-loader">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</div>
```

```javascript
gsap.to(".dot", {
  y: -20,
  stagger: {
    each: 0.15,
    repeat: -1,
    yoyo: true,
  },
  duration: 0.3,
  ease: "power2.out",
});
```

## Progress bar

```html
<div class="progress-container">
  <div class="progress-bar"></div>
  <span class="progress-text">0%</span>
</div>
```

```javascript
function updateProgress(progress) {
  gsap.to(".progress-bar", {
    width: progress + "%",
    duration: 0.3,
    ease: "power2.out",
  });

  gsap.to(".progress-text", {
    innerText: Math.round(progress),
    duration: 0.3,
    snap: { innerText: 1 },
    ease: "power2.out",
  });
}

// Simulate loading
let progress = 0;
const interval = setInterval(() => {
  progress += Math.random() * 10;
  if (progress >= 100) {
    progress = 100;
    clearInterval(interval);
  }
  updateProgress(progress);
}, 200);
```

## Skeleton loader

```html
<div class="skeleton-card">
  <div class="skeleton-image skeleton"></div>
  <div class="skeleton-title skeleton"></div>
  <div class="skeleton-text skeleton"></div>
</div>
```

```javascript
gsap.to(".skeleton", {
  backgroundPosition: "200% 0",
  duration: 1.5,
  ease: "none",
  repeat: -1,
});
```

```css
.skeleton {
  background: linear-gradient(90deg, #1c1e1d 0%, #2a2d2b 50%, #1c1e1d 100%);
  background-size: 200% 100%;
}
```

## Page loader

```javascript
class PageLoader {
  constructor() {
    this.loader = document.querySelector(".page-loader");
    this.progress = document.querySelector(".loader-progress");
    this.counter = document.querySelector(".loader-counter");
    this.content = document.querySelector(".page-content");

    this.init();
  }

  init() {
    // Hide content initially
    gsap.set(this.content, { opacity: 0 });

    // Simulate loading
    this.simulateLoading();
  }

  simulateLoading() {
    const tl = gsap.timeline();

    tl.to(this.progress, {
      width: "100%",
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        const progress = Math.round(tl.progress() * 100);
        this.counter.textContent = progress + "%";
      },
    })
      .to(this.loader, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      })
      .to(
        this.content,
        {
          opacity: 1,
          duration: 0.5,
        },
        "-=0.3"
      )
      .set(this.loader, { display: "none" });
  }
}

window.addEventListener("load", () => {
  new PageLoader();
});
```

## Logo loader

```html
<div class="logo-loader">
  <svg viewBox="0 0 100 100">
    <path id="logo-path" d="..." fill="none" stroke="#0ae448" stroke-width="4" />
  </svg>
</div>
```

```javascript
const path = document.querySelector("#logo-path");
const length = path.getTotalLength();

gsap.set(path, {
  strokeDasharray: length,
  strokeDashoffset: length,
});

gsap.to(path, {
  strokeDashoffset: 0,
  duration: 2,
  ease: "power2.inOut",
  repeat: -1,
  yoyo: true,
});
```

## Text loader

```javascript
const loadingText = "ЖҮКТЕЛУДЕ";
const letters = loadingText.split("");
const container = document.querySelector(".text-loader");

letters.forEach((letter) => {
  const span = document.createElement("span");
  span.textContent = letter;
  container.appendChild(span);
});

gsap.to(".text-loader span", {
  opacity: 0.3,
  stagger: {
    each: 0.1,
    repeat: -1,
    yoyo: true,
  },
  duration: 0.3,
});
```

## Circular progress

```html
<svg class="circular-progress" viewBox="0 0 100 100">
  <circle class="bg" cx="50" cy="50" r="45" fill="none" stroke="#2a2d2b" stroke-width="8" />
  <circle
    class="progress"
    cx="50"
    cy="50"
    r="45"
    fill="none"
    stroke="#0ae448"
    stroke-width="8"
    stroke-dasharray="283"
    stroke-dashoffset="283"
    transform="rotate(-90 50 50)"
  />
</svg>
<span class="percentage">0%</span>
```

```javascript
function setProgress(percent) {
  const circumference = 283; // 2 * PI * 45
  const offset = circumference - (percent / 100) * circumference;

  gsap.to(".circular-progress .progress", {
    strokeDashoffset: offset,
    duration: 0.5,
    ease: "power2.out",
  });

  gsap.to(".percentage", {
    innerText: percent,
    duration: 0.5,
    snap: { innerText: 1 },
  });
}
```

## Image preloader

```javascript
class ImagePreloader {
  constructor(images, onProgress, onComplete) {
    this.images = images;
    this.loaded = 0;
    this.onProgress = onProgress;
    this.onComplete = onComplete;

    this.load();
  }

  load() {
    this.images.forEach((src) => {
      const img = new Image();
      img.onload = () => this.imageLoaded();
      img.onerror = () => this.imageLoaded();
      img.src = src;
    });
  }

  imageLoaded() {
    this.loaded++;
    const progress = (this.loaded / this.images.length) * 100;

    this.onProgress(progress);

    if (this.loaded === this.images.length) {
      this.onComplete();
    }
  }
}

// Usage
const images = ["img1.jpg", "img2.jpg", "img3.jpg"];

new ImagePreloader(
  images,
  (progress) => {
    gsap.to(".progress-bar", {
      width: progress + "%",
      duration: 0.3,
    });
  },
  () => {
    gsap.to(".loader", {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        document.querySelector(".loader").style.display = "none";
      },
    });
  }
);
```

## Pulse loader

```javascript
gsap.to(".pulse-dot", {
  scale: 1.5,
  opacity: 0,
  stagger: {
    each: 0.3,
    repeat: -1,
  },
  duration: 1,
  ease: "power2.out",
});
```

## Wave loader

```javascript
const bars = document.querySelectorAll(".wave-bar");

bars.forEach((bar, i) => {
  gsap.to(bar, {
    scaleY: 1.5,
    duration: 0.4,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    delay: i * 0.1,
  });
});
```

## Толық мысал

```javascript
class AdvancedLoader {
  constructor() {
    this.loader = document.querySelector(".loader");
    this.progress = document.querySelector(".loader-progress");
    this.counter = document.querySelector(".loader-counter");
    this.logo = document.querySelector(".loader-logo");
    this.bars = document.querySelectorAll(".loader-bar");

    this.timeline = gsap.timeline({ paused: true });
    this.setupTimeline();
  }

  setupTimeline() {
    // Logo animation
    this.timeline
      .from(this.logo, {
        scale: 0,
        rotation: -180,
        duration: 0.8,
        ease: "back.out(1.7)",
      })
      // Progress bar
      .to(
        this.progress,
        {
          width: "100%",
          duration: 2,
          ease: "power2.inOut",
          onUpdate: () => {
            const p = Math.round(this.timeline.progress() * 50 + 50);
            if (this.counter) this.counter.textContent = p + "%";
          },
        },
        "-=0.3"
      )
      // Bars animation
      .to(this.bars, {
        scaleY: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: "power4.inOut",
      })
      // Hide loader
      .to(this.loader, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          this.loader.style.display = "none";
        },
      });
  }

  start() {
    this.timeline.play();
  }

  // For real loading
  setProgress(progress) {
    gsap.to(this.progress, {
      width: progress + "%",
      duration: 0.3,
    });
    this.counter.textContent = Math.round(progress) + "%";
  }

  complete() {
    this.timeline.play();
  }
}

// Initialize
const loader = new AdvancedLoader();

window.addEventListener("load", () => {
  loader.start();
});
```

## Кеңестер

1. **Minimal design** — Қарапайым loader жақсы
2. **Feedback** — Progress көрсетіңіз
3. **Performance** — Анимация жеңіл болсын
4. **Accessibility** — Screen reader-ге хабарлаңыз

## Қорытынды

Loading анимациялары — UX-тің маңызды бөлігі. Progress bar, skeleton loader, circular progress эффекттері пайдаланушыны күттірмейді.
