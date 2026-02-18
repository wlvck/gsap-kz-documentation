<script setup lang="ts">
import { gsap } from "gsap";

interface Props {
  ease?: string;
  showControls?: boolean;
  showComparison?: boolean;
  height?: number;
}

const props = withDefaults(defineProps<Props>(), {
  ease: "power2.out",
  showControls: true,
  showComparison: false,
  height: 200,
});

const easingCategories = {
  Power: [
    "none",
    "power1.in",
    "power1.out",
    "power1.inOut",
    "power2.in",
    "power2.out",
    "power2.inOut",
    "power3.in",
    "power3.out",
    "power3.inOut",
    "power4.in",
    "power4.out",
    "power4.inOut",
  ],
  "Back / Bounce / Elastic": [
    "back.in",
    "back.out",
    "back.inOut",
    "bounce.in",
    "bounce.out",
    "bounce.inOut",
    "elastic.in",
    "elastic.out",
    "elastic.inOut",
  ],
  "Circ / Expo / Sine": [
    "circ.in",
    "circ.out",
    "circ.inOut",
    "expo.in",
    "expo.out",
    "expo.inOut",
    "sine.in",
    "sine.out",
    "sine.inOut",
  ],
  Steps: ["steps(4)", "steps(8)", "steps(12)"],
};

const selectedEase = ref(props.ease);
const comparisonEase = ref("power1.out");
const isPlaying = ref(false);
const progress = ref(0);
const dotRef = ref<HTMLElement | null>(null);
const comparisonDotRef = ref<HTMLElement | null>(null);

const svgWidth = 280;
const svgHeight = computed(() => props.height);
const padding = 20;
const graphWidth = svgWidth - padding * 2;
const graphHeight = computed(() => svgHeight.value - padding * 2);

// Calculate easing curve path
const getEasePath = (easeName: string): string => {
  let easeFunc: (p: number) => number;

  try {
    easeFunc = gsap.parseEase(easeName);
  } catch {
    easeFunc = (p: number) => p;
  }

  if (!easeFunc) {
    easeFunc = (p: number) => p;
  }

  const points: string[] = [];
  const steps = 100;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const value = easeFunc(t);

    const x = padding + t * graphWidth;
    const y = padding + graphHeight.value - value * graphHeight.value;

    if (i === 0) {
      points.push(`M ${x} ${y}`);
    } else {
      points.push(`L ${x} ${y}`);
    }
  }

  return points.join(" ");
};

const mainPath = computed(() => getEasePath(selectedEase.value));
const comparisonPath = computed(() => getEasePath(comparisonEase.value));

// Animation progress indicator position
const indicatorPosition = computed(() => {
  let easeFunc: (p: number) => number;

  try {
    easeFunc = gsap.parseEase(selectedEase.value);
  } catch {
    easeFunc = (p: number) => p;
  }

  if (!easeFunc) {
    easeFunc = (p: number) => p;
  }

  const value = easeFunc(progress.value);

  return {
    x: padding + progress.value * graphWidth,
    y: padding + graphHeight.value - value * graphHeight.value,
  };
});

const comparisonIndicatorPosition = computed(() => {
  let easeFunc: (p: number) => number;

  try {
    easeFunc = gsap.parseEase(comparisonEase.value);
  } catch {
    easeFunc = (p: number) => p;
  }

  if (!easeFunc) {
    easeFunc = (p: number) => p;
  }

  const value = easeFunc(progress.value);

  return {
    x: padding + progress.value * graphWidth,
    y: padding + graphHeight.value - value * graphHeight.value,
  };
});

