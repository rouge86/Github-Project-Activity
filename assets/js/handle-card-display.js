const cards = document.getElementById("cards");

function disappearCard(card, accept) {
  requestAnimationFrame(() => {
    const neg = accept ? "" : "-";
    card.style.transition = "400ms";
    card.style.opacity = "0";
    card.style.transform =
      card.style.transform + `translate(${neg}200px, 150px) rotate(${neg}120deg) scale(0.5)`;
  });
}

export function bringForward(element) {
  element.style.transition = "200ms ease-out";
  element.style.transform = null;
}

export function handleCardDisplay(card, accept, onRemove) {
  const nextCard = card.previousSibling;
  card.addEventListener("transitionend", () => {
    card.remove();
    onRemove();
  });
  disappearCard(card, accept);
  bringForward(nextCard);
}
