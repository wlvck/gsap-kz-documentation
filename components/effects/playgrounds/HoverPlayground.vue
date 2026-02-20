<script setup lang="ts">
import gsap from "gsap";
import type { Effect } from "~/types/effects";

const props = defineProps<{
  effect: Effect;
}>();

const elementRef = ref<HTMLElement | null>(null);
const rippleRef = ref<HTMLElement | null>(null);
const shineRef = ref<HTMLElement | null>(null);
const lineRef = ref<HTMLElement | null>(null);
const bgRef = ref<HTMLElement | null>(null);
const borderRef = ref<HTMLElement | null>(null);
const iconRef = ref<HTMLElement | null>(null);
const line1Ref = ref<HTMLElement | null>(null);
const line2Ref = ref<HTMLElement | null>(null);
const line3Ref = ref<HTMLElement | null>(null);
const checkRef = ref<HTMLElement | null>(null);

// State for stateful buttons
const loading = ref(false);
const success = ref(false);
const error = ref(false);
const isMenuOpen = ref(false);

// Generic hover effect handlers
const handlers: Record<
  string,
  {
    onEnter?: (e: MouseEvent) => void;
    onLeave?: (e: MouseEvent) => void;
    onMove?: (e: MouseEvent) => void;
    onClick?: (e: MouseEvent) => void;
    onDown?: (e: MouseEvent) => void;
    onUp?: (e: MouseEvent) => void;
  }
