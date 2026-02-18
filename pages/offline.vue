<script setup lang="ts">
definePageMeta({
  layout: false,
});

const retryConnection = () => {
  window.location.reload();
};
</script>

<template>
  <div class="min-h-screen bg-gsap-bg-primary flex items-center justify-center p-6">
    <div class="text-center max-w-md">
      <!-- Offline Icon -->
      <div
        class="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gsap-bg-secondary border border-gsap-border mb-8"
      >
        <svg
          class="w-12 h-12 text-gsap-text-secondary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a5 5 0 01-.707-7.071"
          />
        </svg>
      </div>

      <!-- Title -->
      <h1 class="text-2xl font-bold text-gsap-text-primary mb-4">Интернет байланысы жоқ</h1>

      <!-- Description -->
      <p class="text-gsap-text-secondary mb-8">
        Бұл бетті көру үшін интернетке қосылыңыз. Кэштелген беттер желіден тыс қолжетімді болуы
        мүмкін.
      </p>

      <!-- Retry Button -->
      <button
        class="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gsap-green text-gsap-bg-primary font-semibold hover:bg-gsap-green-dark transition-colors"
        @click="retryConnection"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Қайталап көру
      </button>

      <!-- Home Link -->
      <div class="mt-6">
        <NuxtLink to="/" class="text-gsap-green hover:text-gsap-green-dark transition-colors">
          Басты бетке оралу
        </NuxtLink>
      </div>

      <!-- PWA Info -->
      <div class="mt-12 p-4 rounded-xl bg-gsap-bg-secondary border border-gsap-border">
        <p class="text-xs text-gsap-text-secondary">
          <span class="text-gsap-green font-semibold">Кеңес:</span>
          Бұл қосымшаны құрылғыңызға орнатыңыз, сонда кэштелген беттер желіден тыс режимде
          қолжетімді болады.
        </p>
      </div>
    </div>
  </div>
</template>
