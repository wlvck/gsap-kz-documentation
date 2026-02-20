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
];
