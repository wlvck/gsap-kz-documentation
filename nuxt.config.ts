// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/content"],
  css: ["~/assets/css/tailwind.css"],
  tailwindcss: {},
  ssr: false,
  content: {
    highlight: {
      theme: "github-dark",
    },
  },
  app: {
    head: {
      title: "GSAP Қазақша Құжаттама",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "GSAP (GreenSock Animation Platform) кітапханасының қазақ тіліндегі толық құжаттамасы",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
        },
      ],
    },
  },
});
