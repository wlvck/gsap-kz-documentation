---
title: gsap.to()
description: GSAP-тың негізгі әдісі - элементтерді қазіргі күйінен мақсатты күйге анимациялау
---

# gsap.to()

**gsap.to()** — GSAP-тың ең көп қолданылатын әдісі. Ол элементті қазіргі күйінен сіз көрсеткен мақсатты күйге анимациялайды.

## Негізгі синтаксис

```javascript
gsap.to(target, vars);
```

- **target** — анимацияланатын элемент (CSS селектор, DOM элемент, немесе объект)
- **vars** — анимация параметрлері (қасиеттер, ұзақтық, т.б.)

## Қарапайым мысалдар

### Элементті жылжыту

```javascript
// .box элементін оңға 200px жылжыту
gsap.to(".box", {
  x: 200,
  duration: 1,
});
```

### Түсін өзгерту

```javascript
// Фон түсін қызылға өзгерту
gsap.to(".box", {
  backgroundColor: "#ff0000",
  duration: 0.5,
});
```

### Бірнеше қасиетті бірден өзгерту

```javascript
gsap.to(".box", {
  x: 200,
  y: 100,
  rotation: 360,
  scale: 1.5,
  opacity: 0.5,
  duration: 2,
});
```

## Target түрлері

### CSS селектор

```javascript
gsap.to(".my-class", { x: 100 });
gsap.to("#my-id", { x: 100 });
gsap.to("div", { x: 100 }); // барлық div элементтері
```

### DOM элемент

```javascript
const element = document.querySelector(".box");
gsap.to(element, { x: 100 });
```

### Элементтер массиві

```javascript
const boxes = document.querySelectorAll(".box");
gsap.to(boxes, { x: 100 }); // барлығы бірдей анимацияланады
```

### JavaScript объектісі

```javascript
const obj = { value: 0 };
gsap.to(obj, {
  value: 100,
  duration: 1,
  onUpdate: () => console.log(obj.value),
});
```

## Маңызды параметрлер

| Параметр   | Сипаттама                     | Мысал                |
| ---------- | ----------------------------- | -------------------- |
| `duration` | Анимация ұзақтығы (секундпен) | `duration: 2`        |
| `delay`    | Бастамас бұрын кідіру         | `delay: 0.5`         |
| `ease`     | Жеделдету функциясы           | `ease: "power2.out"` |
| `repeat`   | Қайталау саны (-1 = шексіз)   | `repeat: 3`          |
| `yoyo`     | Кері анимация                 | `yoyo: true`         |

## Қайтарылатын мән

`gsap.to()` Tween объектісін қайтарады, оны басқаруға болады:

```javascript
const tween = gsap.to(".box", { x: 200, duration: 2 });

// Кейінірек:
tween.pause(); // тоқтату
tween.play(); // жалғастыру
tween.reverse(); // кері бағытта ойнату
tween.kill(); // жою
```

## Stagger — бірнеше элементті кезектеп анимациялау

```javascript
gsap.to(".box", {
  x: 200,
  duration: 1,
  stagger: 0.2, // әр элемент 0.2 секунд кешігумен басталады
});
```

## Келесі қадам

[gsap.from()](/docs/negizderi/gsap-from) әдісімен танысыңыз — элементтерді белгілі бір күйден қазіргі күйге анимациялау.
