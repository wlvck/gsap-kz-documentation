---
title: Navbar анимация
description: GSAP арқылы интерактивті навигация жасау
---

# Navbar анимация

Navbar — веб-сайттың маңызды элементі. GSAP арқылы әсерлі анимациялар қосуға болады.

## Негізгі navbar

### HTML құрылымы

```html
<nav class="navbar">
  <div class="logo">Logo</div>
  <ul class="nav-links">
    <li><a href="#">Басты</a></li>
    <li><a href="#">Өнімдер</a></li>
    <li><a href="#">Туралы</a></li>
    <li><a href="#">Байланыс</a></li>
  </ul>
  <button class="menu-toggle">
    <span></span>
    <span></span>
    <span></span>
  </button>
</nav>
```

### CSS стильдері

```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-links a {
  color: white;
  text-decoration: none;
  position: relative;
}
```

## Scroll-да navbar өзгеруі

```javascript
const navbar = document.querySelector(".navbar");

gsap.to(navbar, {
  backgroundColor: "rgba(0, 0, 0, 0.95)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 2px 20px rgba(0, 0, 0, 0.3)",
  scrollTrigger: {
    trigger: document.body,
    start: "top top",
    end: "100px top",
    scrub: true,
  },
});
```

### Navbar жасыру/көрсету

```javascript
let lastScroll = 0;

gsap.ticker.add(() => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScroll && currentScroll > 100) {
    // Төмен скролл — жасыру
    gsap.to(navbar, { y: -100, duration: 0.3 });
  } else {
    // Жоғары скролл — көрсету
    gsap.to(navbar, { y: 0, duration: 0.3 });
  }

  lastScroll = currentScroll;
});
```

## Link hover эффекті

### Underline анимация

```css
.nav-links a::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #0ae448;
  transform: scaleX(0);
  transform-origin: right;
}
```

```javascript
const links = document.querySelectorAll(".nav-links a");

links.forEach((link) => {
  const underline = link.querySelector("::after");

  link.addEventListener("mouseenter", () => {
    gsap.to(link, {
      "--underline-scale": 1,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  link.addEventListener("mouseleave", () => {
    gsap.to(link, {
      "--underline-scale": 0,
      duration: 0.3,
      ease: "power2.in",
    });
  });
});
```

### Hover highlight

```javascript
const navContainer = document.querySelector(".nav-links");
const highlight = document.createElement("div");
highlight.className = "nav-highlight";
navContainer.appendChild(highlight);

const links = document.querySelectorAll(".nav-links a");

links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    const rect = link.getBoundingClientRect();
    const containerRect = navContainer.getBoundingClientRect();

    gsap.to(highlight, {
      x: rect.left - containerRect.left,
      width: rect.width,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});

navContainer.addEventListener("mouseleave", () => {
  gsap.to(highlight, { opacity: 0, duration: 0.3 });
});
```

## Mobile меню

### Hamburger анимация

```javascript
const menuToggle = document.querySelector(".menu-toggle");
const spans = menuToggle.querySelectorAll("span");
const mobileMenu = document.querySelector(".mobile-menu");

let isOpen = false;

const menuTl = gsap.timeline({ paused: true });

// Hamburger to X
menuTl
  .to(spans[0], {
    y: 8,
    rotation: 45,
    duration: 0.3,
  })
  .to(
    spans[1],
    {
      opacity: 0,
      duration: 0.1,
    },
    0
  )
  .to(
    spans[2],
    {
      y: -8,
      rotation: -45,
      duration: 0.3,
    },
    0
  )
  // Menu slide in
  .from(mobileMenu, {
    xPercent: 100,
    duration: 0.4,
    ease: "power2.out",
  })
  .from(
    ".mobile-menu li",
    {
      x: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.3,
    },
    "-=0.2"
  );

menuToggle.addEventListener("click", () => {
  isOpen = !isOpen;
  isOpen ? menuTl.play() : menuTl.reverse();
});
```

### Full-screen меню

