function recipeDsp(recipeList) {
  var listOfRecipe = document.createElement("li");
  var title = document.createElement("h3");
  var clear = document.createElement("button");
  listOfRecipe.appendChild(title);
  listOfRecipe.appendChild(clear);

  listOfRecipe.setAttribute("class", "w-48 flex flex-none justify-between");
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

//--------------------------
export default realrecipeDsp;
