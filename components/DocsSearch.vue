<script setup lang="ts">
interface SearchResult {
  title: string;
  description: string;
  path: string;
  section: string;
}

const isOpen = ref(false);
const searchQuery = ref("");
const results = ref<SearchResult[]>([]);
const selectedIndex = ref(0);

// All documentation pages for search
const pages: SearchResult[] = [
  // Кіріспе
  {
    title: "GSAP деген не?",
    description: "GSAP кітапханасымен танысу",
    path: "/docs/kirisspe/gsap-degen-ne",
    section: "Кіріспе",
  },
  {
    title: "Орнату",
    description: "GSAP-ты жобаға орнату",
    path: "/docs/kirisspe/ornatu",
    section: "Кіріспе",
  },
  {
    title: "Алғашқы анимация",
    description: "Бірінші анимацияны жасау",
    path: "/docs/kirisspe/algashky-animatsiya",
    section: "Кіріспе",
  },
  {
    title: "Неге GSAP?",
    description: "GSAP артықшылықтары",
    path: "/docs/kirisspe/nege-gsap",
    section: "Кіріспе",
  },
  // Негіздер
  {
    title: "gsap.to()",
    description: "Элементті мақсат күйге анимациялау",
    path: "/docs/negizderi/gsap-to",
    section: "Негіздер",
  },
  {
    title: "gsap.from()",
    description: "Бастапқы күйден анимациялау",
    path: "/docs/negizderi/gsap-from",
    section: "Негіздер",
  },
  {
    title: "gsap.fromTo()",
    description: "Толық бақылау анимациясы",
    path: "/docs/negizderi/gsap-fromto",
    section: "Негіздер",
  },
  {
    title: "Қасиеттер",
    description: "Анимация параметрлері",
    path: "/docs/negizderi/kasietter",
    section: "Негіздер",
  },
  {
    title: "Callbacks",
    description: "Анимация оқиғалары",
    path: "/docs/negizderi/callbacks",
    section: "Негіздер",
  },
  // Easing
  {
    title: "Easing негіздері",
    description: "Жеделдету функциялары",
    path: "/docs/easing/negizderi",
    section: "Easing",
  },
  {
    title: "Ease түрлері",
    description: "Барлық ease түрлері",
    path: "/docs/easing/turleri",
    section: "Easing",
  },
  {
    title: "Custom Ease",
    description: "Өзіндік ease жасау",
    path: "/docs/easing/custom",
    section: "Easing",
  },
  // Timeline
  {
    title: "Timeline негіздері",
    description: "Анимация тізбектері",
    path: "/docs/timeline/negizderi",
    section: "Timeline",
  },
  {
    title: "Position параметрі",
    description: "Уақытты дәл басқару",
    path: "/docs/timeline/position",
    section: "Timeline",
  },
  {
    title: "Timeline басқару",
    description: "Play, pause, reverse",
    path: "/docs/timeline/baskaru",
    section: "Timeline",
  },
  // ScrollTrigger
  {
    title: "ScrollTrigger кіріспе",
    description: "Скролл анимациялары",
    path: "/docs/scrolltrigger/kirisspe",
    section: "ScrollTrigger",
  },
  {
    title: "Негізгі параметрлер",
    description: "ScrollTrigger параметрлері",
    path: "/docs/scrolltrigger/parametrler",
    section: "ScrollTrigger",
  },
  {
    title: "Pin эффектісі",
    description: "Элементті бекіту",
    path: "/docs/scrolltrigger/pin",
    section: "ScrollTrigger",
  },
  {
    title: "Scrub анимация",
    description: "Скроллмен синхрондау",
    path: "/docs/scrolltrigger/scrub",
    section: "ScrollTrigger",
  },
  // Плагиндер
  {
    title: "Плагиндер туралы",
    description: "GSAP плагиндері",
    path: "/docs/plaginder/kirisspe",
    section: "Плагиндер",
  },
  {
    title: "Draggable",
    description: "Drag-and-drop функционал",
    path: "/docs/plaginder/draggable",
    section: "Плагиндер",
  },
  {
    title: "Flip",
    description: "FLIP анимациялары",
    path: "/docs/plaginder/flip",
    section: "Плагиндер",
  },
  {
    title: "MotionPath",
    description: "Жол бойынша қозғалыс",
    path: "/docs/plaginder/motionpath",
    section: "Плагиндер",
  },
  {
    title: "TextPlugin",
    description: "Мәтін анимациялары",
    path: "/docs/plaginder/text",
    section: "Плагиндер",
  },
  // Утилиталар
  {
    title: "gsap.utils",
    description: "Көмекші функциялар",
    path: "/docs/utilitalar/utils",
    section: "Утилиталар",
  },
  {
    title: "gsap.context()",
    description: "Анимацияларды топтау",
    path: "/docs/utilitalar/context",
    section: "Утилиталар",
  },
  {
    title: "gsap.matchMedia()",
    description: "Responsive анимациялар",
    path: "/docs/utilitalar/matchmedia",
    section: "Утилиталар",
  },
  // Фреймворктар
  {
    title: "React",
    description: "React-та GSAP қолдану",
    path: "/docs/freimworktar/react",
    section: "Фреймворктар",
  },
  {
    title: "Vue",
    description: "Vue-да GSAP қолдану",
    path: "/docs/freimworktar/vue",
    section: "Фреймворктар",
  },
  // SVG Анимация
  {
    title: "SVG негіздері",
    description: "SVG анимацияның негіздері",
    path: "/docs/svg/negizderi",
    section: "SVG Анимация",
  },
  {
    title: "Path анимация",
    description: "SVG path анимациялары",
    path: "/docs/svg/path-animacia",
    section: "SVG Анимация",
  },
  {
    title: "MorphSVG",
    description: "SVG морфинг плагині",
    path: "/docs/svg/morphsvg",
    section: "SVG Анимация",
  },
  {
    title: "DrawSVG",
    description: "SVG сызу анимациясы",
    path: "/docs/svg/drawsvg",
    section: "SVG Анимация",
  },
  {
    title: "MotionPath (SVG)",
    description: "SVG жолы бойынша қозғалыс",
    path: "/docs/svg/motionpath",
    section: "SVG Анимация",
  },
  // Жетілдірілген
  {
    title: "Stagger",
    description: "Кезекті анимациялар",
    path: "/docs/jetildirilgen/stagger",
    section: "Жетілдірілген",
  },
  {
    title: "Keyframes",
    description: "Keyframe анимациялар",
    path: "/docs/jetildirilgen/keyframes",
    section: "Жетілдірілген",
  },
  {
    title: "Responsive",
    description: "Адаптивті анимациялар",
    path: "/docs/jetildirilgen/responsive",
    section: "Жетілдірілген",
  },
  {
    title: "Context",
    description: "GSAP context қолдану",
    path: "/docs/jetildirilgen/context",
    section: "Жетілдірілген",
  },
  {
    title: "matchMedia()",
    description: "Экран өлшеміне байланысты",
    path: "/docs/jetildirilgen/matchmedia",
    section: "Жетілдірілген",
  },
  {
    title: "registerPlugin()",
    description: "Плагин тіркеу",
    path: "/docs/jetildirilgen/registerplugin",
    section: "Жетілдірілген",
  },
  {
    title: "Ticker",
    description: "GSAP ticker қолдану",
    path: "/docs/jetildirilgen/ticker",
    section: "Жетілдірілген",
  },
  // Практика
  {
    title: "Navbar анимация",
    description: "Навигация анимациялары",
    path: "/docs/praktika/navbar",
    section: "Практика",
  },
  {
    title: "Hero секция",
    description: "Hero блок анимациялары",
    path: "/docs/praktika/hero",
    section: "Практика",
  },
  {
    title: "Card hover",
    description: "Карточка hover эффекттері",
    path: "/docs/praktika/card-hover",
    section: "Практика",
  },
  {
    title: "Page transition",
    description: "Бет ауысу анимациялары",
    path: "/docs/praktika/page-transition",
    section: "Практика",
  },
  {
    title: "Parallax",
    description: "Параллакс эффекттер",
    path: "/docs/praktika/parallax",
    section: "Практика",
  },
  {
    title: "Text reveal",
    description: "Мәтін пайда болу эффекттері",
    path: "/docs/praktika/text-reveal",
    section: "Практика",
  },
  {
    title: "Image gallery",
    description: "Сурет галереясы",
    path: "/docs/praktika/image-gallery",
    section: "Практика",
  },
  {
    title: "Loading",
    description: "Жүктеу анимациялары",
    path: "/docs/praktika/loading",
    section: "Практика",
  },
  {
    title: "Scroll progress",
    description: "Скролл прогресс бары",
    path: "/docs/praktika/scroll-progress",
    section: "Практика",
  },
  {
    title: "Landing page",
    description: "Толық landing бет",
    path: "/docs/praktika/landing",
    section: "Практика",
  },
  // Оңтайландыру
  {
    title: "Performance",
    description: "Өнімділік кеңестері",
    path: "/docs/optimization/performance",
    section: "Оңтайландыру",
  },
  {
    title: "will-change",
    description: "CSS will-change қасиеті",
    path: "/docs/optimization/will-change",
    section: "Оңтайландыру",
  },
  {
    title: "force3D",
    description: "GPU acceleration",
    path: "/docs/optimization/force3d",
    section: "Оңтайландыру",
  },
  {
    title: "Lazy rendering",
    description: "Lazy render оптимизация",
    path: "/docs/optimization/lazy-rendering",
    section: "Оңтайландыру",
  },
  {
    title: "Жиі қателер",
    description: "Қателер мен шешімдері",
    path: "/docs/optimization/errors",
    section: "Оңтайландыру",
  },
  // Анықтамалық
  {
    title: "Қасиеттер",
    description: "Барлық GSAP қасиеттері",
    path: "/docs/reference/properties",
    section: "Анықтамалық",
  },
  {
    title: "Easing анықтамалық",
    description: "Барлық easing түрлері",
    path: "/docs/reference/easing",
    section: "Анықтамалық",
  },
  {
    title: "Callbacks",
    description: "Барлық callback функциялар",
    path: "/docs/reference/callbacks",
    section: "Анықтамалық",
  },
  {
    title: "Терминдер сөздігі",
    description: "Анимация терминдері",
    path: "/docs/reference/glossary",
    section: "Анықтамалық",
  },
];

