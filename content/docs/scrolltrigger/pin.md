---
title: Pin эффектісі
description: ScrollTrigger арқылы элементтерді скролл кезінде бекіту
---

# Pin эффектісі

**Pin** — элементті скролл кезінде экранда бекіту. Бұл параллакс, sticky секциялар және интерактивті storytelling үшін қолданылады.

## Негізгі қолданылуы

```javascript
gsap.to(".box", {
  x: 200,
  scrollTrigger: {
    trigger: ".section",
    pin: true, // элементті бекіту
    start: "top top", // секция жоғарысы экран жоғарысында
    end: "+=500", // 500px скролл бойы
  },
});
```

## pin параметрлері

### pin: true

Trigger элементін бекіту:

```javascript
scrollTrigger: {
  trigger: ".section",
  pin: true, // .section бекітіледі
}
```

### pin: element

Басқа элементті бекіту:

```javascript
scrollTrigger: {
  trigger: ".section",
  pin: ".sidebar", // .sidebar бекітіледі
}
```

## pinSpacing

Бекіту кезінде бос орын қосу:

```javascript
scrollTrigger: {
  trigger: ".section",
  pin: true,
  pinSpacing: true,   // әдепкі: true
  // pinSpacing: false, // бос орын қоспау
  // pinSpacing: "margin", // margin арқылы
}
```

### pinSpacing: false қашан қолдану

```javascript
// Overlay эффекті үшін
scrollTrigger: {
  trigger: ".overlay-section",
  pin: true,
  pinSpacing: false, // келесі секция асты жабады
}
```

## anticipatePin

Жылдам скролл кезінде "секіруді" болдырмау:

```javascript
scrollTrigger: {
  trigger: ".section",
  pin: true,
  anticipatePin: 1, // 1 = толық anticipation
}
```

## Практикалық мысалдар

### Sticky секция

```javascript
ScrollTrigger.create({
  trigger: ".sticky-section",
  pin: true,
  start: "top top",
  end: "+=1000",
});
```

### Анимация + Pin

```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section",
    pin: true,
    start: "top top",
    end: "+=2000",
    scrub: 1,
  },
});

tl.to(".title", { y: -100, opacity: 0 })
  .to(".content", { y: 0, opacity: 1 })
  .to(".image", { scale: 1.2 });
```

### Horizontal scroll

```javascript
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
```

### Cards stack

```javascript
gsap.utils.toArray(".card").forEach((card, i) => {
  ScrollTrigger.create({
    trigger: card,
    start: "top 10%",
    end: "bottom 10%",
    pin: true,
    pinSpacing: false,
  });
});
```

### Storytelling секция

```javascript
const sections = gsap.utils.toArray(".story-section");

sections.forEach((section, i) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      pin: true,
      start: "top top",
      end: "+=100%",
      scrub: 1,
    },
  });

  // Секция ішіндегі анимациялар
  tl.from(section.querySelector(".title"), {
    y: 50,
    opacity: 0,
  })
    .from(section.querySelector(".content"), {
      y: 30,
      opacity: 0,
    })
    .to(section, {
      opacity: 0,
    });
});
```

### Sidebar pin

```javascript
ScrollTrigger.create({
  trigger: ".main-content",
  start: "top top",
  end: "bottom bottom",
  pin: ".sidebar",
  pinSpacing: false,
});
```

### Progress bar

```javascript
gsap.to(".progress-bar", {
  width: "100%",
  ease: "none",
  scrollTrigger: {
    trigger: ".article",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  },
});
```

## Pin + Scrub мысалы

```javascript
// Параллакс Hero
gsap.to(".hero-image", {
  y: 200,
  scrollTrigger: {
    trigger: ".hero",
    pin: true,
    start: "top top",
    end: "+=500",
    scrub: 1,
  },
});

// Мәтін fade out
gsap.to(".hero-text", {
  opacity: 0,
  y: -50,
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "+=300",
    scrub: 1,
  },
});
```

## Ескертулер

### Pin ережелері

1. Pin-ленген элементтің ата-анасында `overflow: hidden` болмауы керек
2. `position: fixed` элементтер pin-ленбейді
3. Pin кезінде элемент wrapper-ға оралады

### Debug

```javascript
scrollTrigger: {
  trigger: ".section",
  pin: true,
  markers: true, // позицияларды көру
}
```

### Refresh

Динамикалық контент болса:

```javascript
// Контент өзгергеннен кейін
ScrollTrigger.refresh();
```

## Келесі қадам

[Scrub анимация](/docs/scrolltrigger/scrub) — скролл позициясымен синхрондалған анимация.
