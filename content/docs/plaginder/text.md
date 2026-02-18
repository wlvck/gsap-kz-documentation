---
title: TextPlugin
description: GSAP TextPlugin - мәтінді анимациялау және өзгерту
---

# TextPlugin

**TextPlugin** — элементтің мәтінін біртіндеп өзгертуге мүмкіндік береді. Теру эффекті, мәтін алмастыру және т.б.

## Орнату

```javascript
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);
```

## Негізгі қолданылуы

### Мәтінді өзгерту

```javascript
gsap.to(".heading", {
  duration: 2,
  text: "Жаңа мәтін",
});
```

### Теру эффекті

```javascript
gsap.to(".typewriter", {
  duration: 3,
  text: "Сәлем, мен GSAP-пен жазылдым!",
  ease: "none",
});
```

## text параметрлері

### Қарапайым string

```javascript
gsap.to(".element", {
  text: "Жаңа мәтін",
});
```

### Объект ретінде

```javascript
gsap.to(".element", {
  text: {
    value: "Жаңа мәтін",
    delimiter: " ", // сөз бойынша
    padSpace: true, // бос орындарды сақтау
    newClass: "new", // жаңа мәтінге класс
    oldClass: "old", // ескі мәтінге класс
  },
});
```

## delimiter

Мәтінді қалай бөлу:

```javascript
// Әріп бойынша (әдепкі)
text: {
  value: "Сәлем",
  delimiter: "", // әр әріп бөлек
}

// Сөз бойынша
text: {
  value: "Сәлем әлем",
  delimiter: " ", // сөз бойынша
}
```

## Практикалық мысалдар

### Typewriter эффект

```javascript
gsap.to(".typewriter", {
  duration: 4,
  text: "Бұл мәтін біртіндеп пайда болады...",
  ease: "none",
});
```

### Санауыш

```javascript
const counter = { value: 0 };

gsap.to(counter, {
  duration: 2,
  value: 1000,
  ease: "power1.out",
  onUpdate: function () {
    document.querySelector(".counter").textContent = Math.round(counter.value);
  },
});

// Немесе TextPlugin арқылы
gsap.to(".counter", {
  duration: 2,
  text: "1000",
  ease: "none",
});
```

### Мәтін ауыстыру циклі

```javascript
const texts = ["Бірінші мәтін", "Екінші мәтін", "Үшінші мәтін"];
let index = 0;

function changeText() {
  gsap.to(".rotating-text", {
    duration: 1,
    text: texts[index],
    ease: "none",
    onComplete: () => {
      index = (index + 1) % texts.length;
      gsap.delayedCall(2, changeText);
    },
  });
}

changeText();
```

### Scramble эффекті

```javascript
// Кездейсоқ символдар арқылы ауысу
gsap.to(".scramble", {
  duration: 2,
  text: {
    value: "GSAP",
    chars: "01", // binary стилі
    // chars: "upperCase", // бас әріптер
    // chars: "lowerCase", // кіші әріптер
  },
});
```

### Fade out/in мәтін

```javascript
const tl = gsap.timeline();

tl.to(".text", {
  opacity: 0,
  duration: 0.3,
})
  .set(".text", { text: "Жаңа мәтін" })
  .to(".text", {
    opacity: 1,
    duration: 0.3,
  });
```

### Cursor эффекті

```javascript
// CSS
// .cursor { animation: blink 0.7s infinite; }
// @keyframes blink { 50% { opacity: 0; } }

const text = "Теру эффекті...";
const element = document.querySelector(".typewriter");

gsap.to(element, {
  duration: text.length * 0.1,
  text: text,
  ease: "none",
  onComplete: () => {
    element.innerHTML += '<span class="cursor">|</span>';
  },
});
```

## SplitText (Club GreenSock)

Мәтінді бөлу және әр бөлікті анимациялау:

```javascript
// Club GreenSock плагині
import { SplitText } from "gsap/SplitText";

const split = new SplitText(".heading", { type: "chars,words,lines" });

// Әр әріпті анимациялау
gsap.from(split.chars, {
  duration: 0.5,
  opacity: 0,
  y: 50,
  stagger: 0.02,
});

// Аяқтағанда қалпына келтіру
split.revert();
```

## rtl параметрі

Оңнан солға жазу үшін:

```javascript
gsap.to(".arabic-text", {
  text: {
    value: "مرحبا",
    rtl: true,
  },
});
```

## Ескерту

TextPlugin тек мәтін құрамын өзгертеді. Стильдерді (түс, өлшем) анимациялау үшін қалыпты GSAP әдістерін қолданыңыз:

```javascript
gsap.to(".text", {
  duration: 1,
  text: "Жаңа мәтін",
  color: "#ff0000",
  fontSize: "24px",
});
```

## Келесі қадам

[gsap.utils](/docs/utilitalar/utils) — GSAP утилита функциялары.
