const superlike = document.getElementsByClassName('fa-star');
const trash = document.getElementsByClassName('fa-trash');
const copy = document.getElementsByClassName('fa-copy');
const likedShoes = document.getElementsByClassName('mylikescardpaartjes');

function createMessage(message) {
  const newMessage = document.createElement('p');
  const messageContent = document.createTextNode(message);
  newMessage.appendChild(messageContent);
  newMessage.setAttribute('id', 'mylikesmessage');
  likedShoes[0].parentNode.appendChild(newMessage);
}

function deleteMessage() {
  window.setTimeout(function () {
    const myLikesMessage = document.getElementById('mylikesmessage');
    myLikesMessage.remove();
  }, 2500);
}

function toggleSuperLike() {
  this.parentNode.parentNode.classList.toggle('addsuperlike');
  this.classList.toggle('superliked');
  if (this.classList.contains('superliked')) {
    createMessage('Superliked!');
  } else {
    createMessage('Un-superliked!');
  }
  deleteMessage();
}

function removeShoe() {
  // createMessage voor de .remove(), omdat die anders het parent element niet herkend
  createMessage('Deleted the shoe :(');
  this.parentNode.parentNode.remove();
  deleteMessage();
}

function copyStyle() {
  // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
  navigator.clipboard.writeText(
    this.parentNode.parentNode.childNodes[2].childNodes[1].textContent
  );
  createMessage('Copied the stylecode to clipboard!');
  deleteMessage();
}

// For loops gebruikt, omdat ze anders niet voor alle icons (superlike, trash en copy) gelden
for (let i = 0; i < superlike.length; i += 1) {
  superlike[i].addEventListener('click', toggleSuperLike);
}

for (let i = 0; i < trash.length; i += 1) {
  trash[i].addEventListener('click', removeShoe);
}

for (let i = 0; i < copy.length; i += 1) {
  copy[i].addEventListener('click', copyStyle);
}
