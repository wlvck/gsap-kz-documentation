---
title: Timeline басқару
description: GSAP Timeline-ды ойнату, тоқтату және басқару әдістері
---

# Timeline басқару

Timeline құрғаннан кейін оны толық басқаруға болады: ойнату, тоқтату, жылдамдығын өзгерту және т.б.

## Негізгі әдістер

### play()

Timeline-ды ойнату:

```javascript
const tl = gsap.timeline({ paused: true });
tl.to(".box", { x: 200 });

// Ойнату
tl.play();

// Белгілі бір уақыттан бастау
tl.play(0.5); // 0.5 секундтан
tl.play("myLabel"); // label-ден
```

### pause()

Тоқтату:

```javascript
tl.pause();

// Белгілі бір уақытта тоқтату
tl.pause(1); // 1 секундта
```

### resume()

Тоқтаған жерден жалғастыру:

```javascript
tl.resume();
```

### reverse()

Кері ойнату:

```javascript
tl.reverse();

// Белгілі бір уақыттан кері
tl.reverse(1); // 1 секундтан кері
```

### restart()

Басынан бастау:

```javascript
tl.restart();

// Параметрлермен
tl.restart(true, false);
// includeDelay: true — delay-ді қосу
// suppressEvents: false — callbacks шақыру
```

### seek()

Белгілі бір уақытқа өту:

```javascript
tl.seek(1); // 1 секундқа
tl.seek("myLabel"); // label-ге
tl.seek("myLabel+=0.5"); // label-ден 0.5 сек кейін
```

### kill()

Timeline-ды жою:

```javascript
tl.kill(); // Толығымен жою
```

## Қасиеттер

### progress()

Прогрессті алу/орнату (0-1):

```javascript
// Алу
const progress = tl.progress(); // 0.5 (50%)

// Орнату
tl.progress(0.5); // 50%-ға өту
```

### totalProgress()

Қайталауларды қоса прогресс:

```javascript
const tl = gsap.timeline({ repeat: 2 });
// ...

tl.totalProgress(0.5); // жалпы прогрестің 50%-ы
```

### time()

Ағымдағы уақытты алу/орнату:

```javascript
// Алу
const currentTime = tl.time();

// Орнату
tl.time(1.5); // 1.5 секундқа өту
```

### duration()

Ұзақтықты алу:

```javascript
const duration = tl.duration(); // 3 (секунд)
```

### totalDuration()

Қайталауларды қоса жалпы ұзақтық:

```javascript
const tl = gsap.timeline({ repeat: 2 });
tl.to(".box", { x: 200, duration: 1 });

tl.duration(); // 1
tl.totalDuration(); // 3 (1 * 3 қайталау)
```

### timeScale()

Жылдамдықты өзгерту:

```javascript
// Алу
const speed = tl.timeScale();

// Орнату
tl.timeScale(2); // 2x жылдам
tl.timeScale(0.5); // 2x баяу
tl.timeScale(-1); // кері ойнату
```

### reversed()

Кері бағытта ма?

```javascript
// Тексеру
if (tl.reversed()) {
  console.log("Кері ойнатылуда");
}

// Орнату
tl.reversed(true); // кері қосу
tl.reversed(false); // қалыпты бағыт
```

### paused()

Тоқтатылған ба?

```javascript
// Тексеру
if (tl.paused()) {
  console.log("Тоқтатылған");
}

// Орнату
tl.paused(true); // тоқтату
tl.paused(false); // ойнату
```

### isActive()

Қазір ойнатылуда ма?

```javascript
if (tl.isActive()) {
  console.log("Анимация жүріп жатыр");
}
```

## Практикалық мысалдар

### Play/Pause батырмасы

```javascript
const tl = gsap.timeline({ paused: true });
tl.to(".box", { x: 200, duration: 2 });

const playBtn = document.querySelector(".play-btn");

playBtn.addEventListener("click", () => {
  if (tl.paused()) {
    tl.play();
    playBtn.textContent = "Pause";
  } else {
    tl.pause();
    playBtn.textContent = "Play";
  }
});
```

### Toggle анимация

```javascript
const menuTl = gsap.timeline({ paused: true });
menuTl.to(".menu", { x: 0, duration: 0.3 }).from(".menu-item", { opacity: 0, y: 20, stagger: 0.1 });

const toggleBtn = document.querySelector(".menu-toggle");

toggleBtn.addEventListener("click", () => {
  if (menuTl.reversed() || menuTl.paused()) {
    menuTl.play();
  } else {
    menuTl.reverse();
  }
});
```

### Progress slider

```javascript
const tl = gsap.timeline({ paused: true });
tl.to(".box", { x: 400, rotation: 360, duration: 3 });

const slider = document.querySelector(".progress-slider");

slider.addEventListener("input", (e) => {
  tl.progress(e.target.value / 100);
});
```

### Жылдамдық басқару

```javascript
const tl = gsap.timeline();
tl.to(".box", { x: 400, duration: 2 });

document.querySelector(".speed-1x").addEventListener("click", () => {
  tl.timeScale(1);
});

document.querySelector(".speed-2x").addEventListener("click", () => {
  tl.timeScale(2);
});

document.querySelector(".speed-half").addEventListener("click", () => {
  tl.timeScale(0.5);
});
```

### Hover арқылы ойнату

```javascript
const card = document.querySelector(".card");

const hoverTl = gsap.timeline({ paused: true });
hoverTl
  .to(".card", { y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" })
  .to(".card-icon", { scale: 1.2, rotation: 10 }, 0);

card.addEventListener("mouseenter", () => hoverTl.play());
card.addEventListener("mouseleave", () => hoverTl.reverse());
```

### Scroll progress

```javascript
const tl = gsap.timeline({ paused: true });
tl.to(".progress-bar", { width: "100%" });

window.addEventListener("scroll", () => {
  const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  tl.progress(scrollProgress);
});
```

## getTweensOf()

Элементтің анимацияларын алу:

```javascript
const tweens = gsap.getTweensOf(".box");
tweens.forEach((tween) => tween.pause());
```

## killTweensOf()

Элементтің анимацияларын жою:

```javascript
gsap.killTweensOf(".box"); // .box-тың барлық анимациясын жою
```

## Кеңес

Timeline-ды `paused: true` арқылы құрып, оқиғаларға (click, hover, scroll) байлау — ең жақсы тәжірибе. Бұл анимацияны толық бақылауға мүмкіндік береді.

## Келесі қадам

[ScrollTrigger кіріспе](/docs/scrolltrigger/kirisspe) — скролл арқылы анимациялар.
