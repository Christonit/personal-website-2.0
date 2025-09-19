<template>
  <section class="hero is-primary container is-fluid">
    <div class="hero-body has-text-centered is-middle-aligned">
      <div class="container">
        <h1 class="title is-1 is-spaced">
          Christopher Santana <br />
          <span class="highlight">Front-end Developer</span>
        </h1>
        <h1 class="is-1 neon">AT YOUR SERVICE.</h1>

        <div class="scroll-more-container">
          <span class="text">Scroll down</span>

          <div class="arrow-container">
            <div class="chevron"></div>
            <div class="chevron"></div>
            <div class="chevron"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Slider v-if="project_list" :portfolio="project_list" />
</template>

<script setup>
const { sitename } = useRuntimeConfig().public;
const { data: project_list } = await useAsyncData(async ({ $config }) => {
  const {
    public: { contentful_space_id, secret },
  } = $config;

  const { data } = await $fetch(
    `https://graphql.contentful.com/content/v1/spaces/${contentful_space_id}/`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({ query: QUERY }),
    }
  );

  const {
    portfolioCollection: { items },
  } = data;

  return items;
});

useHead({
  title: `Hello! - Front-end Developer & UI Designer | ${sitename}`,
  meta: [
    {
      name: "description",
      content:
        "A developer and UI designer with a strong focus on front end development & UI/UX design who design what he can code.",
    },
    { property: "og:title", content: "The Intuitive Web Framework" },
    {
      property: "og:description",
      content:
        "Build your next Vue.js application with confidence using Nuxt...",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://nuxt.com" },
    { property: "og:locale", content: "en_US" },
    { property: "og:image", content: "https://nuxt.com/social.jpg" },
  ],
});
</script>
