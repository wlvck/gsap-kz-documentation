<script setup lang="ts">
import type { Showcase } from "~/data/showcases";

defineProps<{
  showcase: Showcase;
  featured?: boolean;
}>();
</script>

<template>
  <a
    :href="showcase.url"
    target="_blank"
    rel="noopener noreferrer"
    :class="[
      'group block rounded-2xl overflow-hidden bg-gsap-bg-secondary border transition-all duration-300',
      featured
        ? 'border-gsap-green/30 hover:border-gsap-green'
        : 'border-gsap-border hover:border-gsap-text-muted',
    ]"
  >
    <!-- Image -->
    <div class="relative aspect-video overflow-hidden">
      <img
        :src="showcase.image"
        :alt="showcase.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-gsap-bg-secondary via-transparent to-transparent opacity-60"
      />

      <!-- Featured Badge -->
      <div
        v-if="featured"
        class="absolute top-3 right-3 px-2 py-1 rounded-md bg-gsap-green text-gsap-bg-primary text-xs font-semibold"
      >
        &#9733; Featured
      </div>

      <!-- External Link Icon -->
      <div
        class="absolute top-3 left-3 p-2 rounded-lg bg-gsap-bg-primary/80 text-gsap-text-muted opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5">
      <h3
        class="text-lg font-semibold text-gsap-text-primary mb-2 group-hover:text-gsap-green transition-colors"
      >
        {{ showcase.title }}
      </h3>
      <p class="text-sm text-gsap-text-secondary mb-4 line-clamp-2">
        {{ showcase.description }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in showcase.tags"
          :key="tag"
          class="px-2 py-1 rounded-md bg-gsap-bg-tertiary text-xs text-gsap-text-muted"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </a>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
