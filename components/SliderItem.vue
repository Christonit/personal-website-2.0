<template>
  <li class="glide__slide">
    <div
      class="portfolio-el"
      ref="el"
      @mouseenter="addClass"
      @mouseleave="removeClass"
    >
      <NuxtLink
        v-if="breakpoints.isGreater('laptop')"
        target="_self"
        class="portfolio-el-img"
        draggable="true"
        :data-href="`/${slug}/`"
        :href="`/${slug}/`"
      >
        <img
          :src="thumbnail.url"
          :alt="thumbnail.title"
          style="cursor: zoom-in"
      /></NuxtLink>
      <img
        v-else
        :src="thumbnail.url"
        :alt="thumbnail.title"
        style="cursor: zoom-in"
        class="portfolio-el-img"
        draggable="true"
      />

      <div class="portfolio-el-details has-text-centered">
        <h3 class="is-3">{{ title }}</h3>
        <p>
          {{ previewDescription }}
        </p>
        <NuxtLink
          class="button is-outlined"
          draggable="true"
          :data-href="`${slug}/`"
          :href="`/${slug}/`"
          >View case</NuxtLink
        >
      </div>
    </div>
  </li>
</template>

<script setup>
import { throttle } from "lodash";

const el = ref();
const isHover = ref(true);
const isClassAdded = ref(false);
const breakpoints = reactive(
  useBreakpoints({
    laptop: 1024,
  })
);

defineProps(["slug", "thumbnail", "title", "previewDescription"]);

const addClass = () => {
  console.log("IN");
  if (!isClassAdded.value && breakpoints.isGreater("laptop")) {
    el.value.classList.add("active");
    isClassAdded.value = true;
    el.value.removeEventListener("mouseenter", addClass);
  }
};

const removeClass = () => {
  console.log("OUT");

  if (isClassAdded.value && breakpoints.isGreater("laptop")) {
    el.value.classList.remove("active");
    isClassAdded.value = false;
    el.value.removeEventListener("mouseleave", removeClass);
  }
};

onMounted(() => {
  if (process.client && !breakpoints.isGreater("laptop")) {
    el.value.addEventListener("touchstart", () => {
      el.value.classList.contains("active")
        ? el.value.classList.remove("active")
        : el.value.classList.add("active");
    });
  }
});
</script>
