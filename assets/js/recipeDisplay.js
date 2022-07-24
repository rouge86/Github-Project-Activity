import navigate from "./navigate.js";
import loadRecipe from "./load-recipe.js";

function recipeDsp(recipeList) {
  var listOfRecipe = document.createElement("li");
  var title = document.createElement("h3");
  var clear = document.createElement("button");
  listOfRecipe.appendChild(title);
  listOfRecipe.appendChild(clear);

  listOfRecipe.setAttribute("class", "flex flex-none justify-between gap-2");
  listOfRecipe.setAttribute("id", recipeList.uri);
  clear.setAttribute(
    "class",
    "flex-none border-solid border-2 border-rose-500 hover:bg-rose-400 rounded h-7 w-7 my-1 hover:text-white transition-all"
  );

  title.innerText = recipeList.label;
  title.setAttribute(
    "class",
    "overflow-hidden text-ellipsis p-1 whitespace-nowrap hover:bg-blue-100 flex-1 rounded"
  );
  clear.innerText = "✘";

  return listOfRecipe;
}

function realrecipeDsp() {
  var recipeArry = JSON.parse(localStorage.getItem("recipes")) || [];
  return recipeArry.map((recipeLabel) => {
    return recipeDsp(recipeLabel);
  });
}

function findImgUrl(images) {
  var imgSource = Object.entries(images);
  var imgURL;
  var propertyArry = ["REGULAR", "LARGE", "SMALL"];
  for (var i = 0; i < propertyArry.length; i++) {
    imgURL = imgSource.find(function (arryItem) {
      return arryItem[0] === "REGULAR";
    });
    if (imgURL) {
      return imgURL[1].url;
    }
  }
  return "";
}

export function singleRecipeDsp(recipeID) {
  var recipe = loadRecipe(recipeID);

  var recipeImage = document.getElementById("recipeImage");
  var RTitle = document.getElementById("RTitle");
  var recipeIngredientList = document.getElementById("recipeIngredientList");
  var recipeLink = document.getElementById("recipeLink");

  renderIngredients(recipe.ingredientLines, recipeIngredientList);

  var imageSource = findImgUrl(recipe.images);
  recipeImage.src = imageSource;
  RTitle.textContent = recipe.label;
  recipeLink.href = recipe.url;
  recipeLink.innerHTML = recipe.url;

  navigate("recipeScreen");
}

export function singleRecipeDelete(recipeID) {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  var filteredRecipes = recipes.filter(function (recipe) {
    return recipeID !== recipe.uri;
  });

  localStorage.setItem("recipes", JSON.stringify(filteredRecipes));
}

function renderIngredients(ingredientArry, container) {
  container.innerHTML = "";
  ingredientArry.forEach((ingredient) => {
    var signleIngredient = document.createElement("li");
    signleIngredient.innerText = ingredient;
    container.appendChild(signleIngredient);
  });
}

export default realrecipeDsp;
