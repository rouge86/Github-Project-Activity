import RecipeQuery from "./RecipeQuery.js";
import recipeCard from "./render-swipe-card.js";
import Swipe from "./Swipe.js";
import realCreate from "./healthLables.js";
import realrecipeDsp, {
  singleRecipeDsp,
  singleRecipeDelete,
} from "./recipeDisplay.js";
import navigate from "./navigate.js";
import { handleCardDisplay, bringForward } from "./handle-card-display.js";

const query = new RecipeQuery();
let swipe;
const labelArray = Object.values(RecipeQuery.healthLabels);
let isSwiping = false;

const labelCon = document.getElementById("labelSection");
var labelArry = Object.values(RecipeQuery.healthLabels);

const recipeCon = document.getElementById("recipesContainer");

const nav = document.querySelector("nav");
const labelContainer = document.getElementById("labelSection");
const recipeCardContainer = document.getElementById("cards");
const cards = document.getElementById("cards");

labelCon.addEventListener("input", function (event) {
  if (event.target.checked) {
    onLabelSave(event.target.value);
  } else {
    onLabelDelete(event.target.value);
  }
});

nav.addEventListener("click", (event) => {
  if (!event.target.matches("button")) return;
  const location = event.target.dataset.value;
  renderRecipes();
  navigate(location);
});
recipeCardContainer.addEventListener("pointerdown", grabCard);
recipeCardContainer.addEventListener("click", onCardClick);
window.addEventListener("keyup", onKeyPress);

function handleDecision(card, accepted) {
  if (isSwiping) return;
  isSwiping = true;
  if (accepted) saveRecipe(card.dataset.id);
  handleCardDisplay(card, accepted, () => (isSwiping = false));
  drawCards(1);
}

function onLabelSave(healthLabel) {
  var labelObject = JSON.parse(localStorage.getItem("healthLabel")) || {};
  labelObject[healthLabel] = true;
  localStorage.setItem("healthLabel", JSON.stringify(labelObject));
}

function onLabelDelete(healthLabel) {
  var labelObject = JSON.parse(localStorage.getItem("healthLabel")) || {};
  delete labelObject[healthLabel];
  localStorage.setItem("healthLabel", JSON.stringify(labelObject));
}

function onKeyPress(e) {
  if (e.key === "ArrowLeft") {
    handleDecision(cards.lastChild, false);
  }
  if (e.key === "ArrowRight") {
    handleDecision(cards.lastChild, true);
  }
}

function onCardClick(e) {
  if (!e.target.matches(".accept, .reject")) return;
  const card = e.target.closest(".recipeCard");
  const accepted = e.target.matches(".accept");
  handleDecision(card, accepted);
}

function saveRecipe(recipeId) {
  const recipe = query.getActiveRecipeByUri(recipeId);
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipes.push(recipe);
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

function grabCard(e) {
  const card = e.target.closest(".recipeCard");
  if (!card) return;
  swipe = new Swipe(e, card, handleDecision);
}

async function drawCards(numberOfCards) {
  for (let i = 0; i < numberOfCards; i++) {
    await insertNewCard();
  }
}

async function insertNewCard() {
  const recipe = await query.getRecipe();
  const newCard = recipeCard(recipe);
  cards.prepend(newCard);
}

function renderHealthLabels() {
  var labelElemAry = realCreate(labelArray);
  for (var i = 0; i < labelElemAry.length; i++) {
    labelContainer.appendChild(labelElemAry[i]);
  }
}

function renderRecipes() {
  recipeCon.innerHTML = "";
  var recipeElemAry = realrecipeDsp();
  for (var i = 0; i < recipeElemAry.length; i++) {
    recipeCon.appendChild(recipeElemAry[i]);
  }
}

var recipeList = document.getElementById("recipesContainer");

recipeList.addEventListener("click", function (event) {
  var listItem = event.target.closest("li");
  var id = listItem.id;

  if (event.target.matches("button")) {
    singleRecipeDelete(id);
    renderRecipes();
  } else {
    singleRecipeDsp(id);
  }
});

async function init() {
  renderHealthLabels();
  await drawCards(5);
  bringForward(cards.lastChild);
  renderRecipes();
}

init();
