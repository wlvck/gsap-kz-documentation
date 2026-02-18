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
    // Generate ID from text if not present
    let id = heading.id;
    if (!id) {
      id =
        heading.textContent
          ?.toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .trim() || "";
      heading.id = id;
    }

    if (id) {
      items.push({
        id,
        text: heading.textContent?.trim() || "",
        level: parseInt(heading.tagName[1]),
      });
    }
  });

  toc.value = items;

  // Set initial active
  if (items.length > 0) {
    handleScroll();
  }
};

const handleScroll = () => {
  const headings = document.querySelectorAll(".prose h2[id], .prose h3[id]");
  if (headings.length === 0) return;

  let current = "";
  const scrollY = window.scrollY;
  const offset = 120;

  headings.forEach((heading) => {
    const element = heading as HTMLElement;
    const top = element.offsetTop;

    if (scrollY >= top - offset) {
      current = heading.id;
    }
  });

  // If no heading is active yet, set the first one
  if (!current && toc.value.length > 0) {
    current = toc.value[0].id;
  }

  activeId.value = current;
};

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const top = element.offsetTop - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

onMounted(() => {
  // Wait for content to render
  setTimeout(() => {
    buildToc();
    window.addEventListener("scroll", handleScroll, { passive: true });
  }, 100);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const route = useRoute();
watch(
  () => route.path,
  () => {
    toc.value = [];
    activeId.value = "";
    setTimeout(() => {
      buildToc();
    }, 200);
  }
);
</script>

<template>
  <aside v-if="toc.length > 0" class="hidden xl:block w-56 shrink-0">
    <div class="sticky top-8">
      <h4 class="text-xs font-semibold text-gsap-text-muted uppercase tracking-wider mb-4">
        Мазмұны
      </h4>
      <nav class="space-y-2 border-l border-gsap-border">
        <a
          v-for="item in toc"
          :key="item.id"
          :href="`#${item.id}`"
          :class="[
            'block text-sm transition-colors py-1 -ml-px border-l-2',
            item.level === 3 ? 'pl-6' : 'pl-4',
            activeId === item.id
              ? 'border-gsap-green text-gsap-green'
              : 'border-transparent text-gsap-text-muted hover:text-gsap-text-secondary hover:border-gsap-text-muted',
          ]"
          @click.prevent="scrollToSection(item.id)"
        >
          {{ item.text }}
        </a>
      </nav>
    </div>
  </aside>
</template>
