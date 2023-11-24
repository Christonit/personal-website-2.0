import anime from 'animejs';

let x;
const topAnchor = document.scrollingElement || document.body || document.documentElement;
const cursorShadow = document.querySelector('#cursor--shadow');
const cursor = document.querySelector('#cursor');
const red = '#F32424';
const scrollTop = document.getElementById('scrollToTop');

document.addEventListener('mousemove', function (e) {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 100 + 'px';
});

let cursorAnimations = () => {
    let cursorHalo = document.querySelector('.cursor--halo');

    anime.timeline().add({
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

const elements = document.querySelectorAll('a, .navbar-item, .portfolio-el-img, .button, button, #scrollToTop, figure, img');

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

const bar = new ProgressBar.Circle(scrollToTop, {
    strokeWidth: 1,
    easing: 'easeIn',
    duration: 200,
    color: 'rgba(255,255,255,1)',
    trailColor: 'rgba(255,255,255,0.24)',
    trailWidth: 1,
    svgStyle: null
});

scrollTop.addEventListener('click', () => {
    anime({
        targets: topAnchor,
        scrollTop: 0,
        duration: 800,
        easing: 'easeInOutQuad'
    });
});

document.addEventListener('scroll', () => {
    let scrollPosition = window.pageYOffset / document.body.clientHeight;
    let scrollCount = parseFloat(scrollPosition.toFixed(2)) + ((document.body.clientHeight < 2500) ? 0.45 : 0.10);
    (windowSize > sm) ? x = '144px' : x = '64px';

    if ((scrollPosition * 100) > ((windowSize > sm) ? 15 : 25)) {
        setTimeout(() => {
            document.removeEventListener('scroll', scrollHandler);
            anime({
                targets: document.querySelector('#scrollToTop'),
                bottom: x,
                delay: 300,
                opacity: 1,
                duration: 700,
                easing: 'easeInOutQuad'
            });
        }, 200);
    } else if ((scrollPosition * 100) < ((windowSize > sm) ? 10 : 15)) {
        setTimeout(() => {
            document.removeEventListener('scroll', scrollHandler);
            anime.timeline({
                targets: document.querySelector('#scrollToTop'),
                duration: 500,
                easing: 'easeInOutQuad'
            }).add({
                opacity: 0
            }).add({
                opacity: 0,
                bottom: '-' + x
            });
        }, 200);
    }
    bar.animate((scrollCount <= 1 ? scrollCount : scrollCount = 1));
});

bar.set(30);
