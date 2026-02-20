import type { Effect } from "~/types/effects";

export const svgEffects: Effect[] = [
  // Path effects
  {
    id: "path-draw",
    name: "Path Draw",
    nameKz: "Жолды сызу",
    description: "Draw SVG path animation",
    descriptionKz: "SVG жолын сызу анимациясы",
    category: "svg",
    playgroundType: "loading",
    defaultText: "DRAW",
    code: {
      vue: `<template>
  <svg ref="svgRef" viewBox="0 0 200 100" class="w-full h-32">
    <path
      ref="pathRef"
      d="M10,50 Q50,10 100,50 T190,50"
      fill="none"
      stroke="#0ae448"
      stroke-width="3"
      stroke-linecap="round"
    />
  </svg>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const svgRef = ref(null);
const pathRef = ref(null);

onMounted(() => {
  const path = pathRef.value;
  const length = path.getTotalLength();

  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length
  });

  gsap.to(path, {
    strokeDashoffset: 0,
    duration: 2,
    ease: "power2.inOut",
    repeat: -1,
    repeatDelay: 1,
    yoyo: true
  });
});
</script>`,
      script: `const path = document.querySelector("path");
const length = path.getTotalLength();

gsap.set(path, {
  strokeDasharray: length,
  strokeDashoffset: length
});

gsap.to(path, {
  strokeDashoffset: 0,
  duration: 2,
  ease: "power2.inOut",
  repeat: -1,
  repeatDelay: 1,
  yoyo: true
});`,
      css: `svg {
  width: 100%;
  max-width: 400px;
}

path {
  fill: none;
  stroke: #0ae448;
  stroke-width: 3;
  stroke-linecap: round;
}`,
    },
  },
  {
    id: "path-erase",
    name: "Path Erase",
    nameKz: "Жолды өшіру",
    description: "Erase SVG path animation",
    descriptionKz: "SVG жолын өшіру анимациясы",
    category: "svg",
    playgroundType: "loading",
    defaultText: "ERASE",
    code: {
      vue: `<template>
  <svg viewBox="0 0 200 100" class="w-full h-32">
    <path
      ref="pathRef"
      d="M10,80 L50,20 L100,70 L150,30 L190,80"
      fill="none"
      stroke="#0ae448"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const pathRef = ref(null);

onMounted(() => {
  const path = pathRef.value;
  const length = path.getTotalLength();

  // Start fully drawn
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: 0 });

  // Erase then redraw
  gsap.to(path, {
    strokeDashoffset: length,
    duration: 1.5,
    ease: "power2.in",
    repeat: -1,
    repeatDelay: 0.5,
    yoyo: true
  });
});
</script>`,
      script: `const path = document.querySelector("path");
const length = path.getTotalLength();

gsap.set(path, { strokeDasharray: length, strokeDashoffset: 0 });

gsap.to(path, {
  strokeDashoffset: length,
  duration: 1.5,
  ease: "power2.in",
  repeat: -1,
  repeatDelay: 0.5,
  yoyo: true
});`,
      css: `svg {
  width: 100%;
  max-width: 400px;
}`,
    },
  },
  {
    id: "path-morph",
    name: "Path Morph",
    nameKz: "Жол морфингі",
    description: "Morph between SVG paths",
    descriptionKz: "SVG жолдары арасында морфинг",
    category: "svg",
    playgroundType: "loading",
    defaultText: "MORPH",
    code: {
      vue: `<template>
  <svg viewBox="0 0 200 200" class="w-32 h-32">
    <path ref="pathRef" fill="#0ae448" />
  </svg>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const pathRef = ref(null);

const shapes = [
  "M100,10 L190,80 L160,190 L40,190 L10,80 Z", // Pentagon
  "M100,10 C150,10 190,50 190,100 C190,150 150,190 100,190 C50,190 10,150 10,100 C10,50 50,10 100,10 Z", // Circle
  "M10,10 L190,10 L190,190 L10,190 Z", // Square
  "M100,10 L190,190 L10,190 Z" // Triangle
];

onMounted(() => {
  let current = 0;
  gsap.set(pathRef.value, { attr: { d: shapes[0] } });

  const morphTo = () => {
    current = (current + 1) % shapes.length;
    gsap.to(pathRef.value, {
      attr: { d: shapes[current] },
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.delayedCall(0.5, morphTo);
      }
    });
  };

  gsap.delayedCall(1, morphTo);
});
</script>`,
      script: `const path = document.querySelector("path");

const shapes = [
  "M100,10 L190,80 L160,190 L40,190 L10,80 Z",
  "M100,10 C150,10 190,50 190,100...",
  "M10,10 L190,10 L190,190 L10,190 Z",
  "M100,10 L190,190 L10,190 Z"
];

let current = 0;
gsap.set(path, { attr: { d: shapes[0] } });

function morphTo() {
  current = (current + 1) % shapes.length;
  gsap.to(path, {
    attr: { d: shapes[current] },
    duration: 1,
    ease: "power2.inOut",
    onComplete: () => gsap.delayedCall(0.5, morphTo)
  });
}

gsap.delayedCall(1, morphTo);`,
      css: `svg {
  width: 150px;
  height: 150px;
}

path {
  fill: #0ae448;
}`,
    },
  },
  {
    id: "path-follow",
    name: "Path Follow",
    nameKz: "Жол бойымен қозғалу",
    description: "Element follows SVG path",
    descriptionKz: "Элемент SVG жолы бойымен қозғалады",
    category: "svg",
    playgroundType: "loading",
    defaultText: "FOLLOW",
    code: {
      vue: `<template>
  <svg viewBox="0 0 300 150" class="w-full h-40">
    <path
      ref="pathRef"
      d="M20,75 Q75,20 150,75 T280,75"
      fill="none"
      stroke="#2a2d2b"
      stroke-width="2"
    />
    <circle ref="circleRef" r="10" fill="#0ae448" />
  </svg>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const pathRef = ref(null);
const circleRef = ref(null);

onMounted(() => {
  gsap.to(circleRef.value, {
    motionPath: {
      path: pathRef.value,
      align: pathRef.value,
      alignOrigin: [0.5, 0.5]
    },
    duration: 3,
    ease: "none",
    repeat: -1
  });
});
</script>`,
      script: `gsap.registerPlugin(MotionPathPlugin);

const path = document.querySelector("#motion-path");
const circle = document.querySelector("#follower");

gsap.to(circle, {
  motionPath: {
    path: path,
    align: path,
    alignOrigin: [0.5, 0.5]
  },
  duration: 3,
  ease: "none",
  repeat: -1
});`,
      css: `svg {
  width: 100%;
  max-width: 400px;
}`,
    },
  },
  // Shape effects
  {
    id: "shape-morph",
    name: "Shape Morph",
    nameKz: "Фигура морфингі",
    description: "Morph between shapes",
    descriptionKz: "Фигуралар арасында морфинг",
    category: "svg",
    playgroundType: "loading",
    defaultText: "SHAPE",
    code: {
      vue: `<template>
  <svg viewBox="0 0 100 100" class="w-32 h-32">
    <rect
      ref="shapeRef"
      x="10" y="10"
      width="80" height="80"
      fill="#0ae448"
      rx="0"
    />
  </svg>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const shapeRef = ref(null);

onMounted(() => {
  gsap.to(shapeRef.value, {
    attr: { rx: 40 },
    duration: 1,
    ease: "power2.inOut",
    repeat: -1,
    yoyo: true
  });
});
</script>`,
      script: `const rect = document.querySelector("rect");

gsap.to(rect, {
  attr: { rx: 40 },
  duration: 1,
  ease: "power2.inOut",
  repeat: -1,
  yoyo: true
});`,
      css: `svg {
  width: 150px;
  height: 150px;
}`,
    },
  },
  {
    id: "shape-rotate",
    name: "Shape Rotate",
    nameKz: "Фигура айналуы",
    description: "Rotating SVG shape",
    descriptionKz: "Айналатын SVG фигурасы",
    category: "svg",
    playgroundType: "loading",
    defaultText: "ROTATE",
    code: {
      vue: `<template>
  <svg viewBox="0 0 100 100" class="w-32 h-32">
    <polygon
      ref="shapeRef"
      points="50,10 90,35 80,80 20,80 10,35"
      fill="#0ae448"
    />
  </svg>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const shapeRef = ref(null);

onMounted(() => {
  gsap.to(shapeRef.value, {
    rotation: 360,
    transformOrigin: "50% 50%",
    duration: 4,
    ease: "none",
    repeat: -1
  });
});
</script>`,
      script: `const polygon = document.querySelector("polygon");

gsap.to(polygon, {
  rotation: 360,
  transformOrigin: "50% 50%",
  duration: 4,
  ease: "none",
  repeat: -1
});`,
      css: `svg {
  width: 150px;
  height: 150px;
}`,
    },
  },
  {
    id: "shape-scale",
    name: "Shape Scale",
    nameKz: "Фигура масштабтау",
    description: "Scaling SVG shape with pulse",
    descriptionKz: "Пульстеу эффектімен SVG фигурасын масштабтау",
    category: "svg",
    playgroundType: "loading",
    defaultText: "SCALE",
    code: {
      vue: `<template>
  <svg viewBox="0 0 100 100" class="w-32 h-32">
    <circle
      ref="circleRef"
      cx="50" cy="50" r="30"
      fill="#0ae448"
    />
  </svg>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const circleRef = ref(null);

onMounted(() => {
  gsap.to(circleRef.value, {
    scale: 1.3,
    transformOrigin: "50% 50%",
    duration: 0.8,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true
  });
});
</script>`,
      script: `const circle = document.querySelector("circle");

gsap.to(circle, {
  scale: 1.3,
  transformOrigin: "50% 50%",
  duration: 0.8,
  ease: "power1.inOut",
  repeat: -1,
  yoyo: true
});`,
      css: `svg {
  width: 150px;
  height: 150px;
}

circle {
  fill: #0ae448;
}`,
    },
  },
  // Icon/Logo effects
  {
    id: "icon-animated",
    name: "Animated Icon",
    nameKz: "Анимациялық иконка",
    description: "Icon with animated parts",
    descriptionKz: "Анимациялық бөліктері бар иконка",
    category: "svg",
    playgroundType: "loading",
    defaultText: "ICON",
    code: {
      vue: `<template>
  <svg viewBox="0 0 24 24" class="w-16 h-16" fill="none" stroke="#0ae448" stroke-width="2">
    <circle ref="outerRef" cx="12" cy="12" r="10" />
    <polyline ref="checkRef" points="7,12 10,15 17,8" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const outerRef = ref(null);
const checkRef = ref(null);

onMounted(() => {
  const circle = outerRef.value;
  const check = checkRef.value;

  const circleLength = circle.getTotalLength();
  const checkLength = check.getTotalLength();

  gsap.set([circle, check], { strokeDasharray: (el) => el.getTotalLength() });
  gsap.set(circle, { strokeDashoffset: circleLength });
  gsap.set(check, { strokeDashoffset: checkLength });

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

  tl.to(circle, { strokeDashoffset: 0, duration: 0.8, ease: "power2.out" })
    .to(check, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" })
    .to({}, { duration: 1 })
    .to([circle, check], {
      strokeDashoffset: (i, el) => el.getTotalLength(),
      duration: 0.5,
      stagger: 0.1
    });
});
</script>`,
      script: `const circle = document.querySelector("circle");
const check = document.querySelector("polyline");

const circleLength = circle.getTotalLength();
const checkLength = check.getTotalLength();

gsap.set(circle, { strokeDasharray: circleLength, strokeDashoffset: circleLength });
gsap.set(check, { strokeDasharray: checkLength, strokeDashoffset: checkLength });

const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

tl.to(circle, { strokeDashoffset: 0, duration: 0.8 })
  .to(check, { strokeDashoffset: 0, duration: 0.5 });`,
      css: `svg {
  width: 80px;
  height: 80px;
  stroke: #0ae448;
  stroke-width: 2;
  fill: none;
}`,
    },
  },
  {
    id: "logo-reveal",
    name: "Logo Reveal",
    nameKz: "Логотип ашу",
    description: "Logo reveal animation",
    descriptionKz: "Логотип ашу анимациясы",
    category: "svg",
    playgroundType: "loading",
    defaultText: "LOGO",
    code: {
      vue: `<template>
  <svg viewBox="0 0 200 60" class="w-48 h-16">
    <defs>
      <clipPath id="reveal-clip">
        <rect ref="clipRef" x="0" y="0" width="0" height="60" />
      </clipPath>
    </defs>
    <g clip-path="url(#reveal-clip)">
      <text x="10" y="45" fill="#0ae448" font-size="40" font-weight="bold">GSAP</text>
    </g>
    <rect
      ref="lineRef"
      x="0" y="0"
      width="3" height="60"
      fill="#0ae448"
    />
  </svg>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const clipRef = ref(null);
const lineRef = ref(null);

onMounted(() => {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

  tl.to(lineRef.value, { x: 200, duration: 1.5, ease: "power2.inOut" })
    .to(clipRef.value, { attr: { width: 200 }, duration: 1.5, ease: "power2.inOut" }, 0)
    .to({}, { duration: 1 })
    .to(lineRef.value, { x: 0, duration: 0.8, ease: "power2.in" })
    .to(clipRef.value, { attr: { width: 0 }, duration: 0.8, ease: "power2.in" }, "-=0.8");
});
</script>`,
      script: `const clip = document.querySelector("#reveal-clip rect");
const line = document.querySelector(".reveal-line");

const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

tl.to(line, { x: 200, duration: 1.5, ease: "power2.inOut" })
  .to(clip, { attr: { width: 200 }, duration: 1.5 }, 0);`,
      css: `svg {
  width: 200px;
  height: 60px;
}`,
    },
  },
  {
    id: "logo-draw",
    name: "Logo Draw",
    nameKz: "Логотип сызу",
    description: "Draw logo with stroke animation",
    descriptionKz: "Штрих анимациясымен логотип сызу",
    category: "svg",
    playgroundType: "loading",
    defaultText: "DRAW LOGO",
    code: {
      vue: `<template>
  <svg viewBox="0 0 100 100" class="w-24 h-24">
    <path
      ref="pathRef"
      d="M20,80 L50,20 L80,80 M35,55 L65,55"
      fill="none"
      stroke="#0ae448"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const pathRef = ref(null);

onMounted(() => {
  const path = pathRef.value;
  const length = path.getTotalLength();

  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

  gsap.to(path, {
    strokeDashoffset: 0,
    duration: 2,
    ease: "power2.out",
    repeat: -1,
    repeatDelay: 1,
    yoyo: true
  });
});
</script>`,
      script: `const path = document.querySelector("path");
const length = path.getTotalLength();

gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

gsap.to(path, {
  strokeDashoffset: 0,
  duration: 2,
  ease: "power2.out",
  repeat: -1,
  repeatDelay: 1,
  yoyo: true
});`,
      css: `svg {
  width: 100px;
  height: 100px;
}

path {
  fill: none;
  stroke: #0ae448;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
}`,
    },
  },
];
