<script setup lang="ts">
interface TocItem {
  id: string;
  text: string;
  level: number;
}

const toc = ref<TocItem[]>([]);
const activeId = ref("");

const buildToc = () => {
  const article = document.querySelector(".prose");
  if (!article) return;

  const headings = article.querySelectorAll("h2, h3");
  const items: TocItem[] = [];

  headings.forEach((heading) => {
    const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, "-") || "";
    if (!heading.id) heading.id = id;

    items.push({
      id,
      text: heading.textContent || "",
      level: parseInt(heading.tagName[1]),
    });
  });

  toc.value = items;
};

const handleScroll = () => {
  const headings = document.querySelectorAll(".prose h2, .prose h3");
  let current = "";

  headings.forEach((heading) => {
    const rect = heading.getBoundingClientRect();
    if (rect.top <= 100) {
      current = heading.id;
    }
  });

  activeId.value = current;
};

onMounted(() => {
  nextTick(() => {
    buildToc();
    window.addEventListener("scroll", handleScroll);
    handleScroll();
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const route = useRoute();
watch(
  () => route.path,
  () => {
    nextTick(() => {
      buildToc();
    });
  }
);
</script>

<template>
  <aside v-if="toc.length > 0" class="hidden xl:block w-56 shrink-0">
    <div class="sticky top-6">
      <h4 class="text-xs font-semibold text-gsap-text-muted uppercase tracking-wider mb-3">
        Мазмұны
      </h4>
      <nav class="space-y-1">
        <a
          v-for="item in toc"
          :key="item.id"
          :href="`#${item.id}`"
          :class="[
            'block text-sm transition-colors',
            item.level === 3 ? 'pl-3' : '',
            activeId === item.id
              ? 'text-gsap-green'
              : 'text-gsap-text-muted hover:text-gsap-text-secondary',
          ]"
        >
          {{ item.text }}
        </a>
      </nav>
    </div>
  </aside>
</template>
