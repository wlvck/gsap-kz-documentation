---
title: Stagger анимациялар
description: GSAP stagger арқылы тізбекті анимациялар жасау
---

# Stagger анимациялар

Stagger — бірнеше элементті кезекпен анимациялау. Әр элемент біраз кідіріспен басталады.

## Негізгі қолдану

### Қарапайым stagger

```javascript
gsap.to(".box", {
  x: 100,
  stagger: 0.2, // Әр элемент 0.2 секунд кідіріспен
  duration: 1,
});
```

### from әдісімен

```javascript
gsap.from(".item", {
  opacity: 0,
  y: 50,
  stagger: 0.1,
  duration: 0.5,
});
```

## Stagger мәндері

### Сан мәні

```javascript
gsap.to(".box", {
  x: 100,
  stagger: 0.3, // 0.3 секунд аралық
});
```

### Объект конфигурациясы

```javascript
gsap.to(".box", {
  x: 100,
  stagger: {
    each: 0.2, // Әр элемент аралығы
    from: "start", // Бастау нүктесі
    ease: "power2.in", // Stagger easing
  },
});
```

## from параметрі

Stagger бастау нүктесін анықтайды:

```javascript
// Басынан (әдепкі)
stagger: {
  from: "start";
}

// Соңынан
stagger: {
  from: "end";
}

// Ортадан
stagger: {
  from: "center";
}

// Шеттерден
stagger: {
  from: "edges";
}

// Кездейсоқ
stagger: {
  from: "random";
}

// Индекс бойынша
stagger: {
  from: 5;
} // 5-ші элементтен
```

### Практикалық мысал

```javascript
// Ортадан екі жаққа
gsap.from(".card", {
  scale: 0,
  opacity: 0,
  stagger: {
    each: 0.1,
    from: "center",
  },
  duration: 0.5,
  ease: "back.out(1.7)",
});
```

## Grid stagger

2D торлар үшін арнайы stagger:

```javascript
gsap.to(".grid-item", {
  scale: 0.5,
  stagger: {
    grid: [4, 5], // 4 жол, 5 баған
    from: "center",
    amount: 1, // Жалпы уақыт
  },
});
```

### Grid from мәндері

```javascript
// Бұрыштардан
stagger: { grid: [4, 5], from: "start" }      // Сол жақ жоғары
stagger: { grid: [4, 5], from: "end" }        // Оң жақ төмен
stagger: { grid: [4, 5], from: "center" }     // Ортадан
stagger: { grid: [4, 5], from: "edges" }      // Шеттерден

// Координат бойынша
stagger: { grid: [4, 5], from: [0, 0] }       // Сол жақ жоғары
stagger: { grid: [4, 5], from: [3, 4] }       // Оң жақ төмен
stagger: { grid: [4, 5], from: [1, 2] }       // Нақты ұяшық
```

### axis параметрі

```javascript
// Тек X бойынша
stagger: {
  grid: [4, 5],
  axis: "x",
  amount: 0.5,
}

// Тек Y бойынша
stagger: {
  grid: [4, 5],
  axis: "y",
  amount: 0.5,
}
```

## each vs amount

### each — әр элемент аралығы

```javascript
// 10 элемент, әрқайсысы 0.1с аралықпен = жалпы 0.9с stagger
stagger: {
  each: 0.1;
}
```

### amount — жалпы stagger уақыты

```javascript
// 10 элемент, жалпы 1с stagger = әрқайсысы 0.111с аралықпен
stagger: {
  amount: 1;
}
```

## ease параметрі

Stagger таратылуын басқару:

```javascript
// Соңына қарай тездету
stagger: {
  each: 0.1,
  ease: "power2.in",
}

// Басына қарай тездету
stagger: {
  each: 0.1,
  ease: "power2.out",
}

// Ортасында тездету
stagger: {
  each: 0.1,
  ease: "power2.inOut",
}
```

## repeat және yoyo

```javascript
gsap.to(".box", {
  y: -20,
  stagger: {
    each: 0.1,
    repeat: -1, // Шексіз қайталау
    yoyo: true, // Артқа қайту
  },
  duration: 0.3,
});
```

## Функция мәні

Динамикалық stagger:

```javascript
gsap.to(".box", {
  x: 100,
  stagger: (index, target, list) => {
    // index — элемент индексі
    // target — DOM элементі
    // list — барлық элементтер
    return index * 0.1;
  },
});
```

### Практикалық мысалдар

```javascript
// Қашықтық негізінде
gsap.to(".box", {
  scale: 1.5,
  stagger: (i, el) => {
    const rect = el.getBoundingClientRect();
    const centerX = window.innerWidth / 2;
    const distance = Math.abs(rect.left - centerX);
    return distance / 1000;
  },
});

// Кездейсоқ реттілік
gsap.to(".box", {
  y: -30,
  stagger: () => Math.random() * 0.5,
});
```

## Практикалық мысалдар

### Мәтін әріптері

```html
<h1 class="title"><span>С</span><span>Ә</span><span>Л</span><span>Е</span><span>М</span></h1>
```

```javascript
gsap.from(".title span", {
  opacity: 0,
  y: 50,
  rotationX: -90,
  stagger: 0.05,
  duration: 0.5,
  ease: "back.out(1.7)",
});
```

### Карточкалар галереясы

```javascript
gsap.from(".gallery-card", {
  opacity: 0,
  scale: 0.8,
  y: 100,
  stagger: {
    grid: [3, 4],
    from: "center",
    amount: 0.8,
  },
  duration: 0.6,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".gallery",
    start: "top 80%",
  },
});
```

### Толқын эффектісі

```javascript
gsap.to(".wave-item", {
  y: -20,
  stagger: {
    each: 0.1,
    from: "start",
    repeat: -1,
    yoyo: true,
  },
  duration: 0.3,
  ease: "power1.inOut",
});
```

### Жүктеу анимациясы

```javascript
const tl = gsap.timeline({ repeat: -1 });

tl.to(".loader-dot", {
  y: -20,
  stagger: {
    each: 0.15,
    repeat: 1,
    yoyo: true,
  },
  duration: 0.3,
  ease: "power2.out",
});
```

## Timeline-мен қолдану

```javascript
const tl = gsap.timeline();

tl.from(".header span", {
  y: -50,
  opacity: 0,
  stagger: 0.05,
})
  .from(
    ".content p",
    {
      x: -30,
      opacity: 0,
      stagger: 0.1,
    },
    "-=0.3"
  )
  .from(
    ".button",
    {
      scale: 0,
      ease: "back.out(1.7)",
    },
    "-=0.2"
  );
```

## Кеңестер

1. **amount vs each** — Белгілі уақытта amount, икемділік үшін each
2. **from: "center"** — UI элементтері үшін әсерлі
3. **Grid** — 2D layout үшін қолданыңыз
4. **Функция** — Күрделі логика үшін

## Қорытынды

Stagger — GSAP-тың ең қуатты мүмкіндіктерінің бірі. Қарапайым сан мәнінен бастап күрделі grid конфигурацияларына дейін, кез келген тізбекті анимацияны жасауға мүмкіндік береді.
