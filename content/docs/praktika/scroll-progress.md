---
title: Скролл прогресс
description: GSAP арқылы скролл прогресс индикаторлары жасау
---

# Скролл прогресс

Scroll progress — бетті қаншалықты скролл еткенін көрсететін индикатор.

## Негізгі progress bar

```html
<div class="scroll-progress">
  <div class="scroll-progress-bar"></div>
</div>
```

```css
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  z-index: 9999;
}

.scroll-progress-bar {
  height: 100%;
  background: #0ae448;
  transform-origin: left;
  transform: scaleX(0);
}
```

```javascript
gsap.to(".scroll-progress-bar", {
  scaleX: 1,
  ease: "none",
  scrollTrigger: {
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  },
});
```

## Circular progress

```html
<div class="circular-scroll-progress">
  <svg viewBox="0 0 100 100">
    <circle class="bg" cx="50" cy="50" r="45" />
    <circle class="progress" cx="50" cy="50" r="45" />
  </svg>
  <span class="percentage">0%</span>
</div>
```

```css
.circular-scroll-progress {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
}

.circular-scroll-progress svg {
  transform: rotate(-90deg);
}

.circular-scroll-progress circle {
  fill: none;
  stroke-width: 6;
}

.circular-scroll-progress .bg {
  stroke: rgba(255, 255, 255, 0.1);
}

.circular-scroll-progress .progress {
  stroke: #0ae448;
  stroke-dasharray: 283;
  stroke-dashoffset: 283;
}

.percentage {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}
```

```javascript
const circle = document.querySelector(".circular-scroll-progress .progress");
const percentage = document.querySelector(".percentage");
const circumference = 283;

ScrollTrigger.create({
  trigger: document.body,
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    const progress = self.progress;
    const offset = circumference - progress * circumference;

    gsap.to(circle, {
      strokeDashoffset: offset,
      duration: 0.1,
    });

    percentage.textContent = Math.round(progress * 100) + "%";
  },
});
```

## Section progress

```javascript
const sections = gsap.utils.toArray("section");
const indicators = document.querySelectorAll(".section-indicator");

sections.forEach((section, i) => {
  ScrollTrigger.create({
    trigger: section,
    start: "top center",
    end: "bottom center",
    onEnter: () => setActive(i),
    onEnterBack: () => setActive(i),
  });
});

function setActive(index) {
  indicators.forEach((ind, i) => {
    gsap.to(ind, {
      scale: i === index ? 1.5 : 1,
      backgroundColor: i === index ? "#0ae448" : "#666",
      duration: 0.3,
    });
  });
}
```

## Reading progress

```javascript
const article = document.querySelector("article");
const progressBar = document.querySelector(".reading-progress");

ScrollTrigger.create({
  trigger: article,
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    gsap.to(progressBar, {
      scaleX: self.progress,
      duration: 0.1,
    });
  },
});
```

## Chapter navigation

```html
<nav class="chapter-nav">
  <a href="#chapter1" class="chapter-link active">1</a>
  <a href="#chapter2" class="chapter-link">2</a>
  <a href="#chapter3" class="chapter-link">3</a>
  <div class="chapter-indicator"></div>
</nav>
```

```javascript
const chapters = gsap.utils.toArray("[id^='chapter']");
const links = document.querySelectorAll(".chapter-link");
const indicator = document.querySelector(".chapter-indicator");

chapters.forEach((chapter, i) => {
  ScrollTrigger.create({
    trigger: chapter,
    start: "top center",
    end: "bottom center",
    onEnter: () => updateNav(i),
    onEnterBack: () => updateNav(i),
  });
});

function updateNav(index) {
  links.forEach((link, i) => {
    link.classList.toggle("active", i === index);
  });

  const activeLink = links[index];
  gsap.to(indicator, {
    x: activeLink.offsetLeft,
    width: activeLink.offsetWidth,
    duration: 0.3,
    ease: "power2.out",
  });
}
```

## Vertical progress

```html
<div class="vertical-progress">
  <div class="vertical-progress-track">
    <div class="vertical-progress-thumb"></div>
  </div>
</div>
```

```css
.vertical-progress {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  height: 200px;
}

.vertical-progress-track {
  width: 4px;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.vertical-progress-thumb {
  width: 100%;
  background: #0ae448;
  border-radius: 2px;
  transform-origin: top;
}
```

