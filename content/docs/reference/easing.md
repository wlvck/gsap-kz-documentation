---
title: Easing анықтамалық
description: GSAP-тың барлық easing функцияларының толық тізімі
---

# Easing анықтамалық

GSAP-тағы барлық easing функцияларының толық анықтамасы мен визуалды мысалдары.

## Easing түрлері

GSAP-та 4 негізгі easing модификаторы бар:

| Модификатор | Сипаттама                       | Қолдану                 |
| ----------- | ------------------------------- | ----------------------- |
| `.in`       | Баяу басталып, жылдам аяқталады | Элемент кетіп жатқанда  |
| `.out`      | Жылдам басталып, баяу аяқталады | Элемент келіп жатқанда  |
| `.inOut`    | Баяу бастау және аяқтау         | Бір жерден екінші жерге |

## Стандартты Easing

### none / linear

```javascript
gsap.to(".box", {
  x: 100,
  ease: "none", // немесе "linear"
});
```

Сызықтық қозғалыс, жеделдету жоқ.

### power1 (Quad)

```javascript
// Жеңіл жеделдету
gsap.to(".box", { x: 100, ease: "power1.in" });
gsap.to(".box", { x: 100, ease: "power1.out" });
gsap.to(".box", { x: 100, ease: "power1.inOut" });
```

Әдепкі, табиғи қозғалыс үшін жақсы.

### power2 (Cubic)

```javascript
// Орташа жеделдету
gsap.to(".box", { x: 100, ease: "power2.in" });
gsap.to(".box", { x: 100, ease: "power2.out" }); // Әдепкі
gsap.to(".box", { x: 100, ease: "power2.inOut" });
```

Көп жағдайда қолданылады, табиғи көрінеді.

### power3 (Quart)

```javascript
// Күшті жеделдету
gsap.to(".box", { x: 100, ease: "power3.in" });
gsap.to(".box", { x: 100, ease: "power3.out" });
gsap.to(".box", { x: 100, ease: "power3.inOut" });
```

Айқын жеделдету эффектісі.

### power4 (Quint)

```javascript
// Өте күшті жеделдету
gsap.to(".box", { x: 100, ease: "power4.in" });
gsap.to(".box", { x: 100, ease: "power4.out" });
gsap.to(".box", { x: 100, ease: "power4.inOut" });
```

Драматикалық эффект үшін.

## Арнайы Easing

### back

```javascript
// Артқа серпіліп, алға қозғалады
gsap.to(".box", { x: 100, ease: "back.in" });
gsap.to(".box", { x: 100, ease: "back.out" });
gsap.to(".box", { x: 100, ease: "back.inOut" });

// Күш параметрі (әдепкі: 1.7)
gsap.to(".box", { x: 100, ease: "back.out(3)" });
```

Серпімді эффект, меню және модалдар үшін жақсы.

### elastic

```javascript
// Резеңке сияқты серпімді
gsap.to(".box", { x: 100, ease: "elastic.in" });
gsap.to(".box", { x: 100, ease: "elastic.out" });
gsap.to(".box", { x: 100, ease: "elastic.inOut" });

// amplitude және period параметрлері
gsap.to(".box", {
  x: 100,
  ease: "elastic.out(1, 0.3)", // amplitude, period
});
```

Серпімді анимациялар үшін.

### bounce

```javascript
// Допты секіргендей
gsap.to(".box", { y: 100, ease: "bounce.in" });
gsap.to(".box", { y: 100, ease: "bounce.out" });
gsap.to(".box", { y: 100, ease: "bounce.inOut" });
```

Түсіп жатқан объекттер үшін.

### circ

```javascript
// Шеңбер қисығы
gsap.to(".box", { x: 100, ease: "circ.in" });
gsap.to(".box", { x: 100, ease: "circ.out" });
gsap.to(".box", { x: 100, ease: "circ.inOut" });
```

Жұмсақ, табиғи қозғалыс.

### expo

```javascript
// Экспоненциалды
gsap.to(".box", { x: 100, ease: "expo.in" });
gsap.to(".box", { x: 100, ease: "expo.out" });
gsap.to(".box", { x: 100, ease: "expo.inOut" });
```

Өте күшті эффект, баяу-жылдам.

### sine

```javascript
// Синус қисығы
gsap.to(".box", { x: 100, ease: "sine.in" });
gsap.to(".box", { x: 100, ease: "sine.out" });
gsap.to(".box", { x: 100, ease: "sine.inOut" });
```

