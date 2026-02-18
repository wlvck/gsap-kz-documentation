---
title: will-change қасиеті
description: CSS will-change қасиетін GSAP-пен дұрыс қолдану
---

# will-change қасиеті

`will-change` — браузерге элементтің қандай қасиеттері өзгеретінін алдын ала айтады. Бұл GPU оптимизациясына көмектеседі.

## Негізгі қолдану

### CSS арқылы

```css
.animated-element {
  will-change: transform;
}

/* Бірнеше қасиет */
.complex-animation {
  will-change: transform, opacity;
}
```

### JavaScript арқылы

```javascript
// GSAP set арқылы
gsap.set(".box", {
  willChange: "transform",
});

// Native JS
element.style.willChange = "transform";
```

## Қашан қолдану керек

### Қолданыңыз

- Жиі қайталанатын анимациялар
- Scroll-мен байланысты анимациялар
- Hover эффекттері
- Көп элементті stagger анимациялар

### Қолданбаңыз

- Бір реттік анимациялар
- Беттегі барлық элементтерге
- Статикалық элементтерге

## Дұрыс pattern

### Анимация алдында қосу, кейін алып тастау

```javascript
// Hover үшін
const box = document.querySelector(".box");

box.addEventListener("mouseenter", () => {
  gsap.set(box, { willChange: "transform" });
  gsap.to(box, {
    scale: 1.1,
    duration: 0.3,
    onComplete: () => {
      gsap.set(box, { willChange: "auto" });
    },
  });
});
```

### ScrollTrigger-мен

```javascript
gsap.to(".section", {
  x: 100,
  scrollTrigger: {
    trigger: ".section",
    start: "top center",
    end: "bottom center",
    onEnter: () => {
      gsap.set(".section", { willChange: "transform" });
    },
    onLeave: () => {
      gsap.set(".section", { willChange: "auto" });
    },
    onEnterBack: () => {
      gsap.set(".section", { willChange: "transform" });
    },
    onLeaveBack: () => {
      gsap.set(".section", { willChange: "auto" });
    },
  },
});
```

## Мәселелер

### Memory leak

```javascript
// Нашар — will-change әрқашан қосулы
gsap.set(".all-elements", { willChange: "transform" });

// Бұл көп жады қолданады!
```

### Z-index мәселелері

```css
/* will-change жаңа stacking context жасайды */
.element {
  will-change: transform;
  /* z-index күтпеген әрекет етуі мүмкін */
}
```

## Автоматты басқару

```javascript
class WillChangeManager {
  constructor(elements) {
    this.elements = gsap.utils.toArray(elements);
  }

  enable() {
    gsap.set(this.elements, { willChange: "transform" });
  }

  disable() {
    gsap.set(this.elements, { willChange: "auto" });
  }

  animate(vars) {
    this.enable();

    return gsap.to(this.elements, {
      ...vars,
      onComplete: () => {
        this.disable();
        vars.onComplete?.();
      },
    });
  }
}

// Қолдану
const manager = new WillChangeManager(".box");
manager.animate({ x: 100, duration: 1 });
```

## Практикалық мысалдар

### Carousel

```javascript
class Carousel {
  constructor(track) {
    this.track = track;
    this.slides = track.querySelectorAll(".slide");
  }

  beforeSlide() {
    gsap.set([this.track, this.slides], {
      willChange: "transform",
    });
  }

  afterSlide() {
    gsap.set([this.track, this.slides], {
      willChange: "auto",
    });
  }

  goTo(index) {
    this.beforeSlide();

    gsap.to(this.track, {
      x: -index * 100 + "%",
      duration: 0.5,
      onComplete: () => this.afterSlide(),
    });
  }
}
```

### Modal

```javascript
function openModal(modal) {
  gsap.set(modal, { willChange: "transform, opacity" });

  gsap
    .timeline()
    .set(modal, { display: "flex" })
    .from(modal, { opacity: 0, duration: 0.3 })
    .from(".modal-content", {
      scale: 0.9,
      duration: 0.3,
      onComplete: () => {
        gsap.set(modal, { willChange: "auto" });
      },
    });
}
```

### Infinite animation

```javascript
// Шексіз анимация — will-change қосулы қалады
const spinner = document.querySelector(".spinner");
gsap.set(spinner, { willChange: "transform" });

gsap.to(spinner, {
  rotation: 360,
  duration: 1,
  ease: "none",
  repeat: -1,
});

// Cleanup функциясы
function stopSpinner() {
  gsap.killTweensOf(spinner);
  gsap.set(spinner, { willChange: "auto" });
}
```

## force3D vs will-change

```javascript
// force3D — translate3d қолданады
gsap.to(".box", {
  x: 100,
  force3D: true, // translate3d(100px, 0, 0)
});

// will-change — браузерге hint береді
gsap.set(".box", { willChange: "transform" });
gsap.to(".box", { x: 100 });

// Екеуін бірге қолдануға болады
gsap.set(".box", { willChange: "transform" });
gsap.to(".box", { x: 100, force3D: true });
```

## Browser DevTools

```javascript
// Chrome DevTools > Rendering > Layer borders
// will-change қосылған элементтер бөлек layer болады

// Performance panel-де layer count-ты бақылаңыз
```

## Кеңестер

1. **Қажет кезде ғана** — Барлық жерде қолданбаңыз
2. **Cleanup** — Анимациядан кейін "auto" қойыңыз
3. **Test** — Нақты performance жақсаруын тексеріңіз
4. **Mobile** — Mobile-да аз қолданыңыз (memory limit)

## Қорытынды

`will-change` — қуатты оптимизация құралы, бірақ дұрыс қолдану керек. Тек анимация кезінде қосып, кейін алып тастаңыз.