const search = () => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) {
    results.value = [];
    return;
  }

  results.value = pages
    .filter(
      (page) =>
        page.title.toLowerCase().includes(query) ||
        page.description.toLowerCase().includes(query) ||
        page.section.toLowerCase().includes(query)
    )
    .slice(0, 8);

  selectedIndex.value = 0;
};

const openSearch = () => {
  isOpen.value = true;
  nextTick(() => {
    document.getElementById("search-input")?.focus();
  });
};

const closeSearch = () => {
  isOpen.value = false;
  searchQuery.value = "";
  results.value = [];
};

const router = useRouter();

const goToResult = (path: string) => {
  router.push(path);
  closeSearch();
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    selectedIndex.value = Math.min(selectedIndex.value + 1, results.value.length - 1);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0);
  } else if (e.key === "Enter" && results.value[selectedIndex.value]) {
    goToResult(results.value[selectedIndex.value].path);
  } else if (e.key === "Escape") {
    closeSearch();
  }
};

// Global keyboard shortcut
onMounted(() => {
  const handleGlobalKeydown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      openSearch();
    }
  };
  window.addEventListener("keydown", handleGlobalKeydown);
  onUnmounted(() => {
    window.removeEventListener("keydown", handleGlobalKeydown);
  });
});

watch(searchQuery, search);
</script>

