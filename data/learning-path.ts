export type LearningLevel = "beginner" | "intermediate" | "advanced" | "guru";

export interface LearningStep {
  id: string;
  level: LearningLevel;
  title: string;
  titleKz: string;
  description: string;
  descriptionKz: string;
  icon: string;
  docsLink: string;
  estimatedTime: string;
  topics: string[];
}

export interface LevelInfo {
  level: LearningLevel;
  name: string;
  nameKz: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const levelInfo: Record<LearningLevel, LevelInfo> = {
  beginner: {
    level: "beginner",
    name: "Beginner",
    nameKz: "Бастаушы",
    icon: "🟢",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
  },
  intermediate: {
    level: "intermediate",
    name: "Intermediate",
    nameKz: "Орта деңгей",
    icon: "🟡",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
  },
  advanced: {
    level: "advanced",
    name: "Advanced",
    nameKz: "Жетілдірілген",
    icon: "🔴",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
  },
  guru: {
    level: "guru",
    name: "Master",
    nameKz: "Шебер",
    icon: "👑",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
  },
};

export const learningSteps: LearningStep[] = [
  // ============ BEGINNER (6 steps) ============
  {
    id: "what-is-gsap",
    level: "beginner",
    title: "What is GSAP?",
    titleKz: "GSAP деген не?",
    description: "Introduction to GSAP animation library",
    descriptionKz: "GSAP анимация кітапханасымен танысу, оның мүмкіндіктері мен артықшылықтары",
    icon: "🎬",
    docsLink: "/docs/kirisspe/gsap-degen-ne",
    estimatedTime: "15 мин",
    topics: ["GSAP кіріспе", "Неге GSAP?", "Мүмкіндіктер"],
  },
  {
    id: "installation",
    level: "beginner",
    title: "Installation",
    titleKz: "Орнату",
    description: "Install GSAP via CDN or npm",
    descriptionKz: "GSAP-ты жобаға орнату: CDN арқылы немесе npm/pnpm пакет менеджері арқылы",
    icon: "📦",
    docsLink: "/docs/kirisspe/ornatu",
    estimatedTime: "10 мин",
    topics: ["CDN орнату", "npm орнату", "ES модульдер"],
  },
  {
    id: "gsap-to",
    level: "beginner",
    title: "gsap.to()",
    titleKz: "Бірінші анимация",
    description: "Create your first animation with gsap.to()",
    descriptionKz: "gsap.to() әдісімен алғашқы анимацияңызды жасаңыз",
    icon: "▶️",
    docsLink: "/docs/negizderi/gsap-to",
    estimatedTime: "20 мин",
    topics: ["gsap.to()", "Мақсат элемент", "Қасиеттер"],
  },
  {
    id: "gsap-from-fromto",
    level: "beginner",
    title: "gsap.from() / fromTo()",
    titleKz: "Анимация бағыттары",
    description: "Animation directions with from() and fromTo()",
    descriptionKz: "from() және fromTo() әдістері арқылы әртүрлі бағыттағы анимациялар",
    icon: "🔄",
    docsLink: "/docs/negizderi/gsap-from",
    estimatedTime: "20 мин",
    topics: ["gsap.from()", "gsap.fromTo()", "Бағыттар"],
  },
  {
    id: "basic-properties",
    level: "beginner",
    title: "Basic Properties",
    titleKz: "Негізгі қасиеттер",
    description: "Learn essential animation properties",
    descriptionKz: "Анимацияның негізгі қасиеттерін үйреніңіз: x, y, opacity, scale, rotation",
    icon: "⚙️",
    docsLink: "/docs/negizderi/kasietter",
    estimatedTime: "30 мин",
    topics: ["x, y позиция", "opacity", "scale", "rotation"],
  },
  {
    id: "duration-delay",
    level: "beginner",
    title: "Duration & Delay",
    titleKz: "Уақыт параметрлері",
    description: "Control timing with duration and delay",
    descriptionKz: "duration және delay параметрлері арқылы анимация уақытын басқару",
    icon: "⏱️",
    docsLink: "/docs/negizderi/kasietter",
    estimatedTime: "15 мин",
    topics: ["duration", "delay", "repeat", "yoyo"],
  },

  // ============ INTERMEDIATE (8 steps) ============
  {
    id: "easing",
    level: "intermediate",
    title: "Easing Functions",
    titleKz: "Easing функциялары",
    description: "Master easing for natural animations",
    descriptionKz: "Табиғи көрінетін анимациялар үшін easing функцияларын үйреніңіз",
    icon: "📈",
    docsLink: "/docs/easing/turleri",
    estimatedTime: "30 мин",
    topics: ["ease түрлері", "power, elastic, bounce", "Custom ease"],
  },
  {
    id: "timeline-basics",
    level: "intermediate",
    title: "Timeline Basics",
    titleKz: "Timeline негіздері",
    description: "Sequence animations with Timeline",
    descriptionKz: "Timeline арқылы анимациялар тізбегін құру",
    icon: "📋",
    docsLink: "/docs/timeline/negizderi",
    estimatedTime: "30 мин",
    topics: ["gsap.timeline()", "Тізбектеу", "Басқару"],
  },
  {
    id: "timeline-positioning",
    level: "intermediate",
    title: "Timeline Positioning",
    titleKz: "Timeline позициялау",
    description: "Master the position parameter",
    descriptionKz: "Position параметрі арқылы анимацияларды дәл орналастыру",
    icon: "📍",
    docsLink: "/docs/timeline/poziciya",
    estimatedTime: "25 мин",
    topics: ["Position параметрі", "Labels", "Relative timing"],
  },
  {
    id: "callbacks",
    level: "intermediate",
    title: "Callbacks",
    titleKz: "Кері шақырулар",
    description: "React to animation events",
    descriptionKz: "Анимация оқиғаларына жауап беру: onStart, onComplete, onUpdate",
    icon: "📞",
    docsLink: "/docs/timeline/basqaru",
    estimatedTime: "20 мин",
    topics: ["onStart", "onComplete", "onUpdate", "onRepeat"],
  },
  {
    id: "stagger",
    level: "intermediate",
    title: "Stagger",
    titleKz: "Stagger анимациялар",
    description: "Animate multiple elements with stagger",
    descriptionKz: "Бірнеше элементті кезектеп анимациялау",
    icon: "🎯",
    docsLink: "/docs/jetildirilgen/stagger",
    estimatedTime: "25 мин",
    topics: ["stagger негіздері", "Grid stagger", "Random stagger"],
  },
  {
    id: "scrolltrigger-basics",
    level: "intermediate",
    title: "ScrollTrigger Basics",
    titleKz: "ScrollTrigger негіздері",
    description: "Trigger animations on scroll",
    descriptionKz: "Скролл арқылы анимацияларды іске қосу",
    icon: "📜",
    docsLink: "/docs/scrolltrigger/negizderi",
    estimatedTime: "40 мин",
    topics: ["trigger", "start/end", "markers"],
  },
  {
    id: "scrolltrigger-scrub",
    level: "intermediate",
    title: "ScrollTrigger Scrub",
    titleKz: "Scrub анимациялар",
    description: "Link animation progress to scroll position",
    descriptionKz: "Анимация прогресін скролл позициясына байланыстыру",
    icon: "🎚️",
    docsLink: "/docs/scrolltrigger/scrub",
    estimatedTime: "30 мин",
    topics: ["scrub параметрі", "Smooth scrub", "Скролл синхрондау"],
  },
  {
    id: "scrolltrigger-pin",
    level: "intermediate",
    title: "ScrollTrigger Pin",
    titleKz: "Pin эффекті",
    description: "Pin elements during scroll",
    descriptionKz: "Скролл кезінде элементтерді бекіту",
    icon: "📌",
    docsLink: "/docs/scrolltrigger/pin",
    estimatedTime: "35 мин",
    topics: ["pin параметрі", "pinSpacing", "Horizontal scroll"],
  },

  // ============ ADVANCED (8 steps) ============
  {
    id: "gsap-context",
    level: "advanced",
    title: "GSAP Context",
    titleKz: "GSAP Context",
    description: "Cleanup and scoping animations",
    descriptionKz: "Анимацияларды топтау және тазалау",
    icon: "🔒",
    docsLink: "/docs/jetildirilgen/context",
    estimatedTime: "25 мин",
    topics: ["gsap.context()", "Cleanup", "Scoping"],
  },
  {
    id: "matchmedia",
    level: "advanced",
    title: "matchMedia",
    titleKz: "Responsive анимация",
    description: "Responsive animations with matchMedia",
    descriptionKz: "matchMedia() арқылы responsive анимациялар жасау",
    icon: "📱",
    docsLink: "/docs/jetildirilgen/matchmedia",
    estimatedTime: "30 мин",
    topics: ["gsap.matchMedia()", "Breakpoints", "Mobile-first"],
  },
  {
    id: "svg-animation",
    level: "advanced",
    title: "SVG Animation",
    titleKz: "SVG анимация",
    description: "Animate SVG paths and shapes",
    descriptionKz: "SVG path-тарды және фигураларды анимациялау",
    icon: "✨",
    docsLink: "/docs/svg/negizderi",
    estimatedTime: "40 мин",
    topics: ["DrawSVG", "MorphSVG", "MotionPath"],
  },
  {
    id: "draggable",
    level: "advanced",
    title: "Draggable",
    titleKz: "Сүйреу плагині",
    description: "Create draggable interactions",
    descriptionKz: "Сүйреп апару интерактивтерін жасау",
    icon: "👆",
    docsLink: "/docs/plaginder/draggable",
    estimatedTime: "35 мин",
    topics: ["Draggable.create()", "Bounds", "Snap"],
  },
  {
    id: "flip-plugin",
    level: "advanced",
    title: "Flip Plugin",
    titleKz: "Flip плагині",
    description: "Smooth layout animations",
    descriptionKz: "Layout өзгерістерін анимациялау",
    icon: "🔀",
    docsLink: "/docs/plaginder/flip",
    estimatedTime: "40 мин",
    topics: ["Flip.from()", "Layout animation", "State capture"],
  },
  {
    id: "splittext",
    level: "advanced",
    title: "SplitText",
    titleKz: "Мәтін бөлу",
    description: "Animate text character by character",
    descriptionKz: "Мәтінді символдар, сөздер бойынша анимациялау",
    icon: "✂️",
    docsLink: "/docs/plaginder/splittext",
    estimatedTime: "30 мин",
    topics: ["SplitText", "chars, words, lines", "Text reveal"],
  },
  {
    id: "custom-easing",
    level: "advanced",
    title: "Custom Easing",
    titleKz: "Custom Ease",
    description: "Create your own easing functions",
    descriptionKz: "Өзіңіздің easing функцияларыңызды жасаңыз",
    icon: "🎨",
    docsLink: "/docs/easing/custom",
    estimatedTime: "25 мин",
    topics: ["CustomEase", "Bezier curves", "Ease визуализация"],
  },
  {
    id: "performance",
    level: "advanced",
    title: "Performance",
    titleKz: "Оңтайландыру",
    description: "Optimize animation performance",
    descriptionKz: "Анимация өнімділігін оңтайландыру техникалары",
    icon: "⚡",
    docsLink: "/docs/optimization/performance",
    estimatedTime: "35 мин",
    topics: ["will-change", "force3D", "Lazy rendering"],
  },

  // ============ ШЕБЕР / MASTER (4 steps) ============
  {
    id: "complex-timelines",
    level: "guru",
    title: "Complex Timelines",
    titleKz: "Күрделі Timeline",
    description: "Master nested timelines and advanced control",
    descriptionKz: "Кірістірілген timeline-дар және күрделі басқару",
    icon: "🎭",
    docsLink: "/docs/timeline/negizderi",
    estimatedTime: "45 мин",
    topics: ["Nested timelines", "Labels", "TimeScale"],
  },
  {
    id: "plugin-development",
    level: "guru",
    title: "Plugin Development",
    titleKz: "Плагин жасау",
    description: "Create custom GSAP plugins",
    descriptionKz: "Өз GSAP плагиніңізді жасау",
    icon: "🔧",
    docsLink: "/docs/jetildirilgen/registerplugin",
    estimatedTime: "60 мин",
    topics: ["registerPlugin()", "Plugin API", "Custom props"],
  },
  {
    id: "framework-integration",
    level: "guru",
    title: "Framework Integration",
    titleKz: "Фреймворк интеграция",
    description: "Integrate GSAP with React, Vue, Nuxt",
    descriptionKz: "GSAP-ты React, Vue, Nuxt-пен интеграциялау",
    icon: "🔗",
    docsLink: "/docs/freimworktar/vue",
    estimatedTime: "45 мин",
    topics: ["Vue 3 интеграция", "useGsap", "Cleanup"],
  },
  {
    id: "real-project",
    level: "guru",
    title: "Real Project",
    titleKz: "Нақты жоба",
    description: "Build a complete animated website",
    descriptionKz: "Толық анимациялы веб-сайт құру",
    icon: "🏆",
    docsLink: "/docs/praktika/landing",
    estimatedTime: "2+ сағат",
    topics: ["Hero секция", "Scroll анимациялар", "Page transitions"],
  },
];

export const getStepsByLevel = (level: LearningLevel): LearningStep[] => {
  return learningSteps.filter((step) => step.level === level);
};

export const getLevelProgress = (
  level: LearningLevel,
  completedSteps: string[]
): { completed: number; total: number; percentage: number } => {
  const levelSteps = getStepsByLevel(level);
  const completed = levelSteps.filter((step) => completedSteps.includes(step.id)).length;
  return {
    completed,
    total: levelSteps.length,
    percentage: Math.round((completed / levelSteps.length) * 100),
  };
};

export const levels: LearningLevel[] = ["beginner", "intermediate", "advanced", "guru"];
