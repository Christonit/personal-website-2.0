<template>
  <nav
    class="navbar"
    role="navigation"
    aria-label="main navigation"
    ref="header"
  >
    <div class="navbar-brand">
      <NuxtLink id="logo" class="navbar-item" href="/">
        <Logo />
      </NuxtLink>
      <button
        role="button"
        class="navbar-burger burger is-hidden-desktop"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </div>
    <div class="navbar-menu">
      <div class="navbar-end">
        <NuxtLink to="/#portfolio-container" class="navbar-item">
          Work
        </NuxtLink>

        <NuxtLink to="/about-me" class="navbar-item"> About me </NuxtLink>

        <NuxtLink
          href="mailto:me@chsantana.com"
          class="navbar-item button is-normal is-primary is-cta is-hidden-mobile"
        >
          Get in touch
        </NuxtLink>

        <div id="get-in-touch  " class="is-hidden-desktop">
          <div class="navbar-item contact-info">
            <small> NEED HELP? </small>
            <NuxtLink to="mailto:me@chsantana.com">me@chsantana.com</NuxtLink>
          </div>
          <div class="navbar-item contact-info">
            <small> WANT TO CHAT? </small>
            <NuxtLink to="http://opensource.org/licenses/mit-license.php"
              >+1 829 781 3995</NuxtLink
            >
          </div>
          <div class="navbar-item">
            <NuxtLink
              href="/img/Christopher Santana - Web Developer.pdf"
              class="button is-text"
            >
              Download CV
            </NuxtLink>
            <NuxtLink
              href="https://www.behance.net/ChristopherSant"
              target="_blank"
              class="button is-white"
            >
              <i class="fab fa-behance"></i>
            </NuxtLink>
            <NuxtLink
              href="https://github.com/Christonit/"
              target="_blank"
              class="button is-white"
            >
              <i class="fab fa-dribbble"></i>
            </NuxtLink>

            <NuxtLink
              href="https://www.linkedin.com/in/christopher-santana-b28071b1/"
              class="button is-white"
            >
              <i class="fab fa-linkedin-in"></i>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const { ref: header } = defineProps(["ref"]);
</script>
