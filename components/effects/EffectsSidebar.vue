<script setup lang="ts">
import { getCategoriesWithCounts, getEffectsByCategory } from "~/data/effects";
import type { EffectCategory } from "~/types/effects";

const route = useRoute();
const currentCategory = computed(() => route.params.category as EffectCategory | undefined);
const currentEffect = computed(() => route.params.effect as string | undefined);

const categories = getCategoriesWithCounts();
const expandedCategories = ref<Set<EffectCategory>>(new Set());

// Auto-expand current category
watch(
  currentCategory,
  (cat) => {
    if (cat) {
      expandedCategories.value.add(cat);
    }
  },
  { immediate: true }
);

const toggleCategory = (categoryId: EffectCategory) => {
  if (expandedCategories.value.has(categoryId)) {
    expandedCategories.value.delete(categoryId);
  } else {
    expandedCategories.value.add(categoryId);
  }
};

const getCategoryEffects = (categoryId: EffectCategory) => {
  return getEffectsByCategory(categoryId);
};

const isActiveCategory = (categoryId: EffectCategory) => {
  return currentCategory.value === categoryId;
};

const isActiveEffect = (categoryId: EffectCategory, effectId: string) => {
  return currentCategory.value === categoryId && currentEffect.value === effectId;
};
</script>

<template>
  <aside
    class="w-64 shrink-0 border-r border-gsap-border bg-gsap-bg-secondary h-[calc(100vh-64px)] sticky top-16 overflow-y-auto hidden lg:block"
  >
    <div class="p-4">
      <NuxtLink
        to="/effects"
        class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gsap-text-primary hover:bg-gsap-bg-tertiary transition-colors mb-4"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
        Барлық категориялар
      </NuxtLink>

      <nav class="space-y-1">
        <div v-for="category in categories" :key="category.id">
          <!-- Category Header -->
          <button
            type="button"
            :class="[
              'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              isActiveCategory(category.id)
                ? 'bg-gsap-green/10 text-gsap-green'
                : 'text-gsap-text-secondary hover:text-gsap-text-primary hover:bg-gsap-bg-tertiary',
            ]"
            @click="toggleCategory(category.id)"
          >
            <div class="flex items-center gap-2">
              <span class="w-5 text-center">{{ category.icon }}</span>
              <span>{{ category.nameKz }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span
                v-if="category.count > 0"
                class="text-xs px-1.5 py-0.5 rounded bg-gsap-bg-tertiary text-gsap-text-muted"
              >
                {{ category.count }}
              </span>
              <svg
                :class="[
                  'w-4 h-4 transition-transform',
                  expandedCategories.has(category.id) ? 'rotate-180' : '',
                ]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>

          <!-- Effects List -->
          <Transition name="expand">
            <div
              v-if="expandedCategories.has(category.id) && category.count > 0"
              class="ml-4 mt-1 space-y-0.5 border-l border-gsap-border pl-3"
            >
              <NuxtLink
                v-for="effect in getCategoryEffects(category.id)"
                :key="effect.id"
                :to="`/effects/${category.id}/${effect.id}`"
                :class="[
                  'block px-3 py-1.5 rounded text-sm transition-colors',
                  isActiveEffect(category.id, effect.id)
                    ? 'bg-gsap-green/10 text-gsap-green font-medium'
                    : 'text-gsap-text-muted hover:text-gsap-text-primary hover:bg-gsap-bg-tertiary',
                ]"
              >
                {{ effect.nameKz }}
              </NuxtLink>
            </div>
          </Transition>
        </div>
      </nav>
    </div>
  </aside>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>
