<script setup lang="ts">
import gsap from "gsap";
import type { Effect } from "~/types/effects";

const props = defineProps<{
  effect: Effect;
}>();

// State
const text = ref(props.effect.defaultText);
const textRef = ref<HTMLElement | null>(null);
const charRefs = ref<(HTMLElement | null)[]>([]);
const wordRefs = ref<(HTMLElement | null)[]>([]);
const lineRefs = ref<(HTMLElement | null)[]>([]);
const isPlaying = ref(false);

// Computed for different split modes
const chars = computed(() => text.value.split(""));
const words = computed(() => text.value.split(" "));
const lines = computed(() => text.value.split("\n"));

// Determine which split mode to use
const needsCharSplit = computed(() =>
  ["chars-fade", "chars-slide", "chars-random"].includes(props.effect.id)
);
const needsWordSplit = computed(() => ["words-fade", "words-slide"].includes(props.effect.id));

// Animation functions for text effects
const animations: Record<string, () => void> = {
  "fade-in": () => {
    gsap.fromTo(
      textRef.value,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out", onComplete: () => (isPlaying.value = false) }
    );
  },
  "fade-in-up": () => {
    gsap.fromTo(
      textRef.value,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        onComplete: () => (isPlaying.value = false),
      }
    );
  },
  "fade-in-down": () => {
    gsap.fromTo(
      textRef.value,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        onComplete: () => (isPlaying.value = false),
      }
    );
  },
  "fade-in-left": () => {
    gsap.fromTo(
      textRef.value,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        onComplete: () => (isPlaying.value = false),
      }
    );
  },
  "fade-in-right": () => {
    gsap.fromTo(
      textRef.value,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        onComplete: () => (isPlaying.value = false),
      }
    );
  },
  "scale-in": () => {
    gsap.fromTo(
      textRef.value,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        onComplete: () => (isPlaying.value = false),
      }
    );
  },
  "rotate-in": () => {
    gsap.fromTo(
      textRef.value,
      { opacity: 0, rotation: -180, scale: 0.5 },
      {
        opacity: 1,
        rotation: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        onComplete: () => (isPlaying.value = false),
      }
    );
  },
  "chars-fade": () => {
    const validRefs = charRefs.value.filter(Boolean);
    gsap.fromTo(
      validRefs,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
        onComplete: () => (isPlaying.value = false),
      }
    );
  },
  "chars-slide": () => {
    const validRefs = charRefs.value.filter(Boolean);
    gsap.fromTo(
      validRefs,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.6,
        stagger: 0.03,
        ease: "power3.out",
        onComplete: () => (isPlaying.value = false),
      }
    );
  },
  typewriter: () => {
    const fullText = text.value;
    const obj = { length: 0 };
    gsap.to(obj, {
      length: fullText.length,
      duration: fullText.length * 0.08,
      ease: "none",
      onUpdate: () => {
        if (textRef.value) {
          textRef.value.textContent = fullText.slice(0, Math.round(obj.length));
        }
      },
      onComplete: () => {
        if (textRef.value) textRef.value.textContent = fullText;
        isPlaying.value = false;
      },
    });
  },
  glitch: () => {
    const tl = gsap.timeline({
      repeat: 2,
      onComplete: () => (isPlaying.value = false),
    });
    tl.to(textRef.value, { x: -3, duration: 0.1, ease: "power1.inOut" })
      .to(textRef.value, { x: 3, duration: 0.1, ease: "power1.inOut" })
      .to(textRef.value, { x: 0, duration: 0.1 })
      .to(textRef.value, { x: 2, skewX: 10, duration: 0.05 })
      .to(textRef.value, { x: 0, skewX: 0, duration: 0.05 });
  },
  counter: () => {
    const target = parseInt(text.value) || 1000;
    const obj = { value: 0 };
    gsap.to(obj, {
      value: target,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        if (textRef.value) {
          textRef.value.textContent = Math.round(obj.value).toString();
        }
      },
      onComplete: () => (isPlaying.value = false),
    });
  },
  "bounce-in": () => {
    gsap.fromTo(
      textRef.value,
      { opacity: 0, scale: 0.3, y: -100 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "bounce.out",
        onComplete: () => (isPlaying.value = false),
      }
    );
  },
  "elastic-in": () => {
    gsap.fromTo(
      textRef.value,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
        onComplete: () => (isPlaying.value = false),
      }
    );
  },
  "blur-in": () => {
    gsap.fromTo(
      textRef.value,
      { opacity: 0, filter: "blur(20px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        onComplete: () => (isPlaying.value = false),
      }
    );
  },
  "flip-in": () => {
    gsap.fromTo(
      textRef.value,
      { opacity: 0, rotationX: -90 },
      {
        opacity: 1,
        rotationX: 0,
        duration: 1,
        ease: "power3.out",
        onComplete: () => (isPlaying.value = false),
      }
    );
  },
  "text-scramble": () => {
    const finalText = text.value;
    const chars = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789!@#$%^&*";
    let iteration = 0;

    const interval = setInterval(() => {
      if (textRef.value) {
        textRef.value.textContent = finalText
          .split("")
          .map((char, i) => {
            if (i < iteration) return finalText[i];
            if (char === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
      }

      if (iteration >= finalText.length) {
        clearInterval(interval);
        if (textRef.value) textRef.value.textContent = finalText;
        isPlaying.value = false;
      }

      iteration += 1 / 3;
    }, 30);
  },
  "chars-random": () => {
    const validRefs = charRefs.value.filter(Boolean);
    // Shuffle indices for random order
    const indices = validRefs.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // Animate in random order
    indices.forEach((index, i) => {
      gsap.fromTo(
        validRefs[index],
        { opacity: 0, scale: 0, rotation: Math.random() * 360 - 180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.4,
          delay: i * 0.05,
          ease: "back.out(1.7)",
          onComplete: i === indices.length - 1 ? () => (isPlaying.value = false) : undefined,
        }
      );
    });
  },
  "words-fade": () => {
    const validRefs = wordRefs.value.filter(Boolean);
    gsap.fromTo(
      validRefs,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        onComplete: () => (isPlaying.value = false),
      }
    );
  },
  "words-slide": () => {
    const validRefs = wordRefs.value.filter(Boolean);
    gsap.fromTo(
      validRefs,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        onComplete: () => (isPlaying.value = false),
      }
    );
  },
  "lines-reveal": () => {
    const validRefs = lineRefs.value.filter(Boolean);
    gsap.fromTo(
      validRefs,
      { y: "100%" },
      {
        y: "0%",
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        onComplete: () => (isPlaying.value = false),
      }
    );
  },
  "lines-mask": () => {
    const validRefs = lineRefs.value.filter(Boolean);
    gsap.fromTo(
      validRefs,
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 1,
        stagger: 0.3,
        ease: "power3.inOut",
        onComplete: () => (isPlaying.value = false),
      }
    );
  },
};

