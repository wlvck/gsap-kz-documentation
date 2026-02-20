<script setup lang="ts">
import gsap from "gsap";
import type { Effect } from "~/types/effects";

const props = defineProps<{
  effect: Effect;
}>();

const containerRef = ref<HTMLElement | null>(null);
const imageRef = ref<HTMLElement | null>(null);
const maskRef = ref<HTMLElement | null>(null);
const overlayRef = ref<HTMLElement | null>(null);
const captionRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);
const leftRef = ref<HTMLElement | null>(null);
const rightRef = ref<HTMLElement | null>(null);
const beforeRef = ref<HTMLElement | null>(null);
const handleRef = ref<HTMLElement | null>(null);
const itemRefs = ref<(HTMLElement | null)[]>([]);
const slideRefs = ref<(HTMLElement | null)[]>([]);

let currentAnimation: gsap.core.Tween | gsap.core.Timeline | null = null;
const currentSlide = ref(0);
const isDragging = ref(false);
const dragStartX = ref(0);
const dragCurrentX = ref(0);
const isLightboxOpen = ref(false);

// Colors for demo slides
const colors = ["#0ae448", "#0ba934", "#089c2d"];

const startAnimation = () => {
  stopAnimation();

  switch (props.effect.id) {
    case "image-fade":
      if (imageRef.value) {
        gsap.set(imageRef.value, { opacity: 0 });
        currentAnimation = gsap.to(imageRef.value, {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        });
      }
      break;

    case "image-clip":
      if (imageRef.value) {
        gsap.set(imageRef.value, { clipPath: "inset(0 100% 0 0)" });
        currentAnimation = gsap.to(imageRef.value, {
          clipPath: "inset(0 0% 0 0)",
          duration: 1,
          ease: "power3.inOut",
        });
      }
      break;

    case "image-mask":
      if (maskRef.value) {
        gsap.set(maskRef.value, { scaleX: 1 });
        currentAnimation = gsap.to(maskRef.value, {
          scaleX: 0,
          transformOrigin: "right",
          duration: 1,
          ease: "power3.inOut",
        });
      }
      break;

    case "image-slide":
      if (imageRef.value) {
        gsap.set(imageRef.value, { x: "-100%" });
        currentAnimation = gsap.to(imageRef.value, {
          x: 0,
          duration: 1,
          ease: "power3.out",
        });
      }
      break;

    case "image-curtain":
      if (leftRef.value && rightRef.value) {
        gsap.set([leftRef.value, rightRef.value], { x: 0 });
        currentAnimation = gsap.timeline();
        (currentAnimation as gsap.core.Timeline)
          .to(leftRef.value, { x: "-100%", duration: 0.8, ease: "power3.inOut" }, 0)
          .to(rightRef.value, { x: "100%", duration: 0.8, ease: "power3.inOut" }, 0);
      }
      break;

    case "slider-infinite":
      if (trackRef.value) {
        currentAnimation = gsap.to(trackRef.value, {
          x: -384,
          duration: 10,
          ease: "none",
          repeat: -1,
        });
      }
      break;

    case "masonry-reveal": {
      const validItems = itemRefs.value.filter(Boolean);
      if (validItems.length > 0) {
        gsap.set(validItems, { opacity: 0, y: 20 });
        currentAnimation = gsap.to(validItems, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: { each: 0.1, from: "random" },
          ease: "power2.out",
        });
      }
      break;
    }

    case "image-crossfade": {
      const validSlides = slideRefs.value.filter(Boolean);
      if (validSlides.length > 0) {
        gsap.set(validSlides, (i) => ({ opacity: i === 0 ? 1 : 0 }));
        let currentIdx = 0;
        const crossfade = () => {
          const current = currentIdx;
          const next = (currentIdx + 1) % validSlides.length;
          gsap.to(validSlides[current], { opacity: 0, duration: 0.5 });
          gsap.to(validSlides[next], { opacity: 1, duration: 0.5 });
          currentIdx = next;
        };
        currentAnimation = gsap.timeline({ repeat: -1, repeatDelay: 2 });
        (currentAnimation as gsap.core.Timeline).call(crossfade);
      }
      break;
    }
  }
};

const stopAnimation = () => {
  if (currentAnimation) {
    currentAnimation.kill();
    currentAnimation = null;
  }
};

const restart = () => {
  stopAnimation();
  nextTick(() => {
    startAnimation();
  });
};

