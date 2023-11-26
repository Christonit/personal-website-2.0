<template>
  <span ref="anchor" />
  <Header :ref="header" />

  <slot />

  <button id="scrollToTop" ref="scrollToTopFab" @click="scrollToTop">
    <i class="material-icons"> arrow_upward </i>
  </button>

  <canvas id="cursor"></canvas>
  <canvas id="cursor--shadow"></canvas>
  <span id="cursor--halo"></span>
  <NuxtFooter />
</template>

<script setup>
import anime from "animejs";
import ProgressBar from "progressbar.js";
import debounce from "lodash/debounce";

const header = ref();
const scrollToTopFab = ref();
const anchor = ref();
const sm = 768;

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
  let scrollPosition = window.scrollY;

  let scrollCount =
    parseFloat(scrollPosition / document.body.clientHeight) + 0.55;
  scrollCount = scrollCount >= 1 ? 1 : scrollCount;

  let x;

  window.innerWidth > sm ? (x = "144px") : (x = "64px");

  if (scrollPosition > 250) {
    anime({
      targets: document.querySelector("#scrollToTop"),
      bottom: x,
      delay: 0,
      opacity: 1,
      duration: 700,
      easing: "easeInOutQuad",
    });
  } else {
    anime({
      targets: document.querySelector("#scrollToTop"),
      bottom: "-" + x,
      delay: 0,
      opacity: 0,
      duration: 700,
      easing: "easeInOutQuad",
    });
  }

  bar.animate(scrollCount);
};

const debouncedScrollHandler = debounce(scrollHandler, 500);

onMounted(() => {
  if (process.client) {
    const bar = new ProgressBar.Circle(scrollToTopFab.value, {
      strokeWidth: 1,
      easing: "easeIn",
      duration: 200,
      color: "rgba(255,255,255,1)",
      trailColor: "rgba(255,255,255,0.24)",
      trailWidth: 1,
      svgStyle: null,
    });

    const topAnchor =
      document.scrollingElement || document.body || document.documentElement;
    const cursorShadow = document.querySelector("#cursor--shadow");
    const cursor = document.querySelector("#cursor");
    const red = "#F32424";
    const scrollTop = document.getElementById("scrollToTop");

    document.addEventListener("mousemove", function (e) {
      cursor.style.left = e.pageX + "px";
      cursor.style.top = e.pageY + 100 + "px";
    });

    let cursorAnimations = () => {
      let cursorAnimation = anime.timeline();
      let cursorHalo = document.querySelector("#cursor--halo");

      cursorAnimation
        .add({
          targets: cursorHalo,
          opacity: 1,
          borderColor: "rgba(255,255,255,1)",
          height: 56,
          width: 56,
          duration: 400,
          easing: "linear",
        })
        .add({
          targets: cursorHalo,
          opacity: 0,
          borderColor: "rgba(255,255,255,0)",
          duration: 300,
          easing: "linear",
        })
        .add({
          targets: cursorHalo,
          height: 0,
          width: 0,
          duration: 100,
        });
    };

    document.addEventListener("click", (e) => {
      document.querySelector("#cursor--halo").style.cssText =
        "width: 0; height: 0; left: " +
        (e.pageX - 24) +
        "px; top: " +
        (e.pageY - 4) +
        "px;";
      cursorAnimations();
    });

    document
      .querySelectorAll(
        "a, .navbar-item, .portfolio-el-img, .button, button, #scrollToTop, figure, img"
      )
      .forEach((element) => {
        element.addEventListener("mouseover", function (e) {
          anime({
            targets: cursorShadow,
            height: 56,
            opacity: 1,
            width: 56,
            duration: 1000,
          });

          anime({
            targets: cursor,
            opacity: 0,
            duration: 1000,
          });
        });

        element.addEventListener("mouseleave", function (e) {
          anime({
            targets: cursorShadow,
            height: 0,
            width: 0,
            opacity: 0,
            duration: 1000,
          });

          anime({
            targets: cursor,
            opacity: 1,
            duration: 1000,
          });
        });
      });

    document.addEventListener("mousemove", function (e) {
      document.querySelector("#cursor").style.left = e.pageX + 2 + "px";
      document.querySelector("#cursor").style.top = e.pageY + 8 + "px";

      document.querySelector("#cursor--shadow").style.left = e.pageX + 2 + "px";
      document.querySelector("#cursor--shadow").style.top = e.pageY - 8 + "px";
    });

    //Currently have issue of event bubbling and multiple firings.
    // One posible solution is generate a new canvas on click on te same event.page position, chain it with a promise and then delete it when animation finished.
    document.addEventListener("click", function (e) {
      document.querySelectorAll(".cursor--halo").forEach((element) => {
        element.style.cssText =
          "width: 0; height: 0; left: " +
          (e.pageX - 24) +
          "px; top: " +
          (e.pageY - 4) +
          "px;";
      });
      cursorAnimations();
    });

    window.addEventListener("scroll", () => debouncedScrollHandler(bar));
  }
});
</script>
