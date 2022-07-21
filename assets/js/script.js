import RecipeQuery from "./RecipeQuery.js";
import recipeCard from "./render-swipe-card.js";
import Swipe from "./Swipe.js";
import realCreate from "./healthLables.js";
const query = new RecipeQuery();
let swipe;

//labelCon
const labelCon = document.getElementById("labelSection");
var labelArry = Object.values(RecipeQuery.healthLabels);
//-----------------------

var mainCollection = document.querySelectorAll("main");
const nav = document.querySelector("nav");
const recipeCardContainer = document.getElementById("cards");
const cards = document.getElementById("cards");

recipeCardContainer.addEventListener("pointerdown", grabCard);

nav.onclick = function (event) {
  if (!event.target.matches("button")) return;
  const location = event.target.dataset.value;
  Array.from(mainCollection).forEach(mainEl => {
    mainEl.hidden = true;
  });

  document.getElementById(location).hidden = false;
};
window.addEventListener("touchstart", e => e.preventDefault());

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
    bringForward(card.previousSibling);
  };
}

function bringForward(element) {
  element.style.transition = "200ms ease-out";
  element.style.transform = "translate(-50%, -50%)";
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
  bringForward(cards.lastChild);
}

function init() {
  getInitialCards();

  var labelElemAry = realCreate(labelArry);
  for (var i = 0; i < labelElemAry.length; i++) {
    labelCon.appendChild(labelElemAry[i]);
  }
}

init();
