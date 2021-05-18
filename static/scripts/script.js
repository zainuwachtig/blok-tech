const likeKnop = document.getElementsByName("like");
const dislikeKnop = document.getElementsByName("dislike");


function removeUpperCard() {
    const cards = document.querySelectorAll(".shoecard");
    const upperCard = cards[cards.length -1];
    if (cards.length == null) {
        console.log('test')
    } else {
        upperCard.remove();
    }
}

likeKnop[0].addEventListener("click", removeUpperCard);
dislikeKnop[0].addEventListener("click", removeUpperCard);
