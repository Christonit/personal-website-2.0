<template>
  <li class="glide__slide">
    <div class="portfolio-el" ref="el">
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
import { debounce } from "lodash";

const el = ref();
const breakpoints = reactive(
  useBreakpoints({
    laptop: 1024,
  })
);

defineProps(["slug", "thumbnail", "title", "previewDescription"]);

onMounted(() => {
  if (process.client && breakpoints.isGreater("laptop")) {
    const addClassDebounced = debounce(() => {
      el.value.classList.add("active");
    }, 200);

    const removeClassDebounced = debounce(() => {
      el.value.classList.remove("active");
    }, 200);

    el.value.addEventListener("mouseover", addClassDebounced);
    el.value.addEventListener("mouseleave", removeClassDebounced);
  } else {
    el.value.addEventListener("touchstart", () => {
      el.value.classList.contains("active")
        ? el.value.classList.remove("active")
        : el.value.classList.add("active");
    });
  }
});
</script>
