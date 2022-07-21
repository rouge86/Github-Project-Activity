import RecipeQuery from "./RecipeQuery.js";
import recipeCard from "./render-swipe-card.js";
import Swipe from "./Swipe.js";
const query = new RecipeQuery();
let swipe;

const recipeCardContainer = document.getElementById("cards");
const cards = document.getElementById("cards");

recipeCardContainer.addEventListener("pointerdown", grabCard);

function onAccept(recipeId) {
  // This function will run on a succesful swipe (swipe right only)
  return async (accept, card) => {
    card.addEventListener("transitionend", () => {
      card.remove();
    });
    if (accept) {
      const recipe = query.getActiveRecipeByUri(recipeId);
      saveRecipe(recipe);
    }
    const recipe = await query.getRecipe();
    const newCard = recipeCard(recipe);
    cards.prepend(newCard);
  };
}

function saveRecipe(recipe) {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipes.push(recipe);
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

function grabCard(e) {
  const card = e.target.closest(".recipeCard");
  if (!card) return;
  swipe = new Swipe(e, card, onAccept(card.dataset.id));
}

async function getInitialCards() {
  const arr = [];
  for (let i = 0; i < 5; i++) {
    arr.push(query.getRecipe());
  }
  const recipeArray = await Promise.all(arr);
  recipeArray.forEach(recipe => {
    const card = recipeCard(recipe);
    cards.prepend(card);
  });
}

function init() {
  getInitialCards();
}

init();
