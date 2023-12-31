<template>
  <span ref="anchor" />
  <Header :ref="header" />
  <slot />

  <button
    id="scrollToTop"
    v-if="$router.name !== 'index' && showScrollToTop"
    ref="scrollToTopFab"
    @click="scrollToTop"
  >
    <i class="material-icons"> arrow_upward </i>
  </button>

  <canvas id="cursor" ref="cursorPointer"></canvas>
  <canvas id="cursor--shadow" ref="cursorShadow"></canvas>
  <span id="cursor--halo" ref="cursorHaloEl"></span>
  <NuxtFooter />
</template>

<script setup>
import anime from "animejs";
import ProgressBar from "progressbar.js";
import debounce from "lodash/debounce";

const url = useRequestURL();

const showScrollToTop = ref(false);
const breakpoints = reactive(
  useBreakpoints({
    small: 768,
  })
);

const { x: mouseX, y: mouseY } = useMouse({ touch: false });

const header = ref();
const scrollToTopFab = ref();
const cursorPointer = ref();
const cursorHaloEl = ref();
const cursorShadow = ref();
const isScrolling = ref();
const anchor = ref();
const windowPosition = reactive(useWindowScroll());
const smoothScrollToTop = (duration) => {
  const start = window.pageYOffset || document.documentElement.scrollTop;
  const target = 0;
  const distance = target - start;
  const startTime = performance.now();

  function scroll(timestamp) {
    const currentTime = timestamp - startTime;
    const scrollY = easeInOutQuad(currentTime, start, distance, duration);
    window.scrollTo(0, scrollY);

    if (currentTime < duration) {
      requestAnimationFrame(scroll);
    }
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(scroll);
};
const $router = useRoute();

const scrollToTop = () => {
  //TODO: For some reason, anime js wont scroll to top.
  // anime({
  //   targets: window,
  //   scrollTop: 0,
  //   duration: 800,
  //   easing: "easeInOutQuad",
  // });

  smoothScrollToTop(1000);
};

const scrollHandler = (bar) => {
  let bottomPosition;
  let scrollPosition = windowPosition.y;
  let scrollCount =
    parseFloat(scrollPosition / (document.documentElement.offsetHeight - 600)) +
    0.25;
  scrollCount = scrollCount >= 1 ? 1 : scrollCount;

  breakpoints.isGreater("small")
    ? (bottomPosition = "144px")
    : (bottomPosition = "64px");

  if (scrollPosition > 250) {
    anime({
      targets: scrollToTopFab.value,
      bottom: bottomPosition,
      delay: 0,
      opacity: 1,
      duration: 700,
      easing: "easeInOutQuad",
    });
  } else {
    anime({
      targets: scrollToTopFab.value,
      bottom: "-" + bottomPosition,
      delay: 0,
      opacity: 0,
      duration: 700,
      easing: "easeInOutQuad",
    });
  }

  bar.animate(scrollCount);
};

const debouncedScrollHandler = debounce(scrollHandler, 250);

const cursorAnimations = () => {
  let cursorAnimation = anime.timeline();
  cursorAnimation
    .add({
      targets: cursorHaloEl.value,
      opacity: 1,
      borderColor: "rgba(255,255,255,1)",
      duration: 100,
      easing: "linear",
      scale: 0,
    })
    .add({
      targets: cursorHaloEl.value,
      opacity: 0,
      borderColor: "rgba(255,255,255,0)",
      duration: 500,
      scale: 2.5,
      easing: "linear",
    })
    .add({
      targets: cursorHaloEl.value,
      scale: 0,
      duration: 100,
    });
};

onMounted(() => {
  if (process.client) {
    cursorPointer.value.style.top = mouseY + "px";
    document
      .querySelectorAll(
        "a, .navbar-item, .portfolio-el-img, .button, button, #scrollToTop, figure, img, .image"
      )
      .forEach((element) => {
        element.addEventListener("mouseover", function (e) {
          anime({
            targets: cursorShadow.value,
            height: 56,
            opacity: 1,
            translateX: -16,
            width: 56,
            duration: 1000,
          });

          anime({
            targets: cursorPointer.value,
            opacity: 0,
            duration: 1000,
          });
        });

        element.addEventListener("mouseleave", function (e) {
          anime({
            targets: cursorShadow.value,
            height: 0,
            width: 0,
            opacity: 0,
            duration: 1000,
          });

          anime({
            targets: cursorPointer.value,
            opacity: 1,
            duration: 1000,
          });
        });
      });

    if ($router.name !== "index" && $router.name !== "about-me") {
      showScrollToTop.value = true;

      setTimeout(() => {
        const bar = new ProgressBar.Circle(scrollToTopFab.value, {
          strokeWidth: 1,
          easing: "easeIn",
          duration: 200,
          color: "rgba(255,255,255,1)",
          trailColor: "rgba(255,255,255,0.24)",
          trailWidth: 1,
          svgStyle: null,
        });

        useEventListener(window, "scroll", () => debouncedScrollHandler(bar));
      }, 50);
    }
  }
});

watch(
  () => $router.name,
  (newPath, oldPath) => {
    if (newPath !== oldPath) {
      showScrollToTop.value = false;
    }

    if (process.client && $router.name !== "index") {
      setTimeout(() => {
        showScrollToTop.value = true;
      }, 50);

      setTimeout(() => {
        showScrollToTop.value = true;
        const bar = new ProgressBar.Circle(scrollToTopFab.value, {
          strokeWidth: 1,
          easing: "easeIn",
          duration: 200,
          color: "rgba(255,255,255,1)",
          trailColor: "rgba(255,255,255,0.24)",
          trailWidth: 1,
          svgStyle: null,
        });
        useEventListener(window, "scroll", () => debouncedScrollHandler(bar));
      }, 250);
    }
  }
);

useEventListener(document, "mousemove", (e) => {
  if (cursorPointer.value) {
    cursorPointer.value.style.left = mouseX.value + "px";
    cursorPointer.value.style.top = mouseY.value + "px";
  }
  if (cursorShadow.value) {
    cursorShadow.value.style.left = mouseX.value - 16 + "px";
    cursorShadow.value.style.top = mouseY.value - 32 + "px";
  }
  if (cursorHaloEl.value) {
    cursorHaloEl.value.style.left = mouseX.value + "px";
    cursorHaloEl.value.style.top = mouseY.value + "px";
  }
});

useEventListener("click", (e) => {
  cursorHaloEl.value.style.left = mouseX.value - 24 + "px";
  cursorHaloEl.value.style.top = mouseY.value - 24 + "px";
  cursorHaloEl.value.style.width = "56px";
  cursorHaloEl.value.style.height = "56px";

  cursorAnimations();
});

useEventListener("scroll", () => {
  clearTimeout(isScrolling.value);

  // Disable mousemove during scrolling
  cursorPointer.value.style.display = "none";
  cursorShadow.value.style.display = "none";

  // Set a timeout to re-enable mousemove after scrolling stops
  isScrolling.value = setTimeout(() => {
    cursorPointer.value.style.display = "block";
    cursorShadow.value.style.display = "block";
  }, 500); // Adjust the timeout duration as needed
});

useHead({
  meta: [{ property: "og:url", content: url.href }],
});
</script>
