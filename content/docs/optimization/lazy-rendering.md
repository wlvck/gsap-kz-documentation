---
title: Lazy rendering
description: GSAP анимацияларын lazy render ету арқылы оптимизация
---

# Lazy rendering

Lazy rendering — көрінбейтін элементтерді анимацияламау және ресурстарды үнемдеу.

## IntersectionObserver

### Негізгі қолдану

```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Элемент көрінді — анимацияны бастау
        gsap.from(entry.target, {
          y: 50,
          opacity: 0,
          duration: 0.8,
        });

        // Қайта бақыламау
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2, // 20% көрінгенде
    rootMargin: "50px", // 50px алдын ала
  }
);

// Барлық элементтерді бақылау
document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});
```

### Конфигурация

```javascript
const observerOptions = {
  root: null, // viewport
  rootMargin: "0px 0px -100px 0px", // Төменнен 100px ішке
  threshold: [0, 0.25, 0.5, 0.75, 1], // Бірнеше threshold
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const ratio = entry.intersectionRatio;

    // Көріну пайызына байланысты
    gsap.to(entry.target, {
      opacity: ratio,
      y: (1 - ratio) * 50,
    });
  });
}, observerOptions);
```

## ScrollTrigger lazy

### once: true

```javascript
// Бір рет анимацияланып, ScrollTrigger жойылады
gsap.from(".section", {
  y: 100,
  opacity: 0,
  scrollTrigger: {
    trigger: ".section",
    start: "top 80%",
    once: true, // Lazy — бір рет
  },
});
```

### toggleActions

```javascript
// Керек кезде ғана анимациялау
gsap.to(".element", {
  x: 100,
  scrollTrigger: {
    trigger: ".element",
    start: "top bottom",
    end: "bottom top",
    toggleActions: "play none none reverse",
    // Көрінгенде play, кеткенде reverse
  },
});
```

## LazyLoad class

```javascript
class LazyAnimations {
  constructor(selector, options = {}) {
    this.elements = document.querySelectorAll(selector);
    this.options = {
      threshold: 0.2,
      rootMargin: "50px",
      ...options,
    };
    this.animations = new Map();

    this.init();
  }

  init() {
    this.observer = new IntersectionObserver(this.onIntersect.bind(this), this.options);

    this.elements.forEach((el) => {
      this.observer.observe(el);
    });
  }

  onIntersect(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.animate(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }

  animate(element) {
    const type = element.dataset.animation || "fadeIn";

    switch (type) {
      case "fadeIn":
        gsap.from(element, { opacity: 0, duration: 0.6 });
        break;
      case "slideUp":
        gsap.from(element, { y: 50, opacity: 0, duration: 0.6 });
        break;
      case "scaleIn":
        gsap.from(element, { scale: 0.9, opacity: 0, duration: 0.6 });
        break;
    }
  }

  destroy() {
    this.observer.disconnect();
  }
}

// Қолдану
const lazyAnims = new LazyAnimations("[data-animation]");
```

## Image lazy loading

```javascript
class LazyImages {
  constructor() {
    this.images = document.querySelectorAll("img[data-src]");
    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "100px",
      }
    );

    this.images.forEach((img) => observer.observe(img));
  }

  loadImage(img) {
    const src = img.dataset.src;

    // Placeholder fade out
    gsap.to(img, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        img.src = src;
        img.onload = () => {
          gsap.to(img, {
            opacity: 1,
            duration: 0.4,
          });
        };
      },
    });
  }
}

new LazyImages();
```

## Conditional rendering

```javascript
// Mobile-да анимация жоқ
const isMobile = window.matchMedia("(max-width: 768px)").matches;

if (!isMobile) {
  // Desktop-та ғана анимация
  gsap.from(".heavy-animation", {
    x: 100,
    rotation: 360,
    scale: 1.5,
    duration: 2,
  });
} else {
  // Mobile-да қарапайым fade
  gsap.from(".heavy-animation", {
    opacity: 0,
    duration: 0.5,
  });
}
```

## Virtual scrolling

```javascript
// Көрінетін элементтерді ғана render
class VirtualList {
  constructor(container, itemHeight, totalItems) {
    this.container = container;
    this.itemHeight = itemHeight;
    this.totalItems = totalItems;
    this.visibleItems = new Set();

    this.init();
  }

  init() {
    this.container.style.height = `${this.itemHeight * this.totalItems}px`;

    window.addEventListener("scroll", () => this.render());
    this.render();
  }

  render() {
    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;

    const startIndex = Math.floor(scrollTop / this.itemHeight);
    const endIndex = Math.ceil((scrollTop + viewportHeight) / this.itemHeight);

    // Көрінбейтіндерді жасыру
    this.visibleItems.forEach((index) => {
      if (index < startIndex || index > endIndex) {
        this.hideItem(index);
        this.visibleItems.delete(index);
      }
    });

    // Көрінетіндерді көрсету
    for (let i = startIndex; i <= endIndex; i++) {
      if (!this.visibleItems.has(i)) {
        this.showItem(i);
        this.visibleItems.add(i);
      }
    }
  }

  showItem(index) {
    // Item render + анимация
    const item = this.createItem(index);
    gsap.from(item, { opacity: 0, y: 20, duration: 0.3 });
  }

  hideItem(index) {
    // Item remove
    const item = this.container.querySelector(`[data-index="${index}"]`);
    item?.remove();
  }

  createItem(index) {
    const item = document.createElement("div");
    item.dataset.index = index;
    item.style.top = `${index * this.itemHeight}px`;
    this.container.appendChild(item);
    return item;
  }
}
```

## Priority loading

```javascript
// Above-the-fold контент бірінші
function initAnimations() {
  // 1. Critical — бірден
  gsap.from(".hero-title", { y: 50, opacity: 0, duration: 0.8 });

  // 2. Above-fold — кішкене кешіктіру
  gsap.from(".hero-cta", {
    y: 20,
    opacity: 0,
    duration: 0.5,
    delay: 0.3,
  });

  // 3. Below-fold — lazy
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        gsap.from(entry.target, {
          y: 50,
          opacity: 0,
          duration: 0.6,
        });
        observer.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll(".below-fold").forEach((el) => {
    observer.observe(el);
  });
}
```

## Кеңестер

1. **IntersectionObserver** — Native lazy loading үшін
2. **once: true** — ScrollTrigger-де қолданыңыз
3. **unobserve** — Анимациядан кейін бақылауды тоқтатыңыз
4. **rootMargin** — Алдын ала жүктеу үшін қолданыңыз
5. **Mobile** — Күрделі анимацияларды азайтыңыз

## Қорытынды

Lazy rendering — performance оптимизациясының маңызды бөлігі. Көрінбейтін элементтерді анимацияламау ресурстарды үнемдейді.
