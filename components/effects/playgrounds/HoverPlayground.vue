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
        class="absolute inset-0 opacity-10"
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
