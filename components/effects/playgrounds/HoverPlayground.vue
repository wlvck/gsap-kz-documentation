<script setup lang="ts">
import gsap from "gsap";
import type { Effect } from "~/types/effects";

const props = defineProps<{
  effect: Effect;
}>();

const elementRef = ref<HTMLElement | null>(null);
const rippleRef = ref<HTMLElement | null>(null);
const shineRef = ref<HTMLElement | null>(null);
const lineRef = ref<HTMLElement | null>(null);
const bgRef = ref<HTMLElement | null>(null);
const borderRef = ref<HTMLElement | null>(null);
const iconRef = ref<HTMLElement | null>(null);
const line1Ref = ref<HTMLElement | null>(null);
const line2Ref = ref<HTMLElement | null>(null);
const line3Ref = ref<HTMLElement | null>(null);
const checkRef = ref<HTMLElement | null>(null);

// State for stateful buttons
const loading = ref(false);
const success = ref(false);
const error = ref(false);
const isMenuOpen = ref(false);

// State for card effects
const isCardFlipped = ref(false);
const isCardExpanded = ref(false);

// Additional refs for card effects
const contentRef = ref<HTMLElement | null>(null);
const extraContentRef = ref<HTMLElement | null>(null);
const overlayRef = ref<HTMLElement | null>(null);

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
  // Text hover effects
  "hover-underline": {
    onEnter: () => {
      if (!lineRef.value) return;
      gsap.to(lineRef.value, {
        scaleX: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    onLeave: () => {
      if (!lineRef.value) return;
      gsap.to(lineRef.value, {
        scaleX: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    },
  },
  // New button effects
  "btn-bg-slide": {
    onEnter: () => {
      if (!bgRef.value) return;
      gsap.to(bgRef.value, {
        xPercent: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    onLeave: () => {
      if (!bgRef.value) return;
      gsap.to(bgRef.value, {
        xPercent: 100,
        duration: 0.3,
        ease: "power2.in",
      });
    },
  },
  "btn-border": {
    onEnter: () => {
      if (!borderRef.value) return;
      gsap.to(borderRef.value, {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.4,
        ease: "power2.out",
      });
    },
    onLeave: () => {
      if (!borderRef.value) return;
      gsap.to(borderRef.value, {
        clipPath: "inset(0 100% 0 0)",
        duration: 0.4,
        ease: "power2.in",
      });
    },
  },
  "btn-click": {
    onClick: () => {
      gsap
        .timeline()
        .to(elementRef.value, {
          scale: 0.9,
          duration: 0.1,
          ease: "power2.in",
        })
        .to(elementRef.value, {
          scale: 1,
          duration: 0.4,
          ease: "elastic.out(1, 0.4)",
        });
    },
  },
  "btn-loading": {
    onClick: () => {
      loading.value = true;
      const spinner = elementRef.value?.querySelector(".spinner-icon");
      if (spinner) {
        gsap.to(spinner, {
          rotation: 360 * 3,
          duration: 2,
          ease: "none",
          onComplete: () => {
            loading.value = false;
            gsap.set(spinner, { rotation: 0 });
          },
        });
      }
    },
  },
  "btn-success": {
    onClick: () => {
      success.value = true;
      nextTick(() => {
        if (checkRef.value) {
          gsap.fromTo(
            checkRef.value,
            { scale: 0, rotation: -180 },
            {
              scale: 1,
              rotation: 0,
              duration: 0.5,
              ease: "back.out(1.7)",
              onComplete: () => {
                setTimeout(() => {
                  success.value = false;
                }, 1500);
              },
            }
          );
        }
      });
    },
  },
  "btn-error": {
    onClick: () => {
      error.value = true;
      gsap.to(elementRef.value, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          setTimeout(() => {
            error.value = false;
          }, 1500);
        },
      });
    },
  },
  "btn-icon-rotate": {
    onEnter: () => {
      if (!iconRef.value) return;
      gsap.to(iconRef.value, {
        rotation: 360,
        duration: 0.5,
        ease: "power2.out",
      });
    },
    onLeave: () => {
      if (!iconRef.value) return;
      gsap.to(iconRef.value, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    },
  },
  "btn-icon-morph": {
    onClick: () => {
      isMenuOpen.value = !isMenuOpen.value;
      if (isMenuOpen.value) {
        gsap.to(line1Ref.value, { y: 8, rotation: 45, duration: 0.3 });
        gsap.to(line2Ref.value, { opacity: 0, duration: 0.2 });
        gsap.to(line3Ref.value, { y: -8, rotation: -45, duration: 0.3 });
      } else {
        gsap.to(line1Ref.value, { y: 0, rotation: 0, duration: 0.3 });
        gsap.to(line2Ref.value, { opacity: 1, duration: 0.2 });
        gsap.to(line3Ref.value, { y: 0, rotation: 0, duration: 0.3 });
      }
    },
  },
  "btn-icon-bounce": {
    onEnter: () => {
      if (!iconRef.value) return;
      gsap.to(iconRef.value, {
        y: [0, 5, 0, 3, 0],
        duration: 0.6,
        ease: "power2.out",
      });
    },
  },
  // Additional card effects
  "card-flip": {
    onClick: () => {
      isCardFlipped.value = !isCardFlipped.value;
      gsap.to(elementRef.value, {
        rotateY: isCardFlipped.value ? 180 : 0,
        duration: 0.6,
        ease: "power2.inOut",
      });
    },
  },
  "card-expand": {
    onClick: () => {
      isCardExpanded.value = !isCardExpanded.value;
      gsap.to(elementRef.value, {
        height: isCardExpanded.value ? 200 : 160,
        duration: 0.4,
        ease: "power2.out",
      });
      if (contentRef.value) {
        gsap.to(contentRef.value, {
          maxHeight: isCardExpanded.value ? 100 : 0,
          opacity: isCardExpanded.value ? 1 : 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    },
  },
  "card-glow": {
    onEnter: () => {
      gsap.to(elementRef.value, {
        boxShadow: "0 0 30px rgba(10, 228, 72, 0.5), 0 0 60px rgba(10, 228, 72, 0.3)",
        duration: 0.3,
        ease: "power2.out",
      });
    },
    onLeave: () => {
      gsap.to(elementRef.value, {
        boxShadow: "0 0 0px rgba(10, 228, 72, 0)",
        duration: 0.3,
        ease: "power2.out",
      });
    },
  },
  "card-border": {
    onEnter: () => {
      if (!borderRef.value) return;
      gsap.to(borderRef.value, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    onLeave: () => {
      if (!borderRef.value) return;
      gsap.to(borderRef.value, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    },
  },
  "card-gradient": {
    onEnter: () => {
      gsap.to(elementRef.value, {
        backgroundPosition: "100% 100%",
        duration: 0.5,
        ease: "power2.out",
      });
    },
    onLeave: () => {
      gsap.to(elementRef.value, {
        backgroundPosition: "0% 0%",
        duration: 0.5,
        ease: "power2.out",
      });
    },
  },
  "card-content-slide": {
    onEnter: () => {
      if (contentRef.value) {
        gsap.to(contentRef.value, { y: 0, duration: 0.3, ease: "power2.out" });
      }
      if (extraContentRef.value) {
        gsap.to(extraContentRef.value, {
          opacity: 1,
          duration: 0.3,
          delay: 0.1,
          ease: "power2.out",
        });
      }
    },
    onLeave: () => {
      if (contentRef.value) {
        gsap.to(contentRef.value, { y: 40, duration: 0.3, ease: "power2.out" });
      }
      if (extraContentRef.value) {
        gsap.to(extraContentRef.value, { opacity: 0, duration: 0.2, ease: "power2.out" });
      }
    },
  },
  "card-overlay": {
    onEnter: () => {
      if (!overlayRef.value) return;
      gsap.to(overlayRef.value, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    onLeave: () => {
      if (!overlayRef.value) return;
      gsap.to(overlayRef.value, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    },
  },
  "card-icon": {
    onEnter: () => {
      if (!iconRef.value) return;
      gsap.to(iconRef.value, {
        y: -10,
        scale: 1.2,
        duration: 0.4,
        ease: "back.out(1.7)",
      });
    },
    onLeave: () => {
      if (!iconRef.value) return;
      gsap.to(iconRef.value, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    },
  },
  // Navigation effects
  "hamburger-x": {
    onClick: () => {
      isMenuOpen.value = !isMenuOpen.value;
      if (isMenuOpen.value) {
        gsap.to(line1Ref.value, { y: 8, rotation: 45, duration: 0.3, ease: "power2.inOut" });
        gsap.to(line2Ref.value, { opacity: 0, scaleX: 0, duration: 0.2 });
        gsap.to(line3Ref.value, { y: -8, rotation: -45, duration: 0.3, ease: "power2.inOut" });
      } else {
        gsap.to(line1Ref.value, { y: 0, rotation: 0, duration: 0.3, ease: "power2.inOut" });
        gsap.to(line2Ref.value, { opacity: 1, scaleX: 1, duration: 0.2, delay: 0.1 });
        gsap.to(line3Ref.value, { y: 0, rotation: 0, duration: 0.3, ease: "power2.inOut" });
      }
    },
  },
  "menu-slide": {
    onClick: () => {
      isMenuOpen.value = !isMenuOpen.value;
      if (isMenuOpen.value && overlayRef.value && contentRef.value) {
        gsap.to(overlayRef.value, { opacity: 1, visibility: "visible", duration: 0.3 });
        gsap.to(contentRef.value, { x: 0, duration: 0.4, ease: "power3.out" });
      } else if (overlayRef.value && contentRef.value) {
        gsap.to(contentRef.value, { x: "-100%", duration: 0.3, ease: "power3.in" });
        gsap.to(overlayRef.value, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => gsap.set(overlayRef.value, { visibility: "hidden" }),
        });
      }
    },
  },
  "menu-fullscreen": {
    onClick: () => {
      isMenuOpen.value = !isMenuOpen.value;
      if (isMenuOpen.value && overlayRef.value) {
        gsap.to(overlayRef.value, {
          clipPath: "circle(150% at top right)",
          duration: 0.8,
          ease: "power3.inOut",
        });
      } else if (overlayRef.value) {
        gsap.to(overlayRef.value, {
          clipPath: "circle(0% at top right)",
          duration: 0.6,
          ease: "power3.inOut",
        });
      }
    },
  },
  "dropdown-anim": {
    onEnter: () => {
      if (!contentRef.value) return;
      gsap.to(contentRef.value, { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" });
    },
    onLeave: () => {
      if (!contentRef.value) return;
      gsap.to(contentRef.value, { height: 0, opacity: 0, duration: 0.2 });
    },
  },
  "mega-menu": {
    onEnter: () => {
      if (!contentRef.value) return;
      gsap.to(contentRef.value, { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" });
    },
    onLeave: () => {
      if (!contentRef.value) return;
      gsap.to(contentRef.value, { height: 0, opacity: 0, duration: 0.3 });
    },
  },
  "link-underline": {
    onEnter: () => {
      if (!lineRef.value) return;
      gsap.fromTo(
        lineRef.value,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.4, ease: "power2.out" }
      );
    },
    onLeave: () => {
      if (!lineRef.value) return;
      gsap.to(lineRef.value, {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 0.3,
        ease: "power2.in",
      });
    },
  },
  "link-fill": {
    onEnter: () => {
      if (!bgRef.value) return;
      gsap.to(bgRef.value, { clipPath: "inset(0 0 0 0)", duration: 0.4, ease: "power2.out" });
    },
    onLeave: () => {
      if (!bgRef.value) return;
      gsap.to(bgRef.value, { clipPath: "inset(0 100% 0 0)", duration: 0.3, ease: "power2.in" });
    },
  },
  "active-indicator": {
    onClick: () => {
      // Handled in template with specific logic
    },
  },
  breadcrumb: {
    // Auto-animates on mount, handled in template
  },
  // Container effects
  accordion: {
    // Handled in template with specific logic
  },
  tabs: {
    // Handled in template with specific logic
  },
  // Cursor effects - all handled in template with specific logic
  "cursor-custom": {},
  "cursor-follower": {},
  "cursor-magnetic": {},
  "cursor-text": {},
  "cursor-blend": {},
  "cursor-trail": {},
  // Micro effects - most handled in template with specific logic
  "input-focus": {},
  "input-validation": {},
  checkbox: {},
  toggle: {},
  select: {},
  toast: {},
  tooltip: {},
  modal: {},
  popover: {},
  "copy-feedback": {},
  "like-heart": {},
  bookmark: {},
  // 3D effects - most handled in template with specific logic
  "3d-card-flip": {},
  "3d-carousel": {},
  "perspective-scroll": {},
  "3d-text": {},
  "parallax-3d": {},
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
const isTextLink = computed(() =>
  ["hover-underline", "link-underline", "link-fill"].includes(props.effect.id)
);

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
    case "btn-bg-slide":
      return "Батырмаға hover жасаңыз";
    case "btn-border":
      return "Батырмаға hover жасаңыз";
    case "btn-click":
      return "Батырманы басыңыз";
    case "btn-loading":
      return "Батырманы басыңыз - жүктелу анимациясы";
    case "btn-success":
      return "Батырманы басыңыз - сәтті орындалу";
    case "btn-error":
      return "Батырманы басыңыз - қате анимациясы";
    case "btn-icon-rotate":
      return "Батырмаға hover жасаңыз - иконка айналады";
    case "btn-icon-morph":
      return "Батырманы басыңыз - иконка өзгереді";
    case "btn-icon-bounce":
      return "Батырмаға hover жасаңыз - иконка секіреді";
    case "card-lift":
      return "Карточкаға hover жасаңыз";
    case "card-tilt":
      return "Курсорды карточка үстінде қозғаңыз";
    case "card-flip":
      return "Карточканы басыңыз - аударылады";
    case "card-expand":
      return "Карточканы басыңыз - кеңейеді";
    case "card-glow":
      return "Карточкаға hover жасаңыз - жарқырау";
    case "card-border":
      return "Карточкаға hover жасаңыз - жиек";
    case "card-gradient":
      return "Карточкаға hover жасаңыз - градиент";
    case "card-content-slide":
      return "Карточкаға hover жасаңыз - контент";
    case "card-overlay":
      return "Карточкаға hover жасаңыз - қабат";
    case "card-icon":
      return "Карточкаға hover жасаңыз - иконка";
    case "hover-underline":
      return "Мәтінге hover жасаңыз";
    // Navigation effects
    case "hamburger-x":
      return "Гамбургер мәзірді басыңыз";
    case "menu-slide":
      return "Мәзірді ашу батырмасын басыңыз";
    case "menu-fullscreen":
      return "Мәзірді ашу батырмасын басыңыз";
    case "menu-stagger":
      return "Мәзір элементтері stagger анимациямен пайда болады";
    case "dropdown-anim":
      return "Dropdown-ға hover жасаңыз";
    case "mega-menu":
      return "Мега мәзірге hover жасаңыз";
    case "link-underline":
      return "Сілтемеге hover жасаңыз";
    case "link-fill":
      return "Сілтемеге hover жасаңыз";
    case "active-indicator":
      return "Навигация элементін басыңыз";
    case "breadcrumb":
      return "Breadcrumb анимациясы";
    // Container effects
    case "accordion":
      return "Аккордеон элементін басыңыз";
    case "tabs":
      return "Табты таңдаңыз";
    // Cursor effects
    case "cursor-custom":
    case "cursor-follower":
    case "cursor-text":
    case "cursor-blend":
    case "cursor-trail":
      return "Тінтуірді аймақта жылжытыңыз";
    case "cursor-magnetic":
      return "Батырмаға жақындаңыз";
    // Micro effects
    case "input-focus":
      return "Input өрісіне фокус жасаңыз";
    case "input-validation":
      return "Email мекенжайын енгізіңіз";
    case "checkbox":
      return "Checkbox-ты басыңыз";
    case "toggle":
      return "Toggle-ды басыңыз";
    case "select":
      return "Select-ты ашыңыз";
    case "toast":
      return "Батырманы басыңыз - toast хабарлама";
    case "tooltip":
      return "Батырмаға hover жасаңыз - tooltip";
    case "modal":
      return "Батырманы басыңыз - modal терезесі";
    case "popover":
      return "Батырманы басыңыз - popover";
    case "copy-feedback":
      return "Көшіру батырмасын басыңыз";
    case "like-heart":
      return "Жүрекшені басыңыз";
    case "bookmark":
      return "Бетбелгіні басыңыз";
    // 3D effects
    case "3d-card-flip":
      return "3D карточканы басыңыз";
    case "3d-carousel":
      return "Батырмаларды басып карусельді айналдырыңыз";
    case "3d-text":
      return "Тінтуірді мәтін үстінде жылжытыңыз";
    case "parallax-3d":
      return "Тінтуірді аймақта жылжытыңыз";
    default:
      return "Элементке hover жасаңыз";
  }
});

// Determine which special elements are needed
const needsBgSlide = computed(() => props.effect.id === "btn-bg-slide");
const needsBorder = computed(() => props.effect.id === "btn-border");
const needsIcon = computed(() => ["btn-icon-rotate", "btn-icon-bounce"].includes(props.effect.id));
const needsIconMorph = computed(() => props.effect.id === "btn-icon-morph");
const isLoadingBtn = computed(() => props.effect.id === "btn-loading");
const isSuccessBtn = computed(() => props.effect.id === "btn-success");
const isErrorBtn = computed(() => props.effect.id === "btn-error");

// Navigation-specific computed
const isHamburger = computed(() => props.effect.id === "hamburger-x");
const isMenuSlide = computed(() => props.effect.id === "menu-slide");
const isMenuFullscreen = computed(() => props.effect.id === "menu-fullscreen");
const isDropdown = computed(() => props.effect.id === "dropdown-anim");
const isMegaMenu = computed(() => props.effect.id === "mega-menu");
const isLinkUnderline = computed(() => props.effect.id === "link-underline");
const isLinkFill = computed(() => props.effect.id === "link-fill");
const isActiveIndicator = computed(() => props.effect.id === "active-indicator");
const isBreadcrumb = computed(() => props.effect.id === "breadcrumb");
const isAccordion = computed(() => props.effect.id === "accordion");
const isTabs = computed(() => props.effect.id === "tabs");

// Micro-interaction computed
const isInputFocus = computed(() => props.effect.id === "input-focus");
const isInputValidation = computed(() => props.effect.id === "input-validation");
const isCheckbox = computed(() => props.effect.id === "checkbox");
const isToggle = computed(() => props.effect.id === "toggle");
const isSelect = computed(() => props.effect.id === "select");
const isToast = computed(() => props.effect.id === "toast");
const isTooltip = computed(() => props.effect.id === "tooltip");
const isModal = computed(() => props.effect.id === "modal");
const isPopover = computed(() => props.effect.id === "popover");
const isCopyFeedback = computed(() => props.effect.id === "copy-feedback");
const isLikeHeart = computed(() => props.effect.id === "like-heart");
const isBookmarkEffect = computed(() => props.effect.id === "bookmark");

// 3D computed
const is3dCardFlip = computed(() => props.effect.id === "3d-card-flip");
const is3dCarousel = computed(() => props.effect.id === "3d-carousel");
const is3dText = computed(() => props.effect.id === "3d-text");
const isParallax3d = computed(() => props.effect.id === "parallax-3d");

// Accordion state
const accordionItems = [
  { title: "Item 1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { title: "Item 2", content: "Sed do eiusmod tempor incididunt ut labore et dolore." },
  { title: "Item 3", content: "Ut enim ad minim veniam, quis nostrud exercitation." },
];
const activeAccordion = ref(-1);
const accordionRefs = ref<HTMLElement[]>([]);

const toggleAccordion = (index: number) => {
  const content = accordionRefs.value[index];
  if (!content) return;

  if (activeAccordion.value === index) {
    gsap.to(content, { height: 0, duration: 0.3, ease: "power2.inOut" });
    activeAccordion.value = -1;
  } else {
    if (activeAccordion.value !== -1 && accordionRefs.value[activeAccordion.value]) {
      gsap.to(accordionRefs.value[activeAccordion.value], { height: 0, duration: 0.3 });
    }
    gsap.to(content, { height: "auto", duration: 0.4, ease: "power2.out" });
    activeAccordion.value = index;
  }
};

// Tabs state
const tabItems = [
  { label: "Tab 1", content: "Content for Tab 1 - Lorem ipsum dolor sit amet." },
  { label: "Tab 2", content: "Content for Tab 2 - Consectetur adipiscing elit." },
  { label: "Tab 3", content: "Content for Tab 3 - Sed do eiusmod tempor." },
];
const activeTabIndex = ref(0);
const tabIndicatorRef = ref<HTMLElement | null>(null);
const tabButtonRefs = ref<HTMLElement[]>([]);
const tabContentRef = ref<HTMLElement | null>(null);

const setActiveTab = async (index: number) => {
  if (index === activeTabIndex.value) return;

  // Animate content out
  if (tabContentRef.value) {
    await gsap.to(tabContentRef.value, { opacity: 0, y: 10, duration: 0.2 });
  }

  activeTabIndex.value = index;
  await nextTick();

  // Move indicator
  if (tabIndicatorRef.value && tabButtonRefs.value[index]) {
    const btn = tabButtonRefs.value[index];
    gsap.to(tabIndicatorRef.value, {
      x: btn.offsetLeft,
      width: btn.offsetWidth,
      duration: 0.3,
      ease: "power2.out",
    });
  }

  // Animate content in
  if (tabContentRef.value) {
    gsap.fromTo(tabContentRef.value, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.3 });
  }
};

// Active indicator state
const activeNavIndex = ref(0);
const navItems = ["Home", "About", "Work", "Contact"];
const indicatorRef = ref<HTMLElement | null>(null);
const navItemRefs = ref<HTMLElement[]>([]);

const setActiveNav = (index: number) => {
  activeNavIndex.value = index;
  nextTick(() => {
    if (indicatorRef.value && navItemRefs.value[index]) {
      const item = navItemRefs.value[index];
      gsap.to(indicatorRef.value, {
        x: item.offsetLeft,
        width: item.offsetWidth,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  });
};

// Breadcrumb refs and animation
const breadcrumbRefs = ref<HTMLElement[]>([]);
const breadcrumbItems = ["Home", "Products", "Electronics"];

// Cursor refs
const cursorContainerRef = ref<HTMLElement | null>(null);
const cursorRef = ref<HTMLElement | null>(null);
const cursorFollowerRef = ref<HTMLElement | null>(null);
const cursorDotsRef = ref<HTMLElement[]>([]);
const cursorPos = ref({ x: 0, y: 0 });
const cursorVisible = ref(false);

// Micro-interaction state
const inputFocused = ref(false);
const inputValue = ref("");
const emailValue = ref("");
const isEmailValid = ref(false);
const isChecked = ref(false);
const isToggleOn = ref(false);
const isSelectOpen = ref(false);
const selectedOption = ref("");
const selectOptions = ["Option 1", "Option 2", "Option 3"];
const isToastVisible = ref(false);
const isModalOpen = ref(false);
const isPopoverOpen = ref(false);
const isCopied = ref(false);
const isLiked = ref(false);
const likeCount = ref(42);
const isBookmarked = ref(false);

// Micro-interaction refs
const inputLineRef = ref<HTMLElement | null>(null);
const inputLabelRef = ref<HTMLElement | null>(null);
const validationIconRef = ref<HTMLElement | null>(null);
const checkboxPathRef = ref<SVGElement | null>(null);
const toggleThumbRef = ref<HTMLElement | null>(null);
const toggleTrackRef = ref<HTMLElement | null>(null);
const selectArrowRef = ref<HTMLElement | null>(null);
const selectOptionsRef = ref<HTMLElement | null>(null);
const toastRef = ref<HTMLElement | null>(null);
const tooltipRef = ref<HTMLElement | null>(null);
const modalOverlayRef = ref<HTMLElement | null>(null);
const modalContentRef = ref<HTMLElement | null>(null);
const popoverContentRef = ref<HTMLElement | null>(null);
const copyIconRef = ref<HTMLElement | null>(null);
const heartRef = ref<HTMLElement | null>(null);
const heartCountRef = ref<HTMLElement | null>(null);
const bookmarkSvgRef = ref<HTMLElement | null>(null);
const bookmarkPathRef = ref<SVGPathElement | null>(null);

// 3D effect state
const is3dFlipped = ref(false);
const carouselAngle = ref(0);
const textLayersRef = ref<HTMLElement | null>(null);
const layer1Ref = ref<HTMLElement | null>(null);
const layer2Ref = ref<HTMLElement | null>(null);
const layer3Ref = ref<HTMLElement | null>(null);
const carouselRef = ref<HTMLElement | null>(null);

const onCursorMove = (e: MouseEvent) => {
  if (!cursorContainerRef.value) return;
  const rect = cursorContainerRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  cursorPos.value = { x, y };

  if (cursorRef.value) {
    const size =
      props.effect.id === "cursor-blend" ? 40 : props.effect.id === "cursor-text" ? 50 : 15;
    gsap.to(cursorRef.value, { x: x - size, y: y - size, duration: 0.1, ease: "power2.out" });
  }
  if (cursorFollowerRef.value) {
    gsap.to(cursorFollowerRef.value, { x: x - 20, y: y - 20, duration: 0.4, ease: "power2.out" });
  }
};

const onCursorEnter = () => {
  cursorVisible.value = true;
  const targets = [cursorRef.value, cursorFollowerRef.value].filter(Boolean);
  if (targets.length > 0) {
    gsap.to(targets, { scale: 1, opacity: 1, duration: 0.3 });
  }
  const validDots = cursorDotsRef.value.filter(Boolean);
  if (validDots.length > 0) {
    gsap.to(validDots, { scale: 1, duration: 0.3, stagger: 0.02 });
  }
};

const onCursorLeave = () => {
  cursorVisible.value = false;
  const targets = [cursorRef.value, cursorFollowerRef.value].filter(Boolean);
  if (targets.length > 0) {
    gsap.to(targets, { scale: 0, opacity: 0, duration: 0.3 });
  }
  const validDots = cursorDotsRef.value.filter(Boolean);
  if (validDots.length > 0) {
    gsap.to(validDots, { scale: 0, duration: 0.3, stagger: 0.02 });
  }
};

const onMagneticMove = (e: MouseEvent) => {
  if (!elementRef.value) return;
  const rect = elementRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  gsap.to(elementRef.value, { x: x * 0.4, y: y * 0.4, duration: 0.3, ease: "power2.out" });
};

const onMagneticLeave = () => {
  if (!elementRef.value) return;
  gsap.to(elementRef.value, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
};

// Micro-interaction handlers
const onInputFocus = () => {
  inputFocused.value = true;
  gsap.to(inputLineRef.value, { scaleX: 1, duration: 0.3, ease: "power2.out" });
  gsap.to(inputLabelRef.value, {
    y: -25,
    scale: 0.8,
    color: "#0ae448",
    duration: 0.3,
    ease: "power2.out",
  });
};

const onInputBlur = () => {
  if (!inputValue.value) {
    inputFocused.value = false;
    gsap.to(inputLineRef.value, { scaleX: 0, duration: 0.3 });
    gsap.to(inputLabelRef.value, { y: 0, scale: 1, color: "#a1a1a6", duration: 0.3 });
  }
};

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const valid = emailRegex.test(emailValue.value);

  if (valid !== isEmailValid.value) {
    isEmailValid.value = valid;
    gsap.fromTo(
      validationIconRef.value,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.4, ease: "back.out(1.7)" }
    );
  }
};

const toggleCheckbox = () => {
  isChecked.value = !isChecked.value;
  const path = checkboxPathRef.value;
  if (!path) return;

  const length = (path as unknown as SVGGeometryElement).getTotalLength();

  if (isChecked.value) {
    gsap.to(elementRef.value, {
      backgroundColor: "#0ae448",
      borderColor: "#0ae448",
      duration: 0.2,
    });
    gsap.to(path, { strokeDashoffset: 0, duration: 0.3, ease: "power2.out" });
  } else {
    gsap.to(elementRef.value, {
      backgroundColor: "transparent",
      borderColor: "#2a2d2b",
      duration: 0.2,
    });
    gsap.to(path, { strokeDashoffset: length, duration: 0.2 });
  }
};

const toggleSwitch = () => {
  isToggleOn.value = !isToggleOn.value;
  gsap.to(toggleThumbRef.value, {
    x: isToggleOn.value ? 24 : 0,
    duration: 0.3,
    ease: "back.out(1.5)",
  });
  gsap.to(toggleTrackRef.value, {
    backgroundColor: isToggleOn.value ? "#0ae448" : "#2a2d2b",
    duration: 0.2,
  });
};

const toggleSelect = () => {
  isSelectOpen.value = !isSelectOpen.value;
  gsap.to(selectArrowRef.value, { rotation: isSelectOpen.value ? 180 : 0, duration: 0.3 });

  if (isSelectOpen.value) {
    gsap.to(selectOptionsRef.value, {
      height: "auto",
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  } else {
    gsap.to(selectOptionsRef.value, { height: 0, opacity: 0, duration: 0.2 });
  }
};

const selectOption = (opt: string) => {
  selectedOption.value = opt;
  toggleSelect();
};

const showToast = () => {
  if (isToastVisible.value) return;
  isToastVisible.value = true;

  const tl = gsap.timeline();
  tl.fromTo(
    toastRef.value,
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
  ).to(toastRef.value, {
    y: 100,
    opacity: 0,
    duration: 0.3,
    delay: 2,
    onComplete: () => {
      isToastVisible.value = false;
    },
  });
};

const showTooltipAnim = () => {
  gsap.to(tooltipRef.value, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.7)" });
};

const hideTooltipAnim = () => {
  gsap.to(tooltipRef.value, { opacity: 0, y: 10, scale: 0.9, duration: 0.2 });
};

const openModal = () => {
  isModalOpen.value = true;
  gsap.to(modalOverlayRef.value, { opacity: 1, visibility: "visible", duration: 0.3 });
  gsap.fromTo(
    modalContentRef.value,
    { scale: 0.8, y: 50 },
    { scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
  );
};

const closeModal = () => {
  gsap.to(modalContentRef.value, { scale: 0.8, y: 50, duration: 0.2 });
  gsap.to(modalOverlayRef.value, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      gsap.set(modalOverlayRef.value, { visibility: "hidden" });
      isModalOpen.value = false;
    },
  });
};

const togglePopover = () => {
  isPopoverOpen.value = !isPopoverOpen.value;

  if (isPopoverOpen.value) {
    gsap.fromTo(
      popoverContentRef.value,
      { opacity: 0, scale: 0.9, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
    );
  } else {
    gsap.to(popoverContentRef.value, { opacity: 0, scale: 0.9, y: 10, duration: 0.2 });
  }
};

const copyToClipboard = async () => {
  if (isCopied.value) return;

  await navigator.clipboard.writeText("npm install gsap");
  isCopied.value = true;

  gsap.to(copyIconRef.value, {
    scale: 0,
    duration: 0.15,
    onComplete: () => {
      gsap.to(copyIconRef.value, { scale: 1, duration: 0.2, ease: "back.out(1.7)" });
    },
  });

  gsap.to(elementRef.value, { backgroundColor: "#0ae448", duration: 0.2 });

  setTimeout(() => {
    isCopied.value = false;
    gsap.to(elementRef.value, { backgroundColor: "#1c1e1d", duration: 0.2 });
  }, 2000);
};

const toggleLike = () => {
  isLiked.value = !isLiked.value;
  likeCount.value += isLiked.value ? 1 : -1;

  if (isLiked.value) {
    gsap
      .timeline()
      .to(heartRef.value, { scale: 1.5, duration: 0.15 })
      .to(heartRef.value, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" });
  } else {
    gsap.to(heartRef.value, { scale: 0.8, duration: 0.1 });
    gsap.to(heartRef.value, { scale: 1, duration: 0.2, delay: 0.1 });
  }

  gsap.fromTo(
    heartCountRef.value,
    { y: isLiked.value ? 10 : -10, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.2 }
  );
};

const toggleBookmarkAnim = () => {
  isBookmarked.value = !isBookmarked.value;

  if (isBookmarked.value) {
    gsap
      .timeline()
      .to(bookmarkSvgRef.value, { y: -5, duration: 0.1 })
      .to(bookmarkSvgRef.value, { y: 0, duration: 0.3, ease: "bounce.out" })
      .to(bookmarkPathRef.value, { fill: "#0ae448", duration: 0.2 }, 0);
  } else {
    gsap.to(bookmarkPathRef.value, { fill: "transparent", duration: 0.2 });
    gsap.to(bookmarkSvgRef.value, { scale: 0.9, duration: 0.1 });
    gsap.to(bookmarkSvgRef.value, { scale: 1, duration: 0.2, delay: 0.1 });
  }
};

// 3D effect handlers
const flip3dCard = () => {
  is3dFlipped.value = !is3dFlipped.value;
  gsap.to(elementRef.value, {
    rotateY: is3dFlipped.value ? 180 : 0,
    duration: 0.8,
    ease: "power2.inOut",
  });
};

const rotateCarousel = (direction: number) => {
  carouselAngle.value += 72 * direction; // 360 / 5 items = 72 degrees
  gsap.to(carouselRef.value, {
    rotateY: carouselAngle.value,
    duration: 0.6,
    ease: "power2.out",
  });
};

const on3dTextMove = (e: MouseEvent) => {
  if (!cursorContainerRef.value || !textLayersRef.value) return;
  const rect = cursorContainerRef.value.getBoundingClientRect();
  const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
  const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

  gsap.to(textLayersRef.value, {
    rotateX: y * -20,
    rotateY: x * 20,
    duration: 0.3,
    ease: "power2.out",
  });
};

const on3dTextLeave = () => {
  if (!textLayersRef.value) return;
  gsap.to(textLayersRef.value, {
    rotateX: 0,
    rotateY: 0,
    duration: 0.5,
    ease: "elastic.out(1, 0.5)",
  });
};

const onParallax3dMove = (e: MouseEvent) => {
  if (!cursorContainerRef.value) return;
  const rect = cursorContainerRef.value.getBoundingClientRect();
  const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
  const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

  gsap.to(layer1Ref.value, { x: x * 60, y: y * 60, duration: 0.4, ease: "power2.out" });
  gsap.to(layer2Ref.value, { x: x * 30, y: y * 30, duration: 0.4, ease: "power2.out" });
  gsap.to(layer3Ref.value, { x: x * 10, y: y * 10, duration: 0.4, ease: "power2.out" });
};

const onParallax3dLeave = () => {
  gsap.to([layer1Ref.value, layer2Ref.value, layer3Ref.value], {
    x: 0,
    y: 0,
    duration: 0.6,
    ease: "elastic.out(1, 0.5)",
  });
};

onMounted(() => {
  if (props.effect.id === "breadcrumb" && breadcrumbRefs.value.length > 0) {
    gsap.from(breadcrumbRefs.value, {
      x: -20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out",
    });
  }
  if (props.effect.id === "active-indicator" && indicatorRef.value && navItemRefs.value[0]) {
    gsap.set(indicatorRef.value, {
      x: navItemRefs.value[0].offsetLeft,
      width: navItemRefs.value[0].offsetWidth,
    });
  }
  if (props.effect.id === "tabs" && tabIndicatorRef.value && tabButtonRefs.value[0]) {
    gsap.set(tabIndicatorRef.value, {
      x: tabButtonRefs.value[0].offsetLeft,
      width: tabButtonRefs.value[0].offsetWidth,
    });
  }
  // Checkbox initialization
  if (props.effect.id === "checkbox" && checkboxPathRef.value) {
    const path = checkboxPathRef.value as unknown as SVGGeometryElement;
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
  }

  // Cursor effects initialization
  if (props.effect.category === "cursor") {
    if (cursorRef.value) gsap.set(cursorRef.value, { scale: 0, opacity: 0 });
    if (cursorFollowerRef.value) gsap.set(cursorFollowerRef.value, { scale: 0, opacity: 0 });
    const validDots = cursorDotsRef.value.filter(Boolean);
    if (validDots.length > 0) gsap.set(validDots, { scale: 0 });

    // Text cursor rotation
    if (props.effect.id === "cursor-text" && cursorRef.value) {
      const svg = cursorRef.value.querySelector("svg");
      if (svg) {
        gsap.to(svg, { rotation: 360, duration: 8, ease: "none", repeat: -1 });
      }
    }

    // Trail effect ticker
    if (props.effect.id === "cursor-trail") {
      gsap.ticker.add(() => {
        const validDots = cursorDotsRef.value.filter(Boolean);
        validDots.forEach((dot, i) => {
          gsap.to(dot, {
            x: cursorPos.value.x - 5,
            y: cursorPos.value.y - 5,
            duration: (i + 1) * 0.05,
            ease: "power2.out",
          });
        });
      });
    }
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
        class="absolute inset-0 opacity-10 pointer-events-none"
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
        class="relative overflow-hidden px-8 py-4 font-bold rounded-xl text-lg shadow-lg"
        :class="[
          needsBgSlide || needsBorder
            ? 'bg-transparent text-gsap-text-primary border-2 border-gsap-green'
            : isErrorBtn && error
              ? 'bg-red-500 text-white'
              : isSuccessBtn && success
                ? 'bg-green-600 text-white'
                : 'bg-gsap-green text-black',
        ]"
        :style="{
          transformStyle: effect.id === 'btn-3d-press' ? 'preserve-3d' : undefined,
          perspective: effect.id === 'btn-3d-press' ? '500px' : undefined,
        }"
        :disabled="isLoadingBtn && loading"
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

        <!-- Background slide element -->
        <span
          v-if="needsBgSlide"
          ref="bgRef"
          class="absolute inset-0 bg-gsap-green pointer-events-none"
          style="transform: translateX(-100%)"
        />

        <!-- Border animation element -->
        <span
          v-if="needsBorder"
          ref="borderRef"
          class="absolute inset-0 border-2 border-gsap-green rounded-xl pointer-events-none"
          style="clip-path: inset(0 100% 0 0)"
        />

        <!-- Icon for icon effects -->
        <span v-if="needsIcon" class="flex items-center gap-2">
          <span ref="iconRef" class="text-xl">{{
            effect.id === "btn-icon-rotate" ? "↻" : "↓"
          }}</span>
          <span class="relative z-10">{{ effect.defaultText }}</span>
        </span>

        <!-- Icon morph (hamburger to X) -->
        <span v-else-if="needsIconMorph" class="flex items-center gap-2">
          <span class="relative w-6 h-6">
            <span ref="line1Ref" class="absolute w-6 h-0.5 bg-current top-1 left-0" />
            <span
              ref="line2Ref"
              class="absolute w-6 h-0.5 bg-current top-1/2 -translate-y-1/2 left-0"
            />
            <span ref="line3Ref" class="absolute w-6 h-0.5 bg-current bottom-1 left-0" />
          </span>
          <span class="relative z-10">{{ effect.defaultText }}</span>
        </span>

        <!-- Loading button -->
        <span v-else-if="isLoadingBtn" class="relative min-w-[100px]">
          <span :class="{ 'opacity-0': loading }">{{ effect.defaultText }}</span>
          <span v-if="loading" class="absolute inset-0 flex items-center justify-center">
            <span
              class="spinner-icon w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
            />
          </span>
        </span>

        <!-- Success button -->
        <span v-else-if="isSuccessBtn" class="relative min-w-[100px]">
          <span :class="{ 'opacity-0': success }">{{ effect.defaultText }}</span>
          <span
            v-if="success"
            ref="checkRef"
            class="absolute inset-0 flex items-center justify-center text-2xl"
          >
            ✓
          </span>
        </span>

        <!-- Error button -->
        <span v-else-if="isErrorBtn">
          {{ error ? "Қате!" : effect.defaultText }}
        </span>

        <!-- Default text -->
        <span v-else class="relative z-10">{{ effect.defaultText }}</span>
      </button>

      <!-- Text Link Element (hover-underline) -->
      <a
        v-else-if="isTextLink"
        ref="elementRef"
        href="#"
        class="relative text-3xl md:text-4xl font-bold text-gsap-text-primary inline-block cursor-pointer"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @click.prevent
      >
        {{ effect.defaultText }}
        <span
          ref="lineRef"
          class="absolute bottom-0 left-0 w-full h-1 bg-gsap-green origin-left"
          style="transform: scaleX(0)"
        />
      </a>

      <!-- Card Element -->
      <!-- Card Flip -->
      <div
        v-else-if="effect.id === 'card-flip'"
        class="w-64 h-40 cursor-pointer"
        style="perspective: 1000px"
        @click="onClick"
      >
        <div ref="elementRef" class="relative w-full h-full" style="transform-style: preserve-3d">
          <div
            class="absolute inset-0 bg-gsap-green rounded-xl p-6 flex items-center justify-center"
            style="backface-visibility: hidden"
          >
            <span class="text-black font-bold text-xl">Алдыңғы жақ</span>
          </div>
          <div
            class="absolute inset-0 bg-gsap-bg-secondary rounded-xl p-6 flex items-center justify-center"
            style="backface-visibility: hidden; transform: rotateY(180deg)"
          >
            <span class="text-gsap-text-primary font-bold text-xl">Артқы жақ</span>
          </div>
        </div>
      </div>

      <!-- Card Expand -->
      <div
        v-else-if="effect.id === 'card-expand'"
        ref="elementRef"
        class="w-64 bg-gsap-bg-secondary rounded-xl p-6 cursor-pointer overflow-hidden"
        style="height: 160px"
        @click="onClick"
      >
        <h3 class="text-gsap-text-primary font-bold text-lg mb-2">Кеңейетін карточка</h3>
        <p
          ref="contentRef"
          class="text-gsap-text-muted text-sm overflow-hidden"
          style="max-height: 0; opacity: 0"
        >
          Бұл қосымша контент. Карточканы басқанда пайда болады.
        </p>
      </div>

      <!-- Card Border -->
      <div
        v-else-if="effect.id === 'card-border'"
        class="relative w-64 h-40"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <div
          ref="borderRef"
          class="absolute inset-0 rounded-xl"
          style="background: linear-gradient(90deg, #0ae448, #0ba934, #0ae448); opacity: 0"
        />
        <div
          ref="elementRef"
          class="absolute inset-[2px] bg-gsap-bg-secondary rounded-xl p-6 cursor-pointer flex items-center justify-center"
        >
          <span class="text-gsap-text-primary font-bold text-xl">{{ effect.defaultText }}</span>
        </div>
      </div>

      <!-- Card Gradient -->
      <div
        v-else-if="effect.id === 'card-gradient'"
        ref="elementRef"
        class="w-64 h-40 rounded-xl p-6 cursor-pointer flex items-center justify-center"
        style="
          background: linear-gradient(135deg, #0ae448 0%, #0ba934 50%, #089c2d 100%);
          background-size: 200% 200%;
        "
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <span class="text-black font-bold text-xl">{{ effect.defaultText }}</span>
      </div>

      <!-- Card Content Slide -->
      <div
        v-else-if="effect.id === 'card-content-slide'"
        class="w-64 h-40 bg-gsap-bg-secondary rounded-xl overflow-hidden cursor-pointer"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <div ref="contentRef" class="h-full p-6" style="transform: translateY(40px)">
          <h3 class="text-gsap-text-primary font-bold text-lg mb-2">Сырғымалы контент</h3>
          <p class="text-gsap-text-muted text-sm">Hover жасаңыз</p>
          <p ref="extraContentRef" class="text-gsap-green text-sm mt-4" style="opacity: 0">
            Қосымша ақпарат →
          </p>
        </div>
      </div>

      <!-- Card Overlay -->
      <div
        v-else-if="effect.id === 'card-overlay'"
        class="relative w-64 h-40 bg-gsap-green rounded-xl overflow-hidden cursor-pointer"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-black font-bold text-xl">{{ effect.defaultText }}</span>
        </div>
        <div
          ref="overlayRef"
          class="absolute inset-0 bg-black/80 flex items-center justify-center"
          style="opacity: 0"
        >
          <span class="text-white font-bold text-lg">Толығырақ →</span>
        </div>
      </div>

      <!-- Card Icon -->
      <div
        v-else-if="effect.id === 'card-icon'"
        ref="elementRef"
        class="w-64 h-40 bg-gsap-bg-secondary rounded-xl p-6 cursor-pointer"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <div ref="iconRef" class="text-4xl mb-4">🚀</div>
        <h3 class="text-gsap-text-primary font-bold text-lg">{{ effect.defaultText }}</h3>
      </div>

      <!-- Default Card -->
      <div
        v-else-if="isCard"
        ref="elementRef"
        class="relative w-64 h-40 bg-gsap-bg-secondary rounded-xl shadow-lg p-6 cursor-pointer"
        :style="{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @mousemove="onMouseMove"
      >
        <h3 class="text-gsap-text-primary font-bold text-lg mb-2">{{ effect.defaultText }}</h3>
        <p class="text-gsap-text-muted text-sm">Hover жасаңыз</p>
      </div>

      <!-- Navigation: Hamburger to X -->
      <button
        v-else-if="isHamburger"
        ref="elementRef"
        class="flex flex-col gap-1.5 p-4 bg-gsap-bg-secondary rounded-xl cursor-pointer"
        @click="onClick"
      >
        <span ref="line1Ref" class="w-8 h-0.5 bg-gsap-green rounded origin-center" />
        <span ref="line2Ref" class="w-8 h-0.5 bg-gsap-green rounded origin-center" />
        <span ref="line3Ref" class="w-8 h-0.5 bg-gsap-green rounded origin-center" />
      </button>

      <!-- Navigation: Menu Slide -->
      <div v-else-if="isMenuSlide" class="relative w-full max-w-md">
        <button class="px-6 py-3 bg-gsap-green text-black font-bold rounded-xl" @click="onClick">
          {{ isMenuOpen ? "Жабу" : "Мәзірді ашу" }}
        </button>
        <div
          ref="overlayRef"
          class="absolute inset-0 bg-black/50 rounded-xl"
          style="opacity: 0; visibility: hidden"
          @click="onClick"
        />
        <div
          ref="contentRef"
          class="absolute top-14 left-0 w-48 bg-gsap-bg-secondary rounded-xl p-4 shadow-lg"
          style="transform: translateX(-100%)"
        >
          <a
            v-for="i in 4"
            :key="i"
            href="#"
            class="block py-2 text-gsap-text-primary hover:text-gsap-green"
          >
            Menu Item {{ i }}
          </a>
        </div>
      </div>

      <!-- Navigation: Fullscreen Menu -->
      <div v-else-if="isMenuFullscreen" class="relative">
        <button
          class="px-6 py-3 bg-gsap-green text-black font-bold rounded-xl z-10 relative"
          @click="onClick"
        >
          {{ isMenuOpen ? "✕" : "☰" }}
        </button>
        <div
          ref="overlayRef"
          class="fixed inset-0 bg-gsap-bg-primary flex items-center justify-center"
          style="clip-path: circle(0% at top right)"
        >
          <div class="text-center">
            <a
              v-for="item in ['Басты', 'Жобалар', 'Біз туралы']"
              :key="item"
              href="#"
              class="block text-3xl text-gsap-text-primary hover:text-gsap-green py-4"
            >
              {{ item }}
            </a>
          </div>
        </div>
      </div>

      <!-- Navigation: Dropdown -->
      <div
        v-else-if="isDropdown"
        class="relative inline-block"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <button
          class="px-6 py-3 bg-gsap-bg-secondary text-gsap-text-primary border border-gsap-border rounded-xl flex items-center gap-2"
        >
          Services
          <span class="text-xs">▼</span>
        </button>
        <div
          ref="contentRef"
          class="absolute top-full left-0 mt-1 w-48 bg-gsap-bg-secondary border border-gsap-border rounded-xl overflow-hidden"
          style="height: 0; opacity: 0"
        >
          <a
            v-for="item in ['Web Development', 'Mobile Apps', 'UI/UX Design']"
            :key="item"
            href="#"
            class="block px-4 py-3 text-gsap-text-primary hover:bg-gsap-green hover:text-black"
          >
            {{ item }}
          </a>
        </div>
      </div>

      <!-- Navigation: Mega Menu -->
      <div
        v-else-if="isMegaMenu"
        class="relative"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <button
          class="px-6 py-3 bg-gsap-bg-secondary text-gsap-text-primary border border-gsap-border rounded-xl"
        >
          Products ▼
        </button>
        <div
          ref="contentRef"
          class="absolute top-full left-0 mt-1 flex gap-6 p-6 bg-gsap-bg-secondary border border-gsap-border rounded-xl"
          style="height: 0; opacity: 0; min-width: 400px"
        >
          <div
            v-for="col in [
              { title: 'Software', items: ['Desktop', 'Mobile', 'Web'] },
              { title: 'Services', items: ['Consulting', 'Support'] },
            ]"
            :key="col.title"
            class="flex-1"
          >
            <h4 class="text-gsap-green font-bold mb-2">{{ col.title }}</h4>
            <a
              v-for="item in col.items"
              :key="item"
              href="#"
              class="block text-gsap-text-muted hover:text-gsap-text-primary py-1"
            >
              {{ item }}
            </a>
          </div>
        </div>
      </div>

      <!-- Navigation: Link Underline -->
      <a
        v-else-if="isLinkUnderline"
        ref="elementRef"
        href="#"
        class="relative text-2xl md:text-3xl font-bold text-gsap-text-primary inline-block cursor-pointer"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @click.prevent
      >
        Learn More
        <span
          ref="lineRef"
          class="absolute bottom-0 left-0 w-full h-0.5 bg-gsap-green"
          style="transform: scaleX(0); transform-origin: left center"
        />
      </a>

      <!-- Navigation: Link Fill -->
      <a
        v-else-if="isLinkFill"
        ref="elementRef"
        href="#"
        class="relative text-2xl md:text-3xl font-bold text-gsap-text-muted inline-block cursor-pointer overflow-hidden"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @click.prevent
      >
        <span class="relative z-0">Explore</span>
        <span
          ref="bgRef"
          class="absolute inset-0 text-gsap-green font-bold flex items-center"
          style="clip-path: inset(0 100% 0 0)"
        >
          Explore
        </span>
      </a>

      <!-- Navigation: Active Indicator -->
      <nav v-else-if="isActiveIndicator" class="relative">
        <ul ref="elementRef" class="flex gap-2">
          <li
            v-for="(item, i) in navItems"
            :key="item"
            :ref="
              (el) => {
                if (el) navItemRefs[i] = el as HTMLElement;
              }
            "
            class="px-4 py-2 cursor-pointer"
            @click="setActiveNav(i)"
          >
            <span :class="activeNavIndex === i ? 'text-gsap-green' : 'text-gsap-text-muted'">
              {{ item }}
            </span>
          </li>
        </ul>
        <span ref="indicatorRef" class="absolute bottom-0 left-0 h-0.5 bg-gsap-green" />
      </nav>

      <!-- Navigation: Breadcrumb -->
      <nav v-else-if="isBreadcrumb" class="flex items-center gap-2">
        <template v-for="(item, i) in breadcrumbItems" :key="item">
          <a
            :ref="
              (el) => {
                if (el) breadcrumbRefs[i] = el as HTMLElement;
              }
            "
            href="#"
            class="text-gsap-text-muted hover:text-gsap-green"
            :class="{
              'text-gsap-text-primary pointer-events-none': i === breadcrumbItems.length - 1,
            }"
            @click.prevent
          >
            {{ item }}
          </a>
          <span v-if="i < breadcrumbItems.length - 1" class="text-gsap-border">/</span>
        </template>
      </nav>

      <!-- Container: Accordion -->
      <div v-else-if="isAccordion" class="w-full max-w-md">
        <div v-for="(item, i) in accordionItems" :key="i" class="border-b border-gsap-border">
          <button
            class="w-full px-4 py-3 flex justify-between items-center text-gsap-text-primary hover:text-gsap-green"
            @click="toggleAccordion(i)"
          >
            <span>{{ item.title }}</span>
            <span
              class="transition-transform duration-300"
              :class="{ 'rotate-45': activeAccordion === i }"
              >+</span
            >
          </button>
          <div
            :ref="
              (el) => {
                if (el) accordionRefs[i] = el as HTMLElement;
              }
            "
            class="overflow-hidden"
            style="height: 0"
          >
            <p class="px-4 pb-4 text-gsap-text-muted">{{ item.content }}</p>
          </div>
        </div>
      </div>

      <!-- Container: Tabs -->
      <div v-else-if="isTabs" class="w-full max-w-md">
        <div class="relative flex border-b border-gsap-border">
          <button
            v-for="(tab, i) in tabItems"
            :key="i"
            :ref="
              (el) => {
                if (el) tabButtonRefs[i] = el as HTMLElement;
              }
            "
            class="px-6 py-3 text-gsap-text-muted transition-colors"
            :class="{ 'text-gsap-green': activeTabIndex === i }"
            @click="setActiveTab(i)"
          >
            {{ tab.label }}
          </button>
          <span
            ref="tabIndicatorRef"
            class="absolute bottom-0 left-0 h-0.5 bg-gsap-green"
            style="width: 0"
          />
        </div>
        <div ref="tabContentRef" class="p-4 text-gsap-text-primary">
          {{ tabItems[activeTabIndex].content }}
        </div>
      </div>

      <!-- Cursor: Custom -->
      <div
        v-else-if="effect.id === 'cursor-custom'"
        ref="cursorContainerRef"
        class="relative w-full h-64 bg-gsap-bg-secondary rounded-xl cursor-none overflow-hidden flex items-center justify-center"
        @mousemove="onCursorMove"
        @mouseenter="onCursorEnter"
        @mouseleave="onCursorLeave"
      >
        <div
          ref="cursorRef"
          class="absolute w-8 h-8 bg-gsap-green rounded-full pointer-events-none"
        />
        <span class="text-gsap-text-primary text-xl">Move cursor here</span>
      </div>

      <!-- Cursor: Follower -->
      <div
        v-else-if="effect.id === 'cursor-follower'"
        ref="cursorContainerRef"
        class="relative w-full h-64 bg-gsap-bg-secondary rounded-xl cursor-none overflow-hidden flex items-center justify-center"
        @mousemove="onCursorMove"
        @mouseenter="onCursorEnter"
        @mouseleave="onCursorLeave"
      >
        <div
          ref="cursorRef"
          class="absolute w-2 h-2 bg-gsap-green rounded-full pointer-events-none"
        />
        <div
          ref="cursorFollowerRef"
          class="absolute w-10 h-10 border-2 border-gsap-green rounded-full pointer-events-none"
        />
        <span class="text-gsap-text-primary text-xl">Dual cursor effect</span>
      </div>

      <!-- Cursor: Magnetic -->
      <div
        v-else-if="effect.id === 'cursor-magnetic'"
        class="w-full h-64 flex items-center justify-center"
      >
        <button
          ref="elementRef"
          class="px-8 py-4 bg-gsap-green text-black font-bold rounded-full text-lg"
          @mousemove="onMagneticMove"
          @mouseleave="onMagneticLeave"
        >
          Hover me
        </button>
      </div>

      <!-- Cursor: Text -->
      <div
        v-else-if="effect.id === 'cursor-text'"
        ref="cursorContainerRef"
        class="relative w-full h-64 bg-gsap-bg-secondary rounded-xl cursor-none overflow-hidden flex items-center justify-center"
        @mousemove="onCursorMove"
        @mouseenter="onCursorEnter"
        @mouseleave="onCursorLeave"
      >
        <div ref="cursorRef" class="absolute w-24 h-24 pointer-events-none">
          <svg viewBox="0 0 100 100" class="w-full h-full">
            <defs>
              <path id="text-circle" d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0" />
            </defs>
            <text fill="#0ae448" font-size="10" font-weight="bold">
              <textPath href="#text-circle">HOVER • CLICK • DRAG •</textPath>
            </text>
          </svg>
        </div>
        <span class="text-gsap-text-primary text-xl">Text follows cursor</span>
      </div>

      <!-- Cursor: Blend -->
      <div
        v-else-if="effect.id === 'cursor-blend'"
        ref="cursorContainerRef"
        class="relative w-full h-64 bg-gsap-text-primary rounded-xl cursor-none overflow-hidden flex items-center justify-center"
        @mousemove="onCursorMove"
        @mouseenter="onCursorEnter"
        @mouseleave="onCursorLeave"
      >
        <div
          ref="cursorRef"
          class="absolute w-20 h-20 bg-gsap-green rounded-full pointer-events-none mix-blend-difference"
        />
        <span class="text-gsap-bg-primary text-2xl font-bold">Blend mode cursor</span>
      </div>

      <!-- Cursor: Trail -->
      <div
        v-else-if="effect.id === 'cursor-trail'"
        ref="cursorContainerRef"
        class="relative w-full h-64 bg-gsap-bg-secondary rounded-xl cursor-none overflow-hidden flex items-center justify-center"
        @mousemove="onCursorMove"
        @mouseenter="onCursorEnter"
        @mouseleave="onCursorLeave"
      >
        <div
          v-for="i in 10"
          :key="i"
          :ref="
            (el) => {
              if (el) cursorDotsRef[i - 1] = el as HTMLElement;
            }
          "
          class="absolute w-2 h-2 bg-gsap-green rounded-full pointer-events-none"
          :style="{ opacity: 1 - i * 0.08 }"
        />
        <span class="text-gsap-text-primary text-xl">Trail effect</span>
      </div>

      <!-- Micro: Input Focus -->
      <div v-else-if="isInputFocus" class="relative w-72">
        <input
          v-model="inputValue"
          type="text"
          class="w-full px-4 py-3 bg-transparent border-b-2 border-gsap-border text-gsap-text-primary outline-none"
          @focus="onInputFocus"
          @blur="onInputBlur"
        />
        <span
          ref="inputLineRef"
          class="absolute bottom-0 left-0 w-full h-0.5 bg-gsap-green origin-left"
          style="transform: scaleX(0)"
        />
        <span
          ref="inputLabelRef"
          class="absolute left-4 top-3 text-gsap-text-muted pointer-events-none origin-left"
        >
          Email
        </span>
      </div>

      <!-- Micro: Input Validation -->
      <div v-else-if="isInputValidation" class="relative w-72">
        <input
          v-model="emailValue"
          type="email"
          placeholder="Enter email"
          class="w-full px-4 py-3 pr-12 bg-gsap-bg-secondary border-2 rounded-lg text-gsap-text-primary outline-none"
          :class="
            emailValue
              ? isEmailValid
                ? 'border-gsap-green'
                : 'border-red-500'
              : 'border-gsap-border'
          "
          @input="validateEmail"
        />
        <span
          v-if="emailValue"
          ref="validationIconRef"
          class="absolute right-4 top-1/2 -translate-y-1/2 text-xl"
          :class="isEmailValid ? 'text-gsap-green' : 'text-red-500'"
        >
          {{ isEmailValid ? "✓" : "✗" }}
        </span>
      </div>

      <!-- Micro: Checkbox -->
      <label
        v-else-if="isCheckbox"
        class="flex items-center gap-3 cursor-pointer select-none"
        @click="toggleCheckbox"
      >
        <div
          ref="elementRef"
          class="w-6 h-6 border-2 border-gsap-border rounded flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" class="w-4 h-4">
            <polyline
              ref="checkboxPathRef"
              points="4,12 9,17 20,6"
              fill="none"
              stroke="#0e100f"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <span class="text-gsap-text-primary">Accept terms</span>
      </label>

      <!-- Micro: Toggle -->
      <button
        v-else-if="isToggle"
        type="button"
        class="flex items-center gap-4 cursor-pointer bg-transparent border-none"
        @click="toggleSwitch"
      >
        <div
          ref="toggleTrackRef"
          class="w-14 h-7 bg-gsap-border rounded-full p-0.5 pointer-events-none"
        >
          <div
            ref="toggleThumbRef"
            class="w-6 h-6 bg-gsap-text-primary rounded-full pointer-events-none"
          />
        </div>
        <span class="text-gsap-text-primary pointer-events-none">{{
          isToggleOn ? "ON" : "OFF"
        }}</span>
      </button>

      <!-- Micro: Select -->
      <div v-else-if="isSelect" class="relative w-64">
        <div
          class="px-4 py-3 bg-gsap-bg-secondary border-2 border-gsap-border rounded-lg flex justify-between cursor-pointer text-gsap-text-primary"
          @click="toggleSelect"
        >
          <span>{{ selectedOption || "Choose option" }}</span>
          <span ref="selectArrowRef" class="text-xs">▼</span>
        </div>
        <div
          ref="selectOptionsRef"
          class="absolute top-full left-0 right-0 mt-1 bg-gsap-bg-secondary border-2 border-gsap-border rounded-lg overflow-hidden"
          style="height: 0; opacity: 0"
        >
          <div
            v-for="opt in selectOptions"
            :key="opt"
            class="px-4 py-3 text-gsap-text-primary hover:bg-gsap-green hover:text-black cursor-pointer"
            @click="selectOption(opt)"
          >
            {{ opt }}
          </div>
        </div>
      </div>

      <!-- Micro: Toast -->
      <div v-else-if="isToast" class="relative">
        <button class="px-8 py-3 bg-gsap-green text-black font-bold rounded-xl" @click="showToast">
          Show Toast
        </button>
        <div
          ref="toastRef"
          class="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-4 bg-gsap-bg-secondary border border-gsap-green rounded-lg text-gsap-text-primary"
          style="opacity: 0"
        >
          <span class="text-gsap-green text-xl">✓</span>
          <span>Successfully saved!</span>
        </div>
      </div>

      <!-- Micro: Tooltip -->
      <div v-else-if="isTooltip" class="relative inline-block">
        <button
          class="px-6 py-3 bg-gsap-bg-secondary border-2 border-gsap-border rounded-lg text-gsap-text-primary"
          @mouseenter="showTooltipAnim"
          @mouseleave="hideTooltipAnim"
        >
          Hover me
        </button>
        <div
          ref="tooltipRef"
          class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2 bg-gsap-green text-black rounded-md whitespace-nowrap"
          style="opacity: 0; transform: translateX(-50%) translateY(10px) scale(0.9)"
        >
          This is a tooltip
          <div
            class="absolute top-full left-1/2 -translate-x-1/2 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-gsap-green"
          />
        </div>
      </div>

      <!-- Micro: Modal -->
      <div v-else-if="isModal">
        <button class="px-8 py-3 bg-gsap-green text-black font-bold rounded-xl" @click="openModal">
          Open Modal
        </button>
        <div
          ref="modalOverlayRef"
          class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          style="opacity: 0; visibility: hidden"
          @click="closeModal"
        >
          <div
            ref="modalContentRef"
            class="bg-gsap-bg-secondary p-8 rounded-xl max-w-md text-center"
            @click.stop
          >
            <h3 class="text-gsap-green text-xl font-bold mb-4">Modal Title</h3>
            <p class="text-gsap-text-muted mb-6">This is modal content with smooth animation.</p>
            <button
              class="px-6 py-2 bg-gsap-green text-black font-bold rounded-lg"
              @click="closeModal"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <!-- Micro: Popover -->
      <div v-else-if="isPopover" class="relative inline-block">
        <button
          class="px-6 py-3 bg-gsap-bg-secondary border-2 border-gsap-border rounded-lg text-gsap-text-primary"
          @click="togglePopover"
        >
          Click me
        </button>
        <div
          ref="popoverContentRef"
          class="absolute top-full left-1/2 -translate-x-1/2 mt-3 p-4 bg-gsap-bg-secondary border border-gsap-green rounded-lg min-w-[200px]"
          style="opacity: 0"
        >
          <h4 class="text-gsap-green font-bold mb-2">Popover Title</h4>
          <p class="text-gsap-text-muted text-sm">Some content in the popover.</p>
        </div>
      </div>

      <!-- Micro: Copy Feedback -->
      <div
        v-else-if="isCopyFeedback"
        class="flex items-center gap-4 p-4 bg-gsap-bg-primary rounded-lg"
      >
        <code class="text-gsap-green font-mono">npm install gsap</code>
        <button
          ref="elementRef"
          class="flex items-center gap-2 px-4 py-2 bg-gsap-bg-secondary rounded-lg text-gsap-text-primary"
          @click="copyToClipboard"
        >
          <span ref="copyIconRef">{{ isCopied ? "✓" : "📋" }}</span>
          <span>{{ isCopied ? "Copied!" : "Copy" }}</span>
        </button>
      </div>

      <!-- Micro: Like Heart -->
      <button
        v-else-if="isLikeHeart"
        class="relative flex items-center gap-2 px-6 py-3 bg-gsap-bg-secondary border-2 border-gsap-border rounded-full text-gsap-text-primary text-lg"
        @click="toggleLike"
      >
        <span ref="heartRef" class="text-xl">{{ isLiked ? "❤️" : "🤍" }}</span>
        <span ref="heartCountRef">{{ likeCount }}</span>
      </button>

      <!-- Micro: Bookmark -->
      <button
        v-else-if="isBookmarkEffect"
        class="p-3 bg-gsap-bg-secondary border-2 border-gsap-border rounded-lg"
        @click="toggleBookmarkAnim"
      >
        <svg
          ref="bookmarkSvgRef"
          viewBox="0 0 24 24"
          class="w-7 h-7 stroke-gsap-green stroke-2 fill-transparent"
        >
          <path ref="bookmarkPathRef" d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      <!-- 3D: Card Flip -->
      <div v-else-if="is3dCardFlip" class="w-72 h-44 cursor-pointer" style="perspective: 1000px">
        <div
          ref="elementRef"
          class="relative w-full h-full"
          style="transform-style: preserve-3d"
          @click="flip3dCard"
        >
          <div
            class="absolute inset-0 bg-gsap-green rounded-xl flex flex-col items-center justify-center"
            style="backface-visibility: hidden"
          >
            <h3 class="text-black font-bold text-xl">Front Side</h3>
            <p class="text-black/70 mt-2">Click to flip</p>
          </div>
          <div
            class="absolute inset-0 bg-gsap-bg-secondary border-2 border-gsap-green rounded-xl flex flex-col items-center justify-center"
            style="backface-visibility: hidden; transform: rotateY(180deg)"
          >
            <h3 class="text-gsap-text-primary font-bold text-xl">Back Side</h3>
            <p class="text-gsap-text-muted mt-2">Click to flip back</p>
          </div>
        </div>
      </div>

      <!-- 3D: Carousel -->
      <div v-else-if="is3dCarousel" class="flex flex-col items-center" style="perspective: 1000px">
        <div ref="carouselRef" class="relative w-36 h-24" style="transform-style: preserve-3d">
          <div
            v-for="i in 5"
            :key="i"
            class="absolute w-36 h-24 flex items-center justify-center rounded-lg font-bold text-black"
            :style="{
              transform: `rotateY(${(i - 1) * 72}deg) translateZ(150px)`,
              background: `linear-gradient(135deg, #0ae448, #0ba934)`,
              backfaceVisibility: 'hidden',
            }"
          >
            Item {{ i }}
          </div>
        </div>
        <div class="flex gap-4 mt-20">
          <button
            class="px-4 py-2 bg-gsap-bg-secondary border-2 border-gsap-green text-gsap-text-primary rounded-lg text-xl hover:bg-gsap-green hover:text-black"
            @click="rotateCarousel(-1)"
          >
            ←
          </button>
          <button
            class="px-4 py-2 bg-gsap-bg-secondary border-2 border-gsap-green text-gsap-text-primary rounded-lg text-xl hover:bg-gsap-green hover:text-black"
            @click="rotateCarousel(1)"
          >
            →
          </button>
        </div>
      </div>

      <!-- 3D: Text Effect -->
      <div
        v-else-if="is3dText"
        ref="cursorContainerRef"
        class="w-full h-48 flex items-center justify-center cursor-pointer"
        style="perspective: 500px"
        @mousemove="on3dTextMove"
        @mouseleave="on3dTextLeave"
      >
        <div
          ref="textLayersRef"
          class="relative text-5xl font-bold"
          style="transform-style: preserve-3d"
        >
          <span
            v-for="i in 8"
            :key="i"
            class="absolute top-0 left-0 whitespace-nowrap"
            :style="{
              transform: `translateZ(${(i - 1) * -3}px)`,
              opacity: i === 1 ? 1 : 1 - (i - 1) * 0.12,
              color: i === 1 ? '#0ae448' : `rgba(10, 228, 72, ${1 - (i - 1) * 0.12})`,
            }"
          >
            GSAP
          </span>
          <span
            class="relative text-gsap-green"
            style="text-shadow: 0 0 20px rgba(10, 228, 72, 0.5)"
          >
            GSAP
          </span>
        </div>
      </div>

      <!-- 3D: Parallax Layers -->
      <div
        v-else-if="isParallax3d"
        ref="cursorContainerRef"
        class="relative w-full h-64 bg-gsap-bg-primary rounded-xl overflow-hidden cursor-pointer"
        @mousemove="onParallax3dMove"
        @mouseleave="onParallax3dLeave"
      >
        <div ref="layer1Ref" class="absolute inset-0">
          <div class="absolute w-16 h-16 bg-gsap-green rounded-full top-1/5 left-1/5 opacity-60" />
          <div class="absolute w-10 h-10 bg-gsap-green-dark top-3/5 right-1/4 opacity-50" />
        </div>
        <div ref="layer2Ref" class="absolute inset-0">
          <div
            class="absolute top-1/4 right-1/3 w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-gsap-green opacity-40"
          />
          <div class="absolute w-8 h-8 bg-gsap-green rotate-45 bottom-1/3 left-1/3 opacity-30" />
        </div>
        <div ref="layer3Ref" class="absolute inset-0 flex items-center justify-center">
          <h2
            class="text-gsap-text-primary text-3xl font-bold"
            style="text-shadow: 0 0 30px rgba(10, 228, 72, 0.5)"
          >
            3D PARALLAX
          </h2>
        </div>
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
