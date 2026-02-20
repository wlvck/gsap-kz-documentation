<script setup lang="ts">
import gsap from "gsap";

// Page transition hooks
const onBeforeEnter = (el: Element) => {
  gsap.set(el, { opacity: 0, y: 20 });
};

const onEnter = (el: Element, done: () => void) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    ease: "power2.out",
    onComplete: done,
  });
};

const onLeave = (el: Element, done: () => void) => {
  gsap.to(el, {
    opacity: 0,
    y: -20,
    duration: 0.3,
    ease: "power2.in",
    onComplete: done,
  });
};
</script>

<template>
  <div>
    <PageLoader />
    <NuxtLayout>
      <NuxtPage
        :transition="{
          name: 'page',
          mode: 'out-in',
          onBeforeEnter,
          onEnter,
          onLeave,
          css: false,
        }"
      />
    </NuxtLayout>
  </div>
</template>
