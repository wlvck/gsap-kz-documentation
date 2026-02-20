<script setup lang="ts">
defineProps<{
  completedSteps: string[];
}>();

// Refs for GSAP animations
const pathRef = ref<SVGPathElement | null>(null);
const glowPathRef = ref<SVGPathElement | null>(null);
const containerRef = ref<SVGSVGElement | null>(null);

// GSAP animations
onMounted(async () => {
  const { gsap } = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);

  // Get the main content container for proper scroll tracking
  const mainContainer = document.querySelector("main");

  // Animate main path drawing
  if (pathRef.value && mainContainer) {
    const pathLength = pathRef.value.getTotalLength();

    gsap.set(pathRef.value, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    ScrollTrigger.create({
      trigger: mainContainer,
      start: "top top",
      end: "bottom bottom",
      scrub: 0,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(pathRef.value, {
          strokeDashoffset: pathLength * (1 - progress),
        });
      },
    });
  }

  // Animate glow path
  if (glowPathRef.value && mainContainer) {
    const pathLength = glowPathRef.value.getTotalLength();

    gsap.set(glowPathRef.value, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    ScrollTrigger.create({
      trigger: mainContainer,
      start: "top top",
      end: "bottom bottom",
      scrub: 0,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(glowPathRef.value, {
          strokeDashoffset: pathLength * (1 - progress),
        });
      },
    });
  }
});
</script>

<template>
  <!-- Simple vertical line in the center - checkpoints are now on the cards -->
  <div
    ref="containerRef"
    class="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 pointer-events-none"
  >
    <svg class="w-full h-full" preserveAspectRatio="none">
      <defs>
        <!-- Gradient for path -->
        <linearGradient id="learningPathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#10b981" />
          <stop offset="23%" stop-color="#10b981" />
          <stop offset="24%" stop-color="#eab308" />
          <stop offset="53%" stop-color="#eab308" />
          <stop offset="54%" stop-color="#ef4444" />
          <stop offset="84%" stop-color="#ef4444" />
          <stop offset="85%" stop-color="#f59e0b" />
          <stop offset="100%" stop-color="#f59e0b" />
        </linearGradient>

        <!-- Glow filter -->
        <filter id="pathGlow" x="-200%" y="0%" width="500%" height="100%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- Background track (darker) -->
      <line
        x1="50%"
        y1="0"
        x2="50%"
        y2="100%"
        stroke="#1c1e1d"
        stroke-width="6"
        stroke-linecap="round"
      />

      <!-- Animated glow line -->
      <line
        ref="glowPathRef"
        x1="50%"
        y1="0"
        x2="50%"
        y2="100%"
        stroke="url(#learningPathGradient)"
        stroke-width="10"
        stroke-linecap="round"
        opacity="0.3"
        filter="url(#pathGlow)"
      />

      <!-- Main animated line -->
      <line
        ref="pathRef"
        x1="50%"
        y1="0"
        x2="50%"
        y2="100%"
        stroke="url(#learningPathGradient)"
        stroke-width="3"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>
