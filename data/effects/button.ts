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
  {
    id: "btn-bg-slide",
    name: "Background Slide",
    nameKz: "Фон сырғу",
    category: "button",
    description: "Background slides on hover",
    descriptionKz: "Hover кезінде фон сырғиды",
    defaultText: "Батырма",
    playgroundType: "hover",
    code: {
      vue: `<template>
  <button
    ref="btnRef"
    class="relative overflow-hidden px-8 py-4 bg-transparent text-white font-bold rounded-xl text-lg border-2 border-green-500"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <span
      ref="bgRef"
      class="absolute inset-0 bg-green-500 -translate-x-full"
    />
    <span class="relative z-10">{{ text }}</span>
  </button>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const btnRef = ref<HTMLElement>()
const bgRef = ref<HTMLElement>()
const text = ref('Батырма')

const onEnter = () => {
  gsap.to(bgRef.value, {
    xPercent: 0,
    duration: 0.3,
    ease: 'power2.out'
  })
}

const onLeave = () => {
  gsap.to(bgRef.value, {
    xPercent: 100,
    duration: 0.3,
    ease: 'power2.in'
  })
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
    id: "btn-border",
    name: "Animated Border",
    nameKz: "Анимациялы жиек",
    category: "button",
    description: "Border animation on hover",
    descriptionKz: "Hover кезінде жиек анимациясы",
    defaultText: "Батырма",
    playgroundType: "hover",
    code: {
      vue: `<template>
  <button
    ref="btnRef"
    class="relative px-8 py-4 bg-transparent text-white font-bold rounded-xl text-lg"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <span ref="borderRef" class="absolute inset-0 border-2 border-green-500 rounded-xl" style="clip-path: inset(0 100% 0 0)" />
    <span class="relative z-10">{{ text }}</span>
  </button>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const btnRef = ref<HTMLElement>()
const borderRef = ref<HTMLElement>()
const text = ref('Батырма')

const onEnter = () => {
  gsap.to(borderRef.value, {
    clipPath: 'inset(0 0% 0 0)',
    duration: 0.4,
    ease: 'power2.out'
  })
}

const onLeave = () => {
  gsap.to(borderRef.value, {
    clipPath: 'inset(0 100% 0 0)',
    duration: 0.4,
    ease: 'power2.in'
  })
}`,
      css: `.rounded-xl {
  border-radius: 0.75rem;
}`,
    },
  },
  {
    id: "btn-click",
    name: "Click Animation",
    nameKz: "Басу анимациясы",
    category: "button",
    description: "Bounce animation on click",
    descriptionKz: "Басқан кезде серпімді анимация",
    defaultText: "Батырма",
    playgroundType: "hover",
    code: {
      vue: `<template>
  <button
    ref="btnRef"
    class="px-8 py-4 bg-green-500 text-black font-bold rounded-xl text-lg"
    @click="onClick"
  >
    {{ text }}
  </button>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const btnRef = ref<HTMLElement>()
const text = ref('Батырма')

const onClick = () => {
  gsap.timeline()
    .to(btnRef.value, {
      scale: 0.9,
      duration: 0.1,
      ease: 'power2.in'
    })
    .to(btnRef.value, {
      scale: 1,
      duration: 0.4,
      ease: 'elastic.out(1, 0.4)'
    })
}`,
      css: `.rounded-xl {
  border-radius: 0.75rem;
}`,
    },
  },
  {
    id: "btn-loading",
    name: "Loading State",
    nameKz: "Жүктелу күйі",
    category: "button",
    description: "Button loading state animation",
    descriptionKz: "Батырма жүктелу күйі анимациясы",
    defaultText: "Жіберу",
    playgroundType: "hover",
    code: {
      vue: `<template>
  <button
    ref="btnRef"
    class="relative px-8 py-4 bg-green-500 text-black font-bold rounded-xl text-lg min-w-[150px]"
    :disabled="loading"
    @click="onClick"
  >
    <span ref="textRef" :class="{ 'opacity-0': loading }">{{ text }}</span>
    <span
      v-if="loading"
      ref="spinnerRef"
      class="absolute inset-0 flex items-center justify-center"
    >
      <span class="w-5 h-5 border-2 border-black/30 border-t-black rounded-full" />
    </span>
  </button>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const btnRef = ref<HTMLElement>()
const textRef = ref<HTMLElement>()
const spinnerRef = ref<HTMLElement>()
const text = ref('Жіберу')
const loading = ref(false)

const onClick = () => {
  loading.value = true
  gsap.to(spinnerRef.value?.querySelector('span'), {
    rotation: 360,
    duration: 1,
    repeat: 2,
    ease: 'none',
    onComplete: () => {
      loading.value = false
    }
  })
}`,
      css: `.min-w-\\[150px\\] {
  min-width: 150px;
}`,
    },
  },
  {
    id: "btn-success",
    name: "Success State",
    nameKz: "Сәтті күй",
    category: "button",
    description: "Success checkmark animation",
    descriptionKz: "Сәтті орындалу анимациясы",
    defaultText: "Сақтау",
    playgroundType: "hover",
    code: {
      vue: `<template>
  <button
    ref="btnRef"
    class="relative px-8 py-4 font-bold rounded-xl text-lg min-w-[150px] transition-colors"
    :class="success ? 'bg-green-600 text-white' : 'bg-green-500 text-black'"
    @click="onClick"
  >
    <span :class="{ 'opacity-0': success }">{{ text }}</span>
    <span
      v-if="success"
      ref="checkRef"
      class="absolute inset-0 flex items-center justify-center text-2xl"
    >
      ✓
    </span>
  </button>
</template>`,
      script: `import { ref, watch } from 'vue'
import gsap from 'gsap'

const btnRef = ref<HTMLElement>()
const checkRef = ref<HTMLElement>()
const text = ref('Сақтау')
const success = ref(false)

const onClick = () => {
  success.value = true
  gsap.fromTo(checkRef.value,
    { scale: 0, rotation: -180 },
    {
      scale: 1,
      rotation: 0,
      duration: 0.5,
      ease: 'back.out(1.7)',
      onComplete: () => {
        setTimeout(() => { success.value = false }, 1500)
      }
    }
  )
}`,
      css: `.min-w-\\[150px\\] {
  min-width: 150px;
}`,
    },
  },
  {
    id: "btn-error",
    name: "Error State",
    nameKz: "Қате күй",
    category: "button",
    description: "Error shake animation",
    descriptionKz: "Қате шайқалу анимациясы",
    defaultText: "Тексеру",
    playgroundType: "hover",
    code: {
      vue: `<template>
  <button
    ref="btnRef"
    class="px-8 py-4 font-bold rounded-xl text-lg min-w-[150px] transition-colors"
    :class="error ? 'bg-red-500 text-white' : 'bg-green-500 text-black'"
    @click="onClick"
  >
    {{ error ? 'Қате!' : text }}
  </button>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const btnRef = ref<HTMLElement>()
const text = ref('Тексеру')
const error = ref(false)

const onClick = () => {
  error.value = true
  gsap.to(btnRef.value, {
    x: [-10, 10, -10, 10, 0],
    duration: 0.4,
    ease: 'power2.inOut',
    onComplete: () => {
      setTimeout(() => { error.value = false }, 1500)
    }
  })
}`,
      css: `.min-w-\\[150px\\] {
  min-width: 150px;
}`,
    },
  },
  {
    id: "btn-icon-rotate",
    name: "Icon Rotate",
    nameKz: "Иконка айналуы",
    category: "button",
    description: "Icon rotates on hover",
    descriptionKz: "Hover кезінде иконка айналады",
    defaultText: "Жаңарту",
    playgroundType: "hover",
    code: {
      vue: `<template>
  <button
    ref="btnRef"
    class="flex items-center gap-2 px-6 py-3 bg-green-500 text-black font-bold rounded-xl text-lg"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <span ref="iconRef" class="text-xl">↻</span>
    <span>{{ text }}</span>
  </button>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const btnRef = ref<HTMLElement>()
const iconRef = ref<HTMLElement>()
const text = ref('Жаңарту')

const onEnter = () => {
  gsap.to(iconRef.value, {
    rotation: 360,
    duration: 0.5,
    ease: 'power2.out'
  })
}

const onLeave = () => {
  gsap.to(iconRef.value, {
    rotation: 0,
    duration: 0.3,
    ease: 'power2.in'
  })
}`,
      css: `.rounded-xl {
  border-radius: 0.75rem;
}`,
    },
  },
  {
    id: "btn-icon-morph",
    name: "Icon Morph",
    nameKz: "Иконка морфы",
    category: "button",
    description: "Icon morphs between states",
    descriptionKz: "Иконка күйлер арасында өзгереді",
    defaultText: "Меню",
    playgroundType: "hover",
    code: {
      vue: `<template>
  <button
    ref="btnRef"
    class="flex items-center gap-2 px-6 py-3 bg-green-500 text-black font-bold rounded-xl text-lg"
    @click="onClick"
  >
    <span class="relative w-6 h-6">
      <span ref="line1Ref" class="absolute w-6 h-0.5 bg-current top-1 left-0" />
      <span ref="line2Ref" class="absolute w-6 h-0.5 bg-current top-1/2 -translate-y-1/2 left-0" />
      <span ref="line3Ref" class="absolute w-6 h-0.5 bg-current bottom-1 left-0" />
    </span>
    <span>{{ text }}</span>
  </button>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const btnRef = ref<HTMLElement>()
const line1Ref = ref<HTMLElement>()
const line2Ref = ref<HTMLElement>()
const line3Ref = ref<HTMLElement>()
const text = ref('Меню')
const isOpen = ref(false)

const onClick = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    gsap.to(line1Ref.value, { y: 8, rotation: 45, duration: 0.3 })
    gsap.to(line2Ref.value, { opacity: 0, duration: 0.2 })
    gsap.to(line3Ref.value, { y: -8, rotation: -45, duration: 0.3 })
  } else {
    gsap.to(line1Ref.value, { y: 0, rotation: 0, duration: 0.3 })
    gsap.to(line2Ref.value, { opacity: 1, duration: 0.2 })
    gsap.to(line3Ref.value, { y: 0, rotation: 0, duration: 0.3 })
  }
}`,
      css: `.h-0\\.5 {
  height: 2px;
}`,
    },
  },
  {
    id: "btn-icon-bounce",
    name: "Icon Bounce",
    nameKz: "Иконка секіруі",
    category: "button",
    description: "Icon bounces on hover",
    descriptionKz: "Hover кезінде иконка секіреді",
    defaultText: "Жүктеу",
    playgroundType: "hover",
    code: {
      vue: `<template>
  <button
    ref="btnRef"
    class="flex items-center gap-2 px-6 py-3 bg-green-500 text-black font-bold rounded-xl text-lg"
    @mouseenter="onEnter"
  >
    <span ref="iconRef" class="text-xl">↓</span>
    <span>{{ text }}</span>
  </button>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const btnRef = ref<HTMLElement>()
const iconRef = ref<HTMLElement>()
const text = ref('Жүктеу')

const onEnter = () => {
  gsap.to(iconRef.value, {
    y: [0, 5, 0, 3, 0],
    duration: 0.6,
    ease: 'power2.out'
  })
}`,
      css: `.rounded-xl {
  border-radius: 0.75rem;
}`,
    },
  },
];
