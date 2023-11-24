

'use strict';
$(document).ready(()=>{


});



let windowSize = screen.width;
let xs = 512;
let sm = 768;
let md = 896;
let lg = 1152;
let xl = 1280;
let xxxl= 1441;


$(document).ready(function() {

    //
    // Loading screen code

    anime.timeline({
        easing: 'easeInOutExpo',
        delay:500,
        complete:()=>{
            $('.loading').remove();
        }
    }).add({
        targets: '.spinner',
        keyframes:[
            {height: 80,
                duration:600},
            {height: 0,
                duration:300}
        ]
    }).add({
        targets: '.loading',
        opacity:0,
        duration:500
    });


  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      let isActive = $('.navbar-burger').hasClass('is-active');
      let el = document.querySelector('.navbar-menu');

      $(".navbar-burger").toggleClass("is-active");

      if(isActive == false){

        $(".navbar-menu").toggleClass("is-active");

        anime({
          targets:el,
          duration:400,
          translateY: 0,
          opacity:1
        });

      }else {


        anime({
          targets:el,
          duration:400,
          translateY: 800,
          opacity:0.3
        });
        setTimeout( ()=>{
          $(".navbar-menu").toggleClass("is-active");
        },700);


      }


  });
});

let slideProgressBar = document.querySelector('#slide-progress-bar');
let slideContainer = document.querySelector('[data-glide-el="track"]');
let slideList = document.querySelectorAll('.glide__slides li');

let arrows = document.querySelector('[data-glide-el="controls"]');

let next = document.querySelector('[data-glide-dir=">"]');
let previews = document.querySelector('[data-glide-dir="<"]');



const topAnchor = window.document.scrollingElement || window.document.body || window.document.documentElement;
const cursorShadow = document.querySelector('#cursor--shadow');
const cursor = document.querySelector('#cursor');
const red = '#F32424';
const scrollTop = $('#scrollToTop');

$(document).bind('mousemove', function(e){
    $('#cursor').css({
        left:  e.pageX+2,
        top:   e.pageY +8
    });

        $('#cursor--shadow').css({
            left:  e.pageX+ 2,
            top:   e.pageY - 8
        });


});

let cursorAnimations = ()=>{


    let cursorAnimation = anime.timeline();
    let cursorHalo = document.querySelector('.cursor--halo');



    cursorAnimation.add({
        targets: cursorHalo,
        opacity:1,
        borderColor:'rgba(255,255,255,1)',
        height: 56,
        width: 56,
        duration: 400,
        easing:'linear'
    }).add({
        targets: cursorHalo,
        opacity:0,
        borderColor:'rgba(255,255,255,0)',
        duration: 300,
        easing:'linear'

    }).add({
        targets: cursorHalo,
        height: 0,
        width: 0,
        duration: 100,
    });

};



//Currently have issue of event bubbling and multiple firings.
// One posible solution is generate a new canvas on click on te same event.page position, chain it with a promise and then delete it when animation finished.
$(document).click( (e) =>{
    $('.cursor--halo').css({'width':0,
        'height':0,
        'left':(e.pageX -24),
        'top':(e.pageY -4)
    });
    cursorAnimations();

});

$('a, .navbar-item, .portfolio-el-img, .button, button,  #scrollToTop').on('mouseover', function(e){

    anime({
        targets: cursorShadow,
        height: 56,
        opacity:1,
        width: 56,
        duration: 1000
    });

    anime({
        targets: cursor,
        opacity:0,
        duration: 1000
    });

});

$('a, .navbar-item, .portfolio-el-img, .button, button, #scrollToTop').on('mouseleave', function(e){
    anime({
        targets: cursorShadow,
        height: 0,
        width: 0,
        opacity:0,
        duration: 1000
    });

    anime({
        targets: cursor,
        opacity:1,
        duration: 1000
    });

});


var bar = new ProgressBar.Circle(scrollToTop, {
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
    enableGrab:false,
    zIndex:9999

})




