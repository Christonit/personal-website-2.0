<script setup>
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import Zooming from "zooming";
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

onMounted(() => {
  if (process.client) {
    new Zooming().listen("img").config({
      bgColor: "#000",
      enableGrab: false,
      zIndex: 9999,
    });
  }
});

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
definePageMeta({
  pageTransition: {
    name: "page",
    mode: "default",
  },
});
</script>

<template>
  <Head> </Head>
  <Transition appear>
    <section v-if="data" id="project-case-study" class="section is-large">
      <section class="container is-fullhd">
        <div class="columns is-centered is-multiline">
          <div class="column is-half-desktop mx-auto">
            <figure class="image">
              <img
                :src="
                  data.featuredImage.url
                    ? data.featuredImage.url
                    : data.thumbnail.url
                "
                :alt="`${data.thumbnail.title} image`"
                style="cursor: zoom-in"
              />
            </figure>
          </div>
          <div class="column has-text-centered mx-auto">
            <h1>{{ data.title }}</h1>
            <h4 class="is-4">
              {{ data.description }}
            </h4>
          </div>
          <div class="columns is-multiline mb-0">
            <div class="column is-3-desktop is-offset-2">
              <div v-if="data.tasks && data.tasks.length > 0" class="content">
                <h6><b>Tasks</b></h6>
                <ul class="skill-list alt">
                  <li v-for="(task, i) in data.tasks" :key="i">{{ task }}</li>
                </ul>
              </div>
              <div
                v-if="data.toolsUsed && data.toolsUsed.length > 0"
                class="content"
              >
                <h6><b>Tools</b></h6>
                <ul class="skill-list alt">
                  <li v-for="(tool, i) in data.toolsUsed" :key="i">
                    {{ tool }}
                  </li>
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
            <template
              v-if="
                item.twoColumnImagesCollection &&
                item.twoColumnImagesCollection.items.length > 0
              "
            >
              <h3 class="is-3" v-if="item.title">{{ item.title }}</h3>

              <div class="columns is-multiline">
                <div
                  class="column is-half-desktop"
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
              </div>
            </template>

            <template
              v-if="
                item.portfolioScreenshotsCollection &&
                item.portfolioScreenshotsCollection.items.length > 0
              "
            >
              <div
                class="column is-8-desktop is-offset-2-desktop"
                v-if="item.title"
              >
                <h3 class="is-3">{{ item.title }}</h3>
              </div>
              <div
                :key="i"
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
            </template>

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
          </template>
        </div>

        <div class="columns is-multiline">
          <div class="column is-full has-text-centered">
            <h3 class="is-3">Thanks for watching</h3>

            <p v-if="data.visitPage">
              <u>
                <NuxtLink :href="data.visitPage" target="_blank"
                  >Click here to visit the project.</NuxtLink
                ></u
              >
            </p>
            <p v-if="data.visitRepo">
              Project code available on
              <NuxtLink :href="data.visitRepo" target="_blank">Github</NuxtLink>
            </p>
          </div>
        </div>
      </section>
    </section>
  </Transition>
</template>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