```javascript
gsap.to(".vertical-progress-thumb", {
  scaleY: 1,
  ease: "none",
  scrollTrigger: {
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  },
});

gsap.set(".vertical-progress-thumb", { scaleY: 0 });
```

## Dot progress

```html
<div class="dot-progress">
  <div class="dot" data-section="0"></div>
  <div class="dot" data-section="1"></div>
  <div class="dot" data-section="2"></div>
  <div class="dot" data-section="3"></div>
</div>
```

```javascript
const dots = document.querySelectorAll(".dot-progress .dot");
const sections = gsap.utils.toArray("section");

sections.forEach((section, i) => {
  ScrollTrigger.create({
    trigger: section,
    start: "top center",
    end: "bottom center",
    onEnter: () => activateDot(i),
    onEnterBack: () => activateDot(i),
  });
});

function activateDot(index) {
  dots.forEach((dot, i) => {
    gsap.to(dot, {
      scale: i === index ? 1.5 : 1,
      backgroundColor: i <= index ? "#0ae448" : "#666",
      duration: 0.3,
      ease: "power2.out",
    });
  });
}
```

## Progress with labels

```javascript
const progressLabel = document.querySelector(".progress-label");

ScrollTrigger.create({
  trigger: document.body,
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    const progress = Math.round(self.progress * 100);
    progressLabel.textContent = `${progress}% оқылды`;

    gsap.to(".progress-bar", {
      scaleX: self.progress,
      duration: 0.1,
    });
  },
});
```

## Толық мысал

```javascript
class ScrollProgress {
  constructor() {
    this.progressBar = document.querySelector(".scroll-progress-bar");
    this.circularProgress = document.querySelector(".circular-progress");
    this.percentage = document.querySelector(".progress-percentage");
    this.sections = gsap.utils.toArray("section");
    this.dots = document.querySelectorAll(".nav-dot");

    this.init();
  }

  init() {
    this.setupProgressBar();
    this.setupCircularProgress();
    this.setupSectionIndicators();
    this.setupScrollToTop();
  }

  setupProgressBar() {
    gsap.to(this.progressBar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });
  }

  setupCircularProgress() {
    const circle = this.circularProgress;
    const circumference = 283;

    gsap.set(circle, {
      strokeDasharray: circumference,
      strokeDashoffset: circumference,
    });

    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const offset = circumference - self.progress * circumference;
        gsap.to(circle, {
          strokeDashoffset: offset,
          duration: 0.1,
        });
        this.percentage.textContent = Math.round(self.progress * 100) + "%";
      },
    });
  }

  setupSectionIndicators() {
    this.sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => this.setActiveDot(i),
        onEnterBack: () => this.setActiveDot(i),
      });
    });
  }

  setActiveDot(index) {
    this.dots.forEach((dot, i) => {
      const isActive = i === index;
      const isPassed = i < index;

      gsap.to(dot, {
        scale: isActive ? 1.3 : 1,
        backgroundColor: isActive || isPassed ? "#0ae448" : "transparent",
        borderColor: isActive || isPassed ? "#0ae448" : "#666",
        duration: 0.3,
      });
    });
  }

  setupScrollToTop() {
    const scrollTopBtn = document.querySelector(".scroll-to-top");

    ScrollTrigger.create({
      trigger: document.body,
      start: "200px top",
      onEnter: () => {
        gsap.to(scrollTopBtn, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
        });
      },
      onLeaveBack: () => {
        gsap.to(scrollTopBtn, {
          opacity: 0,
          scale: 0.5,
          duration: 0.3,
        });
      },
    });

    scrollTopBtn.addEventListener("click", () => {
      gsap.to(window, {
        scrollTo: 0,
        duration: 1,
        ease: "power2.inOut",
      });
    });
  }
}

new ScrollProgress();
```

## Кеңестер

1. **Position fixed** — Progress bar әрқашан көрінсін
2. **z-index** — Басқа элементтерден жоғары
3. **scrub** — Тегіс анимация үшін
4. **Mobile** — Кішірек индикатор қолданыңыз

## Қорытынды

Scroll progress — пайдаланушыға навигация ыңғайлылығын қосады. Linear, circular, dot progress түрлері бар.