```javascript
const fullscreenMenu = gsap.timeline({ paused: true });

fullscreenMenu
  .to(".menu-overlay", {
    clipPath: "circle(150% at top right)",
    duration: 0.8,
    ease: "power3.inOut",
  })
  .from(
    ".menu-item",
    {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power3.out",
    },
    "-=0.3"
  )
  .from(
    ".menu-footer",
    {
      opacity: 0,
      y: 20,
      duration: 0.3,
    },
    "-=0.2"
  );

// Initial state
gsap.set(".menu-overlay", {
  clipPath: "circle(0% at top right)",
});
```

## Dropdown меню

```javascript
const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((dropdown) => {
  const trigger = dropdown.querySelector(".dropdown-trigger");
  const content = dropdown.querySelector(".dropdown-content");
  const items = content.querySelectorAll("li");

  const tl = gsap.timeline({ paused: true });

  tl.to(content, {
    height: "auto",
    opacity: 1,
    duration: 0.3,
    ease: "power2.out",
  }).from(
    items,
    {
      y: -10,
      opacity: 0,
      stagger: 0.05,
      duration: 0.2,
    },
    "-=0.1"
  );

  // Initial state
  gsap.set(content, { height: 0, opacity: 0 });

  trigger.addEventListener("mouseenter", () => tl.play());
  dropdown.addEventListener("mouseleave", () => tl.reverse());
});
```

## Logo анимация

```javascript
const logo = document.querySelector(".logo");
const logoLetters = logo.querySelectorAll("span");

// Page load
gsap.from(logoLetters, {
  y: -30,
  opacity: 0,
  stagger: 0.05,
  duration: 0.5,
  ease: "back.out(1.7)",
  delay: 0.2,
});

// Hover
logo.addEventListener("mouseenter", () => {
  gsap.to(logoLetters, {
    y: -5,
    stagger: {
      each: 0.03,
      yoyo: true,
      repeat: 1,
    },
    duration: 0.2,
  });
});
```

## Active link индикаторы

```javascript
const links = document.querySelectorAll(".nav-links a");
const indicator = document.querySelector(".active-indicator");

const setActiveIndicator = (link) => {
  const rect = link.getBoundingClientRect();

  gsap.to(indicator, {
    x: rect.left,
    width: rect.width,
    duration: 0.3,
    ease: "power2.out",
  });
};

// Initial position
const activeLink = document.querySelector(".nav-links a.active");
if (activeLink) setActiveIndicator(activeLink);

// On click
links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    setActiveIndicator(link);
  });
});
```

## Scroll progress

```javascript
const progressBar = document.querySelector(".scroll-progress");

gsap.to(progressBar, {
  scaleX: 1,
  ease: "none",
  scrollTrigger: {
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  },
});

// Initial state
gsap.set(progressBar, { scaleX: 0, transformOrigin: "left" });
```

## Толық мысал

```javascript
// Navbar initialization
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const links = document.querySelectorAll(".nav-links a");

  // Page load animation
  const loadTl = gsap.timeline();
  loadTl
    .from(navbar, {
      y: -100,
      duration: 0.6,
      ease: "power3.out",
    })
    .from(
      links,
      {
        y: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
      },
      "-=0.2"
    );

  // Scroll behavior
  ScrollTrigger.create({
    start: "top top",
    end: "max",
    onUpdate: (self) => {
      if (self.direction === 1) {
        gsap.to(navbar, { y: -100, duration: 0.3 });
      } else {
        gsap.to(navbar, { y: 0, duration: 0.3 });
      }
    },
  });

  // Link interactions
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      gsap.to(link, { color: "#0ae448", duration: 0.2 });
    });
    link.addEventListener("mouseleave", () => {
      gsap.to(link, { color: "#fff", duration: 0.2 });
    });
  });
}

initNavbar();
```

## Кеңестер

1. **Performance** — will-change қолданыңыз
2. **Accessibility** — keyboard navigation ұмытпаңыз
3. **Mobile** — touch events қосыңыз
4. **Timing** — 0.2-0.4с оптималды

## Қорытынды

Navbar анимациялары UX-ті жақсартады. GSAP арқылы hover эффекттері, scroll реакциялары және mobile меню анимацияларын оңай жасауға болады.
