---
title: Терминдер сөздігі
description: GSAP және анимация терминдерінің қазақша түсіндірмелері
---

# Терминдер сөздігі

GSAP және веб-анимация саласындағы терминдердің қазақша түсіндірмелері.

## A

### Animation (Анимация)

Элементтің қасиеттерін уақыт бойынша өзгерту. Мысалы: позиция, түс, өлшем.

### API (Application Programming Interface)

Бағдарламалау интерфейсі. GSAP API — GSAP-пен жұмыс істеу әдістері мен қасиеттері.

### Amplitude (Амплитуда)

Elastic easing-тегі тербеліс биіктігі. Үлкен амплитуда = күшті тербеліс.

## B

### Batch

Көп элементті бір ScrollTrigger арқылы басқару. `ScrollTrigger.batch()` әдісі.

### Bezier Curve (Безье қисығы)

Математикалық қисық, easing және MotionPath үшін қолданылады.

## C

### Callback

Белгілі оқиға болғанда шақырылатын функция. Мысалы: `onComplete`, `onStart`.

### Cleanup

Анимацияларды жою процесі. React/Vue компоненттерде маңызды.

### Context

GSAP context — анимациялар тобын басқару және cleanup жасау құралы.

```javascript
const ctx = gsap.context(() => {
  // Анимациялар
});
ctx.revert(); // Cleanup
```

### CSS Transform

Элементті көшіру, масштабтау, айналдыру үшін CSS қасиеті.

## D

### Defaults

GSAP-тың әдепкі параметрлері. `gsap.defaults()` арқылы өзгертуге болады.

### Delay (Кідіріс)

Анимация басталар алдындағы күту уақыты (секундпен).

### Duration (Ұзақтық)

Анимацияның жалпы ұзақтығы (секундпен).

## E

### Ease / Easing (Жеделдету)

Анимация жылдамдығының өзгеру қисығы. Табиғи қозғалыс үшін қолданылады.

### End Trigger

ScrollTrigger-де анимация аяқталатын нүкте.

## F

### force3D

GSAP параметрі, transform-ды GPU-да орындауға мәжбүрлейді.

```javascript
gsap.to(".box", { x: 100, force3D: true });
// Нәтиже: translate3d(100px, 0, 0)
```

### Frame

Анимацияның бір кадры. Әдетте 60 FPS (секундына 60 кадр).

### from()

Берілген мәннен ағымдағы мәнге анимация жасау.

### fromTo()

Берілген бастапқы мәннен соңғы мәнге анимация жасау.

## G

### GPU Acceleration

Графикалық процессорды (GPU) анимация үшін қолдану. Жылдамырақ жұмыс істейді.

### GSAP (GreenSock Animation Platform)

Веб-анимациялар үшін JavaScript кітапханасы.

## H

### Hook

React/Vue-дағы lifecycle әдістері. GSAP cleanup үшін маңызды.

## I

### immediateRender

`from()` және `fromTo()` әдістерінде бірден render жасау параметрі.

### IntersectionObserver

Элементтің viewport-қа кіруін/шығуын бақылайтын браузер API-і.

### Invalidate

Анимацияның мәндерін қайта есептеу. `invalidate()` әдісі.

### Iteration

Қайталанатын анимацияның ағымдағы қайталану нөмірі.

## K

### Keyframes

Анимацияның негізгі нүктелері. Бірнеше қадамды анимация жасау үшін.

```javascript
gsap.to(".box", {
  keyframes: [{ x: 100 }, { y: 50 }, { rotation: 360 }],
});
```

### kill()

Анимацияны тоқтату және жою әдісі.

## L

### Label

Timeline-дағы белгіленген нүкте. Навигация үшін қолданылады.

```javascript
tl.addLabel("middle", 1.5);
tl.play("middle");
```

### Lazy Rendering

Көрінбейтін элементтерді анимацияламау оптимизациясы.

### Linear

Жеделдетусіз, тұрақты жылдамдықты анимация. `ease: "none"`.

## M

### Markers

ScrollTrigger-де debug үшін визуалды белгілер.

### matchMedia()

Экран өлшеміне байланысты әртүрлі анимациялар жасау құралы.

### Memory Leak

Қажетсіз объекттердің жадыда қалуы. Cleanup жасамағанда болады.

### Morph / MorphSVG

SVG пішінін басқа пішінге түрлендіру анимациясы.

### MotionPath

Элементті SVG path бойымен қозғалту плагині.

## N

### Nested Timeline

Timeline ішіндегі timeline. Күрделі анимациялар үшін.

## O

### Offset

Уақыт немесе позиция ығысуы.

### onComplete

Анимация аяқталғанда шақырылатын callback.

### onStart

Анимация басталғанда шақырылатын callback.

### onUpdate

Әр frame-де шақырылатын callback.

### Overwrite

Бір элементтегі конфликтті анимацияларды басқару режимі.

```javascript
gsap.to(".box", { x: 100, overwrite: "auto" });
```

## P

### Parallax

Әртүрлі жылдамдықта қозғалатын қабаттар эффектісі.

### Paused

Тоқтатылған күйде жасалған анимация. `paused: true`.

### Period

Elastic easing-тегі тербеліс кезеңі (толқын ұзындығы).

### Pin