> = {
  // Button effects
  "btn-scale": {
    onEnter: () => {
      gsap.to(elementRef.value, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    onLeave: () => {
      gsap.to(elementRef.value, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    },
  },
  "btn-ripple": {
    onClick: (e: MouseEvent) => {
      if (!elementRef.value || !rippleRef.value) return;
      const rect = elementRef.value.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.set(rippleRef.value, {
        left: x,
        top: y,
        scale: 0,
        opacity: 1,
        xPercent: -50,
        yPercent: -50,
      });

      gsap.to(rippleRef.value, {
        scale: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    },
  },
  "btn-magnetic": {
    onMove: (e: MouseEvent) => {
      if (!elementRef.value) return;
      const rect = elementRef.value.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(elementRef.value, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    onLeave: () => {
      gsap.to(elementRef.value, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    },
  },
  "btn-shine": {
    onEnter: () => {
      if (!shineRef.value) return;
      gsap.fromTo(
        shineRef.value,
        { xPercent: -100 },
        {
          xPercent: 100,
          duration: 0.6,
          ease: "power2.inOut",
        }
      );
    },
  },
  "btn-3d-press": {
    onDown: () => {
      gsap.to(elementRef.value, {
        scale: 0.95,
        rotateX: 10,
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        duration: 0.1,
        ease: "power2.out",
      });
    },
    onUp: () => {
      gsap.to(elementRef.value, {
        scale: 1,
        rotateX: 0,
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        duration: 0.3,
        ease: "elastic.out(1, 0.5)",
      });
    },
  },
  // Card effects (for future use)
  "card-lift": {
    onEnter: () => {
      gsap.to(elementRef.value, {
        y: -10,
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        duration: 0.3,
        ease: "power2.out",
      });
    },
    onLeave: () => {
      gsap.to(elementRef.value, {
        y: 0,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        duration: 0.3,
        ease: "power2.out",
      });
    },
  },
  "card-tilt": {
    onMove: (e: MouseEvent) => {
      if (!elementRef.value) return;
      const rect = elementRef.value.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

      gsap.to(elementRef.value, {
        rotateX: y * -15,
        rotateY: x * 15,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    onLeave: () => {
      gsap.to(elementRef.value, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    },
  },
  // Text hover effects
  "hover-underline": {
    onEnter: () => {
      if (!lineRef.value) return;
      gsap.to(lineRef.value, {
        scaleX: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    onLeave: () => {
      if (!lineRef.value) return;
      gsap.to(lineRef.value, {
        scaleX: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    },
  },
  // New button effects
  "btn-bg-slide": {
    onEnter: () => {
      if (!bgRef.value) return;
      gsap.to(bgRef.value, {
        xPercent: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    onLeave: () => {
      if (!bgRef.value) return;
      gsap.to(bgRef.value, {
        xPercent: 100,
        duration: 0.3,
        ease: "power2.in",
      });
    },
  },
  "btn-border": {
    onEnter: () => {
      if (!borderRef.value) return;
      gsap.to(borderRef.value, {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.4,
        ease: "power2.out",
      });
    },
    onLeave: () => {
      if (!borderRef.value) return;
      gsap.to(borderRef.value, {
        clipPath: "inset(0 100% 0 0)",
        duration: 0.4,
        ease: "power2.in",
      });
    },
  },
  "btn-click": {
    onClick: () => {
      gsap
        .timeline()
        .to(elementRef.value, {
          scale: 0.9,
          duration: 0.1,
          ease: "power2.in",
        })
        .to(elementRef.value, {
          scale: 1,
          duration: 0.4,
          ease: "elastic.out(1, 0.4)",
        });
    },
  },
  "btn-loading": {
    onClick: () => {
      loading.value = true;
      const spinner = elementRef.value?.querySelector(".spinner-icon");
      if (spinner) {
        gsap.to(spinner, {
          rotation: 360 * 3,
          duration: 2,
          ease: "none",
          onComplete: () => {
            loading.value = false;
            gsap.set(spinner, { rotation: 0 });
          },
        });
      }
    },
  },
  "btn-success": {
    onClick: () => {
      success.value = true;
      nextTick(() => {
        if (checkRef.value) {
          gsap.fromTo(
            checkRef.value,
            { scale: 0, rotation: -180 },
            {
              scale: 1,
              rotation: 0,
              duration: 0.5,
              ease: "back.out(1.7)",
              onComplete: () => {
                setTimeout(() => {
                  success.value = false;
                }, 1500);
              },
            }
          );
        }
      });
    },
  },
  "btn-error": {
    onClick: () => {
      error.value = true;
      gsap.to(elementRef.value, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          setTimeout(() => {
            error.value = false;
          }, 1500);
        },
      });
    },
  },
  "btn-icon-rotate": {
    onEnter: () => {
      if (!iconRef.value) return;
      gsap.to(iconRef.value, {
        rotation: 360,
        duration: 0.5,
        ease: "power2.out",
      });
    },
    onLeave: () => {
      if (!iconRef.value) return;
      gsap.to(iconRef.value, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    },
  },
  "btn-icon-morph": {
    onClick: () => {
      isMenuOpen.value = !isMenuOpen.value;
      if (isMenuOpen.value) {
        gsap.to(line1Ref.value, { y: 8, rotation: 45, duration: 0.3 });
        gsap.to(line2Ref.value, { opacity: 0, duration: 0.2 });
        gsap.to(line3Ref.value, { y: -8, rotation: -45, duration: 0.3 });
      } else {
        gsap.to(line1Ref.value, { y: 0, rotation: 0, duration: 0.3 });
        gsap.to(line2Ref.value, { opacity: 1, duration: 0.2 });
        gsap.to(line3Ref.value, { y: 0, rotation: 0, duration: 0.3 });
      }
    },
  },
  "btn-icon-bounce": {
    onEnter: () => {
      if (!iconRef.value) return;
      gsap.to(iconRef.value, {
        y: [0, 5, 0, 3, 0],
        duration: 0.6,
        ease: "power2.out",
      });
    },
  },
};

const currentHandlers = computed(() => handlers[props.effect.id] || handlers["btn-scale"]);

const onMouseEnter = (e: MouseEvent) => currentHandlers.value.onEnter?.(e);
const onMouseLeave = (e: MouseEvent) => {
  currentHandlers.value.onLeave?.(e);
  currentHandlers.value.onUp?.(e);
};
const onMouseMove = (e: MouseEvent) => currentHandlers.value.onMove?.(e);
const onClick = (e: MouseEvent) => currentHandlers.value.onClick?.(e);
const onMouseDown = (e: MouseEvent) => currentHandlers.value.onDown?.(e);
const onMouseUp = (e: MouseEvent) => currentHandlers.value.onUp?.(e);

// Determine element type and styles based on effect category
const isButton = computed(() => props.effect.category === "button");
const isCard = computed(() => props.effect.category === "card");
const isTextLink = computed(() => props.effect.id === "hover-underline");

// Get instruction text based on effect
const instruction = computed(() => {
  switch (props.effect.id) {
    case "btn-scale":
      return "Батырмаға hover жасаңыз";
    case "btn-ripple":
      return "Батырманы басыңыз";
    case "btn-magnetic":
      return "Курсорды батырма айналасында қозғаңыз";
    case "btn-shine":
      return "Батырмаға hover жасаңыз";
    case "btn-3d-press":
      return "Батырманы басып ұстаңыз";
    case "btn-bg-slide":
      return "Батырмаға hover жасаңыз";
    case "btn-border":
      return "Батырмаға hover жасаңыз";
    case "btn-click":
      return "Батырманы басыңыз";
    case "btn-loading":
      return "Батырманы басыңыз - жүктелу анимациясы";
    case "btn-success":
      return "Батырманы басыңыз - сәтті орындалу";
    case "btn-error":
      return "Батырманы басыңыз - қате анимациясы";
    case "btn-icon-rotate":
      return "Батырмаға hover жасаңыз - иконка айналады";
    case "btn-icon-morph":
      return "Батырманы басыңыз - иконка өзгереді";
    case "btn-icon-bounce":
      return "Батырмаға hover жасаңыз - иконка секіреді";
    case "card-lift":
      return "Карточкаға hover жасаңыз";
    case "card-tilt":
      return "Курсорды карточка үстінде қозғаңыз";
    case "hover-underline":
      return "Мәтінге hover жасаңыз";
    default:
      return "Элементке hover жасаңыз";
  }
});

// Determine which special elements are needed
const needsBgSlide = computed(() => props.effect.id === "btn-bg-slide");
const needsBorder = computed(() => props.effect.id === "btn-border");
const needsIcon = computed(() => ["btn-icon-rotate", "btn-icon-bounce"].includes(props.effect.id));
const needsIconMorph = computed(() => props.effect.id === "btn-icon-morph");
const isLoadingBtn = computed(() => props.effect.id === "btn-loading");
const isSuccessBtn = computed(() => props.effect.id === "btn-success");
const isErrorBtn = computed(() => props.effect.id === "btn-error");
</script>

<template>
  <div class="rounded-xl border border-gsap-border overflow-hidden bg-gsap-bg-secondary">
    <!-- Demo Area -->
    <div
      class="relative min-h-[300px] md:min-h-[400px] flex flex-col items-center justify-center p-8 bg-gsap-bg-tertiary"
    >
      <!-- Grid Background -->
      <div
        class="absolute inset-0 opacity-10"
        style="
          background-image:
            linear-gradient(#2a2d2b 1px, transparent 1px),
            linear-gradient(90deg, #2a2d2b 1px, transparent 1px);
          background-size: 20px 20px;
        "
      />

      <!-- Button Element -->
      <button
        v-if="isButton"
        ref="elementRef"
        type="button"
        class="relative overflow-hidden px-8 py-4 font-bold rounded-xl text-lg shadow-lg"
        :class="[
          needsBgSlide || needsBorder
            ? 'bg-transparent text-gsap-text-primary border-2 border-gsap-green'
            : isErrorBtn && error
              ? 'bg-red-500 text-white'
              : isSuccessBtn && success
                ? 'bg-green-600 text-white'
                : 'bg-gsap-green text-black',
        ]"
        :style="{
          transformStyle: effect.id === 'btn-3d-press' ? 'preserve-3d' : undefined,
          perspective: effect.id === 'btn-3d-press' ? '500px' : undefined,
        }"
        :disabled="isLoadingBtn && loading"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @mousemove="onMouseMove"
        @click="onClick"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp"
      >
        <!-- Ripple element -->
        <span
          v-if="effect.id === 'btn-ripple'"
          ref="rippleRef"
          class="absolute w-4 h-4 bg-white/40 rounded-full pointer-events-none"
          style="opacity: 0"
        />

        <!-- Shine element -->
        <span
          v-if="effect.id === 'btn-shine'"
          ref="shineRef"
          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
          style="transform: translateX(-100%)"
        />

        <!-- Background slide element -->
        <span
          v-if="needsBgSlide"
          ref="bgRef"
          class="absolute inset-0 bg-gsap-green pointer-events-none"
          style="transform: translateX(-100%)"
        />

        <!-- Border animation element -->
        <span
          v-if="needsBorder"
          ref="borderRef"
          class="absolute inset-0 border-2 border-gsap-green rounded-xl pointer-events-none"
          style="clip-path: inset(0 100% 0 0)"
        />

        <!-- Icon for icon effects -->
        <span v-if="needsIcon" class="flex items-center gap-2">
          <span ref="iconRef" class="text-xl">{{
            effect.id === "btn-icon-rotate" ? "↻" : "↓"
          }}</span>
          <span class="relative z-10">{{ effect.defaultText }}</span>
        </span>

        <!-- Icon morph (hamburger to X) -->
        <span v-else-if="needsIconMorph" class="flex items-center gap-2">
          <span class="relative w-6 h-6">
            <span ref="line1Ref" class="absolute w-6 h-0.5 bg-current top-1 left-0" />
            <span
              ref="line2Ref"
              class="absolute w-6 h-0.5 bg-current top-1/2 -translate-y-1/2 left-0"
            />
            <span ref="line3Ref" class="absolute w-6 h-0.5 bg-current bottom-1 left-0" />
          </span>
          <span class="relative z-10">{{ effect.defaultText }}</span>
        </span>

        <!-- Loading button -->
        <span v-else-if="isLoadingBtn" class="relative min-w-[100px]">
          <span :class="{ 'opacity-0': loading }">{{ effect.defaultText }}</span>
          <span v-if="loading" class="absolute inset-0 flex items-center justify-center">
            <span
              class="spinner-icon w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
            />
          </span>
        </span>

        <!-- Success button -->
        <span v-else-if="isSuccessBtn" class="relative min-w-[100px]">
          <span :class="{ 'opacity-0': success }">{{ effect.defaultText }}</span>
          <span
            v-if="success"
            ref="checkRef"
            class="absolute inset-0 flex items-center justify-center text-2xl"
          >
            ✓
          </span>
        </span>

        <!-- Error button -->
        <span v-else-if="isErrorBtn">
          {{ error ? "Қате!" : effect.defaultText }}
        </span>

        <!-- Default text -->
        <span v-else class="relative z-10">{{ effect.defaultText }}</span>
      </button>

      <!-- Text Link Element (hover-underline) -->
      <a
        v-else-if="isTextLink"
        ref="elementRef"
        href="#"
        class="relative text-3xl md:text-4xl font-bold text-gsap-text-primary inline-block cursor-pointer"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @click.prevent
      >
        {{ effect.defaultText }}
        <span
          ref="lineRef"
          class="absolute bottom-0 left-0 w-full h-1 bg-gsap-green origin-left"
          style="transform: scaleX(0)"
        />
      </a>

      <!-- Card Element -->
      <div
        v-else-if="isCard"
        ref="elementRef"
        class="relative w-64 h-40 bg-gsap-bg-secondary rounded-xl shadow-lg flex items-center justify-center cursor-pointer"
        :style="{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @mousemove="onMouseMove"
      >
        <span class="text-gsap-text-primary font-bold text-xl">{{ effect.defaultText }}</span>
      </div>

      <!-- Generic Element (fallback) -->
      <div
        v-else
        ref="elementRef"
        class="relative px-8 py-6 bg-gsap-green text-black font-bold rounded-xl text-xl shadow-lg cursor-pointer"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @mousemove="onMouseMove"
        @click="onClick"
      >
        {{ effect.defaultText }}
      </div>

      <!-- Instruction -->
      <p class="mt-6 text-gsap-text-muted text-sm">
        {{ instruction }}
      </p>
    </div>

    <!-- Code Tabs -->
    <EffectsCodeTabs :code="effect.code" />
  </div>
</template>
