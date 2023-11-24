<template>
  <section id="portfolio-container" class="section is-large">
    <div class="glide glide--ltr glide--slider glide--swipeable">
      <div class="glide__track" data-glide-el="track">
        <ul
          class="glide__slides"
          style="
            transition: transform 0ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
            width: 2218px;
            transform: translate3d(0px, 0px, 0px);
          "
        >
          <li
            class="glide__slide glide__slide--active"
            style="width: 517px; margin-right: 25px"
          >
            <div class="portfolio-el">
              <a
                target="_self"
                class="portfolio-el-img"
                draggable="true"
                data-href="http://chsantana.com/orca"
                href="http://chsantana.com/orca"
              >
                <img
                  src="http://chsantana.com/img/orca/orca-preview.png"
                  alt=""
                  style="cursor: zoom-in"
              /></a>

              <div class="portfolio-el-details has-text-centered">
                <h3 class="is-3">ORCA</h3>
                <p>
                  Work in progress timezones management web app for diverse
                  teams.
                </p>
                <a
                  class="button is-outlined"
                  draggable="true"
                  data-href="http://chsantana.com/orca"
                  href="http://chsantana.com/orca"
                  >View case</a
                >
              </div>
            </div>
          </li>
          <li
            class="glide__slide"
            style="width: 517px; margin-left: 25px; margin-right: 25px"
          >
            <div class="portfolio-el">
              <a
                target="_self"
                class="portfolio-el-img"
                draggable="true"
                data-href="http://chsantana.com/playsplit"
                href="http://chsantana.com/playsplit"
              >
                <img
                  src="http://chsantana.com/img/playsplit/preview.png"
                  alt=""
                  style="cursor: zoom-in"
              /></a>

              <div class="portfolio-el-details has-text-centered">
                <h3 class="is-3">Playsplit</h3>
                <p>Split, merge, and/or reorganize your Spotify playlists.</p>
                <a
                  class="button is-outlined"
                  draggable="true"
                  data-href="http://chsantana.com/playsplit"
                  href="http://chsantana.com/playsplit"
                  >View case</a
                >
              </div>
            </div>
          </li>
          <li
            class="glide__slide"
            style="width: 517px; margin-left: 25px; margin-right: 25px"
          >
            <div class="portfolio-el">
              <a
                target="_self"
                class="portfolio-el-img"
                draggable="true"
                data-href="http://chsantana.com/chimio"
                href="http://chsantana.com/chimio"
              >
                <img
                  src="http://chsantana.com/img/chimio-img/chimio-preview-1.png"
                  alt=""
                  style="cursor: zoom-in"
              /></a>

              <div class="portfolio-el-details has-text-centered">
                <h3 class="is-3">Chimio</h3>
                <p>
                  Anonymous secret sharing app for people seeking fun, to kill
                  time or relief.
                </p>
                <a
                  class="button is-outlined"
                  draggable="true"
                  data-href="http://chsantana.com/chimio"
                  href="http://chsantana.com/chimio"
                  >View case</a
                >
              </div>
            </div>
          </li>

          <li class="glide__slide" style="width: 517px; margin-left: 25px">
            <div class="portfolio-el">
              <a
                class="portfolio-el-img"
                target="_self"
                draggable="true"
                data-href="http://chsantana.com/fueltrack"
                href="http://chsantana.com/fueltrack"
              >
                <img
                  src="http://chsantana.com/img/fueltrack.og.png"
                  alt=""
                  style="cursor: zoom-in"
              /></a>

              <div class="portfolio-el-details has-text-centered">
                <h3 class="is-3">Fueltrack</h3>
                <p>
                  Web and mobile app to track and manage vehicle maintenance and
                  fuel expenses.
                </p>
                <a
                  class="button is-outlined"
                  draggable="true"
                  data-href="http://chsantana.com/fueltrack"
                  href="http://chsantana.com/fueltrack"
                  >View case</a
                >
              </div>
            </div>
          </li>

          <!-- 
                    <li class="glide__slide" style="width: 570.909px; margin-left: 50px;">
                        <div class="portfolio-el underconstruction">

                            <h3 class="is-3">CARSANT CONSULTING</h3>

                            <p><b>Website Design.</b></p> <p>Case study in progress...</p>

                        </div>

                    </li> -->
        </ul>
      </div>

      <div class="glide__arrows" data-glide-el="controls">
        <button
          class="glide__arrow glide__arrow--left has-text-left-mobile is-disabled"
          data-glide-dir="<"
        >
          <i class="material-icons">arrow_back</i>prev
        </button>
        <button
          class="glide__arrow glide__arrow--right has-text-right-mobile"
          data-glide-dir=">"
        >
          next<i class="material-icons">arrow_forward</i>
        </button>
      </div>

      <div id="slide-counter">
        <span
          data-slide-count="current"
          class="has-stroke"
          style="transform: translateX(0px); opacity: 1"
          >1</span
        >
        <span data-slide-count="total">4</span>
        <span data-action="close" class="button is-hollow is-small"
          ><i class="material-icons"> close </i></span
        >
      </div>

      <div id="slide-scroll-bar">
        <span id="slide-progress-bar" style="width: 25%; left: 0%"></span>
      </div>
    </div>
  </section>
