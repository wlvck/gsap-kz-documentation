<script setup lang="ts">
defineProps<{
  filename?: string;
  language?: string;
}>();

const copied = ref(false);

const copyCode = async () => {
  const codeEl = document.querySelector(".code-content code");
  if (codeEl) {
    await navigator.clipboard.writeText(codeEl.textContent || "");
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  }
};
</script>

<template>
  <div
    class="relative my-6 rounded-xl overflow-hidden bg-gsap-bg-secondary border border-gsap-border"
  >
    <!-- Header -->
    <div
      v-if="filename || language"
      class="flex items-center justify-between px-4 py-2 bg-gsap-bg-tertiary border-b border-gsap-border"
    >
      <span v-if="filename" class="text-sm text-gsap-text-secondary font-mono">
        {{ filename }}
      </span>
      <span v-else-if="language" class="text-xs text-gsap-text-muted uppercase">
        {{ language }}
      </span>
      <button
        class="text-gsap-text-muted hover:text-gsap-text-primary transition-colors text-sm"
        @click="copyCode"
      >
        {{ copied ? "Көшірілді!" : "Көшіру" }}
      </button>
    </div>

    <!-- Code -->
    <div class="code-content p-4 overflow-x-auto">
      <slot />
    </div>
  </div>
</template>
