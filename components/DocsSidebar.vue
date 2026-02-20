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
    items: [{ title: "Vue", to: "/docs/freimworktar/vue" }],
  },
  {
    title: "SVG Анимация",
    key: "svg",
    items: [
      { title: "SVG негіздері", to: "/docs/svg/negizderi" },
      { title: "Path анимация", to: "/docs/svg/path-animacia" },
      { title: "MorphSVG", to: "/docs/svg/morphsvg" },
      { title: "DrawSVG", to: "/docs/svg/drawsvg" },
      { title: "MotionPath", to: "/docs/svg/motionpath" },
    ],
  },
  {
    title: "Жетілдірілген",
    key: "jetildirilgen",
    items: [
      { title: "Stagger", to: "/docs/jetildirilgen/stagger" },
      { title: "Keyframes", to: "/docs/jetildirilgen/keyframes" },
      { title: "Responsive", to: "/docs/jetildirilgen/responsive" },
      { title: "Context", to: "/docs/jetildirilgen/context" },
      { title: "matchMedia()", to: "/docs/jetildirilgen/matchmedia" },
      { title: "registerPlugin()", to: "/docs/jetildirilgen/registerplugin" },
      { title: "Ticker", to: "/docs/jetildirilgen/ticker" },
    ],
  },
  {
    title: "Практика",
    key: "praktika",
    items: [
      { title: "Navbar", to: "/docs/praktika/navbar" },
      { title: "Hero секция", to: "/docs/praktika/hero" },
      { title: "Card hover", to: "/docs/praktika/card-hover" },
      { title: "Page transition", to: "/docs/praktika/page-transition" },
      { title: "Parallax", to: "/docs/praktika/parallax" },
      { title: "Text reveal", to: "/docs/praktika/text-reveal" },
      { title: "Image gallery", to: "/docs/praktika/image-gallery" },
      { title: "Loading", to: "/docs/praktika/loading" },
      { title: "Scroll progress", to: "/docs/praktika/scroll-progress" },
      { title: "Landing page", to: "/docs/praktika/landing" },
    ],
  },
  {
    title: "Оңтайландыру",
    key: "optimization",
    items: [
      { title: "Performance", to: "/docs/optimization/performance" },
      { title: "will-change", to: "/docs/optimization/will-change" },
      { title: "force3D", to: "/docs/optimization/force3d" },
      { title: "Lazy rendering", to: "/docs/optimization/lazy-rendering" },
      { title: "Қателер", to: "/docs/optimization/errors" },
    ],
  },
  {
    title: "Анықтамалық",
    key: "reference",
    items: [
      { title: "Қасиеттер", to: "/docs/reference/properties" },
      { title: "Easing", to: "/docs/reference/easing" },
      { title: "Callbacks", to: "/docs/reference/callbacks" },
      { title: "Терминдер", to: "/docs/reference/glossary" },
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
      'transform transition-transform duration-300 ease-in-out flex flex-col',
      'lg:translate-x-0',
      isOpen ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <!-- Logo -->
    <div class="flex items-center gap-3 px-6 py-6 border-b border-gsap-border shrink-0">
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
    <div class="px-4 py-4 border-b border-gsap-border shrink-0">
      <DocsSearch />
    </div>

    <!-- Navigation -->
    <nav class="px-4 py-4 overflow-y-auto flex-1 min-h-0">
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
  </aside>
</template>
