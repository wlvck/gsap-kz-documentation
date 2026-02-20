import type { Effect } from "~/types/effects";

export const scrollEffects: Effect[] = [
  {
    id: "scroll-fade-in",
    name: "Scroll Fade In",
    nameKz: "Скроллда пайда болу",
    category: "scroll",
    description: "Fade in when element enters viewport",
    descriptionKz: "Элемент экранға кіргенде пайда болу",
    defaultText: "GSAP Қазақша құжаттама",
    playgroundType: "scroll",
    code: {
      vue: `<template>
  <div ref="triggerRef" class="min-h-[200vh] flex items-center justify-center">
    <div ref="textRef" class="text-4xl font-bold text-white">
      {{ text }}
    </div>
  </div>
</template>`,
      script: `import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const textRef = ref<HTMLElement>()
const triggerRef = ref<HTMLElement>()
const text = ref('GSAP Қазақша құжаттама')

onMounted(() => {
  gsap.fromTo(textRef.value,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: triggerRef.value,
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play none none reverse'
      }
    }
  )
})

onUnmounted(() => {
  ScrollTrigger.killAll()
})`,
      css: `.min-h-\\[200vh\\] {
  min-height: 200vh;
}`,
    },
  },
  {
    id: "scroll-slide-up",
    name: "Scroll Slide Up",
    nameKz: "Скроллда жоғары сырғу",
    category: "scroll",
    description: "Slide up when element enters viewport",
    descriptionKz: "Элемент экранға кіргенде жоғары сырғу",
    defaultText: "GSAP Қазақша құжаттама",
    playgroundType: "scroll",
    code: {
      vue: `<template>
  <div ref="triggerRef" class="min-h-[200vh] flex items-center justify-center">
    <div ref="textRef" class="text-4xl font-bold text-white">
      {{ text }}
    </div>
  </div>
</template>`,
      script: `import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const textRef = ref<HTMLElement>()
const triggerRef = ref<HTMLElement>()
const text = ref('GSAP Қазақша құжаттама')

onMounted(() => {
  gsap.fromTo(textRef.value,
    { opacity: 0, y: 100 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: triggerRef.value,
        start: 'top center',
        toggleActions: 'play none none reverse'
      }
    }
  )
})

onUnmounted(() => {
  ScrollTrigger.killAll()
})`,
      css: `.min-h-\\[200vh\\] {
  min-height: 200vh;
}`,
    },
  },
  {
    id: "parallax-simple",
    name: "Simple Parallax",
    nameKz: "Қарапайым параллакс",
    category: "scroll",
    description: "Simple parallax effect on scroll",
    descriptionKz: "Скролл кезінде қарапайым параллакс эффект",
    defaultText: "GSAP Қазақша құжаттама",
    playgroundType: "scroll",
    code: {
      vue: `<template>
  <div ref="containerRef" class="h-[300vh] relative">
    <div
      ref="bgRef"
      class="fixed inset-0 flex items-center justify-center"
    >
      <div ref="textRef" class="text-6xl font-bold text-white">
        {{ text }}
      </div>
    </div>
  </div>
</template>`,
      script: `import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const containerRef = ref<HTMLElement>()
const bgRef = ref<HTMLElement>()
const textRef = ref<HTMLElement>()
const text = ref('GSAP Қазақша құжаттама')

onMounted(() => {
  gsap.to(textRef.value, {
    y: -200,
    ease: 'none',
    scrollTrigger: {
      trigger: containerRef.value,
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  })
})

onUnmounted(() => {
  ScrollTrigger.killAll()
})`,
      css: `.h-\\[300vh\\] {
  height: 300vh;
}`,
    },
  },
  {
    id: "pin-simple",
    name: "Simple Pin",
    nameKz: "Қарапайым бекіту",
    category: "scroll",
    description: "Pin element while scrolling",
    descriptionKz: "Скролл кезінде элементті бекіту",
    defaultText: "GSAP Қазақша құжаттама",
    playgroundType: "scroll",
    code: {
      vue: `<template>
  <div>
    <div class="h-screen bg-gray-900" />
    <div ref="pinRef" class="h-screen flex items-center justify-center bg-gray-800">
      <div ref="textRef" class="text-4xl font-bold text-white">
        {{ text }}
      </div>
    </div>
    <div class="h-screen bg-gray-900" />
  </div>
</template>`,
      script: `import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const pinRef = ref<HTMLElement>()
const textRef = ref<HTMLElement>()
const text = ref('GSAP Қазақша құжаттама')

onMounted(() => {
  ScrollTrigger.create({
    trigger: pinRef.value,
    start: 'top top',
    end: '+=100%',
    pin: true,
    pinSpacing: true
  })

  gsap.to(textRef.value, {
    scale: 1.5,
    scrollTrigger: {
      trigger: pinRef.value,
      start: 'top top',
      end: '+=100%',
      scrub: true
    }
  })
})

onUnmounted(() => {
  ScrollTrigger.killAll()
})`,
      css: `.h-screen {
  height: 100vh;
}`,
    },
  },
  {
    id: "scroll-progress",
    name: "Scroll Progress",
    nameKz: "Скролл прогресі",
    category: "scroll",
    description: "Progress bar based on scroll position",
    descriptionKz: "Скролл позициясына байланысты прогресс бар",
    defaultText: "100",
    playgroundType: "scroll",
    code: {
      vue: `<template>
  <div>
    <div
      ref="progressRef"
      class="fixed top-0 left-0 h-1 bg-green-500 origin-left"
      style="transform: scaleX(0)"
    />
    <div class="h-[300vh] flex items-center justify-center">
      <div class="text-6xl font-bold text-white tabular-nums">
        {{ progress }}%
      </div>
    </div>
  </div>
</template>`,
      script: `import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const progressRef = ref<HTMLElement>()
const progress = ref(0)

onMounted(() => {
  gsap.to(progressRef.value, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        progress.value = Math.round(self.progress * 100)
      }
    }
  })
})

onUnmounted(() => {
  ScrollTrigger.killAll()
})`,
      css: `.origin-left {
  transform-origin: left;
}
.tabular-nums {
  font-variant-numeric: tabular-nums;
}`,
    },
  },
];
