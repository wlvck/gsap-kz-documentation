<script setup lang="ts">
import gsap from "gsap";

interface EffectCode {
  vue: string;
  script: string;
  css: string;
}

const props = defineProps<{
  code: EffectCode;
}>();

type TabId = "vue" | "script" | "css";

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: "vue", label: "Template", icon: "V" },
  { id: "script", label: "Script", icon: "JS" },
  { id: "css", label: "CSS", icon: "CSS" },
];

const activeTab = ref<TabId>("vue");
const copied = ref(false);
const copiedAll = ref(false);
const codeRef = ref<HTMLElement | null>(null);

const activeCode = computed(() => props.code[activeTab.value]);

// Tab switch animation
const switchTab = (tabId: TabId) => {
  if (tabId === activeTab.value) return;

  if (codeRef.value) {
    gsap.to(codeRef.value, {
      opacity: 0,
      y: -10,
      duration: 0.15,
      ease: "power2.in",
      onComplete: () => {
        activeTab.value = tabId;
        nextTick(() => {
          gsap.fromTo(
            codeRef.value,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }
          );
        });
      },
    });
  } else {
    activeTab.value = tabId;
  }
};

// Syntax highlighting
const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
};

const highlightVue = (code: string): string => {
  // Comments
  code = code.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="hl-comment">$1</span>');

  // Mustache interpolation first
  code = code.replace(/(\{\{[\s\S]*?\}\})/g, '<span class="hl-mustache">$1</span>');

  // Tags
  code = code.replace(/(&lt;\/?)([\w-]+)/g, '$1<span class="hl-tag">$2</span>');

  // Vue directives
  code = code.replace(/\s(v-[\w-]+|:[\w-]+|@[\w-]+)/g, ' <span class="hl-directive">$1</span>');

  // Attributes
  code = code.replace(/\s([\w-]+)(=)/g, ' <span class="hl-attr">$1</span>$2');

  // Attribute values
  code = code.replace(/(=)(&quot;[^&]*&quot;)/g, '$1<span class="hl-string">$2</span>');

  return code;
};

