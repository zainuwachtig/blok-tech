const superlike = document.getElementsByClassName("star");
const trash = document.getElementsByClassName("trash");

function addSuperLike() {
    // if (superlike.classList === "far") {
    //  superlike.classList.remove("far");
    //  superlike.classList.add("fas");
    //  console.log('test1')
    // } else {
    //  superlike.classList.add("far");
    //  superlike.classList.remove("fas");
    //  console.log('test2')
    // }

    //  superlike.classList.remove("far");
    //  superlike.classList.add("fas");

    this.parentNode.parentNode.classList.toggle("addsuperlike")
}

function removeShoe() {
    this.parentNode.parentNode.remove();
}

// Een for loop, omdat die anders niet werkt voor alle superlikes.
for (var i = 0 ; i < superlike.length; i++) {
    superlike[i].addEventListener("click" , addSuperLike) ; 
 }

// Een for loop, omdat die anders niet werkt voor alle prullebakken.
for (var i = 0 ; i < trash.length; i++) {
    trash[i].addEventListener("click" , removeShoe) ; 
 }