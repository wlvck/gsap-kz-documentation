<script setup lang="ts">
import gsap from "gsap";
import type { Effect } from "~/types/effects";

const props = defineProps<{
  effect: Effect;
}>();

const containerRef = ref<HTMLElement | null>(null);
const spinnerRef = ref<HTMLElement | null>(null);
const barRef = ref<HTMLElement | null>(null);
const progressText = ref(0);
const skeletonRefs = ref<(HTMLElement | null)[]>([]);
const dotRefs = ref<(HTMLElement | null)[]>([]);
const pulseRef = ref<HTMLElement | null>(null);
const logoRef = ref<HTMLElement | null>(null);
const counterText = ref(0);
const pageRef = ref<HTMLElement | null>(null);
const curtainRef = ref<HTMLElement | null>(null);
const itemRefs = ref<(HTMLElement | null)[]>([]);
const shimmerRefs = ref<(HTMLElement | null)[]>([]);
const imageRef = ref<HTMLElement | null>(null);

let currentAnimation: gsap.core.Tween | gsap.core.Timeline | null = null;

const startAnimation = () => {
  stopAnimation();

  switch (props.effect.id) {
    case "spinner":
      if (spinnerRef.value) {
        currentAnimation = gsap.to(spinnerRef.value, {
          rotation: 360,
          duration: 1,
          ease: "none",
          repeat: -1,
        });
      }
      break;

    case "progress-bar":
      progressText.value = 0;
      if (barRef.value) {
        currentAnimation = gsap.to(barRef.value, {
          width: "100%",
          duration: 3,
          ease: "power2.out",
          repeat: -1,
          repeatDelay: 1,
          onUpdate: function () {
            progressText.value = Math.round(this.progress() * 100);
          },
          onRepeat: () => {
            progressText.value = 0;
            gsap.set(barRef.value, { width: "0%" });
          },
        });
      }
      break;

    case "skeleton": {
      const validRefs = skeletonRefs.value.filter(Boolean);
      if (validRefs.length > 0) {
        currentAnimation = gsap.timeline({ repeat: -1 });
        (currentAnimation as gsap.core.Timeline)
          .to(validRefs, {
            opacity: 0.5,
            duration: 0.8,
            stagger: 0.1,
            ease: "power1.inOut",
          })
          .to(validRefs, {
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power1.inOut",
          });
      }
      break;
    }

    case "dots-loading": {
      const validDots = dotRefs.value.filter(Boolean);
      if (validDots.length > 0) {
        currentAnimation = gsap.timeline({ repeat: -1 });
        (currentAnimation as gsap.core.Timeline)
          .to(validDots, {
            y: -20,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
          })
          .to(validDots, {
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "bounce.out",
          });
      }
      break;
    }

    case "pulse-loading":
      if (pulseRef.value) {
        currentAnimation = gsap.to(pulseRef.value, {
          scale: 2,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          repeat: -1,
        });
      }
      break;

    case "logo-loader":
      if (logoRef.value) {
        currentAnimation = gsap.timeline({ repeat: -1 });
        (currentAnimation as gsap.core.Timeline)
          .to(logoRef.value, { scale: 1.2, duration: 0.5, ease: "power2.out" })
          .to(logoRef.value, { scale: 1, duration: 0.5, ease: "power2.in" });
      }
      break;

    case "dots-bounce": {
      const validDots = dotRefs.value.filter(Boolean);
      if (validDots.length > 0) {
        currentAnimation = gsap.timeline({ repeat: -1 });
        (currentAnimation as gsap.core.Timeline)
          .to(validDots, { y: -15, duration: 0.3, stagger: 0.1, ease: "power2.out" })
          .to(validDots, { y: 0, duration: 0.5, stagger: 0.1, ease: "bounce.out" });
      }
      break;
    }

    case "counter-loader":
      counterText.value = 0;
      if (barRef.value) {
        gsap.set(barRef.value, { width: "0%" });
        const obj = { val: 0 };
        currentAnimation = gsap.timeline({ repeat: -1, repeatDelay: 1 });
        (currentAnimation as gsap.core.Timeline)
          .to(obj, {
            val: 100,
            duration: 3,
            ease: "power1.inOut",
            onUpdate: () => {
              counterText.value = Math.round(obj.val);
            },
          })
          .to(barRef.value, { width: "100%", duration: 3, ease: "power1.inOut" }, 0)
          .call(() => {
            counterText.value = 0;
            gsap.set(barRef.value, { width: "0%" });
            obj.val = 0;
          });
      }
      break;

    case "page-fade":
      if (pageRef.value) {
        gsap.set(pageRef.value, { opacity: 0 });
        currentAnimation = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
        (currentAnimation as gsap.core.Timeline)
          .to(pageRef.value, { opacity: 1, duration: 1, ease: "power2.out" })
          .to(pageRef.value, { opacity: 0, duration: 0.5, delay: 1 });
      }
      break;

    case "page-slide":
      if (pageRef.value) {
        gsap.set(pageRef.value, { y: "100%" });
        currentAnimation = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
        (currentAnimation as gsap.core.Timeline)
          .to(pageRef.value, { y: 0, duration: 0.8, ease: "power3.out" })
          .to(pageRef.value, { y: "-100%", duration: 0.8, delay: 1, ease: "power3.in" });
      }
      break;

    case "page-curtain":
      if (curtainRef.value) {
        gsap.set(curtainRef.value, { scaleY: 1 });
        currentAnimation = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
        (currentAnimation as gsap.core.Timeline)
          .to(curtainRef.value, {
            scaleY: 0,
            transformOrigin: "top",
            duration: 0.8,
            ease: "power3.inOut",
            delay: 0.5,
          })
          .set(curtainRef.value, { scaleY: 1 });
      }
      break;

    case "page-circle":
      if (pageRef.value) {
        gsap.set(pageRef.value, { clipPath: "circle(0% at 50% 50%)" });
        currentAnimation = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
        (currentAnimation as gsap.core.Timeline)
          .to(pageRef.value, {
            clipPath: "circle(100% at 50% 50%)",
            duration: 1,
            ease: "power2.out",
          })
          .to(pageRef.value, {
            clipPath: "circle(0% at 50% 50%)",
            duration: 0.5,
            delay: 1,
            ease: "power2.in",
          });
      }
      break;

    case "page-diagonal":
      if (pageRef.value) {
        gsap.set(pageRef.value, { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" });
        currentAnimation = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
        (currentAnimation as gsap.core.Timeline)
          .to(pageRef.value, {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 0.8,
            ease: "power3.inOut",
          })
          .to(pageRef.value, {
            clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
            duration: 0.8,
            delay: 1,
            ease: "power3.inOut",
          });
      }
      break;

    case "lazy-reveal": {
      const validItems = itemRefs.value.filter(Boolean);
      if (validItems.length > 0) {
        gsap.set(validItems, { opacity: 0, y: 20 });
        currentAnimation = gsap.timeline({ repeat: -1, repeatDelay: 1 });
        (currentAnimation as gsap.core.Timeline)
          .to(validItems, { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" })
          .to(validItems, { opacity: 0, y: -20, duration: 0.3, stagger: 0.1, delay: 1 });
      }
      break;
    }

    case "placeholder": {
      const shimmers = shimmerRefs.value
        .filter(Boolean)
        .map((el) => el?.querySelector(".shimmer-gradient"));
      if (shimmers.length > 0) {
        currentAnimation = gsap.timeline({ repeat: -1 });
        (currentAnimation as gsap.core.Timeline).to(shimmers, {
          xPercent: 200,
          duration: 1.5,
          stagger: 0.1,
          ease: "power1.inOut",
        });
      }
      break;
    }

    case "image-lazy":
      if (imageRef.value) {
        gsap.set(imageRef.value, { filter: "blur(10px)", opacity: 0.5 });
        currentAnimation = gsap.timeline({ repeat: -1, repeatDelay: 1 });
        (currentAnimation as gsap.core.Timeline)
          .to(imageRef.value, { filter: "blur(0px)", opacity: 1, duration: 0.5, delay: 0.5 })
          .to(imageRef.value, { filter: "blur(10px)", opacity: 0.5, duration: 0.3, delay: 1 });
      }
      break;
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
  // Reset states
  progressText.value = 0;
  counterText.value = 0;
  if (barRef.value) gsap.set(barRef.value, { width: "0%" });
  if (spinnerRef.value) gsap.set(spinnerRef.value, { rotation: 0 });
  if (pulseRef.value) gsap.set(pulseRef.value, { scale: 1, opacity: 0.3 });
  if (logoRef.value) gsap.set(logoRef.value, { scale: 1 });
  if (pageRef.value) gsap.set(pageRef.value, { clearProps: "all" });
  if (curtainRef.value) gsap.set(curtainRef.value, { scaleY: 1 });
  if (imageRef.value) gsap.set(imageRef.value, { filter: "blur(10px)", opacity: 0.5 });
  const validItems = itemRefs.value.filter(Boolean);
  if (validItems.length > 0) gsap.set(validItems, { opacity: 0, y: 20 });
  const shimmers = shimmerRefs.value
    .filter(Boolean)
    .map((el) => el?.querySelector(".shimmer-gradient"));
  if (shimmers.length > 0) gsap.set(shimmers, { xPercent: -100 });

  nextTick(() => {
    startAnimation();
  });
};

onMounted(() => {
  setTimeout(() => {
    startAnimation();
  }, 300);
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
        class="absolute inset-0 opacity-10"
        style="
          background-image:
            linear-gradient(#2a2d2b 1px, transparent 1px),
            linear-gradient(90deg, #2a2d2b 1px, transparent 1px);
          background-size: 20px 20px;
        "
      />

      <!-- Spinner -->
      <div v-if="effect.id === 'spinner'" class="flex flex-col items-center gap-4">
        <div
          ref="spinnerRef"
          class="w-16 h-16 border-4 border-gsap-green/30 border-t-gsap-green rounded-full"
        />
        <span class="text-gsap-text-primary text-lg">Жүктелуде...</span>
      </div>

      <!-- Progress Bar -->
      <div v-else-if="effect.id === 'progress-bar'" class="w-64">
        <div class="h-3 bg-gsap-bg-secondary rounded-full overflow-hidden">
          <div ref="barRef" class="h-full bg-gsap-green rounded-full" style="width: 0%" />
        </div>
        <p class="mt-3 text-center text-gsap-text-primary text-lg font-mono">{{ progressText }}%</p>
      </div>

      <!-- Skeleton -->
      <div v-else-if="effect.id === 'skeleton'" class="space-y-4 w-64">
        <div
          :ref="(el) => (skeletonRefs[0] = el as HTMLElement)"
          class="h-4 bg-gsap-bg-secondary rounded"
        />
        <div
          :ref="(el) => (skeletonRefs[1] = el as HTMLElement)"
          class="h-4 bg-gsap-bg-secondary rounded w-3/4"
        />
        <div
          :ref="(el) => (skeletonRefs[2] = el as HTMLElement)"
          class="h-4 bg-gsap-bg-secondary rounded w-1/2"
        />
      </div>

      <!-- Dots Loading -->
      <div v-else-if="effect.id === 'dots-loading'" class="flex items-center gap-3">
        <div
          v-for="i in 3"
          :key="i"
          :ref="(el) => (dotRefs[i - 1] = el as HTMLElement)"
          class="w-4 h-4 bg-gsap-green rounded-full"
        />
      </div>

      <!-- Pulse Loading -->
      <div
        v-else-if="effect.id === 'pulse-loading'"
        class="relative flex items-center justify-center"
      >
        <div ref="pulseRef" class="absolute w-16 h-16 bg-gsap-green/30 rounded-full" />
        <div class="w-8 h-8 bg-gsap-green rounded-full" />
      </div>

      <!-- Logo Loader -->
      <div v-else-if="effect.id === 'logo-loader'" class="flex flex-col items-center gap-4">
        <div ref="logoRef" class="text-5xl font-bold text-gsap-green">GSAP</div>
        <span class="text-gsap-text-muted text-sm">Жүктелуде...</span>
      </div>

      <!-- Dots Bounce -->
      <div v-else-if="effect.id === 'dots-bounce'" class="flex items-center gap-3">
        <div
          v-for="i in 3"
          :key="i"
          :ref="(el) => (dotRefs[i - 1] = el as HTMLElement)"
          class="w-5 h-5 bg-gsap-green rounded-full"
        />
      </div>

      <!-- Counter Loader -->
      <div v-else-if="effect.id === 'counter-loader'" class="flex flex-col items-center gap-4">
        <div class="text-6xl font-bold text-gsap-green tabular-nums">{{ counterText }}%</div>
        <div class="w-48 h-1 bg-gsap-bg-secondary rounded-full overflow-hidden">
          <div ref="barRef" class="h-full bg-gsap-green" style="width: 0%" />
        </div>
      </div>

      <!-- Page Fade -->
      <div
        v-else-if="effect.id === 'page-fade'"
        ref="pageRef"
        class="w-64 h-40 bg-gsap-bg-secondary rounded-xl flex items-center justify-center"
        style="opacity: 0"
      >
        <span class="text-gsap-text-primary">Контент жүктелді</span>
      </div>

      <!-- Page Slide -->
      <div v-else-if="effect.id === 'page-slide'" class="overflow-hidden rounded-xl">
        <div
          ref="pageRef"
          class="w-64 h-40 bg-gsap-bg-secondary flex items-center justify-center"
          style="transform: translateY(100%)"
        >
          <span class="text-gsap-text-primary">Контент жүктелді</span>
        </div>
      </div>

      <!-- Page Curtain -->
      <div
        v-else-if="effect.id === 'page-curtain'"
        class="relative w-64 h-40 rounded-xl overflow-hidden"
      >
        <div class="absolute inset-0 bg-gsap-bg-secondary flex items-center justify-center">
          <span class="text-gsap-text-primary">Контент жүктелді</span>
        </div>
        <div ref="curtainRef" class="absolute inset-0 bg-gsap-green" />
      </div>

      <!-- Page Circle -->
      <div
        v-else-if="effect.id === 'page-circle'"
        ref="pageRef"
        class="w-64 h-40 bg-gsap-bg-secondary rounded-xl flex items-center justify-center"
        style="clip-path: circle(0% at 50% 50%)"
      >
        <span class="text-gsap-text-primary">Контент жүктелді</span>
      </div>

      <!-- Page Diagonal -->
      <div
        v-else-if="effect.id === 'page-diagonal'"
        ref="pageRef"
        class="w-64 h-40 bg-gsap-bg-secondary rounded-xl flex items-center justify-center"
        style="clip-path: polygon(0 0, 0 0, 0 100%, 0 100%)"
      >
        <span class="text-gsap-text-primary">Контент жүктелді</span>
      </div>

      <!-- Lazy Reveal -->
      <div v-else-if="effect.id === 'lazy-reveal'" class="space-y-4">
        <div
          v-for="i in 3"
          :key="i"
          :ref="(el) => (itemRefs[i - 1] = el as HTMLElement)"
          class="w-64 h-14 bg-gsap-bg-secondary rounded-lg flex items-center justify-center"
          style="opacity: 0; transform: translateY(20px)"
        >
          <span class="text-gsap-text-primary">Элемент {{ i }}</span>
        </div>
      </div>

      <!-- Placeholder Shimmer -->
      <div v-else-if="effect.id === 'placeholder'" class="w-64 space-y-3">
        <div
          :ref="(el) => (shimmerRefs[0] = el as HTMLElement)"
          class="h-8 bg-gsap-bg-secondary rounded overflow-hidden relative"
        >
          <div
            class="shimmer-gradient absolute inset-0 bg-gradient-to-r from-transparent via-gsap-text-muted/20 to-transparent -translate-x-full"
          />
        </div>
        <div
          :ref="(el) => (shimmerRefs[1] = el as HTMLElement)"
          class="h-4 bg-gsap-bg-secondary rounded w-3/4 overflow-hidden relative"
        >
          <div
            class="shimmer-gradient absolute inset-0 bg-gradient-to-r from-transparent via-gsap-text-muted/20 to-transparent -translate-x-full"
          />
        </div>
      </div>

      <!-- Image Lazy Load -->
      <div
        v-else-if="effect.id === 'image-lazy'"
        ref="imageRef"
        class="w-64 h-40 bg-gsap-bg-secondary rounded-xl flex items-center justify-center"
        style="filter: blur(10px); opacity: 0.5"
      >
        <span class="text-4xl">🖼️</span>
      </div>

      <!-- Restart Button -->
      <button
        type="button"
        class="mt-8 flex items-center gap-2 px-4 py-2 rounded-lg bg-gsap-bg-secondary border border-gsap-border text-gsap-text-primary hover:border-gsap-green/50 transition-colors"
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

    <!-- Code Tabs -->
    <EffectsCodeTabs :code="effect.code" />
  </div>
</template>

<style scoped>
.space-y-4 > * + * {
  margin-top: 1rem;
}
</style>
