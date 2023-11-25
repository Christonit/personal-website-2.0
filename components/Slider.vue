<template>
  <section id="portfolio-container" class="section is-large">
    <div class="glide glide--ltr glide--slider glide--swipeable">
      <div class="glide__track" data-glide-el="track">
        <ul class="glide__slides" ref="slider">
          <li
            class="glide__slide"
            v-for="(item, index) in portfolio_data"
            :data-slider-index="index"
          >
            <div class="portfolio-el">
              <a
                target="_self"
                class="portfolio-el-img"
                draggable="true"
                :data-href="item.url"
                :href="item.url"
              >
                <img :src="item.thumbnail" alt="" style="cursor: zoom-in"
              /></a>

              <div class="portfolio-el-details has-text-centered">
                <h3 class="is-3">{{ item.project_name }}</h3>
                <p>
                  {{ item.description }}
                </p>
                <a
                  class="button is-outlined"
                  draggable="true"
                  :data-href="item.url"
                  :href="item.url"
                  >View case</a
                >
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="glide__arrows" data-glide-el="controls">
        <button
          class="glide__arrow glide__arrow--left has-text-left-mobile"
          :class="{ 'is-disabled': slideIndex === 0 }"
          data-glide-dir="<"
          ref="prevBtn"
        >
          <i class="material-icons">arrow_back</i>prev
        </button>
        <button
          class="glide__arrow glide__arrow--right has-text-right-mobile"
          :class="{ 'is-disabled': slideIndex === portfolio_data.length - 1 }"
          data-glide-dir=">"
          ref="nextBtn"
        >
          next<i class="material-icons">arrow_forward</i>
        </button>
      </div>

      <div id="slide-counter">
        <span
          data-slide-count="current"
          ref="currentSlideCounter"
          class="has-stroke"
          style="transform: translateX(0px); opacity: 1"
          >1</span
        >
        <span data-slide-count="total" ref="slideCounterTotal">{{
          portfolio_data.length
        }}</span>
        <span data-action="close" class="button is-hollow is-small"
          ><i class="material-icons"> close </i></span
        >
      </div>

      <div id="slide-scroll-bar">
        <span
          id="slide-progress-bar"
          ref="slideProgressBar"
          :style="{ width: `${100 / portfolio_data.length}%`, left: '0%' }"
        ></span>
      </div>
    </div>
  </section>
</template>

<script setup>
import anime from "animejs";
import Glide from "@glidejs/glide";

const slider = ref();
const nextBtn = ref();
const prevBtn = ref();
const slideProgressBar = ref();
const slideCounterTotal = ref();
const currentSlideCounter = ref();
const slideIndex = ref(0);
const portfolio_data = reactive([
  {
    thumbnail: "http://chsantana.com/img/orca/orca-preview.png",
    project_name: "ORCA",
    description: `Work in progress timezones management web app for diverse teams.`,
    url: "http://chsantana.com/orca",
  },
  {
    thumbnail: "http://chsantana.com/img/chimio-img/chimio-preview-1.png",
    project_name: "Chimio",
    description: `Anonymous secret sharing app for people seeking fun, to kill time or relief.`,
    url: "http://chsantana.com/chimio",
  },
  {
    thumbnail: "http://chsantana.com/img/chimio-img/fueltrack.og.png",
    project_name: "Fueltrack",
    description: `Web and mobile app to track and manage vehicle maintenance and fuel expenses.`,
    url: "http://chsantana.com/chimio",
  },
]);

const sliderHandler = (glideIndex) => {
  const slideList = document.querySelectorAll(".glide__slides li");
  const currentEl = currentSlideCounter.value;
  currentEl.innerHTML = 1;

  slideIndex.value = glideIndex;

  anime({
    targets: currentEl,
    duration: 250,
    translateX: 30,
    easing: "linear",
    opacity: 0,
  });

  setTimeout(() => {
    currentEl.innerHTML = glideIndex + 1;
    currentEl.style.transform = "translateX(-30px)";

    anime({
      targets: currentEl,
      duration: 250,
      translateX: 0,
      easing: "linear",
      opacity: 1,
    });
  }, 250);

  let slideWidth = 0;
  if (glideIndex < slideList.length) {
    slideWidth += (glideIndex / slideList.length) * 100;
  } else {
    slideWidth = 0;
  }

  anime({
    targets: slideProgressBar.value,
    duration: 500,
    left: slideWidth + "%",
    easing: "easeInOutCirc",
  });
};

onMounted(() => {
  if (process.client) {
    const glide = new Glide(".glide");
    glide.mount();

    // const windowSize = screen.width;
    // const sm = 768;

    // function deviseEvent() {
    //   return windowSize > sm ? "click" : "touchend";
    // }

    glide.on("run", () => sliderHandler(glide.index));

    glide.mount();
  }
});
</script>
