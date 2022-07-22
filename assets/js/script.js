import RecipeQuery from "./RecipeQuery.js";
import recipeCard from "./render-swipe-card.js";
import Swipe from "./Swipe.js";
import realCreate from "./healthLables.js";
import realrecipeDsp from "./recipeDisplay.js";
const query = new RecipeQuery();
let swipe;
const labelArray = Object.values(RecipeQuery.healthLabels);

const labelCon = document.getElementById("labelSection");
var labelArry = Object.values(RecipeQuery.healthLabels);

//-------------------------------------------------------
const recipeCon = document.getElementById("recipesContainer");
var recipeArry = JSON.parse(localStorage.getItem("recipes")) || [];

//console.log(recipeArry);
//-------------------------------------------------------

const nav = document.querySelector("nav");
const mainCollection = document.querySelectorAll("main");
const labelContainer = document.getElementById("labelSection");
const recipeCardContainer = document.getElementById("cards");
const cards = document.getElementById("cards");

nav.addEventListener("click", (event) => {
  if (!event.target.matches("button")) return;
  const location = event.target.dataset.value;
  Array.from(mainCollection).forEach((mainEl) => {
    mainEl.hidden = true;
  });
  document.getElementById(location).hidden = false;
});
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
  recipeArray.forEach((recipe) => {
    const card = recipeCard(recipe);
    cards.prepend(card);
  });
  bringForward(cards.lastChild);
}

function renderHealthLabels() {
  var labelElemAry = realCreate(labelArray);
  for (var i = 0; i < labelElemAry.length; i++) {
    labelContainer.appendChild(labelElemAry[i]);
  }

  var recipeElemAry = realrecipeDsp(recipeArry);
  for (var i = 0; i < recipeElemAry.length; i++) {
    recipeCon.appendChild(recipeElemAry[i]);
  }
}

function init() {
  getInitialCards();
  renderHealthLabels();
}

init();
