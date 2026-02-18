<script setup lang="ts">
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const route = useRoute();

const navigation = [
  {
    title: "Кіріспе",
    items: [
      { title: "GSAP деген не?", to: "/docs/kirisspe/gsap-degen-ne" },
      { title: "Орнату", to: "/docs/kirisspe/ornatu" },
      { title: "Алғашқы анимация", to: "/docs/kirisspe/algashky-animatsiya" },
      { title: "Неге GSAP?", to: "/docs/kirisspe/nege-gsap" },
    ],
  },
  {
    title: "Негіздер",
    items: [
      { title: "gsap.to()", to: "/docs/negizderi/gsap-to" },
      { title: "gsap.from()", to: "/docs/negizderi/gsap-from" },
      { title: "gsap.fromTo()", to: "/docs/negizderi/gsap-fromto" },
      { title: "Қасиеттер", to: "/docs/negizderi/kasietter" },
      { title: "Callbacks", to: "/docs/negizderi/callbacks" },
    ],
  },
  {
    title: "Easing",
    items: [
      { title: "Easing негіздері", to: "/docs/easing/negizderi" },
      { title: "Ease түрлері", to: "/docs/easing/turleri" },
      { title: "Custom Ease", to: "/docs/easing/custom" },
    ],
  },
  {
    title: "Timeline",
    items: [
      { title: "Timeline негіздері", to: "/docs/timeline/negizderi" },
      { title: "Position параметрі", to: "/docs/timeline/position" },
      { title: "Timeline басқару", to: "/docs/timeline/baskaru" },
    ],
  },
  {
    title: "ScrollTrigger",
    items: [
      { title: "Кіріспе", to: "/docs/scrolltrigger/kirisspe" },
      { title: "Негізгі параметрлер", to: "/docs/scrolltrigger/parametrler" },
      { title: "Pin эффектісі", to: "/docs/scrolltrigger/pin" },
      { title: "Scrub анимация", to: "/docs/scrolltrigger/scrub" },
    ],
  },
];

const isActive = (path: string) => route.path === path;
</script>

<template>
  <!-- Backdrop -->
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 z-30 lg:hidden" @click="emit('close')" />

  <!-- Sidebar -->
  <aside
    :class="[
      'fixed top-0 left-0 z-40 h-full w-72 bg-gsap-bg-secondary border-r border-gsap-border',
      'transform transition-transform duration-300 ease-in-out',
      'lg:translate-x-0',
      isOpen ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <!-- Logo -->
    <div class="flex items-center gap-3 px-6 py-6 border-b border-gsap-border">
      <div class="w-10 h-10 rounded-lg bg-gsap-green flex items-center justify-center">
        <span class="text-gsap-bg-primary font-bold text-lg">G</span>
      </div>
      <div>
        <h1 class="text-gsap-text-primary font-semibold">GSAP</h1>
        <p class="text-xs text-gsap-text-secondary">Қазақша құжаттама</p>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="px-4 py-6 overflow-y-auto h-[calc(100%-88px)]">
      <div v-for="group in navigation" :key="group.title" class="mb-6">
        <h2 class="px-2 mb-2 text-xs font-semibold text-gsap-text-muted uppercase tracking-wider">
          {{ group.title }}
        </h2>
        <ul class="space-y-1">
          <li v-for="item in group.items" :key="item.to">
            <NuxtLink
              :to="item.to"
              :class="[
                'block px-3 py-2 rounded-lg text-sm transition-colors',
                isActive(item.to)
                  ? 'bg-gsap-green/10 text-gsap-green'
                  : 'text-gsap-text-secondary hover:text-gsap-text-primary hover:bg-gsap-bg-tertiary',
              ]"
              @click="emit('close')"
            >
              {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>