Ең жұмсақ easing, табиғи қозғалыс.

## steps() — Қадамдық

```javascript
// Қадамдармен анимация (sprite sheet сияқты)
gsap.to(".box", {
  x: 100,
  ease: "steps(10)", // 10 қадам
});

// Соңғы қадамсыз
gsap.to(".box", {
  x: 100,
  ease: "steps(5, end)",
});
```

Спрайт анимациялары және дискретті қозғалыс үшін.

## slow()

```javascript
// Ортасында баяулайды
gsap.to(".box", {
  x: 100,
  ease: "slow(0.7, 0.7, false)",
  // linearRatio, power, yoyoMode
});
```

## rough()

```javascript
// Кездейсоқ тербеліс
gsap.to(".box", {
  x: 100,
  ease: "rough({
    template: power1.inOut,
    strength: 1,
    points: 20,
    taper: 'both',
    randomize: true,
    clamp: false
  })",
});
```

Табиғи, кездейсоқ эффекттер үшін.

## CustomEase (Club)

```javascript
// Өз easing функциясын жасау
CustomEase.create("myEase", "M0,0 C0.25,0.1 0.25,1 1,1");

gsap.to(".box", {
  x: 100,
  ease: "myEase",
});
```

SVG path синтаксисімен кез келген қисық жасау.

## Easing салыстыру

### Жұмсақ анимациялар үшін

```javascript
// Ең жақсы таңдаулар
ease: "sine.out"; // Өте жұмсақ
ease: "power1.out"; // Жұмсақ
ease: "circ.out"; // Табиғи
```

### Энергиялы анимациялар үшін

```javascript
// Динамикалық эффекттер
ease: "back.out(1.7)"; // Серпілу
ease: "elastic.out(1, 0.3)"; // Резеңке
ease: "bounce.out"; // Секіру
```

### UI элементтер үшін

```javascript
// Меню, модалдар
ease: "power2.out"; // Стандарт
ease: "power3.out"; // Айқынырақ
ease: "back.out(1.5)"; // Қызықты
```

### Scroll анимациялар үшін

```javascript
// Parallax, scrub
ease: "none"; // Сызықтық
ease: "power1.inOut"; // Жұмсақ
ease: "sine.inOut"; // Өте жұмсақ
```

## Практикалық мысалдар

### Модал терезе

```javascript
// Ашу
gsap.from(".modal", {
  scale: 0.8,
  opacity: 0,
  ease: "back.out(1.7)",
  duration: 0.4,
});

// Жабу
gsap.to(".modal", {
  scale: 0.9,
  opacity: 0,
  ease: "power2.in",
  duration: 0.25,
});
```

### Түйме hover

```javascript
// Hover in
gsap.to(".button", {
  scale: 1.05,
  ease: "power2.out",
  duration: 0.2,
});

// Hover out
gsap.to(".button", {
  scale: 1,
  ease: "power1.out",
  duration: 0.3,
});
```

### Элемент түсіру

```javascript
gsap.from(".falling-item", {
  y: -200,
  ease: "bounce.out",
  duration: 1.5,
});
```

### Fade in

```javascript
gsap.from(".content", {
  opacity: 0,
  y: 30,
  ease: "power2.out",
  duration: 0.6,
});
```

### Серпімді қозғалыс

```javascript
gsap.to(".character", {
  x: 200,
  ease: "elastic.out(1, 0.5)",
  duration: 1,
});
```

## Easing таңдау кеңестері

| Жағдай              | Ұсынылатын Easing          |
| ------------------- | -------------------------- |
| Элемент пайда болу  | `power2.out`, `back.out`   |
| Элемент жоғалу      | `power2.in`, `power3.in`   |
| Hover эффект        | `power1.out`, `power2.out` |
| Scroll анимация     | `none`, `power1.inOut`     |
| Допт секіру         | `bounce.out`               |
| Серпімді элемент    | `elastic.out`, `back.out`  |
| Жұмсақ transition   | `sine.inOut`, `circ.inOut` |
| Драматикалық эффект | `expo.out`, `power4.out`   |

## Қорытынды

Дұрыс easing таңдау анимацияны табиғи және қызықты етеді. Көп жағдайда `power2.out` жақсы таңдау, бірақ контекстке байланысты басқа easing-тер қолданыңыз.
