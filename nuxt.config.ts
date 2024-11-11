// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/sass/app.scss"],
  ssr: false,
  modules: ["@vueuse/nuxt"],

  runtimeConfig: {
    public: {
      contentful_space_id: process.env.SPACE_ID,
      secret: process.env.CONTENT_DELIVERY_ACCESS_TOKEN,
      sitename: process.env.SITENAME,
    },
    indexable: process.env.ENVIRONMENT === "production",
  },

  app: {
    pageTransition: { name: "page", mode: "in-out" },
    head: {
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/img/favicon/apple-touch-icon.png",
        },
        {
          rel: "icon",
          sizes: "32x32",
          type: "image/png",
          href: "/img/favicon/favicon-32x32.png",
        },
        {
          rel: "icon",
          sizes: "16x16",
          type: "image/png",
          href: "/img/favicon/favicon-16x16.png",
        },
        {
          rel: "icon",
          sizes: "180x180",
          href: "/img/favicon/favicon-180x180.png",
        },
        {
          rel: "mask-icon",
          color: "#000000",
          href: "/img/favicon/safari-pinned-tab.svg",
        },
      ],
      meta: [
        { name: "msapplication-TileColor", content: "#000000" },
        { name: "theme-color", content: "#000000" },
      ],
    },
  },

  compatibilityDate: "2024-11-11",
});