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
    },
  },
});
