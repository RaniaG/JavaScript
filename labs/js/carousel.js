var slidesContainer=document.getElementsByClassName("slides")[0];
var slides_arr=document.getElementsByClassName("slide");
var bullet_btns=document.getElementsByClassName("bullet-btn");
var left_btn=document.getElementsByClassName("left-btn")[0];
var right_btn=document.getElementsByClassName("right-btn")[0];

var current_slide=0;
var slideshow;

var auto_slideshow=false;


var slides_count=slides_arr.length;
bullet_btns.forEach=Array.prototype.forEach;

function enter_left(el){
    el.style.animationName ="enter_left";
}
function enter_right(el){
    el.style.animationName ="enter_right";
}
function exit_left(el){
    el.style.animationName ="exit_left";
}
function exit_right(el){
    el.style.animationName ="exit_right";
}


function update_bullet(m){
    console.log(m);
    bullet_btns.forEach(function(el){
        el.classList.remove("active");
    });
    document.getElementsByClassName("bullet-btn--"+m)[0].classList.add("active");
}


function handle_bullet_btns(index){
    clearInterval(nextSlideInterval);
    console.log(index);
    if(index>current_slide)
    {
        exit_left(slides_arr[current_slide]);
        current_slide=index;
        enter_right(slides_arr[current_slide]);
    }
    else {
        exit_right(slides_arr[current_slide]);
        current_slide=index;
        enter_left(slides_arr[current_slide]);
    }
    update_bullet(current_slide+1);   
    nextSlideInterval=setInterval(nextSlide,3000);
}


function nextSlide(){
    exit_left(slides_arr[current_slide]);
    current_slide=(current_slide+1)%slides_count;
    enter_right(slides_arr[current_slide]);
    update_bullet(current_slide+1);
}
function previousSlide(){
    exit_right(slides_arr[current_slide]);
    if(current_slide==0)
        current_slide=4;
    else
        current_slide--;
    enter_left(slides_arr[current_slide]);
    update_bullet(current_slide+1);
}

left_btn.addEventListener("click",function(){
    clearInterval(nextSlideInterval);
    console.log("interval cleareed");
    previousSlide();
    nextSlideInterval=setInterval(nextSlide,3000);
});
right_btn.addEventListener("click",function(){
    clearInterval(nextSlideInterval);
    console.log("interval cleareed");
    nextSlide();
    nextSlideInterval=setInterval(nextSlide,3000);
});
bullet_btns.forEach(function(el){
    
    console.log("sth");    
    el.addEventListener("click",function(){
        handle_bullet_btns( el.getAttribute("slide") -1);
    });
});
slidesContainer.addEventListener("mouseover",function(){
    clearInterval(nextSlideInterval);
})
slidesContainer.addEventListener("mouseleave",function(){
    // nextSlide();
    nextSlideInterval=setInterval(nextSlide,3000);
})

nextSlide();
var nextSlideInterval=setInterval(nextSlide,3000);