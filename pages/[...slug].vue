<script setup>
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

const { sitename } = useRuntimeConfig().public;

const { data } = await useAsyncData(
  "portfolioData",
  async ({ $config, $router }) => {
    const {
      public: { contentful_space_id, secret },
    } = $config;

    const slug = $router.currentRoute._rawValue.params.slug[0];
    const json_import = await import("~/utils/portfolio-items.json");
    const portfolio_items = json_import.default;
    const current_item = portfolio_items.find((item) => item.slug === slug);

    const {
      data: { portfolio },
    } = await $fetch(
      `https://graphql.contentful.com/content/v1/spaces/${contentful_space_id}/`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${secret}`,
        },
        body: JSON.stringify({
          query: `query {
                portfolio(id: "${current_item.id}") {
                    ${SPECIFIC_QUERY}
                }
            }`,
        }),
      }
    );

    return portfolio;
  }
);

useHead({
  title: `${data.value.title} | ${sitename}`,
  meta: [
    {
      name: "description",
      content: data.value.previewDescription,
    },
    { property: "og:title", content: data.value.title },
    {
      property: "og:description",
      content: data.value.previewDescription,
    },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "en_US" },
    { property: "og:image", content: data.value.thumbnail.url },
  ],
});
</script>

<template>
  <Head> </Head>
  <section id="project-case-study" class="section is-large">
    <section class="container is-fullhd">
      <div class="columns is-centered is-multiline">
        <div class="column is-half-desktop">
          <figure class="image">
            <img
              :src="data.thumbnail.url"
              :alt="`${data.thumbnail.title} image`"
              style="cursor: zoom-in"
            />
          </figure>
        </div>
        <div class="column is-7-desktop has-text-centered">
          <h1>{{ data.title }}</h1>
          <h4 class="is-4">
            {{ data.description }}
          </h4>
        </div>
        <div class="columns is-multiline">
          <div class="column is-3-desktop is-offset-2">
            <div v-if="data.tasks && data.tasks.length > 0" class="content">
              <h6><b>Tasks</b></h6>
              <ul class="skill-list">
                <li v-for="(task, i) in data.tasks" :key="i">{{ task }}</li>
              </ul>
            </div>
            <div
              v-if="data.toolsUsed && data.toolsUsed.length > 0"
              class="content"
            >
              <h6><b>Tools</b></h6>
              <ul class="skill-list">
                <li v-for="(tool, i) in data.toolsUsed" :key="i">{{ tool }}</li>
              </ul>
            </div>
          </div>
          <div
            class="column is-5-desktop"
            v-html="documentToHtmlString(data.content.json)"
          ></div>
        </div>
      </div>
    </section>

    <section class="container is-fullhd">
      <div class="columns is-multiline">
        <template
          v-if="data.blockCollection && data.blockCollection.items"
          v-for="(item, i) in data.blockCollection.items"
        >
          <div
            :key="i"
            v-if="
              item.portfolioScreenshotsCollection &&
              item.portfolioScreenshotsCollection.items.length > 0
            "
            class="column is-8-desktop is-offset-2-desktop"
            v-for="(image, j) in item.portfolioScreenshotsCollection.items"
          >
            <figure class="image" :key="j">
              <img
                :src="image.url"
                :alt="image.title"
                style="cursor: zoom-in"
              />
            </figure>
          </div>
          <div
            :key="i"
            v-if="item.paragraphs"
            class="column is-8-desktop is-offset-2-desktop"
          >
            <h3 class="is-3">{{ item.title }}</h3>
            <div
              v-html="documentToHtmlString(item.paragraphs.json)"
              :class="{
                'two-colums-text':
                  item.contentfulMetadata.tags.length > 0 &&
                  item.contentfulMetadata.tags[0].name === 'two-column',
              }"
            ></div>
          </div>
          <div
            class="column is-half-desktop"
            v-if="
              item.twoColumnImagesCollection &&
              item.twoColumnImagesCollection.items.length > 0
            "
            :key="i"
            v-for="(image, j) in item.twoColumnImagesCollection.items"
          >
            <figure class="image" :key="j">
              <img
                :src="image.url"
                :alt="image.title"
                style="cursor: zoom-in"
              />
            </figure>
          </div>
        </template>
      </div>

      <div class="columns is-multiline">
        <div class="column is-full has-text-centered">
          <h3 class="is-3">Thanks for watching</h3>
        </div>

        <div class="column is-8 is-offset-2 has-text-centered">
          <p>
            Project code available on
            <a
              href="https://github.com/Christonit/timezones-app"
              target="_blank"
              >Github</a
            >
          </p>
        </div>
      </div>
    </section>
  </section>
</template>
