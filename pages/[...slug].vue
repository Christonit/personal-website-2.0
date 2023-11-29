<script setup>
const { data } = await useAsyncData(async ({ $config, $router }) => {
  const {
    public: { contentful_space_id, secret },
  } = $config;

  const slug = $router.currentRoute._rawValue.params.slug[0];

  const json_import = await import("~/utils/portfolio-items.json");

  const portfolio_items = json_import.default;
  const current_item = portfolio_items.find((item) => item.slug === slug);

  const {
    data: { portfolio },
  } = await $fetch(
    `https://graphql.contentful.com/content/v1/spaces/${contentful_space_id}/`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({
        query: `query {
                portfolio(id: "${current_item.id}") {
                    ${SPECIFIC_QUERY}
                }
            }`,
      }),
    }
  );

  return portfolio;
});
</script>
<template>
  <section id="project-case-study" class="section is-large">
    <section class="container is-fullhd">
      <div class="columns is-centered is-multiline">
        <div class="column is-half-desktop">
          <figure class="image">
            <img
              src="http://chsantana.com/img/orca/orca-preview.png"
              style="cursor: zoom-in"
            />
          </figure>
        </div>
        <div class="column is-7-desktop has-text-centered">
          <h1>ORCA - Timezones</h1>
          <h4 class="is-4">
            Timezones management web app for international remote teams.
          </h4>
        </div>
        <div class="columns is-multiline">
          <div class="column is-3-desktop is-offset-2">
            <div class="content">
              <h6><b>Tasks</b></h6>
              <ul class="skill-list">
                <li>Front-end</li>

                <li>Back-end</li>
                <li>Product Design</li>
              </ul>
            </div>
            <div class="content">
              <h6><b>Tools</b></h6>
              <ul class="skill-list">
                <li>VueJS</li>

                <li>Laravel</li>
                <li>Html &amp; Sass</li>
              </ul>
            </div>
          </div>
          <div class="column is-5-desktop">
            <p>
              ORCA is a joint product currently in development born from common
              remote workers to assert the need of company teammates and
              freelancers to have an agenda that shows current and overlapping
              times depending on the timezone for each member in a company or a
              project for an interested party.
            </p>

            <p>
              Visual design is being handled by
              <a href="https://francispujols.com/" target="_blank"
                >Francis Pujols</a
              >
              &amp; everything from the UI and the backend is being coded by me.
            </p>

            <p>
              The tech stack used is Vue.Js for front end UI &amp; Laravel for
              Web Services.
            </p>
            <p>
              You can check out my code progress on my
              <a
                href="https://github.com/Christonit/timezones-app"
                target="_blank"
                >Github</a
              >.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="container is-fullhd">
      <div class="columns is-multiline">
        <div class="column is-8-desktop is-offset-2-desktop">
          <figure class="image">
            <img
              src="http://chsantana.com/img/orca/orca-img-1.png"
              style="cursor: zoom-in"
            />
          </figure>
        </div>
        <div class="column is-8-desktop is-offset-2-desktop">
          <figure class="image">
            <img
              src="http://chsantana.com/img/orca/orca-img-2.png"
              style="cursor: zoom-in"
            />
          </figure>
        </div>
        <div class="column is-8-desktop is-offset-2-desktop">
          <figure class="image">
            <img
              src="http://chsantana.com/img/orca/orca-img-3.png"
              style="cursor: zoom-in"
            />
          </figure>
        </div>
        <div class="column is-8-desktop is-offset-2-desktop">
          <figure class="image">
            <img
              src="http://chsantana.com/img/orca/orca-img-4.png"
              style="cursor: zoom-in"
            />
          </figure>
        </div>
      </div>

      <div class="columns is-multiline">
        <div class="column is-full has-text-centered">
          <h3 class="is-3">Thanks for watching</h3>
        </div>

        <div class="column is-8 is-offset-2 has-text-centered">
          <p>
            Project code available on
            <a
              href="https://github.com/Christonit/timezones-app"
              target="_blank"
              >Github</a
            >
          </p>
        </div>
      </div>
    </section>
  </section>
</template>
