---
title: React-та GSAP
description: React фреймворкінде GSAP анимацияларын қолдану
---

# React-та GSAP

React-та GSAP қолдану үшін бірнеше маңызды ережелерді ұстану керек: refs қолдану, cleanup жасау және render циклін түсіну.

## Орнату

```bash
npm install gsap
```

## Негізгі қолданылуы

### useRef + useLayoutEffect

```jsx
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

function Box() {
  const boxRef = useRef(null);

  useLayoutEffect(() => {
    gsap.to(boxRef.current, {
      x: 200,
      duration: 1,
    });
  }, []);

  return (
    <div ref={boxRef} className="box">
      Box
    </div>
  );
}
```

### useLayoutEffect vs useEffect

- **useLayoutEffect** — DOM жаңартылғаннан кейін, paint алдында
- **useEffect** — paint-тан кейін

Анимациялар үшін `useLayoutEffect` ұсынылады (flash болдырмау үшін).

## gsap.context() қолдану

Анимацияларды cleanup жасау үшін:

```jsx
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

function MyComponent() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".box", { x: 200 });
      gsap.to(".circle", { scale: 2 });
    }, containerRef);

    // Cleanup функциясы
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <div className="box">Box</div>
      <div className="circle">Circle</div>
    </div>
  );
}
```

## Timeline қолдану

```jsx
function AnimatedSection() {
  const containerRef = useRef(null);
  const tl = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline()
        .from(".title", { y: 50, opacity: 0 })
        .from(".content", { y: 30, opacity: 0 }, "-=0.3")
        .from(".button", { scale: 0.8, opacity: 0 }, "-=0.2");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <h1 className="title">Title</h1>
      <p className="content">Content</p>
      <button className="button">Button</button>
    </div>
  );
}
```

## Hover анимациялары

```jsx
function HoverCard() {
  const cardRef = useRef(null);

  const onMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
      duration: 0.3,
    });
  };

  const onMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      duration: 0.3,
    });
  };

  return (
    <div ref={cardRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="card">
      Hover me
    </div>
  );
}
```

## ScrollTrigger

```jsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ScrollSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".card", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef}>
      <div className="card">Card 1</div>
      <div className="card">Card 2</div>
      <div className="card">Card 3</div>
    </section>
  );
}
```

## State-пен байланысты анимация

```jsx
function ToggleBox() {
  const boxRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useLayoutEffect(() => {
    gsap.to(boxRef.current, {
      height: isOpen ? "auto" : 0,
      opacity: isOpen ? 1 : 0,
      duration: 0.3,
    });
  }, [isOpen]);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      <div ref={boxRef} className="content">
        Collapsible content
      </div>
    </div>
  );
}
```

## Custom Hook

```jsx
// hooks/useGsap.js
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export function useGsap(animation, deps = []) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      animation(ref.current);
    }, ref);

    return () => ctx.revert();
  }, deps);

  return ref;
}

// Қолдану
function MyComponent() {
  const boxRef = useGsap((el) => {
    gsap.from(el, { x: -100, opacity: 0 });
  });

  return <div ref={boxRef}>Animated</div>;
}
```

## @gsap/react

Ресми React hook:

```bash
npm install @gsap/react
```

```jsx
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function MyComponent() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(".box", { x: 200 });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <div className="box">Box</div>
    </div>
  );
}
```

## Маңызды ережелер

1. **Ref қолдану** — DOM элементтеріне тікелей қол жеткізу үшін
2. **Cleanup** — компонент unmount кезінде анимацияларды тазалау
3. **gsap.context()** — скопинг және оңай cleanup
4. **useLayoutEffect** — flash болдырмау үшін

## Келесі қадам

[Vue-да GSAP](/docs/freimworktar/vue) — Vue фреймворкінде GSAP қолдану.
