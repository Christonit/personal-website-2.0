
let currentEl = document.querySelector("[data-slide-count='current']");
currentEl.innerHTML = 1;

let slideCounterTotal = document.querySelector("[data-slide-count='total']");
slideCounterTotal.innerHTML = slideList.length;


let slideCounter = document.querySelector("#slide-counter");
let activeSlide = $('.glide__slide--active');
let deviseEvent = () =>{
    if(windowSize > sm){
        return 'click';
    }else{
        return 'touchend';
    }
}
next.addEventListener(deviseEvent(), ()=>{

    new Promise((resolve, reject) => {

        let z = setInterval(()=>{

            if($('.glide__slide--active').index() > 0){
                clearInterval(z);
                resolve();
            }

        }, 100);

    }).then(function(result) {

        return  previews.classList.remove('is-disabled');

    });

    new Promise((resolve, reject) => {

        let z = setInterval(()=>{

            if($('.glide__slide--active').index() == (slideList.length - 1) ){
                clearInterval(z);
                resolve();
            }

        }, 100);

    }).then(function(result) {
        // console.log(slideList.length - 1);
        return  next.classList.add('is-disabled');

    });

    if($('.glide__slide--active').index() == (slideList.length - 1) ){
        let z = setInterval(()=>{
            if($('.glide__slide--active').index() == 0){

                next.classList.remove('is-disabled')
                previews.classList.add('is-disabled');
                // console.log($('.glide__slide--active').index() + ' = End.');
                clearInterval(z);

            };

        }, 200);

    }



});


previews.addEventListener(deviseEvent(), ()=>{


    new Promise((resolve, reject) => {

        let z = setInterval(()=>{

            if($('.glide__slide--active').index() == (slideList.length - 1) ){
                clearInterval(z);
                resolve();
            }

        }, 100);

    }).then(function(result) {
        previews.classList.remove('is-disabled');
        return  next.classList.add('is-disabled');

    });


    new Promise((resolve, reject) => {

        let z = setInterval(()=>{

            if($('.glide__slide--active').index() == 0){
                clearInterval(z);
                resolve();
            }

        }, 100);

    }).then(function(result) {

        return  previews.classList.add('is-disabled');

    });


    let z = setInterval(()=>{

        if( $('.glide__slide--active').index() < (slideList.length - 1) ){
            next.classList.remove('is-disabled');
            clearInterval(z);
        }

    }, 200);




});




let glide = new Glide('.glide', {
    type: 'slider',
    focusAt:'center',
    gap:200,
    width:300,
    perView: 2.2,
    breakpoints: {
        1441: {
            width:560,
            gap:100
        },
        1024: {
            perView: 2
        },
        600: {
            width:300,
            perView: 1,
            gap: 50
        }
    }
});


glide.on('run', (e) =>{


    anime({
        targets: currentEl,
        duration:250,
        translateX: 30,
        easing: 'linear',
        opacity:0
    });

    setTimeout( ()=>{
        currentEl.innerHTML = glide.index + 1;
        currentEl.style.transform = "translateX(-30px)";

        anime({
            targets: currentEl,
            duration:250,
            translateX: 0,
            easing: 'linear',
            opacity:1
        });


    },250);

    let slideWidth = 0;

    if(glide.index < slideList.length){

        slideWidth += ( ( glide.index/slideList.length) *100 );

    }else {

        slideWidth = 0;

    }

    anime({
        targets:slideProgressBar,
        duration:500,
        left: slideWidth + '%',
        easing: 'easeInOutCirc'
    });

});




glide.mount();

let hideShowArrows = (x)=>{
    anime({
        targets: arrows,
        duration:200,
        easing: 'linear',
        opacity:x,
    });
}

let hideShowClose = (x) =>{

    anime({
        targets:closeBtn,
        duration:200,
        opacity:x,
        easing: 'linear'
    });

}

let portfolioEl = $(".glide__slide");
let closeBtn = document.querySelector('span[data-action="close"]');
let portfolioPrevLing = $('portfolio-el-img a');


if(windowSize <= sm){
    $(slideCounter).insertBefore(slideContainer);

    $('.portfolio-el').on('touchstart',(e)=>{
        hideShowClose(1);

        hideShowArrows(0);

        setTimeout( ()=>{
            arrows.style.display = 'none';
        },200);

        e.preventDefault;

    });

    portfolioEl.on('touchcancel',(e)=>{
        hideShowClose(1);

        hideShowArrows(0);

        setTimeout( ()=>{
            arrows.style.display = 'none';
        },200);

        portfolioPrevLing.preventDefault;

    });


    closeBtn.addEventListener('click', ()=>{

        hideShowClose(0);
        arrows.style.display = 'inherit';
        hideShowArrows(1);

    });

    portfolioEl.on('touchmove', ()=>{

        hideShowClose(0);
        arrows.style.display = 'inherit';
        hideShowArrows(1);
        // $(this).reset();

    });





}

slideProgressBar.style.width = (100/ slideList.length) + '%';
