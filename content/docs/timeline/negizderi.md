---
title: Timeline негіздері
description: GSAP Timeline - анимациялар тізбегін құру және басқару
---

# Timeline негіздері

**Timeline** — бірнеше анимацияны бір тізбекке біріктіретін құрал. Ол күрделі анимацияларды оңай құруға және басқаруға мүмкіндік береді.

## Timeline деген не?

Timeline — бұл анимациялар контейнері. Оған анимацияларды қосып, олардың уақытын, кезегін басқаруға болады.

```javascript
// Timeline құру
const tl = gsap.timeline();

// Анимациялар қосу
tl.to(".box1", { x: 200, duration: 1 });
tl.to(".box2", { y: 100, duration: 0.5 });
tl.to(".box3", { rotation: 360, duration: 0.8 });
```

Бұл анимациялар кезекпен орындалады:

1. box1 оңға жылжиды (1 сек)
2. Содан кейін box2 төмен жылжиды (0.5 сек)
3. Содан кейін box3 айналады (0.8 сек)

## Неге Timeline қолдану керек?

### Callbacks-сіз тізбек құру

```javascript
// Нашар тәсіл (callbacks арқылы)
gsap.to(".step1", {
  x: 100,
  onComplete: () => {
    gsap.to(".step2", {
      y: 100,
      onComplete: () => {
        gsap.to(".step3", {
          scale: 2,
        });
      },
    });
  },
});

// Жақсы тәсіл (Timeline)
const tl = gsap.timeline();
tl.to(".step1", { x: 100 }).to(".step2", { y: 100 }).to(".step3", { scale: 2 });
```

### Басқару оңай

```javascript
const tl = gsap.timeline();
tl.to(".box1", { x: 200 }).to(".box2", { y: 100 }).to(".box3", { rotation: 360 });

// Бүкіл тізбекті басқару
tl.pause(); // тоқтату
tl.play(); // ойнату
tl.reverse(); // кері ойнату
tl.restart(); // басынан бастау
tl.seek(1); // 1 секундқа өту
```

## Timeline параметрлері

```javascript
const tl = gsap.timeline({
  repeat: 2, // 2 рет қайталау
  repeatDelay: 0.5, // қайталаулар арасы
  yoyo: true, // кері ойнату
  delay: 1, // бастамас бұрын күту
  paused: true, // бірден бастамау
  defaults: {
    // әдепкі параметрлер
    duration: 0.5,
    ease: "power2.out",
  },
});
```

### defaults параметрі

Барлық анимациялар үшін әдепкі параметрлер:

```javascript
const tl = gsap.timeline({
  defaults: {
    duration: 0.5,
    ease: "power2.out",
  },
});

// Енді duration мен ease көрсетудің қажеті жоқ
tl.to(".box1", { x: 200 }).to(".box2", { y: 100 }).to(".box3", { rotation: 360 });
```

## Timeline callbacks

```javascript
const tl = gsap.timeline({
  onStart: () => console.log("Timeline басталды"),
  onUpdate: () => console.log("Жаңартылуда"),
  onComplete: () => console.log("Timeline аяқталды"),
  onRepeat: () => console.log("Қайталануда"),
  onReverseComplete: () => console.log("Кері аяқталды"),
});
```

## Әдістер

### add()

Кез келген нәрсені қосу:

```javascript
const tl = gsap.timeline();

// Tween қосу
tl.add(gsap.to(".box", { x: 100 }));

// Label қосу
tl.add("myLabel");

// Функция қосу
tl.add(() => console.log("Осы кезде"));

// Басқа timeline қосу
tl.add(anotherTimeline);
```

### addLabel()

Уақыт белгісі қою:

```javascript
const tl = gsap.timeline();
tl.to(".box1", { x: 100 }).addLabel("middle").to(".box2", { y: 100 }).addLabel("end");

// Label-ге өту
tl.seek("middle");
```

### from() және fromTo()

```javascript
const tl = gsap.timeline();
tl.from(".box1", { opacity: 0 }).fromTo(".box2", { scale: 0 }, { scale: 1 });
```

## Практикалық мысалдар

### Page intro анимациясы

```javascript
const tl = gsap.timeline({ defaults: { duration: 0.6, ease: "power2.out" } });

tl.from(".hero-title", { y: 50, opacity: 0 })
  .from(".hero-subtitle", { y: 30, opacity: 0 }, "-=0.3")
  .from(".hero-button", { scale: 0.8, opacity: 0 }, "-=0.2")
  .from(".hero-image", { x: 50, opacity: 0 }, "-=0.4");
```

### Меню ашу анимациясы

```javascript
function openMenu() {
  const tl = gsap.timeline();

  tl.to(".menu", { x: 0, duration: 0.3 }).from(".menu-item", {
    x: -20,
    opacity: 0,
    stagger: 0.1,
    duration: 0.3,
  });

  return tl;
}
```

### Карточка hover эффекті

```javascript
const card = document.querySelector(".card");

const hoverTl = gsap.timeline({ paused: true });
hoverTl
  .to(card, { y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.2)", duration: 0.3 })
  .to(".card-icon", { scale: 1.1, duration: 0.2 }, 0);

card.addEventListener("mouseenter", () => hoverTl.play());
card.addEventListener("mouseleave", () => hoverTl.reverse());
```

## Timeline қайтару

Функциядан timeline қайтару — жақсы тәжірибе:

```javascript
function createIntro() {
  const tl = gsap.timeline();
  tl.from(".title", { y: 50, opacity: 0 }).from(".content", { y: 30, opacity: 0 });
  return tl;
}

// Басқа timeline-ға қосу
const masterTl = gsap.timeline();
masterTl.add(createIntro()).add(createAnotherSection());
```

## Келесі қадам

[Position параметрі](/docs/timeline/position) — анимациялардың уақытын дәл басқару.
