<template>
  <div class="min-h-screen bg-gsap-bg-primary">
    <AppHeader />
    <div class="flex">
      <EffectsEffectsSidebar />
      <main class="flex-1 min-w-0">
        <slot />
      </main>
    </div>
    <ScrollToTop />
  </div>
</template>