const play = () => {
  if (isPlaying.value) return;
  isPlaying.value = true;

  // Reset first
  reset();

  // Wait for next tick to ensure reset is applied
  nextTick(() => {
    const animFn = animations[props.effect.id] || animations["fade-in"];
    animFn();
  });
};

const reset = () => {
  if (textRef.value) {
    gsap.killTweensOf(textRef.value);
    gsap.set(textRef.value, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotation: 0,
      rotationX: 0,
      skewX: 0,
      filter: "blur(0px)",
      clearProps: "all",
    });
    // Reset text content for typewriter/counter
    if (["typewriter", "counter"].includes(props.effect.id)) {
      textRef.value.textContent = text.value;
    }
  }

  if (charRefs.value.length > 0) {
    const validRefs = charRefs.value.filter(Boolean);
    gsap.killTweensOf(validRefs);
    gsap.set(validRefs, { opacity: 1, y: 0, scale: 1, rotation: 0, clearProps: "all" });
  }

  if (wordRefs.value.length > 0) {
    const validRefs = wordRefs.value.filter(Boolean);
    gsap.killTweensOf(validRefs);
    gsap.set(validRefs, { opacity: 1, y: 0, clearProps: "all" });
  }

  if (lineRefs.value.length > 0) {
    const validRefs = lineRefs.value.filter(Boolean);
    gsap.killTweensOf(validRefs);
    gsap.set(validRefs, { y: 0, clipPath: "inset(0 0% 0 0)", clearProps: "all" });
  }

  isPlaying.value = false;
};