<template>
  <!-- Search Button -->
  <button
    class="w-full flex items-center gap-3 px-3 py-2 text-sm text-gsap-text-muted bg-gsap-bg-tertiary rounded-lg border border-gsap-border hover:border-gsap-text-muted transition-colors"
    @click="openSearch"
  >
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
    <span class="flex-1 text-left">Іздеу...</span>
    <kbd
      class="hidden sm:inline-flex px-1.5 py-0.5 text-xs bg-gsap-bg-secondary rounded border border-gsap-border"
      >⌘K</kbd
    >
  </button>

  <!-- Search Modal -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60" @click="closeSearch" />

        <!-- Modal -->
        <div
          class="relative w-full max-w-xl bg-gsap-bg-secondary border border-gsap-border rounded-xl shadow-2xl overflow-hidden"
        >
          <!-- Search Input -->
          <div class="flex items-center gap-3 px-4 border-b border-gsap-border">
            <svg
              class="w-5 h-5 text-gsap-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              id="search-input"
              v-model="searchQuery"
              type="text"
              placeholder="Құжаттамадан іздеу..."
              class="flex-1 py-4 bg-transparent text-gsap-text-primary placeholder-gsap-text-muted outline-none"
              @keydown="handleKeydown"
            />
            <kbd
              class="px-2 py-1 text-xs text-gsap-text-muted bg-gsap-bg-tertiary rounded border border-gsap-border"
              >ESC</kbd
            >
          </div>

          <!-- Results -->
          <div class="max-h-80 overflow-y-auto">
            <div v-if="results.length > 0" class="py-2">
              <button
                v-for="(result, index) in results"
                :key="result.path"
                :class="[
                  'w-full flex items-start gap-3 px-4 py-3 text-left transition-colors',
                  index === selectedIndex ? 'bg-gsap-green/10' : 'hover:bg-gsap-bg-tertiary',
                ]"
                @click="goToResult(result.path)"
                @mouseenter="selectedIndex = index"
              >
                <div class="flex-1">
                  <div class="text-sm font-medium text-gsap-text-primary">
                    {{ result.title }}
                  </div>
                  <div class="text-xs text-gsap-text-muted mt-0.5">
                    {{ result.section }} · {{ result.description }}
                  </div>
                </div>
                <svg
                  v-if="index === selectedIndex"
                  class="w-4 h-4 text-gsap-green mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div
              v-else-if="searchQuery && !results.length"
              class="py-8 text-center text-gsap-text-muted"
            >
              <p>Нәтиже табылмады</p>
              <p class="text-xs mt-1">Басқа сөзбен іздеп көріңіз</p>
            </div>

            <div v-else class="py-6 px-4 text-sm text-gsap-text-muted">
              <p class="mb-3">Жылдам сілтемелер:</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="item in pages.slice(0, 5)"
                  :key="item.path"
                  class="px-2 py-1 bg-gsap-bg-tertiary rounded text-xs hover:text-gsap-text-primary transition-colors"
                  @click="goToResult(item.path)"
                >
                  {{ item.title }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
