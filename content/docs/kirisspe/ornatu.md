---
title: GSAP орнату
description: GSAP кітапханасын жобаға орнату әдістері
---

# GSAP орнату

GSAP-ты жобаңызға бірнеше жолмен қосуға болады.

## NPM арқылы орнату (ұсынылады)

```bash
npm install gsap
```

Содан кейін JavaScript файлында импорттаңыз:

```javascript
import gsap from "gsap";
```

## CDN арқылы қосу

HTML файлыңызға мына тегті қосыңыз:

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@latest/dist/gsap.min.js"></script>
```

## PNPM немесе Yarn

```bash
# PNPM
pnpm add gsap

# Yarn
yarn add gsap
```

## Плагиндерді орнату

GSAP-тың көптеген плагиндері бар. Мысалы, ScrollTrigger:

```bash
npm install gsap
```

```javascript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Плагинді тіркеу
gsap.registerPlugin(ScrollTrigger);
```

## Тексеру

Орнатудың дұрыстығын тексеру үшін консольге мынаны жазыңыз:

```javascript
console.log(gsap.version);
// Консольде GSAP нұсқа нөмірі шығуы керек
```

## Келесі қадам

Орнаттыңыз ба? Керемет! Енді [алғашқы анимацияңызды](/docs/kirisspe/algashky-animatsiya) жасайық.
