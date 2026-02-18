---
title: GSAP қасиеттері
description: GSAP-тың барлық қасиеттерінің толық тізімі
---

# GSAP қасиеттері

GSAP-та анимациялауға болатын барлық қасиеттердің толық анықтамасы.

## Transform қасиеттері

### Позиция

| Қасиет     | Түрі          | Сипаттама                     | Мысал                      |
| ---------- | ------------- | ----------------------------- | -------------------------- |
| `x`        | Number/String | Көлденең жылжу (translateX)   | `x: 100` немесе `x: "50%"` |
| `y`        | Number/String | Тік жылжу (translateY)        | `y: 100` немесе `y: "50%"` |
| `z`        | Number        | Тереңдік жылжу (translateZ)   | `z: 100`                   |
| `xPercent` | Number        | Элемент енінің пайызымен      | `xPercent: 50`             |
| `yPercent` | Number        | Элемент биіктігінің пайызымен | `yPercent: -100`           |

### Масштаб

| Қасиет   | Түрі   | Сипаттама             | Мысал         |
| -------- | ------ | --------------------- | ------------- |
| `scale`  | Number | Екі бағытта масштаб   | `scale: 1.5`  |
| `scaleX` | Number | Көлденең масштаб      | `scaleX: 2`   |
| `scaleY` | Number | Тік масштаб           | `scaleY: 0.5` |
| `scaleZ` | Number | Тереңдік масштаб (3D) | `scaleZ: 1.2` |

### Айналу

| Қасиет      | Түрі   | Сипаттама              | Мысал            |
| ----------- | ------ | ---------------------- | ---------------- |
| `rotation`  | Number | Z осі бойынша (градус) | `rotation: 45`   |
| `rotationX` | Number | X осі бойынша (3D)     | `rotationX: 180` |
| `rotationY` | Number | Y осі бойынша (3D)     | `rotationY: 90`  |
| `rotationZ` | Number | rotation-мен бірдей    | `rotationZ: 45`  |

### Қисық (Skew)

| Қасиет  | Түрі   | Сипаттама                | Мысал        |
| ------- | ------ | ------------------------ | ------------ |
| `skewX` | Number | X бойынша қисық (градус) | `skewX: 20`  |
| `skewY` | Number | Y бойынша қисық (градус) | `skewY: -10` |

### Transform origin

| Қасиет                 | Түрі   | Сипаттама             | Мысал                         |
| ---------------------- | ------ | --------------------- | ----------------------------- |
| `transformOrigin`      | String | Трансформация нүктесі | `transformOrigin: "top left"` |
| `svgOrigin`            | String | SVG үшін origin       | `svgOrigin: "100 50"`         |
| `transformPerspective` | Number | 3D перспектива        | `transformPerspective: 500`   |

## CSS қасиеттері

### Түстер

| Қасиет            | Түрі   | Сипаттама   | Мысал                            |
| ----------------- | ------ | ----------- | -------------------------------- |
| `color`           | String | Мәтін түсі  | `color: "#ff0000"`               |
| `backgroundColor` | String | Фон түсі    | `backgroundColor: "blue"`        |
| `borderColor`     | String | Жиек түсі   | `borderColor: "rgba(0,0,0,0.5)"` |
| `fill`            | String | SVG толтыру | `fill: "#0ae448"`                |
| `stroke`          | String | SVG сызық   | `stroke: "white"`                |

### Өлшемдер

| Қасиет      | Түрі          | Сипаттама          | Мысал                              |
| ----------- | ------------- | ------------------ | ---------------------------------- |
| `width`     | Number/String | Ен                 | `width: 200` немесе `width: "50%"` |
| `height`    | Number/String | Биіктік            | `height: "auto"`                   |
| `minWidth`  | Number/String | Минималды ен       | `minWidth: 100`                    |
| `maxWidth`  | Number/String | Максималды ен      | `maxWidth: "100%"`                 |
| `minHeight` | Number/String | Минималды биіктік  | `minHeight: 50`                    |
| `maxHeight` | Number/String | Максималды биіктік | `maxHeight: 500`                   |

### Аралық (Spacing)