// Watch for effect changes
watch(
  () => props.effect,
  () => {
    text.value = props.effect.defaultText;
    reset();
  }
);

// Play on mount
onMounted(() => {
  setTimeout(() => {
    play();
  }, 300);
});
</script>

<template>
  <div class="rounded-xl border border-gsap-border overflow-hidden bg-gsap-bg-secondary">
    <!-- Demo Area -->
    <div
      class="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center p-8 bg-gsap-bg-tertiary"
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

      <!-- Character-based text (chars-fade, chars-slide, chars-random) -->
      <div
        v-if="needsCharSplit"
        class="relative text-3xl md:text-4xl lg:text-5xl font-bold text-gsap-text-primary text-center px-4 flex flex-wrap justify-center"
        :class="{ 'overflow-hidden': effect.id === 'chars-slide' }"
      >
        <span
          v-for="(char, i) in chars"
          :key="i"
          :ref="(el) => (charRefs[i] = el as HTMLElement)"
          class="inline-block"
        >
          {{ char === " " ? "\u00A0" : char }}
        </span>
      </div>

      <!-- Line-based text (lines-reveal) - with overflow mask -->
      <div v-else-if="effect.id === 'lines-reveal'" class="relative text-center px-4 space-y-2">
        <div v-for="(line, i) in lines" :key="i" class="overflow-hidden">
          <div
            :ref="(el) => (lineRefs[i] = el as HTMLElement)"
            class="text-3xl md:text-4xl lg:text-5xl font-bold text-gsap-text-primary"
          >
            {{ line }}
          </div>
        </div>
      </div>

      <!-- Line-based text (lines-mask) - with clipPath -->
      <div v-else-if="effect.id === 'lines-mask'" class="relative text-center px-4 space-y-2">
        <div
          v-for="(line, i) in lines"
          :key="i"
          :ref="(el) => (lineRefs[i] = el as HTMLElement)"
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-gsap-text-primary"
          style="clip-path: inset(0 100% 0 0)"
        >
          {{ line }}
        </div>
      </div>

      <!-- Word-based text (words-fade, words-slide) -->
      <div
        v-else-if="needsWordSplit"
        class="relative text-3xl md:text-4xl lg:text-5xl font-bold text-gsap-text-primary text-center px-4 flex flex-wrap justify-center gap-3"
        :class="{ 'overflow-hidden': effect.id === 'words-slide' }"
      >
        <span
          v-for="(word, i) in words"
          :key="i"
          :ref="(el) => (wordRefs[i] = el as HTMLElement)"
          class="inline-block"
        >
          {{ word }}
        </span>
      </div>

      <!-- Regular text -->
      <div
        v-else
        ref="textRef"
        class="relative text-3xl md:text-4xl lg:text-5xl font-bold text-gsap-text-primary text-center px-4"
        :class="{
          'font-mono': effect.id === 'typewriter',
          'tabular-nums': effect.id === 'counter',
        }"
        :style="{
          perspective: effect.id === 'flip-in' ? '1000px' : undefined,
          transformStyle: effect.id === 'flip-in' ? 'preserve-3d' : undefined,
        }"
      >
        {{ text }}
      </div>

      <!-- Typewriter cursor -->
      <span
        v-if="effect.id === 'typewriter' && isPlaying"
        class="text-3xl md:text-4xl lg:text-5xl font-bold text-gsap-green animate-blink"
      >
        |
      </span>
    </div>

    <!-- Controls -->
    <EffectsEffectControls
      v-model:text="text"
      :is-playing="isPlaying"
      :default-text="effect.defaultText"
      @play="play"
      @reset="reset"
    />

    <!-- Code Tabs -->
    <EffectsCodeTabs :code="effect.code" />
  </div>
</template>

<style scoped>
@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

.animate-blink {
  animation: blink 1s infinite;
}
</style>
