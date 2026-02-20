<script setup lang="ts">
import { getCategoriesWithCounts } from "~/data/effects";

definePageMeta({
  layout: "effects",
});

useSeoMeta({
  title: "Effects Playground | GSAP Қазақша",
  description:
    "GSAP анимация эффекттерінің интерактивті галереясы. Әр эффектті тікелей сынап көріңіз.",
});

const categories = getCategoriesWithCounts();
const totalEffects = categories.reduce((sum, cat) => sum + cat.count, 0);
</script>

<template>
  <div class="min-h-screen bg-gsap-bg-primary">
    <!-- Hero Section -->
    <section class="py-12 md:py-16 lg:py-20 border-b border-gsap-border">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gsap-green/10 border border-gsap-green/20 mb-6"
        >
          <span class="w-2 h-2 rounded-full bg-gsap-green animate-pulse" />
          <span class="text-sm text-gsap-green font-medium">{{ totalEffects }}+ эффект</span>
        </div>

        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gsap-text-primary mb-6">
          Effects <span class="text-gsap-green">Playground</span>
        </h1>

        <p class="text-lg md:text-xl text-gsap-text-secondary max-w-2xl mx-auto mb-8">
          GSAP анимация эффекттерінің интерактивті галереясы. Әр эффектті тікелей сынап көріңіз,
          өзіңіздің мәтініңізді жазыңыз және кодты көшіріңіз.
        </p>

        <div class="flex flex-wrap gap-3 justify-center text-sm text-gsap-text-muted">
          <span class="px-3 py-1 rounded-full bg-gsap-bg-secondary">Интерактивті демо</span>
          <span class="px-3 py-1 rounded-full bg-gsap-bg-secondary">Өз мәтініңізді жазу</span>
          <span class="px-3 py-1 rounded-full bg-gsap-bg-secondary">Кодты көшіру</span>
          <span class="px-3 py-1 rounded-full bg-gsap-bg-secondary">Vue.js код</span>
        </div>
      </div>
    </section>

    <!-- Categories Grid -->
    <section class="py-12 md:py-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 class="text-2xl md:text-3xl font-bold text-gsap-text-primary mb-8">Категориялар</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <NuxtLink
            v-for="category in categories"
            :key="category.id"
            :to="`/effects/${category.id}`"
            :class="[
              'group p-6 rounded-xl border transition-all duration-300 hover:shadow-lg',
              category.count > 0
                ? 'bg-gsap-bg-secondary border-gsap-border hover:border-gsap-green/50 hover:shadow-gsap-green/5'
                : 'bg-gsap-bg-secondary/50 border-gsap-border/50 opacity-60 cursor-not-allowed',
            ]"
          >
            <div class="flex items-start justify-between mb-4">
              <span
                class="w-12 h-12 rounded-lg bg-gsap-bg-tertiary flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
              >
                {{ category.icon }}
              </span>
              <span
                :class="[
                  'text-xs font-medium px-2 py-1 rounded-full',
                  category.count > 0
                    ? 'bg-gsap-green/10 text-gsap-green'
                    : 'bg-gsap-bg-tertiary text-gsap-text-muted',
                ]"
              >
                {{ category.count > 0 ? category.count : "Жақында" }}
              </span>
            </div>

            <h3
              class="text-lg font-semibold text-gsap-text-primary mb-1 group-hover:text-gsap-green transition-colors"
            >
              {{ category.nameKz }}
            </h3>
            <p class="text-sm text-gsap-text-muted">{{ category.name }}</p>
            <p class="text-sm text-gsap-text-secondary mt-2">{{ category.description }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Quick Start Section -->
    <section class="py-12 md:py-16 border-t border-gsap-border">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-gsap-text-primary mb-6">Тез бастау</h2>

        <p class="text-gsap-text-secondary mb-8">
          Эффект таңдап, демо көріңіз, мәтінді өзгертіңіз және кодты көшіріңіз.
        </p>

        <div class="flex flex-wrap gap-4 justify-center">
          <NuxtLink
            to="/effects/text/fade-in"
            class="px-6 py-3 rounded-lg bg-gsap-green text-gsap-bg-primary font-medium hover:bg-gsap-green-dark transition-colors"
          >
            Бірінші эффект
          </NuxtLink>
          <NuxtLink
            to="/docs/kirisspe/gsap-degen-ne"
            class="px-6 py-3 rounded-lg bg-gsap-bg-secondary border border-gsap-border text-gsap-text-primary font-medium hover:border-gsap-green/50 transition-colors"
          >
            GSAP үйрену
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
