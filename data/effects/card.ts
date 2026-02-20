import type { Effect } from "~/types/effects";

export const cardEffects: Effect[] = [
  {
    id: "card-lift",
    name: "Card Lift",
    nameKz: "Карточка көтерілуі",
    category: "card",
    description: "Card lifts up on hover",
    descriptionKz: "Hover кезінде карточка көтеріледі",
    defaultText: "Карточка",
    playgroundType: "hover",
    code: {
      vue: `<template>
  <div
    ref="cardRef"
    class="w-64 h-40 bg-gray-800 rounded-xl p-6 cursor-pointer shadow-lg"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <h3 class="text-white font-bold text-lg mb-2">Карточка атауы</h3>
    <p class="text-gray-400 text-sm">Қысқаша сипаттама мәтіні осында жазылады.</p>
  </div>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const cardRef = ref<HTMLElement>()

const onEnter = () => {
  gsap.to(cardRef.value, {
    y: -10,
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    duration: 0.3,
    ease: 'power2.out'
  })
}

const onLeave = () => {
  gsap.to(cardRef.value, {
    y: 0,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    duration: 0.3,
    ease: 'power2.out'
  })
}`,
      css: `.shadow-lg {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}`,
    },
  },
  {
    id: "card-tilt",
    name: "Card Tilt",
    nameKz: "Карточка еңкеюі",
    category: "card",
    description: "3D tilt effect following cursor",
    descriptionKz: "Курсорды қадағалайтын 3D еңкею",
    defaultText: "Карточка",
    playgroundType: "hover",
    code: {
      vue: `<template>
  <div
    ref="cardRef"
    class="w-64 h-40 bg-gray-800 rounded-xl p-6 cursor-pointer"
    style="transform-style: preserve-3d; perspective: 1000px"
    @mousemove="onMove"
    @mouseleave="onLeave"
  >
    <h3 class="text-white font-bold text-lg mb-2">3D Карточка</h3>
    <p class="text-gray-400 text-sm">Тінтуірді қозғаңыз</p>
  </div>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const cardRef = ref<HTMLElement>()

const onMove = (e: MouseEvent) => {
  const rect = cardRef.value!.getBoundingClientRect()
  const x = (e.clientX - rect.left - rect.width / 2) / rect.width
  const y = (e.clientY - rect.top - rect.height / 2) / rect.height

  gsap.to(cardRef.value, {
    rotateY: x * 15,
    rotateX: -y * 15,
    duration: 0.3,
    ease: 'power2.out'
  })
}

const onLeave = () => {
  gsap.to(cardRef.value, {
    rotateY: 0,
    rotateX: 0,
    duration: 0.5,
    ease: 'elastic.out(1, 0.5)'
  })
}`,
      css: `/* 3D transform style */`,
    },
  },
  {
    id: "card-flip",
    name: "Card Flip",
    nameKz: "Карточка аударылуы",
    category: "card",
    description: "Card flips to reveal back side",
    descriptionKz: "Карточка артқы жағын көрсету үшін аударылады",
    defaultText: "Карточка",
    playgroundType: "hover",
    code: {
      vue: `<template>
  <div
    class="w-64 h-40 cursor-pointer"
    style="perspective: 1000px"
    @click="flip"
  >
    <div
      ref="cardRef"
      class="relative w-full h-full"
      style="transform-style: preserve-3d"
    >
      <div class="absolute inset-0 bg-green-500 rounded-xl p-6 backface-hidden flex items-center justify-center">
        <span class="text-black font-bold text-xl">Алдыңғы жақ</span>
      </div>
      <div class="absolute inset-0 bg-gray-800 rounded-xl p-6 backface-hidden flex items-center justify-center" style="transform: rotateY(180deg)">
        <span class="text-white font-bold text-xl">Артқы жақ</span>
      </div>
    </div>
  </div>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const cardRef = ref<HTMLElement>()
const isFlipped = ref(false)

const flip = () => {
  isFlipped.value = !isFlipped.value
  gsap.to(cardRef.value, {
    rotateY: isFlipped.value ? 180 : 0,
    duration: 0.6,
    ease: 'power2.inOut'
  })
}`,
      css: `.backface-hidden {
  backface-visibility: hidden;
}`,
    },
  },
  {
    id: "card-expand",
    name: "Card Expand",
    nameKz: "Карточка кеңеюі",
    category: "card",
    description: "Card expands on click",
    descriptionKz: "Басқан кезде карточка кеңейеді",
    defaultText: "Карточка",
    playgroundType: "hover",
    code: {
      vue: `<template>
  <div
    ref="cardRef"
    class="w-64 h-40 bg-gray-800 rounded-xl p-6 cursor-pointer overflow-hidden"
    @click="toggle"
  >
    <h3 class="text-white font-bold text-lg mb-2">Кеңейетін карточка</h3>
    <p ref="contentRef" class="text-gray-400 text-sm" style="max-height: 0; opacity: 0; overflow: hidden">
      Бұл қосымша контент. Карточканы басқанда пайда болады. Мұнда көбірек ақпарат жазуға болады.
    </p>
  </div>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const cardRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const isExpanded = ref(false)

const toggle = () => {
  isExpanded.value = !isExpanded.value
  gsap.to(cardRef.value, {
    height: isExpanded.value ? 200 : 160,
    duration: 0.4,
    ease: 'power2.out'
  })
  gsap.to(contentRef.value, {
    maxHeight: isExpanded.value ? 100 : 0,
    opacity: isExpanded.value ? 1 : 0,
    duration: 0.4,
    ease: 'power2.out'
  })
}`,
      css: `.overflow-hidden {
  overflow: hidden;
}`,
    },
  },
  {
    id: "card-glow",
    name: "Card Glow",
    nameKz: "Карточка жарқылы",
    category: "card",
    description: "Glowing border effect on hover",
    descriptionKz: "Hover кезінде жарқыраған жиек эффектісі",
    defaultText: "Карточка",
    playgroundType: "hover",
    code: {
      vue: `<template>
  <div
    ref="cardRef"
    class="w-64 h-40 bg-gray-800 rounded-xl p-6 cursor-pointer"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <h3 class="text-white font-bold text-lg mb-2">Жарқыраған карточка</h3>
    <p class="text-gray-400 text-sm">Hover жасаңыз</p>
  </div>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const cardRef = ref<HTMLElement>()

const onEnter = () => {
  gsap.to(cardRef.value, {
    boxShadow: '0 0 30px rgba(10, 228, 72, 0.5), 0 0 60px rgba(10, 228, 72, 0.3)',
    duration: 0.3,
    ease: 'power2.out'
  })
}

const onLeave = () => {
  gsap.to(cardRef.value, {
    boxShadow: '0 0 0px rgba(10, 228, 72, 0)',
    duration: 0.3,
    ease: 'power2.out'
  })
}`,
      css: `/* Box shadow glow effect */`,
    },
  },
  {
    id: "card-border",
    name: "Card Border",
    nameKz: "Карточка жиегі",
    category: "card",
    description: "Animated border on hover",
    descriptionKz: "Hover кезінде анимациялы жиек",
    defaultText: "Карточка",
    playgroundType: "hover",
    code: {
      vue: `<template>
  <div class="relative w-64 h-40">
    <div
      ref="borderRef"
      class="absolute inset-0 rounded-xl"
      style="background: linear-gradient(90deg, #0ae448, #0ba934, #0ae448); opacity: 0"
    />
    <div
      ref="cardRef"
      class="absolute inset-[2px] bg-gray-800 rounded-xl p-6 cursor-pointer"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
    >
      <h3 class="text-white font-bold text-lg mb-2">Жиекті карточка</h3>
      <p class="text-gray-400 text-sm">Hover жасаңыз</p>
    </div>
  </div>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const cardRef = ref<HTMLElement>()
const borderRef = ref<HTMLElement>()

const onEnter = () => {
  gsap.to(borderRef.value, {
    opacity: 1,
    duration: 0.3,
    ease: 'power2.out'
  })
}

const onLeave = () => {
  gsap.to(borderRef.value, {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.out'
  })
}`,
      css: `.inset-\\[2px\\] {
  inset: 2px;
}`,
    },
  },
  {
    id: "card-gradient",
    name: "Card Gradient",
    nameKz: "Карточка градиенті",
    category: "card",
    description: "Animated gradient background",
    descriptionKz: "Анимациялы градиент фоны",
    defaultText: "Карточка",
    playgroundType: "hover",
    code: {
      vue: `<template>
  <div
    ref="cardRef"
    class="w-64 h-40 rounded-xl p-6 cursor-pointer"
    style="background: linear-gradient(135deg, #0ae448 0%, #0ba934 50%, #089c2d 100%); background-size: 200% 200%"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <h3 class="text-black font-bold text-lg mb-2">Градиент карточка</h3>
    <p class="text-black/70 text-sm">Hover жасаңыз</p>
  </div>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const cardRef = ref<HTMLElement>()

const onEnter = () => {
  gsap.to(cardRef.value, {
    backgroundPosition: '100% 100%',
    duration: 0.5,
    ease: 'power2.out'
  })
}

const onLeave = () => {
  gsap.to(cardRef.value, {
    backgroundPosition: '0% 0%',
    duration: 0.5,
    ease: 'power2.out'
  })
}`,
      css: `/* Gradient animation */`,
    },
  },
  {
    id: "card-content-slide",
    name: "Content Slide",
    nameKz: "Контент сырғуы",
    category: "card",
    description: "Content slides up on hover",
    descriptionKz: "Hover кезінде контент жоғары сырғиды",
    defaultText: "Карточка",
    playgroundType: "hover",
    code: {
      vue: `<template>
  <div
    class="w-64 h-40 bg-gray-800 rounded-xl overflow-hidden cursor-pointer"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <div ref="contentRef" class="h-full p-6" style="transform: translateY(40px)">
      <h3 class="text-white font-bold text-lg mb-2">Сырғымалы контент</h3>
      <p class="text-gray-400 text-sm">Hover жасаңыз</p>
      <p ref="extraRef" class="text-green-500 text-sm mt-4" style="opacity: 0">
        Қосымша ақпарат →
      </p>
    </div>
  </div>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const contentRef = ref<HTMLElement>()
const extraRef = ref<HTMLElement>()

const onEnter = () => {
  gsap.to(contentRef.value, { y: 0, duration: 0.3, ease: 'power2.out' })
  gsap.to(extraRef.value, { opacity: 1, duration: 0.3, delay: 0.1, ease: 'power2.out' })
}

const onLeave = () => {
  gsap.to(contentRef.value, { y: 40, duration: 0.3, ease: 'power2.out' })
  gsap.to(extraRef.value, { opacity: 0, duration: 0.2, ease: 'power2.out' })
}`,
      css: `.overflow-hidden {
  overflow: hidden;
}`,
    },
  },
  {
    id: "card-overlay",
    name: "Card Overlay",
    nameKz: "Карточка қабаты",
    category: "card",
    description: "Overlay appears on hover",
    descriptionKz: "Hover кезінде қабат пайда болады",
    defaultText: "Карточка",
    playgroundType: "hover",
    code: {
      vue: `<template>
  <div
    class="relative w-64 h-40 bg-green-500 rounded-xl overflow-hidden cursor-pointer"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <div class="absolute inset-0 flex items-center justify-center">
      <span class="text-black font-bold text-xl">Карточка</span>
    </div>
    <div
      ref="overlayRef"
      class="absolute inset-0 bg-black/80 flex items-center justify-center"
      style="opacity: 0"
    >
      <span class="text-white font-bold text-lg">Толығырақ →</span>
    </div>
  </div>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const overlayRef = ref<HTMLElement>()

const onEnter = () => {
  gsap.to(overlayRef.value, {
    opacity: 1,
    duration: 0.3,
    ease: 'power2.out'
  })
}

const onLeave = () => {
  gsap.to(overlayRef.value, {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.out'
  })
}`,
      css: `.overflow-hidden {
  overflow: hidden;
}`,
    },
  },
  {
    id: "card-icon",
    name: "Card Icon",
    nameKz: "Карточка иконкасы",
    category: "card",
    description: "Icon animates on hover",
    descriptionKz: "Hover кезінде иконка анимацияланады",
    defaultText: "Карточка",
    playgroundType: "hover",
    code: {
      vue: `<template>
  <div
    class="w-64 h-40 bg-gray-800 rounded-xl p-6 cursor-pointer"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <div ref="iconRef" class="text-4xl mb-4">🚀</div>
    <h3 class="text-white font-bold text-lg">Иконкалы карточка</h3>
  </div>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const iconRef = ref<HTMLElement>()

const onEnter = () => {
  gsap.to(iconRef.value, {
    y: -10,
    scale: 1.2,
    duration: 0.4,
    ease: 'back.out(1.7)'
  })
}

const onLeave = () => {
  gsap.to(iconRef.value, {
    y: 0,
    scale: 1,
    duration: 0.3,
    ease: 'power2.out'
  })
}`,
      css: `/* Icon animation */`,
    },
  },
  {
    id: "cards-stagger",
    name: "Cards Stagger",
    nameKz: "Карточкалар stagger",
    category: "card",
    description: "Cards appear with stagger effect",
    descriptionKz: "Карточкалар кезекпен пайда болады",
    defaultText: "Карточкалар",
    playgroundType: "loading",
    code: {
      vue: `<template>
  <div class="flex gap-4">
    <div
      v-for="i in 3"
      :key="i"
      :ref="el => cards[i-1] = el"
      class="w-32 h-40 bg-gray-800 rounded-xl p-4"
      style="opacity: 0; transform: translateY(30px)"
    >
      <div class="text-2xl mb-2">{{ ['🎨', '🚀', '⚡'][i-1] }}</div>
      <span class="text-white text-sm font-bold">Карточка {{ i }}</span>
    </div>
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const cards = ref<HTMLElement[]>([])

onMounted(() => {
  gsap.to(cards.value, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'back.out(1.7)'
  })
})`,
      css: `.gap-4 {
  gap: 1rem;
}`,
    },
  },
  {
    id: "cards-grid",
    name: "Cards Grid",
    nameKz: "Карточкалар торы",
    category: "card",
    description: "Grid of cards with stagger reveal",
    descriptionKz: "Кезекпен ашылатын карточкалар торы",
    defaultText: "Карточкалар",
    playgroundType: "loading",
    code: {
      vue: `<template>
  <div class="grid grid-cols-3 gap-2 w-64">
    <div
      v-for="i in 9"
      :key="i"
      :ref="el => cards[i-1] = el"
      class="h-20 bg-gray-800 rounded-lg flex items-center justify-center"
      style="opacity: 0; scale: 0.8"
    >
      <span class="text-white font-bold">{{ i }}</span>
    </div>
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const cards = ref<HTMLElement[]>([])

onMounted(() => {
  gsap.to(cards.value, {
    opacity: 1,
    scale: 1,
    duration: 0.4,
    stagger: {
      each: 0.05,
      grid: [3, 3],
      from: 'center'
    },
    ease: 'back.out(1.7)'
  })
})`,
      css: `.grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}`,
    },
  },
  {
    id: "cards-random",
    name: "Cards Random",
    nameKz: "Карточкалар кездейсоқ",
    category: "card",
    description: "Cards appear in random order",
    descriptionKz: "Карточкалар кездейсоқ ретпен пайда болады",
    defaultText: "Карточкалар",
    playgroundType: "loading",
    code: {
      vue: `<template>
  <div class="flex gap-4">
    <div
      v-for="i in 4"
      :key="i"
      :ref="el => cards[i-1] = el"
      class="w-24 h-32 bg-gray-800 rounded-xl flex items-center justify-center"
      style="opacity: 0; transform: translateY(50px) rotate(-10deg)"
    >
      <span class="text-white font-bold text-xl">{{ i }}</span>
    </div>
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const cards = ref<HTMLElement[]>([])

onMounted(() => {
  gsap.to(cards.value, {
    opacity: 1,
    y: 0,
    rotation: 0,
    duration: 0.6,
    stagger: {
      each: 0.1,
      from: 'random'
    },
    ease: 'back.out(1.7)'
  })
})`,
      css: `.gap-4 {
  gap: 1rem;
}`,
    },
  },
];
