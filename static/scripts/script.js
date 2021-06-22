const superlike = document.getElementsByClassName("fa-star");
const trash = document.getElementsByClassName("fa-trash");
const copy = document.getElementsByClassName("fa-copy");
const myLikesMessage = document.getElementById("mylikesmessage");
const likedShoes = document.getElementsByClassName("mylikescardpaartjes");

function toggleSuperLike() {
    this.parentNode.parentNode.classList.toggle("addsuperlike")
    this.classList.toggle("superliked");
    if (this.classList.contains("superliked")) {
        createMessage('Superliked!')
    } else {
        createMessage('Un-superliked!')
    }
    deleteMessage();
}

function removeShoe() {
    this.parentNode.parentNode.remove();
    createMessage('Deleted the shoe :(')
    deleteMessage();
    
}

function copyStyle() {
    // Dit had denk ik wel mooier gekund, maar het gaat erom dat het werkt.
    // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
    navigator.clipboard.writeText(this.parentNode.parentNode.childNodes[2].childNodes[1].textContent);
    createMessage('Copied the stylecode to clipboard!')
    deleteMessage();
}

function createMessage(message) {
    var newMessage = document.createElement("p");  
    var messageContent = document.createTextNode(message); 
    newMessage.appendChild(messageContent); 
    newMessage.setAttribute("id", "mylikesmessage");
    likedShoes[0].parentNode.appendChild(newMessage); 
    
}

function deleteMessage() {
    window.setTimeout(function() {
        const myLikesMessage = document.getElementById("mylikesmessage");
        myLikesMessage.remove()
     }, 10000);
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