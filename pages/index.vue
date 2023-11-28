<template>
  <section class="hero is-primary container is-fluid">
    <div class="columns is-multiline">
      <div class="column hero-body is-12 is-middle-aligned">
        <h1 class="title is-1 is-spaced">Christopher Santana</h1>
        <h1 class="title is-1 is-spaced highlight">
          Product designer &amp; front end developer
        </h1>
        <h1 class="is-1 neon">AT YOUR SERVICE.</h1>
      </div>
      <div class="column is-5-desktop"></div>

      <div class="column is-12">
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
</script>
