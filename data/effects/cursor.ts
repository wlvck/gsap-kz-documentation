import type { Effect } from "~/types/effects";

export const cursorEffects: Effect[] = [
  {
    id: "cursor-custom",
    name: "Custom Cursor",
    nameKz: "Жеке курсор",
    description: "Custom cursor that replaces default",
    descriptionKz: "Стандартты курсорды ауыстыратын жеке курсор",
    category: "cursor",
    playgroundType: "hover",
    defaultText: "CURSOR",
    code: {
      vue: `<template>
  <div ref="containerRef" class="cursor-area" @mousemove="onMove" @mouseenter="onEnter" @mouseleave="onLeave">
    <div ref="cursorRef" class="custom-cursor" />
    <h2>Move your mouse here</h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const containerRef = ref(null);
const cursorRef = ref(null);

const onMove = (e) => {
  const rect = containerRef.value.getBoundingClientRect();
  gsap.to(cursorRef.value, {
    x: e.clientX - rect.left - 15,
    y: e.clientY - rect.top - 15,
    duration: 0.1,
    ease: "power2.out"
  });
};

const onEnter = () => {
  gsap.to(cursorRef.value, {
    scale: 1,
    opacity: 1,
    duration: 0.3
  });
};

const onLeave = () => {
  gsap.to(cursorRef.value, {
    scale: 0,
    opacity: 0,
    duration: 0.3
  });
};

onMounted(() => {
  gsap.set(cursorRef.value, { scale: 0, opacity: 0 });
});
</script>`,
      script: `const container = document.querySelector(".cursor-area");
const cursor = document.querySelector(".custom-cursor");

gsap.set(cursor, { scale: 0, opacity: 0 });

container.addEventListener("mousemove", (e) => {
  const rect = container.getBoundingClientRect();
  gsap.to(cursor, {
    x: e.clientX - rect.left - 15,
    y: e.clientY - rect.top - 15,
    duration: 0.1
  });
});

container.addEventListener("mouseenter", () => {
  gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
});

container.addEventListener("mouseleave", () => {
  gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });
});`,
      css: `.cursor-area {
  position: relative;
  width: 100%;
  height: 300px;
  background: #1c1e1d;
  cursor: none;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.custom-cursor {
  position: absolute;
  width: 30px;
  height: 30px;
  background: #0ae448;
  border-radius: 50%;
  pointer-events: none;
}

.cursor-area h2 {
  color: #fffce1;
}`,
    },
  },
  {
    id: "cursor-follower",
    name: "Cursor Follower",
    nameKz: "Курсор ізбасары",
    description: "Smooth cursor follower with delay",
    descriptionKz: "Кідіріспен тегіс курсор ізбасары",
    category: "cursor",
    playgroundType: "hover",
    defaultText: "FOLLOWER",
    code: {
      vue: `<template>
  <div ref="containerRef" class="cursor-area" @mousemove="onMove" @mouseenter="onEnter" @mouseleave="onLeave">
    <div ref="cursorRef" class="cursor-main" />
    <div ref="followerRef" class="cursor-follower" />
    <h2>Dual cursor effect</h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const containerRef = ref(null);
const cursorRef = ref(null);
const followerRef = ref(null);

const onMove = (e) => {
  const rect = containerRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  gsap.to(cursorRef.value, {
    x: x - 5,
    y: y - 5,
    duration: 0.1
  });

  gsap.to(followerRef.value, {
    x: x - 20,
    y: y - 20,
    duration: 0.4,
    ease: "power2.out"
  });
};

const onEnter = () => {
  gsap.to([cursorRef.value, followerRef.value], {
    scale: 1,
    opacity: 1,
    duration: 0.3
  });
};

const onLeave = () => {
  gsap.to([cursorRef.value, followerRef.value], {
    scale: 0,
    opacity: 0,
    duration: 0.3
  });
};

onMounted(() => {
  gsap.set([cursorRef.value, followerRef.value], { scale: 0, opacity: 0 });
});
</script>`,
      script: `const container = document.querySelector(".cursor-area");
const cursor = document.querySelector(".cursor-main");
const follower = document.querySelector(".cursor-follower");

gsap.set([cursor, follower], { scale: 0, opacity: 0 });

container.addEventListener("mousemove", (e) => {
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  gsap.to(cursor, { x: x - 5, y: y - 5, duration: 0.1 });
  gsap.to(follower, { x: x - 20, y: y - 20, duration: 0.4 });
});`,
      css: `.cursor-area {
  position: relative;
  width: 100%;
  height: 300px;
  background: #1c1e1d;
  cursor: none;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.cursor-main {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #0ae448;
  border-radius: 50%;
  pointer-events: none;
}

.cursor-follower {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 2px solid #0ae448;
  border-radius: 50%;
  pointer-events: none;
}`,
    },
  },
  {
    id: "cursor-magnetic",
    name: "Magnetic Cursor",
    nameKz: "Магнитті курсор",
    description: "Elements attract to cursor",
    descriptionKz: "Элементтер курсорға тартылады",
    category: "cursor",
    playgroundType: "hover",
    defaultText: "MAGNETIC",
    code: {
      vue: `<template>
  <div class="magnetic-area">
    <button
      ref="buttonRef"
      class="magnetic-btn"
      @mousemove="onMove"
      @mouseleave="onLeave"
    >
      Hover me
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";

const buttonRef = ref(null);

const onMove = (e) => {
  const rect = buttonRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  gsap.to(buttonRef.value, {
    x: x * 0.4,
    y: y * 0.4,
    duration: 0.3,
    ease: "power2.out"
  });
};

const onLeave = () => {
  gsap.to(buttonRef.value, {
    x: 0,
    y: 0,
    duration: 0.5,
    ease: "elastic.out(1, 0.4)"
  });
};
</script>`,
      script: `const btn = document.querySelector(".magnetic-btn");

btn.addEventListener("mousemove", (e) => {
  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  gsap.to(btn, {
    x: x * 0.4,
    y: y * 0.4,
    duration: 0.3
  });
});

btn.addEventListener("mouseleave", () => {
  gsap.to(btn, {
    x: 0,
    y: 0,
    duration: 0.5,
    ease: "elastic.out(1, 0.4)"
  });
});`,
      css: `.magnetic-area {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.magnetic-btn {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #0e100f;
  background: #0ae448;
  border: none;
  border-radius: 50px;
  cursor: pointer;
}`,
    },
  },
  {
    id: "cursor-text",
    name: "Cursor Text",
    nameKz: "Курсор мәтіні",
    description: "Cursor with rotating text",
    descriptionKz: "Айналатын мәтіні бар курсор",
    category: "cursor",
    playgroundType: "hover",
    defaultText: "TEXT",
    code: {
      vue: `<template>
  <div ref="containerRef" class="cursor-area" @mousemove="onMove" @mouseenter="onEnter" @mouseleave="onLeave">
    <div ref="cursorRef" class="text-cursor">
      <svg viewBox="0 0 100 100">
        <defs>
          <path id="circle" d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0" />
        </defs>
        <text>
          <textPath href="#circle">HOVER • CLICK • DRAG • </textPath>
        </text>
      </svg>
    </div>
    <h2>Text follows cursor</h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const containerRef = ref(null);
const cursorRef = ref(null);

onMounted(() => {
  gsap.set(cursorRef.value, { scale: 0 });

  gsap.to(cursorRef.value.querySelector("svg"), {
    rotation: 360,
    duration: 8,
    ease: "none",
    repeat: -1
  });
});

const onMove = (e) => {
  const rect = containerRef.value.getBoundingClientRect();
  gsap.to(cursorRef.value, {
    x: e.clientX - rect.left - 50,
    y: e.clientY - rect.top - 50,
    duration: 0.3
  });
};

const onEnter = () => {
  gsap.to(cursorRef.value, { scale: 1, duration: 0.3 });
};

const onLeave = () => {
  gsap.to(cursorRef.value, { scale: 0, duration: 0.3 });
};
</script>`,
      script: `const container = document.querySelector(".cursor-area");
const cursor = document.querySelector(".text-cursor");

gsap.set(cursor, { scale: 0 });

gsap.to(cursor.querySelector("svg"), {
  rotation: 360,
  duration: 8,
  ease: "none",
  repeat: -1
});

container.addEventListener("mousemove", (e) => {
  const rect = container.getBoundingClientRect();
  gsap.to(cursor, {
    x: e.clientX - rect.left - 50,
    y: e.clientY - rect.top - 50,
    duration: 0.3
  });
});`,
      css: `.cursor-area {
  position: relative;
  width: 100%;
  height: 300px;
  background: #1c1e1d;
  cursor: none;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.text-cursor {
  position: absolute;
  width: 100px;
  height: 100px;
  pointer-events: none;
}

.text-cursor svg {
  width: 100%;
  height: 100%;
}

.text-cursor text {
  fill: #0ae448;
  font-size: 10px;
  font-weight: bold;
}`,
    },
  },
  {
    id: "cursor-blend",
    name: "Cursor Blend",
    nameKz: "Курсор араластыру",
    description: "Mix-blend-mode cursor effect",
    descriptionKz: "Mix-blend-mode курсор эффекті",
    category: "cursor",
    playgroundType: "hover",
    defaultText: "BLEND",
    code: {
      vue: `<template>
  <div ref="containerRef" class="cursor-area blend-area" @mousemove="onMove" @mouseenter="onEnter" @mouseleave="onLeave">
    <div ref="cursorRef" class="blend-cursor" />
    <h2>Blend mode cursor</h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const containerRef = ref(null);
const cursorRef = ref(null);

onMounted(() => {
  gsap.set(cursorRef.value, { scale: 0 });
});

const onMove = (e) => {
  const rect = containerRef.value.getBoundingClientRect();
  gsap.to(cursorRef.value, {
    x: e.clientX - rect.left - 40,
    y: e.clientY - rect.top - 40,
    duration: 0.2
  });
};

const onEnter = () => {
  gsap.to(cursorRef.value, { scale: 1, duration: 0.3 });
};

const onLeave = () => {
  gsap.to(cursorRef.value, { scale: 0, duration: 0.3 });
};
</script>`,
      script: `const container = document.querySelector(".blend-area");
const cursor = document.querySelector(".blend-cursor");

gsap.set(cursor, { scale: 0 });

container.addEventListener("mousemove", (e) => {
  const rect = container.getBoundingClientRect();
  gsap.to(cursor, {
    x: e.clientX - rect.left - 40,
    y: e.clientY - rect.top - 40,
    duration: 0.2
  });
});

container.addEventListener("mouseenter", () => {
  gsap.to(cursor, { scale: 1, duration: 0.3 });
});

container.addEventListener("mouseleave", () => {
  gsap.to(cursor, { scale: 0, duration: 0.3 });
});`,
      css: `.blend-area {
  position: relative;
  width: 100%;
  height: 300px;
  background: #fffce1;
  cursor: none;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.blend-area h2 {
  color: #0e100f;
  font-size: 2rem;
}

.blend-cursor {
  position: absolute;
  width: 80px;
  height: 80px;
  background: #0ae448;
  border-radius: 50%;
  pointer-events: none;
  mix-blend-mode: difference;
}`,
    },
  },
  {
    id: "cursor-trail",
    name: "Cursor Trail",
    nameKz: "Курсор ізі",
    description: "Trail effect following cursor",
    descriptionKz: "Курсорды ізбасарлайтын із эффекті",
    category: "cursor",
    playgroundType: "hover",
    defaultText: "TRAIL",
    code: {
      vue: `<template>
  <div ref="containerRef" class="cursor-area" @mousemove="onMove" @mouseenter="onEnter" @mouseleave="onLeave">
    <div v-for="i in 10" :key="i" :ref="el => dots[i-1] = el" class="trail-dot" />
    <h2>Trail effect</h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const containerRef = ref(null);
const dots = ref([]);
let mousePos = { x: 0, y: 0 };

onMounted(() => {
  dots.value.forEach(dot => {
    gsap.set(dot, { scale: 0 });
  });

  gsap.ticker.add(updateTrail);
});

const onMove = (e) => {
  const rect = containerRef.value.getBoundingClientRect();
  mousePos.x = e.clientX - rect.left;
  mousePos.y = e.clientY - rect.top;
};

const onEnter = () => {
  dots.value.forEach(dot => {
    gsap.to(dot, { scale: 1, duration: 0.3 });
  });
};

const onLeave = () => {
  dots.value.forEach(dot => {
    gsap.to(dot, { scale: 0, duration: 0.3 });
  });
};

const updateTrail = () => {
  dots.value.forEach((dot, i) => {
    const delay = (i + 1) * 0.05;
    gsap.to(dot, {
      x: mousePos.x - 5,
      y: mousePos.y - 5,
      duration: delay,
      ease: "power2.out"
    });
  });
};
</script>`,
      script: `const container = document.querySelector(".cursor-area");
const dots = document.querySelectorAll(".trail-dot");
let mousePos = { x: 0, y: 0 };

dots.forEach(dot => gsap.set(dot, { scale: 0 }));

container.addEventListener("mousemove", (e) => {
  const rect = container.getBoundingClientRect();
  mousePos.x = e.clientX - rect.left;
  mousePos.y = e.clientY - rect.top;
});

container.addEventListener("mouseenter", () => {
  dots.forEach(dot => gsap.to(dot, { scale: 1, duration: 0.3 }));
});

container.addEventListener("mouseleave", () => {
  dots.forEach(dot => gsap.to(dot, { scale: 0, duration: 0.3 }));
});

gsap.ticker.add(() => {
  dots.forEach((dot, i) => {
    const delay = (i + 1) * 0.05;
    gsap.to(dot, {
      x: mousePos.x - 5,
      y: mousePos.y - 5,
      duration: delay
    });
  });
});`,
      css: `.cursor-area {
  position: relative;
  width: 100%;
  height: 300px;
  background: #1c1e1d;
  cursor: none;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.trail-dot {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #0ae448;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0.5;
}

.trail-dot:first-child {
  opacity: 1;
  width: 12px;
  height: 12px;
}`,
    },
  },
];
