<template>
  <section class="section is-large">
    <div id="bio" class="container is-fluid">
      <div class="columns is-centered">
        <div
          class="column is-2-desktop has-text-right-desktop has-right-padding title-container"
        >
          <h2 class="title about-title is-1">
            <span class="has-stroke sm:block">WHO</span> I AM
          </h2>
        </div>
        <div class="column is-8-tablet is-6-desktop">
          <div class="content has-right-padding">
            <h5>
              I am a web developer and designer with over 9 years of experience
              in front-end development and UI design spread across different
              industries such as advertisement, finance, stocks trading, crypto
              & comunications.
            </h5>

            <p>
              Currently, working as a Senior Front End Developer consultant for
              a company making stocks trading tools & their partners where I
              collaborate on migrating WordPress to Vue.js/Nuxt SSG and SSR
              using Headless WordPress with GraphQL and REST APIs, User
              Interface redesigns and improving our Core Web Vitals.
            </p>
            <p>
              In my free time usually, you will find me rock climbing, weight
              lifting, or traveling to some low-profile beaches to do
              snorkeling. When I’m at home I'm either coding, playing video
              games (mostly APEX Legends, Battlefield 2042, or The Finals), or
              reading.
            </p>

            <p>
              Always keen to work and collaborate on new projects so feel free
              to drop me a line.
            </p>
          </div>
        </div>
      </div>
      <div id="skills" class="columns is-centered">
        <div
          class="column is-2-desktop has-text-right-desktop has-right-padding title-container"
        >
          <h2
            class="title about-title is-1"
            data-wow-duration="600ms"
            data-wow-offset="2"
          >
            <span class="has-stroke sm:block">MY</span> STACK
          </h2>
        </div>
        <div class="column is-8-tablet is-6-widescreen">
          <div class="content">
            <h6><b>Web Development</b></h6>
            <ul class="skill-list">
              <li>Nuxt</li>
              <li>Vue.Js &amp; Pinia</li>
              <li>React/Next.js</li>
              <li>Redux</li>
              <li>Webpack</li>
              <li>TypeScript</li>
              <li>Node.js</li>
              <li>Cypress</li>
              <li>Vitest</li>
              <li>Jest</li>
              <li>HTML &amp; CSS (SCSS)</li>
              <li>Wordpress</li>
              <li>Headless CMSs</li>
              <li>GraphQL/REST APIs</li>
              <li>SEO</li>
              <li>React Testing Library</li>
              <li>Unit, End-to-End & Integration Testing</li>
              <li>Bootstrap & Tailwind.css</li>
            </ul>
          </div>
          <div
            class="content"
            data-wow-delay="500ms"
            data-wow-duration="1500ms"
            data-wow-offset="2"
          >
            <h6><b>Product Design</b></h6>
            <ul class="skill-list">
              <li>User Interface Design</li>
              <li>User Experience</li>
              <li>Wireframing</li>
              <li>Prototyping</li>
              <li>User Research</li>
              <li>Figma &amp; Sketch</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { sitename } = useRuntimeConfig().public;
const description = computed(() => {
  return `${
    new Date().getFullYear() - 2015
  }+ years of experience in User Interface design & Web Delevopment with the JAM stack.`;
});

useHead({
  title: `My story, so far... | ${sitename}`,
  meta: [
    {
      name: "description",
      content: description,
    },
    { property: "og:title", content: `About me | ${sitename}` },
    {
      property: "og:description",
      content: description,
    },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "en_US" },
    // { property: "og:image", content: data.value.thumbnail.url },
  ],
});
</script>
