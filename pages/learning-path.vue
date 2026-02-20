<script setup lang="ts">
import { learningSteps, levels, getStepsByLevel, getLevelProgress } from "~/data/learning-path";

// SEO
useSeoMeta({
  title: "Learning Path | GSAP Қазақша",
  description:
    "GSAP анимация кітапханасын үйренудің интерактивті жол картасы - Бастаушыдан Гуруға дейін",
  ogTitle: "Learning Path | GSAP Қазақша",
  ogDescription: "GSAP анимация кітапханасын үйренудің интерактивті жол картасы",
});

// Completed steps from localStorage
const completedSteps = ref<string[]>([]);

// Load from localStorage on mount
onMounted(() => {
  const saved = localStorage.getItem("gsap-learning-progress");
  if (saved) {
    try {
      completedSteps.value = JSON.parse(saved);
    } catch {
      completedSteps.value = [];
    }
  }
});

// Toggle step completion
const toggleStep = (stepId: string) => {
  const index = completedSteps.value.indexOf(stepId);
  if (index === -1) {
    completedSteps.value.push(stepId);
  } else {
    completedSteps.value.splice(index, 1);
  }
  localStorage.setItem("gsap-learning-progress", JSON.stringify(completedSteps.value));
};

// Check if step is completed
const isCompleted = (stepId: string) => completedSteps.value.includes(stepId);

// Overall progress
const overallProgress = computed(() => {
  const total = learningSteps.length;
  const completed = completedSteps.value.length;
  return {
    completed,
    total,
    percentage: Math.round((completed / total) * 100),
  };
});

// Get step number
const getStepNumber = (stepId: string) => {
  return learningSteps.findIndex((s) => s.id === stepId) + 1;
};

// Find first incomplete step
const findNextStep = () => {
  const next = learningSteps.find((step) => !completedSteps.value.includes(step.id));
  if (next) {
    const element = document.getElementById(`step-${next.id}`);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

// Refs for animations
const headerRef = ref<HTMLElement | null>(null);
const finaleRef = ref<HTMLElement | null>(null);
const trophyRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const subtitleRef = ref<HTMLElement | null>(null);
const statsRef = ref<HTMLElement | null>(null);
const ctaRef = ref<HTMLElement | null>(null);
const sparklesRef = ref<HTMLElement | null>(null);

// Track if finale animation has played
const finaleAnimated = ref(false);

onMounted(async () => {
  const { gsap } = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);

  // Header animation
  if (headerRef.value) {
    gsap.from(headerRef.value.children, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });
  }

  // Шебер Finale animation
  if (finaleRef.value) {
    ScrollTrigger.create({
      trigger: finaleRef.value,
      start: "top 80%",
      onEnter: () => {
        if (finaleAnimated.value) return;
        finaleAnimated.value = true;

        const tl = gsap.timeline();

        // Trophy appears with bounce and rotation
        if (trophyRef.value) {
          tl.fromTo(
            trophyRef.value,
            { scale: 0, rotation: -180, opacity: 0 },
            { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
          );
        }

        // Sparkles animate
        if (sparklesRef.value) {
          const sparkles = sparklesRef.value.querySelectorAll(".sparkle");
          tl.fromTo(
            sparkles,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: "back.out(2)" },
            "-=0.4"
          );
        }

        // Title fades in
        if (titleRef.value) {
          tl.fromTo(
            titleRef.value,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.3"
          );
        }

        // Subtitle
        if (subtitleRef.value) {
          tl.fromTo(
            subtitleRef.value,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.3"
          );
        }

        // Stats with stagger
        if (statsRef.value) {
          tl.fromTo(
            statsRef.value.children,
            { opacity: 0, y: 20, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1, ease: "back.out(1.5)" },
            "-=0.2"
          );
        }

        // CTA buttons
        if (ctaRef.value) {
          tl.fromTo(
            ctaRef.value,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.2"
          );
        }
      },
      once: true,
    });
  }
});
</script>

