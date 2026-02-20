<script setup lang="ts">
import type { Effect } from "~/types/effects";

defineProps<{
  effect: Effect;
}>();

const categoryIcons: Record<string, string> = {
  text: "T",
  scroll: "↕",
  image: "🖼",
  card: "▢",
  navigation: "☰",
  button: "◉",
  container: "◻",
  loading: "◌",
  svg: "◇",
  cursor: "↗",
  micro: "·",
  "3d": "⬡",
};
</script>

<template>
  <NuxtLink
    :to="`/effects/${effect.category}/${effect.id}`"
    class="group block p-5 rounded-xl bg-gsap-bg-secondary border border-gsap-border hover:border-gsap-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-gsap-green/5"
  >
    <!-- Preview Area -->
    <div
      class="relative h-32 mb-4 rounded-lg bg-gsap-bg-tertiary flex items-center justify-center overflow-hidden"
    >
      <!-- Grid Pattern -->
      <div
        class="absolute inset-0 opacity-5"
        style="
          background-image:
            linear-gradient(#2a2d2b 1px, transparent 1px),
            linear-gradient(90deg, #2a2d2b 1px, transparent 1px);
          background-size: 10px 10px;
        "
      />

      <!-- Preview Icon/Text -->
      <div class="relative text-center">
        <span class="text-2xl text-gsap-text-muted group-hover:text-gsap-green transition-colors">
          {{ categoryIcons[effect.category] || "✦" }}
        </span>
        <p class="mt-2 text-xs text-gsap-text-muted font-mono">{{ effect.id }}</p>
      </div>

      <!-- Hover Overlay -->
      <div
        class="absolute inset-0 bg-gsap-green/0 group-hover:bg-gsap-green/5 transition-colors flex items-center justify-center"
      >
        <span
          class="opacity-0 group-hover:opacity-100 transition-opacity text-sm text-gsap-green font-medium"
        >
          Қарау →
        </span>
      </div>
    </div>

    <!-- Info -->
    <div>
      <div class="flex items-start justify-between gap-2 mb-2">
        <h3
          class="text-base font-semibold text-gsap-text-primary group-hover:text-gsap-green transition-colors line-clamp-1"
        >
          {{ effect.nameKz }}
        </h3>
        <span
          class="shrink-0 px-2 py-0.5 text-xs rounded-full bg-gsap-bg-tertiary text-gsap-text-muted capitalize"
        >
          {{ effect.category }}
        </span>
      </div>
      <p class="text-sm text-gsap-text-muted line-clamp-1">{{ effect.name }}</p>
      <p class="mt-1 text-sm text-gsap-text-secondary line-clamp-2">{{ effect.descriptionKz }}</p>
    </div>
  </NuxtLink>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
