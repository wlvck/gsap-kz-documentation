---
title: Қасиеттер
description: GSAP анимациясында қолданылатын барлық қасиеттер мен параметрлер
---

# Қасиеттер

GSAP-та анимациялауға болатын қасиеттер мен анимацияны басқару параметрлері бар. Осы бетте олардың барлығын қарастырамыз.

## Transform қасиеттері

GSAP transform қасиеттерін қысқартылған түрде жазуға мүмкіндік береді:

| GSAP қасиеті | CSS эквиваленті |
| ------------ | --------------- |
| `x`          | `translateX()`  |
| `y`          | `translateY()`  |
| `z`          | `translateZ()`  |
| `rotation`   | `rotate()`      |
| `rotationX`  | `rotateX()`     |
| `rotationY`  | `rotateY()`     |
| `scale`      | `scale()`       |
| `scaleX`     | `scaleX()`      |
| `scaleY`     | `scaleY()`      |
| `skewX`      | `skewX()`       |
| `skewY`      | `skewY()`       |

### Transform мысалдары

```javascript
gsap.to(".box", {
  x: 100, // 100px оңға
  y: 50, // 50px төмен
  rotation: 45, // 45 градус бұру
  scale: 1.5, // 1.5 есе үлкейту
  duration: 1,
});
```

### Бірліктер

```javascript
gsap.to(".box", {
  x: 100, // әдепкі: пиксель
  x: "100px", // пиксель
  x: "10%", // пайыз
  x: "5rem", // rem
  x: "10vw", // viewport width
});
```

## CSS қасиеттері

Кез келген CSS қасиетін анимациялауға болады:

```javascript
gsap.to(".box", {
  // Өлшемдер
  width: 200,
  height: 100,
  padding: 20,
  margin: 10,
  borderRadius: 50,

  // Түстер
  backgroundColor: "#ff0000",
  color: "#ffffff",
  borderColor: "#00ff00",

  // Басқалар
  opacity: 0.5,
  boxShadow: "0 10px 20px rgba(0,0,0,0.3)",

  duration: 1,
});
```

### CamelCase қолдану

CSS қасиеттерін camelCase форматында жазу керек:

| CSS                | GSAP              |
| ------------------ | ----------------- |
| `background-color` | `backgroundColor` |
| `font-size`        | `fontSize`        |
| `border-radius`    | `borderRadius`    |
| `box-shadow`       | `boxShadow`       |

## Арнайы қасиеттер

### autoAlpha

`opacity` + `visibility` бірге:

```javascript
gsap.to(".box", {
  autoAlpha: 0, // opacity: 0 + visibility: hidden
});

gsap.to(".box", {
  autoAlpha: 1, // opacity: 1 + visibility: visible
});
```

### transformOrigin

Трансформация орталығын өзгерту:

```javascript
gsap.to(".box", {
  rotation: 360,
  transformOrigin: "top left", // жоғарғы сол бұрыш
  // transformOrigin: "center",   // орталық (әдепкі)
  // transformOrigin: "50% 100%", // төменгі орталық
});
```

## Анимация параметрлері

### duration

Анимация ұзақтығы (секундпен):

```javascript
gsap.to(".box", {
  x: 200,
  duration: 2, // 2 секунд
});
```

### delay

Анимация басталмас бұрын кідіру:

```javascript
gsap.to(".box", {
  x: 200,
  delay: 1, // 1 секунд күтіп, содан кейін бастау
});
```

### ease

Жеделдету функциясы:

```javascript
gsap.to(".box", {
  x: 200,
  duration: 1,
  ease: "power2.out", // баяу аяқталу
  // ease: "power2.in",   // баяу бастау
  // ease: "power2.inOut", // баяу бастау және аяқтау
  // ease: "bounce.out",  // серпілу эффекті
  // ease: "elastic.out", // серпімді эффект
});
```

### repeat

Қайталау саны:

```javascript
gsap.to(".box", {
  x: 200,
  repeat: 3, // 3 рет қайталау (барлығы 4 рет ойналады)
  repeat: -1, // шексіз қайталау
});
```

### yoyo

Кері анимация (repeat-пен бірге):

```javascript
gsap.to(".box", {
  x: 200,
  repeat: -1,
  yoyo: true, // алға-артқа ойнау
});
```

### repeatDelay

Қайталаулар арасындағы кідіру:

```javascript
gsap.to(".box", {
  x: 200,
  repeat: 3,
  repeatDelay: 0.5, // әр қайталау алдында 0.5 секунд күту
});
```

## Stagger параметрі

Бірнеше элементті кезектеп анимациялау:

### Қарапайым stagger

```javascript
gsap.to(".box", {
  x: 200,
  stagger: 0.2, // әр элемент 0.2 секунд кешігумен
});
```

### Stagger объектісі

```javascript
gsap.to(".box", {
  x: 200,
  stagger: {
    each: 0.2, // әр элемент арасындағы уақыт
    from: "center", // ортадан бастау
    // from: "end",  // соңынан бастау
    // from: "edges", // шеттерден бастау
    // from: 5,      // 5-ші элементтен бастау
    grid: "auto", // grid layout үшін
    axis: "x", // тек x осі бойынша
  },
});
```

## overwrite параметрі

Бір элементке бірнеше анимация қолданғанда:

```javascript
gsap.to(".box", {
  x: 200,
  overwrite: true, // барлық басқа анимацияларды жою
  // overwrite: "auto", // қақтығысатындарды ғана жою
});
```

## Келесі қадам

[Callbacks](/docs/negizderi/callbacks) — анимация оқиғаларына реакция жасау.
