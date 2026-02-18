// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/content", "@nuxt/eslint", "@vite-pwa/nuxt"],
  css: ["~/assets/css/tailwind.css"],
  tailwindcss: {},
  ssr: false,
  content: {
    build: {
      markdown: {
        highlight: {
          theme: "github-dark",
        },
      },
    },
    renderer: {
      anchorLinks: false,
    },
  },
  components: {
    dirs: ["~/components", "~/components/content"],
  },
  app: {
    head: {
      title: "GSAP Қазақша Құжаттама",
      htmlAttrs: {
        lang: "kk",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "GSAP (GreenSock Animation Platform) кітапханасының қазақ тіліндегі толық құжаттамасы. Анимациялар, Timeline, ScrollTrigger, плагиндер.",
        },
        { name: "author", content: "GSAP KZ Documentation" },
        {
          name: "keywords",
          content:
            "GSAP, анимация, JavaScript, қазақша, құжаттама, GreenSock, ScrollTrigger, Timeline",
        },
        // Open Graph
        { property: "og:type", content: "website" },
        { property: "og:title", content: "GSAP Қазақша Құжаттама" },
        {
          property: "og:description",
          content: "GSAP кітапханасының қазақ тіліндегі толық құжаттамасы",
        },
        { property: "og:locale", content: "kk_KZ" },
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "GSAP Қазақша Құжаттама" },
        {
          name: "twitter:description",
          content: "GSAP кітапханасының қазақ тіліндегі толық құжаттамасы",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
        },
      ],
    },
  },
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "GSAP Қазақша Құжаттама",
      short_name: "GSAP KZ",
      description: "GSAP кітапханасының қазақ тіліндегі толық құжаттамасы",
      lang: "kk",
      theme_color: "#0ae448",
      background_color: "#0e100f",
      display: "standalone",
      orientation: "portrait",
      start_url: "/",
      scope: "/",
      icons: [
        {
          src: "/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
    workbox: {
      navigateFallback: "/offline",
      globPatterns: ["**/*.{js,css,html,png,svg,ico,woff,woff2}"],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: "CacheFirst",
          options: {
            cacheName: "google-fonts-cache",
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: "CacheFirst",
          options: {
            cacheName: "gstatic-fonts-cache",
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: false,
      type: "module",
    },
  },
});
