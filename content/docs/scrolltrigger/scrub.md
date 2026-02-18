---
title: Scrub анимация
description: ScrollTrigger scrub - анимацияны скролл позициясымен синхрондау
---

# Scrub анимация

**Scrub** — анимацияны скролл позициясымен тікелей байланыстыру. Скролл жылдамдығы анимация жылдамдығын басқарады.

## Негізгі қолданылуы

```javascript
gsap.to(".box", {
  x: 500,
  rotation: 360,
  scrollTrigger: {
    trigger: ".section",
    start: "top center",
    end: "bottom center",
    scrub: true,
  },
});
```

## scrub мәндері

### scrub: true

Бірден синхрондау (кідіріссіз):

```javascript
scrub: true; // скроллмен 1:1 байланыс
```

### scrub: number

Smooth синхрондау (секундпен):

```javascript
scrub: 0.5; // 0.5 секунд smooth
scrub: 1; // 1 секунд smooth
scrub: 2; // 2 секунд smooth (өте тегіс)
```

Сан неғұрлым үлкен болса, анимация соғұрлым тегіс, бірақ "кешігеді".

## Қалай жұмыс істейді

```
Скролл позициясы:  start ─────────────────── end
                    │                         │
Анимация прогресі: 0% ─────────────────────── 100%
```

- start позициясында: анимация 0%
- end позициясында: анимация 100%
- Ортасында: анимация 50%

## Практикалық мысалдар

### Параллакс эффект

```javascript
gsap.to(".background", {
  y: -200,
  scrollTrigger: {
    trigger: ".section",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});

gsap.to(".foreground", {
  y: -100,
  scrollTrigger: {
    trigger: ".section",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});
```

### Reveal on scroll

```javascript
gsap.fromTo(
  ".reveal-text",
  { clipPath: "inset(0 100% 0 0)" },
  {
    clipPath: "inset(0 0% 0 0)",
    scrollTrigger: {
      trigger: ".reveal-text",
      start: "top 80%",
      end: "top 30%",
      scrub: 1,
    },
  }
);
```

### Image zoom

```javascript
gsap.to(".hero-image", {
  scale: 1.2,
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: 0.5,
  },
});
```

### Progress indicator

```javascript
gsap.to(".progress-bar", {
  scaleX: 1,
  transformOrigin: "left center",
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  },
});
```

### Text animation

```javascript
// Әр сөзді бөлек анимациялау
const words = gsap.utils.toArray(".word");

gsap.to(words, {
  opacity: 1,
  y: 0,
  stagger: 0.1,
  scrollTrigger: {
    trigger: ".text-container",
    start: "top 80%",
    end: "bottom 20%",
    scrub: 1,
  },
});
```

### Timeline + Scrub

```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section",
    start: "top top",
    end: "+=2000",
    scrub: 1,
    pin: true,
  },
});

tl.to(".step1", { opacity: 1, y: 0 })
  .to(".step1", { opacity: 0 })
  .to(".step2", { opacity: 1, y: 0 })
  .to(".step2", { opacity: 0 })
  .to(".step3", { opacity: 1, y: 0 });
```

### Horizontal parallax

```javascript
gsap.to(".parallax-layer", {
  x: -500,
  ease: "none",
  scrollTrigger: {
    trigger: ".parallax-container",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});
```

### Color change

```javascript
gsap.to("body", {
  backgroundColor: "#1a1a2e",
  scrollTrigger: {
    trigger: ".dark-section",
    start: "top center",
    end: "top top",
    scrub: true,
  },
});
```

### SVG path animation

```javascript
gsap.to(".draw-path", {
  strokeDashoffset: 0,
  scrollTrigger: {
    trigger: ".svg-container",
    start: "top center",
    end: "bottom center",
    scrub: 1,
  },
});
```

## scrub vs toggleActions

| scrub                   | toggleActions                      |
| ----------------------- | ---------------------------------- |
| Скроллмен синхрондалады | Trigger нүктелерінде іске қосылады |
| Скролл = прогресс       | Өз жылдамдығымен ойнайды           |
| Интерактивті            | Автоматты                          |

```javascript
// toggleActions — кіргенде ойнайды
gsap.to(".box", {
  x: 200,
  duration: 1,
  scrollTrigger: {
    trigger: ".box",
    toggleActions: "play reverse play reverse",
  },
});

// scrub — скроллмен бірге жылжиды
gsap.to(".box", {
  x: 200,
  scrollTrigger: {
    trigger: ".box",
    scrub: true,
  },
});
```

## snap

Scrub-пен бірге snap қолдану:

```javascript
scrollTrigger: {
  trigger: ".container",
  scrub: 1,
  snap: 1 / 4, // 25% аралықта snap
  // немесе
  snap: {
    snapTo: [0, 0.25, 0.5, 0.75, 1],
    duration: 0.3,
    ease: "power2.inOut",
  },
}
```

## Кеңестер

1. **smooth scrub** — интерактивті анимациялар үшін `scrub: 0.5-1`
2. **precise scrub** — дәл синхрондау үшін `scrub: true`
3. **performance** — күрделі анимацияларда `scrub: true` жылдамырақ

## Келесі қадам

[Easing негіздері](/docs/easing/negizderi) бетіне оралып, анимация қисықтарын зерттеңіз.
