// import RecipeQuery from "./RecipeQuery";
import Swipe from "./Swipe.js";

let swipe;

const recipeCardContainer = document.getElementById("cards");
recipeCardContainer.addEventListener("pointerdown", grabCard);

function grabCard(e) {
  const card = e.target.closest(".recipeCard");
  if (!card) return;
  swipe = new Swipe(e.x, e.y, card);
}
