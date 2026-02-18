---
title: Толық лендинг
description: GSAP арқылы толық landing page жасау
---

# Толық лендинг

Бұл бетте барлық GSAP техникаларын біріктіріп, толық landing page жасаймыз.

## Құрылым

```html
<div class="landing">
  <!-- Loader -->
  <div class="loader">...</div>

  <!-- Header -->
  <header class="header">...</header>

  <!-- Hero -->
  <section class="hero">...</section>

  <!-- Features -->
  <section class="features">...</section>

  <!-- About -->
  <section class="about">...</section>

  <!-- Testimonials -->
  <section class="testimonials">...</section>

  <!-- CTA -->
  <section class="cta">...</section>

  <!-- Footer -->
  <footer class="footer">...</footer>

  <!-- Scroll Progress -->
  <div class="scroll-progress">...</div>

  <!-- Scroll To Top -->
  <button class="scroll-to-top">...</button>
</div>
```

## Loader

```javascript
class Loader {
  constructor() {
    this.loader = document.querySelector(".loader");
    this.progress = document.querySelector(".loader-progress");
    this.counter = document.querySelector(".loader-counter");
  }

  async start() {
    const tl = gsap.timeline();

    await tl
      .to(this.progress, {
        width: "100%",
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          const p = Math.round(tl.progress() * 100);
          this.counter.textContent = p + "%";
        },
      })
      .to(this.loader, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      })
      .set(this.loader, { display: "none" });

    return tl;
  }
}
```

## Header

```javascript
class Header {
  constructor() {
    this.header = document.querySelector(".header");
    this.nav = document.querySelector(".nav");
    this.menuBtn = document.querySelector(".menu-btn");
    this.mobileMenu = document.querySelector(".mobile-menu");
  }

  init() {
    this.setupScrollBehavior();
    this.setupMobileMenu();
    this.animateIn();
  }

  animateIn() {
    gsap.from(".header", {
      y: -100,
      duration: 0.6,
      ease: "power3.out",
    });

    gsap.from(".nav-link", {
      y: -20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.4,
      delay: 0.3,
    });
  }

  setupScrollBehavior() {
    let lastScroll = 0;

    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const currentScroll = self.scroll();

        if (currentScroll > lastScroll && currentScroll > 100) {
          gsap.to(this.header, { y: -100, duration: 0.3 });
        } else {
          gsap.to(this.header, { y: 0, duration: 0.3 });
        }

        lastScroll = currentScroll;
      },
    });
  }

  setupMobileMenu() {
    const tl = gsap.timeline({ paused: true });

    tl.to(this.mobileMenu, { x: 0, duration: 0.3 }).from(".mobile-menu-link", {
      x: 30,
      opacity: 0,
      stagger: 0.1,
    });

    let isOpen = false;
    this.menuBtn.addEventListener("click", () => {
      isOpen = !isOpen;
      isOpen ? tl.play() : tl.reverse();
    });
  }
}
```

## Hero

```javascript
class Hero {
  constructor() {
    this.section = document.querySelector(".hero");
    this.title = document.querySelector(".hero-title");
    this.subtitle = document.querySelector(".hero-subtitle");
    this.cta = document.querySelector(".hero-cta");
    this.visual = document.querySelector(".hero-visual");
  }

  init() {
    this.splitTitle();
    this.animate();
    this.setupParallax();
    this.setupMouseEffect();
  }

  splitTitle() {
    const text = this.title.textContent;
    this.title.innerHTML = text
      .split("")
      .map((char) => `<span class="char">${char === " " ? "&nbsp;" : char}</span>`)
      .join("");
  }

  animate() {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.from(".hero-title .char", {
      y: 100,
      opacity: 0,
      rotationX: -90,
      stagger: 0.02,
      duration: 0.8,
      ease: "back.out(1.7)",
    })
      .from(
        this.subtitle,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.3"
      )
      .from(
        this.cta,
        {
          y: 20,
          opacity: 0,
          duration: 0.4,
        },
        "-=0.2"
      )
      .from(
        this.visual,
        {
          scale: 0.8,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.5"
      );
  }

  setupParallax() {
    gsap.to(".hero-bg", {
      y: "30%",
      ease: "none",
      scrollTrigger: {
        trigger: this.section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".hero-content", {
      y: "50%",
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: this.section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  setupMouseEffect() {
    this.section.addEventListener("mousemove", (e) => {
      const rect = this.section.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

      gsap.to(this.visual, {
        rotationY: x * 10,
        rotationX: -y * 10,
        duration: 0.5,
      });
    });
  }
}
```

## Features

