---
title: Сурет галереясы
description: GSAP арқылы интерактивті сурет галереясы жасау
---

# Сурет галереясы

Сурет галереясы — сайттың визуалды контентін көрсетудің негізгі жолы. GSAP әртүрлі анимациялар қосуға мүмкіндік береді.

## Негізгі grid галерея

```html
<div class="gallery">
  <div class="gallery-item">
    <img src="image1.jpg" alt="Image 1" />
  </div>
  <div class="gallery-item">
    <img src="image2.jpg" alt="Image 2" />
  </div>
  <!-- ... -->
</div>
```

```javascript
// Scroll reveal
gsap.from(".gallery-item", {
  y: 100,
  opacity: 0,
  stagger: {
    grid: [3, 3],
    from: "center",
    amount: 0.5,
  },
  duration: 0.8,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".gallery",
    start: "top 80%",
  },
});
```

## Hover эффект

```javascript
const items = document.querySelectorAll(".gallery-item");

items.forEach((item) => {
  const img = item.querySelector("img");
  const overlay = item.querySelector(".overlay");

  const tl = gsap.timeline({ paused: true });

  tl.to(img, {
    scale: 1.1,
    duration: 0.5,
    ease: "power2.out",
  })
    .to(
      overlay,
      {
        opacity: 1,
        duration: 0.3,
      },
      0
    )
    .from(
      overlay.querySelectorAll("*"),
      {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.3,
      },
      0.1
    );

  item.addEventListener("mouseenter", () => tl.play());
  item.addEventListener("mouseleave", () => tl.reverse());
});
```

## Lightbox галерея

```javascript
class Lightbox {
  constructor() {
    this.overlay = document.querySelector(".lightbox-overlay");
    this.image = document.querySelector(".lightbox-image");
    this.items = document.querySelectorAll(".gallery-item");
    this.currentIndex = 0;

    this.init();
  }

  init() {
    this.items.forEach((item, index) => {
      item.addEventListener("click", () => this.open(index));
    });

    this.overlay.addEventListener("click", () => this.close());
  }

  open(index) {
    this.currentIndex = index;
    const src = this.items[index].querySelector("img").src;
    this.image.src = src;

    gsap
      .timeline()
      .set(this.overlay, { display: "flex" })
      .to(this.overlay, {
        opacity: 1,
        duration: 0.3,
      })
      .from(
        this.image,
        {
          scale: 0.8,
          opacity: 0,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
        "-=0.1"
      );
  }

  close() {
    gsap
      .timeline()
      .to(this.image, {
        scale: 0.8,
        opacity: 0,
        duration: 0.2,
      })
      .to(
        this.overlay,
        {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            gsap.set(this.overlay, { display: "none" });
          },
        },
        "-=0.1"
      );
  }
}

new Lightbox();
```

## FLIP галерея

```javascript
import { Flip } from "gsap/Flip";
gsap.registerPlugin(Flip);

const items = document.querySelectorAll(".gallery-item");
const container = document.querySelector(".gallery");

items.forEach((item) => {
  item.addEventListener("click", () => {
    // Күйді сақтау
    const state = Flip.getState(item);

    // Expanded class toggle
    item.classList.toggle("expanded");

    // FLIP анимация
    Flip.from(state, {
      duration: 0.6,
      ease: "power2.inOut",
      absolute: true,
    });
  });
});
```

## Masonry галерея

```javascript
// Masonry layout анимация
function initMasonry() {
  const items = document.querySelectorAll(".masonry-item");

  // Initial positions
  items.forEach((item, i) => {
    gsap.set(item, {
      y: Math.random() * 100,
      opacity: 0,
    });
  });

  // Reveal animation
  gsap.to(items, {
    y: 0,
    opacity: 1,
    stagger: {
      each: 0.1,
      from: "random",
    },
    duration: 0.8,
    ease: "power3.out",
  });
}

initMasonry();
```

## Carousel галерея

```javascript
class Carousel {
  constructor(container) {
    this.container = container;
    this.track = container.querySelector(".carousel-track");
    this.slides = container.querySelectorAll(".carousel-slide");
    this.prevBtn = container.querySelector(".prev");
    this.nextBtn = container.querySelector(".next");
    this.currentIndex = 0;

    this.init();
  }

  init() {
    this.prevBtn.addEventListener("click", () => this.prev());
    this.nextBtn.addEventListener("click", () => this.next());
  }

  goTo(index) {
    if (index < 0) index = this.slides.length - 1;
    if (index >= this.slides.length) index = 0;

    gsap.to(this.track, {
      x: -index * 100 + "%",
      duration: 0.6,
      ease: "power2.inOut",
    });

    // Scale effect
    gsap.to(this.slides, {
      scale: 0.9,
      opacity: 0.5,
      duration: 0.3,
    });
    gsap.to(this.slides[index], {
      scale: 1,
      opacity: 1,
      duration: 0.3,
    });

    this.currentIndex = index;
  }

  next() {
    this.goTo(this.currentIndex + 1);
  }

  prev() {
    this.goTo(this.currentIndex - 1);
  }
}

new Carousel(document.querySelector(".carousel"));
```

