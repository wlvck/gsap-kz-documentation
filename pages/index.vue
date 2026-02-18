<script setup lang="ts">
import { gsap } from "gsap";

definePageMeta({
  layout: false,
});

const heroRef = ref<HTMLElement | null>(null);
const logoRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const descRef = ref<HTMLElement | null>(null);
const ctaRef = ref<HTMLElement | null>(null);
const featuresRef = ref<HTMLElement | null>(null);

onMounted(() => {
  // Create hero entrance animation timeline
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Logo animation
  tl.fromTo(logoRef.value, { scale: 0, rotation: -180 }, { scale: 1, rotation: 0, duration: 0.8 });

  // Title animation - split into words
  if (titleRef.value) {
    const words = titleRef.value.querySelectorAll(".title-word");
    tl.fromTo(
      words,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
      "-=0.3"
    );
  }

  // Description animation
  tl.fromTo(descRef.value, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.2");

  // CTA buttons animation
  if (ctaRef.value) {
    const buttons = ctaRef.value.querySelectorAll("a, button");
    tl.fromTo(
      buttons,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
      "-=0.2"
    );
  }

  // Features cards animation
  if (featuresRef.value) {
    const cards = featuresRef.value.querySelectorAll(".feature-card");
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featuresRef.value,
          start: "top 80%",
        },
      }
    );
  }
});
</script>