```javascript
class Features {
  constructor() {
    this.section = document.querySelector(".features");
    this.cards = document.querySelectorAll(".feature-card");
  }

  init() {
    this.setupScrollAnimation();
    this.setupHoverEffects();
  }

  setupScrollAnimation() {
    gsap.from(".features-title", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: this.section,
        start: "top 80%",
      },
    });

    gsap.from(this.cards, {
      y: 100,
      opacity: 0,
      stagger: {
        grid: [2, 3],
        from: "center",
        amount: 0.5,
      },
      duration: 0.8,
      scrollTrigger: {
        trigger: this.section,
        start: "top 70%",
      },
    });
  }

  setupHoverEffects() {
    this.cards.forEach((card) => {
      const icon = card.querySelector(".feature-icon");
      const title = card.querySelector(".feature-title");

      const tl = gsap.timeline({ paused: true });

      tl.to(card, {
        y: -10,
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        duration: 0.3,
      })
        .to(
          icon,
          {
            scale: 1.1,
            rotation: 5,
            duration: 0.3,
          },
          0
        )
        .to(
          title,
          {
            color: "#0ae448",
            duration: 0.2,
          },
          0
        );

      card.addEventListener("mouseenter", () => tl.play());
      card.addEventListener("mouseleave", () => tl.reverse());
    });
  }
}
```

## Testimonials

```javascript
class Testimonials {
  constructor() {
    this.section = document.querySelector(".testimonials");
    this.cards = document.querySelectorAll(".testimonial-card");
    this.currentIndex = 0;
  }

  init() {
    this.setupCarousel();
    this.setupScrollAnimation();
  }

  setupCarousel() {
    setInterval(() => this.next(), 5000);
  }

  next() {
    gsap.to(this.cards[this.currentIndex], {
      opacity: 0,
      x: -50,
      duration: 0.4,
    });

    this.currentIndex = (this.currentIndex + 1) % this.cards.length;

    gsap.fromTo(
      this.cards[this.currentIndex],
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.4 }
    );
  }

  setupScrollAnimation() {
    gsap.from(".testimonials-title", {
      y: 50,
      opacity: 0,
      scrollTrigger: {
        trigger: this.section,
        start: "top 80%",
      },
    });
  }
}
```

## CTA Section

```javascript
class CTA {
  constructor() {
    this.section = document.querySelector(".cta");
    this.button = document.querySelector(".cta-button");
  }

  init() {
    this.setupAnimation();
    this.setupHover();
  }

  setupAnimation() {
    gsap.from(".cta-content", {
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: this.section,
        start: "top 70%",
      },
    });
  }

  setupHover() {
    this.button.addEventListener("mouseenter", () => {
      gsap.to(this.button, {
        scale: 1.05,
        duration: 0.3,
      });
    });

    this.button.addEventListener("mouseleave", () => {
      gsap.to(this.button, {
        scale: 1,
        duration: 0.3,
      });
    });
  }
}
```

## Scroll Progress & To Top

```javascript
class ScrollUtils {
  constructor() {
    this.progressBar = document.querySelector(".scroll-progress-bar");
    this.scrollToTopBtn = document.querySelector(".scroll-to-top");
  }

  init() {
    this.setupProgressBar();
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
        scrub: true,
      },
    });
  }

  setupScrollToTop() {
    ScrollTrigger.create({
      trigger: document.body,
      start: "500px top",
      onEnter: () => {
        gsap.to(this.scrollToTopBtn, { opacity: 1, scale: 1, duration: 0.3 });
      },
      onLeaveBack: () => {
        gsap.to(this.scrollToTopBtn, { opacity: 0, scale: 0.5, duration: 0.3 });
      },
    });

    this.scrollToTopBtn.addEventListener("click", () => {
      gsap.to(window, {
        scrollTo: 0,
        duration: 1,
        ease: "power2.inOut",
      });
    });
  }
}
```

## Main Initialization

```javascript
// Main App
class LandingPage {
  constructor() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    this.loader = new Loader();
    this.header = new Header();
    this.hero = new Hero();
    this.features = new Features();
    this.testimonials = new Testimonials();
    this.cta = new CTA();
    this.scrollUtils = new ScrollUtils();
  }

  async init() {
    // Wait for loader
    await this.loader.start();

    // Initialize components
    this.header.init();
    this.hero.init();
    this.features.init();
    this.testimonials.init();
    this.cta.init();
    this.scrollUtils.init();

    // Smooth scroll for anchors
    this.setupSmoothScroll();
  }

  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));

        gsap.to(window, {
          scrollTo: target,
          duration: 1,
          ease: "power2.inOut",
        });
      });
    });
  }
}

// Start
window.addEventListener("load", () => {
  const app = new LandingPage();
  app.init();
});
```

## Responsive

```javascript
const mm = gsap.matchMedia();

mm.add("(max-width: 768px)", () => {
  // Mobile-specific animations
  gsap.from(".hero-title", { y: 30, duration: 0.6 });
});

mm.add("(min-width: 769px)", () => {
  // Desktop-specific animations
  gsap.from(".hero-title", { x: -100, duration: 1 });
});
```

## Қорытынды

Толық landing page — барлық GSAP техникаларын біріктіреді: loader, scroll animations, parallax, hover effects, progress indicators. Модульді архитектура кодты басқаруға жеңіл етеді.
