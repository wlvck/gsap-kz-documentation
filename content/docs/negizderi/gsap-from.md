---
title: gsap.from()
description: Элементтерді белгілі бір бастапқы күйден қазіргі күйге анимациялау
---

# gsap.from()

**gsap.from()** — элементті сіз көрсеткен бастапқы күйден оның қазіргі (түпнұсқа) күйіне анимациялайды. Бұл "кіру" анимациялары үшін өте ыңғайлы.

## Негізгі синтаксис

```javascript
gsap.from(target, vars);
```

## gsap.to() vs gsap.from()

| Әдіс          | Сипаттама                  |
| ------------- | -------------------------- |
| `gsap.to()`   | Қазіргі күй → Мақсат күй   |
| `gsap.from()` | Бастапқы күй → Қазіргі күй |

## Қарапайым мысалдар

### Элементті сол жақтан әкелу

```javascript
// Элемент сол жақтан (x: -200) қазіргі орнына келеді
gsap.from(".box", {
  x: -200,
  duration: 1,
});
```

### Fade-in эффекті

```javascript
// Элемент көрінбейтін күйден (opacity: 0) пайда болады
gsap.from(".box", {
  opacity: 0,
  duration: 0.5,
});
```

### Масштабтау арқылы пайда болу

```javascript
// Элемент кішкентай күйден (scale: 0) қалыпты өлшемге өседі
gsap.from(".box", {
  scale: 0,
  duration: 0.5,
  ease: "back.out",
});
```

## Кіру анимациялары

`gsap.from()` кіру анимациялары үшін өте қолайлы:

### Төменнен сырғып шығу

```javascript
gsap.from(".card", {
  y: 50,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
});
```

### Бірнеше элементті кезектеп көрсету

```javascript
gsap.from(".list-item", {
  y: 30,
  opacity: 0,
  duration: 0.5,
  stagger: 0.1, // әр элемент 0.1 секунд аралықпен
});
```

## immediateRender параметрі

Әдепкі бойынша `gsap.from()` бірден бастапқы күйді қолданады. Мұны өзгерту үшін:

```javascript
gsap.from(".box", {
  x: -200,
  immediateRender: false, // delay біткенге дейін күту
  delay: 1,
});
```

## Практикалық мысал: Навбар анимациясы

```javascript
// Навбар элементтерін жоғарыдан әкелу
gsap.from(".nav-item", {
  y: -20,
  opacity: 0,
  duration: 0.4,
  stagger: 0.1,
  ease: "power2.out",
});
```

## Практикалық мысал: Hero секция

```javascript
// Тақырып
gsap.from(".hero-title", {
  y: 50,
  opacity: 0,
  duration: 1,
});

// Сипаттама (кешігумен)
gsap.from(".hero-description", {
  y: 30,
  opacity: 0,
  duration: 0.8,
  delay: 0.3,
});

// Батырма (тағы кешігумен)
gsap.from(".hero-button", {
  scale: 0.8,
  opacity: 0,
  duration: 0.5,
  delay: 0.6,
});
```

## Ескерту

`gsap.from()` қолданғанда элементтің CSS-тегі бастапқы стильдері маңызды. Анимация аяқталғанда элемент өзінің түпнұсқа CSS стильдеріне оралады.

## Келесі қадам

[gsap.fromTo()](/docs/negizderi/gsap-fromto) әдісімен танысыңыз — бастапқы және соңғы күйді бірге анықтау.
