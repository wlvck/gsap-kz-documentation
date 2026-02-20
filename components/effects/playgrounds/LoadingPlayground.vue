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
  if (barRef.value) gsap.set(barRef.value, { width: "0%" });
  if (spinnerRef.value) gsap.set(spinnerRef.value, { rotation: 0 });
  if (pulseRef.value) gsap.set(pulseRef.value, { scale: 1, opacity: 0.3 });

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
