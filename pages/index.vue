<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <div class="min-h-screen bg-gsap-bg-primary">
    <AppHeader />
    <ScrollToTop />

    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <!-- Background gradient -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-gsap-green/5 via-transparent to-transparent"
      />

      <div class="relative max-w-6xl mx-auto px-6 py-24 lg:py-32">
        <div class="text-center">
          <!-- Logo -->
          <div
            class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gsap-green mb-8"
          >
            <span class="text-gsap-bg-primary font-bold text-4xl">G</span>
          </div>

          <!-- Title -->
          <h1 class="text-4xl lg:text-6xl font-bold text-gsap-text-primary mb-6">
            GSAP
            <span class="text-gsap-green">Қазақша</span>
            Құжаттама
          </h1>

          <!-- Description -->
          <p class="text-xl text-gsap-text-secondary max-w-2xl mx-auto mb-10">
            GreenSock Animation Platform (GSAP) кітапханасын қазақ тілінде үйреніңіз.
            Веб-анимацияларды кәсіби деңгейде жасауды бастаңыз.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/docs/kirisspe/gsap-degen-ne"
              class="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gsap-green text-gsap-bg-primary font-semibold text-lg hover:bg-gsap-green-light transition-colors"
            >
              Бастау
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              class="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-gsap-border text-gsap-text-primary font-semibold text-lg hover:bg-gsap-bg-secondary transition-colors"
            >
              Ресми сайт
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <div class="max-w-6xl mx-auto px-6 py-16">
      <h2 class="text-2xl font-bold text-gsap-text-primary text-center mb-12">Не үйренесіз?</h2>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Feature Card -->
        <div class="p-6 rounded-2xl bg-gsap-bg-secondary border border-gsap-border">
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

        <div class="p-6 rounded-2xl bg-gsap-bg-secondary border border-gsap-border">
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

        <div class="p-6 rounded-2xl bg-gsap-bg-secondary border border-gsap-border">
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

        <div class="p-6 rounded-2xl bg-gsap-bg-secondary border border-gsap-border">
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

        <div class="p-6 rounded-2xl bg-gsap-bg-secondary border border-gsap-border">
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

        <div class="p-6 rounded-2xl bg-gsap-bg-secondary border border-gsap-border">
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
