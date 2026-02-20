import type { Effect } from "~/types/effects";

export const imageEffects: Effect[] = [
  {
    id: "image-fade",
    name: "Image Fade",
    nameKz: "Сурет фейді",
    category: "image",
    description: "Image fade in animation",
    descriptionKz: "Суреттің біртіндеп пайда болуы",
    defaultText: "Сурет",
    playgroundType: "image",
    code: {
      vue: `<template>
  <div
    ref="imageRef"
    class="w-64 h-40 bg-cover bg-center rounded-xl"
    style="opacity: 0; background-image: url('/placeholder.jpg')"
  />
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const imageRef = ref<HTMLElement>()

onMounted(() => {
  gsap.to(imageRef.value, {
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  })
})`,
      css: `.bg-cover {
  background-size: cover;
}`,
    },
  },
  {
    id: "image-clip",
    name: "Image Clip",
    nameKz: "Сурет кесу",
    category: "image",
    description: "Image reveal with clip-path",
    descriptionKz: "Clip-path арқылы суретті ашу",
    defaultText: "Сурет",
    playgroundType: "image",
    code: {
      vue: `<template>
  <div
    ref="imageRef"
    class="w-64 h-40 bg-cover bg-center rounded-xl"
    style="clip-path: inset(0 100% 0 0); background-image: url('/placeholder.jpg')"
  />
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const imageRef = ref<HTMLElement>()

onMounted(() => {
  gsap.to(imageRef.value, {
    clipPath: 'inset(0 0% 0 0)',
    duration: 1,
    ease: 'power3.inOut'
  })
})`,
      css: `/* clip-path анимациясы */`,
    },
  },
  {
    id: "image-mask",
    name: "Image Mask",
    nameKz: "Сурет маскасы",
    category: "image",
    description: "Image reveal with mask animation",
    descriptionKz: "Маска арқылы суретті ашу",
    defaultText: "Сурет",
    playgroundType: "image",
    code: {
      vue: `<template>
  <div class="relative w-64 h-40 rounded-xl overflow-hidden">
    <div
      class="absolute inset-0 bg-cover bg-center"
      style="background-image: url('/placeholder.jpg')"
    />
    <div
      ref="maskRef"
      class="absolute inset-0 bg-gray-900"
    />
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const maskRef = ref<HTMLElement>()

onMounted(() => {
  gsap.to(maskRef.value, {
    scaleX: 0,
    transformOrigin: 'right',
    duration: 1,
    ease: 'power3.inOut'
  })
})`,
      css: `.overflow-hidden {
  overflow: hidden;
}`,
    },
  },
  {
    id: "image-slide",
    name: "Image Slide",
    nameKz: "Сурет сырғуы",
    category: "image",
    description: "Image slides into view",
    descriptionKz: "Сурет сырғып келеді",
    defaultText: "Сурет",
    playgroundType: "image",
    code: {
      vue: `<template>
  <div class="overflow-hidden rounded-xl">
    <div
      ref="imageRef"
      class="w-64 h-40 bg-cover bg-center"
      style="transform: translateX(-100%); background-image: url('/placeholder.jpg')"
    />
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const imageRef = ref<HTMLElement>()

onMounted(() => {
  gsap.to(imageRef.value, {
    x: 0,
    duration: 1,
    ease: 'power3.out'
  })
})`,
      css: `.overflow-hidden {
  overflow: hidden;
}`,
    },
  },
  {
    id: "image-curtain",
    name: "Image Curtain",
    nameKz: "Сурет пердесі",
    category: "image",
    description: "Curtain reveal effect",
    descriptionKz: "Перде ашылу эффектісі",
    defaultText: "Сурет",
    playgroundType: "image",
    code: {
      vue: `<template>
  <div class="relative w-64 h-40 rounded-xl overflow-hidden">
    <div
      class="absolute inset-0 bg-cover bg-center"
      style="background-image: url('/placeholder.jpg')"
    />
    <div ref="leftRef" class="absolute inset-y-0 left-0 w-1/2 bg-green-500" />
    <div ref="rightRef" class="absolute inset-y-0 right-0 w-1/2 bg-green-500" />
  </div>
</template>`,
      script: `import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const leftRef = ref<HTMLElement>()
const rightRef = ref<HTMLElement>()

onMounted(() => {
  gsap.timeline()
    .to(leftRef.value, { x: '-100%', duration: 0.8, ease: 'power3.inOut' }, 0)
    .to(rightRef.value, { x: '100%', duration: 0.8, ease: 'power3.inOut' }, 0)
})`,
      css: `.overflow-hidden {
  overflow: hidden;
}`,
    },
  },
  {
    id: "image-zoom-hover",
    name: "Zoom on Hover",
    nameKz: "Hover кезінде үлкею",
    category: "image",
    description: "Image zooms on hover",
    descriptionKz: "Hover кезінде сурет үлкейеді",
    defaultText: "Сурет",
    playgroundType: "image",
    code: {
      vue: `<template>
  <div class="w-64 h-40 rounded-xl overflow-hidden">
    <div
      ref="imageRef"
      class="w-full h-full bg-cover bg-center transition-transform"
      style="background-image: url('/placeholder.jpg')"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
    />
  </div>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const imageRef = ref<HTMLElement>()

const onEnter = () => {
  gsap.to(imageRef.value, {
    scale: 1.1,
    duration: 0.5,
    ease: 'power2.out'
  })
}

const onLeave = () => {
  gsap.to(imageRef.value, {
    scale: 1,
    duration: 0.5,
    ease: 'power2.out'
  })
}`,
      css: `.overflow-hidden {
  overflow: hidden;
}`,
    },
  },
  {
    id: "image-pan-hover",
    name: "Pan on Hover",
    nameKz: "Hover кезінде жылжу",
    category: "image",
    description: "Image pans following mouse",
    descriptionKz: "Сурет тінтуір соңынан жылжиды",
    defaultText: "Сурет",
    playgroundType: "image",
    code: {
      vue: `<template>
  <div
    ref="containerRef"
    class="w-64 h-40 rounded-xl overflow-hidden cursor-pointer"
    @mousemove="onMove"
    @mouseleave="onLeave"
  >
    <div
      ref="imageRef"
      class="w-[120%] h-[120%] bg-cover bg-center"
      style="margin: -10%; background-image: url('/placeholder.jpg')"
    />
  </div>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const containerRef = ref<HTMLElement>()
const imageRef = ref<HTMLElement>()

const onMove = (e: MouseEvent) => {
  const rect = containerRef.value!.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5

  gsap.to(imageRef.value, {
    x: x * 30,
    y: y * 30,
    duration: 0.3,
    ease: 'power2.out'
  })
}

const onLeave = () => {
  gsap.to(imageRef.value, {
    x: 0,
    y: 0,
    duration: 0.5,
    ease: 'power2.out'
  })
}`,
      css: `.overflow-hidden {
  overflow: hidden;
}`,
    },
  },
  {
    id: "image-tilt",
    name: "Image Tilt",
    nameKz: "Сурет еңкеюі",
    category: "image",
    description: "3D tilt effect on hover",
    descriptionKz: "Hover кезінде 3D еңкею эффектісі",
    defaultText: "Сурет",
    playgroundType: "image",
    code: {
      vue: `<template>
  <div
    ref="cardRef"
    class="w-64 h-40 rounded-xl bg-cover bg-center cursor-pointer"
    style="transform-style: preserve-3d; perspective: 1000px; background-image: url('/placeholder.jpg')"
    @mousemove="onMove"
    @mouseleave="onLeave"
  />
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const cardRef = ref<HTMLElement>()

const onMove = (e: MouseEvent) => {
  const rect = cardRef.value!.getBoundingClientRect()
  const x = (e.clientX - rect.left - rect.width / 2) / rect.width
  const y = (e.clientY - rect.top - rect.height / 2) / rect.height

  gsap.to(cardRef.value, {
    rotateY: x * 20,
    rotateX: -y * 20,
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
      css: `/* 3D transform */`,
    },
  },
  {
    id: "image-overlay",
    name: "Image Overlay",
    nameKz: "Сурет қабаты",
    category: "image",
    description: "Overlay appears on hover",
    descriptionKz: "Hover кезінде қабат пайда болады",
    defaultText: "Сурет",
    playgroundType: "image",
    code: {
      vue: `<template>
  <div
    class="relative w-64 h-40 rounded-xl overflow-hidden cursor-pointer"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <div
      class="absolute inset-0 bg-cover bg-center"
      style="background-image: url('/placeholder.jpg')"
    />
    <div
      ref="overlayRef"
      class="absolute inset-0 bg-black/60 flex items-center justify-center"
      style="opacity: 0"
    >
      <span class="text-white font-bold text-lg">Ашу</span>
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
    id: "image-caption",
    name: "Image Caption",
    nameKz: "Сурет жазуы",
    category: "image",
    description: "Caption slides in on hover",
    descriptionKz: "Hover кезінде жазу сырғып келеді",
    defaultText: "Сурет",
    playgroundType: "image",
    code: {
      vue: `<template>
  <div
    class="relative w-64 h-40 rounded-xl overflow-hidden cursor-pointer"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <div
      class="absolute inset-0 bg-cover bg-center"
      style="background-image: url('/placeholder.jpg')"
    />
    <div
      ref="captionRef"
      class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
      style="transform: translateY(100%)"
    >
      <h3 class="text-white font-bold">Сурет атауы</h3>
      <p class="text-white/70 text-sm">Қысқаша сипаттама</p>
    </div>
  </div>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const captionRef = ref<HTMLElement>()

const onEnter = () => {
  gsap.to(captionRef.value, {
    y: 0,
    duration: 0.4,
    ease: 'power3.out'
  })
}

const onLeave = () => {
  gsap.to(captionRef.value, {
    y: '100%',
    duration: 0.3,
    ease: 'power3.in'
  })
}`,
      css: `.overflow-hidden {
  overflow: hidden;
}`,
    },
  },
  {
    id: "slider-basic",
    name: "Basic Slider",
    nameKz: "Қарапайым слайдер",
    category: "image",
    description: "Basic image slider",
    descriptionKz: "Қарапайым сурет слайдері",
    defaultText: "Слайдер",
    playgroundType: "image",
    code: {
      vue: `<template>
  <div class="relative w-64 overflow-hidden rounded-xl">
    <div ref="trackRef" class="flex">
      <div v-for="i in 3" :key="i" class="w-64 h-40 flex-shrink-0 bg-cover bg-center" :style="{ backgroundColor: colors[i-1] }">
        <div class="w-full h-full flex items-center justify-center text-white text-2xl font-bold">{{ i }}</div>
      </div>
    </div>
    <button class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full" @click="prev">←</button>
    <button class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full" @click="next">→</button>
  </div>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const trackRef = ref<HTMLElement>()
const currentIndex = ref(0)
const colors = ['#0ae448', '#0ba934', '#089c2d']

const goTo = (index: number) => {
  gsap.to(trackRef.value, {
    x: -index * 256,
    duration: 0.5,
    ease: 'power2.out'
  })
  currentIndex.value = index
}

const next = () => {
  const nextIndex = (currentIndex.value + 1) % 3
  goTo(nextIndex)
}

const prev = () => {
  const prevIndex = (currentIndex.value - 1 + 3) % 3
  goTo(prevIndex)
}`,
      css: `.flex-shrink-0 {
  flex-shrink: 0;
}`,
    },
  },
  {
    id: "slider-infinite",
    name: "Infinite Slider",
    nameKz: "Шексіз слайдер",
    category: "image",
    description: "Infinite looping slider",
    descriptionKz: "Шексіз айналатын слайдер",
    defaultText: "Слайдер",
    playgroundType: "image",
    code: {
      vue: `<template>
  <div class="w-64 overflow-hidden rounded-xl">
    <div ref="trackRef" class="flex">
      <div v-for="i in 6" :key="i" class="w-32 h-32 flex-shrink-0 flex items-center justify-center text-white text-2xl font-bold" :style="{ backgroundColor: colors[(i-1) % 3] }">
        {{ (i - 1) % 3 + 1 }}
      </div>
    </div>
  </div>
</template>`,
      script: `import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const trackRef = ref<HTMLElement>()
const colors = ['#0ae448', '#0ba934', '#089c2d']
let tween: gsap.core.Tween

onMounted(() => {
  tween = gsap.to(trackRef.value, {
    x: -384, // 3 items * 128px
    duration: 10,
    ease: 'none',
    repeat: -1
  })
})

onUnmounted(() => {
  tween?.kill()
})`,
      css: `.flex-shrink-0 {
  flex-shrink: 0;
}`,
    },
  },
  {
    id: "slider-draggable",
    name: "Draggable Slider",
    nameKz: "Сүйрелетін слайдер",
    category: "image",
    description: "Drag to navigate slider",
    descriptionKz: "Сүйреп навигация жасалатын слайдер",
    defaultText: "Слайдер",
    playgroundType: "image",
    code: {
      vue: `<template>
  <div class="w-64 overflow-hidden rounded-xl cursor-grab active:cursor-grabbing" @mousedown="onStart" @mousemove="onMove" @mouseup="onEnd" @mouseleave="onEnd">
    <div ref="trackRef" class="flex">
      <div v-for="i in 3" :key="i" class="w-64 h-40 flex-shrink-0 flex items-center justify-center text-white text-2xl font-bold" :style="{ backgroundColor: colors[i-1] }">
        {{ i }}
      </div>
    </div>
  </div>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const trackRef = ref<HTMLElement>()
const colors = ['#0ae448', '#0ba934', '#089c2d']
const isDragging = ref(false)
const startX = ref(0)
const currentX = ref(0)

const onStart = (e: MouseEvent) => {
  isDragging.value = true
  startX.value = e.clientX - currentX.value
}

const onMove = (e: MouseEvent) => {
  if (!isDragging.value) return
  const x = e.clientX - startX.value
  currentX.value = Math.max(-512, Math.min(0, x))
  gsap.set(trackRef.value, { x: currentX.value })
}

const onEnd = () => {
  if (!isDragging.value) return
  isDragging.value = false
  const snapTo = Math.round(currentX.value / -256) * -256
  currentX.value = Math.max(-512, Math.min(0, snapTo))
  gsap.to(trackRef.value, { x: currentX.value, duration: 0.3, ease: 'power2.out' })
}`,
      css: `.cursor-grab {
  cursor: grab;
}`,
    },
  },
  {
    id: "lightbox",
    name: "Lightbox",
    nameKz: "Лайтбокс",
    category: "image",
    description: "Image lightbox effect",
    descriptionKz: "Сурет лайтбокс эффектісі",
    defaultText: "Сурет",
    playgroundType: "image",
    code: {
      vue: `<template>
  <div>
    <div
      ref="thumbRef"
      class="w-32 h-20 bg-green-500 rounded-lg cursor-pointer flex items-center justify-center"
      @click="open"
    >
      <span class="text-black font-bold">Ашу</span>
    </div>
    <div
      v-if="isOpen"
      ref="overlayRef"
      class="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      style="opacity: 0"
      @click="close"
    >
      <div
        ref="modalRef"
        class="w-80 h-48 bg-green-500 rounded-xl flex items-center justify-center"
        style="transform: scale(0.8)"
        @click.stop
      >
        <span class="text-black text-2xl font-bold">Үлкен сурет</span>
      </div>
    </div>
  </div>
</template>`,
      script: `import { ref, nextTick } from 'vue'
import gsap from 'gsap'

const thumbRef = ref<HTMLElement>()
const overlayRef = ref<HTMLElement>()
const modalRef = ref<HTMLElement>()
const isOpen = ref(false)

const open = async () => {
  isOpen.value = true
  await nextTick()
  gsap.to(overlayRef.value, { opacity: 1, duration: 0.3 })
  gsap.to(modalRef.value, { scale: 1, duration: 0.5, ease: 'back.out(1.7)' })
}

const close = () => {
  gsap.to(overlayRef.value, { opacity: 0, duration: 0.3 })
  gsap.to(modalRef.value, { scale: 0.8, duration: 0.3, onComplete: () => { isOpen.value = false } })
}`,
      css: `.fixed {
  position: fixed;
}`,
    },
  },
  {
    id: "masonry-reveal",
    name: "Masonry Reveal",
    nameKz: "Мазоника ашылуы",
    category: "image",
    description: "Staggered masonry reveal",
    descriptionKz: "Кезекті мазоника ашылуы",
    defaultText: "Галерея",
    playgroundType: "image",
    code: {
      vue: `<template>
  <div class="grid grid-cols-3 gap-2 w-64">
    <div
      v-for="i in 6"
      :key="i"
      :ref="el => items[i-1] = el"
      class="h-20 bg-green-500 rounded-lg flex items-center justify-center"
      :class="{ 'col-span-2': i === 1 || i === 4, 'row-span-2': i === 2 }"
      style="opacity: 0; transform: translateY(20px)"
    >
      <span class="text-black font-bold">{{ i }}</span>
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
    stagger: {
      each: 0.1,
      from: 'random'
    },
    ease: 'power2.out'
  })
})`,
      css: `.grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}`,
    },
  },
  {
    id: "image-crossfade",
    name: "Image Crossfade",
    nameKz: "Сурет кроссфейді",
    category: "image",
    description: "Crossfade between images",
    descriptionKz: "Суреттер арасында кроссфейд",
    defaultText: "Слайдшоу",
    playgroundType: "image",
    code: {
      vue: `<template>
  <div class="relative w-64 h-40 rounded-xl overflow-hidden">
    <div
      v-for="(color, i) in colors"
      :key="i"
      :ref="el => images[i] = el"
      class="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold"
      :style="{ backgroundColor: color, opacity: i === 0 ? 1 : 0 }"
    >
      {{ i + 1 }}
    </div>
  </div>
</template>`,
      script: `import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const images = ref<HTMLElement[]>([])
const colors = ['#0ae448', '#0ba934', '#089c2d']
let currentIndex = 0
let interval: number

onMounted(() => {
  interval = setInterval(() => {
    const current = currentIndex
    const next = (currentIndex + 1) % 3
    gsap.to(images.value[current], { opacity: 0, duration: 0.5 })
    gsap.to(images.value[next], { opacity: 1, duration: 0.5 })
    currentIndex = next
  }, 2000)
})

onUnmounted(() => {
  clearInterval(interval)
})`,
      css: `.overflow-hidden {
  overflow: hidden;
}`,
    },
  },
  {
    id: "before-after",
    name: "Before/After Slider",
    nameKz: "Дейін/Кейін слайдер",
    category: "image",
    description: "Compare two images with slider",
    descriptionKz: "Екі суретті слайдермен салыстыру",
    defaultText: "Салыстыру",
    playgroundType: "image",
    code: {
      vue: `<template>
  <div
    ref="containerRef"
    class="relative w-64 h-40 rounded-xl overflow-hidden cursor-ew-resize select-none"
    @mousedown="onStart"
    @mousemove="onMove"
    @mouseup="onEnd"
    @mouseleave="onEnd"
  >
    <div class="absolute inset-0 bg-gray-700 flex items-center justify-center">
      <span class="text-white font-bold">КЕЙІН</span>
    </div>
    <div
      ref="beforeRef"
      class="absolute inset-0 bg-green-500 flex items-center justify-center"
      style="clip-path: inset(0 50% 0 0)"
    >
      <span class="text-black font-bold">ДЕЙІН</span>
    </div>
    <div
      ref="handleRef"
      class="absolute top-0 bottom-0 w-1 bg-white"
      style="left: 50%"
    >
      <div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
        ⟷
      </div>
    </div>
  </div>
</template>`,
      script: `import { ref } from 'vue'
import gsap from 'gsap'

const containerRef = ref<HTMLElement>()
const beforeRef = ref<HTMLElement>()
const handleRef = ref<HTMLElement>()
const isDragging = ref(false)

const onStart = () => { isDragging.value = true }
const onEnd = () => { isDragging.value = false }

const onMove = (e: MouseEvent) => {
  if (!isDragging.value || !containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
  gsap.set(beforeRef.value, { clipPath: \`inset(0 \${(1 - x) * 100}% 0 0)\` })
  gsap.set(handleRef.value, { left: \`\${x * 100}%\` })
}`,
      css: `.cursor-ew-resize {
  cursor: ew-resize;
}`,
    },
  },
];
