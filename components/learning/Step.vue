<script setup lang="ts">
import type { LearningStep } from "~/data/learning-path";
import { levelInfo } from "~/data/learning-path";

const props = defineProps<{
  step: LearningStep;
  stepNumber: number;
  isCompleted: boolean;
  isLeft: boolean;
}>();

const emit = defineEmits<{
  toggle: [stepId: string];
}>();

const cardRef = ref<HTMLElement | null>(null);

// GSAP animation on mount
onMounted(async () => {
  if (!cardRef.value) return;

  const { gsap } = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(cardRef.value, {
    opacity: 0,
    x: props.isLeft ? -80 : 80,
    y: 30,
    duration: 0.7,
    ease: "power3.out",
    scrollTrigger: {
      trigger: cardRef.value,
      start: "top 88%",
      toggleActions: "play none none reverse",
    },
  });
});

const level = computed(() => props.step.level);
const info = computed(() => levelInfo[level.value]);
</script>

<template>
  <div
    :id="`step-${step.id}`"
    ref="cardRef"
    :class="[
      'relative p-5 md:p-6 rounded-2xl border transition-all duration-300 group',
      isCompleted
        ? 'bg-gsap-green/5 border-gsap-green/30 hover:border-gsap-green/50'
        : 'bg-gsap-bg-secondary border-gsap-border hover:border-gsap-green/30',
      // Position alternating on desktop
      'md:w-[calc(50%-60px)]',
      isLeft ? 'md:mr-auto' : 'md:ml-auto',
    ]"
  >
    <!-- Connecting line + dot to center path (desktop) -->
    <div
      :class="[
        'hidden lg:flex items-center absolute top-1/2 -translate-y-1/2',
        isLeft ? '-right-[60px] flex-row' : '-left-[60px] flex-row-reverse',
      ]"
    >
      <!-- Horizontal line -->
      <div :class="['w-[44px] h-0.5', isCompleted ? 'bg-gsap-green/50' : 'bg-gsap-border']" />
      <!-- Center dot -->
      <div
        :class="[
          'w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300',
          isCompleted
            ? 'bg-gsap-green border-gsap-green shadow-[0_0_12px_rgba(10,228,72,0.5)]'
            : `bg-gsap-bg-primary ${info.borderColor}`,
        ]"
      >
        <div :class="['w-2 h-2 rounded-full', isCompleted ? 'bg-gsap-bg-primary' : info.bgColor]" />
      </div>
    </div>

    <!-- Step Number Badge -->
    <div
      :class="[
        'absolute -top-4 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-4 border-gsap-bg-primary z-10 transition-all duration-300',
        isCompleted ? 'bg-gsap-green text-gsap-bg-primary' : `${info.bgColor} ${info.color}`,
        isLeft ? 'left-4 md:-right-5 md:left-auto' : 'left-4 md:-left-5',
      ]"
    >
      <svg v-if="isCompleted" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
      </svg>
      <span v-else>{{ stepNumber }}</span>
    </div>

    <div class="flex flex-col sm:flex-row sm:items-start gap-4">
      <!-- Icon -->
      <div
        :class="[
          'w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-transform duration-300 group-hover:scale-110',
          info.bgColor,
        ]"
      >
        {{ step.icon }}
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <h3 class="text-base sm:text-lg font-semibold text-gsap-text-primary truncate">
              {{ step.titleKz }}
            </h3>
            <p class="text-sm text-gsap-text-secondary mt-1 line-clamp-2">
              {{ step.descriptionKz }}
            </p>
          </div>

          <!-- Completion Checkbox -->
          <button
            :class="[
              'shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg border-2 flex items-center justify-center transition-all duration-200',
              isCompleted
                ? 'bg-gsap-green border-gsap-green text-gsap-bg-primary scale-100'
                : 'border-gsap-border hover:border-gsap-green/50 hover:scale-105',
            ]"
            :title="isCompleted ? 'Аяқталмаған деп белгілеу' : 'Аяқталды деп белгілеу'"
            @click="emit('toggle', step.id)"
          >
            <svg
              v-if="isCompleted"
              class="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
        </div>

        <!-- Topics -->
        <div class="flex flex-wrap gap-1.5 sm:gap-2 mt-3">
          <span
            v-for="topic in step.topics"
            :key="topic"
            class="px-2 py-0.5 text-[10px] sm:text-xs rounded-md bg-gsap-bg-tertiary text-gsap-text-secondary"
          >
            {{ topic }}
          </span>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between mt-4 pt-3 border-t border-gsap-border">
          <span class="text-xs sm:text-sm text-gsap-text-muted flex items-center gap-1">
            <svg
              class="w-3.5 h-3.5 sm:w-4 sm:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {{ step.estimatedTime }}
          </span>

          <NuxtLink
            :to="step.docsLink"
            :class="[
              'inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200',
              isCompleted
                ? 'bg-gsap-bg-tertiary text-gsap-text-secondary hover:text-gsap-text-primary hover:bg-gsap-bg-tertiary/80'
                : 'bg-gsap-green/10 text-gsap-green hover:bg-gsap-green/20 hover:scale-[1.02]',
            ]"
          >
            {{ isCompleted ? "Қайта оқу" : "Оқуға өту" }}
            <svg
              class="w-3.5 h-3.5 sm:w-4 sm:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
