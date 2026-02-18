---
title: Callback функциялар
description: GSAP-тағы барлық callback функцияларының толық тізімі
---

# Callback функциялар

GSAP-тағы callback-тар анимация оқиғаларына жауап беруге мүмкіндік береді.

## Tween Callback-тары

### onStart

Анимация басталғанда бір рет шақырылады.

```javascript
gsap.to(".box", {
  x: 100,
  onStart: () => {
    console.log("Анимация басталды!");
  },
  onStartParams: ["param1", "param2"], // Параметрлер
});

// this контексті
gsap.to(".box", {
  x: 100,
  onStart: function () {
    console.log(this.targets()); // Анимацияланатын элементтер
  },
});
```

### onUpdate

Әр frame-де шақырылады (60 рет/сек).

```javascript
gsap.to(".box", {
  x: 100,
  onUpdate: function () {
    console.log("Progress:", this.progress());
    console.log("Ratio:", this.ratio);
  },
});

// Практикалық мысал
let counter = { value: 0 };
gsap.to(counter, {
  value: 100,
  duration: 2,
  onUpdate: () => {
    document.querySelector(".counter").textContent = Math.round(counter.value);
  },
});
```

### onComplete

Анимация аяқталғанда шақырылады.

```javascript
gsap.to(".box", {
  x: 100,
  onComplete: () => {
    console.log("Анимация аяқталды!");
  },
  onCompleteParams: [".box"],
});

// Кезекті анимациялар
gsap.to(".box1", {
  x: 100,
  onComplete: () => {
    gsap.to(".box2", { x: 100 });
  },
});
```

### onReverseComplete

Кері анимация аяқталғанда шақырылады.

```javascript
const tween = gsap.to(".box", {
  x: 100,
  onReverseComplete: () => {
    console.log("Кері анимация аяқталды!");
  },
});

// Кейін
tween.reverse();
```

### onRepeat

Әр қайталану басында шақырылады.

```javascript
gsap.to(".box", {
  x: 100,
  repeat: 5,
  onRepeat: function () {
    console.log("Қайталану:", this.iteration);
  },
});

// Қайталану санын қадағалау
let repeatCount = 0;
gsap.to(".box", {
  rotation: 360,
  repeat: -1,
  onRepeat: () => {
    repeatCount++;
    console.log(`Қайталану #${repeatCount}`);
  },
});
```

### onInterrupt

Анимация тоқтатылғанда шақырылады.

```javascript
const tween = gsap.to(".box", {
  x: 100,
  duration: 2,
  onInterrupt: () => {
    console.log("Анимация тоқтатылды!");
  },
});

// 1 секундтан кейін тоқтату
setTimeout(() => {
  tween.kill(); // onInterrupt шақырылады
}, 1000);
```

## Timeline Callback-тары

### Timeline-ға арналған

```javascript
const tl = gsap.timeline({
  onStart: () => console.log("Timeline басталды"),
  onUpdate: () => console.log("Timeline жаңартылды"),
  onComplete: () => console.log("Timeline аяқталды"),
  onReverseComplete: () => console.log("Timeline кері аяқталды"),
  onRepeat: () => console.log("Timeline қайталанды"),
});

tl.to(".box1", { x: 100 }).to(".box2", { x: 100 });
```

### Нақты уақытта callback

```javascript
const tl = gsap.timeline();

tl.to(".box1", { x: 100 })
  .call(() => console.log("1-ші анимациядан кейін"))
  .to(".box2", { x: 100 })
  .call(myFunction, ["arg1", "arg2"]) // Параметрлермен
  .to(".box3", { x: 100 });
```

### addPause()

```javascript
const tl = gsap.timeline();

tl.to(".box1", { x: 100 })
  .addPause() // Мұнда тоқтайды
  .to(".box2", { x: 100 });

