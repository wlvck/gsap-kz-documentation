---
title: gsap.utils
description: GSAP утилита функциялары - көмекші әдістер жиынтығы
---

# gsap.utils

**gsap.utils** — анимациялар құру кезінде пайдалы көмекші функциялар жиынтығы.

## toArray()

Селекторды массивке түрлендіру:

```javascript
// NodeList-ті массивке
const boxes = gsap.utils.toArray(".box");

// Енді массив әдістерін қолдануға болады
boxes.forEach((box, i) => {
  gsap.to(box, { x: i * 100 });
});
```

## selector()

Скоп ішінде селектор:

```javascript
const container = document.querySelector(".container");
const q = gsap.utils.selector(container);

// Тек container ішіндегі элементтер
gsap.to(q(".box"), { x: 100 });
gsap.to(q(".title"), { opacity: 0 });
```

## clamp()

Мәнді аралыққа шектеу:

```javascript
const clampedValue = gsap.utils.clamp(0, 100, 150);
// Нәтиже: 100 (max-қа шектелді)

const clamped = gsap.utils.clamp(0, 100, -50);
// Нәтиже: 0 (min-ге шектелді)

// Қайта қолданылатын функция
const clamp0to100 = gsap.utils.clamp(0, 100);
clamp0to100(150); // 100
clamp0to100(-10); // 0
```

## mapRange()

Бір аралықты екіншіге сәйкестендіру:

```javascript
// 0-100 аралығын 0-1 аралығына
const mapped = gsap.utils.mapRange(0, 100, 0, 1, 50);
// Нәтиже: 0.5

// Қайта қолданылатын функция
const mapper = gsap.utils.mapRange(0, 100, 0, 1);
mapper(25); // 0.25
mapper(75); // 0.75
```

## normalize()

Мәнді 0-1 аралығына нормалдау:

```javascript
const normalized = gsap.utils.normalize(0, 500, 250);
// Нәтиже: 0.5

// Функция ретінде
const normalizer = gsap.utils.normalize(0, 500);
normalizer(100); // 0.2
```

## interpolate()

Екі мән арасында интерполяция:

```javascript
// Сандар
gsap.utils.interpolate(0, 100, 0.5); // 50

// Түстер
gsap.utils.interpolate("#ff0000", "#0000ff", 0.5); // күлгін түс

// Массивтер
gsap.utils.interpolate([0, 0], [100, 50], 0.5); // [50, 25]

// Объектілер
gsap.utils.interpolate({ x: 0, y: 0 }, { x: 100, y: 50 }, 0.5); // { x: 50, y: 25 }
```

## wrap()

Циклдік мән алу:

```javascript
const colors = ["red", "green", "blue"];
const getColor = gsap.utils.wrap(colors);

getColor(0); // "red"
getColor(1); // "green"
getColor(2); // "blue"
getColor(3); // "red" (қайта басталады)
getColor(4); // "green"

// Сандар үшін
const wrapNum = gsap.utils.wrap(0, 100);
wrapNum(150); // 50
wrapNum(-20); // 80
```

## wrapYoyo()

Yo-yo стилінде wrap:

```javascript
const wrapYoyo = gsap.utils.wrapYoyo(0, 100);
wrapYoyo(150); // 50 (кері)
wrapYoyo(250); // 50 (алға)
```

## snap()

Белгілі мәндерге snap:

```javascript
// Қадам бойынша
const snapTo10 = gsap.utils.snap(10);
snapTo10(23); // 20
snapTo10(27); // 30

// Массив бойынша
const snapToValues = gsap.utils.snap([0, 25, 50, 75, 100]);
snapToValues(30); // 25
snapToValues(60); // 50
```

## random()

Кездейсоқ мән алу:

```javascript
// Аралықта
gsap.utils.random(0, 100); // 0-100 арасында

// Массивтен
gsap.utils.random(["red", "green", "blue"]); // кездейсоқ түс

// Қадаммен
gsap.utils.random(0, 100, 10); // 0, 10, 20, ... 100

// Қайта қолданылатын
const randomColor = gsap.utils.random(["red", "green", "blue"], true);
randomColor(); // әр шақырғанда кездейсоқ
```

## shuffle()

Массивті араластыру:

```javascript
const arr = [1, 2, 3, 4, 5];
gsap.utils.shuffle(arr);
// arr енді араласқан
```

## distribute()

Мәндерді тарату:

```javascript
const values = gsap.utils.distribute({
  base: 0,
  amount: 100,
  ease: "power2.out",
});

// 5 элемент үшін
values(0, null, [1, 2, 3, 4, 5]); // бірінші элемент
values(4, null, [1, 2, 3, 4, 5]); // соңғы элемент
```

## pipe()

Функцияларды тізбектеу:

```javascript
const transform = gsap.utils.pipe(
  gsap.utils.clamp(0, 100), // шектеу
  gsap.utils.snap(10), // snap
  (val) => val + "px" // format
);

transform(57); // "60px"
transform(150); // "100px"
```

## unitize()

Бірлік қосу:

```javascript
const addPx = gsap.utils.unitize(gsap.utils.clamp(0, 100), "px");
addPx(50); // "50px"
addPx(150); // "100px"
```

## Практикалық мысал

```javascript
// Прогресс барды скролл позициясына байланысты жаңарту
const progress = gsap.utils.pipe(
  gsap.utils.clamp(0, 1),
  (val) => val * 100,
  gsap.utils.snap(1),
  (val) => val + "%"
);

window.addEventListener("scroll", () => {
  const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  progressBar.style.width = progress(scrollProgress);
});
```

## Келесі қадам

[gsap.context()](/docs/utilitalar/context) — анимацияларды топтау және тазалау.