| Қасиет          | Түрі          | Сипаттама       | Мысал               |
| --------------- | ------------- | --------------- | ------------------- |
| `padding`       | Number/String | Ішкі аралық     | `padding: 20`       |
| `paddingTop`    | Number/String | Жоғарғы padding | `paddingTop: 10`    |
| `paddingRight`  | Number/String | Оң жақ padding  | `paddingRight: 15`  |
| `paddingBottom` | Number/String | Төменгі padding | `paddingBottom: 10` |
| `paddingLeft`   | Number/String | Сол жақ padding | `paddingLeft: 15`   |
| `margin`        | Number/String | Сыртқы аралық   | `margin: "0 auto"`  |
| `marginTop`     | Number/String | Жоғарғы margin  | `marginTop: 20`     |

### Жиектер (Border)

| Қасиет                | Түрі          | Сипаттама         | Мысал                      |
| --------------------- | ------------- | ----------------- | -------------------------- |
| `borderWidth`         | Number/String | Жиек қалыңдығы    | `borderWidth: 2`           |
| `borderRadius`        | Number/String | Дөңгелектеу       | `borderRadius: "50%"`      |
| `borderTopLeftRadius` | Number/String | Жоғарғы сол бұрыш | `borderTopLeftRadius: 10`  |
| `outline`             | String        | Контур            | `outline: "2px solid red"` |

### Көріну

| Қасиет       | Түрі   | Сипаттама       | Мысал                  |
| ------------ | ------ | --------------- | ---------------------- |
| `opacity`    | Number | Мөлдірлік (0-1) | `opacity: 0.5`         |
| `visibility` | String | Көріну          | `visibility: "hidden"` |
| `display`    | String | Дисплей режимі  | `display: "none"`      |
| `overflow`   | String | Толып кету      | `overflow: "hidden"`   |
| `zIndex`     | Number | Қабат реті      | `zIndex: 100`          |

### Тексттік қасиеттер

| Қасиет          | Түрі          | Сипаттама       | Мысал              |
| --------------- | ------------- | --------------- | ------------------ |
| `fontSize`      | Number/String | Қаріп өлшемі    | `fontSize: 24`     |
| `fontWeight`    | Number/String | Қаріп қалыңдығы | `fontWeight: 700`  |
| `lineHeight`    | Number/String | Жол биіктігі    | `lineHeight: 1.5`  |
| `letterSpacing` | Number/String | Әріп аралығы    | `letterSpacing: 2` |
| `textIndent`    | Number/String | Мәтін шегінісі  | `textIndent: 20`   |

### Позициялау

| Қасиет   | Түрі          | Сипаттама  | Мысал          |
| -------- | ------------- | ---------- | -------------- |
| `top`    | Number/String | Жоғарыдан  | `top: 0`       |
| `right`  | Number/String | Оң жақтан  | `right: "10%"` |
| `bottom` | Number/String | Төменнен   | `bottom: 20`   |
| `left`   | Number/String | Сол жақтан | `left: "50%"`  |

### Эффекттер

| Қасиет           | Түрі   | Сипаттама       | Мысал                                      |
| ---------------- | ------ | --------------- | ------------------------------------------ |
| `boxShadow`      | String | Қорап көлеңкесі | `boxShadow: "0 10px 20px rgba(0,0,0,0.3)"` |
| `textShadow`     | String | Мәтін көлеңкесі | `textShadow: "2px 2px 4px black"`          |
| `filter`         | String | CSS фильтр      | `filter: "blur(5px)"`                      |
| `backdropFilter` | String | Фон фильтрі     | `backdropFilter: "blur(10px)"`             |
| `clipPath`       | String | Қию контуры     | `clipPath: "circle(50%)"`                  |

## SVG қасиеттері

