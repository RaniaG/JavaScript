var tabs=document.getElementsByClassName("tab");

function clearActive(){
    tabs.forEach(function(el){
        el.classList.remove("active");
    })
}


tabs.forEach=Array.prototype.forEach;

tabs.forEach(function(el){
    el.addEventListener("click",function(event){
        if(el.classList.contains('active'))
        {
            el.classList.remove('active');
        }
        else{
            console.log(event.target)
            clearActive();
            el.classList.add('active');
        }
    })
})








