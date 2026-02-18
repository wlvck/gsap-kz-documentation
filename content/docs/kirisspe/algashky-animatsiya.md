---
title: Алғашқы анимация
description: GSAP көмегімен алғашқы анимацияңызды жасаңыз
---

# Алғашқы анимация

GSAP-пен алғашқы анимацияңызды жасауға дайынсыз ба? Бастайық!

## HTML дайындау

Алдымен анимациялайтын элемент керек:

```html
<div class="box"></div>
```

CSS стильдері:

```css
.box {
  width: 100px;
  height: 100px;
  background-color: #0ae448;
  border-radius: 8px;
}
```

## Қарапайым анимация

```javascript
gsap.to(".box", {
  x: 200,
  duration: 1,
});
```

Бұл код:

- `.box` элементін таңдайды
- x осі бойынша 200px жылжытады
- 1 секунд ішінде

## Бірнеше қасиетті анимациялау

```javascript
gsap.to(".box", {
  x: 200,
  y: 100,
  rotation: 360,
  scale: 1.5,
  backgroundColor: "#ff0000",
  duration: 2,
});
```

Бұл код:

- Элементті жылжытады (x, y)
- Айналдырады (rotation)
- Масштабтайды (scale)
- Түсін өзгертеді (backgroundColor)

## gsap.from()

`from()` әдісі — керісінше жұмыс істейді. Берілген мәндерден қазіргі күйге анимациялайды:

```javascript
gsap.from(".box", {
  x: -200,
  opacity: 0,
  duration: 1,
});
```

Элемент сол жақтан пайда болады.

## gsap.fromTo()

Бастапқы және соңғы мәндерді нақты көрсету үшін:

```javascript
gsap.fromTo(
  ".box",
  { x: 0, opacity: 0 }, // бастапқы мән
  { x: 200, opacity: 1, duration: 1 } // соңғы мән
);
```

## Практикалық мысал

```javascript
// Бет жүктелгенде логотипті анимациялау
gsap.from(".logo", {
  y: -50,
  opacity: 0,
  duration: 1,
  ease: "power2.out",
});
```

## Келесі қадам

Керемет! Алғашқы анимацияңызды жасадыңыз. Енді [GSAP-тың артықшылықтары](/docs/kirisspe/nege-gsap) туралы көбірек біліңіз.
