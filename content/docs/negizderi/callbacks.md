---
title: Callbacks
description: GSAP анимацияларындағы оқиғаларға реакция жасау функциялары
---

# Callbacks

**Callbacks** — анимацияның белгілі бір кезеңдерінде шақырылатын функциялар. Олар арқылы анимация барысына реакция жасауға болады.

## Негізгі callbacks

| Callback            | Қашан шақырылады               |
| ------------------- | ------------------------------ |
| `onStart`           | Анимация басталғанда (бір рет) |
| `onUpdate`          | Әр frame сайын                 |
| `onComplete`        | Анимация аяқталғанда (бір рет) |
| `onRepeat`          | Әр қайталану кезінде           |
| `onReverseComplete` | Кері анимация аяқталғанда      |

## Қарапайым мысалдар

### onStart

```javascript
gsap.to(".box", {
  x: 200,
  duration: 1,
  onStart: () => {
    console.log("Анимация басталды!");
  },
});
```

### onUpdate

```javascript
gsap.to(".box", {
  x: 200,
  duration: 1,
  onUpdate: () => {
    console.log("Анимация жүріп жатыр...");
  },
});
```

### onComplete

```javascript
gsap.to(".box", {
  x: 200,
  duration: 1,
  onComplete: () => {
    console.log("Анимация аяқталды!");
    // Келесі әрекетті орындау
  },
});
```

## Параметрлер беру

### onCompleteParams

```javascript
gsap.to(".box", {
  x: 200,
  onComplete: (message, element) => {
    console.log(message, element);
  },
  onCompleteParams: ["Дайын!", document.querySelector(".box")],
});
```

### Барлық callback-тар үшін

```javascript
gsap.to(".box", {
  x: 200,
  onStart: handleStart,
  onStartParams: ["бастау"],
  onUpdate: handleUpdate,
  onUpdateParams: ["жаңарту"],
  onComplete: handleComplete,
  onCompleteParams: ["аяқтау"],
});
```

## this контексті

### callbackScope

```javascript
const controller = {
  name: "AnimationController",
  logStatus(status) {
    console.log(`${this.name}: ${status}`);
  },
};

gsap.to(".box", {
  x: 200,
  callbackScope: controller,
  onComplete() {
    this.logStatus("аяқталды"); // "AnimationController: аяқталды"
  },
});
```

## Tween объектісіне қол жеткізу

### Arrow function арқылы

```javascript
const tween = gsap.to(".box", {
  x: 200,
  onUpdate: () => {
    console.log("Progress:", tween.progress());
  },
});
```

### this арқылы (қарапайым function)

```javascript
gsap.to(".box", {
  x: 200,
  onUpdate: function () {
    console.log("Progress:", this.progress());
    console.log("Duration:", this.duration());
  },
});
```

## Практикалық мысалдар

### Жүктеу индикаторы

```javascript
const progressBar = document.querySelector(".progress");
const percentText = document.querySelector(".percent");

gsap.to(".progress-fill", {
  width: "100%",
  duration: 3,
  ease: "none",
  onUpdate: function () {
    const percent = Math.round(this.progress() * 100);
    percentText.textContent = `${percent}%`;
  },
  onComplete: () => {
    console.log("Жүктеу аяқталды!");
  },
});
```

### Кезектеп анимациялар

```javascript
gsap.to(".step-1", {
  x: 100,
  onComplete: () => {
    gsap.to(".step-2", {
      y: 100,
      onComplete: () => {
        gsap.to(".step-3", {
          scale: 1.5,
        });
      },
    });
  },
});

// Немесе Timeline қолданған жөн (келесі бөлімде)
```

### Анимация күйін көрсету

```javascript
const statusEl = document.querySelector(".status");

gsap.to(".box", {
  x: 200,
  duration: 2,
  repeat: 2,
  yoyo: true,
  onStart: () => {
    statusEl.textContent = "Ойнатылуда...";
  },
  onRepeat: () => {
    statusEl.textContent = "Қайталануда...";
  },
  onComplete: () => {
    statusEl.textContent = "Аяқталды!";
  },
});
```

### Санауыш

```javascript
const counter = { value: 0 };
const display = document.querySelector(".counter");

gsap.to(counter, {
  value: 1000,
  duration: 2,
  ease: "power1.out",
  onUpdate: () => {
    display.textContent = Math.round(counter.value);
  },
});
```

## Lifecycle толық мысалы

```javascript
gsap.to(".box", {
  x: 200,
  duration: 2,
  repeat: 1,
  yoyo: true,
  onStart: () => console.log("1. Бастау"),
  onUpdate: () => console.log("2. Жаңарту"),
  onRepeat: () => console.log("3. Қайталау"),
  onComplete: () => console.log("4. Аяқтау"),
  onReverseComplete: () => console.log("5. Кері аяқтау"),
});

// Консоль:
// 1. Бастау
// 2. Жаңарту (көп рет)
// 3. Қайталау
// 2. Жаңарту (көп рет)
// 4. Аяқтау
```

## Кеңес

Күрделі анимация тізбегін callbacks арқылы емес, **Timeline** арқылы жасаған дұрыс. Ол кодты оқуға жеңіл етеді және басқаруды жеңілдетеді.

## Келесі қадам

[Easing негіздері](/docs/easing/negizderi) — анимацияның жеделдету функциялары.