// Play animation
const playAnimation = () => {
  if (isPlaying.value) return;

  isPlaying.value = true;
  progress.value = 0;

  // Animate the progress
  gsap.to(progress, {
    value: 1,
    duration: 1.5,
    ease: "none",
    onComplete: () => {
      isPlaying.value = false;
    },
  });

  // Animate the dots
  if (dotRef.value) {
    gsap.fromTo(
      dotRef.value,
      { x: 0 },
      {
        x: graphWidth,
        duration: 1.5,
        ease: selectedEase.value,
      }
    );
  }

  if (props.showComparison && comparisonDotRef.value) {
    gsap.fromTo(
      comparisonDotRef.value,
      { x: 0 },
      {
        x: graphWidth,
        duration: 1.5,
        ease: comparisonEase.value,
      }
    );
  }
};

// Reset animation
const resetAnimation = () => {
  isPlaying.value = false;
  progress.value = 0;
  gsap.killTweensOf(progress);

  if (dotRef.value) {
    gsap.killTweensOf(dotRef.value);
    gsap.set(dotRef.value, { x: 0 });
  }

  if (comparisonDotRef.value) {
    gsap.killTweensOf(comparisonDotRef.value);
    gsap.set(comparisonDotRef.value, { x: 0 });
  }
};

// Watch for ease changes
watch(selectedEase, resetAnimation);
watch(comparisonEase, resetAnimation);
</script>

