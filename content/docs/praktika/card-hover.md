---
title: Карточка hover эффекті
description: GSAP арқылы интерактивті карточка анимациялары
---

# Карточка hover эффекті

Карточка hover эффекттері — UI-дың маңызды бөлігі. GSAP арқылы кез келген эффектті жасауға болады.

## Негізгі құрылым

```html
<div class="card">
  <div class="card-image">
    <img src="image.jpg" alt="Card" />
  </div>
  <div class="card-content">
    <h3 class="card-title">Тақырып</h3>
    <p class="card-description">Сипаттама мәтіні</p>
    <button class="card-button">Көбірек</button>
  </div>
</div>
```

## Базалық hover

```javascript
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      y: -10,
      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
      duration: 0.3,
      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      y: 0,
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      duration: 0.3,
      ease: "power2.out",
    });
  });
});
```

## Timeline hover

```javascript
cards.forEach((card) => {
  const image = card.querySelector(".card-image img");
  const content = card.querySelector(".card-content");
  const button = card.querySelector(".card-button");

  const tl = gsap.timeline({ paused: true });

  tl.to(card, {
    y: -10,
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    duration: 0.3,
  })
    .to(
      image,
      {
        scale: 1.1,
        duration: 0.5,
      },
      0
    )
    .to(
      content,
      {
        y: -5,
        duration: 0.3,
      },
      0
    )
    .to(
      button,
      {
        backgroundColor: "#0ae448",
        color: "#000",
        duration: 0.2,
      },
      0.1
    );

  card.addEventListener("mouseenter", () => tl.play());
  card.addEventListener("mouseleave", () => tl.reverse());
});
```

## 3D tilt эффект

```javascript
cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  });
});
```

## Shine эффект

```css
.card {
  position: relative;
  overflow: hidden;
}

.card-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
}
```

```javascript
cards.forEach((card) => {
  const shine = card.querySelector(".card-shine");

  card.addEventListener("mouseenter", () => {
    gsap.fromTo(shine, { x: "-100%" }, { x: "300%", duration: 0.6, ease: "power2.out" });
  });
});
```

## Overlay reveal

```css
.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 228, 72, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: circle(0% at 50% 50%);
}
```

```javascript
cards.forEach((card) => {
  const overlay = card.querySelector(".card-overlay");

  card.addEventListener("mouseenter", () => {
    gsap.to(overlay, {
      clipPath: "circle(100% at 50% 50%)",
      duration: 0.5,
      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(overlay, {
      clipPath: "circle(0% at 50% 50%)",
      duration: 0.3,
      ease: "power2.in",
    });
  });
});
```

## Staggered content

```javascript
cards.forEach((card) => {
  const title = card.querySelector(".card-title");
  const desc = card.querySelector(".card-description");
  const btn = card.querySelector(".card-button");

  const tl = gsap.timeline({ paused: true });

  tl.from([title, desc, btn], {
    y: 20,
    opacity: 0,
    stagger: 0.1,
    duration: 0.3,
    ease: "power2.out",
  });

  card.addEventListener("mouseenter", () => tl.play());
  card.addEventListener("mouseleave", () => tl.reverse());
});
```

## Border анимация

```css
.card::before {
  content: "";
  position: absolute;
  inset: 0;
  border: 2px solid transparent;
  border-radius: inherit;
}
```

```javascript
cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      "--border-color": "#0ae448",
      duration: 0.3,
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      "--border-color": "transparent",
      duration: 0.3,
    });
  });
});
```

## Magnetic эффект

```javascript
cards.forEach((card) => {
  const strength = 30;

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(card, {
      x: x / strength,
      y: y / strength,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  });
});
```

## Flip карточка

```html
<div class="card-flip">
  <div class="card-front">Front</div>
  <div class="card-back">Back</div>
</div>
```

```javascript
const flipCards = document.querySelectorAll(".card-flip");

flipCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      rotateY: 180,
      duration: 0.6,
      ease: "power2.inOut",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotateY: 0,
      duration: 0.6,
      ease: "power2.inOut",
    });
  });
});
```

## Expand карточка

```javascript
const expandCards = document.querySelectorAll(".card-expand");

expandCards.forEach((card) => {
  const details = card.querySelector(".card-details");

  gsap.set(details, { height: 0, opacity: 0 });

  card.addEventListener("mouseenter", () => {
    gsap.to(details, {
      height: "auto",
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(details, {
      height: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  });
});
```

## Толық мысал

```javascript
function initCards() {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const image = card.querySelector("img");
    const title = card.querySelector(".title");
    const desc = card.querySelector(".desc");
    const overlay = card.querySelector(".overlay");

    // Create timeline
    const hoverTl = gsap.timeline({ paused: true });

    hoverTl
      .to(card, {
        y: -15,
        boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
        duration: 0.4,
        ease: "power2.out",
      })
      .to(
        image,
        {
          scale: 1.1,
          filter: "brightness(0.7)",
          duration: 0.5,
        },
        0
      )
      .to(
        overlay,
        {
          opacity: 1,
          duration: 0.3,
        },
        0
      )
      .from(
        [title, desc],
        {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.3,
        },
        0.1
      );

    // Event listeners
    card.addEventListener("mouseenter", () => hoverTl.play());
    card.addEventListener("mouseleave", () => hoverTl.reverse());

    // 3D tilt
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 20;
      const y = (e.clientY - rect.top - rect.height / 2) / 20;

      gsap.to(card, {
        rotateY: x,
        rotateX: -y,
        duration: 0.3,
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
      });
    });
  });
}

initCards();
```

## Touch devices

```javascript
// Touch үшін tap қолдану
if ("ontouchstart" in window) {
  cards.forEach((card) => {
    card.addEventListener("touchstart", () => {
      card.classList.toggle("active");
    });
  });
}
```

## Кеңестер

1. **Performance** — transform қолданыңыз (x, y, scale)
2. **Timing** — 0.2-0.4с hover үшін оптималды
3. **Touch** — Mobile үшін tap қосыңыз
4. **Accessibility** — focus күйін ұмытпаңыз

## Қорытынды

Карточка hover эффекттері — UI интерактивтілігінің негізі. 3D tilt, overlay reveal, shine эффекттері карточкаларды тартымды етеді.
