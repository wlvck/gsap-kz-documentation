import type { Effect } from "~/types/effects";

export const threeDEffects: Effect[] = [
  {
    id: "3d-card-flip",
    name: "3D Card Flip",
    nameKz: "3D карточка аударылуы",
    description: "Interactive 3D card with flip animation",
    descriptionKz: "Аударылатын интерактивті 3D карточка",
    category: "3d",
    playgroundType: "hover",
    defaultText: "3D CARD",
    code: {
      vue: `<template>
  <div class="perspective-container">
    <div
      ref="cardRef"
      class="card-3d"
      @click="flipCard"
    >
      <div class="card-face card-front">
        <h3>Front Side</h3>
        <p>Click to flip</p>
      </div>
      <div class="card-face card-back">
        <h3>Back Side</h3>
        <p>Click to flip back</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";

const cardRef = ref(null);
const isFlipped = ref(false);

const flipCard = () => {
  isFlipped.value = !isFlipped.value;

  gsap.to(cardRef.value, {
    rotateY: isFlipped.value ? 180 : 0,
    duration: 0.8,
    ease: "power2.inOut"
  });
};
</script>`,
      script: `const card = document.querySelector(".card-3d");
let isFlipped = false;

card.addEventListener("click", () => {
  isFlipped = !isFlipped;

  gsap.to(card, {
    rotateY: isFlipped ? 180 : 0,
    duration: 0.8,
    ease: "power2.inOut"
  });
});`,
      css: `.perspective-container {
  perspective: 1000px;
  width: 300px;
  height: 200px;
}

.card-3d {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  cursor: pointer;
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.card-front {
  background: #0ae448;
  color: #0e100f;
}

.card-back {
  background: #1c1e1d;
  color: #fffce1;
  transform: rotateY(180deg);
  border: 2px solid #0ae448;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}`,
    },
  },
  {
    id: "3d-carousel",
    name: "3D Carousel",
    nameKz: "3D карусель",
    description: "Rotating 3D carousel with multiple items",
    descriptionKz: "Бірнеше элементтері бар айналмалы 3D карусель",
    category: "3d",
    playgroundType: "hover",
    defaultText: "CAROUSEL",
    code: {
      vue: `<template>
  <div class="carousel-container">
    <div ref="carouselRef" class="carousel-3d">
      <div
        v-for="(item, i) in items"
        :key="i"
        class="carousel-item"
        :style="getItemStyle(i)"
      >
        {{ item }}
      </div>
    </div>
    <div class="carousel-controls">
      <button @click="rotate(-1)">←</button>
      <button @click="rotate(1)">→</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import gsap from "gsap";

const carouselRef = ref(null);
const currentAngle = ref(0);
const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
const radius = 200;

const getItemStyle = (index) => {
  const angle = (360 / items.length) * index;
  return {
    transform: \`rotateY(\${angle}deg) translateZ(\${radius}px)\`
  };
};

const rotate = (direction) => {
  currentAngle.value += (360 / items.length) * direction;

  gsap.to(carouselRef.value, {
    rotateY: currentAngle.value,
    duration: 0.6,
    ease: "power2.out"
  });
};
</script>`,
      script: `const carousel = document.querySelector(".carousel-3d");
const items = carousel.querySelectorAll(".carousel-item");
const itemCount = items.length;
const radius = 200;
let currentAngle = 0;

// Position items
items.forEach((item, i) => {
  const angle = (360 / itemCount) * i;
  item.style.transform = \`rotateY(\${angle}deg) translateZ(\${radius}px)\`;
});

// Rotate carousel
function rotate(direction) {
  currentAngle += (360 / itemCount) * direction;
  gsap.to(carousel, {
    rotateY: currentAngle,
    duration: 0.6,
    ease: "power2.out"
  });
}`,
      css: `.carousel-container {
  perspective: 1000px;
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.carousel-3d {
  width: 150px;
  height: 100px;
  position: relative;
  transform-style: preserve-3d;
}

.carousel-item {
  position: absolute;
  width: 150px;
  height: 100px;
  background: linear-gradient(135deg, #0ae448, #0ba934);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0e100f;
  font-weight: bold;
  backface-visibility: hidden;
}

.carousel-controls {
  margin-top: 60px;
  display: flex;
  gap: 1rem;
}

.carousel-controls button {
  padding: 0.75rem 1.5rem;
  background: #1c1e1d;
  color: #fffce1;
  border: 2px solid #0ae448;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
}

.carousel-controls button:hover {
  background: #0ae448;
  color: #0e100f;
}`,
    },
  },
  {
    id: "perspective-scroll",
    name: "Perspective Scroll",
    nameKz: "Перспективті скролл",
    description: "3D perspective effect on scroll",
    descriptionKz: "Скролл кезіндегі 3D перспектива эффекті",
    category: "3d",
    playgroundType: "scroll",
    defaultText: "SCROLL",
    code: {
      vue: `<template>
  <div ref="containerRef" class="perspective-scroll">
    <div ref="contentRef" class="perspective-content">
      <div
        v-for="i in 5"
        :key="i"
        :ref="el => { if (el) cardsRef[i-1] = el }"
        class="perspective-card"
      >
        Card {{ i }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const containerRef = ref(null);
const contentRef = ref(null);
const cardsRef = ref([]);

onMounted(() => {
  cardsRef.value.forEach((card, i) => {
    gsap.fromTo(card,
      {
        rotateX: -45,
        y: 100,
        opacity: 0,
        scale: 0.8
      },
      {
        rotateX: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "top 30%",
          scrub: 1
        }
      }
    );
  });
});
</script>`,
      script: `gsap.registerPlugin(ScrollTrigger);

const cards = document.querySelectorAll(".perspective-card");

cards.forEach((card, i) => {
  gsap.fromTo(card,
    { rotateX: -45, y: 100, opacity: 0, scale: 0.8 },
    {
      rotateX: 0, y: 0, opacity: 1, scale: 1,
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        end: "top 30%",
        scrub: 1
      }
    }
  );
});`,
      css: `.perspective-scroll {
  perspective: 1000px;
  overflow-y: auto;
  height: 100%;
}

.perspective-content {
  transform-style: preserve-3d;
  padding: 2rem;
}

.perspective-card {
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;
  padding: 3rem;
  background: linear-gradient(135deg, #1c1e1d, #2a2d2b);
  border: 1px solid #0ae448;
  border-radius: 12px;
  text-align: center;
  color: #fffce1;
  font-size: 1.5rem;
  font-weight: bold;
  transform-origin: center center;
}`,
    },
  },
  {
    id: "3d-text",
    name: "3D Text Effect",
    nameKz: "3D мәтін эффекті",
    description: "Text with 3D depth effect",
    descriptionKz: "3D тереңдік эффекті бар мәтін",
    category: "3d",
    playgroundType: "hover",
    defaultText: "3D TEXT",
    code: {
      vue: `<template>
  <div
    ref="containerRef"
    class="text-3d-container"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <h1 ref="textRef" class="text-3d">
      <span v-for="(layer, i) in layers" :key="i" class="text-layer" :style="getLayerStyle(i)">
        GSAP
      </span>
    </h1>
  </div>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";

const containerRef = ref(null);
const textRef = ref(null);
const layers = 10;

const getLayerStyle = (index) => ({
  transform: \`translateZ(\${index * -2}px)\`,
  opacity: 1 - index * 0.08,
  color: index === 0 ? "#0ae448" : "#0ae448" + Math.floor((1 - index * 0.1) * 255).toString(16).padStart(2, "0")
});

const onMouseMove = (e) => {
  const rect = containerRef.value.getBoundingClientRect();
  const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
  const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

  gsap.to(textRef.value, {
    rotateX: y * -20,
    rotateY: x * 20,
    duration: 0.3,
    ease: "power2.out"
  });
};

const onMouseLeave = () => {
  gsap.to(textRef.value, {
    rotateX: 0,
    rotateY: 0,
    duration: 0.5,
    ease: "elastic.out(1, 0.5)"
  });
};
</script>`,
      script: `const container = document.querySelector(".text-3d-container");
const text = document.querySelector(".text-3d");

container.addEventListener("mousemove", (e) => {
  const rect = container.getBoundingClientRect();
  const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
  const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

  gsap.to(text, {
    rotateX: y * -20,
    rotateY: x * 20,
    duration: 0.3
  });
});

container.addEventListener("mouseleave", () => {
  gsap.to(text, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
});`,
      css: `.text-3d-container {
  perspective: 500px;
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.text-3d {
  position: relative;
  transform-style: preserve-3d;
  font-size: 4rem;
  font-weight: bold;
}

.text-layer {
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
}

.text-layer:first-child {
  position: relative;
  color: #0ae448;
  text-shadow: 0 0 20px rgba(10, 228, 72, 0.5);
}`,
    },
  },
  {
    id: "parallax-3d",
    name: "3D Parallax Layers",
    nameKz: "3D параллакс қабаттар",
    description: "Multi-layer 3D parallax effect on mouse move",
    descriptionKz: "Тінтуір қозғалысында көп қабатты 3D параллакс",
    category: "3d",
    playgroundType: "hover",
    defaultText: "PARALLAX",
    code: {
      vue: `<template>
  <div
    ref="containerRef"
    class="parallax-3d-container"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <div ref="layer1Ref" class="parallax-layer layer-1">
      <div class="shape circle" />
      <div class="shape square" />
    </div>
    <div ref="layer2Ref" class="parallax-layer layer-2">
      <div class="shape triangle" />
      <div class="shape diamond" />
    </div>
    <div ref="layer3Ref" class="parallax-layer layer-3">
      <h2>3D PARALLAX</h2>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";

const containerRef = ref(null);
const layer1Ref = ref(null);
const layer2Ref = ref(null);
const layer3Ref = ref(null);

const onMouseMove = (e) => {
  const rect = containerRef.value.getBoundingClientRect();
  const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
  const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

  gsap.to(layer1Ref.value, { x: x * 60, y: y * 60, duration: 0.4, ease: "power2.out" });
  gsap.to(layer2Ref.value, { x: x * 30, y: y * 30, duration: 0.4, ease: "power2.out" });
  gsap.to(layer3Ref.value, { x: x * 10, y: y * 10, duration: 0.4, ease: "power2.out" });
};

const onMouseLeave = () => {
  gsap.to([layer1Ref.value, layer2Ref.value, layer3Ref.value], {
    x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)"
  });
};
</script>`,
      script: `const container = document.querySelector(".parallax-3d-container");
const layer1 = document.querySelector(".layer-1");
const layer2 = document.querySelector(".layer-2");
const layer3 = document.querySelector(".layer-3");

container.addEventListener("mousemove", (e) => {
  const rect = container.getBoundingClientRect();
  const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
  const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

  gsap.to(layer1, { x: x * 60, y: y * 60, duration: 0.4 });
  gsap.to(layer2, { x: x * 30, y: y * 30, duration: 0.4 });
  gsap.to(layer3, { x: x * 10, y: y * 10, duration: 0.4 });
});

container.addEventListener("mouseleave", () => {
  gsap.to([layer1, layer2, layer3], { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
});`,
      css: `.parallax-3d-container {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  background: #0e100f;
  border-radius: 12px;
  cursor: pointer;
}

.parallax-layer {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.shape {
  position: absolute;
}

.circle {
  width: 60px;
  height: 60px;
  background: #0ae448;
  border-radius: 50%;
  top: 20%;
  left: 20%;
  opacity: 0.6;
}

.square {
  width: 40px;
  height: 40px;
  background: #0ba934;
  top: 60%;
  right: 25%;
  opacity: 0.5;
}

.triangle {
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 50px solid #0ae448;
  top: 30%;
  right: 30%;
  opacity: 0.4;
}

.diamond {
  width: 30px;
  height: 30px;
  background: #0ae448;
  transform: rotate(45deg);
  bottom: 30%;
  left: 30%;
  opacity: 0.3;
}

.layer-3 h2 {
  color: #fffce1;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 0 0 30px rgba(10, 228, 72, 0.5);
}`,
    },
  },
];
