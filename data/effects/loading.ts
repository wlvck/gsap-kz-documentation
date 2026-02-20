import type { Effect } from "~/types/effects";

export const loadingEffects: Effect[] = [
  {
    id: "spinner",
    name: "Spinner",
    nameKz: "Спиннер",
    category: "loading",
    description: "Animated loading spinner",
    descriptionKz: "Анимациялы жүктеу спиннері",
    defaultText: "Жүктелуде",
    playgroundType: "loading",
    code: {
      vue: `<template>
  <div class="flex flex-col items-center gap-4">
    <div
      ref="spinnerRef"
      class="w-12 h-12 border-4 border-green-500/30 border-t-green-500 rounded-full"
    />
    <span class="text-white">{{ text }}</span>
  </div>
</template>`,
      script: `import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const spinnerRef = ref<HTMLElement>()
const text = ref('Жүктелуде')
let tween: gsap.core.Tween

onMounted(() => {
  tween = gsap.to(spinnerRef.value, {
    rotation: 360,
    duration: 1,
    ease: 'none',
    repeat: -1
  })
})

onUnmounted(() => {
  tween?.kill()
})`,
      css: `.rounded-full {
  border-radius: 9999px;
}`,
    },
  },
  {
    id: "progress-bar",
    name: "Progress Bar",
    nameKz: "Прогресс бар",
    category: "loading",
    description: "Animated progress bar",
    descriptionKz: "Анимациялы прогресс бары",
    defaultText: "75",
    playgroundType: "loading",
    code: {
      vue: `<template>
  <div class="w-64">
    <div class="h-2 bg-gray-700 rounded-full overflow-hidden">
      <div
        ref="barRef"
        class="h-full bg-green-500 rounded-full"
        style="width: 0%"
      />
    </div>
    <p class="mt-2 text-center text-white">{{ progress }}%</p>
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const barRef = ref<HTMLElement>()
const progress = ref(0)
const targetProgress = 75

onMounted(() => {
  gsap.to(barRef.value, {
    width: targetProgress + '%',
    duration: 2,
    ease: 'power2.out',
    onUpdate: function() {
      progress.value = Math.round(this.progress() * targetProgress)
    }
  })
})`,
      css: `.overflow-hidden {
  overflow: hidden;
}`,
    },
  },
  {
    id: "skeleton",
    name: "Skeleton Loading",
    nameKz: "Скелетон жүктеу",
    category: "loading",
    description: "Skeleton loading animation",
    descriptionKz: "Скелетон жүктеу анимациясы",
    defaultText: "Контент",
    playgroundType: "loading",
    code: {
      vue: `<template>
  <div class="space-y-4 w-64">
    <div ref="line1" class="h-4 bg-gray-700 rounded" />
    <div ref="line2" class="h-4 bg-gray-700 rounded w-3/4" />
    <div ref="line3" class="h-4 bg-gray-700 rounded w-1/2" />
  </div>
</template>`,
      script: `import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const line1 = ref<HTMLElement>()
const line2 = ref<HTMLElement>()
const line3 = ref<HTMLElement>()
let tl: gsap.core.Timeline

onMounted(() => {
  tl = gsap.timeline({ repeat: -1 })

  tl.to([line1.value, line2.value, line3.value], {
    opacity: 0.5,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power1.inOut'
  })
  .to([line1.value, line2.value, line3.value], {
    opacity: 1,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power1.inOut'
  })
})

onUnmounted(() => {
  tl?.kill()
})`,
      css: `.space-y-4 > * + * {
  margin-top: 1rem;
}`,
    },
  },
  {
    id: "dots-loading",
    name: "Loading Dots",
    nameKz: "Жүктеу нүктелері",
    category: "loading",
    description: "Bouncing dots loading animation",
    descriptionKz: "Секіретін нүктелер анимациясы",
    defaultText: "Жүктелуде",
    playgroundType: "loading",
    code: {
      vue: `<template>
  <div class="flex items-center gap-2">
    <div
      v-for="i in 3"
      :key="i"
      :ref="el => dots[i-1] = el"
      class="w-3 h-3 bg-green-500 rounded-full"
    />
  </div>
</template>`,
      script: `import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const dots = ref<HTMLElement[]>([])
let tl: gsap.core.Timeline

onMounted(() => {
  tl = gsap.timeline({ repeat: -1 })

  tl.to(dots.value, {
    y: -20,
    duration: 0.4,
    stagger: 0.1,
    ease: 'power2.out'
  })
  .to(dots.value, {
    y: 0,
    duration: 0.4,
    stagger: 0.1,
    ease: 'bounce.out'
  })
})

onUnmounted(() => {
  tl?.kill()
})`,
      css: `.rounded-full {
  border-radius: 9999px;
}`,
    },
  },
  {
    id: "pulse-loading",
    name: "Pulse Loading",
    nameKz: "Пульс жүктеу",
    category: "loading",
    description: "Pulsing loading animation",
    descriptionKz: "Пульсациялық жүктеу анимациясы",
    defaultText: "Жүктелуде",
    playgroundType: "loading",
    code: {
      vue: `<template>
  <div class="relative flex items-center justify-center">
    <div
      ref="pulseRef"
      class="absolute w-16 h-16 bg-green-500/30 rounded-full"
    />
    <div class="w-8 h-8 bg-green-500 rounded-full" />
  </div>
</template>`,
      script: `import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const pulseRef = ref<HTMLElement>()
let tween: gsap.core.Tween

onMounted(() => {
  tween = gsap.to(pulseRef.value, {
    scale: 2,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    repeat: -1
  })
})

onUnmounted(() => {
  tween?.kill()
})`,
      css: `.rounded-full {
  border-radius: 9999px;
}`,
    },
  },
  {
    id: "logo-loader",
    name: "Logo Loader",
    nameKz: "Логотип жүктеуші",
    category: "loading",
    description: "Logo animation during loading",
    descriptionKz: "Жүктелу кезіндегі логотип анимациясы",
    defaultText: "GSAP",
    playgroundType: "loading",
    code: {
      vue: `<template>
  <div class="flex flex-col items-center gap-4">
    <div
      ref="logoRef"
      class="text-4xl font-bold text-green-500"
    >
      GSAP
    </div>
    <span class="text-white text-sm">Жүктелуде...</span>
  </div>
</template>`,
      script: `import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const logoRef = ref<HTMLElement>()
let tl: gsap.core.Timeline

onMounted(() => {
  tl = gsap.timeline({ repeat: -1 })

  tl.to(logoRef.value, {
    scale: 1.2,
    duration: 0.5,
    ease: 'power2.out'
  })
  .to(logoRef.value, {
    scale: 1,
    duration: 0.5,
    ease: 'power2.in'
  })
})

onUnmounted(() => {
  tl?.kill()
})`,
      css: `.text-4xl {
  font-size: 2.25rem;
}`,
    },
  },
  {
    id: "dots-bounce",
    name: "Bouncing Dots",
    nameKz: "Секіретін нүктелер",
    category: "loading",
    description: "Bouncing dots loading animation",
    descriptionKz: "Секіретін нүктелер жүктеу анимациясы",
    defaultText: "Жүктелуде",
    playgroundType: "loading",
    code: {
      vue: `<template>
  <div class="flex items-center gap-2">
    <div
      v-for="i in 3"
      :key="i"
      :ref="el => dots[i-1] = el"
      class="w-4 h-4 bg-green-500 rounded-full"
    />
  </div>
</template>`,
      script: `import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const dots = ref<HTMLElement[]>([])
let tl: gsap.core.Timeline

onMounted(() => {
  tl = gsap.timeline({ repeat: -1 })

  tl.to(dots.value, {
    y: -15,
    duration: 0.3,
    stagger: 0.1,
    ease: 'power2.out'
  })
  .to(dots.value, {
    y: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'bounce.out'
  })
})

onUnmounted(() => {
  tl?.kill()
})`,
      css: `.rounded-full {
  border-radius: 9999px;
}`,
    },
  },
  {
    id: "counter-loader",
    name: "Counter Loader",
    nameKz: "Санау жүктеуші",
    category: "loading",
    description: "Counting percentage loader",
    descriptionKz: "Пайыздық санау жүктеуші",
    defaultText: "0",
    playgroundType: "loading",
    code: {
      vue: `<template>
  <div class="flex flex-col items-center gap-4">
    <div class="text-6xl font-bold text-green-500 tabular-nums">
      {{ count }}%
    </div>
    <div class="w-48 h-1 bg-gray-700 rounded-full overflow-hidden">
      <div ref="barRef" class="h-full bg-green-500" style="width: 0%" />
    </div>
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const barRef = ref<HTMLElement>()
const count = ref(0)

onMounted(() => {
  const obj = { val: 0 }
  gsap.to(obj, {
    val: 100,
    duration: 3,
    ease: 'power1.inOut',
    onUpdate: () => {
      count.value = Math.round(obj.val)
    }
  })
  gsap.to(barRef.value, {
    width: '100%',
    duration: 3,
    ease: 'power1.inOut'
  })
})`,
      css: `.tabular-nums {
  font-variant-numeric: tabular-nums;
}`,
    },
  },
  {
    id: "page-fade",
    name: "Page Fade",
    nameKz: "Бет фейді",
    category: "loading",
    description: "Page fade in/out transition",
    descriptionKz: "Бет пайда болу/жоғалу өтуі",
    defaultText: "Бет жүктелуде",
    playgroundType: "loading",
    code: {
      vue: `<template>
  <div
    ref="pageRef"
    class="w-64 h-40 bg-gray-800 rounded-xl flex items-center justify-center"
    style="opacity: 0"
  >
    <span class="text-white">{{ text }}</span>
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const pageRef = ref<HTMLElement>()
const text = ref('Контент жүктелді')

onMounted(() => {
  gsap.to(pageRef.value, {
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  })
})`,
      css: `.rounded-xl {
  border-radius: 0.75rem;
}`,
    },
  },
  {
    id: "page-slide",
    name: "Page Slide",
    nameKz: "Бет сырғуы",
    category: "loading",
    description: "Page slide in transition",
    descriptionKz: "Бет сырғып кіру өтуі",
    defaultText: "Бет жүктелуде",
    playgroundType: "loading",
    code: {
      vue: `<template>
  <div class="overflow-hidden">
    <div
      ref="pageRef"
      class="w-64 h-40 bg-gray-800 rounded-xl flex items-center justify-center"
      style="transform: translateY(100%)"
    >
      <span class="text-white">{{ text }}</span>
    </div>
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const pageRef = ref<HTMLElement>()
const text = ref('Контент жүктелді')

onMounted(() => {
  gsap.to(pageRef.value, {
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
  })
})`,
      css: `.overflow-hidden {
  overflow: hidden;
}`,
    },
  },
  {
    id: "page-curtain",
    name: "Page Curtain",
    nameKz: "Бет пердесі",
    category: "loading",
    description: "Curtain reveal page transition",
    descriptionKz: "Перде ашылу бет өтуі",
    defaultText: "Бет жүктелуде",
    playgroundType: "loading",
    code: {
      vue: `<template>
  <div class="relative w-64 h-40 rounded-xl overflow-hidden">
    <div class="absolute inset-0 bg-gray-800 flex items-center justify-center">
      <span class="text-white">{{ text }}</span>
    </div>
    <div
      ref="curtainRef"
      class="absolute inset-0 bg-green-500"
    />
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const curtainRef = ref<HTMLElement>()
const text = ref('Контент жүктелді')

onMounted(() => {
  gsap.to(curtainRef.value, {
    scaleY: 0,
    transformOrigin: 'top',
    duration: 0.8,
    ease: 'power3.inOut',
    delay: 0.5
  })
})`,
      css: `.overflow-hidden {
  overflow: hidden;
}`,
    },
  },
  {
    id: "page-circle",
    name: "Circle Reveal",
    nameKz: "Шеңбер ашылуы",
    category: "loading",
    description: "Circle mask reveal transition",
    descriptionKz: "Шеңбер маска ашылу өтуі",
    defaultText: "Бет жүктелуде",
    playgroundType: "loading",
    code: {
      vue: `<template>
  <div
    ref="pageRef"
    class="w-64 h-40 bg-gray-800 rounded-xl flex items-center justify-center"
    style="clip-path: circle(0% at 50% 50%)"
  >
    <span class="text-white">{{ text }}</span>
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const pageRef = ref<HTMLElement>()
const text = ref('Контент жүктелді')

onMounted(() => {
  gsap.to(pageRef.value, {
    clipPath: 'circle(100% at 50% 50%)',
    duration: 1,
    ease: 'power2.out'
  })
})`,
      css: `/* clip-path анимациясы */`,
    },
  },
  {
    id: "page-diagonal",
    name: "Diagonal Reveal",
    nameKz: "Диагональ ашылуы",
    category: "loading",
    description: "Diagonal wipe reveal transition",
    descriptionKz: "Диагональ сүрту ашылу өтуі",
    defaultText: "Бет жүктелуде",
    playgroundType: "loading",
    code: {
      vue: `<template>
  <div
    ref="pageRef"
    class="w-64 h-40 bg-gray-800 rounded-xl flex items-center justify-center"
    style="clip-path: polygon(0 0, 0 0, 0 100%, 0 100%)"
  >
    <span class="text-white">{{ text }}</span>
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const pageRef = ref<HTMLElement>()
const text = ref('Контент жүктелді')

onMounted(() => {
  gsap.to(pageRef.value, {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    duration: 0.8,
    ease: 'power3.inOut'
  })
})`,
      css: `/* clip-path polygon анимациясы */`,
    },
  },
  {
    id: "lazy-reveal",
    name: "Lazy Reveal",
    nameKz: "Баяу ашылу",
    category: "loading",
    description: "Lazy content reveal animation",
    descriptionKz: "Контентті баяу ашу анимациясы",
    defaultText: "Контент",
    playgroundType: "loading",
    code: {
      vue: `<template>
  <div class="space-y-4">
    <div
      v-for="i in 3"
      :key="i"
      :ref="el => items[i-1] = el"
      class="w-64 h-16 bg-gray-800 rounded-lg flex items-center justify-center"
      style="opacity: 0; transform: translateY(20px)"
    >
      <span class="text-white">Элемент {{ i }}</span>
    </div>
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const items = ref<HTMLElement[]>([])

onMounted(() => {
  gsap.to(items.value, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: 'power2.out'
  })
})`,
      css: `.space-y-4 > * + * {
  margin-top: 1rem;
}`,
    },
  },
  {
    id: "placeholder",
    name: "Placeholder Shimmer",
    nameKz: "Плейсхолдер жарқылы",
    category: "loading",
    description: "Shimmer placeholder loading effect",
    descriptionKz: "Жарқылды плейсхолдер жүктеу эффектісі",
    defaultText: "Жүктелуде",
    playgroundType: "loading",
    code: {
      vue: `<template>
  <div class="w-64 space-y-3">
    <div ref="shimmer1" class="h-8 bg-gray-700 rounded overflow-hidden relative">
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent -translate-x-full" />
    </div>
    <div ref="shimmer2" class="h-4 bg-gray-700 rounded w-3/4 overflow-hidden relative">
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent -translate-x-full" />
    </div>
  </div>
</template>`,
      script: `import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const shimmer1 = ref<HTMLElement>()
const shimmer2 = ref<HTMLElement>()
let tl: gsap.core.Timeline

onMounted(() => {
  const shimmers = [
    shimmer1.value?.querySelector('div'),
    shimmer2.value?.querySelector('div')
  ]

  tl = gsap.timeline({ repeat: -1 })
  tl.to(shimmers, {
    xPercent: 200,
    duration: 1.5,
    stagger: 0.1,
    ease: 'power1.inOut'
  })
})

onUnmounted(() => {
  tl?.kill()
})`,
      css: `.-translate-x-full {
  transform: translateX(-100%);
}`,
    },
  },
  {
    id: "image-lazy",
    name: "Image Lazy Load",
    nameKz: "Сурет баяу жүктеу",
    category: "loading",
    description: "Image lazy loading with blur effect",
    descriptionKz: "Блур эффектімен сурет баяу жүктеу",
    defaultText: "Сурет",
    playgroundType: "loading",
    code: {
      vue: `<template>
  <div
    ref="imageRef"
    class="w-64 h-40 bg-gray-700 rounded-xl flex items-center justify-center"
    style="filter: blur(10px); opacity: 0.5"
  >
    <span class="text-4xl">🖼️</span>
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const imageRef = ref<HTMLElement>()

onMounted(() => {
  // Simulate image loading
  setTimeout(() => {
    gsap.to(imageRef.value, {
      filter: 'blur(0px)',
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    })
  }, 500)
})`,
      css: `.rounded-xl {
  border-radius: 0.75rem;
}`,
    },
  },
];
