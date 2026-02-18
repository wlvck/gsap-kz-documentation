<script setup lang="ts">
import { gsap } from "gsap";

const nuxtApp = useNuxtApp();
const isLoading = ref(false);
const loaderRef = ref<HTMLElement | null>(null);
const progressRef = ref<HTMLElement | null>(null);

let tween: gsap.core.Tween | null = null;

nuxtApp.hook("page:start", () => {
  isLoading.value = true;

  nextTick(() => {
    if (progressRef.value) {
      // Kill any existing animation
      if (tween) tween.kill();

      // Reset and start progress animation
      gsap.set(progressRef.value, { scaleX: 0, transformOrigin: "left" });
      tween = gsap.to(progressRef.value, {
        scaleX: 0.9,
        duration: 8,
        ease: "power1.out",
      });
    }
  });
});

nuxtApp.hook("page:finish", () => {
  if (progressRef.value && tween) {
    tween.kill();
    gsap.to(progressRef.value, {
      scaleX: 1,
      duration: 0.2,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(progressRef.value, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            isLoading.value = false;
            gsap.set(progressRef.value, { opacity: 1, scaleX: 0 });
          },
        });
      },
    });
  } else {
    isLoading.value = false;
  }
});
</script>

<template>
  <Transition name="loader">
    <div v-if="isLoading" ref="loaderRef" class="fixed top-0 left-0 right-0 z-[100]">
      <!-- Progress bar -->
      <div class="h-0.5 bg-gsap-bg-tertiary">
        <div
          ref="progressRef"
          class="h-full bg-gsap-green origin-left"
          style="transform: scaleX(0)"
        />
      </div>

      <!-- Optional: Loading spinner for slow connections -->
      <div class="absolute top-4 right-4">
        <div
          class="w-5 h-5 border-2 border-gsap-green/30 border-t-gsap-green rounded-full animate-spin"
        />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.loader-enter-active,
.loader-leave-active {
  transition: opacity 0.2s ease;
}

.loader-enter-from,
.loader-leave-to {
  opacity: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 0.8s linear infinite;
}
</style>
