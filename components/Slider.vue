<template>
  <section id="portfolio-container" class="section is-large">
    <div class="glide glide--ltr glide--slider glide--swipeable">
      <div class="glide__track" data-glide-el="track">
        <ul class="glide__slides" ref="slider">
          <SliderItem
            v-for="(item, index) in portfolio"
            :data-slider-index="index"
            v-bind="item"
          />
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
          :class="{ 'is-disabled': slideIndex === portfolio.length - 1 }"
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
          class="has-stroke md:block"
          style="transform: translateX(0px); opacity: 1"
          >1</span
        >
        <span data-slide-count="total" ref="slideCounterTotal">{{
          portfolio.length
        }}</span>
        <span data-action="close" class="button is-hollow is-small"
          ><i class="material-icons"> close </i></span
        >
      </div>

      <div id="slide-scroll-bar">
        <span
          id="slide-progress-bar"
          ref="slideProgressBar"
          :style="{ width: `${100 / portfolio.length}%`, left: '0%' }"
        ></span>
      </div>
    </div>
  </section>
</template>

<script setup>
import anime from "animejs";
import Glide from "@glidejs/glide";

const { portfolio } = defineProps(["portfolio"]);
const slider = ref();
const nextBtn = ref();
const prevBtn = ref();
const slideProgressBar = ref();
const slideCounterTotal = ref();
const currentSlideCounter = ref();
const slideIndex = ref(0);
const breakpoints = reactive(
  useBreakpoints({
    small: 768,
  })
);
const sliderHandler = (glideIndex) => {
  const slideList = document.querySelectorAll(".glide__slides li");
  const currentEl = currentSlideCounter.value;
  currentEl.innerHTML = 1;

  slideIndex.value = glideIndex;

  let options = {
    targets: currentEl,
    duration: 250,
    easing: "linear",
    opacity: 0,
  };
  let transformReset = {};

  if (breakpoints.isGreater("small")) {
    options.translateX = 30;

    transformReset.translateX = 0;
  } else {
    options.translateY = -30;
    transformReset.translateY = 0;
  }
  anime(options);

  setTimeout(() => {
    currentEl.innerHTML = glideIndex + 1;
    currentEl.style.transform = breakpoints.isGreater("small")
      ? "translateX(-30px)"
      : "translateY(30px)";

    anime({
      targets: currentEl,
      duration: 250,
      easing: "linear",
      opacity: 1,
      ...transformReset,
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
