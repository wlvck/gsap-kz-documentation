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
    <!-- Mobile menu button -->
    <button
      class="fixed top-4 left-4 z-50 p-2 rounded-lg bg-gsap-bg-secondary border border-gsap-border lg:hidden"
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
      <div class="max-w-4xl mx-auto px-6 py-12 lg:py-16">
        <slot />
      </div>
    </main>
  </div>
</template>
