const superlike = document.getElementsByClassName("fa-star");
const trash = document.getElementsByClassName("fa-trash");
const copy = document.getElementsByClassName("fa-copy");

function toggleSuperLike() {
    this.parentNode.parentNode.classList.toggle("addsuperlike")
    this.classList.toggle("superliked")
}

function removeShoe() {
    this.parentNode.parentNode.remove();
}

function copyStyle() {
    // Dit had denk ik wel mooier gekund, maar het gaat erom dat het werkt.
    navigator.clipboard.writeText(this.parentNode.parentNode.childNodes[2].childNodes[1].textContent)
}

// Een for loop, omdat die anders niet werkt voor alle superlikes.
for (var i = 0; i < superlike.length; i++) {
    superlike[i].addEventListener("click" , toggleSuperLike) ; 
 }

// Een for loop, omdat die anders niet werkt voor alle prullebakken.
for (var i = 0; i < trash.length; i++) {
    trash[i].addEventListener("click" , removeShoe) ; 
 }

 // Een for loop, omdat die anders niet werkt voor alle copy buttons.
for (var i = 0; i < copy.length; i++) {
    copy[i].addEventListener("click" , copyStyle) ; 
 }