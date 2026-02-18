---
title: Draggable
description: GSAP Draggable - элементтерді тышқанмен немесе саусақпен сүйреу
---

# Draggable

**Draggable** — элементтерді drag-and-drop жасауға мүмкіндік беретін плагин. Touch құрылғыларда да жұмыс істейді.

## Орнату

```javascript
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);
```

## Негізгі қолданылуы

```javascript
// Элементті сүйреуге болатын ету
Draggable.create(".box");

// Бірнеше элемент
Draggable.create(".draggable-item");
```

## Параметрлер

### type

Қозғалыс түрін шектеу:

```javascript
Draggable.create(".box", {
  type: "x", // тек көлденең
  type: "y", // тек тік
  type: "x,y", // екі бағытта (әдепкі)
  type: "rotation", // айналдыру
  type: "scroll", // скролл
});
```

### bounds

Қозғалыс аймағын шектеу:

```javascript
Draggable.create(".box", {
  bounds: ".container", // контейнер ішінде
  bounds: document.body, // body ішінде
  bounds: {
    // нақты координаттар
    minX: 0,
    maxX: 500,
    minY: 0,
    maxY: 300,
  },
});
```

### inertia

Инерция эффекті (лақтыру):

```javascript
Draggable.create(".box", {
  inertia: true, // InertiaPlugin қажет
});
```

### edgeResistance

Шетте қарсылық:

```javascript
Draggable.create(".box", {
  bounds: ".container",
  edgeResistance: 0.5, // 0-1 арасында
});
```

## Callbacks

```javascript
Draggable.create(".box", {
  onPress: function () {
    console.log("Басылды");
  },
  onDragStart: function () {
    console.log("Сүйреу басталды");
  },
  onDrag: function () {
    console.log("Сүйреу жүріп жатыр", this.x, this.y);
  },
  onDragEnd: function () {
    console.log("Сүйреу аяқталды");
  },
  onRelease: function () {
    console.log("Жіберілді");
  },
});
```

### this контексті

Callback ішінде `this` арқылы мәліметтер алу:

```javascript
onDrag: function() {
  console.log(this.x);          // X координаты
  console.log(this.y);          // Y координаты
  console.log(this.rotation);   // Айналу бұрышы
  console.log(this.target);     // DOM элемент
  console.log(this.isDragging); // Сүйретілуде ме?
}
```

## Практикалық мысалдар

### Карточкаларды сүйреу

```javascript
Draggable.create(".card", {
  type: "x,y",
  bounds: ".board",
  onDragEnd: function () {
    // Snap to grid
    gsap.to(this.target, {
      x: Math.round(this.x / 100) * 100,
      y: Math.round(this.y / 100) * 100,
      duration: 0.3,
    });
  },
});
```

### Slider

```javascript
Draggable.create(".slider-handle", {
  type: "x",
  bounds: ".slider-track",
  onDrag: function () {
    const progress = this.x / this.maxX;
    updateValue(progress);
  },
});
```

### Айналдыратын диск

```javascript
Draggable.create(".dial", {
  type: "rotation",
  onDrag: function () {
    console.log("Rotation:", this.rotation);
  },
});
```

### Scroll container

```javascript
Draggable.create(".scroll-content", {
  type: "scroll",
  edgeResistance: 0.8,
  throwProps: true,
});
```

## Әдістер

### disable() / enable()

```javascript
const draggable = Draggable.create(".box")[0];

// Өшіру
draggable.disable();

// Қосу
draggable.enable();
```

### kill()

```javascript
// Толығымен жою
draggable.kill();
```

### update()

```javascript
// Позицияны жаңарту
draggable.update();
```

## hitTest()

Екі элементтің қиылысуын тексеру:

```javascript
Draggable.create(".draggable", {
  onDrag: function () {
    if (this.hitTest(".dropzone", "50%")) {
      // Dropzone-ға 50% қиылысты
      gsap.to(".dropzone", { backgroundColor: "green" });
    }
  },
});
```

## Snap

Белгілі позицияларға snap:

```javascript
Draggable.create(".box", {
  snap: {
    x: function (endValue) {
      return Math.round(endValue / 50) * 50; // 50px grid
    },
    y: function (endValue) {
      return Math.round(endValue / 50) * 50;
    },
  },
});
```

## Cursor

```javascript
Draggable.create(".box", {
  cursor: "grab",
  activeCursor: "grabbing",
});
```

## Келесі қадам

[Flip](/docs/plaginder/flip) — FLIP анимация техникасы.
