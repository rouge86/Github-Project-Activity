const recipesContainer = document.getElementById("recipes-container");
const getRecipesBtn = document.getElementById("get-recipes"); // as HTMLButtonElement;
const queryInput = document.getElementById("query-input"); // as HTMLInputElement;
const mealTypeButtons = document.getElementById("meal-type"); // as HTMLSectionElement

const apiId = "bcfab256";
const apiKey = "f61e0b4ed3f4b5d198cb292a5bf83160";

let options = {}; // as QueryOptions;

mealTypeButtons.addEventListener("click", e => {
  if (!e.target.matches("button")) return;
  const { mealtype } = e.target.dataset;
  appendMealType(mealtype);
});

const url = new URL("api/recipes/v2", "https://api.edamam.com");
url.searchParams.append("app_id", apiId);
url.searchParams.append("app_key", apiKey);
url.searchParams.append("type", "public");

// interface QueryOptions {
//   mealType?: string;
// }

getRecipesBtn.addEventListener("click", e => {
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

async function fetchData(query) {
  url.searchParams.append("q", query);
  appendOptions(url, options);
  const request = new Request(url);
  console.log(request);
  // const response = await fetch(request);
  // if (!response.ok) return;
  // const data = await response.json();
  // console.log(data);
}

// function renderRecipes(data) {}

function appendOptions(url, options) {
  Object.entries(options).forEach(([key, val]) => {
    url.searchParams.append(key, val);
  });
  // url.searchParams.append();
}

function appendMealType(mealType) {
  options.mealType = mealType;
}