## Infinite scroll галерея

```javascript
class InfiniteGallery {
  constructor() {
    this.container = document.querySelector(".gallery");
    this.items = [];
    this.page = 1;
    this.loading = false;

    this.init();
  }

  init() {
    this.loadMore();
    this.setupObserver();
  }

  setupObserver() {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !this.loading) {
        this.loadMore();
      }
    });

    observer.observe(document.querySelector(".load-trigger"));
  }

  async loadMore() {
    this.loading = true;

    // Simulate fetch
    const newItems = await this.fetchImages();

    newItems.forEach((item) => {
      const el = this.createItem(item);
      this.container.appendChild(el);
      this.items.push(el);
    });

    // Animate new items
    gsap.from(
      newItems.map((_, i) => this.items[this.items.length - newItems.length + i]),
      {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      }
    );

    this.page++;
    this.loading = false;
  }

  createItem(data) {
    const div = document.createElement("div");
    div.className = "gallery-item";
    div.innerHTML = `<img src="${data.url}" alt="${data.title}" />`;
    return div;
  }

  async fetchImages() {
    // API call simulation
    return [
      { url: "image1.jpg", title: "Image 1" },
      { url: "image2.jpg", title: "Image 2" },
    ];
  }
}

new InfiniteGallery();
```

## Filter галерея

```javascript
const filterBtns = document.querySelectorAll(".filter-btn");
const items = document.querySelectorAll(".gallery-item");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    // Active state
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Filter items
    items.forEach((item) => {
      const category = item.dataset.category;
      const show = filter === "all" || category === filter;

      if (show) {
        gsap.to(item, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
        item.style.display = "block";
      } else {
        gsap.to(item, {
          scale: 0.8,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            item.style.display = "none";
          },
        });
      }
    });
  });
});
```

## Drag галерея

```javascript
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

const track = document.querySelector(".drag-track");
const items = document.querySelectorAll(".drag-item");

Draggable.create(track, {
  type: "x",
  bounds: {
    minX: -(track.scrollWidth - track.parentElement.offsetWidth),
    maxX: 0,
  },
  inertia: true,
  edgeResistance: 0.8,
  onDrag: function () {
    // Parallax effect
    items.forEach((item) => {
      const img = item.querySelector("img");
      gsap.to(img, {
        x: this.x * 0.1,
        duration: 0.1,
      });
    });
  },
});
```

## Толық мысал

```javascript
class Gallery {
  constructor(container) {
    this.container = container;
    this.items = container.querySelectorAll(".gallery-item");
    this.lightbox = document.querySelector(".lightbox");

    this.init();
  }

  init() {
    this.setupScrollReveal();
    this.setupHoverEffects();
    this.setupLightbox();
  }

  setupScrollReveal() {
    gsap.from(this.items, {
      y: 100,
      opacity: 0,
      stagger: {
        grid: "auto",
        from: "center",
        amount: 0.8,
      },
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: this.container,
        start: "top 80%",
      },
    });
  }

  setupHoverEffects() {
    this.items.forEach((item) => {
      const img = item.querySelector("img");
      const info = item.querySelector(".info");

      const tl = gsap.timeline({ paused: true });

      tl.to(img, {
        scale: 1.1,
        duration: 0.5,
      }).to(
        info,
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
        },
        0
      );

      gsap.set(info, { y: 20, opacity: 0 });

      item.addEventListener("mouseenter", () => tl.play());
      item.addEventListener("mouseleave", () => tl.reverse());
    });
  }

  setupLightbox() {
    this.items.forEach((item, index) => {
      item.addEventListener("click", () => this.openLightbox(index));
    });

    this.lightbox.addEventListener("click", () => this.closeLightbox());
  }

  openLightbox(index) {
    const img = this.items[index].querySelector("img");
    const lightboxImg = this.lightbox.querySelector("img");
    lightboxImg.src = img.src;

    gsap
      .timeline()
      .set(this.lightbox, { display: "flex" })
      .from(this.lightbox, { opacity: 0, duration: 0.3 })
      .from(
        lightboxImg,
        {
          scale: 0.5,
          duration: 0.5,
          ease: "back.out(1.5)",
        },
        "-=0.1"
      );
  }

  closeLightbox() {
    gsap.to(this.lightbox, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        gsap.set(this.lightbox, { display: "none" });
      },
    });
  }
}

new Gallery(document.querySelector(".gallery"));
```

## Кеңестер

1. **Lazy loading** — Суреттерді lazy load етіңіз
2. **Placeholder** — Жүктелгенше placeholder қойыңыз
3. **Touch** — Mobile swipe қосыңыз
4. **Keyboard** — Arrow keys қолдауын қосыңыз

## Қорытынды

Сурет галереясы — визуалды контенттің негізгі элементі. Grid reveal, FLIP, carousel эффекттері галереяны интерактивті етеді.
