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
  {
    id: "scrub-animation",
    name: "Scrub Animation",
    nameKz: "Скраб анимация",
    category: "scroll",
    description: "Animation tied to scroll position",
    descriptionKz: "Скролл позициясымен синхрондалған анимация",
    defaultText: "GSAP Қазақша құжаттама",
    playgroundType: "scroll",
    code: {
      vue: `<template>
  <div ref="containerRef" class="h-[300vh]">
    <div ref="textRef" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-white">
      {{ text }}
    </div>
  </div>
</template>`,
      script: `import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const containerRef = ref<HTMLElement>()
const textRef = ref<HTMLElement>()
const text = ref('GSAP Қазақша құжаттама')

onMounted(() => {
  gsap.fromTo(textRef.value,
    { scale: 0.5, rotation: -180, opacity: 0 },
    {
      scale: 1,
      rotation: 0,
      opacity: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.value,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5
      }
    }
  )
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
    id: "scroll-slide-left",
    name: "Scroll Slide Left",
    nameKz: "Скроллда солға сырғу",
    category: "scroll",
    description: "Slide from right to left when entering viewport",
    descriptionKz: "Элемент экранға кіргенде оңнан солға сырғу",
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
    { opacity: 0, x: 100 },
    {
      opacity: 1,
      x: 0,
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
    id: "scroll-slide-right",
    name: "Scroll Slide Right",
    nameKz: "Скроллда оңға сырғу",
    category: "scroll",
    description: "Slide from left to right when entering viewport",
    descriptionKz: "Элемент экранға кіргенде солдан оңға сырғу",
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
    { opacity: 0, x: -100 },
    {
      opacity: 1,
      x: 0,
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
    id: "scroll-scale",
    name: "Scroll Scale",
    nameKz: "Скроллда масштабтау",
    category: "scroll",
    description: "Scale up when element enters viewport",
    descriptionKz: "Элемент экранға кіргенде үлкею",
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
    { opacity: 0, scale: 0.5 },
    {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'back.out(1.7)',
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
    id: "scroll-rotate",
    name: "Scroll Rotate",
    nameKz: "Скроллда айналу",
    category: "scroll",
    description: "Rotate when element enters viewport",
    descriptionKz: "Элемент экранға кіргенде айналу",
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
    { opacity: 0, rotation: -90, scale: 0.8 },
    {
      opacity: 1,
      rotation: 0,
      scale: 1,
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
    id: "parallax-multi",
    name: "Multi-layer Parallax",
    nameKz: "Көп қабатты параллакс",
    category: "scroll",
    description: "Multiple layers moving at different speeds",
    descriptionKz: "Әр түрлі жылдамдықта қозғалатын қабаттар",
    defaultText: "GSAP Қазақша құжаттама",
    playgroundType: "scroll",
    code: {
      vue: `<template>
  <div ref="containerRef" class="h-[300vh] relative overflow-hidden">
    <div class="parallax-layer absolute inset-0 flex items-center justify-center">
      <div class="text-8xl font-bold text-white/20">Фон</div>
    </div>
    <div class="parallax-layer absolute inset-0 flex items-center justify-center">
      <div class="text-6xl font-bold text-white/50">Орта</div>
    </div>
    <div class="parallax-layer absolute inset-0 flex items-center justify-center">
      <div ref="textRef" class="text-4xl font-bold text-white">{{ text }}</div>
    </div>
  </div>
</template>`,
      script: `import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const containerRef = ref<HTMLElement>()
const textRef = ref<HTMLElement>()
const text = ref('GSAP Қазақша құжаттама')

onMounted(() => {
  const layers = containerRef.value?.querySelectorAll('.parallax-layer')
  layers?.forEach((layer, i) => {
    gsap.to(layer, {
      y: (i + 1) * -100,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.value,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })
  })
})

onUnmounted(() => {
  ScrollTrigger.killAll()
})`,
      css: `.parallax-layer {
  will-change: transform;
}`,
    },
  },
  {
    id: "parallax-bg",
    name: "Background Parallax",
    nameKz: "Фон параллаксы",
    category: "scroll",
    description: "Background image parallax effect",
    descriptionKz: "Фон суретінің параллакс эффектісі",
    defaultText: "GSAP Қазақша құжаттама",
    playgroundType: "scroll",
    code: {
      vue: `<template>
  <div class="h-[300vh]">
    <div
      ref="bgRef"
      class="h-screen bg-cover bg-center flex items-center justify-center"
      style="background-image: linear-gradient(45deg, #0e100f 25%, #1c1e1d 50%, #0e100f 75%)"
    >
      <div ref="textRef" class="text-4xl font-bold text-white">{{ text }}</div>
    </div>
  </div>
</template>`,
      script: `import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const bgRef = ref<HTMLElement>()
const textRef = ref<HTMLElement>()
const text = ref('GSAP Қазақша құжаттама')

onMounted(() => {
  gsap.to(bgRef.value, {
    backgroundPositionY: '50%',
    ease: 'none',
    scrollTrigger: {
      trigger: bgRef.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  })
})

onUnmounted(() => {
  ScrollTrigger.killAll()
})`,
      css: `.bg-cover {
  background-size: cover;
}`,
    },
  },
  {
    id: "parallax-mouse",
    name: "Mouse Parallax",
    nameKz: "Тінтуір параллаксы",
    category: "scroll",
    description: "Parallax effect following mouse movement",
    descriptionKz: "Тінтуір қозғалысын қадағалайтын параллакс",
    defaultText: "GSAP Қазақша құжаттама",
    playgroundType: "scroll",
    code: {
      vue: `<template>
  <div
    ref="containerRef"
    class="h-screen flex items-center justify-center relative"
    @mousemove="onMouseMove"
  >
    <div ref="bgRef" class="absolute text-9xl font-bold text-white/10">GSAP</div>
    <div ref="midRef" class="absolute text-6xl font-bold text-white/30">ҚАЗАҚША</div>
    <div ref="textRef" class="text-4xl font-bold text-white">{{ text }}</div>
  </div>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const containerRef = ref<HTMLElement>()
const bgRef = ref<HTMLElement>()
const midRef = ref<HTMLElement>()
const textRef = ref<HTMLElement>()
const text = ref('GSAP Қазақша құжаттама')

const onMouseMove = (e: MouseEvent) => {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const x = (e.clientX - rect.left - rect.width / 2) / rect.width
  const y = (e.clientY - rect.top - rect.height / 2) / rect.height

  gsap.to(bgRef.value, { x: x * 50, y: y * 50, duration: 0.5 })
  gsap.to(midRef.value, { x: x * 30, y: y * 30, duration: 0.5 })
  gsap.to(textRef.value, { x: x * 10, y: y * 10, duration: 0.5 })
}`,
      css: `/* Тінтуірді контейнер үстінде қозғаңыз */`,
    },
  },
  {
    id: "pin-animation",
    name: "Pin with Animation",
    nameKz: "Анимациялы бекіту",
    category: "scroll",
    description: "Pin element and animate while pinned",
    descriptionKz: "Элементті бекіту және бекітілген кезде анимациялау",
    defaultText: "GSAP Қазақша құжаттама",
    playgroundType: "scroll",
    code: {
      vue: `<template>
  <div>
    <div class="h-screen bg-gray-900" />
    <div ref="pinRef" class="h-screen flex items-center justify-center bg-gray-800">
      <div ref="textRef" class="text-4xl font-bold text-white">{{ text }}</div>
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
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: pinRef.value,
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: 1
    }
  })

  tl.to(textRef.value, { scale: 1.5, duration: 0.5 })
    .to(textRef.value, { rotation: 360, duration: 0.5 })
    .to(textRef.value, { scale: 1, rotation: 0, duration: 0.5 })
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
    id: "horizontal-scroll",
    name: "Horizontal Scroll",
    nameKz: "Горизонталь скролл",
    category: "scroll",
    description: "Vertical scroll triggers horizontal movement",
    descriptionKz: "Вертикаль скролл горизонталь қозғалыс тудырады",
    defaultText: "GSAP Қазақша құжаттама",
    playgroundType: "scroll",
    code: {
      vue: `<template>
  <div ref="containerRef" class="overflow-hidden">
    <div ref="wrapperRef" class="flex">
      <div v-for="i in 5" :key="i" class="min-w-screen h-screen flex items-center justify-center bg-gray-800 border-r border-gray-700">
        <div class="text-4xl font-bold text-white">Бөлім {{ i }}</div>
      </div>
    </div>
  </div>
</template>`,
      script: `import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const containerRef = ref<HTMLElement>()
const wrapperRef = ref<HTMLElement>()

onMounted(() => {
  const wrapper = wrapperRef.value
  const sections = wrapper?.children.length || 1

  gsap.to(wrapper, {
    x: () => -(wrapper!.scrollWidth - window.innerWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: containerRef.value,
      start: 'top top',
      end: () => '+=' + wrapper!.scrollWidth,
      pin: true,
      scrub: 1
    }
  })
})

onUnmounted(() => {
  ScrollTrigger.killAll()
})`,
      css: `.min-w-screen {
  min-width: 100vw;
}`,
    },
  },
];
