var bar = new ProgressBar.Circle(scrollToTop, {
    strokeWidth: 1,
    easing: "easeIn",
    duration: 200,
    color: "rgba(255,255,255,1)",
    trailColor: "rgba(255,255,255,0.24)",
    trailWidth: 1,
    svgStyle: null,
});

scrollTop.addEventListener("click", () => {
    anime({
        targets: topAnchor,
        scrollTop: 0,
        duration: 800,
        easing: "easeInOutQuad",
    });
});

document.addEventListener("scroll", () => {
    let scrollPosition = window.pageYOffset / document.body.clientHeight;
    let scrollCount = parseFloat(scrollPosition.toFixed(2)) + 0.25;
    let x = windowSize > sm ? "144px" : "64px";

    if (scrollPosition * 100 > 50) {
        document.addEventListener(
            "scroll",
            () => {
                anime({
                    targets: document.querySelector("#scrollToTop"),
                    bottom: x,
                    delay: 300,
                    opacity: 1,
                    duration: 700,
                    easing: "easeInOutQuad",
                });
            },
            { once: true }
        );
    } else {
        document.addEventListener(
            "scroll",
            () => {
                anime({
                    targets: document.querySelector("#scrollToTop"),
                    bottom: "-" + x,
                    delay: 300,
                    opacity: 0,
                    duration: 700,
                    easing: "easeInOutQuad",
                });
            },
            { once: true }
        );
    }

    bar.animate(scrollCount <= 1 ? scrollCount : (scrollCount = 1));
});