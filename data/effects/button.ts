import type { Effect } from "~/types/effects";

export const buttonEffects: Effect[] = [
  {
    id: "btn-scale",
    name: "Scale on Hover",
    nameKz: "Hover кезінде масштабтау",
    category: "button",
    description: "Scale button on hover",
    descriptionKz: "Hover кезінде батырманы үлкейту",
    defaultText: "Батырма",
    playgroundType: "hover",
    code: {
      vue: `<template>
  <button
    ref="btnRef"
    class="px-8 py-4 bg-green-500 text-black font-bold rounded-xl text-lg"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    {{ text }}
  </button>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const btnRef = ref<HTMLElement>()
const text = ref('Батырма')

const onEnter = () => {
  gsap.to(btnRef.value, {
    scale: 1.1,
    duration: 0.3,
    ease: 'power2.out'
  })
}

const onLeave = () => {
  gsap.to(btnRef.value, {
    scale: 1,
    duration: 0.3,
    ease: 'power2.out'
  })
}`,
      css: `.rounded-xl {
  border-radius: 0.75rem;
}`,
    },
  },
  {
    id: "btn-ripple",
    name: "Ripple Effect",
    nameKz: "Толқын эффектісі",
    category: "button",
    description: "Material design ripple effect",
    descriptionKz: "Material design толқын эффектісі",
    defaultText: "Батырма",
    playgroundType: "hover",
    code: {
      vue: `<template>
  <button
    ref="btnRef"
    class="relative overflow-hidden px-8 py-4 bg-green-500 text-black font-bold rounded-xl text-lg"
    @click="onClick"
  >
    <span ref="rippleRef" class="absolute w-4 h-4 bg-white/40 rounded-full" />
    <span class="relative z-10">{{ text }}</span>
  </button>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const btnRef = ref<HTMLElement>()
const rippleRef = ref<HTMLElement>()
const text = ref('Батырма')

const onClick = (e: MouseEvent) => {
  const rect = btnRef.value!.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  gsap.set(rippleRef.value, {
    left: x,
    top: y,
    scale: 0,
    opacity: 1,
    xPercent: -50,
    yPercent: -50
  })

  gsap.to(rippleRef.value, {
    scale: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  })
}`,
      css: `.overflow-hidden {
  overflow: hidden;
}`,
    },
  },
  {
    id: "btn-magnetic",
    name: "Magnetic Effect",
    nameKz: "Магнит эффектісі",
    category: "button",
    description: "Button follows cursor like magnet",
    descriptionKz: "Батырма курсорды магнит сияқты ұстайды",
    defaultText: "Магнит",
    playgroundType: "hover",
    code: {
      vue: `<template>
  <button
    ref="btnRef"
    class="px-8 py-4 bg-green-500 text-black font-bold rounded-xl text-lg"
    @mousemove="onMove"
    @mouseleave="onLeave"
  >
    {{ text }}
  </button>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const btnRef = ref<HTMLElement>()
const text = ref('Магнит')

const onMove = (e: MouseEvent) => {
  const rect = btnRef.value!.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2

  gsap.to(btnRef.value, {
    x: x * 0.3,
    y: y * 0.3,
    duration: 0.3,
    ease: 'power2.out'
  })
}

const onLeave = () => {
  gsap.to(btnRef.value, {
    x: 0,
    y: 0,
    duration: 0.5,
    ease: 'elastic.out(1, 0.5)'
  })
}`,
      css: `.rounded-xl {
  border-radius: 0.75rem;
}`,
    },
  },
  {
    id: "btn-shine",
    name: "Shine Effect",
    nameKz: "Жарқырау эффектісі",
    category: "button",
    description: "Shine sweep across button",
    descriptionKz: "Батырма бойынша жарық өтеді",
    defaultText: "Жарқырау",
    playgroundType: "hover",
    code: {
      vue: `<template>
  <button
    ref="btnRef"
    class="relative overflow-hidden px-8 py-4 bg-green-500 text-black font-bold rounded-xl text-lg"
    @mouseenter="onEnter"
  >
    <span
      ref="shineRef"
      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
    />
    <span class="relative z-10">{{ text }}</span>
  </button>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const btnRef = ref<HTMLElement>()
const shineRef = ref<HTMLElement>()
const text = ref('Жарқырау')

const onEnter = () => {
  gsap.fromTo(shineRef.value,
    { xPercent: -100 },
    {
      xPercent: 100,
      duration: 0.6,
      ease: 'power2.inOut'
    }
  )
}`,
      css: `.overflow-hidden {
  overflow: hidden;
}
.-translate-x-full {
  transform: translateX(-100%);
}`,
    },
  },
  {
    id: "btn-3d-press",
    name: "3D Press",
    nameKz: "3D басу",
    category: "button",
    description: "3D button press effect",
    descriptionKz: "3D батырма басу эффектісі",
    defaultText: "3D Батырма",
    playgroundType: "hover",
    code: {
      vue: `<template>
  <button
    ref="btnRef"
    class="px-8 py-4 bg-green-500 text-black font-bold rounded-xl text-lg shadow-lg"
    style="transform-style: preserve-3d; perspective: 500px"
    @mousedown="onDown"
    @mouseup="onUp"
    @mouseleave="onUp"
  >
    {{ text }}
  </button>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const btnRef = ref<HTMLElement>()
const text = ref('3D Батырма')

const onDown = () => {
  gsap.to(btnRef.value, {
    scale: 0.95,
    rotateX: 10,
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
    duration: 0.1,
    ease: 'power2.out'
  })
}

const onUp = () => {
  gsap.to(btnRef.value, {
    scale: 1,
    rotateX: 0,
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    duration: 0.3,
    ease: 'elastic.out(1, 0.5)'
  })
}`,
      css: `.shadow-lg {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}`,
    },
  },
];
