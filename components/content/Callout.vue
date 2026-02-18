<script setup lang="ts">
defineProps<{
  type?: "tip" | "warning" | "info" | "danger";
  title?: string;
}>();

const icons = {
  tip: "💡",
  warning: "⚠️",
  info: "ℹ️",
  danger: "🚨",
};

const colors = {
  tip: "border-gsap-green bg-gsap-green/10",
  warning: "border-yellow-500 bg-yellow-500/10",
  info: "border-blue-500 bg-blue-500/10",
  danger: "border-red-500 bg-red-500/10",
};

const titleColors = {
  tip: "text-gsap-green",
  warning: "text-yellow-500",
  info: "text-blue-500",
  danger: "text-red-500",
};
</script>

<template>
  <div :class="['my-6 rounded-lg border-l-4 p-4', colors[type || 'info']]">
    <div
      v-if="title"
      :class="['flex items-center gap-2 font-semibold mb-2', titleColors[type || 'info']]"
    >
      <span>{{ icons[type || "info"] }}</span>
      <span>{{ title }}</span>
    </div>
    <div class="text-gsap-text-secondary text-sm">
      <slot />
    </div>
  </div>
</template>