| Қасиет             | Түрі          | Сипаттама          | Мысал                     |
| ------------------ | ------------- | ------------------ | ------------------------- |
| `strokeWidth`      | Number        | Сызық қалыңдығы    | `strokeWidth: 3`          |
| `strokeDasharray`  | Number/String | Штрих үлгісі       | `strokeDasharray: "10 5"` |
| `strokeDashoffset` | Number        | Штрих ығысуы       | `strokeDashoffset: 100`   |
| `strokeLinecap`    | String        | Сызық ұшы          | `strokeLinecap: "round"`  |
| `strokeLinejoin`   | String        | Қосылу түрі        | `strokeLinejoin: "round"` |
| `fillOpacity`      | Number        | Толтыру мөлдірлігі | `fillOpacity: 0.5`        |
| `strokeOpacity`    | Number        | Сызық мөлдірлігі   | `strokeOpacity: 0.8`      |

## Арнайы қасиеттер

### Анимация параметрлері

| Қасиет            | Түрі            | Сипаттама          | Мысал                           |
| ----------------- | --------------- | ------------------ | ------------------------------- |
| `duration`        | Number          | Ұзақтық (секунд)   | `duration: 1`                   |
| `delay`           | Number          | Кідіріс (секунд)   | `delay: 0.5`                    |
| `ease`            | String/Function | Жеделдету          | `ease: "power2.out"`            |
| `repeat`          | Number          | Қайталау саны      | `repeat: 3` немесе `repeat: -1` |
| `repeatDelay`     | Number          | Қайталау кідірісі  | `repeatDelay: 0.5`              |
| `yoyo`            | Boolean         | Кері ойнату        | `yoyo: true`                    |
| `paused`          | Boolean         | Тоқтатылған бастау | `paused: true`                  |
| `reversed`        | Boolean         | Кері бағыт         | `reversed: true`                |
| `immediateRender` | Boolean         | Бірден render      | `immediateRender: false`        |
| `overwrite`       | String/Boolean  | Қайта жазу         | `overwrite: "auto"`             |

### Stagger

| Қасиет           | Түрі          | Сипаттама         | Мысал                            |
| ---------------- | ------------- | ----------------- | -------------------------------- |
| `stagger`        | Number/Object | Элементтер аралық | `stagger: 0.1`                   |
| `stagger.amount` | Number        | Жалпы уақыт       | `stagger: { amount: 1 }`         |
| `stagger.each`   | Number        | Әр элемент        | `stagger: { each: 0.1 }`         |
| `stagger.from`   | String/Number | Бастау нүктесі    | `stagger: { from: "center" }`    |
| `stagger.grid`   | Array         | Grid режимі       | `stagger: { grid: [5, 5] }`      |
| `stagger.axis`   | String        | Grid осі          | `stagger: { axis: "x" }`         |
| `stagger.ease`   | String        | Stagger easing    | `stagger: { ease: "power2.in" }` |

### Keyframes

```javascript
gsap.to(".box", {
  keyframes: [
    { x: 100, duration: 0.5 },
    { y: 50, duration: 0.3 },
    { rotation: 360, duration: 0.7 },
  ],
});

// Немесе пайызбен
gsap.to(".box", {
  keyframes: {
    "0%": { x: 0 },
    "50%": { x: 100, y: -50 },
    "100%": { x: 200, y: 0 },
  },
  duration: 2,
});
```

## Салыстырмалы мәндер

```javascript
// "+=" және "-=" — қосу/алу
gsap.to(".box", { x: "+=100" }); // 100 қосу
gsap.to(".box", { y: "-=50" }); // 50 алу

// Функция мәндер
gsap.to(".box", {
  x: (index, target, targets) => index * 100,
  rotation: () => Math.random() * 360,
});

// random()
gsap.to(".box", {
  x: "random(-100, 100)",
  y: "random([0, 50, 100])",
  rotation: "random(0, 360, 45)", // 45 қадаммен
});
```

## Арнайы мәндер

```javascript
// Auto мәні
gsap.to(".box", { height: "auto" });

// CSS variables
gsap.to(".box", {
  "--custom-property": 100,
});

// Snap
gsap.to(".box", {
  snap: { x: 50 }, // 50 қадаммен snap
});
```

## Қорытынды

GSAP барлық CSS қасиеттерін және арнайы transform қасиеттерін анимациялай алады. Transform қасиеттері (x, y, scale, rotation) GPU-да орындалады және жылдамырақ жұмыс істейді.
