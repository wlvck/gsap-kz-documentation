<script setup lang="ts">
definePageMeta({
  layout: "docs",
});

const route = useRoute();
const slug = computed(() => {
  const slugParam = route.params.slug;
  if (Array.isArray(slugParam)) {
    return slugParam.join("/");
  }
  return slugParam || "";
});

const { data: page } = await useAsyncData(`docs-${slug.value}`, () =>
  queryCollection("content").path(`/docs/${slug.value}`).first()
);

// GSAP version for ornatu page
const { version: gsapVersion, fetchVersion } = useGsapVersion();
const isOrnatuPage = computed(() => slug.value === "kirisspe/ornatu");

onMounted(() => {
  if (isOrnatuPage.value) {
    fetchVersion();
  }
});
</script>

<template>
  <article class="prose prose-invert max-w-none">
    <!-- GSAP Version Banner for ornatu page -->
    <div
      v-if="isOrnatuPage"
      class="flex items-center gap-3 px-4 py-3 mb-6 rounded-lg bg-gsap-green/10 border border-gsap-green/20"
    >
      <span class="text-gsap-green text-lg">&#9889;</span>
      <span class="text-gsap-text-secondary">
        GSAP соңғы нұсқасы:
        <code class="bg-gsap-bg-tertiary text-gsap-green px-2 py-1 rounded text-sm font-mono ml-1">
          {{ gsapVersion }}
        </code>
      </span>
    </div>

    <template v-if="page">
      <ContentRenderer :value="page" />
    </template>
    <template v-else>
      <div class="text-center py-12">
        <div class="text-6xl mb-4">404</div>
        <h1 class="text-2xl font-bold text-gsap-text-primary mb-4">Бет табылмады</h1>
        <p class="text-gsap-text-secondary mb-8">Сіз іздеген құжаттама беті жоқ немесе жойылған.</p>
        <NuxtLink
          to="/docs/kirisspe/gsap-degen-ne"
          class="inline-flex items-center px-6 py-3 rounded-lg bg-gsap-green !text-gsap-bg-primary font-semibold hover:bg-gsap-green-light transition-colors !no-underline"
        >
          Басты бетке оралу
        </NuxtLink>
      </div>
    </template>
  </article>
</template>

<style>
.prose h1 {
  @apply text-3xl font-bold text-gsap-text-primary mb-6;
}

.prose h2 {
  @apply text-2xl font-semibold text-gsap-text-primary mt-10 mb-4;
}

.prose h3 {
  @apply text-xl font-semibold text-gsap-text-primary mt-8 mb-3;
}

.prose p {
  @apply text-gsap-text-secondary leading-relaxed mb-4;
}

.prose a {
  @apply text-gsap-green hover:underline;
}

.prose code {
  @apply bg-gsap-bg-tertiary text-gsap-green px-2 py-1 rounded text-sm font-mono;
}

.prose pre {
  @apply bg-gsap-bg-secondary border border-gsap-border rounded-xl p-4 overflow-x-auto my-6;
}

.prose pre code {
  @apply bg-transparent p-0 text-gsap-text-primary;
}

.prose ul {
  @apply list-disc list-inside space-y-2 mb-4 text-gsap-text-secondary;
}

.prose ol {
  @apply list-decimal list-inside space-y-2 mb-4 text-gsap-text-secondary;
}

.prose blockquote {
  @apply border-l-4 border-gsap-green pl-4 italic text-gsap-text-secondary my-6;
}

.prose strong {
  @apply text-gsap-text-primary font-semibold;
}

.prose table {
  @apply w-full border-collapse my-6;
}

.prose th {
  @apply bg-gsap-bg-tertiary text-gsap-text-primary font-semibold text-left px-4 py-3 border border-gsap-border;
}

.prose td {
  @apply text-gsap-text-secondary px-4 py-3 border border-gsap-border;
}
</style>
