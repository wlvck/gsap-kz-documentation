<script setup lang="ts">
import { getEffectsByCategory, getCategoryMeta } from "~/data/effects";
import type { EffectCategory } from "~/types/effects";

definePageMeta({
  layout: "effects",
});

const route = useRoute();
const category = computed(() => route.params.category as EffectCategory);

const categoryMeta = computed(() => getCategoryMeta(category.value));
const categoryEffects = computed(() => getEffectsByCategory(category.value));

// Redirect to 404 if invalid category
if (!categoryMeta.value) {
  throw createError({
    statusCode: 404,
    message: "Категория табылмады",
  });
}

useSeoMeta({
  title: () =>
    `${categoryMeta.value?.nameKz || category.value} | Effects Playground | GSAP Қазақша`,
  description: () => categoryMeta.value?.description || "",
});
</script>

<template>
  <div class="min-h-screen bg-gsap-bg-primary">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-sm text-gsap-text-muted mb-8">
        <NuxtLink to="/effects" class="hover:text-gsap-text-primary transition-colors">
          Effects
        </NuxtLink>
        <span class="text-gsap-border">/</span>
        <span class="text-gsap-text-primary">{{ categoryMeta?.nameKz }}</span>
      </nav>

      <!-- Category Header -->
      <header class="mb-12">
        <div class="flex items-center gap-4 mb-4">
          <span
            class="w-16 h-16 rounded-xl bg-gsap-bg-secondary border border-gsap-border flex items-center justify-center text-3xl"
          >
            {{ categoryMeta?.icon }}
          </span>
          <div>
            <h1 class="text-3xl md:text-4xl font-bold text-gsap-text-primary">
              {{ categoryMeta?.nameKz }}
            </h1>
            <p class="text-gsap-text-muted">{{ categoryMeta?.name }}</p>
          </div>
        </div>
        <p class="text-lg text-gsap-text-secondary max-w-2xl">
          {{ categoryMeta?.description }}
        </p>
      </header>

      <!-- Effects Grid -->
      <div
        v-if="categoryEffects.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
      >
        <EffectsEffectCard v-for="effect in categoryEffects" :key="effect.id" :effect="effect" />
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="text-center py-16 px-4 rounded-xl bg-gsap-bg-secondary border border-gsap-border"
      >
        <div
          class="w-16 h-16 mx-auto mb-4 rounded-full bg-gsap-bg-tertiary flex items-center justify-center text-3xl"
        >
          {{ categoryMeta?.icon }}
        </div>
        <h3 class="text-xl font-semibold text-gsap-text-primary mb-2">Жақында қосылады</h3>
        <p class="text-gsap-text-secondary max-w-md mx-auto">
          {{ categoryMeta?.nameKz }} категориясының эффекттері әзірленуде. Жақын арада қосылады!
        </p>
      </div>

      <!-- Back to All Effects -->
      <div class="mt-12 text-center">
        <NuxtLink
          to="/effects"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gsap-bg-secondary border border-gsap-border text-gsap-text-primary font-medium hover:border-gsap-green/50 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Барлық категориялар
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
