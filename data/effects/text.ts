import type { Effect } from "~/types/effects";

export const textEffects: Effect[] = [
  {
    id: "fade-in",
    name: "Fade In",
    nameKz: "Пайда болу",
    category: "text",
    description: "Simple fade in animation",
    descriptionKz: "Қарапайым пайда болу анимациясы",
    defaultText: "GSAP Қазақша құжаттама",
    code: {
      vue: `<template>
  <div ref="textRef" class="text-4xl font-bold text-white">
    {{ text }}
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const textRef = ref<HTMLElement>()
const text = ref('GSAP Қазақша құжаттама')

const play = () => {
  gsap.fromTo(textRef.value,
    { opacity: 0 },
    { opacity: 1, duration: 1, ease: 'power2.out' }
  )
}

onMounted(() => play())`,
      css: `.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}
.font-bold {
  font-weight: 700;
}`,
    },
  },
  {
    id: "fade-in-up",
    name: "Fade In Up",
    nameKz: "Төменнен пайда болу",
    category: "text",
    description: "Fade in from bottom animation",
    descriptionKz: "Төменнен жоғары қарай пайда болу",
    defaultText: "GSAP Қазақша құжаттама",
    code: {
      vue: `<template>
  <div ref="textRef" class="text-4xl font-bold text-white">
    {{ text }}
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const textRef = ref<HTMLElement>()
const text = ref('GSAP Қазақша құжаттама')

const play = () => {
  gsap.fromTo(textRef.value,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
  )
}

onMounted(() => play())`,
      css: `.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}`,
    },
  },
  {
    id: "fade-in-down",
    name: "Fade In Down",
    nameKz: "Жоғарыдан пайда болу",
    category: "text",
    description: "Fade in from top animation",
    descriptionKz: "Жоғарыдан төмен қарай пайда болу",
    defaultText: "GSAP Қазақша құжаттама",
    code: {
      vue: `<template>
  <div ref="textRef" class="text-4xl font-bold text-white">
    {{ text }}
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const textRef = ref<HTMLElement>()
const text = ref('GSAP Қазақша құжаттама')

const play = () => {
  gsap.fromTo(textRef.value,
    { opacity: 0, y: -50 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
  )
}

onMounted(() => play())`,
      css: `.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}`,
    },
  },
  {
    id: "fade-in-left",
    name: "Fade In Left",
    nameKz: "Солдан пайда болу",
    category: "text",
    description: "Fade in from left animation",
    descriptionKz: "Сол жақтан пайда болу",
    defaultText: "GSAP Қазақша құжаттама",
    code: {
      vue: `<template>
  <div ref="textRef" class="text-4xl font-bold text-white">
    {{ text }}
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const textRef = ref<HTMLElement>()
const text = ref('GSAP Қазақша құжаттама')

const play = () => {
  gsap.fromTo(textRef.value,
    { opacity: 0, x: -100 },
    { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
  )
}

onMounted(() => play())`,
      css: `.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}`,
    },
  },
  {
    id: "fade-in-right",
    name: "Fade In Right",
    nameKz: "Оңнан пайда болу",
    category: "text",
    description: "Fade in from right animation",
    descriptionKz: "Оң жақтан пайда болу",
    defaultText: "GSAP Қазақша құжаттама",
    code: {
      vue: `<template>
  <div ref="textRef" class="text-4xl font-bold text-white">
    {{ text }}
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const textRef = ref<HTMLElement>()
const text = ref('GSAP Қазақша құжаттама')

const play = () => {
  gsap.fromTo(textRef.value,
    { opacity: 0, x: 100 },
    { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
  )
}

onMounted(() => play())`,
      css: `.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}`,
    },
  },
  {
    id: "scale-in",
    name: "Scale In",
    nameKz: "Масштабпен пайда болу",
    category: "text",
    description: "Scale in animation",
    descriptionKz: "Масштабтау арқылы пайда болу",
    defaultText: "GSAP Қазақша құжаттама",
    code: {
      vue: `<template>
  <div ref="textRef" class="text-4xl font-bold text-white">
    {{ text }}
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const textRef = ref<HTMLElement>()
const text = ref('GSAP Қазақша құжаттама')

const play = () => {
  gsap.fromTo(textRef.value,
    { opacity: 0, scale: 0.5 },
    { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
  )
}

onMounted(() => play())`,
      css: `.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}`,
    },
  },
  {
    id: "rotate-in",
    name: "Rotate In",
    nameKz: "Айналу арқылы пайда болу",
    category: "text",
    description: "Rotate in animation",
    descriptionKz: "Айналу арқылы пайда болу",
    defaultText: "GSAP Қазақша құжаттама",
    code: {
      vue: `<template>
  <div ref="textRef" class="text-4xl font-bold text-white">
    {{ text }}
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const textRef = ref<HTMLElement>()
const text = ref('GSAP Қазақша құжаттама')

const play = () => {
  gsap.fromTo(textRef.value,
    { opacity: 0, rotation: -180, scale: 0.5 },
    { opacity: 1, rotation: 0, scale: 1, duration: 1, ease: 'power3.out' }
  )
}

onMounted(() => play())`,
      css: `.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}`,
    },
  },
  {
    id: "chars-fade",
    name: "Characters Fade",
    nameKz: "Әріптер пайда болу",
    category: "text",
    description: "Characters fade in one by one",
    descriptionKz: "Әріптер бірінен соң бірі пайда болады",
    defaultText: "GSAP Қазақша",
    code: {
      vue: `<template>
  <div ref="textRef" class="text-4xl font-bold text-white flex">
    <span
      v-for="(char, i) in chars"
      :key="i"
      :ref="el => charRefs[i] = el"
      class="inline-block"
    >
      {{ char === ' ' ? '&nbsp;' : char }}
    </span>
  </div>
</template>`,
      script: `import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'

const textRef = ref<HTMLElement>()
const text = ref('GSAP Қазақша')
const charRefs = ref<HTMLElement[]>([])

const chars = computed(() => text.value.split(''))

const play = () => {
  gsap.fromTo(charRefs.value,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power2.out'
    }
  )
}

onMounted(() => play())`,
      css: `.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}
.inline-block {
  display: inline-block;
}`,
    },
  },
  {
    id: "chars-slide",
    name: "Characters Slide",
    nameKz: "Әріптер сырғу",
    category: "text",
    description: "Characters slide up one by one",
    descriptionKz: "Әріптер төменнен жоғары сырғиды",
    defaultText: "GSAP Қазақша",
    code: {
      vue: `<template>
  <div class="overflow-hidden">
    <div ref="textRef" class="text-4xl font-bold text-white flex">
      <span
        v-for="(char, i) in chars"
        :key="i"
        :ref="el => charRefs[i] = el"
        class="inline-block"
      >
        {{ char === ' ' ? '&nbsp;' : char }}
      </span>
    </div>
  </div>
</template>`,
      script: `import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'

const textRef = ref<HTMLElement>()
const text = ref('GSAP Қазақша')
const charRefs = ref<HTMLElement[]>([])

const chars = computed(() => text.value.split(''))

const play = () => {
  gsap.fromTo(charRefs.value,
    { y: '100%', opacity: 0 },
    {
      y: '0%',
      opacity: 1,
      duration: 0.6,
      stagger: 0.03,
      ease: 'power3.out'
    }
  )
}

onMounted(() => play())`,
      css: `.overflow-hidden {
  overflow: hidden;
}
.inline-block {
  display: inline-block;
}`,
    },
  },
  {
    id: "typewriter",
    name: "Typewriter",
    nameKz: "Теру эффектісі",
    category: "text",
    description: "Typewriter effect",
    descriptionKz: "Клавиатурада теру эффектісі",
    defaultText: "GSAP Қазақша құжаттама",
    code: {
      vue: `<template>
  <div class="text-4xl font-bold text-white font-mono">
    <span ref="textRef">{{ displayText }}</span>
    <span class="cursor">|</span>
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const text = ref('GSAP Қазақша құжаттама')
const displayText = ref('')
const textRef = ref<HTMLElement>()

const play = () => {
  displayText.value = ''
  const chars = text.value.split('')
  let index = 0

  gsap.to({}, {
    duration: chars.length * 0.08,
    onUpdate: function() {
      const progress = this.progress()
      const charIndex = Math.floor(progress * chars.length)
      if (charIndex > index) {
        index = charIndex
        displayText.value = chars.slice(0, index).join('')
      }
    },
    onComplete: () => {
      displayText.value = text.value
    },
    ease: 'none'
  })
}

onMounted(() => play())`,
      css: `.font-mono {
  font-family: monospace;
}
.cursor {
  animation: blink 1s infinite;
}
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}`,
    },
  },
  {
    id: "glitch",
    name: "Glitch",
    nameKz: "Глитч эффектісі",
    category: "text",
    description: "Glitch text effect",
    descriptionKz: "Глитч/бұзылу эффектісі",
    defaultText: "GSAP GLITCH",
    code: {
      vue: `<template>
  <div class="relative text-4xl font-bold">
    <span ref="textRef" class="text-white relative z-10">{{ text }}</span>
    <span
      ref="glitch1"
      class="absolute inset-0 text-cyan-400 opacity-80"
      :style="{ clipPath: 'inset(0 0 50% 0)' }"
    >{{ text }}</span>
    <span
      ref="glitch2"
      class="absolute inset-0 text-red-400 opacity-80"
      :style="{ clipPath: 'inset(50% 0 0 0)' }"
    >{{ text }}</span>
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const text = ref('GSAP GLITCH')
const textRef = ref<HTMLElement>()
const glitch1 = ref<HTMLElement>()
const glitch2 = ref<HTMLElement>()

const play = () => {
  const tl = gsap.timeline({ repeat: 2 })

  tl.to(glitch1.value, {
    x: -3, duration: 0.1, ease: 'power1.inOut'
  })
  .to(glitch2.value, {
    x: 3, duration: 0.1, ease: 'power1.inOut'
  }, '<')
  .to([glitch1.value, glitch2.value], {
    x: 0, duration: 0.1
  })
  .to(glitch1.value, {
    x: 2, skewX: 10, duration: 0.05
  })
  .to(glitch1.value, {
    x: 0, skewX: 0, duration: 0.05
  })
}

onMounted(() => play())`,
      css: `.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.inset-0 {
  inset: 0;
}`,
    },
  },
  {
    id: "counter",
    name: "Counter",
    nameKz: "Санауыш",
    category: "text",
    description: "Number counter animation",
    descriptionKz: "Санды есептеу анимациясы",
    defaultText: "1000",
    code: {
      vue: `<template>
  <div class="text-6xl font-bold text-white tabular-nums">
    {{ displayNumber }}
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const targetNumber = ref(1000)
const displayNumber = ref(0)

const play = () => {
  const obj = { value: 0 }

  gsap.to(obj, {
    value: targetNumber.value,
    duration: 2,
    ease: 'power2.out',
    onUpdate: () => {
      displayNumber.value = Math.round(obj.value)
    }
  })
}

onMounted(() => play())`,
      css: `.text-6xl {
  font-size: 3.75rem;
  line-height: 1;
}
.tabular-nums {
  font-variant-numeric: tabular-nums;
}`,
    },
  },
  {
    id: "bounce-in",
    name: "Bounce In",
    nameKz: "Секіру арқылы пайда болу",
    category: "text",
    description: "Bounce in animation",
    descriptionKz: "Серпіліп пайда болу",
    defaultText: "GSAP Қазақша құжаттама",
    code: {
      vue: `<template>
  <div ref="textRef" class="text-4xl font-bold text-white">
    {{ text }}
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const textRef = ref<HTMLElement>()
const text = ref('GSAP Қазақша құжаттама')

const play = () => {
  gsap.fromTo(textRef.value,
    { opacity: 0, scale: 0.3, y: -100 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1,
      ease: 'bounce.out'
    }
  )
}

onMounted(() => play())`,
      css: `.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}`,
    },
  },
  {
    id: "elastic-in",
    name: "Elastic In",
    nameKz: "Серпімді пайда болу",
    category: "text",
    description: "Elastic in animation",
    descriptionKz: "Серпімді пайда болу эффектісі",
    defaultText: "GSAP Қазақша құжаттама",
    code: {
      vue: `<template>
  <div ref="textRef" class="text-4xl font-bold text-white">
    {{ text }}
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const textRef = ref<HTMLElement>()
const text = ref('GSAP Қазақша құжаттама')

const play = () => {
  gsap.fromTo(textRef.value,
    { opacity: 0, scale: 0 },
    {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: 'elastic.out(1, 0.5)'
    }
  )
}

onMounted(() => play())`,
      css: `.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}`,
    },
  },
  {
    id: "blur-in",
    name: "Blur In",
    nameKz: "Бұлдырдан пайда болу",
    category: "text",
    description: "Blur in animation",
    descriptionKz: "Бұлдырдан анық болу",
    defaultText: "GSAP Қазақша құжаттама",
    code: {
      vue: `<template>
  <div ref="textRef" class="text-4xl font-bold text-white">
    {{ text }}
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const textRef = ref<HTMLElement>()
const text = ref('GSAP Қазақша құжаттама')

const play = () => {
  gsap.fromTo(textRef.value,
    { opacity: 0, filter: 'blur(20px)' },
    {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out'
    }
  )
}

onMounted(() => play())`,
      css: `.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}`,
    },
  },
  {
    id: "flip-in",
    name: "Flip In",
    nameKz: "Аудару арқылы пайда болу",
    category: "text",
    description: "3D flip in animation",
    descriptionKz: "3D аудару арқылы пайда болу",
    defaultText: "GSAP Қазақша құжаттама",
    code: {
      vue: `<template>
  <div class="perspective-1000">
    <div ref="textRef" class="text-4xl font-bold text-white">
      {{ text }}
    </div>
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const textRef = ref<HTMLElement>()
const text = ref('GSAP Қазақша құжаттама')

const play = () => {
  gsap.fromTo(textRef.value,
    { opacity: 0, rotationX: -90 },
    {
      opacity: 1,
      rotationX: 0,
      duration: 1,
      ease: 'power3.out'
    }
  )
}

onMounted(() => play())`,
      css: `.perspective-1000 {
  perspective: 1000px;
}
.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
  transform-style: preserve-3d;
}`,
    },
  },
];
