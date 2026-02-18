---
title: Неге GSAP?
description: GSAP-ты таңдаудың негізгі себептері
---

# Неге GSAP?

Веб-анимациялар үшін көптеген құралдар бар: CSS animations, Web Animations API, anime.js, Framer Motion және т.б. Неге GSAP таңдау керек?

## 1. Өнімділік

GSAP — ең жылдам JavaScript анимация кітапханасы. Ол:

- **requestAnimationFrame** оңтайлы пайдаланады
- **GPU acceleration** қолдайды
- **60 FPS** қамтамасыз етеді

```javascript
// Мыңдаған элементті бірдей анимациялау
gsap.to(".particle", {
  x: "random(-500, 500)",
  y: "random(-500, 500)",
  duration: 2,
  stagger: 0.01
});
```

## 2. Кроссбраузерлік

GSAP барлық браузерлерде бірдей жұмыс істейді:
- Chrome, Firefox, Safari, Edge
- iOS Safari, Android Chrome
- Тіпті IE11 (ескі жобалар үшін)

## 3. Қуатты мүмкіндіктер

### Timeline
Күрделі анимация тізбектерін оңай құру:

```javascript
const tl = gsap.timeline();

tl.to(".box1", { x: 100 })
  .to(".box2", { y: 100 })
  .to(".box3", { rotation: 360 });
```

### ScrollTrigger
Скролл негізіндегі анимациялар:

```javascript
gsap.to(".element", {
  scrollTrigger: ".element",
  x: 500,
  duration: 3
});
```

### Плагиндер
- **MorphSVG** — SVG формаларын морфтау
- **DrawSVG** — SVG сызу анимациясы
- **SplitText** — мәтінді әріптерге бөлу
- **Draggable** — сүйреу функционалы

## 4. Қарапайым API

```javascript
// CSS
.box {
  animation: move 2s ease-in-out;
}
@keyframes move {
  to { transform: translateX(200px); }
}

// GSAP — әлдеқайда қарапайым
gsap.to(".box", { x: 200, duration: 2, ease: "power2.inOut" });
```

## 5. Толық бақылау

```javascript
const anim = gsap.to(".box", { x: 200, duration: 2 });

// Кез келген уақытта бақылау
anim.pause();      // тоқтату
anim.play();       // жалғастыру
anim.reverse();    // кері айналдыру
anim.progress(0.5); // 50%-ға өту
anim.timeScale(2); // 2x жылдамдату
```

## 6. Қауымдастық пен қолдау

- **10+ жыл** тәжірибе
- **Белсенді форум** — сұрақтарға жылдам жауап
- **Көптеген мысалдар** — CodePen-де мыңдаған демо
- **Жақсы құжаттама** — толық және түсінікті

## Кім қолданады?

GSAP-ты әлемдегі ең үздік компаниялар қолданады:
- Google
- Netflix
- Apple
- Microsoft
- Nike
- BMW
- және тағы көптеген...

## Келесі қадам

GSAP-тың артықшылықтарымен таныстыңыз. Енді [негізгі әдістерді](/docs/negizderi/gsap-to) үйренуге көшейік!
