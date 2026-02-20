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
  {
    id: "text-scramble",
    name: "Text Scramble",
    nameKz: "Мәтін шифрлау",
    category: "text",
    description: "Text scramble/decode effect",
    descriptionKz: "Мәтінді шифрлау және ашу эффектісі",
    defaultText: "GSAP ҚАЗАҚША",
    code: {
      vue: `<template>
  <div ref="textRef" class="text-4xl font-bold text-white font-mono">
    {{ displayText }}
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const text = ref('GSAP ҚАЗАҚША')
const displayText = ref('')
const textRef = ref<HTMLElement>()

const chars = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789!@#$%^&*'

const play = () => {
  const finalText = text.value
  const length = finalText.length
  let iteration = 0

  const interval = setInterval(() => {
    displayText.value = finalText
      .split('')
      .map((char, i) => {
        if (i < iteration) return finalText[i]
        return chars[Math.floor(Math.random() * chars.length)]
      })
      .join('')

    if (iteration >= length) {
      clearInterval(interval)
    }

    iteration += 1/3
  }, 30)
}

onMounted(() => play())`,
      css: `.font-mono {
  font-family: monospace;
}
.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}`,
    },
  },
  {
    id: "hover-underline",
    name: "Hover Underline",
    nameKz: "Hover астын сызу",
    category: "text",
    description: "Animated underline on hover",
    descriptionKz: "Hover кезінде астын сызу анимациясы",
    defaultText: "Hover жасаңыз",
    playgroundType: "hover",
    code: {
      vue: `<template>
  <a
    ref="linkRef"
    href="#"
    class="relative text-4xl font-bold text-white inline-block"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    {{ text }}
    <span
      ref="lineRef"
      class="absolute bottom-0 left-0 w-full h-1 bg-green-500 origin-left"
      style="transform: scaleX(0)"
    />
  </a>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const linkRef = ref<HTMLElement>()
const lineRef = ref<HTMLElement>()
const text = ref('Hover жасаңыз')

const onEnter = () => {
  gsap.to(lineRef.value, {
    scaleX: 1,
    duration: 0.3,
    ease: 'power2.out'
  })
}

const onLeave = () => {
  gsap.to(lineRef.value, {
    scaleX: 0,
    duration: 0.3,
    ease: 'power2.in'
  })
}`,
      css: `.origin-left {
  transform-origin: left;
}
.inline-block {
  display: inline-block;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}`,
    },
  },
  {
    id: "chars-random",
    name: "Characters Random",
    nameKz: "Әріптер кездейсоқ",
    category: "text",
    description: "Characters appear in random order",
    descriptionKz: "Әріптер кездейсоқ ретпен пайда болады",
    defaultText: "GSAP Қазақша",
    code: {
      vue: `<template>
  <div ref="textRef" class="text-4xl font-bold text-white flex flex-wrap justify-center">
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

const text = ref('GSAP Қазақша')
const charRefs = ref<HTMLElement[]>([])

const chars = computed(() => text.value.split(''))

const play = () => {
  // Shuffle indices for random order
  const indices = chars.value.map((_, i) => i)
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[indices[i], indices[j]] = [indices[j], indices[i]]
  }

  // Create staggered animation with random order
  indices.forEach((index, i) => {
    gsap.fromTo(charRefs.value[index],
      { opacity: 0, scale: 0, rotation: Math.random() * 360 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.4,
        delay: i * 0.05,
        ease: 'back.out(1.7)'
      }
    )
  })
}

onMounted(() => play())`,
      css: `.inline-block {
  display: inline-block;
}
.flex-wrap {
  flex-wrap: wrap;
}`,
    },
  },
  {
    id: "words-fade",
    name: "Words Fade",
    nameKz: "Сөздер пайда болу",
    category: "text",
    description: "Words fade in one by one",
    descriptionKz: "Сөздер бірінен соң бірі пайда болады",
    defaultText: "GSAP Қазақша құжаттама",
    code: {
      vue: `<template>
  <div ref="textRef" class="text-4xl font-bold text-white flex flex-wrap justify-center gap-3">
    <span
      v-for="(word, i) in words"
      :key="i"
      :ref="el => wordRefs[i] = el"
      class="inline-block"
    >
      {{ word }}
    </span>
  </div>
</template>`,
      script: `import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'

const text = ref('GSAP Қазақша құжаттама')
const wordRefs = ref<HTMLElement[]>([])

const words = computed(() => text.value.split(' '))

const play = () => {
  gsap.fromTo(wordRefs.value,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out'
    }
  )
}

onMounted(() => play())`,
      css: `.inline-block {
  display: inline-block;
}
.gap-3 {
  gap: 0.75rem;
}`,
    },
  },
  {
    id: "words-slide",
    name: "Words Slide",
    nameKz: "Сөздер сырғу",
    category: "text",
    description: "Words slide up one by one",
    descriptionKz: "Сөздер төменнен жоғары сырғиды",
    defaultText: "GSAP Қазақша құжаттама",
    code: {
      vue: `<template>
  <div class="overflow-hidden">
    <div ref="textRef" class="text-4xl font-bold text-white flex flex-wrap justify-center gap-3">
      <span
        v-for="(word, i) in words"
        :key="i"
        :ref="el => wordRefs[i] = el"
        class="inline-block"
      >
        {{ word }}
      </span>
    </div>
  </div>
</template>`,
      script: `import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'

const text = ref('GSAP Қазақша құжаттама')
const wordRefs = ref<HTMLElement[]>([])

const words = computed(() => text.value.split(' '))

const play = () => {
  gsap.fromTo(wordRefs.value,
    { y: '100%', opacity: 0 },
    {
      y: '0%',
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
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
    id: "lines-reveal",
    name: "Lines Reveal",
    nameKz: "Жолдар ашылу",
    category: "text",
    description: "Lines reveal with mask effect",
    descriptionKz: "Жолдар маска эффектімен ашылады",
    defaultText: "GSAP Қазақша\nқұжаттама",
    code: {
      vue: `<template>
  <div class="space-y-2">
    <div
      v-for="(line, i) in lines"
      :key="i"
      class="overflow-hidden"
    >
      <div
        :ref="el => lineRefs[i] = el"
        class="text-4xl font-bold text-white"
      >
        {{ line }}
      </div>
    </div>
  </div>
</template>`,
      script: `import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'

const text = ref('GSAP Қазақша\\nқұжаттама')
const lineRefs = ref<HTMLElement[]>([])

const lines = computed(() => text.value.split('\\n'))

const play = () => {
  gsap.fromTo(lineRefs.value,
    { y: '100%' },
    {
      y: '0%',
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    }
  )
}

onMounted(() => play())`,
      css: `.overflow-hidden {
  overflow: hidden;
}
.space-y-2 > * + * {
  margin-top: 0.5rem;
}`,
    },
  },
  {
    id: "lines-mask",
    name: "Lines Mask",
    nameKz: "Жолдар маскасы",
    category: "text",
    description: "Lines appear with clip mask animation",
    descriptionKz: "Жолдар клип маска анимациясымен пайда болады",
    defaultText: "GSAP Қазақша\nқұжаттама",
    code: {
      vue: `<template>
  <div class="space-y-2">
    <div
      v-for="(line, i) in lines"
      :key="i"
      :ref="el => lineRefs[i] = el"
      class="text-4xl font-bold text-white"
      :style="{ clipPath: 'inset(0 100% 0 0)' }"
    >
      {{ line }}
    </div>
  </div>
</template>`,
      script: `import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'

const text = ref('GSAP Қазақша\\nқұжаттама')
const lineRefs = ref<HTMLElement[]>([])

const lines = computed(() => text.value.split('\\n'))

const play = () => {
  gsap.to(lineRefs.value, {
    clipPath: 'inset(0 0% 0 0)',
    duration: 1,
    stagger: 0.3,
    ease: 'power3.inOut'
  })
}

onMounted(() => play())`,
      css: `.space-y-2 > * + * {
  margin-top: 0.5rem;
}`,
    },
  },
];
