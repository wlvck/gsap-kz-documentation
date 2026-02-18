---
title: Мәтін reveal
description: GSAP арқылы мәтін анимациялары мен reveal эффекттері
---

# Мәтін reveal

Text reveal — мәтіннің пайда болу анимациясы. Заголовкалар мен hero секцияларда жиі қолданылады.

## Негізгі reveal

```javascript
gsap.from(".reveal-text", {
  y: 100,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});
```

## Split text

### Сөздерге бөлу

```javascript
const text = document.querySelector(".split-words");
const words = text.textContent.split(" ");
text.innerHTML = words.map((word) => `<span class="word">${word}</span>`).join(" ");

gsap.from(".word", {
  y: 50,
  opacity: 0,
  stagger: 0.1,
  duration: 0.6,
  ease: "power3.out",
});
```

### Әріптерге бөлу

```javascript
const text = document.querySelector(".split-chars");
const chars = text.textContent.split("");
text.innerHTML = chars
  .map((char) => `<span class="char">${char === " " ? "&nbsp;" : char}</span>`)
  .join("");

gsap.from(".char", {
  y: 30,
  opacity: 0,
  stagger: 0.02,
  duration: 0.4,
  ease: "power2.out",
});
```

### Жолдарға бөлу

```javascript
const text = document.querySelector(".split-lines");
const lines = text.innerHTML.split("<br>");
text.innerHTML = lines.map((line) => `<div class="line"><span>${line}</span></div>`).join("");

gsap.from(".line span", {
  y: "100%",
  stagger: 0.15,
  duration: 0.8,
  ease: "power3.out",
});
```

## Mask reveal

```css
.mask-text {
  overflow: hidden;
}

.mask-text span {
  display: inline-block;
}
```

```javascript
gsap.from(".mask-text span", {
  yPercent: 100,
  duration: 0.8,
  ease: "power3.out",
});
```

## Typewriter эффект

```javascript
const text = "Сәлем, әлем!";
const element = document.querySelector(".typewriter");

gsap.to(element, {
  text: {
    value: text,
    delimiter: "",
  },
  duration: 2,
  ease: "none",
});
```

### Cursor-мен

```css
.typewriter::after {
  content: "|";
  animation: blink 0.8s infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
```

## Scramble text

```javascript
// ScrambleText плагинімен (Club)
gsap.to(".scramble", {
  scrambleText: {
    text: "Жаңа мәтін",
    chars: "АБВГДЕЖЗИЙК",
    speed: 0.3,
  },
  duration: 1,
});
```

### Manual scramble

```javascript
function scrambleText(element, finalText, duration = 1) {
  const chars = "АБВГДЕЖЗИЙКЛМНОП";
  let iteration = 0;
  const totalIterations = duration * 60;

  const interval = setInterval(() => {
    element.textContent = finalText
      .split("")
      .map((char, index) => {
        if (index < iteration) return finalText[index];
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    if (iteration >= finalText.length) {
      clearInterval(interval);
    }

    iteration += finalText.length / totalIterations;
  }, 1000 / 60);
}
```

## Clip-path reveal

```css
.clip-text {
  clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
}
```

```javascript
gsap.to(".clip-text", {
  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  duration: 1,
  ease: "power3.inOut",
});
```

## Gradient reveal

```css
.gradient-text {
  background: linear-gradient(90deg, #0ae448 50%, transparent 50%);
  background-size: 200% 100%;
  background-position: 100% 0;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

```javascript
gsap.to(".gradient-text", {
  backgroundPosition: "0% 0",
  duration: 1,
  ease: "power2.out",
});
```

## Scroll reveal

```javascript
gsap.utils.toArray(".reveal-on-scroll").forEach((el) => {
  gsap.from(el, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
    },
  });
});
```

### Staggered scroll reveal

```javascript
gsap.utils.toArray(".reveal-section").forEach((section) => {
  const items = section.querySelectorAll(".reveal-item");

  gsap.from(items, {
    y: 50,
    opacity: 0,
    stagger: 0.1,
    duration: 0.6,
    scrollTrigger: {
      trigger: section,
      start: "top 75%",
    },
  });
});
```

## 3D text reveal

```javascript
gsap.from(".text-3d", {
  rotationX: -90,
  opacity: 0,
  transformOrigin: "center bottom",
  duration: 1,
  ease: "power3.out",
  stagger: 0.1,
});
```

## Counter animation

```javascript
const counter = document.querySelector(".counter");
const target = parseInt(counter.dataset.target);

gsap.to(counter, {
  innerText: target,
  duration: 2,
  snap: { innerText: 1 },
  ease: "power2.out",
});
```

## Highlight эффект

```css
.highlight {
  background: linear-gradient(transparent 60%, #0ae448 60%);
  background-size: 0% 100%;
  background-repeat: no-repeat;
}
```

```javascript
gsap.to(".highlight", {
  backgroundSize: "100% 100%",
  duration: 0.6,
  ease: "power2.out",
  stagger: 0.2,
});
```

## Толық мысал

```javascript
class TextReveal {
  constructor(container) {
    this.container = container;
    this.headings = container.querySelectorAll("h1, h2, h3");
    this.paragraphs = container.querySelectorAll("p");

    this.init();
  }

  init() {
    this.splitHeadings();
    this.setupAnimations();
  }

  splitHeadings() {
    this.headings.forEach((heading) => {
      const text = heading.textContent;
      heading.innerHTML = text
        .split(" ")
        .map((word) => {
          const chars = word
            .split("")
            .map((char) => `<span class="char">${char}</span>`)
            .join("");
          return `<span class="word">${chars}</span>`;
        })
        .join(" ");
    });
  }

  setupAnimations() {
    // Heading animation
    this.headings.forEach((heading) => {
      const chars = heading.querySelectorAll(".char");

      gsap.from(chars, {
        y: 50,
        opacity: 0,
        rotationX: -45,
        stagger: 0.02,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
        },
      });
    });

    // Paragraph animation
    this.paragraphs.forEach((p) => {
      gsap.from(p, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: p,
          start: "top 85%",
        },
      });
    });
  }
}

// Initialize
document.querySelectorAll(".text-reveal-container").forEach((container) => {
  new TextReveal(container);
});
```

## SplitText плагині

```javascript
// Club плагині
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);

const split = new SplitText(".split-target", {
  type: "words, chars, lines",
  linesClass: "line",
  wordsClass: "word",
  charsClass: "char",
});

// Анимация
gsap.from(split.chars, {
  y: 100,
  opacity: 0,
  stagger: 0.02,
  duration: 0.5,
});

// Cleanup
// split.revert();
```

## Кеңестер

1. **overflow: hidden** — Mask reveal үшін қажет
2. **display: inline-block** — span-дарға қосыңыз
3. **will-change** — Көп әріптерге қосыңыз
4. **Responsive** — Mobile-да stagger азайтыңыз

## Қорытынды

Text reveal — UI-дың маңызды бөлігі. Split text, mask reveal, typewriter эффекттері мәтінге өмір сыйлайды.
