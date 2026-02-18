---
title: ScrollTrigger кіріспе
description: GSAP ScrollTrigger плагині - скролл арқылы анимацияларды басқару
---

# ScrollTrigger кіріспе

**ScrollTrigger** — GSAP-тың ең танымал плагині. Ол скролл позициясына байланысты анимацияларды іске қосуға және басқаруға мүмкіндік береді.

## Орнату

```bash
npm install gsap
```

```javascript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

## Негізгі қолданылуы

### Қарапайым trigger

```javascript
gsap.to(".box", {
  x: 200,
  scrollTrigger: ".box", // .box көрінгенде іске қосу
});
```

### Толық конфигурация

```javascript
gsap.to(".box", {
  x: 200,
  scrollTrigger: {
    trigger: ".box", // trigger элемент
    start: "top center", // қашан басталады
    end: "bottom center", // қашан аяқталады
    markers: true, // debug маркерлер
  },
});
```

## start және end

### Формат

```
start: "trigger-position viewport-position"
```

- **trigger-position** — trigger элементінің қай бөлігі
- **viewport-position** — экранның қай бөлігі

### Жиі қолданылатын мәндер

```javascript
start: "top center"; // элемент жоғарысы экран ортасында
start: "top bottom"; // элемент жоғарысы экран төменінде
start: "top 80%"; // элемент жоғарысы экранның 80%-ында
start: "center center"; // элемент ортасы экран ортасында
start: "top+=100 center"; // жоғарыдан 100px кейін
```

### end параметрі

```javascript
end: "bottom center"; // элемент төмені экран ортасында
end: "bottom top"; // элемент төмені экран жоғарысында
end: "+=500"; // start-тан 500px кейін
end: "bottom 20%"; // элемент төмені экранның 20%-ында
```

## markers — debug құралы

```javascript
scrollTrigger: {
  trigger: ".box",
  start: "top center",
  end: "bottom center",
  markers: true, // жасыл және қызыл сызықтар көрсетіледі
}
```

Маркерлер:

- **жасыл** — start позициясы
- **қызыл** — end позициясы
- **scroller-start/end** — viewport позициялары

## toggleActions

Скролл кезіндегі әрекеттерді анықтау:

```javascript
scrollTrigger: {
  trigger: ".box",
  toggleActions: "play pause resume reset",
  // 1: onEnter (кірген кезде)
  // 2: onLeave (шыққан кезде)
  // 3: onEnterBack (кері кірген кезде)
  // 4: onLeaveBack (кері шыққан кезде)
}
```

### Мүмкін мәндер

| Мән        | Сипаттама              |
| ---------- | ---------------------- |
| `play`     | Анимацияны ойнату      |
| `pause`    | Тоқтату                |
| `resume`   | Жалғастыру             |
| `reverse`  | Кері ойнату            |
| `restart`  | Басынан бастау         |
| `reset`    | Бастапқы күйге қайтару |
| `complete` | Аяқтау күйіне өту      |
| `none`     | Ештеңе жасамау         |

### Жиі қолданылатын комбинациялар

```javascript
// Әдепкі
toggleActions: "play none none none";

// Кіргенде play, шыққанда reverse
toggleActions: "play reverse play reverse";

// Бір рет ойнату
toggleActions: "play none none none";

// Толық бақылау
toggleActions: "play pause resume reset";
```

## once параметрі

Бір рет іске қосу:

```javascript
scrollTrigger: {
  trigger: ".box",
  once: true, // бір рет іске қосылып, жойылады
}
```

## Практикалық мысалдар

### Fade in on scroll

```javascript
gsap.from(".card", {
  y: 50,
  opacity: 0,
  duration: 0.8,
  scrollTrigger: {
    trigger: ".card",
    start: "top 80%",
  },
});
```

### Бірнеше элемент

```javascript
gsap.utils.toArray(".card").forEach((card) => {
  gsap.from(card, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
    },
  });
});
```

### Timeline-мен бірге

```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section",
    start: "top center",
    toggleActions: "play reverse play reverse",
  },
});

tl.from(".title", { y: 50, opacity: 0 })
  .from(".content", { y: 30, opacity: 0 }, "-=0.3")
  .from(".button", { scale: 0.8, opacity: 0 }, "-=0.2");
```

### Stagger on scroll

```javascript
gsap.from(".list-item", {
  y: 30,
  opacity: 0,
  stagger: 0.1,
  scrollTrigger: {
    trigger: ".list",
    start: "top 80%",
  },
});
```

## ScrollTrigger.create()

Анимациясыз trigger құру:

```javascript
ScrollTrigger.create({
  trigger: ".section",
  start: "top center",
  end: "bottom center",
  onEnter: () => console.log("Кірді"),
  onLeave: () => console.log("Шықты"),
  onEnterBack: () => console.log("Кері кірді"),
  onLeaveBack: () => console.log("Кері шықты"),
});
```

## Келесі қадам

[Негізгі параметрлер](/docs/scrolltrigger/parametrler) — ScrollTrigger-дің барлық параметрлері.
