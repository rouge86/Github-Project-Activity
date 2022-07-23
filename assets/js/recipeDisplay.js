import navigate from "./navigate.js";
import loadRecipe from "./load-recipe.js";

function recipeDsp(recipeList) {
  var listOfRecipe = document.createElement("li");
  var title = document.createElement("h3");
  var clear = document.createElement("button");
  listOfRecipe.appendChild(title);
  listOfRecipe.appendChild(clear);

  listOfRecipe.setAttribute("class", "w-48 flex flex-none justify-between");
  listOfRecipe.setAttribute("id", recipeList.uri);
  clear.setAttribute(
    "class",
    "border-solid border-2 border-rose-500 hover:bg-rose-400 animate-bounc"
  );

  title.innerText = recipeList.label;
  clear.innerText = "✘";

  return listOfRecipe;
}

function realrecipeDsp(recipeArry) {
  return recipeArry.map((recipeLabel) => {
    return recipeDsp(recipeLabel);
  });
}

//--------------------------------------------------------------------------

export function singleRecipeDsp(recipeID) {
  var recipe = loadRecipe(recipeID);

  var recipeImage = document.getElementById("recipeImage");
  var RTitle = document.getElementById("RTitle");
  var recipeIngredientList = document.getElementById("recipeIngredientList");
  var recipeLink = document.getElementById("recipeLink");

  renderIngredients(recipe.ingredientLines, recipeIngredientList);

  recipeImage.src = recipe.images.LARGE.url;
  RTitle.textContent = recipe.label;
  recipeLink.href = recipe.url;

  navigate("recipeScreen");
}

function renderIngredients(ingredientArry, container) {
  ingredientArry.forEach((ingredient) => {
    var signleIngredient = document.createElement("li");
    signleIngredient.innerText = ingredient;
    container.appendChild(signleIngredient);
  });
}

export default realrecipeDsp;
