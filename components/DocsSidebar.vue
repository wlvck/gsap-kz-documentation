<script setup lang="ts">
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const route = useRoute();

interface NavItem {
  title: string;
  to: string;
}

interface NavGroup {
  title: string;
  key: string;
  items: NavItem[];
}

const navigation: NavGroup[] = [
  {
    title: "Кіріспе",
    key: "kirisspe",
    items: [
      { title: "GSAP деген не?", to: "/docs/kirisspe/gsap-degen-ne" },
      { title: "Орнату", to: "/docs/kirisspe/ornatu" },
      { title: "Алғашқы анимация", to: "/docs/kirisspe/algashky-animatsiya" },
      { title: "Неге GSAP?", to: "/docs/kirisspe/nege-gsap" },
    ],
  },
  {
    title: "Негіздер",
    key: "negizderi",
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
    key: "easing",
    items: [
      { title: "Easing негіздері", to: "/docs/easing/negizderi" },
      { title: "Ease түрлері", to: "/docs/easing/turleri" },
      { title: "Custom Ease", to: "/docs/easing/custom" },
    ],
  },
  {
    title: "Timeline",
    key: "timeline",
    items: [
      { title: "Timeline негіздері", to: "/docs/timeline/negizderi" },
      { title: "Position параметрі", to: "/docs/timeline/position" },
      { title: "Timeline басқару", to: "/docs/timeline/baskaru" },
    ],
  },
  {
    title: "ScrollTrigger",
    key: "scrolltrigger",
    items: [
      { title: "Кіріспе", to: "/docs/scrolltrigger/kirisspe" },
      { title: "Негізгі параметрлер", to: "/docs/scrolltrigger/parametrler" },
      { title: "Pin эффектісі", to: "/docs/scrolltrigger/pin" },
      { title: "Scrub анимация", to: "/docs/scrolltrigger/scrub" },
    ],
  },
  {
    title: "Плагиндер",
    key: "plaginder",
    items: [
      { title: "Плагиндер туралы", to: "/docs/plaginder/kirisspe" },
      { title: "Draggable", to: "/docs/plaginder/draggable" },
      { title: "Flip", to: "/docs/plaginder/flip" },
      { title: "MotionPath", to: "/docs/plaginder/motionpath" },
      { title: "TextPlugin", to: "/docs/plaginder/text" },
    ],
  },
  {
    title: "Утилиталар",
    key: "utilitalar",
    items: [
      { title: "gsap.utils", to: "/docs/utilitalar/utils" },
      { title: "gsap.context()", to: "/docs/utilitalar/context" },
      { title: "gsap.matchMedia()", to: "/docs/utilitalar/matchmedia" },
    ],
  },
  {
    title: "Фреймворктар",
    key: "freimworktar",
    items: [
      { title: "React", to: "/docs/freimworktar/react" },
      { title: "Vue", to: "/docs/freimworktar/vue" },
    ],
  },
];

// Track expanded groups
const expandedGroups = ref<Set<string>>(new Set());

// Check if group contains active page
const groupHasActivePage = (group: NavGroup) => {
  return group.items.some((item) => route.path === item.to);
};

// Initialize expanded state based on current route
const initExpandedState = () => {
  navigation.forEach((group) => {
    if (groupHasActivePage(group)) {
      expandedGroups.value.add(group.key);
    }
  });
};

// Toggle group expansion
const toggleGroup = (key: string) => {
  if (expandedGroups.value.has(key)) {
    expandedGroups.value.delete(key);
  } else {
    expandedGroups.value.add(key);
  }
};

const isExpanded = (key: string) => expandedGroups.value.has(key);

const isActive = (path: string) => route.path === path;

// Initialize on mount and watch route changes
onMounted(initExpandedState);

watch(
  () => route.path,
  () => {
    navigation.forEach((group) => {
      if (groupHasActivePage(group)) {
        expandedGroups.value.add(group.key);
      }
    });
  }
);
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
      <NuxtLink to="/" class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-gsap-green flex items-center justify-center">
          <span class="text-gsap-bg-primary font-bold text-lg">G</span>
        </div>
        <div>
          <h1 class="text-gsap-text-primary font-semibold">GSAP</h1>
          <p class="text-xs text-gsap-text-secondary">Қазақша құжаттама</p>
        </div>
      </NuxtLink>
    </div>

    <!-- Search -->
    <div class="px-4 py-4 border-b border-gsap-border">
      <DocsSearch />
    </div>

    <!-- Navigation -->
    <nav class="px-4 py-4 overflow-y-auto h-[calc(100%-88px-72px-60px)]">
      <div v-for="group in navigation" :key="group.key" class="mb-2">
        <!-- Group Header (Collapsible) -->
        <button
          :class="[
            'w-full flex items-center justify-between px-2 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors',
            groupHasActivePage(group)
              ? 'text-gsap-green'
              : 'text-gsap-text-muted hover:text-gsap-text-secondary hover:bg-gsap-bg-tertiary',
          ]"
          @click="toggleGroup(group.key)"
        >
          <span>{{ group.title }}</span>
          <svg
            :class="[
              'w-4 h-4 transition-transform duration-200',
              isExpanded(group.key) ? 'rotate-180' : '',
            ]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <!-- Group Items (Collapsible Content) -->
        <div
          :class="[
            'overflow-hidden transition-all duration-200',
            isExpanded(group.key) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
          ]"
        >
          <ul class="space-y-1 mt-1">
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
      </div>
    </nav>

    <!-- Footer -->
    <div
      class="absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-gsap-border bg-gsap-bg-secondary"
    >
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 text-sm text-gsap-text-muted hover:text-gsap-text-primary transition-colors"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
          />
        </svg>
        <span>GitHub</span>
      </a>
    </div>
  </aside>
</template>
