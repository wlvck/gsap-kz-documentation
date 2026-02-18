<script setup lang="ts">
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};
</script>

<template>
  <div class="flex min-h-screen">
    <ScrollProgress />
    <!-- Mobile/Tablet menu button -->
    <button
      class="fixed top-4 left-4 z-50 p-3 rounded-lg bg-gsap-bg-secondary border border-gsap-border lg:hidden touch-manipulation"
      aria-label="Toggle menu"
      @click="toggleSidebar"
    >
      <svg
        v-if="!isSidebarOpen"
        class="w-6 h-6 text-gsap-text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <svg
        v-else
        class="w-6 h-6 text-gsap-text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <!-- Sidebar -->
    <DocsSidebar :is-open="isSidebarOpen" @close="closeSidebar" />

    <!-- Main content -->
    <main class="flex-1 lg:ml-72">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12 lg:py-16 flex gap-6 lg:gap-8"
      >
        <div class="flex-1 min-w-0 max-w-4xl">
          <slot />
        </div>
        <DocsToc />
      </div>
    </main>
  </div>
</template>