</template>

<script setup>
import anime from "animejs";
import Glide from "@glidejs/glide";

// Assuming this code is inside a Vue Composition API setup function
onMounted(() => {
  if (process.client) {
    const glide = new Glide(".glide");
    glide.mount();

    const slideProgressBar = document.querySelector("#slide-progress-bar");
    const slideContainer = document.querySelector('[data-glide-el="track"]');
    const slideList = document.querySelectorAll(".glide__slides li");
    const arrows = document.querySelector('[data-glide-el="controls"]');
    const next = document.querySelector('[data-glide-dir=">"]');
    const previews = document.querySelector('[data-glide-dir="<"]');
    const currentEl = document.querySelector("[data-slide-count='current']");
    currentEl.innerHTML = 1;

    const slideCounterTotal = document.querySelector(
      "[data-slide-count='total']"
    );
    slideCounterTotal.innerHTML = slideList.length;

    const slideCounter = document.querySelector("#slide-counter");
    const activeSlide = document.querySelector(".glide__slide--active");

    const windowSize = screen.width;
    const sm = 768;

    function deviseEvent() {
      return windowSize > sm ? "click" : "touchend";
    }

    next.addEventListener(deviseEvent(), () => {
      const z1 = setInterval(() => {
        if (document.querySelector(".glide__slide--active").index() > 0) {
          clearInterval(z1);
          previews.classList.remove("is-disabled");
        }
      }, 100);

      const z2 = setInterval(() => {
        if (
          document.querySelector(".glide__slide--active").index() ===
          slideList.length - 1
        ) {
          clearInterval(z2);
          next.classList.add("is-disabled");
        }
      }, 100);

      if (
        document.querySelector(".glide__slide--active").index() ===
        slideList.length - 1
      ) {
        const z3 = setInterval(() => {
          if (document.querySelector(".glide__slide--active").index() === 0) {
            next.classList.remove("is-disabled");
            previews.classList.add("is-disabled");
            clearInterval(z3);
          }
        }, 200);
      }
    });

    previews.addEventListener(deviseEvent(), () => {
      const z1 = setInterval(() => {
        if (
          document.querySelector(".glide__slide--active").index() ===
          slideList.length - 1
        ) {
          clearInterval(z1);
          previews.classList.remove("is-disabled");
          next.classList.add("is-disabled");
        }
      }, 100);

      const z2 = setInterval(() => {
        if (document.querySelector(".glide__slide--active").index() === 0) {
          clearInterval(z2);
          previews.classList.add("is-disabled");
        }
      }, 100);

      const z3 = setInterval(() => {
        if (
          document.querySelector(".glide__slide--active").index() <
          slideList.length - 1
        ) {
          next.classList.remove("is-disabled");
          clearInterval(z3);
        }
      }, 200);
    });

    glide.on("run", (e) => {
      anime({
        targets: currentEl,
        duration: 250,
        translateX: 30,
        easing: "linear",
        opacity: 0,
      });

      setTimeout(() => {
        currentEl.innerHTML = glide.index + 1;
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
      if (glide.index < slideList.length) {
        slideWidth += (glide.index / slideList.length) * 100;
      } else {
        slideWidth = 0;
      }

      anime({
        targets: slideProgressBar,
        duration: 500,
        left: slideWidth + "%",
        easing: "easeInOutCirc",
      });
    });

    glide.mount();

    // Other parts of your code depending on the context...
  }
});
</script>
