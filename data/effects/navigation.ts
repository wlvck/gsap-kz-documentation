import type { Effect } from "~/types/effects";

export const navigationEffects: Effect[] = [
  // Navbar effects
  {
    id: "navbar-hide",
    name: "Navbar Hide on Scroll",
    nameKz: "Скролл кезінде навбар жасыру",
    description: "Hide navbar when scrolling down, show when scrolling up",
    descriptionKz: "Төмен скролл кезінде навбар жасырылады, жоғары скролл кезінде көрінеді",
    category: "navigation",
    playgroundType: "scroll",
    defaultText: "NAVBAR",
    code: {
      vue: `<template>
  <nav ref="navbarRef" class="navbar">
    <div class="logo">Logo</div>
    <ul class="nav-links">
      <li><a href="#">Басты</a></li>
      <li><a href="#">Туралы</a></li>
      <li><a href="#">Байланыс</a></li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

const navbarRef = ref(null);
let lastScrollY = 0;
let ticking = false;

const handleScroll = () => {
  const currentScrollY = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down - hide navbar
        gsap.to(navbarRef.value, {
          y: -100,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        // Scrolling up - show navbar
        gsap.to(navbarRef.value, {
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
      lastScrollY = currentScrollY;
      ticking = false;
    });
    ticking = true;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>`,
      script: `const navbar = document.querySelector(".navbar");
let lastScrollY = 0;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 80) {
    // Scrolling down - hide navbar
    gsap.to(navbar, {
      y: -100,
      duration: 0.3,
      ease: "power2.out"
    });
  } else {
    // Scrolling up - show navbar
    gsap.to(navbar, {
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  }

  lastScrollY = currentScrollY;
});`,
      css: `.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #1c1e1d;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 1000;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-links a {
  color: #fffce1;
  text-decoration: none;
}`,
    },
  },
  {
    id: "navbar-shrink",
    name: "Navbar Shrink",
    nameKz: "Навбар кішірейту",
    description: "Navbar shrinks on scroll",
    descriptionKz: "Скролл кезінде навбар биіктігі кішірейеді",
    category: "navigation",
    playgroundType: "scroll",
    defaultText: "NAVBAR",
    code: {
      vue: `<template>
  <nav ref="navbarRef" class="navbar" :class="{ shrunk: isScrolled }">
    <div class="logo">Logo</div>
    <ul class="nav-links">
      <li><a href="#">Басты</a></li>
      <li><a href="#">Туралы</a></li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

const navbarRef = ref(null);
const isScrolled = ref(false);

const handleScroll = () => {
  const shouldShrink = window.scrollY > 50;

  if (shouldShrink !== isScrolled.value) {
    isScrolled.value = shouldShrink;

    gsap.to(navbarRef.value, {
      height: shouldShrink ? 50 : 80,
      paddingTop: shouldShrink ? 8 : 16,
      paddingBottom: shouldShrink ? 8 : 16,
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(".logo", {
      fontSize: shouldShrink ? "1.2rem" : "1.5rem",
      duration: 0.3
    });
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>`,
      script: `const navbar = document.querySelector(".navbar");
const logo = document.querySelector(".logo");
let isScrolled = false;

window.addEventListener("scroll", () => {
  const shouldShrink = window.scrollY > 50;

  if (shouldShrink !== isScrolled) {
    isScrolled = shouldShrink;

    gsap.to(navbar, {
      height: shouldShrink ? 50 : 80,
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(logo, {
      fontSize: shouldShrink ? "1.2rem" : "1.5rem",
      duration: 0.3
    });
  }
});`,
      css: `.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: #1c1e1d;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  transition: box-shadow 0.3s;
}

.navbar.shrunk {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #0ae448;
}`,
    },
  },
  {
    id: "navbar-bg-change",
    name: "Navbar Background Change",
    nameKz: "Навбар фонын өзгерту",
    description: "Navbar background changes on scroll",
    descriptionKz: "Скролл кезінде навбар фоны өзгереді",
    category: "navigation",
    playgroundType: "scroll",
    defaultText: "NAVBAR",
    code: {
      vue: `<template>
  <nav ref="navbarRef" class="navbar">
    <div class="logo">Logo</div>
    <ul class="nav-links">
      <li><a href="#">Басты</a></li>
      <li><a href="#">Туралы</a></li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

const navbarRef = ref(null);

const handleScroll = () => {
  const scrollProgress = Math.min(window.scrollY / 200, 1);

  gsap.to(navbarRef.value, {
    backgroundColor: \`rgba(28, 30, 29, \${scrollProgress})\`,
    backdropFilter: \`blur(\${scrollProgress * 10}px)\`,
    duration: 0.1
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>`,
      script: `const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const scrollProgress = Math.min(window.scrollY / 200, 1);

  gsap.to(navbar, {
    backgroundColor: \`rgba(28, 30, 29, \${scrollProgress})\`,
    backdropFilter: \`blur(\${scrollProgress * 10}px)\`,
    duration: 0.1
  });
});`,
      css: `.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 1000;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #0ae448;
}

.nav-links a {
  color: #fffce1;
}`,
    },
  },
  {
    id: "navbar-blur",
    name: "Navbar Blur Effect",
    nameKz: "Навбар бұлдырату эффекті",
    description: "Glassmorphism navbar with blur effect",
    descriptionKz: "Шыны эффектісімен бұлдыр навбар",
    category: "navigation",
    playgroundType: "scroll",
    defaultText: "NAVBAR",
    code: {
      vue: `<template>
  <nav ref="navbarRef" class="navbar glass">
    <div class="logo">Logo</div>
    <ul class="nav-links">
      <li><a href="#">Басты</a></li>
      <li><a href="#">Туралы</a></li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

const navbarRef = ref(null);

const handleScroll = () => {
  const isScrolled = window.scrollY > 20;

  gsap.to(navbarRef.value, {
    "--blur": isScrolled ? "20px" : "0px",
    "--bg-opacity": isScrolled ? 0.8 : 0.2,
    borderBottomColor: isScrolled
      ? "rgba(255, 255, 255, 0.1)"
      : "transparent",
    duration: 0.4,
    ease: "power2.out"
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>`,
      script: `const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const isScrolled = window.scrollY > 20;

  gsap.to(navbar, {
    "--blur": isScrolled ? "20px" : "0px",
    "--bg-opacity": isScrolled ? 0.8 : 0.2,
    duration: 0.4,
    ease: "power2.out"
  });
});`,
      css: `.navbar.glass {
  --blur: 0px;
  --bg-opacity: 0.2;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: rgba(28, 30, 29, var(--bg-opacity));
  backdrop-filter: blur(var(--blur));
  -webkit-backdrop-filter: blur(var(--blur));
  border-bottom: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
}`,
    },
  },
  // Hamburger menu effects
  {
    id: "hamburger-x",
    name: "Hamburger to X",
    nameKz: "Гамбургер X-ке",
    description: "Hamburger menu transforms to X on click",
    descriptionKz: "Басу кезінде гамбургер мәзір X белгісіне айналады",
    category: "navigation",
    playgroundType: "hover",
    defaultText: "MENU",
    code: {
      vue: `<template>
  <button ref="burgerRef" class="hamburger" @click="toggle">
    <span ref="line1Ref" class="line"></span>
    <span ref="line2Ref" class="line"></span>
    <span ref="line3Ref" class="line"></span>
  </button>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";

const burgerRef = ref(null);
const line1Ref = ref(null);
const line2Ref = ref(null);
const line3Ref = ref(null);
const isOpen = ref(false);

const toggle = () => {
  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    gsap.to(line1Ref.value, {
      rotation: 45,
      y: 8,
      duration: 0.3,
      ease: "power2.inOut"
    });
    gsap.to(line2Ref.value, {
      opacity: 0,
      scaleX: 0,
      duration: 0.2
    });
    gsap.to(line3Ref.value, {
      rotation: -45,
      y: -8,
      duration: 0.3,
      ease: "power2.inOut"
    });
  } else {
    gsap.to([line1Ref.value, line3Ref.value], {
      rotation: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.inOut"
    });
    gsap.to(line2Ref.value, {
      opacity: 1,
      scaleX: 1,
      duration: 0.2,
      delay: 0.1
    });
  }
};
</script>`,
      script: `const hamburger = document.querySelector(".hamburger");
const lines = hamburger.querySelectorAll(".line");
let isOpen = false;

hamburger.addEventListener("click", () => {
  isOpen = !isOpen;

  if (isOpen) {
    gsap.to(lines[0], {
      rotation: 45,
      y: 8,
      duration: 0.3,
      ease: "power2.inOut"
    });
    gsap.to(lines[1], {
      opacity: 0,
      scaleX: 0,
      duration: 0.2
    });
    gsap.to(lines[2], {
      rotation: -45,
      y: -8,
      duration: 0.3,
      ease: "power2.inOut"
    });
  } else {
    gsap.to([lines[0], lines[2]], {
      rotation: 0,
      y: 0,
      duration: 0.3
    });
    gsap.to(lines[1], {
      opacity: 1,
      scaleX: 1,
      duration: 0.2,
      delay: 0.1
    });
  }
});`,
      css: `.hamburger {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.hamburger .line {
  width: 30px;
  height: 3px;
  background: #0ae448;
  border-radius: 2px;
  transform-origin: center;
}`,
    },
  },
  {
    id: "menu-slide",
    name: "Menu Slide",
    nameKz: "Мәзір сырғыту",
    description: "Slide-in menu from the side",
    descriptionKz: "Бүйірден сырғып шығатын мәзір",
    category: "navigation",
    playgroundType: "hover",
    defaultText: "MENU",
    code: {
      vue: `<template>
  <div>
    <button @click="openMenu">Open Menu</button>
    <div ref="overlayRef" class="overlay" @click="closeMenu"></div>
    <nav ref="menuRef" class="slide-menu">
      <button class="close-btn" @click="closeMenu">✕</button>
      <ul>
        <li v-for="i in 5" :key="i" ref="itemsRef">
          <a href="#">Menu Item {{ i }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";

const menuRef = ref(null);
const overlayRef = ref(null);
const itemsRef = ref([]);

const openMenu = () => {
  const tl = gsap.timeline();

  tl.to(overlayRef.value, {
    opacity: 1,
    visibility: "visible",
    duration: 0.3
  })
  .to(menuRef.value, {
    x: 0,
    duration: 0.4,
    ease: "power3.out"
  }, "-=0.2")
  .from(itemsRef.value, {
    x: -30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.3
  }, "-=0.2");
};

const closeMenu = () => {
  const tl = gsap.timeline();

  tl.to(menuRef.value, {
    x: "-100%",
    duration: 0.3,
    ease: "power3.in"
  })
  .to(overlayRef.value, {
    opacity: 0,
    duration: 0.2,
    onComplete: () => {
      gsap.set(overlayRef.value, { visibility: "hidden" });
    }
  }, "-=0.1");
};
</script>`,
      script: `const menu = document.querySelector(".slide-menu");
const overlay = document.querySelector(".overlay");
const items = menu.querySelectorAll("li");
const openBtn = document.querySelector(".open-btn");
const closeBtn = document.querySelector(".close-btn");

const openMenu = () => {
  const tl = gsap.timeline();

  tl.to(overlay, {
    opacity: 1,
    visibility: "visible",
    duration: 0.3
  })
  .to(menu, {
    x: 0,
    duration: 0.4,
    ease: "power3.out"
  }, "-=0.2")
  .from(items, {
    x: -30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.3
  }, "-=0.2");
};

const closeMenu = () => {
  gsap.to(menu, {
    x: "-100%",
    duration: 0.3,
    ease: "power3.in"
  });
  gsap.to(overlay, {
    opacity: 0,
    duration: 0.2,
    delay: 0.1
  });
};

openBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);`,
      css: `.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  z-index: 998;
}

.slide-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background: #1c1e1d;
  transform: translateX(-100%);
  padding: 2rem;
  z-index: 999;
}

.slide-menu ul {
  list-style: none;
  margin-top: 3rem;
}

.slide-menu li {
  margin-bottom: 1rem;
}

.slide-menu a {
  color: #fffce1;
  font-size: 1.2rem;
}`,
    },
  },
  {
    id: "menu-fullscreen",
    name: "Fullscreen Menu",
    nameKz: "Толық экран мәзір",
    description: "Fullscreen overlay menu with stagger animation",
    descriptionKz: "Stagger анимациясымен толық экран мәзір",
    category: "navigation",
    playgroundType: "hover",
    defaultText: "MENU",
    code: {
      vue: `<template>
  <div>
    <button @click="toggleMenu" class="menu-toggle">
      {{ isOpen ? '✕' : '☰' }}
    </button>
    <nav ref="menuRef" class="fullscreen-menu">
      <ul>
        <li v-for="item in menuItems" :key="item" ref="itemsRef">
          <a href="#">{{ item }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";

const menuRef = ref(null);
const itemsRef = ref([]);
const isOpen = ref(false);
const menuItems = ["Басты", "Жобалар", "Біз туралы", "Байланыс"];

const toggleMenu = () => {
  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    gsap.to(menuRef.value, {
      clipPath: "circle(150% at top right)",
      duration: 0.8,
      ease: "power3.inOut"
    });
    gsap.from(itemsRef.value, {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      delay: 0.3,
      ease: "power3.out"
    });
  } else {
    gsap.to(itemsRef.value, {
      y: -50,
      opacity: 0,
      stagger: 0.05,
      duration: 0.3
    });
    gsap.to(menuRef.value, {
      clipPath: "circle(0% at top right)",
      duration: 0.6,
      delay: 0.2,
      ease: "power3.inOut"
    });
  }
};
</script>`,
      script: `const menu = document.querySelector(".fullscreen-menu");
const items = menu.querySelectorAll("li");
const toggle = document.querySelector(".menu-toggle");
let isOpen = false;

toggle.addEventListener("click", () => {
  isOpen = !isOpen;

  if (isOpen) {
    gsap.to(menu, {
      clipPath: "circle(150% at top right)",
      duration: 0.8,
      ease: "power3.inOut"
    });
    gsap.from(items, {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      delay: 0.3
    });
  } else {
    gsap.to(items, {
      y: -50,
      opacity: 0,
      stagger: 0.05,
      duration: 0.3
    });
    gsap.to(menu, {
      clipPath: "circle(0% at top right)",
      duration: 0.6,
      delay: 0.2
    });
  }
});`,
      css: `.fullscreen-menu {
  position: fixed;
  inset: 0;
  background: #0e100f;
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: circle(0% at top right);
  z-index: 998;
}

.fullscreen-menu ul {
  list-style: none;
  text-align: center;
}

.fullscreen-menu li {
  margin: 2rem 0;
}

.fullscreen-menu a {
  font-size: 3rem;
  color: #fffce1;
  text-decoration: none;
  transition: color 0.3s;
}

.fullscreen-menu a:hover {
  color: #0ae448;
}

.menu-toggle {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 999;
  font-size: 2rem;
  background: none;
  border: none;
  color: #0ae448;
  cursor: pointer;
}`,
    },
  },
  {
    id: "menu-stagger",
    name: "Menu Stagger Animation",
    nameKz: "Мәзір stagger анимация",
    description: "Menu items appear with stagger effect",
    descriptionKz: "Мәзір элементтері кезекпен пайда болады",
    category: "navigation",
    playgroundType: "hover",
    defaultText: "MENU",
    code: {
      vue: `<template>
  <nav ref="menuRef" class="stagger-menu">
    <ul>
      <li v-for="(item, index) in items" :key="index" ref="itemsRef">
        <a href="#">
          <span class="number">0{{ index + 1 }}</span>
          <span class="text">{{ item }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const menuRef = ref(null);
const itemsRef = ref([]);
const items = ["Home", "About", "Projects", "Contact"];

onMounted(() => {
  gsap.from(itemsRef.value, {
    x: -100,
    opacity: 0,
    stagger: {
      each: 0.15,
      from: "start"
    },
    duration: 0.8,
    ease: "power3.out"
  });
});

// Hover animations for each item
const onItemEnter = (index) => {
  gsap.to(itemsRef.value[index], {
    x: 20,
    color: "#0ae448",
    duration: 0.3
  });
};

const onItemLeave = (index) => {
  gsap.to(itemsRef.value[index], {
    x: 0,
    color: "#fffce1",
    duration: 0.3
  });
};
</script>`,
      script: `const items = document.querySelectorAll(".stagger-menu li");

gsap.from(items, {
  x: -100,
  opacity: 0,
  stagger: {
    each: 0.15,
    from: "start"
  },
  duration: 0.8,
  ease: "power3.out"
});

items.forEach(item => {
  item.addEventListener("mouseenter", () => {
    gsap.to(item, {
      x: 20,
      color: "#0ae448",
      duration: 0.3
    });
  });

  item.addEventListener("mouseleave", () => {
    gsap.to(item, {
      x: 0,
      color: "#fffce1",
      duration: 0.3
    });
  });
});`,
      css: `.stagger-menu {
  padding: 2rem;
}

.stagger-menu ul {
  list-style: none;
}

.stagger-menu li {
  margin: 1.5rem 0;
}

.stagger-menu a {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #fffce1;
  text-decoration: none;
  font-size: 2rem;
}

.stagger-menu .number {
  font-size: 0.8rem;
  color: #0ae448;
  opacity: 0.7;
}`,
    },
  },
  // Dropdown and mega menu
  {
    id: "dropdown-anim",
    name: "Animated Dropdown",
    nameKz: "Анимациялық dropdown",
    description: "Smooth dropdown with stagger items",
    descriptionKz: "Stagger элементтермен тегіс dropdown",
    category: "navigation",
    playgroundType: "hover",
    defaultText: "DROPDOWN",
    code: {
      vue: `<template>
  <div class="dropdown" @mouseenter="openDropdown" @mouseleave="closeDropdown">
    <button class="dropdown-toggle">
      Services
      <span class="arrow">▼</span>
    </button>
    <div ref="menuRef" class="dropdown-menu">
      <a v-for="item in items" :key="item" ref="itemsRef" href="#">
        {{ item }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";

const menuRef = ref(null);
const itemsRef = ref([]);
const items = ["Web Development", "Mobile Apps", "UI/UX Design", "Consulting"];
let tl = null;

const openDropdown = () => {
  if (tl) tl.kill();

  tl = gsap.timeline();
  tl.to(menuRef.value, {
    height: "auto",
    opacity: 1,
    duration: 0.3,
    ease: "power2.out"
  })
  .from(itemsRef.value, {
    y: -10,
    opacity: 0,
    stagger: 0.05,
    duration: 0.2
  }, "-=0.1");
};

const closeDropdown = () => {
  if (tl) tl.kill();

  tl = gsap.timeline();
  tl.to(itemsRef.value, {
    y: -10,
    opacity: 0,
    stagger: 0.03,
    duration: 0.15
  })
  .to(menuRef.value, {
    height: 0,
    opacity: 0,
    duration: 0.2
  }, "-=0.1");
};
</script>`,
      script: `const dropdown = document.querySelector(".dropdown");
const menu = dropdown.querySelector(".dropdown-menu");
const items = menu.querySelectorAll("a");

dropdown.addEventListener("mouseenter", () => {
  gsap.timeline()
    .to(menu, {
      height: "auto",
      opacity: 1,
      duration: 0.3
    })
    .from(items, {
      y: -10,
      opacity: 0,
      stagger: 0.05,
      duration: 0.2
    }, "-=0.1");
});

dropdown.addEventListener("mouseleave", () => {
  gsap.timeline()
    .to(items, {
      y: -10,
      opacity: 0,
      stagger: 0.03,
      duration: 0.15
    })
    .to(menu, {
      height: 0,
      opacity: 0,
      duration: 0.2
    }, "-=0.1");
});`,
      css: `.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  padding: 0.8rem 1.5rem;
  background: #1c1e1d;
  color: #fffce1;
  border: 1px solid #2a2d2b;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: #1c1e1d;
  border: 1px solid #2a2d2b;
  height: 0;
  opacity: 0;
  overflow: hidden;
}

.dropdown-menu a {
  display: block;
  padding: 0.8rem 1rem;
  color: #fffce1;
  text-decoration: none;
  transition: background 0.2s;
}

.dropdown-menu a:hover {
  background: #0ae448;
  color: #0e100f;
}`,
    },
  },
  {
    id: "mega-menu",
    name: "Mega Menu",
    nameKz: "Мега мәзір",
    description: "Large dropdown with multiple columns",
    descriptionKz: "Бірнеше бағандары бар үлкен dropdown",
    category: "navigation",
    playgroundType: "hover",
    defaultText: "MEGA MENU",
    code: {
      vue: `<template>
  <div class="mega-menu-wrapper" @mouseenter="open" @mouseleave="close">
    <button class="trigger">Products ▼</button>
    <div ref="megaRef" class="mega-menu">
      <div v-for="(col, i) in columns" :key="i" ref="colsRef" class="column">
        <h4>{{ col.title }}</h4>
        <a v-for="item in col.items" :key="item" href="#">{{ item }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";

const megaRef = ref(null);
const colsRef = ref([]);

const columns = [
  { title: "Software", items: ["Desktop Apps", "Mobile Apps", "Web Apps"] },
  { title: "Services", items: ["Consulting", "Support", "Training"] },
  { title: "Resources", items: ["Documentation", "Tutorials", "Blog"] }
];

const open = () => {
  gsap.to(megaRef.value, {
    height: "auto",
    opacity: 1,
    duration: 0.4,
    ease: "power2.out"
  });
  gsap.from(colsRef.value, {
    y: 20,
    opacity: 0,
    stagger: 0.1,
    duration: 0.4,
    delay: 0.1
  });
};

const close = () => {
  gsap.to(megaRef.value, {
    height: 0,
    opacity: 0,
    duration: 0.3
  });
};
</script>`,
      script: `const wrapper = document.querySelector(".mega-menu-wrapper");
const mega = document.querySelector(".mega-menu");
const columns = mega.querySelectorAll(".column");

wrapper.addEventListener("mouseenter", () => {
  gsap.to(mega, {
    height: "auto",
    opacity: 1,
    duration: 0.4,
    ease: "power2.out"
  });
  gsap.from(columns, {
    y: 20,
    opacity: 0,
    stagger: 0.1,
    duration: 0.4,
    delay: 0.1
  });
});

wrapper.addEventListener("mouseleave", () => {
  gsap.to(mega, {
    height: 0,
    opacity: 0,
    duration: 0.3
  });
});`,
      css: `.mega-menu-wrapper {
  position: relative;
}

.trigger {
  padding: 1rem 1.5rem;
  background: #1c1e1d;
  color: #fffce1;
  border: 1px solid #2a2d2b;
  cursor: pointer;
}

.mega-menu {
  position: absolute;
  top: 100%;
  left: 0;
  display: flex;
  gap: 2rem;
  padding: 2rem;
  background: #1c1e1d;
  border: 1px solid #2a2d2b;
  min-width: 600px;
  height: 0;
  opacity: 0;
  overflow: hidden;
}

.mega-menu .column h4 {
  color: #0ae448;
  margin-bottom: 1rem;
}

.mega-menu .column a {
  display: block;
  color: #a1a1a6;
  padding: 0.4rem 0;
  text-decoration: none;
}

.mega-menu .column a:hover {
  color: #fffce1;
}`,
    },
  },
  // Link effects
  {
    id: "link-underline",
    name: "Link Underline Animation",
    nameKz: "Сілтеме астын сызу анимациясы",
    description: "Animated underline on hover",
    descriptionKz: "Hover кезінде анимациялық астын сызу",
    category: "navigation",
    playgroundType: "hover",
    defaultText: "HOVER ME",
    code: {
      vue: `<template>
  <a
    ref="linkRef"
    href="#"
    class="animated-link"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <span>{{ text }}</span>
    <span ref="underlineRef" class="underline"></span>
  </a>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";

const props = defineProps({
  text: { type: String, default: "Learn More" }
});

const linkRef = ref(null);
const underlineRef = ref(null);

const onEnter = () => {
  gsap.fromTo(underlineRef.value,
    { scaleX: 0, transformOrigin: "left center" },
    { scaleX: 1, duration: 0.4, ease: "power2.out" }
  );
};

const onLeave = () => {
  gsap.to(underlineRef.value, {
    scaleX: 0,
    transformOrigin: "right center",
    duration: 0.3,
    ease: "power2.in"
  });
};
</script>`,
      script: `const links = document.querySelectorAll(".animated-link");

links.forEach(link => {
  const underline = link.querySelector(".underline");

  link.addEventListener("mouseenter", () => {
    gsap.fromTo(underline,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.4, ease: "power2.out" }
    );
  });

  link.addEventListener("mouseleave", () => {
    gsap.to(underline, {
      scaleX: 0,
      transformOrigin: "right center",
      duration: 0.3,
      ease: "power2.in"
    });
  });
});`,
      css: `.animated-link {
  position: relative;
  display: inline-block;
  color: #fffce1;
  text-decoration: none;
  font-size: 1.2rem;
  padding-bottom: 4px;
}

.animated-link .underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #0ae448;
  transform: scaleX(0);
}`,
    },
  },
  {
    id: "link-fill",
    name: "Link Fill Effect",
    nameKz: "Сілтеме толтыру эффекті",
    description: "Text fills with color on hover",
    descriptionKz: "Hover кезінде мәтін түспен толады",
    category: "navigation",
    playgroundType: "hover",
    defaultText: "HOVER ME",
    code: {
      vue: `<template>
  <a
    ref="linkRef"
    href="#"
    class="fill-link"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <span class="text">{{ text }}</span>
    <span ref="fillRef" class="fill-text" aria-hidden="true">{{ text }}</span>
  </a>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";

const props = defineProps({
  text: { type: String, default: "Explore" }
});

const linkRef = ref(null);
const fillRef = ref(null);

const onEnter = () => {
  gsap.to(fillRef.value, {
    clipPath: "inset(0 0 0 0)",
    duration: 0.4,
    ease: "power2.out"
  });
};

const onLeave = () => {
  gsap.to(fillRef.value, {
    clipPath: "inset(0 100% 0 0)",
    duration: 0.3,
    ease: "power2.in"
  });
};
</script>`,
      script: `const links = document.querySelectorAll(".fill-link");

links.forEach(link => {
  const fill = link.querySelector(".fill-text");

  link.addEventListener("mouseenter", () => {
    gsap.to(fill, {
      clipPath: "inset(0 0 0 0)",
      duration: 0.4,
      ease: "power2.out"
    });
  });

  link.addEventListener("mouseleave", () => {
    gsap.to(fill, {
      clipPath: "inset(0 100% 0 0)",
      duration: 0.3,
      ease: "power2.in"
    });
  });
});`,
      css: `.fill-link {
  position: relative;
  display: inline-block;
  font-size: 2rem;
  font-weight: bold;
  color: #a1a1a6;
  text-decoration: none;
  overflow: hidden;
}

.fill-link .text {
  display: block;
}

.fill-link .fill-text {
  position: absolute;
  top: 0;
  left: 0;
  color: #0ae448;
  clip-path: inset(0 100% 0 0);
}`,
    },
  },
  {
    id: "active-indicator",
    name: "Active Link Indicator",
    nameKz: "Белсенді сілтеме индикаторы",
    description: "Moving indicator for active navigation item",
    descriptionKz: "Белсенді навигация элементі үшін қозғалмалы индикатор",
    category: "navigation",
    playgroundType: "hover",
    defaultText: "NAV",
    code: {
      vue: `<template>
  <nav class="nav-with-indicator">
    <ul ref="navRef">
      <li v-for="(item, i) in items" :key="i" @click="setActive(i)">
        <a href="#" :class="{ active: activeIndex === i }">{{ item }}</a>
      </li>
    </ul>
    <span ref="indicatorRef" class="indicator"></span>
  </nav>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import gsap from "gsap";

const navRef = ref(null);
const indicatorRef = ref(null);
const activeIndex = ref(0);
const items = ["Home", "About", "Work", "Contact"];

const setActive = async (index) => {
  activeIndex.value = index;
  await nextTick();
  moveIndicator();
};

const moveIndicator = () => {
  const activeItem = navRef.value.querySelector("li:nth-child(" + (activeIndex.value + 1) + ")");
  const rect = activeItem.getBoundingClientRect();
  const navRect = navRef.value.getBoundingClientRect();

  gsap.to(indicatorRef.value, {
    x: rect.left - navRect.left,
    width: rect.width,
    duration: 0.4,
    ease: "power3.out"
  });
};

onMounted(() => {
  moveIndicator();
});
</script>`,
      script: `const nav = document.querySelector(".nav-with-indicator ul");
const indicator = document.querySelector(".indicator");
const items = nav.querySelectorAll("li");

const moveIndicator = (item) => {
  const rect = item.getBoundingClientRect();
  const navRect = nav.getBoundingClientRect();

  gsap.to(indicator, {
    x: rect.left - navRect.left,
    width: rect.width,
    duration: 0.4,
    ease: "power3.out"
  });
};

items.forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    items.forEach(i => i.querySelector("a").classList.remove("active"));
    item.querySelector("a").classList.add("active");
    moveIndicator(item);
  });
});

// Initial position
moveIndicator(items[0]);`,
      css: `.nav-with-indicator {
  position: relative;
}

.nav-with-indicator ul {
  display: flex;
  gap: 0.5rem;
  list-style: none;
  position: relative;
}

.nav-with-indicator li {
  padding: 0.8rem 1.5rem;
  cursor: pointer;
}

.nav-with-indicator a {
  color: #a1a1a6;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-with-indicator a.active {
  color: #0ae448;
}

.indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: #0ae448;
}`,
    },
  },
  {
    id: "breadcrumb",
    name: "Animated Breadcrumb",
    nameKz: "Анимациялық breadcrumb",
    description: "Breadcrumb navigation with entry animation",
    descriptionKz: "Кіру анимациясы бар breadcrumb навигация",
    category: "navigation",
    playgroundType: "hover",
    defaultText: "BREADCRUMB",
    code: {
      vue: `<template>
  <nav class="breadcrumb" ref="breadcrumbRef">
    <a
      v-for="(item, i) in items"
      :key="i"
      ref="itemsRef"
      href="#"
      :class="{ current: i === items.length - 1 }"
    >
      <span>{{ item }}</span>
      <span v-if="i < items.length - 1" class="separator">/</span>
    </a>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const breadcrumbRef = ref(null);
const itemsRef = ref([]);
const items = ["Home", "Products", "Electronics", "Laptops"];

onMounted(() => {
  gsap.from(itemsRef.value, {
    x: -20,
    opacity: 0,
    stagger: 0.1,
    duration: 0.5,
    ease: "power2.out"
  });
});

// Hover effect
const onItemHover = (index) => {
  if (index < items.length - 1) {
    gsap.to(itemsRef.value[index], {
      color: "#0ae448",
      x: 5,
      duration: 0.2
    });
  }
};

const onItemLeave = (index) => {
  gsap.to(itemsRef.value[index], {
    color: "#a1a1a6",
    x: 0,
    duration: 0.2
  });
};
</script>`,
      script: `const items = document.querySelectorAll(".breadcrumb a");

gsap.from(items, {
  x: -20,
  opacity: 0,
  stagger: 0.1,
  duration: 0.5,
  ease: "power2.out"
});

items.forEach((item, i) => {
  if (i < items.length - 1) {
    item.addEventListener("mouseenter", () => {
      gsap.to(item, {
        color: "#0ae448",
        x: 5,
        duration: 0.2
      });
    });

    item.addEventListener("mouseleave", () => {
      gsap.to(item, {
        color: "#a1a1a6",
        x: 0,
        duration: 0.2
      });
    });
  }
});`,
      css: `.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
}

.breadcrumb a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #a1a1a6;
  text-decoration: none;
  font-size: 0.9rem;
}

.breadcrumb a.current {
  color: #fffce1;
  pointer-events: none;
}

.breadcrumb .separator {
  color: #2a2d2b;
}`,
    },
  },
];
