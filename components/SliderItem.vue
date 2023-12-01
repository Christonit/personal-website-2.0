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
      <figure v-else class="portfolio-el-img" draggable="true">
        <img
          :src="thumbnail.url"
          :alt="thumbnail.title"
          style="cursor: zoom-in"
        />
      </figure>

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
const el = ref();
const breakpoints = reactive(
  useBreakpoints({
    laptop: 124,
  })
);

defineProps(["slug", "thumbnail", "title", "previewDescription"]);

onMounted(() => {
  if (process.client && breakpoints.isGreater("laptop")) {
    el.value.addEventListener("mouseover", () => {
      el.value.classList.add("active");
    });
    el.value.addEventListener("mouseleave", () => {
      el.value.classList.remove("active");
    });
  } else {
    el.value.addEventListener("touchstart", () => {
      el.value.classList.contains("active")
        ? el.value.classList.remove("active")
        : el.value.classList.add("active");
    });
  }
});
</script>
