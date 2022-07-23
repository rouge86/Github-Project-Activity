function loadRecipe(id) {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  var recipe = recipes.find(function (recipe) {
    return id === recipe.uri;
  });
  return recipe;
}

export default loadRecipe;
