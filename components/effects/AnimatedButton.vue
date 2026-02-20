<script setup lang="ts">
import gsap from "gsap";

defineProps<{
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}>();

const buttonRef = ref<HTMLElement | null>(null);
const rippleRef = ref<HTMLElement | null>(null);

const onMouseEnter = () => {
  if (buttonRef.value) {
    gsap.to(buttonRef.value, {
      scale: 1.02,
      duration: 0.2,
      ease: "power2.out",
    });
  }
};

const onMouseLeave = () => {
  if (buttonRef.value) {
    gsap.to(buttonRef.value, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });
  }
};

const onMouseDown = (e: MouseEvent) => {
  if (buttonRef.value && rippleRef.value) {
    const rect = buttonRef.value.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.set(rippleRef.value, {
      left: x,
      top: y,
      scale: 0,
      opacity: 0.3,
    });

    gsap.to(rippleRef.value, {
      scale: 4,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    });

    gsap.to(buttonRef.value, {
      scale: 0.98,
      duration: 0.1,
      ease: "power2.out",
    });
  }
};

const onMouseUp = () => {
  if (buttonRef.value) {
    gsap.to(buttonRef.value, {
      scale: 1.02,
      duration: 0.1,
      ease: "power2.out",
    });
  }
};
</script>

<template>
  <button
    ref="buttonRef"
    type="button"
    :class="[
      'relative overflow-hidden font-medium transition-colors',
      // Size variants
      size === 'sm' && 'px-3 py-1.5 text-sm rounded-lg',
      size === 'lg' && 'px-8 py-4 text-lg rounded-xl',
      (!size || size === 'md') && 'px-6 py-2.5 text-base rounded-lg',
      // Color variants
      variant === 'primary' && 'bg-gsap-green text-gsap-bg-primary hover:bg-gsap-green-dark',
      variant === 'ghost' && 'bg-transparent text-gsap-text-primary hover:bg-gsap-bg-secondary',
      (!variant || variant === 'secondary') &&
        'bg-gsap-bg-secondary border border-gsap-border text-gsap-text-primary hover:border-gsap-green/50',
    ]"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
  >
    <!-- Ripple effect -->
    <span
      ref="rippleRef"
      class="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 pointer-events-none"
    />
    <!-- Content -->
    <span class="relative z-10">
      <slot />
    </span>
  </button>
</template>