<template>
  <div class="min-h-screen bg-gsap-bg-primary">
    <AppHeader />
    <ScrollToTop />

    <!-- Hero Section -->
    <div ref="heroRef" class="relative overflow-hidden">
      <!-- Background gradient -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-gsap-green/5 via-transparent to-transparent"
      />

      <!-- Animated background particles -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="hero-particle hero-particle-1" />
        <div class="hero-particle hero-particle-2" />
        <div class="hero-particle hero-particle-3" />
      </div>

      <div class="relative max-w-6xl mx-auto px-6 py-24 lg:py-32">
        <div class="text-center">
          <!-- Logo -->
          <div
            ref="logoRef"
            class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gsap-green mb-8 shadow-lg shadow-gsap-green/20"
          >
            <span class="text-gsap-bg-primary font-bold text-4xl">G</span>
          </div>

          <!-- Title -->
          <h1 ref="titleRef" class="text-4xl lg:text-6xl font-bold text-gsap-text-primary mb-6">
            <span class="title-word inline-block">GSAP</span>
            <span class="title-word inline-block text-gsap-green">Қазақша</span>
            <span class="title-word inline-block">Құжаттама</span>
          </h1>

          <!-- Description -->
          <p ref="descRef" class="text-xl text-gsap-text-secondary max-w-2xl mx-auto mb-10">
            GreenSock Animation Platform (GSAP) кітапханасын қазақ тілінде үйреніңіз.
            Веб-анимацияларды кәсіби деңгейде жасауды бастаңыз.
          </p>

          <!-- CTA Buttons -->
          <div ref="ctaRef" class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/docs/kirisspe/gsap-degen-ne"
              class="group inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gsap-green text-gsap-bg-primary font-semibold text-lg hover:bg-gsap-green-light transition-all hover:shadow-lg hover:shadow-gsap-green/30"
            >
              Бастау
              <svg
                class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </NuxtLink>
            <a
              href="https://gsap.com"
              target="_blank"
              class="group inline-flex items-center justify-center px-8 py-4 rounded-xl border border-gsap-border text-gsap-text-primary font-semibold text-lg hover:bg-gsap-bg-secondary hover:border-gsap-green/50 transition-all"
            >
              Ресми сайт
              <svg
                class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div ref="featuresRef" class="max-w-6xl mx-auto px-6 py-16">
      <h2 class="text-2xl font-bold text-gsap-text-primary text-center mb-12">Не үйренесіз?</h2>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Feature Card -->
        <div
          class="feature-card p-6 rounded-2xl bg-gsap-bg-secondary border border-gsap-border hover:border-gsap-green/30 transition-colors"
        >
          <div class="w-12 h-12 rounded-xl bg-gsap-green/10 flex items-center justify-center mb-4">
            <svg
              class="w-6 h-6 text-gsap-green"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gsap-text-primary mb-2">Негізгі анимациялар</h3>
          <p class="text-gsap-text-secondary text-sm">
            gsap.to(), gsap.from(), gsap.fromTo() әдістерімен танысу
          </p>
        </div>

        <div
          class="feature-card p-6 rounded-2xl bg-gsap-bg-secondary border border-gsap-border hover:border-gsap-green/30 transition-colors"
        >
          <div class="w-12 h-12 rounded-xl bg-gsap-green/10 flex items-center justify-center mb-4">
            <svg
              class="w-6 h-6 text-gsap-green"
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
          </div>
          <h3 class="text-lg font-semibold text-gsap-text-primary mb-2">Timeline</h3>
          <p class="text-gsap-text-secondary text-sm">
            Күрделі анимация тізбектерін құру және басқару
          </p>
        </div>

        <div
          class="feature-card p-6 rounded-2xl bg-gsap-bg-secondary border border-gsap-border hover:border-gsap-green/30 transition-colors"
        >
          <div class="w-12 h-12 rounded-xl bg-gsap-green/10 flex items-center justify-center mb-4">
            <svg
              class="w-6 h-6 text-gsap-green"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gsap-text-primary mb-2">ScrollTrigger</h3>
          <p class="text-gsap-text-secondary text-sm">
            Скролл негізіндегі интерактивті анимациялар
          </p>
        </div>

        <div
          class="feature-card p-6 rounded-2xl bg-gsap-bg-secondary border border-gsap-border hover:border-gsap-green/30 transition-colors"
        >
          <div class="w-12 h-12 rounded-xl bg-gsap-green/10 flex items-center justify-center mb-4">
            <svg
              class="w-6 h-6 text-gsap-green"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gsap-text-primary mb-2">SVG анимация</h3>
          <p class="text-gsap-text-secondary text-sm">SVG элементтерін анимациялау техникалары</p>
        </div>

        <div
          class="feature-card p-6 rounded-2xl bg-gsap-bg-secondary border border-gsap-border hover:border-gsap-green/30 transition-colors"
        >
          <div class="w-12 h-12 rounded-xl bg-gsap-green/10 flex items-center justify-center mb-4">
            <svg
              class="w-6 h-6 text-gsap-green"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gsap-text-primary mb-2">Плагиндер</h3>
          <p class="text-gsap-text-secondary text-sm">
            MorphSVG, DrawSVG, SplitText және басқа плагиндер
          </p>
        </div>

        <div
          class="feature-card p-6 rounded-2xl bg-gsap-bg-secondary border border-gsap-border hover:border-gsap-green/30 transition-colors"
        >
          <div class="w-12 h-12 rounded-xl bg-gsap-green/10 flex items-center justify-center mb-4">
            <svg
              class="w-6 h-6 text-gsap-green"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gsap-text-primary mb-2">Фреймворктар</h3>
          <p class="text-gsap-text-secondary text-sm">React, Vue, Nuxt-пен интеграция</p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="border-t border-gsap-border">
      <div class="max-w-6xl mx-auto px-6 py-8">
        <p class="text-center text-gsap-text-secondary text-sm">
          GSAP — GreenSock компаниясының сауда белгісі. Бұл құжаттама қазақстандық әзірлеушілер
          қауымдастығы үшін жасалған.
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.title-word {
  margin-right: 0.3em;
}

.title-word:last-child {
  margin-right: 0;
}

/* Hero background particles */
.hero-particle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(10, 228, 72, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

.hero-particle-1 {
  width: 400px;
  height: 400px;
  top: -100px;
  right: -100px;
  animation: float 20s ease-in-out infinite;
}

.hero-particle-2 {
  width: 300px;
  height: 300px;
  bottom: -50px;
  left: -50px;
  animation: float 15s ease-in-out infinite reverse;
}

.hero-particle-3 {
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 10s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(20px, -20px);
  }
  50% {
    transform: translate(-10px, 20px);
  }
  75% {
    transform: translate(-20px, -10px);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.3;
  }
}
</style>
