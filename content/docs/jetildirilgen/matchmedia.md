---
title: gsap.matchMedia()
description: Медиа сұраныстар негізінде responsive анимациялар жасау
---

# gsap.matchMedia()

`gsap.matchMedia()` — CSS медиа сұраныстары негізінде анимацияларды автоматты басқару.

## Негізгі қолдану

```javascript
const mm = gsap.matchMedia();

mm.add("(min-width: 1024px)", () => {
  // Desktop анимациялар
  gsap.to(".box", { x: 500 });
});

mm.add("(max-width: 1023px)", () => {
  // Mobile анимациялар
  gsap.to(".box", { x: 100 });
});
```

## Автоматты cleanup

Медиа сұранысы өзгергенде:

1. Алдыңғы анимациялар автоматты жойылады
2. Жаңа анимациялар қосылады
3. Элементтер бастапқы күйге қайтарылады

```javascript
mm.add("(min-width: 768px)", () => {
  gsap.to(".box", { x: 200, rotation: 45 });
  // Экран 768px-тан кіші болғанда автоматты cleanup
});
```

## Бірнеше шарт

### Объект синтаксисі

```javascript
mm.add(
  {
    isDesktop: "(min-width: 1024px)",
    isTablet: "(min-width: 768px) and (max-width: 1023px)",
    isMobile: "(max-width: 767px)",
    prefersReducedMotion: "(prefers-reduced-motion: reduce)",
  },
  (context) => {
    const { isDesktop, isTablet, isMobile, prefersReducedMotion } = context.conditions;

    if (prefersReducedMotion) {
      // Анимациясыз нұсқа
      return;
    }

    if (isDesktop) {
      gsap.to(".hero", { x: 300, scale: 1.2 });
    } else if (isTablet) {
      gsap.to(".hero", { x: 150, scale: 1.1 });
    } else {
      gsap.to(".hero", { y: 50 });
    }
  }
);
```

### all шарты

```javascript
mm.add(
  {
    isLarge: "(min-width: 1024px)",
    isPortrait: "(orientation: portrait)",
    all: true, // Барлығы сәйкес келуі керек
  },
  (context) => {
    // Тек үлкен экран + portrait
    gsap.to(".element", { rotation: 90 });
  }
);
```

## Cleanup функциясы

Қосымша cleanup логикасы:

```javascript
mm.add("(min-width: 768px)", () => {
  const handleClick = () => {
    gsap.to(".box", { x: "+=50" });
  };

  document.addEventListener("click", handleClick);

  // Custom cleanup
  return () => {
    document.removeEventListener("click", handleClick);
  };
});
```

## ScrollTrigger-мен

```javascript
mm.add("(min-width: 768px)", () => {
  // ScrollTrigger автоматты cleanup
  gsap.to(".section", {
    x: 500,
    scrollTrigger: {
      trigger: ".section",
      start: "top center",
      end: "bottom center",
      scrub: true,
      markers: true,
    },
  });
});
```

## prefers-reduced-motion

Accessibility үшін:

```javascript
mm.add("(prefers-reduced-motion: no-preference)", () => {
  // Толық анимациялар
  gsap.to(".element", {
    x: 100,
    rotation: 360,
    duration: 2,
  });
});

mm.add("(prefers-reduced-motion: reduce)", () => {
  // Жеңілдетілген немесе анимациясыз
  gsap.set(".element", { x: 100 });
});
```

## Практикалық мысалдар

### Responsive навигация

```javascript
const mm = gsap.matchMedia();

mm.add("(min-width: 1024px)", () => {
  // Desktop: dropdown меню
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".trigger");
    const content = dropdown.querySelector(".content");

    const tl = gsap.timeline({ paused: true });
    tl.from(content, {
      height: 0,
      opacity: 0,
      duration: 0.3,
    });

    trigger.addEventListener("mouseenter", () => tl.play());
    trigger.addEventListener("mouseleave", () => tl.reverse());
  });
});

mm.add("(max-width: 1023px)", () => {
  // Mobile: slide меню
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");

  const tl = gsap.timeline({ paused: true });
  tl.to(nav, { x: 0, duration: 0.3 }).from(".nav-item", {
    x: -30,
    opacity: 0,
    stagger: 0.1,
  });

  let isOpen = false;
  menuBtn.addEventListener("click", () => {
    isOpen ? tl.reverse() : tl.play();
    isOpen = !isOpen;
  });
});
```

### Responsive hero

```javascript
mm.add(
  {
    isDesktop: "(min-width: 1024px)",
    isMobile: "(max-width: 1023px)",
  },
  (context) => {
    const { isDesktop } = context.conditions;

    const tl = gsap.timeline();

    if (isDesktop) {
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
          "-=0.7"
        )
        .from(
          ".hero-cta",
          {
            y: 50,
            opacity: 0,
          },
          "-=0.3"
        );
    } else {
      tl.from(".hero-title", {
        y: 30,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          ".hero-image",
          {
            scale: 0.95,
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
    }
  }
);
```

### Responsive scroll анимация

```javascript
mm.add("(min-width: 768px)", () => {
  // Horizontal scroll (desktop)
  const sections = gsap.utils.toArray(".panel");

  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".container",
      pin: true,
      scrub: 1,
      end: () => "+=" + document.querySelector(".container").offsetWidth,
    },
  });
});

mm.add("(max-width: 767px)", () => {
  // Vertical scroll (mobile)
  gsap.utils.toArray(".panel").forEach((panel) => {
    gsap.from(panel, {
      y: 50,
      opacity: 0,
      scrollTrigger: {
        trigger: panel,
        start: "top 80%",
      },
    });
  });
});
```

## revert()

Барлық анимацияларды жою:

```javascript
const mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {
  gsap.to(".box", { x: 100 });
});

// Барлығын жою
mm.revert();
```

## kill()

matchMedia instance-ты жою:

```javascript
// Жою, бірақ ағымдағы күй қалады
mm.kill();
```

## scope параметрі

```javascript
const mm = gsap.matchMedia();

mm.add(
  "(min-width: 768px)",
  () => {
    // ".box" тек #section ішінен ізделеді
    gsap.to(".box", { x: 100 });
  },
  "#section"
); // scope
```

## Қашан қолдану

| Жағдай                   | matchMedia         |
| ------------------------ | ------------------ |
| Breakpoint-қа байланысты | Иә                 |
| prefers-reduced-motion   | Иә                 |
| Orientation              | Иә                 |
| ScrollTrigger responsive | Иә                 |
| Қарапайым resize         | Жоқ (функция мәні) |

## Кеңестер

1. **Cleanup** — Қосымша listener-лерді return-да жойыңыз
2. **Accessibility** — prefers-reduced-motion қолданыңыз
3. **ScrollTrigger** — mm ішінде жасаңыз, auto-cleanup
4. **conditions** — Объект синтаксисі оқуға жеңіл

## Қорытынды

`gsap.matchMedia()` — responsive анимациялардың стандарты. CSS медиа сұраныстарының қуатын GSAP-пен біріктіреді және автоматты cleanup арқылы memory leak-терді болдырмайды.