const highlightJS = (code: string): string => {
  // Strings first (to avoid conflicts)
  code = code.replace(/('[^']*')/g, '<span class="hl-string">$1</span>');
  code = code.replace(/(&quot;[^&]*&quot;)/g, '<span class="hl-string">$1</span>');
  code = code.replace(/(`[^`]*`)/g, '<span class="hl-string">$1</span>');

  // Comments
  code = code.replace(/(\/\/.*$)/gm, '<span class="hl-comment">$1</span>');
  code = code.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="hl-comment">$1</span>');

  // Keywords
  const keywords =
    "\\b(import|export|from|const|let|var|function|return|if|else|for|while|class|new|this|async|await|default|true|false|null|undefined|of|in)\\b";
  code = code.replace(new RegExp(keywords, "g"), '<span class="hl-keyword">$1</span>');

  // Built-ins
  const builtins =
    "\\b(ref|computed|onMounted|onUnmounted|watch|nextTick|gsap|console|Math|document|window)\\b";
  code = code.replace(new RegExp(builtins, "g"), '<span class="hl-builtin">$1</span>');

  // Functions (word followed by parenthesis)
  code = code.replace(/\b([a-zA-Z_][\w]*)\s*\(/g, '<span class="hl-function">$1</span>(');

  // Numbers
  code = code.replace(/\b(\d+\.?\d*)\b/g, '<span class="hl-number">$1</span>');

  // Arrow functions
  code = code.replace(/(=&gt;)/g, '<span class="hl-keyword">$1</span>');

  return code;
};

const highlightCSS = (code: string): string => {
  // Comments
  code = code.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="hl-comment">$1</span>');

  // Selectors (lines before {)
  code = code.replace(/^([^{:]+)(\{)/gm, '<span class="hl-selector">$1</span>$2');

  // Properties
  code = code.replace(/\s+([\w-]+)(\s*:)/g, ' <span class="hl-property">$1</span>$2');

  // Values with units
  code = code.replace(/:\s*([^;{}]+)(;)/g, ': <span class="hl-value">$1</span>$2');

  // Numbers
  code = code.replace(
    /\b(\d+\.?\d*)(px|em|rem|%|vh|vw|s|ms|deg)?\b/g,
    '<span class="hl-number">$1$2</span>'
  );

  return code;
};

const highlightCode = (code: string, lang: TabId): string => {
  let highlighted = escapeHtml(code);

  if (lang === "vue") {
    highlighted = highlightVue(highlighted);
  } else if (lang === "script") {
    highlighted = highlightJS(highlighted);
  } else if (lang === "css") {
    highlighted = highlightCSS(highlighted);
  }

  return highlighted;
};

const highlightedCode = computed(() => highlightCode(activeCode.value, activeTab.value));

const copyCode = async (code: string) => {
  try {
    await navigator.clipboard.writeText(code);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Copy failed:", err);
  }
};

const copyAllCode = async () => {
  const scriptClose = "<" + "/script>";
  const fullCode = `<script setup lang="ts">
${props.code.script}
${scriptClose}

<template>
${props.code.vue
  .split("\n")
  .map((line) => `  ${line}`)
  .join("\n")}
</template>

<style scoped>
${props.code.css}
</style>`;

  try {
    await navigator.clipboard.writeText(fullCode);
    copiedAll.value = true;
    setTimeout(() => {
      copiedAll.value = false;
    }, 2000);
  } catch (err) {
    console.error("Copy failed:", err);
  }
};
</script>

<template>
  <div class="border-t border-gsap-border">
    <!-- Tabs Header -->
    <div
      class="flex items-center justify-between px-4 border-b border-gsap-border bg-gsap-bg-secondary"
    >
      <div class="flex">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          :class="[
            'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors',
            activeTab === tab.id
              ? 'border-gsap-green text-gsap-green'
              : 'border-transparent text-gsap-text-muted hover:text-gsap-text-primary',
          ]"
          @click="switchTab(tab.id)"
        >
          <span
            :class="[
              'w-6 h-6 rounded flex items-center justify-center text-xs font-bold',
              activeTab === tab.id ? 'bg-gsap-green/20' : 'bg-gsap-bg-tertiary',
            ]"
          >
            {{ tab.icon }}
          </span>
          <span class="hidden sm:inline">{{ tab.label }}</span>
        </button>
      </div>

      <!-- Copy All Button -->
      <button
        type="button"
        :class="[
          'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
          copiedAll
            ? 'bg-gsap-green/20 text-gsap-green'
            : 'bg-gsap-bg-tertiary text-gsap-text-muted hover:text-gsap-text-primary',
        ]"
        @click="copyAllCode"
      >
        <svg
          v-if="!copiedAll"
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span class="hidden sm:inline">{{ copiedAll ? "Көшірілді!" : "Барлығын көшіру" }}</span>
      </button>
    </div>

    <!-- Code Content -->
    <div class="relative">
      <div ref="codeRef" class="overflow-x-auto">
        <pre
          class="code-block p-4 md:p-6 text-sm leading-relaxed font-mono min-h-[200px]"
        ><!-- eslint-disable-next-line vue/no-v-html --><code v-html="highlightedCode" /></pre>
      </div>

      <!-- Copy Tab Code Button -->
      <button
        type="button"
        :class="[
          'absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all',
          copied
            ? 'bg-gsap-green/20 text-gsap-green'
            : 'bg-gsap-bg-secondary/80 text-gsap-text-muted hover:text-gsap-text-primary backdrop-blur-sm',
        ]"
        @click="copyCode(activeCode)"
      >
        <svg
          v-if="!copied"
          class="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        {{ copied ? "Көшірілді!" : "Көшіру" }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.code-block {
  background: #0d1117;
  color: #c9d1d9;
}

/* Keywords - red/pink */
.code-block :deep(.hl-keyword) {
  color: #ff7b72;
}

/* Strings - light blue */
.code-block :deep(.hl-string) {
  color: #a5d6ff;
}

/* Comments - gray italic */
.code-block :deep(.hl-comment) {
  color: #8b949e;
  font-style: italic;
}

/* Functions - purple */
.code-block :deep(.hl-function) {
  color: #d2a8ff;
}

/* Numbers - cyan */
.code-block :deep(.hl-number) {
  color: #79c0ff;
}

/* Built-ins - cyan */
.code-block :deep(.hl-builtin) {
  color: #79c0ff;
}

/* Vue/HTML Tags - green */
.code-block :deep(.hl-tag) {
  color: #7ee787;
}

/* Attributes - light blue */
.code-block :deep(.hl-attr) {
  color: #79c0ff;
}

/* Vue directives - purple */
.code-block :deep(.hl-directive) {
  color: #d2a8ff;
}

/* Mustache template - orange */
.code-block :deep(.hl-mustache) {
  color: #ffa657;
}

/* CSS Selectors - green */
.code-block :deep(.hl-selector) {
  color: #7ee787;
}

/* CSS Properties - light blue */
.code-block :deep(.hl-property) {
  color: #79c0ff;
}

/* CSS Values - light */
.code-block :deep(.hl-value) {
  color: #a5d6ff;
}
</style>
