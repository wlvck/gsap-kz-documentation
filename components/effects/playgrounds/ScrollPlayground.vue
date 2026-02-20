<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Effect } from "~/types/effects";

// Register plugin once at module level
gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  effect: Effect;
}>();

const containerRef = ref<HTMLElement | null>(null);
const elementRef = ref<HTMLElement | null>(null);
const progressRef = ref<HTMLElement | null>(null);

let scrollTriggerInstance: ScrollTrigger | null = null;
let animation: gsap.core.Tween | null = null;

const cleanupAnimations = () => {
  // Kill all ScrollTriggers associated with this container
  ScrollTrigger.getAll().forEach((st) => {
    if (st.scroller === containerRef.value) {
      st.kill();
    }
  });
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
    scrollTriggerInstance = null;
  }
  if (animation) {
    animation.kill();
    animation = null;
  }
};

const setupAnimation = () => {
  if (!containerRef.value || !elementRef.value) return;

  // Clean up previous animations
  cleanupAnimations();

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

    case "scroll-slide-left":
      animation = gsap.fromTo(
        elementRef.value,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
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

    case "scroll-slide-right":
      animation = gsap.fromTo(
        elementRef.value,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
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

    case "scroll-scale":
      animation = gsap.fromTo(
        elementRef.value,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
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

    case "scroll-rotate":
      animation = gsap.fromTo(
        elementRef.value,
        { opacity: 0, rotation: -90, scale: 0.8 },
        {
          opacity: 1,
          rotation: 0,
          scale: 1,
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

    case "parallax-multi":
      // Multiple elements with different parallax speeds
      animation = gsap.to(elementRef.value, {
        y: -80,
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

    case "parallax-bg":
      gsap.set(elementRef.value, {
        backgroundImage: "linear-gradient(135deg, #0ae448 0%, #0ba934 50%, #0ae448 100%)",
        backgroundSize: "100% 200%",
      });
      animation = gsap.to(elementRef.value, {
        backgroundPositionY: "100%",
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

    case "parallax-mouse":
      // Mouse parallax doesn't need ScrollTrigger, handled via template events
      break;

    case "pin-animation":
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: elementRef.value,
        scroller: containerRef.value,
        start: "top center",
        end: "+=300",
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          gsap.set(elementRef.value, {
            scale: 1 + self.progress * 0.5,
            rotation: self.progress * 360,
          });
        },
      });
      break;
  }

  // Refresh ScrollTrigger to recalculate positions
  ScrollTrigger.refresh();
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
  cleanupAnimations();
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
    case "scroll-slide-left":
      return "Скролл жасаңыз - элемент оңнан солға сырғиды";
    case "scroll-slide-right":
      return "Скролл жасаңыз - элемент солдан оңға сырғиды";
    case "scroll-scale":
      return "Скролл жасаңыз - элемент үлкейеді";
    case "scroll-rotate":
      return "Скролл жасаңыз - элемент айналады";
    case "parallax-simple":
      return "Скролл жасаңыз - параллакс эффектін көріңіз";
    case "parallax-multi":
      return "Скролл жасаңыз - көп қабатты параллакс";
    case "parallax-bg":
      return "Скролл жасаңыз - фон параллаксы";
    case "parallax-mouse":
      return "Тінтуірді элемент үстінде қозғаңыз";
    case "pin-simple":
      return "Скролл жасаңыз - элемент орнында тұрады";
    case "pin-animation":
      return "Скролл жасаңыз - бекітілген анимация";
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

// Mouse parallax handler for parallax-mouse effect
const onMouseMove = (e: MouseEvent) => {
  if (props.effect.id !== "parallax-mouse" || !elementRef.value || !containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();
  const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
  const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

  gsap.to(elementRef.value, {
    x: x * 30,
    y: y * 30,
    duration: 0.3,
    ease: "power2.out",
  });
};
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
        class="relative h-[400px] overflow-y-scroll isolate"
        style="
          overscroll-behavior: contain;
          background-color: #1c1e1d;
          background-image:
            linear-gradient(rgba(42, 45, 43, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(42, 45, 43, 0.3) 1px, transparent 1px);
          background-size: 20px 20px;
        "
        @mousemove="onMouseMove"
      >
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
