<script setup lang="ts">
const route = useRoute();

const isContactOpen = ref(false);
const isMobileMenuOpen = ref(false);

const navLinks = [
  { label: "Docs", to: "/docs/kirisspe/gsap-degen-ne" },
  { label: "Showcases", to: "/showcases" },
];

const isActive = (path: string) => {
  if (path.startsWith("/docs")) {
    return route.path.startsWith("/docs");
  }
  return route.path === path;
};

const closeMenus = () => {
  isContactOpen.value = false;
  isMobileMenuOpen.value = false;
};

// Close dropdown when clicking outside
const contactRef = ref<HTMLElement | null>(null);

onMounted(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (contactRef.value && !contactRef.value.contains(e.target as Node)) {
      isContactOpen.value = false;
    }
  };
  document.addEventListener("click", handleClickOutside);
  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });
});
</script>

<template>
  <header
    class="sticky top-0 z-50 bg-gsap-bg-primary/80 backdrop-blur-lg border-b border-gsap-border"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3" @click="closeMenus">
          <div class="w-9 h-9 rounded-lg bg-gsap-green flex items-center justify-center">
            <span class="text-gsap-bg-primary font-bold text-lg">G</span>
          </div>
          <span class="font-semibold text-gsap-text-primary hidden sm:block">GSAP Қазақша</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              isActive(link.to)
                ? 'text-gsap-green bg-gsap-green/10'
                : 'text-gsap-text-secondary hover:text-gsap-text-primary hover:bg-gsap-bg-secondary',
            ]"
          >
            {{ link.label }}
          </NuxtLink>

          <!-- Contact Dropdown -->
          <div ref="contactRef" class="relative">
            <button
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1',
                isContactOpen
                  ? 'text-gsap-green bg-gsap-green/10'
                  : 'text-gsap-text-secondary hover:text-gsap-text-primary hover:bg-gsap-bg-secondary',
              ]"
              @click.stop="isContactOpen = !isContactOpen"
            >
              Байланыс
              <svg
                :class="['w-4 h-4 transition-transform', isContactOpen ? 'rotate-180' : '']"
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

            <!-- Dropdown Menu -->
            <Transition name="dropdown">
              <div
                v-if="isContactOpen"
                class="absolute right-0 mt-2 w-56 bg-gsap-bg-secondary border border-gsap-border rounded-xl shadow-xl overflow-hidden"
              >
                <a
                  href="mailto:zhumagalievkanagat@gmail.com"
                  class="flex items-center gap-3 px-4 py-3 text-sm text-gsap-text-secondary hover:text-gsap-text-primary hover:bg-gsap-bg-tertiary transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <div class="font-medium text-gsap-text-primary">Email</div>
                    <div class="text-xs text-gsap-text-muted">zhumagalievkanagat@gmail.com</div>
                  </div>
                </a>
                <a
                  href="https://t.me/coffee_w_milk"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-3 px-4 py-3 text-sm text-gsap-text-secondary hover:text-gsap-text-primary hover:bg-gsap-bg-tertiary transition-colors"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
                    />
                  </svg>
                  <div>
                    <div class="font-medium text-gsap-text-primary">Telegram</div>
                    <div class="text-xs text-gsap-text-muted">@coffee_w_milk</div>
                  </div>
                </a>
              </div>
            </Transition>
          </div>
        </nav>

        <!-- Right Side -->
        <div class="flex items-center gap-2">
          <!-- GitHub -->
          <a
            href="https://github.com/wlvck/gsap-kz-documentation"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 rounded-lg text-gsap-text-muted hover:text-gsap-text-primary hover:bg-gsap-bg-secondary transition-colors"
            title="GitHub"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
              />
            </svg>
          </a>

          <!-- Mobile Menu Toggle -->
          <button
            class="md:hidden p-2 rounded-lg text-gsap-text-muted hover:text-gsap-text-primary hover:bg-gsap-bg-secondary transition-colors"
            aria-label="Toggle menu"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <svg
              v-if="!isMobileMenuOpen"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <Transition name="mobile-menu">
        <div v-if="isMobileMenuOpen" class="md:hidden border-t border-gsap-border py-4">
          <nav class="flex flex-col gap-1">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              :class="[
                'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive(link.to)
                  ? 'text-gsap-green bg-gsap-green/10'
                  : 'text-gsap-text-secondary hover:text-gsap-text-primary hover:bg-gsap-bg-secondary',
              ]"
              @click="closeMenus"
            >
              {{ link.label }}
            </NuxtLink>

            <!-- Contact Links (Mobile) -->
            <div class="mt-2 pt-2 border-t border-gsap-border">
              <p class="px-4 py-2 text-xs font-semibold text-gsap-text-muted uppercase">Байланыс</p>
              <a
                href="mailto:zhumagalievkanagat@gmail.com"
                class="flex items-center gap-3 px-4 py-3 text-sm text-gsap-text-secondary hover:text-gsap-text-primary transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Email
              </a>
              <a
                href="https://t.me/coffee_w_milk"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 px-4 py-3 text-sm text-gsap-text-secondary hover:text-gsap-text-primary transition-colors"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
                  />
                </svg>
                Telegram
              </a>
            </div>
          </nav>
        </div>
      </Transition>
    </div>
  </header>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.2s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
