<script setup lang="ts">
import gsap from "gsap";
import type { Effect } from "~/types/effects";

const props = defineProps<{
  effect: Effect;
}>();

const elementRef = ref<HTMLElement | null>(null);
const rippleRef = ref<HTMLElement | null>(null);
const shineRef = ref<HTMLElement | null>(null);

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
    case "card-lift":
      return "Карточкаға hover жасаңыз";
    case "card-tilt":
      return "Курсорды карточка үстінде қозғаңыз";
    default:
      return "Элементке hover жасаңыз";
  }
});
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
        class="relative overflow-hidden px-8 py-4 bg-gsap-green text-black font-bold rounded-xl text-lg shadow-lg"
        :style="{
          transformStyle: effect.id === 'btn-3d-press' ? 'preserve-3d' : undefined,
          perspective: effect.id === 'btn-3d-press' ? '500px' : undefined,
        }"
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

        <span class="relative z-10">{{ effect.defaultText }}</span>
      </button>

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
