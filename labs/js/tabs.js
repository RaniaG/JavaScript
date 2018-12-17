
tab_links=document.getElementsByClassName("tab__link");
tab_content=document.getElementsByClassName("tab__content");

function clearActive(){
    tab_links.forEach(function(el){
        el.classList.remove("active");
    })
    tab_content.forEach(function(el){
        el.classList.remove("active");
    })
}
tab_links.forEach=Array.prototype.forEach; //function borrowing
tab_content.forEach=Array.prototype.forEach;

tab_links.forEach(function(el){
    el.addEventListener("click",function(event){
        clearActive();
        el.classList.add("active");
        document.querySelector("p."+event.target.classList[1]).classList.add("active");
    });
});
