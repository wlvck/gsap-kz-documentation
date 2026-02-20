<script setup lang="ts">
import { getEffect, getCategoryMeta, getEffectsByCategory } from "~/data/effects";
import type { EffectCategory, PlaygroundType } from "~/types/effects";

definePageMeta({
  layout: "effects",
});

const route = useRoute();
const category = computed(() => route.params.category as EffectCategory);
const effectId = computed(() => route.params.effect as string);

const effect = computed(() => getEffect(category.value, effectId.value));
const categoryMeta = computed(() => getCategoryMeta(category.value));
const categoryEffects = computed(() => getEffectsByCategory(category.value));

// Determine which playground component to use
const playgroundType = computed<PlaygroundType>(() => {
  return effect.value?.playgroundType || "text";
});

// Find prev/next effects for navigation
const currentIndex = computed(() =>
  categoryEffects.value.findIndex((e) => e.id === effectId.value)
);
const prevEffect = computed(() => categoryEffects.value[currentIndex.value - 1]);
const nextEffect = computed(() => categoryEffects.value[currentIndex.value + 1]);

// Redirect to 404 if effect not found
if (!effect.value) {
  throw createError({
    statusCode: 404,
    message: "Эффект табылмады",
  });
}

useSeoMeta({
  title: () => `${effect.value?.nameKz} | Effects Playground | GSAP Қазақша`,
  description: () => effect.value?.descriptionKz || "",
});

// Breadcrumb data
const breadcrumbs = computed(() => [
  { label: "Effects", to: "/effects" },
  { label: categoryMeta.value?.nameKz || category.value, to: `/effects/${category.value}` },
  { label: effect.value?.nameKz || effectId.value, to: route.path },
]);
</script>

<template>
  <div v-if="effect" class="min-h-screen bg-gsap-bg-primary">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-sm text-gsap-text-muted mb-8">
        <template v-for="(crumb, index) in breadcrumbs" :key="crumb.to">
          <NuxtLink
            :to="crumb.to"
            :class="[
              'hover:text-gsap-text-primary transition-colors',
              index === breadcrumbs.length - 1 ? 'text-gsap-text-primary' : '',
            ]"
          >
            {{ crumb.label }}
          </NuxtLink>
          <span v-if="index < breadcrumbs.length - 1" class="text-gsap-border">/</span>
        </template>
      </nav>

      <!-- Effect Header -->
      <header class="mb-8">
        <div class="flex items-center gap-3 mb-4">
          <span
            class="px-3 py-1 rounded-full bg-gsap-green/10 text-gsap-green text-sm font-medium capitalize"
          >
            {{ categoryMeta?.nameKz }}
          </span>
          <span class="text-gsap-text-muted text-sm">
            {{ currentIndex + 1 }} / {{ categoryEffects.length }}
          </span>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-gsap-text-primary mb-2">
          {{ effect.nameKz }}
        </h1>
        <p class="text-lg text-gsap-text-secondary">
          {{ effect.descriptionKz }}
        </p>
      </header>

      <!-- Effect Playground - dynamically loads based on playgroundType -->
      <EffectsPlaygroundsButtonPlayground v-if="playgroundType === 'button'" :effect="effect" />
      <EffectsEffectPlayground v-else :effect="effect" />

      <!-- Navigation -->
      <div class="mt-8 flex items-center justify-between gap-4">
        <NuxtLink
          v-if="prevEffect"
          :to="`/effects/${category}/${prevEffect.id}`"
          class="flex items-center gap-2 px-4 py-2 rounded-lg bg-gsap-bg-secondary border border-gsap-border text-gsap-text-primary hover:border-gsap-green/50 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span class="hidden sm:inline">{{ prevEffect.nameKz }}</span>
        </NuxtLink>
        <div v-else />

        <NuxtLink
          :to="`/effects/${category}`"
          class="px-4 py-2 rounded-lg text-gsap-text-muted hover:text-gsap-text-primary transition-colors"
        >
          Барлық {{ categoryMeta?.nameKz }}
        </NuxtLink>

        <NuxtLink
          v-if="nextEffect"
          :to="`/effects/${category}/${nextEffect.id}`"
          class="flex items-center gap-2 px-4 py-2 rounded-lg bg-gsap-bg-secondary border border-gsap-border text-gsap-text-primary hover:border-gsap-green/50 transition-colors"
        >
          <span class="hidden sm:inline">{{ nextEffect.nameKz }}</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </NuxtLink>
        <div v-else />
      </div>
    </div>
  </div>
</template>
