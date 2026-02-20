<script setup lang="ts">
import type { LearningLevel } from "~/data/learning-path";
import { levelInfo } from "~/data/learning-path";

const props = defineProps<{
  level: LearningLevel;
  completed: number;
  total: number;
}>();

const info = computed(() => levelInfo[props.level]);
const percentage = computed(() => Math.round((props.completed / props.total) * 100));
const isLevelComplete = computed(() => props.completed === props.total);

const headerRef = ref<HTMLElement | null>(null);

onMounted(async () => {
  if (!headerRef.value) return;

  const { gsap } = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(headerRef.value, {
    opacity: 0,
    y: -20,
    scale: 0.95,
    duration: 0.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: headerRef.value,
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
  });
});
</script>

<template>
  <div
    ref="headerRef"
    :class="[
      'sticky top-28 z-30 flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl mb-6 sm:mb-8 backdrop-blur-md transition-all duration-300',
      info.bgColor,
      'border',
      isLevelComplete ? 'border-gsap-green/50' : info.borderColor,
    ]"
  >
    <!-- Level Icon -->
    <div
      :class="[
        'w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-2xl sm:text-3xl transition-transform duration-300',
        isLevelComplete ? 'scale-110' : '',
      ]"
    >
      <span v-if="isLevelComplete" class="animate-bounce">{{ info.icon }}</span>
      <span v-else>{{ info.icon }}</span>
    </div>

    <!-- Level Info -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2">
        <h2 :class="['text-lg sm:text-xl font-bold truncate', info.color]">
          {{ info.nameKz }}
        </h2>
        <span
          v-if="isLevelComplete"
          class="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-gsap-green/20 text-gsap-green"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Аяқталды
        </span>
      </div>
      <div class="flex items-center gap-2 mt-1">
        <div
          class="flex-1 h-1.5 bg-gsap-bg-tertiary rounded-full overflow-hidden max-w-[120px] sm:max-w-[180px]"
        >
          <div
            :class="[
              'h-full rounded-full transition-all duration-500',
              isLevelComplete ? 'bg-gsap-green' : 'bg-gradient-to-r',
              level === 'beginner' && 'from-emerald-500 to-emerald-400',
              level === 'intermediate' && 'from-yellow-500 to-yellow-400',
              level === 'advanced' && 'from-red-500 to-red-400',
              level === 'guru' && 'from-amber-500 to-amber-400',
            ]"
            :style="{ width: `${percentage}%` }"
          />
        </div>
        <span class="text-xs sm:text-sm text-gsap-text-secondary whitespace-nowrap">
          {{ completed }}/{{ total }}
        </span>
      </div>
    </div>

    <!-- Percentage Circle -->
    <div class="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0">
      <!-- Background circle -->
      <svg class="w-full h-full -rotate-90" viewBox="0 0 36 36">
        <circle
          cx="18"
          cy="18"
          r="15"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          class="text-gsap-bg-tertiary"
        />
        <circle
          cx="18"
          cy="18"
          r="15"
          fill="none"
          :stroke="isLevelComplete ? '#0ae448' : 'currentColor'"
          stroke-width="3"
          stroke-linecap="round"
          :stroke-dasharray="`${percentage * 0.94} 100`"
          :class="[info.color, 'transition-all duration-500']"
        />
      </svg>
      <!-- Percentage text -->
      <span
        :class="[
          'absolute inset-0 flex items-center justify-center text-[10px] sm:text-xs font-bold',
          isLevelComplete ? 'text-gsap-green' : info.color,
        ]"
      >
        {{ percentage }}%
      </span>
    </div>
  </div>
</template>
