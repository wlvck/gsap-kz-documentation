---
title: Custom Ease
description: GSAP-та өзіңіздің ease функциясын жасау әдістері
---

# Custom Ease

GSAP-та стандартты ease-тердің сыртында өзіңіздің ease функцияңызды жасауға болады.

## CustomEase плагині

**CustomEase** — GSAP Club GreenSock плагині. Ол SVG path немесе визуалды редактор арқылы ease жасауға мүмкіндік береді.

### Орнату

```bash
npm install gsap
```

```javascript
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
```

### SVG path арқылы

```javascript
// Ease жасау
CustomEase.create("myEase", "M0,0 C0.25,0.1 0.25,1 1,1");

// Қолдану
gsap.to(".box", {
  x: 200,
  ease: "myEase",
});
```

### Визуалды редактор

GreenSock-тың [Ease Visualizer](https://greensock.com/ease-visualizer/) құралын қолданыңыз. Онда қисықты визуалды түрде жасап, SVG path-ын көшіруге болады.

## Функция арқылы

Өзіңіздің ease функцияңызды жазуға болады:

```javascript
gsap.to(".box", {
  x: 200,
  ease: (progress) => {
    // progress: 0-ден 1-ге дейін
    // return: 0-ден 1-ге дейін (шығыс мәні)
    return progress * progress; // power1.in сияқты
  },
});
```

### Мысалдар

```javascript
// Сызықтық (linear)
ease: (p) => p;

// Квадрат (power1.in)
ease: (p) => p * p;

// Квадрат кері (power1.out)
ease: (p) => 1 - Math.pow(1 - p, 2);

// Синус
ease: (p) => Math.sin((p * Math.PI) / 2);

// Секіру (қарапайым)
ease: (p) => {
  const n = 7.5625;
  const d = 2.75;
  if (p < 1 / d) return n * p * p;
  if (p < 2 / d) return n * (p -= 1.5 / d) * p + 0.75;
  if (p < 2.5 / d) return n * (p -= 2.25 / d) * p + 0.9375;
  return n * (p -= 2.625 / d) * p + 0.984375;
};
```

## Бар ease-ті өзгерту

### Конфигурация арқылы

Кейбір ease-терде параметрлерді өзгертуге болады:

```javascript
// Back
ease: "back.out(2.5)"; // күштілік (әдепкі: 1.7)

// Elastic
ease: "elastic.out(1, 0.5)"; // amplitude, period

// Steps
ease: "steps(10)"; // қадам саны

// Slow
ease: "slow(0.7, 0.7, false)";
```

### CustomEase.getSVGData()

Бар ease-тің SVG path-ын алу:

```javascript
const pathData = CustomEase.getSVGData("power2.out", {
  width: 200,
  height: 100,
});
```

## Ease қосу және сақтау

### Тіркеу

```javascript
// Жаңа ease жасау және тіркеу
CustomEase.create("superBounce", "M0,0 C0,0 0.2,1 0.4,1 ...");

// Енді кез келген жерде қолдануға болады
gsap.to(".box", { x: 200, ease: "superBounce" });
gsap.to(".circle", { y: 100, ease: "superBounce" });
```

### gsap.parseEase()

Ease string-ін функцияға айналдыру:

```javascript
const easeFunc = gsap.parseEase("power2.out");

// Енді функция ретінде қолдануға болады
const value = easeFunc(0.5); // 0.75 (шамамен)
```

## SlowMo (арнайы плагин)

Ортасында баяулайтын ease:

```javascript
import { SlowMo } from "gsap/EasePack";
gsap.registerPlugin(SlowMo);

gsap.to(".box", {
  x: 200,
  ease: "slow(0.7, 0.7, false)",
});
```

## ExpoScaleEase

Скролл анимациялары үшін:

```javascript
import { ExpoScaleEase } from "gsap/EasePack";
gsap.registerPlugin(ExpoScaleEase);

gsap.to(".box", {
  x: 200,
  ease: "expoScale(1, 5)",
});
```

## RoughEase

Кездейсоқ, "дірілдеу" эффекті:

```javascript
import { RoughEase } from "gsap/EasePack";
gsap.registerPlugin(RoughEase);

gsap.to(".box", {
  x: 200,
  ease: "rough({strength: 1, points: 20, taper: 'out'})",
});
```

### Параметрлер

```javascript
ease: "rough({
  strength: 1,      // дірілдеу күші
  points: 20,       // нүктелер саны
  template: 'none', // негізгі ease
  taper: 'none',    // 'in', 'out', 'both', 'none'
  randomize: true,  // кездейсоқтық
  clamp: false      // 0-1 аралығында ұстау
})"
```

## Практикалық мысал

### "Тыныс алу" анимациясы

```javascript
// Тыныс алу сияқты жұмсақ масштабтау
CustomEase.create("breathe", "M0,0 C0.4,0 0.2,1 0.5,1 0.8,1 0.6,0 1,0");

gsap.to(".circle", {
  scale: 1.2,
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: "breathe",
});
```

### Жүрек соғысы

```javascript
gsap.to(".heart", {
  scale: 1.2,
  duration: 0.15,
  repeat: -1,
  ease: "power2.out",
  yoyo: true,
  repeatDelay: 0.6,
});
```

## Келесі қадам

[Timeline негіздері](/docs/timeline/negizderi) — анимациялар тізбегін құру.