// Жалғастыру
document.querySelector(".continue-btn").onclick = () => {
  tl.resume();
};
```

## ScrollTrigger Callback-тары

### onEnter

Элемент trigger аймағына кіргенде.

```javascript
ScrollTrigger.create({
  trigger: ".section",
  start: "top center",
  onEnter: (self) => {
    console.log("Элемент кірді!");
    console.log("Direction:", self.direction); // 1 немесе -1
    console.log("Progress:", self.progress);
  },
});
```

### onLeave

Элемент trigger аймағынан шыққанда.

```javascript
ScrollTrigger.create({
  trigger: ".section",
  onLeave: (self) => {
    console.log("Элемент шықты!");
  },
});
```

### onEnterBack

Кері скроллда элемент қайта кіргенде.

```javascript
ScrollTrigger.create({
  trigger: ".section",
  onEnterBack: () => {
    console.log("Кері кірді!");
  },
});
```

### onLeaveBack

Кері скроллда элемент шыққанда.

```javascript
ScrollTrigger.create({
  trigger: ".section",
  onLeaveBack: () => {
    console.log("Кері шықты!");
  },
});
```

### onUpdate (ScrollTrigger)

Скролл кезінде үнемі шақырылады.

```javascript
ScrollTrigger.create({
  trigger: ".section",
  start: "top center",
  end: "bottom center",
  onUpdate: (self) => {
    console.log("Progress:", self.progress.toFixed(2));
    console.log("Velocity:", self.getVelocity());
  },
});
```

### onToggle

Enter немесе leave кезінде.

```javascript
ScrollTrigger.create({
  trigger: ".section",
  onToggle: (self) => {
    console.log("isActive:", self.isActive);
  },
});
```

### onRefresh

ScrollTrigger қайта есептелгенде.

```javascript
ScrollTrigger.create({
  trigger: ".section",
  onRefresh: (self) => {
    console.log("Refresh! Start:", self.start, "End:", self.end);
  },
});
```

### onScrubComplete

Scrub анимация аяқталғанда.

```javascript
gsap.to(".box", {
  x: 100,
  scrollTrigger: {
    trigger: ".section",
    scrub: 1,
    onScrubComplete: () => {
      console.log("Scrub аяқталды!");
    },
  },
});
```

### onSnapComplete

Snap аяқталғанда.

```javascript
ScrollTrigger.create({
  trigger: ".panels",
  snap: 1 / 4,
  onSnapComplete: (self) => {
    console.log("Snap panel:", self.progress * 4);
  },
});
```

## Callback параметрлері

### onParams

```javascript
gsap.to(".box", {
  x: 100,
  onComplete: myFunction,
  onCompleteParams: ["hello", 123, document.querySelector(".box")],
});

function myFunction(message, number, element) {
  console.log(message, number, element);
}
```

### this контексті

```javascript
gsap.to(".box", {
  x: 100,
  onComplete: function () {
    // Tween әдістері
    console.log(this.targets()); // Элементтер массиві
    console.log(this.progress()); // 0-1
    console.log(this.duration()); // Ұзақтық
    console.log(this.time()); // Ағымдағы уақыт
    console.log(this.iteration); // Қайталану саны
  },
});
```

### callbackScope

```javascript
const myObject = {
  name: "MyObject",
  log: function () {
    console.log(this.name);
  },
};

gsap.to(".box", {
  x: 100,
  onComplete: myObject.log,
  callbackScope: myObject, // this = myObject
});
```

## Практикалық мысалдар

### Loading progress

```javascript
gsap.to(".progress-bar", {
  scaleX: 1,
  duration: 3,
  onUpdate: function () {
    const percent = Math.round(this.progress() * 100);
    document.querySelector(".percent").textContent = `${percent}%`;
  },
  onComplete: () => {
    gsap.to(".loader", { opacity: 0 });
  },
});
```

### Analytics tracking

```javascript
gsap.from(".hero-section", {
  opacity: 0,
  y: 50,
  scrollTrigger: {
    trigger: ".hero-section",
    onEnter: () => {
      analytics.track("Hero Section Viewed");
    },
  },
});
```

### Sequential animations

```javascript
const tl = gsap.timeline({
  onComplete: () => {
    // Барлық анимациялар аяқталды
    showNextContent();
  },
});

tl.from(".title", { y: 50, opacity: 0 })
  .call(() => playSound("whoosh"))
  .from(".subtitle", { y: 30, opacity: 0 })
  .call(() => enableButtons());
```

### State management

```javascript
let animationState = "idle";

gsap.to(".character", {
  x: 200,
  onStart: () => {
    animationState = "moving";
    updateUI();
  },
  onComplete: () => {
    animationState = "idle";
    updateUI();
  },
});
```

### Scroll-based video

```javascript
const video = document.querySelector("video");

ScrollTrigger.create({
  trigger: ".video-section",
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    video.currentTime = video.duration * self.progress;
  },
});
```

## Callback реті

```javascript
// Орындалу реті:
// 1. onStart (бір рет)
// 2. onUpdate (көп рет)
// 3. onRepeat (қайталану болса)
// 4. onComplete (соңында)

gsap.to(".box", {
  x: 100,
  repeat: 2,
  onStart: () => console.log("1. Start"),
  onUpdate: () => console.log("2. Update"),
  onRepeat: () => console.log("3. Repeat"),
  onComplete: () => console.log("4. Complete"),
});
```

## Қорытынды

Callback-тар GSAP-тың қуатты мүмкіндігі. Олар анимация логикасын басқаруға, UI жаңартуға, және analytics жіберуге мүмкіндік береді.
