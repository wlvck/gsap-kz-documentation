<script setup lang="ts">
const props = defineProps<{
  text: string;
  isPlaying: boolean;
  defaultText: string;
}>();

const emit = defineEmits<{
  "update:text": [value: string];
  play: [];
  reset: [];
}>();

const localText = computed({
  get: () => props.text,
  set: (value: string) => emit("update:text", value),
});

const resetText = () => {
  localText.value = props.defaultText;
};
</script>

<template>
  <div class="p-4 md:p-6 border-t border-gsap-border bg-gsap-bg-secondary">
    <div class="flex flex-col sm:flex-row gap-4">
      <!-- Text Input -->
      <div class="flex-1">
        <label class="block text-sm font-medium text-gsap-text-muted mb-2"> Мәтін </label>
        <div class="flex gap-2">
          <input
            v-model="localText"
            type="text"
            placeholder="Мәтін жазыңыз..."
            class="flex-1 px-4 py-2.5 rounded-lg bg-gsap-bg-tertiary border border-gsap-border text-gsap-text-primary placeholder-gsap-text-muted focus:outline-none focus:border-gsap-green/50 focus:ring-1 focus:ring-gsap-green/50 transition-colors"
          />
          <button
            type="button"
            class="px-3 py-2.5 rounded-lg bg-gsap-bg-tertiary border border-gsap-border text-gsap-text-muted hover:text-gsap-text-primary hover:border-gsap-text-muted/30 transition-colors"
            title="Әдепкі мәтін"
            @click="resetText"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-2 sm:items-end">
        <button
          type="button"
          :disabled="isPlaying"
          :class="[
            'flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all',
            isPlaying
              ? 'bg-gsap-green/50 text-gsap-bg-primary cursor-not-allowed'
              : 'bg-gsap-green text-gsap-bg-primary hover:bg-gsap-green-dark',
          ]"
          @click="$emit('play')"
        >
          <svg v-if="!isPlaying" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          <svg v-else class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span>{{ isPlaying ? "Ойнауда..." : "Ойнату" }}</span>
        </button>

        <button
          type="button"
          class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium bg-gsap-bg-tertiary border border-gsap-border text-gsap-text-primary hover:border-gsap-text-muted/30 transition-colors"
          @click="$emit('reset')"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span class="hidden sm:inline">Қайта орнату</span>
        </button>
      </div>
    </div>
  </div>
</template>
