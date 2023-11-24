

document.addEventListener('DOMContentLoaded', function () {

    let windowSize = screen.width;
    let xs = 512;
    let sm = 768;
    let md = 896;
    let lg = 1152;
    let xl = 1280;
    let xxxl = 1441;

    // Loading screen code
    anime.timeline({
        easing: 'easeInOutExpo',
        delay: 500,
        complete: () => {
            document.querySelector('.loading').remove();
        }
    }).add({
        targets: '.spinner',
        keyframes: [
            { height: 80, duration: 600 },
            { height: 0, duration: 300 }
        ]
    }).add({
        targets: '.loading',
        opacity: 0,
        duration: 500
    });

    // Navbar burger icon click event
    document.querySelector('.navbar-burger').addEventListener('click', function () {
        let isActive = document.querySelector('.navbar-burger').classList.contains('is-active');
        let el = document.querySelector('.navbar-menu');
        document.querySelector('.navbar-burger').classList.toggle('is-active');

        if (!isActive) {
            document.querySelector(".navbar-menu").classList.toggle("is-active");
            anime({
                targets: el,
                duration: 400,
                translateY: 0,
                opacity: 1
            });
        } else {
            anime({
                targets: el,
                duration: 400,
                translateY: 800,
                opacity: 0.3
            });
            setTimeout(() => {
                document.querySelector(".navbar-menu").classList.toggle("is-active");
            }, 700);
        }
    });

    let slideProgressBar = document.querySelector('#slide-progress-bar');
    let slideContainer = document.querySelector('[data-glide-el="track"]');
    let slideList = document.querySelectorAll('.glide__slides li');
    let arrows = document.querySelector('[data-glide-el="controls"]');
    let next = document.querySelector('[data-glide-dir=">"]');
    let previews = document.querySelector('[data-glide-dir="<"]');

    const topAnchor = document.scrollingElement || document.body || document.documentElement;
    const cursorShadow = document.querySelector('#cursor--shadow');
    const cursor = document.querySelector('#cursor');
    const red = '#F32424';

    document.addEventListener('mousemove', function (e) {
        cursor.style.left = e.pageX + 2 + 'px';
        cursor.style.top = e.pageY + 8 + 'px';
        cursorShadow.style.left = e.pageX + 2 + 'px';
        cursorShadow.style.top = e.pageY - 8 + 'px';
    });

    let cursorAnimations = () => {
        let cursorAnimation = anime.timeline();
        let cursorHalo = document.querySelector('.cursor--halo');

        cursorAnimation.add({
            targets: cursorHalo,
            opacity: 1,
            borderColor: 'rgba(255,255,255,1)',
            height: 56,
            width: 56,
            duration: 400,
            easing: 'linear'
        }).add({
            targets: cursorHalo,
            opacity: 0,
            borderColor: 'rgba(255,255,255,0)',
            duration: 300,
            easing: 'linear'
        }).add({
            targets: cursorHalo,
            height: 0,
            width: 0,
            duration: 100
        });
    };

    document.addEventListener('click', (e) => {
        let cursorHalo = document.querySelector('.cursor--halo');
        cursorHalo.style.width = '0';
        cursorHalo.style.height = '0';
        cursorHalo.style.left = e.pageX - 24 + 'px';
        cursorHalo.style.top = e.pageY - 4 + 'px';
        cursorAnimations();
    });

    const elements = document.querySelectorAll('a, .navbar-item, .portfolio-el-img, .button, button, #scrollToTop');

    elements.forEach(element => {
        element.addEventListener('mouseover', function (e) {
            anime({
                targets: cursorShadow,
                height: 56,
                opacity: 1,
                width: 56,
                duration: 1000
            });

            anime({
                targets: cursor,
                opacity: 0,
                duration: 1000
            });
        });

        element.addEventListener('mouseleave', function (e) {
            anime({
                targets: cursorShadow,
                height: 0,
                width: 0,
                opacity: 0,
                duration: 1000
            });

            anime({
                targets: cursor,
                opacity: 1,
                duration: 1000
            });
        });
    });

    var bar = new ProgressBar.Circle(document.getElementById('scrollToTop'), {
        strokeWidth: 1,
        easing: 'easeIn',
        duration: 200,
        color: 'rgba(255,255,255,1)',
        trailColor: 'rgba(255,255,255,0.24)',
        trailWidth: 1,
        svgStyle: null
    });

    new Zooming().listen('img').config({
        bgColor: '#000',
        enableGrab: false,
        zIndex: 9999
    });
});
