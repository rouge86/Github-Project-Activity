const recipesContainer = document.getElementById("recipes-container");
const getRecipesBtn = document.getElementById("get-recipes"); // as HTMLButtonElement;
const queryInput = document.getElementById("query-input"); // as HTMLInputElement;

const apiId = "bcfab256";
const apiKey = "f61e0b4ed3f4b5d198cb292a5bf83160";

const url = new URL("api/recipes/v2", "https://api.edamam.com");
url.searchParams.append("app_id", apiId);
url.searchParams.append("app_key", apiKey);
url.searchParams.append("type", "public");

getRecipesBtn.addEventListener("click", () => {
  const query = queryInput.value;
  fetchData(query);
});

// interface Ingredient {
//   text: string;
//   quantity: number;
//   measure: string;
//   food: string;
//   foodCategory: string;
// }

// interface Recipe {
//   label: string;
//   ingredients: Ingredient[];
// }

// interface Data {
//   hits: Recipe[];
// }

async function fetchData(query, options = {}) {
  url.searchParams.append("q", query);
  const request = new Request(url);
  const response = await fetch(request);
  if (!response.ok) return;
  const data = await response.json();
  console.log(data);
}

// function renderRecipes(data) {}

// function appendOptions(url, options) {}
