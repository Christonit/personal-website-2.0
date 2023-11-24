<template>
  <slot />

  <canvas id="cursor"></canvas>
  <canvas id="cursor--shadow"></canvas>
  <span id="cursor--halo"></span>
</template>

<script setup>
import anime from "animejs";

onMounted(() => {
  if (process.client) {
    const topAnchor =
      document.scrollingElement || document.body || document.documentElement;
    const cursorShadow = document.querySelector("#cursor--shadow");
    const cursor = document.querySelector("#cursor");
    const red = "#F32424";
    const scrollTop = document.getElementById("scrollToTop");

    document.addEventListener("mousemove", function (e) {
      cursor.style.left = e.pageX + "px";
      cursor.style.top = e.pageY + 100 + "px";
      // Use a setTimeout for cursor--shadow
      // setTimeout(() => {
      //     cursorShadow.style.left = e.pageX - 12 + 'px';
      //     cursorShadow.style.top = e.pageY + 2 + 'px';
      // }, 100);
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
  }
});
</script>
