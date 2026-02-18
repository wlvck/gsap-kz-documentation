---
title: GSAP Ticker
description: gsap.ticker арқылы frame-by-frame анимациялар мен синхронизация
---

# GSAP Ticker

`gsap.ticker` — GSAP-тың ішкі animation loop. Әр frame-де (әдетте 60fps) callback шақырады.

## Негізгі қолдану

```javascript
gsap.ticker.add((time, deltaTime, frame) => {
  // Әр frame-де орындалады
  console.log("Frame:", frame, "Delta:", deltaTime);
});
```

### Параметрлер

- `time` — Басталғаннан бергі жалпы уақыт (секунд)
- `deltaTime` — Алдыңғы frame-нан бергі уақыт (секунд)
- `frame` — Frame нөмірі

## Listener қосу/алу

```javascript
// Функция анықтау
function onTick(time, delta) {
  // Custom логика
}

// Қосу
gsap.ticker.add(onTick);

// Алып тастау
gsap.ticker.remove(onTick);
```

## once параметрі

Бір рет орындау:

```javascript
gsap.ticker.add(() => {
  console.log("Тек бір рет");
}, true); // true = once
```

## Практикалық мысалдар

### Custom анимация

```javascript
const ball = document.querySelector(".ball");
let x = 0;
let speed = 2;

gsap.ticker.add(() => {
  x += speed;
  if (x > 500 || x < 0) speed *= -1;
  ball.style.transform = `translateX(${x}px)`;
});
```

### Parallax эффект

```javascript
const layers = document.querySelectorAll(".parallax-layer");

gsap.ticker.add(() => {
  const scrollY = window.scrollY;

  layers.forEach((layer, i) => {
    const speed = (i + 1) * 0.1;
    layer.style.transform = `translateY(${scrollY * speed}px)`;
  });
});
```

### Mouse tracking

```javascript
const cursor = document.querySelector(".custom-cursor");
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

gsap.ticker.add(() => {
  // Smooth follow
  cursorX += (mouseX - cursorX) * 0.1;
  cursorY += (mouseY - cursorY) * 0.1;

  cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
});
```

### FPS counter

```javascript
const fpsDisplay = document.querySelector(".fps");
let frames = 0;
let lastTime = performance.now();

gsap.ticker.add(() => {
  frames++;
  const currentTime = performance.now();

  if (currentTime - lastTime >= 1000) {
    fpsDisplay.textContent = `FPS: ${frames}`;
    frames = 0;
    lastTime = currentTime;
  }
});
```

## fps() әдісі

Frame rate баптау:

```javascript
// 30 FPS-ке шектеу
gsap.ticker.fps(30);

// Шектеуді алып тастау (әдепкі)
gsap.ticker.fps(-1);
```

## lagSmoothing()

Lag кезіндегі мінез-құлық:

```javascript
// threshold мс-тан артық lag болса, adjustedLag-қа қысқарту
gsap.ticker.lagSmoothing(500, 33);

// Өшіру
gsap.ticker.lagSmoothing(0);
```

### Параметрлер

- `threshold` — Бұдан артық уақыт "lag" деп саналады
- `adjustedLag` — Lag орнына қолданылатын уақыт

## deltaRatio()

Frame-independent қозғалыс:

```javascript
gsap.ticker.add(() => {
  // 60fps-ке қатысты коэффициент
  const ratio = gsap.ticker.deltaRatio();

  // Frame rate-ке тәуелсіз қозғалыс
  ball.x += 5 * ratio;
});
```

### Базалық fps көрсету

```javascript
// 30fps базасында
const ratio = gsap.ticker.deltaRatio(30);
```

## wake() және sleep()

```javascript
// Ticker-ді тоқтату
gsap.ticker.sleep();

// Қайта іске қосу
gsap.ticker.wake();
```

## Lenis-пен интеграция

```javascript
import Lenis from "lenis";

const lenis = new Lenis();

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
```

## Three.js интеграция

```javascript
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

gsap.ticker.add(() => {
  // GSAP анимациялары Three.js render-мен синхронда
  renderer.render(scene, camera);
});
```

## RAF vs Ticker

| gsap.ticker      | requestAnimationFrame |
| ---------------- | --------------------- |
| GSAP-пен синхрон | Бөлек цикл            |
| lagSmoothing     | Қолмен жазу           |
| deltaRatio       | Қолмен есептеу        |
| Плагин қолдауы   | Жоқ                   |

## Бірнеше listener

```javascript
// Приоритет бойынша
const first = () => console.log("First");
const second = () => console.log("Second");

gsap.ticker.add(first);
gsap.ticker.add(second);

// first, second реттілігінде орындалады
```

## Практика: Smooth scroll indicator

```javascript
const indicator = document.querySelector(".scroll-indicator");
let currentScroll = 0;
let targetScroll = 0;

window.addEventListener("scroll", () => {
  targetScroll = window.scrollY / (document.body.scrollHeight - window.innerHeight);
});

gsap.ticker.add(() => {
  // Smooth interpolation
  currentScroll += (targetScroll - currentScroll) * 0.1;
  indicator.style.transform = `scaleX(${currentScroll})`;
});
```

## Практика: Particle system

```javascript
const particles = [];
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Particle class
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
  }

  update(delta) {
    this.x += this.vx * delta * 60;
    this.y += this.vy * delta * 60;
    // Boundaries
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Create particles
for (let i = 0; i < 100; i++) {
  particles.push(new Particle());
}

// Animation loop
gsap.ticker.add((time, delta) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.update(delta);
    p.draw();
  });
});
```

## Кеңестер

1. **deltaRatio** — Frame-independent қозғалыс үшін
2. **lagSmoothing** — Mobile құрылғыларда қолданыңыз
3. **remove** — Қажетсіз listener-лерді алып тастаңыз
4. **once** — Бір реттік орындау үшін true беріңіз

## Қорытынды

`gsap.ticker` — GSAP-тың animation loop-ына қосылу жолы. Custom анимациялар, физика симуляциялары және сыртқы кітапханалармен интеграция үшін пайдалы.
