---
title: Responsive анимациялар
description: GSAP арқылы экран өлшеміне бейімделетін анимациялар жасау
---

# Responsive анимациялар

Responsive анимациялар — әртүрлі экран өлшемдерінде дұрыс жұмыс істейтін анимациялар.

## Негізгі тәсілдер

### 1. gsap.matchMedia()

Ең қуатты тәсіл — медиа сұраныстар негізінде:

```javascript
const mm = gsap.matchMedia();

mm.add("(min-width: 1024px)", () => {
  // Desktop анимациялар
  gsap.to(".box", { x: 500, duration: 1 });
});

mm.add("(max-width: 1023px)", () => {
  // Mobile анимациялар
  gsap.to(".box", { x: 100, duration: 1 });
});
```

### 2. Функция мәндері

Динамикалық мәндер:

```javascript
gsap.to(".box", {
  x: () => window.innerWidth / 2,
  duration: 1,
});
```

### 3. CSS айнымалылары

```css
:root {
  --move-x: 500px;
}

@media (max-width: 768px) {
  :root {
    --move-x: 100px;
  }
}
```

```javascript
gsap.to(".box", {
  x: "var(--move-x)",
  duration: 1,
});
```

## gsap.matchMedia() толық

### Бірнеше breakpoint

```javascript
const mm = gsap.matchMedia();

mm.add(
  {
    isDesktop: "(min-width: 1024px)",
    isTablet: "(min-width: 768px) and (max-width: 1023px)",
    isMobile: "(max-width: 767px)",
  },
  (context) => {
    const { isDesktop, isTablet, isMobile } = context.conditions;

    if (isDesktop) {
      gsap.to(".box", { x: 500, scale: 1.5 });
    } else if (isTablet) {
      gsap.to(".box", { x: 300, scale: 1.2 });
    } else if (isMobile) {
      gsap.to(".box", { x: 100, scale: 1 });
    }
  }
);
```

### Cleanup функциясы

```javascript
mm.add("(min-width: 1024px)", () => {
  const tl = gsap.timeline();
  tl.to(".box", { x: 500 });

  // Breakpoint өзгергенде cleanup
  return () => {
    tl.kill();
  };
});
```

### ScrollTrigger-мен

```javascript
mm.add("(min-width: 768px)", () => {
  gsap.to(".section", {
    x: 500,
    scrollTrigger: {
      trigger: ".section",
      start: "top center",
      end: "bottom center",
      scrub: true,
    },
  });

  // ScrollTrigger автоматты түрде жойылады
});
```

## Функция мәндері

### Қарапайым мысал

```javascript
gsap.to(".box", {
  x: () => window.innerWidth * 0.8,
  y: () => window.innerHeight / 2,
  duration: 1,
});
```

### invalidateOnRefresh

Resize кезінде мәндерді қайта есептеу:

```javascript
gsap.to(".box", {
  x: () => document.querySelector(".container").offsetWidth,
  scrollTrigger: {
    trigger: ".box",
    invalidateOnRefresh: true, // Resize кезінде қайта есептеу
  },
});
```

### Stagger-мен

```javascript
gsap.to(".box", {
  x: (i, el) => {
    const isMobile = window.innerWidth < 768;
    return isMobile ? 50 * i : 100 * i;
  },
  stagger: 0.1,
});
```

## Relative мәндер

```javascript
// Пайызбен (элемент өлшеміне қатысты)
gsap.to(".box", {
  xPercent: 100, // Өз ені бойынша жылжу
  yPercent: 50,
});

// "vw" және "vh"
gsap.to(".box", {
  x: "50vw",
  y: "25vh",
});
```

## Практикалық мысалдар

### Responsive навигация

```javascript
const mm = gsap.matchMedia();

mm.add("(min-width: 1024px)", () => {
  // Desktop: hover эффекті
  const links = document.querySelectorAll(".nav-link");

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      gsap.to(link, { y: -5, duration: 0.2 });
    });
    link.addEventListener("mouseleave", () => {
      gsap.to(link, { y: 0, duration: 0.2 });
    });
  });
});

mm.add("(max-width: 1023px)", () => {
  // Mobile: slide-in меню
  const menuTl = gsap.timeline({ paused: true });

  menuTl
    .from(".mobile-nav", {
      xPercent: -100,
      duration: 0.3,
    })
    .from(".mobile-nav-link", {
      x: -30,
      opacity: 0,
      stagger: 0.1,
    });

  document.querySelector(".menu-toggle").addEventListener("click", () => {
    menuTl.play();
  });
});
```

### Responsive hero секция

```javascript
const mm = gsap.matchMedia();

mm.add("(min-width: 1024px)", () => {
  const tl = gsap.timeline();

  tl.from(".hero-title", {
    x: -100,
    opacity: 0,
    duration: 1,
  })
    .from(
      ".hero-image",
      {
        x: 100,
        opacity: 0,
        duration: 1,
      },
      "-=0.5"
    )
    .from(
      ".hero-cta",
      {
        y: 50,
        opacity: 0,
      },
      "-=0.3"
    );
});

mm.add("(max-width: 1023px)", () => {
  const tl = gsap.timeline();

  tl.from(".hero-title", {
    y: 30,
    opacity: 0,
  })
    .from(
      ".hero-image",
      {
        scale: 0.9,
        opacity: 0,
      },
      "-=0.3"
    )
    .from(
      ".hero-cta",
      {
        y: 20,
        opacity: 0,
      },
      "-=0.2"
    );
});
```

### Responsive карточкалар

```javascript
const mm = gsap.matchMedia();

mm.add("(min-width: 1024px)", () => {
  // Desktop: hover эффект
  const cards = gsap.utils.toArray(".card");

  cards.forEach((card) => {
    const hoverTl = gsap.timeline({ paused: true });

    hoverTl.to(card, {
      y: -10,
      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
      duration: 0.3,
    });

    card.addEventListener("mouseenter", () => hoverTl.play());
    card.addEventListener("mouseleave", () => hoverTl.reverse());
  });
});

mm.add("(max-width: 1023px)", () => {
  // Mobile: scroll reveal
  gsap.from(".card", {
    y: 50,
    opacity: 0,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".cards-container",
      start: "top 80%",
    },
  });
});
```

## Resize өңдеу

### debounce қолдану

```javascript
let resizeTimeout;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Анимацияларды жаңарту
    ScrollTrigger.refresh();
  }, 250);
});
```

### ResizeObserver

```javascript
const ro = new ResizeObserver((entries) => {
  for (const entry of entries) {
    // Элемент өлшемі өзгерді
    gsap.to(".box", {
      width: entry.contentRect.width * 0.5,
    });
  }
});

ro.observe(document.querySelector(".container"));
```

## Кеңестер

1. **matchMedia** — Breakpoint-қа байланысты логика үшін
2. **Функция мәндері** — Динамикалық есептеулер үшін
3. **invalidateOnRefresh** — ScrollTrigger resize үшін
4. **Relative мәндер** — vw, vh, % қолданыңыз
5. **Cleanup** — Breakpoint өзгергенде анимацияларды жойыңыз

## Қорытынды

Responsive анимациялар — заманауи веб-дизайнның маңызды бөлігі. gsap.matchMedia() негізгі құрал, ал функция мәндері мен relative бірліктер қосымша икемділік береді.
