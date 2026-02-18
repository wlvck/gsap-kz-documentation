---
title: Position параметрі
description: GSAP Timeline-да анимациялардың уақытын дәл басқару
---

# Position параметрі

**Position параметрі** — Timeline-да анимациялар қашан басталатынын анықтайды. Ол анимацияларды параллель, кезекпен немесе кез келген уақытта орындауға мүмкіндік береді.

## Негізгі форматтар

| Формат           | Сипаттама                            |
| ---------------- | ------------------------------------ |
| `"+=1"`          | Алдыңғыдан 1 секунд кейін            |
| `"-=0.5"`        | Алдыңғы аяқталмай 0.5 секунд бұрын   |
| `1`              | Timeline-ның 1 секунд уақытында      |
| `"<"`            | Алдыңғы анимациямен бірге (бастауда) |
| `">"`            | Алдыңғы анимация аяқталғанда         |
| `"myLabel"`      | Label уақытында                      |
| `"myLabel+=0.5"` | Label-ден 0.5 секунд кейін           |

## Кезекпен (Sequence)

Әдепкі бойынша анимациялар кезекпен орындалады:

```javascript
const tl = gsap.timeline();
tl.to(".box1", { x: 200, duration: 1 }) // 0-1 сек
  .to(".box2", { y: 100, duration: 0.5 }) // 1-1.5 сек
  .to(".box3", { scale: 2, duration: 0.8 }); // 1.5-2.3 сек
```

## Салыстырмалы позиция

### `+=` және `-=`

```javascript
const tl = gsap.timeline();
tl.to(".box1", { x: 200, duration: 1 })
  .to(".box2", { y: 100 }, "+=0.5") // box1 аяқталғаннан 0.5 сек кейін
  .to(".box3", { scale: 2 }, "-=0.3"); // box2 аяқталмай 0.3 сек бұрын
```

### Overlap жасау

```javascript
const tl = gsap.timeline();
tl.to(".box1", { x: 200, duration: 1 }).to(".box2", { y: 100, duration: 0.5 }, "-=0.5"); // жартысында қиылысады
```

## `<` және `>` символдары

### `<` — алдыңғымен бірге бастау

```javascript
const tl = gsap.timeline();
tl.to(".box1", { x: 200, duration: 1 })
  .to(".box2", { y: 100 }, "<") // box1-мен бірге басталады
  .to(".box3", { scale: 2 }, "<"); // box1-мен бірге басталады
```

### `>` — алдыңғы аяқталғанда

```javascript
const tl = gsap.timeline();
tl.to(".box1", { x: 200, duration: 1 })
  .to(".box2", { y: 100 }, ">") // box1 аяқталғанда (әдепкі)
  .to(".box3", { scale: 2 }, ">"); // box2 аяқталғанда
```

### Комбинация

```javascript
const tl = gsap.timeline();
tl.to(".box1", { x: 200, duration: 1 })
  .to(".box2", { y: 100 }, "<") // box1-мен бірге
  .to(".box3", { scale: 2 }, "<+=0.2"); // box1 басталғаннан 0.2 сек кейін
```

## Абсолютті позиция

Нақты уақыт көрсету:

```javascript
const tl = gsap.timeline();
tl.to(".box1", { x: 200 }, 0) // 0 секундта
  .to(".box2", { y: 100 }, 0) // 0 секундта (бірге)
  .to(".box3", { scale: 2 }, 1); // 1 секундта
```

## Labels қолдану

### Label қосу

```javascript
const tl = gsap.timeline();
tl.to(".intro", { opacity: 1 })
  .addLabel("start")
  .to(".box1", { x: 200 })
  .addLabel("middle")
  .to(".box2", { y: 100 })
  .addLabel("end");
```

### Label-ге сілтеме

```javascript
const tl = gsap.timeline();
tl.to(".box1", { x: 200 })
  .addLabel("myLabel")
  .to(".box2", { y: 100 }, "myLabel") // label уақытында
  .to(".box3", { scale: 2 }, "myLabel+=0.5"); // label-ден 0.5 сек кейін
```

## Практикалық мысалдар

### Параллель анимация

```javascript
const tl = gsap.timeline();

// Барлығы бірге басталады
tl.to(".box1", { x: 200, duration: 1 }, 0)
  .to(".box2", { y: 100, duration: 0.8 }, 0)
  .to(".box3", { rotation: 360, duration: 1.2 }, 0);
```

### Staggered reveal

```javascript
const tl = gsap.timeline();

tl.from(".title", { y: 50, opacity: 0 })
  .from(".card", { y: 30, opacity: 0, stagger: 0.1 }, "-=0.2")
  .from(".footer", { opacity: 0 }, "-=0.1");
```

### Күрделі тізбек

```javascript
const tl = gsap.timeline({
  defaults: { duration: 0.5, ease: "power2.out" },
});

tl
  // Phase 1: Header
  .from(".logo", { x: -50, opacity: 0 })
  .from(".nav-item", { y: -20, opacity: 0, stagger: 0.1 }, "<+=0.1")

  // Phase 2: Hero (header-мен параллель)
  .from(".hero-title", { y: 50, opacity: 0 }, 0.3)
  .from(".hero-text", { y: 30, opacity: 0 }, "<+=0.15")
  .from(".hero-button", { scale: 0.8, opacity: 0 }, "<+=0.1")

  // Phase 3: Content
  .addLabel("content", "+=0.2")
  .from(".section", { y: 40, opacity: 0, stagger: 0.2 }, "content");
```

### Hover эффекті (бірнеше элемент)

```javascript
const card = document.querySelector(".card");

const hoverTl = gsap.timeline({ paused: true });
hoverTl
  .to(".card-bg", { scale: 1.05 }, 0)
  .to(".card-title", { y: -5 }, 0)
  .to(".card-icon", { rotation: 15, scale: 1.1 }, 0)
  .to(".card-arrow", { x: 5, opacity: 1 }, 0.1);

card.addEventListener("mouseenter", () => hoverTl.play());
card.addEventListener("mouseleave", () => hoverTl.reverse());
```

## Position кестесі

```
Timeline:  |--box1--|--box2--|--box3--|
Уақыт:     0   0.5   1   1.5   2   2.5

"-=0.3":   |--box1--|
                |-box2-|  (қиылысады)

"<":       |--box1--|
           |-box2-|       (бірге басталады)

"<+=0.2":  |--box1--|
             |-box2-|     (0.2 сек кейін)

0:         |--box1--|
           |--box2--|     (абсолютті 0-де)
```

## Келесі қадам

[Timeline басқару](/docs/timeline/baskaru) — timeline-ды ойнату, тоқтату, басқару әдістері.
