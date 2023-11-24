<template>
  <Header />
  <section class="hero is-primary container is-fluid">
    <div class="columns is-multiline">
      <div class="column hero-body is-12 is-middle-aligned">
        <h1 class="title is-1 is-spaced">Christopher Santana</h1>
        <h1 class="title is-1 is-spaced highlight">
          Product designer &amp; front end developer
        </h1>
        <h1 class="is-1 neon">AT YOUR SERVICE.</h1>
      </div>
      <div class="column is-5-desktop"></div>

      <div class="column is-12">
        <div class="scroll-more-container">
          <span class="text">Scroll down</span>

          <div class="arrow-container">
            <div class="chevron"></div>
            <div class="chevron"></div>
            <div class="chevron"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
  <NuxtFooter />
</template>
