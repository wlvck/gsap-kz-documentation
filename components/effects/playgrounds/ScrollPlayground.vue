<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Effect } from "~/types/effects";

const props = defineProps<{
  effect: Effect;
}>();

const containerRef = ref<HTMLElement | null>(null);
const elementRef = ref<HTMLElement | null>(null);
const progressRef = ref<HTMLElement | null>(null);

let scrollTriggerInstance: ScrollTrigger | null = null;
let animation: gsap.core.Tween | null = null;

const setupAnimation = () => {
  if (!containerRef.value || !elementRef.value) return;

  // Clean up previous
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
  }
  if (animation) {
    animation.kill();
  }

  gsap.registerPlugin(ScrollTrigger);

  switch (props.effect.id) {
    case "scroll-fade-in":
      animation = gsap.fromTo(
        elementRef.value,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: elementRef.value,
            scroller: containerRef.value,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
      scrollTriggerInstance = ScrollTrigger.getAll().pop() || null;
      break;

    case "scroll-slide-up":
      animation = gsap.fromTo(
        elementRef.value,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: elementRef.value,
            scroller: containerRef.value,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
      scrollTriggerInstance = ScrollTrigger.getAll().pop() || null;
      break;

    case "parallax-simple":
      animation = gsap.to(elementRef.value, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: elementRef.value,
          scroller: containerRef.value,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      scrollTriggerInstance = ScrollTrigger.getAll().pop() || null;
      break;

    case "pin-simple":
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: elementRef.value,
        scroller: containerRef.value,
        start: "top center",
        end: "+=200",
        pin: true,
        pinSpacing: true,
      });
      break;

    case "horizontal-scroll":
      animation = gsap.to(elementRef.value, {
        x: -200,
        ease: "none",
        scrollTrigger: {
          trigger: elementRef.value,
          scroller: containerRef.value,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });
      scrollTriggerInstance = ScrollTrigger.getAll().pop() || null;
      break;

    case "scrub-animation":
      animation = gsap.fromTo(
        elementRef.value,
        { scale: 0.5, rotation: -180, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: elementRef.value,
            scroller: containerRef.value,
            start: "top 80%",
            end: "top 20%",
            scrub: 0.5,
          },
        }
      );
      scrollTriggerInstance = ScrollTrigger.getAll().pop() || null;
      break;

    case "scroll-progress":
      if (progressRef.value) {
        animation = gsap.to(progressRef.value, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.value,
            scroller: containerRef.value,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
        scrollTriggerInstance = ScrollTrigger.getAll().pop() || null;
      }
      break;
  }
};

const resetScroll = () => {
  if (containerRef.value) {
    containerRef.value.scrollTop = 0;
  }
  // Re-setup animation after reset
  nextTick(() => {
    setupAnimation();
  });
};

onMounted(() => {
  setTimeout(() => {
    setupAnimation();
  }, 300);
});

onUnmounted(() => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
  }
  if (animation) {
    animation.kill();
  }
});

watch(
  () => props.effect.id,
  () => {
    resetScroll();
  }
);

// Instruction based on effect type
const instruction = computed(() => {
  switch (props.effect.id) {
    case "scroll-fade-in":
      return "Контейнерді скролл жасаңыз - элемент біртіндеп көрінеді";
    case "scroll-slide-up":
      return "Скролл жасаңыз - элемент төменнен жоғары сырғиды";
    case "parallax-simple":
      return "Скролл жасаңыз - параллакс эффектін көріңіз";
    case "pin-simple":
      return "Скролл жасаңыз - элемент орнында тұрады";
    case "horizontal-scroll":
      return "Вертикаль скролл - горизонталь қозғалыс";
    case "scrub-animation":
      return "Скролл жасаңыз - анимация скроллмен синхрон";
    case "scroll-progress":
      return "Скролл жасаңыз - прогресс барын көріңіз";
    default:
      return "Контейнерді скролл жасаңыз";
  }
});
</script>

<template>
  <div class="rounded-xl border border-gsap-border overflow-hidden bg-gsap-bg-secondary">
    <!-- Scrollable Demo Area -->
    <div class="relative">
      <!-- Progress bar for scroll-progress effect -->
      <div
        v-if="effect.id === 'scroll-progress'"
        ref="progressRef"
        class="absolute top-0 left-0 h-1 bg-gsap-green z-10 origin-left"
        style="transform: scaleX(0); width: 100%"
      />

      <!-- Instruction bar -->
      <div
        class="sticky top-0 z-10 flex items-center justify-between px-4 py-2 bg-gsap-bg-secondary/90 backdrop-blur-sm border-b border-gsap-border"
      >
        <p class="text-gsap-text-muted text-sm">{{ instruction }}</p>
        <button
          type="button"
          class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gsap-bg-tertiary border border-gsap-border text-gsap-text-primary hover:border-gsap-green/50 transition-colors text-sm"
          @click="resetScroll"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Қайта бастау
        </button>
      </div>

      <!-- Scrollable container -->
      <div
        ref="containerRef"
        class="h-[400px] overflow-y-auto bg-gsap-bg-tertiary"
        style="scroll-behavior: smooth"
      >
        <!-- Grid Background -->
        <div
          class="absolute inset-0 opacity-10 pointer-events-none"
          style="
            background-image:
              linear-gradient(#2a2d2b 1px, transparent 1px),
              linear-gradient(90deg, #2a2d2b 1px, transparent 1px);
            background-size: 20px 20px;
          "
        />

        <!-- Top spacer -->
        <div class="h-[300px] flex items-center justify-center">
          <p class="text-gsap-text-muted">Төменге скролл жасаңыз</p>
        </div>

        <!-- Animated element -->
        <div class="flex items-center justify-center py-16">
          <div
            ref="elementRef"
            class="px-8 py-6 bg-gsap-green text-black font-bold text-2xl rounded-xl shadow-lg"
          >
            {{ effect.defaultText || "Скролл эффектісі" }}
          </div>
        </div>

        <!-- Bottom spacer -->
        <div class="h-[400px] flex items-center justify-center">
          <p class="text-gsap-text-muted">Скролл аяқталды</p>
        </div>
      </div>
    </div>

    <!-- Code Tabs -->
    <EffectsCodeTabs :code="effect.code" />
  </div>
</template>
