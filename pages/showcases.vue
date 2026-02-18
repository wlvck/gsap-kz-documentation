<script setup lang="ts">
import { showcases, allTags } from "~/data/showcases";

definePageMeta({
  layout: false,
});

useHead({
  title: "Showcases | GSAP Қазақша",
  meta: [
    {
      name: "description",
      content: "GSAP қолданған үздік сайттар галереясы. Шабыт алыңыз және үйреніңіз.",
    },
  ],
});

const selectedTags = ref<string[]>([]);
const searchQuery = ref("");

const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag);
  if (index === -1) {
    selectedTags.value.push(tag);
  } else {
    selectedTags.value.splice(index, 1);
  }
};

const filteredShowcases = computed(() => {
  let result = showcases;

  // Filter by tags
  if (selectedTags.value.length > 0) {
    result = result.filter((s) => selectedTags.value.some((tag) => s.tags.includes(tag)));
  }

  // Filter by search
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.tags.some((t) => t.toLowerCase().includes(query))
    );
  }

  return result;
});

const featuredShowcases = computed(() => filteredShowcases.value.filter((s) => s.featured));
const regularShowcases = computed(() => filteredShowcases.value.filter((s) => !s.featured));

const clearFilters = () => {
  selectedTags.value = [];
  searchQuery.value = "";
};
</script>

<template>
  <div class="min-h-screen bg-gsap-bg-primary">
    <AppHeader />
    <ScrollToTop />

    <!-- Hero -->
    <div class="relative overflow-hidden border-b border-gsap-border">
      <div
        class="absolute inset-0 bg-gradient-to-br from-gsap-green/5 via-transparent to-transparent"
      />
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <h1 class="text-4xl lg:text-5xl font-bold text-gsap-text-primary mb-4">Showcases</h1>
        <p class="text-xl text-gsap-text-secondary max-w-2xl">
          GSAP қолданған үздік сайттар галереясы. Шабыт алыңыз және жаңа техникаларды үйреніңіз.
        </p>
      </div>
    </div>

    <!-- Filters -->
    <div
      class="sticky top-16 z-30 bg-gsap-bg-primary/80 backdrop-blur-lg border-b border-gsap-border"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <!-- Search -->
          <div class="relative w-full sm:w-64">
            <svg
              class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gsap-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Іздеу..."
              class="w-full pl-10 pr-4 py-2 bg-gsap-bg-secondary border border-gsap-border rounded-lg text-sm text-gsap-text-primary placeholder-gsap-text-muted focus:outline-none focus:border-gsap-green/50"
            />
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tag in allTags"
              :key="tag"
              :class="[
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                selectedTags.includes(tag)
                  ? 'bg-gsap-green text-gsap-bg-primary'
                  : 'bg-gsap-bg-secondary text-gsap-text-secondary hover:text-gsap-text-primary border border-gsap-border',
              ]"
              @click="toggleTag(tag)"
            >
              {{ tag }}
            </button>
            <button
              v-if="selectedTags.length > 0 || searchQuery"
              class="px-3 py-1.5 rounded-lg text-xs font-medium text-gsap-text-muted hover:text-gsap-text-primary transition-colors"
              @click="clearFilters"
            >
              Тазалау
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <!-- No Results -->
      <div v-if="filteredShowcases.length === 0" class="text-center py-16">
        <div class="text-6xl mb-4">:(</div>
        <h2 class="text-xl font-semibold text-gsap-text-primary mb-2">Нәтиже табылмады</h2>
        <p class="text-gsap-text-secondary mb-4">Басқа фильтрлерді қолданып көріңіз</p>
        <button
          class="px-4 py-2 bg-gsap-green text-gsap-bg-primary rounded-lg font-medium hover:bg-gsap-green-light transition-colors"
          @click="clearFilters"
        >
          Фильтрлерді тазалау
        </button>
      </div>

      <template v-else>
        <!-- Featured Section -->
        <section v-if="featuredShowcases.length > 0" class="mb-16">
          <h2 class="text-2xl font-bold text-gsap-text-primary mb-6 flex items-center gap-2">
            <span class="text-gsap-green">&#9733;</span>
            Ерекшеленген
          </h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ShowcaseCard
              v-for="showcase in featuredShowcases"
              :key="showcase.id"
              :showcase="showcase"
              featured
            />
          </div>
        </section>

        <!-- All Showcases -->
        <section v-if="regularShowcases.length > 0">
          <h2 class="text-2xl font-bold text-gsap-text-primary mb-6">Барлық сайттар</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ShowcaseCard
              v-for="showcase in regularShowcases"
              :key="showcase.id"
              :showcase="showcase"
            />
          </div>
        </section>
      </template>
    </div>

    <!-- Footer -->
    <footer class="border-t border-gsap-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <p class="text-center text-gsap-text-secondary text-sm">
          GSAP — GreenSock компаниясының сауда белгісі. Бұл құжаттама қазақстандық әзірлеушілер
          қауымдастығы үшін жасалған.
        </p>
      </div>
    </footer>
  </div>
</template>