// Hover handlers for hover effects
const onImageEnter = () => {
  if (props.effect.id === "image-zoom-hover" && imageRef.value) {
    gsap.to(imageRef.value, { scale: 1.1, duration: 0.5, ease: "power2.out" });
  }
  if (props.effect.id === "image-overlay" && overlayRef.value) {
    gsap.to(overlayRef.value, { opacity: 1, duration: 0.3, ease: "power2.out" });
  }
  if (props.effect.id === "image-caption" && captionRef.value) {
    gsap.to(captionRef.value, { y: 0, duration: 0.4, ease: "power3.out" });
  }
};

const onImageLeave = () => {
  if (props.effect.id === "image-zoom-hover" && imageRef.value) {
    gsap.to(imageRef.value, { scale: 1, duration: 0.5, ease: "power2.out" });
  }
  if (props.effect.id === "image-overlay" && overlayRef.value) {
    gsap.to(overlayRef.value, { opacity: 0, duration: 0.3, ease: "power2.out" });
  }
  if (props.effect.id === "image-caption" && captionRef.value) {
    gsap.to(captionRef.value, { y: "100%", duration: 0.3, ease: "power3.in" });
  }
};

const onImageMove = (e: MouseEvent) => {
  if (!containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();

  if (props.effect.id === "image-pan-hover" && imageRef.value) {
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(imageRef.value, { x: x * 30, y: y * 30, duration: 0.3, ease: "power2.out" });
  }

  if (props.effect.id === "image-tilt" && imageRef.value) {
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    gsap.to(imageRef.value, {
      rotateY: x * 20,
      rotateX: -y * 20,
      duration: 0.3,
      ease: "power2.out",
    });
  }
};

const onImageLeaveMove = () => {
  if (props.effect.id === "image-pan-hover" && imageRef.value) {
    gsap.to(imageRef.value, { x: 0, y: 0, duration: 0.5, ease: "power2.out" });
  }
  if (props.effect.id === "image-tilt" && imageRef.value) {
    gsap.to(imageRef.value, { rotateY: 0, rotateX: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
  }
};

// Slider handlers
const goToSlide = (index: number) => {
  if (trackRef.value) {
    gsap.to(trackRef.value, { x: -index * 256, duration: 0.5, ease: "power2.out" });
    currentSlide.value = index;
  }
};

const nextSlide = () => goToSlide((currentSlide.value + 1) % 3);
const prevSlide = () => goToSlide((currentSlide.value - 1 + 3) % 3);

// Drag handlers
const onDragStart = (e: MouseEvent) => {
  isDragging.value = true;
  dragStartX.value = e.clientX - dragCurrentX.value;
};

const onDragMove = (e: MouseEvent) => {
  if (!isDragging.value) return;
  const x = e.clientX - dragStartX.value;
  dragCurrentX.value = Math.max(-512, Math.min(0, x));
  gsap.set(trackRef.value, { x: dragCurrentX.value });
};

const onDragEnd = () => {
  if (!isDragging.value) return;
  isDragging.value = false;
  const snapTo = Math.round(dragCurrentX.value / -256) * -256;
  dragCurrentX.value = Math.max(-512, Math.min(0, snapTo));
  gsap.to(trackRef.value, { x: dragCurrentX.value, duration: 0.3, ease: "power2.out" });
};

// Before/After slider
const onCompareMove = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value || !containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();
  const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
  const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  gsap.set(beforeRef.value, { clipPath: `inset(0 ${(1 - x) * 100}% 0 0)` });
  gsap.set(handleRef.value, { left: `${x * 100}%` });
};

const onCompareStart = (e: MouseEvent | TouchEvent) => {
  isDragging.value = true;
  onCompareMove(e); // Update position immediately on click/touch
};

const onCompareEnd = () => {
  isDragging.value = false;
};

// Lightbox
const openLightbox = () => {
  isLightboxOpen.value = true;
  nextTick(() => {
    gsap.to(overlayRef.value, { opacity: 1, duration: 0.3 });
    gsap.to(imageRef.value, { scale: 1, duration: 0.5, ease: "back.out(1.7)" });
  });
};

const closeLightbox = () => {
  gsap.to(overlayRef.value, { opacity: 0, duration: 0.3 });
  gsap.to(imageRef.value, {
    scale: 0.8,
    duration: 0.3,
    onComplete: () => {
      isLightboxOpen.value = false;
    },
  });
};

// Determine if effect needs auto-play
const needsAutoPlay = computed(() =>
  [
    "image-fade",
    "image-clip",
    "image-mask",
    "image-slide",
    "image-curtain",
    "slider-infinite",
    "masonry-reveal",
    "image-crossfade",
  ].includes(props.effect.id)
);

// Instruction text
const instruction = computed(() => {
  switch (props.effect.id) {
    case "image-fade":
    case "image-clip":
    case "image-mask":
    case "image-slide":
    case "image-curtain":
    case "masonry-reveal":
      return "Қайта бастау батырмасын басыңыз";
    case "image-zoom-hover":
      return "Суретке hover жасаңыз";
    case "image-pan-hover":
      return "Суреттің үстінде тінтуірді қозғаңыз";
    case "image-tilt":
      return "Суретті еңкейту үшін тінтуірді қозғаңыз";
    case "image-overlay":
    case "image-caption":
      return "Суретке hover жасаңыз";
    case "slider-basic":
      return "Көрсеткілерді басыңыз";
    case "slider-infinite":
      return "Автоматты слайдшоу";
    case "slider-draggable":
      return "Слайдерді сүйреңіз";
    case "lightbox":
      return "Суретті басыңыз";
    case "image-crossfade":
      return "Автоматты кроссфейд";
    case "before-after":
      return "Слайдерді сүйреңіз";
    default:
      return "Эффектпен өзара әрекеттесіңіз";
  }
});

onMounted(() => {
  if (needsAutoPlay.value) {
    setTimeout(() => {
      startAnimation();
    }, 300);
  }
});

onUnmounted(() => {
  stopAnimation();
});

watch(
  () => props.effect.id,
  () => {
    restart();
  }
);
</script>

<template>
  <div class="rounded-xl border border-gsap-border overflow-hidden bg-gsap-bg-secondary">
    <!-- Demo Area -->
    <div
      ref="containerRef"
      class="relative min-h-[300px] md:min-h-[400px] flex flex-col items-center justify-center p-8 bg-gsap-bg-tertiary"
    >
      <!-- Grid Background -->
      <div
        class="absolute inset-0 opacity-10 pointer-events-none"
        style="
          background-image:
            linear-gradient(#2a2d2b 1px, transparent 1px),
            linear-gradient(90deg, #2a2d2b 1px, transparent 1px);
          background-size: 20px 20px;
        "
      />

      <!-- Image Fade -->
      <div
        v-if="effect.id === 'image-fade'"
        ref="imageRef"
        class="w-64 h-40 bg-gsap-green rounded-xl flex items-center justify-center"
        style="opacity: 0"
      >
        <span class="text-black font-bold text-xl">Сурет</span>
      </div>

      <!-- Image Clip -->
      <div
        v-else-if="effect.id === 'image-clip'"
        ref="imageRef"
        class="w-64 h-40 bg-gsap-green rounded-xl flex items-center justify-center"
        style="clip-path: inset(0 100% 0 0)"
      >
        <span class="text-black font-bold text-xl">Сурет</span>
      </div>

      <!-- Image Mask -->
      <div
        v-else-if="effect.id === 'image-mask'"
        class="relative w-64 h-40 rounded-xl overflow-hidden"
      >
        <div class="absolute inset-0 bg-gsap-green flex items-center justify-center">
          <span class="text-black font-bold text-xl">Сурет</span>
        </div>
        <div ref="maskRef" class="absolute inset-0 bg-gsap-bg-primary" />
      </div>

      <!-- Image Slide -->
      <div v-else-if="effect.id === 'image-slide'" class="overflow-hidden rounded-xl">
        <div
          ref="imageRef"
          class="w-64 h-40 bg-gsap-green flex items-center justify-center"
          style="transform: translateX(-100%)"
        >
          <span class="text-black font-bold text-xl">Сурет</span>
        </div>
      </div>

      <!-- Image Curtain -->
      <div
        v-else-if="effect.id === 'image-curtain'"
        class="relative w-64 h-40 rounded-xl overflow-hidden"
      >
        <div class="absolute inset-0 bg-gsap-green flex items-center justify-center">
          <span class="text-black font-bold text-xl">Сурет</span>
        </div>
        <div ref="leftRef" class="absolute inset-y-0 left-0 w-1/2 bg-gsap-bg-primary" />
        <div ref="rightRef" class="absolute inset-y-0 right-0 w-1/2 bg-gsap-bg-primary" />
      </div>

      <!-- Image Zoom Hover -->
      <div
        v-else-if="effect.id === 'image-zoom-hover'"
        class="w-64 h-40 rounded-xl overflow-hidden cursor-pointer"
        @mouseenter="onImageEnter"
        @mouseleave="onImageLeave"
      >
        <div ref="imageRef" class="w-full h-full bg-gsap-green flex items-center justify-center">
          <span class="text-black font-bold text-xl">Hover</span>
        </div>
      </div>

      <!-- Image Pan Hover -->
      <div
        v-else-if="effect.id === 'image-pan-hover'"
        class="w-64 h-40 rounded-xl overflow-hidden cursor-pointer"
        @mousemove="onImageMove"
        @mouseleave="onImageLeaveMove"
      >
        <div
          ref="imageRef"
          class="w-[120%] h-[120%] bg-gsap-green flex items-center justify-center"
          style="margin: -10%"
        >
          <span class="text-black font-bold text-xl">Pan</span>
        </div>
      </div>

      <!-- Image Tilt -->
      <div
        v-else-if="effect.id === 'image-tilt'"
        ref="imageRef"
        class="w-64 h-40 bg-gsap-green rounded-xl flex items-center justify-center cursor-pointer"
        style="transform-style: preserve-3d; perspective: 1000px"
        @mousemove="onImageMove"
        @mouseleave="onImageLeaveMove"
      >
        <span class="text-black font-bold text-xl">Tilt</span>
      </div>

      <!-- Image Overlay -->
      <div
        v-else-if="effect.id === 'image-overlay'"
        class="relative w-64 h-40 rounded-xl overflow-hidden cursor-pointer"
        @mouseenter="onImageEnter"
        @mouseleave="onImageLeave"
      >
        <div class="absolute inset-0 bg-gsap-green flex items-center justify-center">
          <span class="text-black font-bold text-xl">Сурет</span>
        </div>
        <div
          ref="overlayRef"
          class="absolute inset-0 bg-black/60 flex items-center justify-center"
          style="opacity: 0"
        >
          <span class="text-white font-bold text-lg">Ашу</span>
        </div>
      </div>

      <!-- Image Caption -->
      <div
        v-else-if="effect.id === 'image-caption'"
        class="relative w-64 h-40 rounded-xl overflow-hidden cursor-pointer"
        @mouseenter="onImageEnter"
        @mouseleave="onImageLeave"
      >
        <div class="absolute inset-0 bg-gsap-green flex items-center justify-center">
          <span class="text-black font-bold text-xl">Сурет</span>
        </div>
        <div
          ref="captionRef"
          class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
          style="transform: translateY(100%)"
        >
          <h3 class="text-white font-bold">Сурет атауы</h3>
          <p class="text-white/70 text-sm">Қысқаша сипаттама</p>
        </div>
      </div>

      <!-- Basic Slider -->
      <div
        v-else-if="effect.id === 'slider-basic'"
        class="relative w-64 overflow-hidden rounded-xl"
      >
        <div ref="trackRef" class="flex">
          <div
            v-for="(color, i) in colors"
            :key="i"
            class="w-64 h-40 flex-shrink-0 flex items-center justify-center"
            :style="{ backgroundColor: color }"
          >
            <span class="text-black text-2xl font-bold">{{ i + 1 }}</span>
          </div>
        </div>
        <button
          class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full"
          @click="prevSlide"
        >
          ←
        </button>
        <button
          class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full"
          @click="nextSlide"
        >
          →
        </button>
      </div>

      <!-- Infinite Slider -->
      <div v-else-if="effect.id === 'slider-infinite'" class="w-64 overflow-hidden rounded-xl">
        <div ref="trackRef" class="flex">
          <div
            v-for="i in 6"
            :key="i"
            class="w-32 h-32 flex-shrink-0 flex items-center justify-center"
            :style="{ backgroundColor: colors[(i - 1) % 3] }"
          >
            <span class="text-black text-2xl font-bold">{{ ((i - 1) % 3) + 1 }}</span>
          </div>
        </div>
      </div>

      <!-- Draggable Slider -->
      <div
        v-else-if="effect.id === 'slider-draggable'"
        class="w-64 overflow-hidden rounded-xl cursor-grab active:cursor-grabbing"
        @mousedown="onDragStart"
        @mousemove="onDragMove"
        @mouseup="onDragEnd"
        @mouseleave="onDragEnd"
      >
        <div ref="trackRef" class="flex">
          <div
            v-for="(color, i) in colors"
            :key="i"
            class="w-64 h-40 flex-shrink-0 flex items-center justify-center"
            :style="{ backgroundColor: color }"
          >
            <span class="text-black text-2xl font-bold">{{ i + 1 }}</span>
          </div>
        </div>
      </div>

      <!-- Lightbox -->
      <div v-else-if="effect.id === 'lightbox'">
        <div
          class="w-32 h-20 bg-gsap-green rounded-lg cursor-pointer flex items-center justify-center"
          @click="openLightbox"
        >
          <span class="text-black font-bold">Ашу</span>
        </div>
        <Teleport to="body">
          <div
            v-if="isLightboxOpen"
            ref="overlayRef"
            class="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            style="opacity: 0"
            @click="closeLightbox"
          >
            <div
              ref="imageRef"
              class="w-80 h-48 bg-gsap-green rounded-xl flex items-center justify-center"
              style="transform: scale(0.8)"
              @click.stop
            >
              <span class="text-black text-2xl font-bold">Үлкен сурет</span>
            </div>
          </div>
        </Teleport>
      </div>

      <!-- Masonry Reveal -->
      <div v-else-if="effect.id === 'masonry-reveal'" class="grid grid-cols-3 gap-2 w-64">
        <div
          v-for="i in 6"
          :key="i"
          :ref="(el) => (itemRefs[i - 1] = el as HTMLElement)"
          class="h-20 bg-gsap-green rounded-lg flex items-center justify-center"
          :class="{ 'col-span-2': i === 1 || i === 4 }"
          style="opacity: 0; transform: translateY(20px)"
        >
          <span class="text-black font-bold">{{ i }}</span>
        </div>
      </div>

      <!-- Image Crossfade -->
      <div
        v-else-if="effect.id === 'image-crossfade'"
        class="relative w-64 h-40 rounded-xl overflow-hidden"
      >
        <div
          v-for="(color, i) in colors"
          :key="i"
          :ref="(el) => (slideRefs[i] = el as HTMLElement)"
          class="absolute inset-0 flex items-center justify-center"
          :style="{ backgroundColor: color, opacity: i === 0 ? 1 : 0 }"
        >
          <span class="text-black text-2xl font-bold">{{ i + 1 }}</span>
        </div>
      </div>

      <!-- Before/After -->
      <div
        v-else-if="effect.id === 'before-after'"
        ref="containerRef"
        class="relative w-64 h-40 rounded-xl overflow-hidden cursor-ew-resize select-none"
        @mousedown="onCompareStart"
        @mousemove="onCompareMove"
        @mouseup="onCompareEnd"
        @mouseleave="onCompareEnd"
        @touchstart.prevent="onCompareStart"
        @touchmove.prevent="onCompareMove"
        @touchend="onCompareEnd"
      >
        <div class="absolute inset-0 bg-gsap-bg-secondary flex items-center justify-center">
          <span class="text-gsap-text-primary font-bold">КЕЙІН</span>
        </div>
        <div
          ref="beforeRef"
          class="absolute inset-0 bg-gsap-green flex items-center justify-center"
          style="clip-path: inset(0 50% 0 0)"
        >
          <span class="text-black font-bold">ДЕЙІН</span>
        </div>
        <div ref="handleRef" class="absolute top-0 bottom-0 w-1 bg-white" style="left: 50%">
          <div
            class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm"
          >
            ⟷
          </div>
        </div>
      </div>

      <!-- Instruction & Restart Button -->
      <div class="mt-6 flex flex-col items-center gap-4">
        <p class="text-gsap-text-muted text-sm">{{ instruction }}</p>
        <button
          v-if="needsAutoPlay"
          type="button"
          class="flex items-center gap-2 px-4 py-2 rounded-lg bg-gsap-bg-secondary border border-gsap-border text-gsap-text-primary hover:border-gsap-green/50 transition-colors"
          @click="restart"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Қайта бастау
        </button>
      </div>
    </div>

    <!-- Code Tabs -->
    <EffectsCodeTabs :code="effect.code" />
  </div>
</template>

<style scoped>
.flex-shrink-0 {
  flex-shrink: 0;
}
</style>