<template>
  <div class="easing-visualizer my-6 rounded-xl border border-gsap-border bg-gsap-bg-secondary p-4">
    <!-- Controls -->
    <div v-if="showControls" class="mb-4 flex flex-wrap items-center gap-3">
      <div class="flex-1 min-w-[200px]">
        <label class="block text-xs text-gsap-text-secondary mb-1">Ease таңдау</label>
        <select
          v-model="selectedEase"
          class="w-full rounded-lg border border-gsap-border bg-gsap-bg-tertiary px-3 py-2 text-sm text-gsap-text-primary focus:border-gsap-green focus:outline-none"
        >
          <optgroup v-for="(eases, category) in easingCategories" :key="category" :label="category">
            <option v-for="e in eases" :key="e" :value="e">
              {{ e }}
            </option>
          </optgroup>
        </select>
      </div>

      <div v-if="showComparison" class="flex-1 min-w-[200px]">
        <label class="block text-xs text-gsap-text-secondary mb-1">Салыстыру</label>
        <select
          v-model="comparisonEase"
          class="w-full rounded-lg border border-gsap-border bg-gsap-bg-tertiary px-3 py-2 text-sm text-gsap-text-primary focus:border-gsap-green focus:outline-none"
        >
          <optgroup v-for="(eases, category) in easingCategories" :key="category" :label="category">
            <option v-for="e in eases" :key="e" :value="e">
              {{ e }}
            </option>
          </optgroup>
        </select>
      </div>

      <div class="flex gap-2 self-end">
        <button
          class="rounded-lg bg-gsap-green px-4 py-2 text-sm font-medium text-gsap-bg-primary transition-colors hover:bg-gsap-green-dark disabled:opacity-50"
          :disabled="isPlaying"
          @click="playAnimation"
        >
          {{ isPlaying ? "Ойнатылуда..." : "Ойнату" }}
        </button>
        <button
          class="rounded-lg border border-gsap-border bg-gsap-bg-tertiary px-4 py-2 text-sm font-medium text-gsap-text-primary transition-colors hover:border-gsap-green"
          @click="resetAnimation"
        >
          Қайтару
        </button>
      </div>
    </div>

    <!-- Graph -->
    <div class="relative rounded-lg bg-gsap-bg-primary p-2">
      <svg
        :width="svgWidth"
        :height="svgHeight"
        class="w-full"
        :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
      >
        <!-- Grid -->
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="currentColor"
              stroke-width="0.5"
              class="text-gsap-border"
            />
          </pattern>
        </defs>
        <rect
          :x="padding"
          :y="padding"
          :width="graphWidth"
          :height="graphHeight"
          fill="url(#grid)"
        />

        <!-- Axes -->
        <line
          :x1="padding"
          :y1="padding + graphHeight"
          :x2="padding + graphWidth"
          :y2="padding + graphHeight"
          stroke="currentColor"
          stroke-width="1"
          class="text-gsap-text-secondary"
        />
        <line
          :x1="padding"
          :y1="padding"
          :x2="padding"
          :y2="padding + graphHeight"
          stroke="currentColor"
          stroke-width="1"
          class="text-gsap-text-secondary"
        />

        <!-- Axis labels -->
        <text
          :x="padding - 5"
          :y="padding + 4"
          text-anchor="end"
          class="fill-gsap-text-secondary text-[10px]"
        >
          1
        </text>
        <text
          :x="padding - 5"
          :y="padding + graphHeight"
          text-anchor="end"
          class="fill-gsap-text-secondary text-[10px]"
        >
          0
        </text>
        <text
          :x="padding"
          :y="padding + graphHeight + 12"
          text-anchor="start"
          class="fill-gsap-text-secondary text-[10px]"
        >
          0
        </text>
        <text
          :x="padding + graphWidth"
          :y="padding + graphHeight + 12"
          text-anchor="end"
          class="fill-gsap-text-secondary text-[10px]"
        >
          1
        </text>

        <!-- Linear reference line -->
        <line
          :x1="padding"
          :y1="padding + graphHeight"
          :x2="padding + graphWidth"
          :y2="padding"
          stroke="currentColor"
          stroke-width="1"
          stroke-dasharray="4 4"
          class="text-gsap-text-secondary opacity-30"
        />

        <!-- Comparison curve -->
        <path
          v-if="showComparison"
          :d="comparisonPath"
          fill="none"
          stroke="#3b82f6"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <!-- Main curve -->
        <path
          :d="mainPath"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-gsap-green"
        />

        <!-- Progress indicators -->
        <circle
          v-if="isPlaying || progress > 0"
          :cx="indicatorPosition.x"
          :cy="indicatorPosition.y"
          r="6"
          fill="currentColor"
          class="text-gsap-green"
        />

        <circle
          v-if="showComparison && (isPlaying || progress > 0)"
          :cx="comparisonIndicatorPosition.x"
          :cy="comparisonIndicatorPosition.y"
          r="6"
          fill="#3b82f6"
        />
      </svg>

      <!-- Legend -->
      <div class="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs">
        <div class="flex items-center gap-2">
          <span class="inline-block h-0.5 w-4 bg-gsap-green"></span>
          <span class="text-gsap-text-secondary">{{ selectedEase }}</span>
        </div>
        <div v-if="showComparison" class="flex items-center gap-2">
          <span class="inline-block h-0.5 w-4 bg-blue-500"></span>
          <span class="text-gsap-text-secondary">{{ comparisonEase }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span
            class="inline-block h-0.5 w-4 border-t border-dashed border-gsap-text-secondary opacity-30"
          ></span>
          <span class="text-gsap-text-secondary opacity-50">linear</span>
        </div>
      </div>
    </div>

    <!-- Animation Preview -->
    <div class="mt-4 rounded-lg bg-gsap-bg-tertiary p-4">
      <p class="mb-3 text-xs text-gsap-text-secondary">Анимация preview</p>
      <div class="relative h-8">
        <div class="absolute inset-0 flex items-center">
          <div class="h-0.5 w-full bg-gsap-border"></div>
        </div>
        <div
          ref="dotRef"
          class="absolute left-0 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-gsap-green shadow-lg shadow-gsap-green/30"
        ></div>
        <div
          v-if="showComparison"
          ref="comparisonDotRef"
          class="absolute left-0 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/30"
        ></div>
      </div>
    </div>

    <!-- No Controls Mode - Just show the ease name -->
    <div v-if="!showControls" class="mt-2 text-center">
      <code class="rounded bg-gsap-bg-tertiary px-2 py-1 text-sm text-gsap-green">{{ ease }}</code>
    </div>
  </div>
</template>

<style scoped>
.easing-visualizer {
  max-width: 100%;
  overflow: hidden;
}

svg {
  max-width: 100%;
  height: auto;
}
</style>