ScrollTrigger-де элементті экранда бекіту.

### Plugin

GSAP-қа қосымша мүмкіндіктер қосатын модуль.

### Position Parameter

Timeline-да анимация орналасуын анықтайтын параметр.

```javascript
tl.to(".box", { x: 100 }, "+=0.5"); // 0.5 сек кейін
tl.to(".box", { x: 100 }, "<"); // Алдыңғымен бірге
```

### Progress

Анимацияның орындалу пайызы (0-ден 1-ге дейін).

## R

### RAF (requestAnimationFrame)

Браузердің анимация жаңарту механизмі. GSAP ішкі қолданады.

### registerPlugin()

GSAP плагинін тіркеу әдісі.

```javascript
gsap.registerPlugin(ScrollTrigger);
```

### Relative Value

Салыстырмалы мән. `"+=100"` немесе `"-=50"`.

### Repeat

Анимацияның қайталану саны. `-1` = шексіз.

### Reversed

Кері бағытта ойнатылатын анимация.

### Revert

GSAP context-ті бастапқы күйге қайтару және анимацияларды жою.

## S

### Scale

Элементті үлкейту/кішірейту трансформациясы.

### Scope

Selector-лардың іздеу аймағы. Context scope.

### Scrub

Scroll позициясына байланысты анимацияны басқару.

```javascript
scrollTrigger: {
  scrub: true,  // Scroll = анимация
  scrub: 1,     // 1 сек smoothing
}
```

### Selector

Элементтерді табу үшін CSS селекторы. `".box"`, `"#header"`.

### set()

Элементтің қасиеттерін анимациясыз орнату.

### Snap

Белгілі нүктелерге "жабысу" эффектісі.

### SSR (Server-Side Rendering)

Сервер жағында HTML генерациялау. GSAP-та арнайы өңдеу қажет.

### Stagger

Көп элементті кезекпен анимациялау.

```javascript
gsap.to(".boxes", { x: 100, stagger: 0.1 });
```

### Start Trigger

ScrollTrigger-де анимация басталатын нүкте.

### Stacking Context

CSS-те элементтердің z-index реті анықталатын контекст.

## T

### Target

Анимацияланатын элемент немесе объект.

### Ticker

GSAP-тың ішкі таймері. Әр frame-де жұмыс істейді.

```javascript
gsap.ticker.add(() => {
  // Әр frame-де орындалады
});
```

### Timeline

Бірнеше анимацияның реттелген тізбегі.

### to()

Ағымдағы мәннен берілген мәнге анимация жасау.

### Toggle

ScrollTrigger-де элемент күйін ауыстыру.

### toggleActions

ScrollTrigger оқиғаларына жауап әрекеттері.

```javascript
toggleActions: "play pause resume reverse";
// onEnter, onLeave, onEnterBack, onLeaveBack
```

### Transform

CSS transform қасиеті: translate, scale, rotate, skew.

### Transform Origin

Трансформация орталық нүктесі.

### Tween

Бір анимация объектісі. `gsap.to()`, `gsap.from()` нәтижесі.

## U

### Utils

GSAP көмекші функциялары: `gsap.utils.toArray()`, `gsap.utils.mapRange()`, т.б.

## V

### Vars

Анимация параметрлері объектісі.

```javascript
const vars = { x: 100, duration: 1, ease: "power2.out" };
gsap.to(".box", vars);
```

### Velocity

Қозғалыс жылдамдығы. ScrollTrigger-де `getVelocity()`.

### Viewport

Браузер терезесінің көрінетін аймағы.

## W

### will-change

CSS қасиеті, браузерге алдағы өзгерістерді хабарлайды.

```css
.animated {
  will-change: transform, opacity;
}
```

## Y

### Yoyo

Анимацияны аяғынан басына қайтару режимі.

```javascript
gsap.to(".box", { x: 100, repeat: -1, yoyo: true });
```

## Z

### z-index

Элементтердің қабаттасу реті.

## Қысқартулар

| Қысқарту | Толық нұсқа                       | Мағынасы                         |
| -------- | --------------------------------- | -------------------------------- |
| API      | Application Programming Interface | Бағдарламалау интерфейсі         |
| CSS      | Cascading Style Sheets            | Каскадты стиль кестелері         |
| DOM      | Document Object Model             | Құжат объект моделі              |
| FPS      | Frames Per Second                 | Секундына кадр                   |
| GPU      | Graphics Processing Unit          | Графикалық процессор             |
| GSAP     | GreenSock Animation Platform      | GreenSock анимация платформасы   |
| HTML     | HyperText Markup Language         | Гипермәтінді белгілеу тілі       |
| JS       | JavaScript                        | JavaScript бағдарламалау тілі    |
| RAF      | requestAnimationFrame             | Анимация кадрын сұрау            |
| SSR      | Server-Side Rendering             | Сервер жағында рендеринг         |
| SVG      | Scalable Vector Graphics          | Масштабталатын векторлық графика |
| UI       | User Interface                    | Пайдаланушы интерфейсі           |
| UX       | User Experience                   | Пайдаланушы тәжірибесі           |

## Қорытынды

Бұл сөздік GSAP құжаттамасын оқу және анимациялармен жұмыс істеу кезінде анықтама ретінде қолданылады.