<template>
  <div class="min-h-screen bg-gsap-bg-primary">
    <AppHeader />

    <!-- Progress Bar (Fixed) -->
    <div
      class="fixed top-16 left-0 right-0 z-40 bg-gsap-bg-primary/90 backdrop-blur-sm border-b border-gsap-border"
    >
      <div class="max-w-5xl mx-auto px-4 py-3">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-gsap-text-secondary">
            Жалпы прогресс: {{ overallProgress.completed }}/{{ overallProgress.total }}
          </span>
          <span class="text-sm font-semibold text-gsap-green"
            >{{ overallProgress.percentage }}%</span
          >
        </div>
        <div class="h-2 bg-gsap-bg-tertiary rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-emerald-500 via-yellow-500 via-red-500 to-amber-500 rounded-full transition-all duration-500"
            :style="{ width: `${overallProgress.percentage}%` }"
          />
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="pt-32 pb-20 relative">
      <div class="max-w-5xl mx-auto px-4">
        <!-- Header -->
        <div ref="headerRef" class="text-center mb-12 sm:mb-16">
          <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gsap-green/10 text-gsap-green text-sm font-medium mb-4"
          >
            <span class="w-2 h-2 rounded-full bg-gsap-green animate-pulse" />
            Интерактивті оқу жолы
          </div>

          <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gsap-text-primary mb-4">
            GSAP Learning Path
          </h1>

          <p class="text-lg sm:text-xl text-gsap-text-secondary max-w-2xl mx-auto">
            Бастаушыдан гуруға дейін — 26 қадамда GSAP анимацияларын меңгеріңіз
          </p>

          <!-- Continue Button -->
          <button
            v-if="
              overallProgress.completed > 0 && overallProgress.completed < overallProgress.total
            "
            class="mt-6 px-6 py-3 bg-gsap-green text-gsap-bg-primary font-semibold rounded-xl hover:bg-gsap-green/90 transition-all duration-200 hover:scale-105 inline-flex items-center gap-2"
            @click="findNextStep"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            Жалғастыру
          </button>
        </div>

        <!-- Learning Path Container -->
        <div class="relative">
          <!-- SVG Path (Desktop only) -->
          <LearningPathSVG
            v-if="completedSteps !== undefined"
            :completed-steps="completedSteps"
            class="hidden lg:block"
          />

          <!-- Levels -->
          <div class="relative space-y-10 sm:space-y-12">
            <div v-for="level in levels" :key="level" class="relative">
              <!-- Level Header -->
              <LearningLevelHeader
                :level="level"
                :completed="getLevelProgress(level, completedSteps).completed"
                :total="getLevelProgress(level, completedSteps).total"
              />

              <!-- Steps Grid -->
              <div class="space-y-8 lg:space-y-10">
                <LearningStep
                  v-for="(step, stepIndex) in getStepsByLevel(level)"
                  :key="step.id"
                  :step="step"
                  :step-number="getStepNumber(step.id)"
                  :is-completed="isCompleted(step.id)"
                  :is-left="stepIndex % 2 === 0"
                  @toggle="toggleStep"
                />
              </div>
            </div>
          </div>

          <!-- Шебер Finale Section -->
          <div
            ref="finaleRef"
            class="sheber-finale relative py-16 sm:py-20 mt-16 sm:mt-20 border-t border-gsap-border"
          >
            <!-- Background decorations -->
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-amber-500/5 via-transparent to-transparent rounded-full"
              />
              <div class="absolute top-0 left-0 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl" />
              <div
                class="absolute bottom-0 right-0 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl"
              />
            </div>

            <div class="relative flex flex-col items-center">
              <!-- Trophy with glow and sparkles -->
              <div
                ref="trophyRef"
                class="relative w-28 h-28 sm:w-32 sm:h-32 mb-6 sm:mb-8"
                style="opacity: 0"
              >
                <!-- Glow effect behind trophy -->
                <div
                  class="absolute inset-0 bg-gradient-to-br from-yellow-500/40 to-amber-500/40 rounded-full blur-2xl animate-pulse-slow"
                />

                <!-- Trophy emoji -->
                <div
                  class="relative text-7xl sm:text-8xl text-center leading-none flex items-center justify-center h-full"
                >
                  🏆
                </div>

                <!-- Sparkles around trophy -->
                <div ref="sparklesRef" class="absolute inset-0">
                  <span class="sparkle absolute -top-2 left-1/2 -translate-x-1/2 text-2xl">✨</span>
                  <span class="sparkle absolute top-1/4 -right-4 text-xl">⭐</span>
                  <span class="sparkle absolute top-1/4 -left-4 text-xl">⭐</span>
                  <span class="sparkle absolute bottom-0 left-1/4 text-lg">✨</span>
                  <span class="sparkle absolute bottom-0 right-1/4 text-lg">✨</span>
                  <span class="sparkle absolute -top-4 right-1/4 text-sm">💫</span>
                  <span class="sparkle absolute -top-4 left-1/4 text-sm">💫</span>
                </div>
              </div>

              <!-- Congratulations title -->
              <h2
                ref="titleRef"
                class="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4"
                style="opacity: 0"
              >
                <span class="text-gradient-gold">GSAP Шебері</span>
                <span class="text-gsap-text-primary"> деңгейіне жеттіңіз!</span>
              </h2>

              <!-- Subtitle -->
              <p
                ref="subtitleRef"
                class="text-gsap-text-secondary text-center max-w-md px-4 mb-8 sm:mb-10"
                style="opacity: 0"
              >
                Сіз GSAP анимация кітапханасын толықтай меңгердіңіз. Енді кез-келген веб-анимацияны
                жасай аласыз!
              </p>

              <!-- Stats -->
              <div ref="statsRef" class="flex gap-6 sm:gap-10 mb-10 sm:mb-12" style="opacity: 0">
                <div class="text-center">
                  <div class="text-3xl sm:text-4xl font-bold text-gsap-green">26</div>
                  <div class="text-xs sm:text-sm text-gsap-text-muted mt-1">Тақырып</div>
                </div>
                <div class="w-px bg-gsap-border" />
                <div class="text-center">
                  <div class="text-3xl sm:text-4xl font-bold text-yellow-500">4</div>
                  <div class="text-xs sm:text-sm text-gsap-text-muted mt-1">Деңгей</div>
                </div>
                <div class="w-px bg-gsap-border" />
                <div class="text-center">
                  <div class="text-3xl sm:text-4xl font-bold text-red-400">15+</div>
                  <div class="text-xs sm:text-sm text-gsap-text-muted mt-1">Сағат</div>
                </div>
              </div>

              <!-- CTA Buttons -->
              <div ref="ctaRef" class="flex flex-col sm:flex-row gap-3 sm:gap-4" style="opacity: 0">
                <NuxtLink
                  to="/effects"
                  class="px-6 py-3 bg-gsap-green text-gsap-bg-primary font-semibold rounded-xl hover:bg-gsap-green/90 transition-all duration-200 hover:scale-105 inline-flex items-center justify-center gap-2"
                >
                  Эффекттерді көру
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </NuxtLink>
                <NuxtLink
                  to="/showcases"
                  class="px-6 py-3 border border-gsap-border text-gsap-text-primary font-semibold rounded-xl hover:border-gsap-green/50 hover:bg-gsap-green/5 transition-all duration-200 inline-flex items-center justify-center gap-2"
                >
                  Showcases қарау
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </NuxtLink>
              </div>

              <!-- Reset progress (small link) -->
              <button
                class="mt-8 text-sm text-gsap-text-muted hover:text-gsap-text-secondary transition-colors"
                @click="
                  completedSteps = [];
                  localStorage.removeItem('gsap-learning-progress');
                "
              >
                Прогрессті қайта бастау
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Golden gradient for GSAP Шебері text */
.text-gradient-gold {
  background: linear-gradient(135deg, #ffd700, #ffa500, #ff8c00, #ffd700);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shimmer 3s ease infinite;
}

@keyframes gradient-shimmer {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Slow pulse animation for glow */
.animate-pulse-slow {
  animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

/* Radial gradient background */
.bg-gradient-radial {
  background: radial-gradient(
    circle,
    var(--tw-gradient-from),
    var(--tw-gradient-via),
    var(--tw-gradient-to)
  );
}
</style>
