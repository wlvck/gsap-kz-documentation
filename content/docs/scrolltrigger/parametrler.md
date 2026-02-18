---
title: Негізгі параметрлер
description: ScrollTrigger-дің барлық параметрлері мен олардың сипаттамасы
---

# Негізгі параметрлер

ScrollTrigger-де көптеген параметрлер бар. Бұл бетте олардың барлығын қарастырамыз.

## trigger

Анимацияны іске қосатын элемент:

```javascript
scrollTrigger: {
  trigger: ".box",        // CSS селектор
  trigger: element,       // DOM элемент
  trigger: ref.current,   // React ref
}
```

## start және end

### start

Анимация қашан басталады:

```javascript
start: "top center"; // элемент жоғарысы + экран ортасы
start: "top bottom"; // элемент жоғарысы + экран төмені
start: "top 80%"; // элемент жоғарысы + экранның 80%-ы
start: "center center"; // екеуі де ортада
start: "top+=100 center"; // жоғарыдан 100px қосып
start: "-=100 center"; // 100px бұрын
```

### end

Анимация қашан аяқталады:

```javascript
end: "bottom center"; // элемент төмені + экран ортасы
end: "bottom top"; // элемент төмені + экран жоғарысы
end: "+=300"; // start-тан 300px кейін
end: "+=100%"; // start-тан элемент биіктігі қосып
end: "max"; // құжат соңы
```

### Функция ретінде

```javascript
start: () => window.innerHeight * 0.8,
end: () => "+=" + document.querySelector(".section").offsetHeight,
```

## markers

Debug маркерлерін көрсету:

```javascript
scrollTrigger: {
  trigger: ".box",
  markers: true,
  // немесе
  markers: {
    startColor: "green",
    endColor: "red",
    fontSize: "12px",
    indent: 20,
  },
}
```

## toggleActions

Скролл кезіндегі 4 әрекет:

```javascript
toggleActions: "onEnter onLeave onEnterBack onLeaveBack";
toggleActions: "play none none none"; // әдепкі
toggleActions: "play reverse play reverse"; // кері ойнату
toggleActions: "play pause resume reset";
```

### Мүмкін мәндер

- `play` — ойнату
- `pause` — тоқтату
- `resume` — жалғастыру
- `reverse` — кері ойнату
- `restart` — басынан бастау
- `reset` — бастапқы күй
- `complete` — аяқтау күйі
- `none` — ештеңе жасамау

## toggleClass

Класс қосу/алу:

```javascript
scrollTrigger: {
  trigger: ".box",
  toggleClass: "active",
  // немесе
  toggleClass: {
    targets: ".nav",
    className: "scrolled",
  },
}
```

## once

Бір рет іске қосу:

```javascript
scrollTrigger: {
  trigger: ".box",
  once: true, // іске қосылып, жойылады
}
```

## scrub

Скроллмен синхрондау (келесі бетте толық):

```javascript
scrollTrigger: {
  trigger: ".box",
  scrub: true,      // бірден синхрондау
  scrub: 0.5,       // 0.5 сек smooth
  scrub: 2,         // 2 сек smooth
}
```

## pin

Элементті бекіту (келесі бетте толық):

```javascript
scrollTrigger: {
  trigger: ".section",
  pin: true,
  pinSpacing: true,
}
```

## Callbacks

### Негізгі callbacks

```javascript
scrollTrigger: {
  trigger: ".box",
  onEnter: () => console.log("Кірді"),
  onLeave: () => console.log("Шықты"),
  onEnterBack: () => console.log("Кері кірді"),
  onLeaveBack: () => console.log("Кері шықты"),
  onUpdate: (self) => console.log("Progress:", self.progress),
  onToggle: (self) => console.log("Active:", self.isActive),
  onRefresh: () => console.log("Жаңартылды"),
}
```

### self объектісі

```javascript
onUpdate: (self) => {
  console.log(self.progress);    // 0-1 арасында
  console.log(self.direction);   // 1 (төмен) немесе -1 (жоғары)
  console.log(self.isActive);    // true/false
  console.log(self.trigger);     // trigger элемент
  console.log(self.start);       // start позициясы (px)
  console.log(self.end);         // end позициясы (px)
},
```

## scroller

Басқа scroller элемент:

```javascript
scrollTrigger: {
  trigger: ".box",
  scroller: ".container", // body орнына
}
```

## horizontal

Горизонталь скролл:

```javascript
scrollTrigger: {
  trigger: ".box",
  horizontal: true,
  scroller: ".horizontal-container",
}
```

## id

Trigger идентификаторы:

```javascript
scrollTrigger: {
  trigger: ".box",
  id: "myTrigger",
}

// Кейінірек табу
const trigger = ScrollTrigger.getById("myTrigger");
```

## invalidateOnRefresh

Resize кезінде қайта есептеу:

```javascript
scrollTrigger: {
  trigger: ".box",
  invalidateOnRefresh: true,
}
```

## anticipatePin

Pin алдында мәселені болдырмау:

```javascript
scrollTrigger: {
  trigger: ".section",
  pin: true,
  anticipatePin: 1,
}
```

## fastScrollEnd

Жылдам скролл кезінде аяқтау:

```javascript
scrollTrigger: {
  trigger: ".box",
  fastScrollEnd: true,
}
```

## preventOverlaps

Overlap-ты болдырмау:

```javascript
scrollTrigger: {
  trigger: ".box",
  preventOverlaps: true,
  // немесе
  preventOverlaps: "group1", // топ бойынша
}
```

## Практикалық мысал

```javascript
gsap.to(".box", {
  x: 200,
  rotation: 360,
  scrollTrigger: {
    trigger: ".box",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play reverse play reverse",
    markers: true, // production-да алып тастаңыз
    onEnter: () => console.log("Анимация басталды"),
    onComplete: () => console.log("Анимация аяқталды"),
  },
});
```

## Келесі қадам

[Pin эффектісі](/docs/scrolltrigger/pin) — элементтерді скролл кезінде бекіту.
