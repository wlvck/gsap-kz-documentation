---
title: Ease түрлері
description: GSAP-тағы барлық ease түрлерінің толық тізімі мен сипаттамасы
---

# Ease түрлері

GSAP-та көптеген ease түрлері бар. Бұл бетте олардың барлығын қарастырамыз.

## Power (Қуат)

Ең көп қолданылатын ease түрі. Сан қаншалықты үлкен болса, соғұрлым қисық күштірек.

```javascript
// power1 = quad (квадрат)
gsap.to(".box", { x: 200, ease: "power1.out" });

// power2 = cubic (куб)
gsap.to(".box", { x: 200, ease: "power2.out" });

// power3 = quart (4-дәреже)
gsap.to(".box", { x: 200, ease: "power3.out" });

// power4 = quint (5-дәреже)
gsap.to(".box", { x: 200, ease: "power4.out" });
```

### Бағыттары

```javascript
ease: "power2.in"; // Баяу бастап, жылдам аяқтау
ease: "power2.out"; // Жылдам бастап, баяу аяқтау
ease: "power2.inOut"; // Баяу бастап, баяу аяқтау
```

## Back (Артқа)

Элемент мақсаттан асып кетіп, қайта оралады.

```javascript
// Әдепкі күшпен
gsap.to(".box", { x: 200, ease: "back.out" });

// Күшті өзгерту (әдепкі: 1.7)
gsap.to(".box", { x: 200, ease: "back.out(2.5)" });
gsap.to(".box", { x: 200, ease: "back.out(1)" }); // жұмсақ
gsap.to(".box", { x: 200, ease: "back.out(3)" }); // күшті
```

### Бағыттары

```javascript
ease: "back.in"; // Бастауда артқа кету
ease: "back.out"; // Аяғында асып кету
ease: "back.inOut"; // Екі жақта да
```

## Bounce (Серпу)

Доп секіргендей эффект.

```javascript
gsap.to(".box", {
  y: 300,
  ease: "bounce.out",
});
```

### Бағыттары

```javascript
ease: "bounce.in"; // Бастауда секіру
ease: "bounce.out"; // Аяғында секіру (ең көп қолданылады)
ease: "bounce.inOut"; // Екі жақта да
```

## Elastic (Серпімді)

Резеңке сияқты созылу эффекті.

```javascript
// Әдепкі
gsap.to(".box", { x: 200, ease: "elastic.out" });

// Параметрлермен
gsap.to(".box", {
  x: 200,
  ease: "elastic.out(1, 0.3)",
  // amplitude (1) — тербеліс биіктігі
  // period (0.3) — тербеліс жиілігі
});
```

### Кеңестер

```javascript
ease: "elastic.out(1, 0.5)"; // Баяу тербеліс
ease: "elastic.out(1, 0.1)"; // Жылдам тербеліс
ease: "elastic.out(2, 0.3)"; // Күшті тербеліс
```

## Circ (Дөңгелек)

Дөңгелек қисық, тегіс қозғалыс.

```javascript
gsap.to(".box", { x: 200, ease: "circ.out" });
```

### Бағыттары

```javascript
ease: "circ.in";
ease: "circ.out";
ease: "circ.inOut";
```

## Expo (Экспоненциалды)

Өте күшті жеделдету. `power4`-тен де күштірек.

```javascript
gsap.to(".box", { x: 200, ease: "expo.out" });
```

### Бағыттары

```javascript
ease: "expo.in"; // Өте баяу бастау
ease: "expo.out"; // Өте баяу аяқтау
ease: "expo.inOut"; // Екеуі де
```

## Sine (Синус)

Ең жұмсақ, табиғи ease. Сызықтыққа жақын.

```javascript
gsap.to(".box", { x: 200, ease: "sine.out" });
```

### Бағыттары

```javascript
ease: "sine.in";
ease: "sine.out";
ease: "sine.inOut"; // Өте жұмсақ, тыныс алу сияқты
```

## None / Linear (Сызықтық)

Жеделдетусіз, бірқалыпты жылдамдық.

```javascript
gsap.to(".box", { x: 200, ease: "none" });
// немесе
gsap.to(".box", { x: 200, ease: "linear" });
```

### Қолданылуы

- Прогресс барлар
- Шексіз айналу
- Скролл анимация (scrub)
- Чарт анимациялары

## Steps (Қадамдар)

Дискретті қадамдармен жүру.

```javascript
gsap.to(".box", {
  x: 200,
  ease: "steps(5)", // 5 қадамда жету
});
```

### Параметрлер

```javascript
ease: "steps(10)"; // 10 қадам
ease: "steps(4, start)"; // қадам басында
ease: "steps(4, end)"; // қадам соңында
```

## Slow

Ортасында баяулау эффекті.

```javascript
gsap.to(".box", {
  x: 200,
  ease: "slow(0.7, 0.7, false)",
  // linearRatio — сызықты бөлім ұзындығы
  // power — жеделдету күші
  // yoyoMode — yoyo режимі
});
```

## Rough

Кездейсоқ тербелістер.

```javascript
gsap.to(".box", {
  x: 200,
  ease: "rough({strength: 1, points: 20})",
});
```

## Интерактивті салыстыру

Барлық ease түрлерін интерактивті түрде салыстырыңыз:

::EasingVisualizer{ease="power2.out" showControls showComparison}
::

## Салыстыру кестесі

| Ease      | Күш         | Қолданылуы              |
| --------- | ----------- | ----------------------- |
| `sine`    | Өте жұмсақ  | Фон, ұзақ анимация      |
| `power1`  | Жұмсақ      | Жалпы мақсат            |
| `power2`  | Орташа      | UI элементтері (ең көп) |
| `power3`  | Күшті       | Назар аудару            |
| `power4`  | Өте күшті   | Драматикалық эффект     |
| `expo`    | Экстремалды | Арнайы эффекттер        |
| `back`    | Артқа кету  | Модал, tooltip          |
| `bounce`  | Секіру      | Назар аудару, ойындар   |
| `elastic` | Тербеліс    | Интерактивті элементтер |

## Келесі қадам

[Custom Ease](/docs/easing/custom) — өзіңіздің ease функцияңызды жасау.
