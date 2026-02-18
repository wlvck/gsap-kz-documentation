<script setup lang="ts">
const progress = ref(0);

const updateProgress = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
};

onMounted(() => {
  window.addEventListener("scroll", updateProgress);
  updateProgress();
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateProgress);
});
</script>

<template>
  <div class="fixed top-0 left-0 right-0 h-1 z-50 bg-gsap-bg-tertiary">
    <div
      class="h-full bg-gsap-green transition-all duration-150"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>
