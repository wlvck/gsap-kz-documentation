import type { Effect } from "~/types/effects";

export const containerEffects: Effect[] = [
  // Background effects
  {
    id: "gradient-anim",
    name: "Animated Gradient",
    nameKz: "Анимациялық градиент",
    description: "Smoothly animated gradient background",
    descriptionKz: "Тегіс анимациялық градиент фон",
    category: "container",
    playgroundType: "loading",
    defaultText: "GRADIENT",
    code: {
      vue: `<template>
  <div ref="containerRef" class="gradient-container">
    <h2>Animated Gradient</h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const containerRef = ref(null);

onMounted(() => {
  gsap.to(containerRef.value, {
    backgroundPosition: "200% 200%",
    duration: 8,
    ease: "none",
    repeat: -1
  });
});
</script>`,
      script: `const container = document.querySelector(".gradient-container");

gsap.to(container, {
  backgroundPosition: "200% 200%",
  duration: 8,
  ease: "none",
  repeat: -1
});`,
      css: `.gradient-container {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    -45deg,
    #0ae448,
    #0ba934,
    #089c2d,
    #06d6a0,
    #0ae448
  );
  background-size: 400% 400%;
  border-radius: 16px;
}

.gradient-container h2 {
  color: #0e100f;
  font-size: 2rem;
  font-weight: bold;
}`,
    },
  },
  {
    id: "bg-color-transition",
    name: "Background Color Transition",
    nameKz: "Фон түсін ауыстыру",
    description: "Smooth background color transitions",
    descriptionKz: "Тегіс фон түсі ауысуы",
    category: "container",
    playgroundType: "loading",
    defaultText: "COLOR",
    code: {
      vue: `<template>
  <div ref="containerRef" class="color-container">
    <h2>Color Transition</h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const containerRef = ref(null);
const colors = ["#0ae448", "#0ba934", "#06d6a0", "#00b4d8", "#0ae448"];

onMounted(() => {
  gsap.to(containerRef.value, {
    backgroundColor: colors,
    duration: 2,
    ease: "power1.inOut",
    repeat: -1,
    repeatDelay: 0.5
  });
});
</script>`,
      script: `const container = document.querySelector(".color-container");
const colors = ["#0ae448", "#0ba934", "#06d6a0", "#00b4d8", "#0ae448"];

gsap.to(container, {
  backgroundColor: colors,
  duration: 2,
  ease: "power1.inOut",
  repeat: -1,
  repeatDelay: 0.5
});`,
      css: `.color-container {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0ae448;
  border-radius: 16px;
}

.color-container h2 {
  color: #0e100f;
  font-size: 2rem;
  font-weight: bold;
}`,
    },
  },
  {
    id: "animated-shapes",
    name: "Animated Shapes",
    nameKz: "Анимациялық фигуралар",
    description: "Floating animated shapes in background",
    descriptionKz: "Фонда жүзіп жүрген анимациялық фигуралар",
    category: "container",
    playgroundType: "loading",
    defaultText: "SHAPES",
    code: {
      vue: `<template>
  <div class="shapes-container">
    <div v-for="i in 5" :key="i" :ref="el => shapes[i-1] = el" class="shape" />
    <h2>Animated Shapes</h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const shapes = ref([]);

onMounted(() => {
  shapes.value.forEach((shape, i) => {
    gsap.set(shape, {
      x: Math.random() * 300,
      y: Math.random() * 200,
      scale: 0.5 + Math.random() * 0.5
    });

    gsap.to(shape, {
      x: "random(-50, 350)",
      y: "random(-50, 250)",
      rotation: 360,
      duration: 5 + i * 2,
      ease: "none",
      repeat: -1,
      repeatRefresh: true
    });
  });
});
</script>`,
      script: `const shapes = document.querySelectorAll(".shape");

shapes.forEach((shape, i) => {
  gsap.set(shape, {
    x: Math.random() * 300,
    y: Math.random() * 200,
    scale: 0.5 + Math.random() * 0.5
  });

  gsap.to(shape, {
    x: "random(-50, 350)",
    y: "random(-50, 250)",
    rotation: 360,
    duration: 5 + i * 2,
    ease: "none",
    repeat: -1,
    repeatRefresh: true
  });
});`,
      css: `.shapes-container {
  position: relative;
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1c1e1d;
  border-radius: 16px;
  overflow: hidden;
}

.shape {
  position: absolute;
  width: 50px;
  height: 50px;
  background: rgba(10, 228, 72, 0.2);
  border-radius: 50%;
}

.shape:nth-child(2) {
  border-radius: 0;
}

.shape:nth-child(3) {
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
}

.shapes-container h2 {
  position: relative;
  z-index: 1;
  color: #fffce1;
  font-size: 2rem;
}`,
    },
  },
  {
    id: "particles",
    name: "Particles Effect",
    nameKz: "Бөлшектер эффекті",
    description: "Floating particles animation",
    descriptionKz: "Жүзіп жүрген бөлшектер анимациясы",
    category: "container",
    playgroundType: "loading",
    defaultText: "PARTICLES",
    code: {
      vue: `<template>
  <div class="particles-container">
    <div v-for="i in 20" :key="i" :ref="el => particles[i-1] = el" class="particle" />
    <h2>Particles</h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const particles = ref([]);

onMounted(() => {
  particles.value.forEach((particle) => {
    const startX = Math.random() * 100;
    const startY = 100 + Math.random() * 20;

    gsap.set(particle, {
      xPercent: startX,
      yPercent: startY,
      scale: Math.random() * 0.5 + 0.5
    });

    gsap.to(particle, {
      yPercent: -20,
      opacity: 0,
      duration: 3 + Math.random() * 3,
      repeat: -1,
      delay: Math.random() * 3,
      ease: "power1.out"
    });
  });
});
</script>`,
      script: `const particles = document.querySelectorAll(".particle");

particles.forEach((particle) => {
  const startX = Math.random() * 100;
  const startY = 100 + Math.random() * 20;

  gsap.set(particle, {
    xPercent: startX,
    yPercent: startY,
    scale: Math.random() * 0.5 + 0.5
  });

  gsap.to(particle, {
    yPercent: -20,
    opacity: 0,
    duration: 3 + Math.random() * 3,
    repeat: -1,
    delay: Math.random() * 3,
    ease: "power1.out"
  });
});`,
      css: `.particles-container {
  position: relative;
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0e100f;
  border-radius: 16px;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #0ae448;
  border-radius: 50%;
  opacity: 0.8;
}

.particles-container h2 {
  position: relative;
  z-index: 1;
  color: #fffce1;
  font-size: 2rem;
}`,
    },
  },
  {
    id: "wave-anim",
    name: "Wave Animation",
    nameKz: "Толқын анимациясы",
    description: "Animated wave effect in background",
    descriptionKz: "Фондағы толқын анимациясы",
    category: "container",
    playgroundType: "loading",
    defaultText: "WAVE",
    code: {
      vue: `<template>
  <div class="wave-container">
    <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path ref="waveRef" fill="#0ae448" fill-opacity="0.3" />
    </svg>
    <h2>Wave Animation</h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const waveRef = ref(null);

const paths = [
  "M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,133.3C672,117,768,139,864,165.3C960,192,1056,224,1152,208C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
  "M0,64L48,96C96,128,192,192,288,197.3C384,203,480,149,576,144C672,139,768,181,864,197.3C960,213,1056,203,1152,176C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
];

onMounted(() => {
  let index = 0;
  gsap.set(waveRef.value, { attr: { d: paths[0] } });

  gsap.to({}, {
    duration: 3,
    repeat: -1,
    onRepeat: () => {
      index = (index + 1) % paths.length;
      gsap.to(waveRef.value, {
        attr: { d: paths[index] },
        duration: 1.5,
        ease: "power1.inOut"
      });
    }
  });
});
</script>`,
      script: `const wave = document.querySelector(".wave-path");

const paths = [
  "M0,160L48,176C96,192,192,224,288,213.3...",
  "M0,64L48,96C96,128,192,192,288,197.3..."
];

let index = 0;
gsap.set(wave, { attr: { d: paths[0] } });

setInterval(() => {
  index = (index + 1) % paths.length;
  gsap.to(wave, {
    attr: { d: paths[index] },
    duration: 1.5,
    ease: "power1.inOut"
  });
}, 3000);`,
      css: `.wave-container {
  position: relative;
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1c1e1d;
  border-radius: 16px;
  overflow: hidden;
}

.wave-container svg {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
}

.wave-container h2 {
  position: relative;
  z-index: 1;
  color: #fffce1;
  font-size: 2rem;
}`,
    },
  },
  // Divider effects
  {
    id: "divider-anim",
    name: "Animated Divider",
    nameKz: "Анимациялық бөлгіш",
    description: "Line divider with animation",
    descriptionKz: "Анимациялық сызық бөлгіш",
    category: "container",
    playgroundType: "scroll",
    defaultText: "DIVIDER",
    code: {
      vue: `<template>
  <div class="divider-section">
    <div ref="dividerRef" class="divider">
      <span class="divider-line"></span>
      <span class="divider-icon">✦</span>
      <span class="divider-line"></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const dividerRef = ref(null);

onMounted(() => {
  const lines = dividerRef.value.querySelectorAll(".divider-line");
  const icon = dividerRef.value.querySelector(".divider-icon");

  gsap.from(lines, {
    scaleX: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: dividerRef.value,
      start: "top 80%"
    }
  });

  gsap.from(icon, {
    scale: 0,
    rotation: 180,
    duration: 0.6,
    delay: 0.5,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: dividerRef.value,
      start: "top 80%"
    }
  });
});
</script>`,
      script: `gsap.registerPlugin(ScrollTrigger);

const divider = document.querySelector(".divider");
const lines = divider.querySelectorAll(".divider-line");
const icon = divider.querySelector(".divider-icon");

gsap.from(lines, {
  scaleX: 0,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: divider,
    start: "top 80%"
  }
});

gsap.from(icon, {
  scale: 0,
  rotation: 180,
  duration: 0.6,
  delay: 0.5,
  ease: "back.out(1.7)",
  scrollTrigger: {
    trigger: divider,
    start: "top 80%"
  }
});`,
      css: `.divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0;
}

.divider-line {
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, transparent, #0ae448, transparent);
  transform-origin: center;
}

.divider-icon {
  color: #0ae448;
  font-size: 1.5rem;
}`,
    },
  },
  {
    id: "wave-divider",
    name: "Wave Divider",
    nameKz: "Толқын бөлгіш",
    description: "SVG wave shape divider",
    descriptionKz: "SVG толқын фигурасы бөлгіш",
    category: "container",
    playgroundType: "scroll",
    defaultText: "WAVE DIVIDER",
    code: {
      vue: `<template>
  <div class="wave-divider-section">
    <svg ref="svgRef" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path ref="pathRef" class="wave-path" />
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const svgRef = ref(null);
const pathRef = ref(null);

onMounted(() => {
  gsap.set(pathRef.value, {
    attr: {
      d: "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
    },
    fill: "#0ae448"
  });

  gsap.from(pathRef.value, {
    scaleY: 0,
    transformOrigin: "bottom",
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: svgRef.value,
      start: "top 90%"
    }
  });
});
</script>`,
      script: `gsap.registerPlugin(ScrollTrigger);

const svg = document.querySelector(".wave-divider svg");
const path = svg.querySelector("path");

gsap.from(path, {
  scaleY: 0,
  transformOrigin: "bottom",
  duration: 1.5,
  ease: "power2.out",
  scrollTrigger: {
    trigger: svg,
    start: "top 90%"
  }
});`,
      css: `.wave-divider-section {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.wave-divider-section svg {
  display: block;
  width: 100%;
  height: 120px;
}

.wave-path {
  fill: #0ae448;
}`,
    },
  },
  {
    id: "diagonal-reveal",
    name: "Diagonal Reveal",
    nameKz: "Диагональді ашу",
    description: "Diagonal reveal animation for sections",
    descriptionKz: "Секциялар үшін диагональді ашу анимациясы",
    category: "container",
    playgroundType: "scroll",
    defaultText: "DIAGONAL",
    code: {
      vue: `<template>
  <div ref="sectionRef" class="diagonal-section">
    <div ref="overlayRef" class="diagonal-overlay"></div>
    <div class="diagonal-content">
      <h2>Diagonal Reveal</h2>
      <p>Контент диагональді ашылады</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const overlayRef = ref(null);

onMounted(() => {
  gsap.to(overlayRef.value, {
    clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
    duration: 1.2,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 70%"
    }
  });
});
</script>`,
      script: `gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector(".diagonal-section");
const overlay = section.querySelector(".diagonal-overlay");

gsap.to(overlay, {
  clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
  duration: 1.2,
  ease: "power2.inOut",
  scrollTrigger: {
    trigger: section,
    start: "top 70%"
  }
});`,
      css: `.diagonal-section {
  position: relative;
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0ae448;
  overflow: hidden;
}

.diagonal-overlay {
  position: absolute;
  inset: 0;
  background: #1c1e1d;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}

.diagonal-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #0e100f;
}

.diagonal-content h2 {
  font-size: 2rem;
  font-weight: bold;
}`,
    },
  },
  // Section effects
  {
    id: "section-reveal",
    name: "Section Reveal",
    nameKz: "Секция ашу",
    description: "Reveal section on scroll",
    descriptionKz: "Скролл кезінде секцияны ашу",
    category: "container",
    playgroundType: "scroll",
    defaultText: "REVEAL",
    code: {
      vue: `<template>
  <div ref="sectionRef" class="reveal-section">
    <div ref="contentRef" class="reveal-content">
      <h2>Section Reveal</h2>
      <p>Бұл контент скролл кезінде пайда болады</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const contentRef = ref(null);

onMounted(() => {
  gsap.from(contentRef.value, {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 80%",
      end: "top 30%",
      scrub: 1
    }
  });
});
</script>`,
      script: `gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector(".reveal-section");
const content = section.querySelector(".reveal-content");

gsap.from(content, {
  y: 100,
  opacity: 0,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: section,
    start: "top 80%",
    end: "top 30%",
    scrub: 1
  }
});`,
      css: `.reveal-section {
  width: 100%;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1c1e1d;
  border-radius: 16px;
}

.reveal-content {
  text-align: center;
  padding: 2rem;
}

.reveal-content h2 {
  color: #0ae448;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.reveal-content p {
  color: #a1a1a6;
}`,
    },
  },
  {
    id: "section-transition",
    name: "Section Transition",
    nameKz: "Секция ауысуы",
    description: "Smooth transition between sections",
    descriptionKz: "Секциялар арасындағы тегіс ауысу",
    category: "container",
    playgroundType: "scroll",
    defaultText: "TRANSITION",
    code: {
      vue: `<template>
  <div class="sections-wrapper">
    <div
      v-for="(section, i) in sections"
      :key="i"
      :ref="el => sectionRefs[i] = el"
      class="transition-section"
      :style="{ backgroundColor: section.bg }"
    >
      <h2 :style="{ color: section.text }">{{ section.title }}</h2>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRefs = ref([]);
const sections = [
  { title: "Section 1", bg: "#0ae448", text: "#0e100f" },
  { title: "Section 2", bg: "#1c1e1d", text: "#0ae448" },
  { title: "Section 3", bg: "#0e100f", text: "#fffce1" }
];

onMounted(() => {
  sectionRefs.value.forEach((section, i) => {
    if (i === 0) return;

    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "top top",
      scrub: true,
      onUpdate: (self) => {
        gsap.set(section, {
          clipPath: \`inset(\${(1 - self.progress) * 100}% 0 0 0)\`
        });
      }
    });
  });
});
</script>`,
      script: `gsap.registerPlugin(ScrollTrigger);

const sections = document.querySelectorAll(".transition-section");

sections.forEach((section, i) => {
  if (i === 0) return;

  ScrollTrigger.create({
    trigger: section,
    start: "top bottom",
    end: "top top",
    scrub: true,
    onUpdate: (self) => {
      gsap.set(section, {
        clipPath: \`inset(\${(1 - self.progress) * 100}% 0 0 0)\`
      });
    }
  });
});`,
      css: `.sections-wrapper {
  position: relative;
}

.transition-section {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
}

.transition-section h2 {
  font-size: 3rem;
  font-weight: bold;
}`,
    },
  },
  // Interactive container effects
  {
    id: "accordion",
    name: "Accordion",
    nameKz: "Аккордеон",
    description: "Animated accordion component",
    descriptionKz: "Анимациялық аккордеон компоненті",
    category: "container",
    playgroundType: "hover",
    defaultText: "ACCORDION",
    code: {
      vue: `<template>
  <div class="accordion">
    <div
      v-for="(item, i) in items"
      :key="i"
      class="accordion-item"
    >
      <button
        class="accordion-header"
        @click="toggle(i)"
      >
        <span>{{ item.title }}</span>
        <span class="icon" :class="{ open: activeIndex === i }">+</span>
      </button>
      <div
        :ref="el => contentRefs[i] = el"
        class="accordion-content"
      >
        <p>{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";

const contentRefs = ref([]);
const activeIndex = ref(-1);

const items = [
  { title: "Item 1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { title: "Item 2", content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { title: "Item 3", content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco." }
];

const toggle = (index) => {
  const content = contentRefs.value[index];

  if (activeIndex.value === index) {
    gsap.to(content, { height: 0, duration: 0.3, ease: "power2.inOut" });
    activeIndex.value = -1;
  } else {
    if (activeIndex.value !== -1) {
      gsap.to(contentRefs.value[activeIndex.value], {
        height: 0,
        duration: 0.3
      });
    }
    gsap.to(content, { height: "auto", duration: 0.4, ease: "power2.out" });
    activeIndex.value = index;
  }
};
</script>`,
      script: `const items = document.querySelectorAll(".accordion-item");
let activeIndex = -1;

items.forEach((item, i) => {
  const header = item.querySelector(".accordion-header");
  const content = item.querySelector(".accordion-content");

  header.addEventListener("click", () => {
    if (activeIndex === i) {
      gsap.to(content, { height: 0, duration: 0.3 });
      activeIndex = -1;
    } else {
      if (activeIndex !== -1) {
        const prevContent = items[activeIndex].querySelector(".accordion-content");
        gsap.to(prevContent, { height: 0, duration: 0.3 });
      }
      gsap.to(content, { height: "auto", duration: 0.4 });
      activeIndex = i;
    }
  });
});`,
      css: `.accordion {
  width: 100%;
  max-width: 500px;
}

.accordion-item {
  border-bottom: 1px solid #2a2d2b;
}

.accordion-header {
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border: none;
  color: #fffce1;
  font-size: 1rem;
  cursor: pointer;
}

.accordion-header:hover {
  color: #0ae448;
}

.accordion-header .icon {
  transition: transform 0.3s;
}

.accordion-header .icon.open {
  transform: rotate(45deg);
}

.accordion-content {
  height: 0;
  overflow: hidden;
  padding: 0 1rem;
}

.accordion-content p {
  padding: 1rem 0;
  color: #a1a1a6;
}`,
    },
  },
  {
    id: "tabs",
    name: "Animated Tabs",
    nameKz: "Анимациялық табтар",
    description: "Tab navigation with smooth animations",
    descriptionKz: "Тегіс анимациялы таб навигациясы",
    category: "container",
    playgroundType: "hover",
    defaultText: "TABS",
    code: {
      vue: `<template>
  <div class="tabs-container">
    <div class="tabs-header">
      <button
        v-for="(tab, i) in tabs"
        :key="i"
        :class="{ active: activeTab === i }"
        @click="setActiveTab(i)"
      >
        {{ tab.label }}
      </button>
      <div ref="indicatorRef" class="tab-indicator" />
    </div>
    <div ref="contentRef" class="tabs-content">
      <div class="tab-panel">
        {{ tabs[activeTab].content }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import gsap from "gsap";

const indicatorRef = ref(null);
const contentRef = ref(null);
const activeTab = ref(0);

const tabs = [
  { label: "Tab 1", content: "Content for Tab 1 - Lorem ipsum dolor sit amet." },
  { label: "Tab 2", content: "Content for Tab 2 - Consectetur adipiscing elit." },
  { label: "Tab 3", content: "Content for Tab 3 - Sed do eiusmod tempor." }
];

const setActiveTab = async (index) => {
  if (index === activeTab.value) return;

  // Animate content out
  await gsap.to(contentRef.value, {
    opacity: 0,
    y: 10,
    duration: 0.2
  });

  activeTab.value = index;
  await nextTick();

  // Move indicator
  const buttons = document.querySelectorAll(".tabs-header button");
  const activeButton = buttons[index];
  gsap.to(indicatorRef.value, {
    x: activeButton.offsetLeft,
    width: activeButton.offsetWidth,
    duration: 0.3,
    ease: "power2.out"
  });

  // Animate content in
  gsap.fromTo(contentRef.value,
    { opacity: 0, y: -10 },
    { opacity: 1, y: 0, duration: 0.3 }
  );
};

onMounted(() => {
  const buttons = document.querySelectorAll(".tabs-header button");
  gsap.set(indicatorRef.value, {
    x: buttons[0].offsetLeft,
    width: buttons[0].offsetWidth
  });
});
</script>`,
      script: `const tabsHeader = document.querySelector(".tabs-header");
const buttons = tabsHeader.querySelectorAll("button");
const indicator = tabsHeader.querySelector(".tab-indicator");
const content = document.querySelector(".tabs-content");
let activeTab = 0;

gsap.set(indicator, {
  x: buttons[0].offsetLeft,
  width: buttons[0].offsetWidth
});

buttons.forEach((btn, i) => {
  btn.addEventListener("click", async () => {
    if (i === activeTab) return;

    await gsap.to(content, { opacity: 0, y: 10, duration: 0.2 });

    buttons[activeTab].classList.remove("active");
    buttons[i].classList.add("active");
    activeTab = i;

    gsap.to(indicator, {
      x: btn.offsetLeft,
      width: btn.offsetWidth,
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.fromTo(content,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.3 }
    );
  });
});`,
      css: `.tabs-container {
  width: 100%;
  max-width: 500px;
}

.tabs-header {
  position: relative;
  display: flex;
  border-bottom: 1px solid #2a2d2b;
}

.tabs-header button {
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  color: #a1a1a6;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.3s;
}

.tabs-header button.active {
  color: #0ae448;
}

.tab-indicator {
  position: absolute;
  bottom: -1px;
  height: 2px;
  background: #0ae448;
}

.tabs-content {
  padding: 2rem;
  color: #fffce1;
}`,
    },
  },
];
