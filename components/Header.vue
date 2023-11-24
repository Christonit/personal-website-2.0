<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a id="logo" class="navbar-item" href="http://chsantana.com">
        <Logo />
      </a>
      <a
        role="button"
        class="navbar-burger burger is-hidden-desktop"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu">
      <div class="navbar-end">
        <a href="http://chsantana.com#portfolio-container" class="navbar-item">
          Work
        </a>

        <a href="http://chsantana.com/about-me" class="navbar-item">
          About me
        </a>

        <a
          href="mailto:me@chsantana.com"
          class="navbar-item button is-normal is-primary is-cta is-hidden-mobile"
        >
          Get in touch
        </a>

        <div id="get-in-touch  " class="is-hidden-desktop">
          <div class="navbar-item contact-info">
            <small> NEED HELP? </small>
            <a href="mailto:me@chsantana.com">me@chsantana.com</a>
          </div>
          <div class="navbar-item contact-info">
            <small> WANT TO CHAT? </small>
            <a href="http://opensource.org/licenses/mit-license.php"
              >+1 829 781 3995</a
            >
          </div>
          <div class="navbar-item">
            <a
              href="img/Christopher Santana - Web Developer.pdf"
              class="button is-text"
            >
              Download CV
            </a>
            <a
              href="https://www.behance.net/ChristopherSant"
              target="_blank"
              class="button is-white"
            >
              <i class="fab fa-behance"></i>
            </a>
            <a
              href="https://github.com/Christonit/"
              target="_blank"
              class="button is-white"
            >
              <i class="fab fa-dribbble"></i>
            </a>

            <a
              href="https://www.linkedin.com/in/christopher-santana-b28071b1/"
              class="button is-white"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
