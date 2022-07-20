import RecipeQuery from "./RecipeQuery.js";
import recipeCard from "./render-swipe-card.js";

//---------- card display test-------------------------------
var cards = document.getElementById("cards");
const query = new RecipeQuery();
const recipe = await query.getRecipe();
const card = recipeCard(recipe);
cards.appendChild(card);
//---------- card display test-------------------------------

// const mealTypes = document.getElementById("mealTypes");
// const dishTypes = document.getElementById("dishTypes");
// const cuisineTypes = document.getElementById("cuisineTypes");

// const ingredientsForm = document.getElementById("ingredientsForm");
// const ingredientsList = document.getElementById("ingredientsList");
// const recipeResults = document.getElementById("recipeResults");

// let query = new RecipeQuery();
// query.addCuisineTypes("italian");

// // Event delegation
// mealTypes.addEventListener("click", setMealType);
// dishTypes.addEventListener("click", setDishType);
// cuisineTypes.addEventListener("click", setCuisineType);
// ingredientsForm.addEventListener("submit", addIngredient);
// ingredientsList.addEventListener("click", removeIngredient);
// searchBtn.addEventListener("click", onSearch);

// async function onSearch() {
//   const recipes = await query.getRecipes();
//   // console.log(recipes);
//   recipes.forEach(recipe => {
//     console.log(recipe.cuisineType);
//   });
//   renderResults(recipes);
// }

// function setMealType(e) {
//   const { target: clickedButton } = e;
//   if (!clickedButton.matches("button")) return;
//   setAllInactive(mealTypes);
//   toggleButton(clickedButton, query.removeMealTypes, query.setMealTypes);
//   console.clear();
//   query.log();
// }

// function setDishType(e) {
//   const { target: clickedButton } = e;
//   if (!clickedButton.matches("button")) return;
//   toggleButton(clickedButton, query.removeDishTypes, query.addDishTypes);
//   console.clear();
//   query.log();
// }

// function setCuisineType(e) {
//   const { target: clickedButton } = e;
//   if (!clickedButton.matches("button")) return;
//   toggleButton(clickedButton, query.removeCuisineTypes, query.addCuisineTypes);
//   console.clear();
//   query.log();
// }

// function setAllInactive(container) {
//   Array.from(container.children).forEach(el => {
//     el.dataset.active = "false";
//   });
// }

// function toggleButton(button, onTrue, onFalse) {
//   if (button.dataset.active === "true") {
//     button.dataset.active = "false";
//     onTrue(button.dataset.value);
//   } else {
//     button.dataset.active = "true";
//     onFalse(button.dataset.value);
//   }
// }

// function addIngredient(e) {
//   e.preventDefault();
//   const input = e.target.querySelector("input");
//   const ingredient = input.value.trim();
//   if (!ingredient) return;
//   query.addIngredientTypes(ingredient);
//   renderIngredients();
//   input.value = "";
// }

// function removeIngredient(e) {
//   const button = e.target;
//   if (!button.matches("button")) return;
//   const value = button.dataset.value;
//   query.removeIngredientTypes(value);
//   renderIngredients();
// }

// function renderIngredients() {
//   ingredientsList.innerHTML = "";
//   const ingredients = query.getIngredients();
//   const ul = document.createElement("ul");
//   ingredients.forEach(ingredient => ul.appendChild(renderIngredient(ingredient)));
//   ingredientsList.appendChild(ul);
// }

// function renderIngredient(value) {
//   const li = document.createElement("li");
//   const p = document.createElement("p");
//   p.innerText = value;
//   const button = document.createElement("button");
//   button.innerText = "x";
//   button.classList.add("delete");
//   button.dataset.value = value;
//   li.appendChild(p);
//   li.appendChild(button);
//   return li;
// }

// function renderResults(recipes) {
//   const html = recipes.map(
//     recipe => `
//           <div class="item">
//             <img src="${recipe.image}" alt="img">
//             <div class="flex-container">
//               <h1 class="title">${recipe.label}</h1>
//               <h2 class="title">${recipe.mealType}</h2>
//               <a class="view-btn" target="_blank" href="${recipe.url}">View Recipe</a>
//             </div>
//             <p class="item-data">Calories: ${recipe.calories.toFixed(2)}</p>
//             <p class="item-data">Diet label: ${
//               recipe.dietLabels.length > 0 ? recipe.dietLabels : "N/A"
//             }</p>
//           </div>`
//   );
//   recipeResults.innerHTML = "<h2>Results</h2>" + html.join("");
// }

// //this is not a effective way to load recipe in each mealType
// //was trying to do if button === click, url = newMealTypeLink but didnt work
// //if success, only need one big function for all mealType
// //cause once we detect which button wasclicked, we aisgn a new link to api call
// //see if you could make it work

// //also need input validation for ingredients

// //breakfast recipe search and display
// function breakfastClick(event) {
//   event.preventDefault();

//   //---------------------------------------------
//   //reload test
//   var newForm2 = document.createElement("form");
//   containerFood.appendChild(newForm2);
//   newForm2.setAttribute("id", "reset");

//   var newBtn2 = document.createElement("button");
//   newForm2.appendChild(newBtn2);
//   newBtn2.setAttribute("name", "re-submit");
//   newBtn2.textContent = "search again";

//   newForm2.addEventListener("submit", location.reload);
//   //------------------------------------------------------------

//   //prevent extra buttons clicked
//   btnList.remove();

//   //get input from form
//   newForm.addEventListener("submit", e => {
//     e.preventDefault();
//     searchQueryFood = e.target.querySelector("input").value;
//     fetchAPI();
//   });

//   //API call
//   async function fetchAPI() {
//     var baseURL = `https://api.edamam.com/search?q=${searchQueryFood}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=5&mealType=breakfast`;
//     var response = await fetch(baseURL);
//     var data = await response.json();
//     generateHTML(data.hits);
//   }

//   //display info from API call
//   function generateHTML(results) {
//     var generatedHTML = "";
//     results.map(result => {
//       generatedHTML += `
//         <div class="item">
//           <img src="${result.recipe.image}" alt="img">
//           <div class="flex-container">
//             <h1 class="title">${result.recipe.label}</h1>
//             <h2 class="title">${result.recipe.mealType}</h2>
//             <a class="view-btn" target="_blank" href="${result.recipe.url}">View Recipe</a>
//           </div>
//           <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
//           <p class="item-data">Diet label: ${
//             result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : "N/A"
//           }</p>
//         </div>
//       `;
//     });
//     resultFood.innerHTML = generatedHTML;

//     //----------------------------------------------
//     //swipe test
//     const recipeContainer = document.querySelector("#foodResult");
//     const numberOfRecipes = recipeContainer.children.length;

//     let i = 0,
//       x0 = null,
//       locked = false,
//       w;

//     function unify(e) {
//       return e.changedTouches ? e.changedTouches[0] : e;
//     }

//     function lock(e) {
//       x0 = unify(e).clientX;
//       recipeContainer.classList.toggle("smooth", !(locked === true));
//     }

//     function drag(e) {
//       e.preventDefault();

//       if (locked)
//         recipeContainer.style.setProperty("--tx", `${Math.round(unify(e).clientX - x0)}px`);
//     }

//     function move(e) {
//       if (locked) {
//         let dx = unify(e).clientX - x0,
//           s = Math.sign(dx),
//           f = +((s * dx) / w).toFixed(2);

//         if ((i > 0 || s < 0) && (i < numberOfRecipes - 1 || s > 0)) {
//           recipeContainer.style.setProperty("--i", (i -= s));
//           f = 1 - f;
//         }

//         recipeContainer.style.setProperty("--tx", "0px");
//         recipeContainer.style.setProperty("--f", f);
//         recipeContainer.classList.toggle("smooth", !(locked = false));
//         x0 = null;
//       }
//     }

//     function size() {
//       w = window.innerWidth;
//     }

//     size();
//     recipeContainer.style.setProperty("--n", numberOfRecipes);

//     addEventListener("resize", size, false);

//     recipeContainer.addEventListener("mousedown", lock, false);
//     recipeContainer.addEventListener("touchstart", lock, false);

//     recipeContainer.addEventListener("mousemove", drag, false);
//     recipeContainer.addEventListener("touchmove", drag, false);

//     recipeContainer.addEventListener("mouseup", move, false);
//     recipeContainer.addEventListener("touchend", move, false);
//     //---------------------------------------------------------
//   }
// }

// //brunch recipe search and display
// function brunchClick(event) {
//   event.preventDefault();

//   //creat new form for search
//   var newForm = document.createElement("form");
//   containerFood.prepend(newForm);
//   newForm.setAttribute("id", "foodForm");

//   var newInput = document.createElement("input");
//   newForm.appendChild(newInput);
//   newInput.setAttribute("type", "text");
//   newInput.setAttribute("placeholder", "input the ingredients you like");

//   var newBtn = document.createElement("button");
//   newForm.appendChild(newBtn);
//   newBtn.setAttribute("name", "search");
//   newBtn.textContent = "search";

//   //---------------------------------------------
//   //reload test
//   var newForm2 = document.createElement("form");
//   containerFood.appendChild(newForm2);
//   newForm2.setAttribute("id", "reset");

//   var newBtn2 = document.createElement("button");
//   newForm2.appendChild(newBtn2);
//   newBtn2.setAttribute("name", "re-submit");
//   newBtn2.textContent = "search again";

//   newForm2.addEventListener("submit", location.reload);
//   //------------------------------------------------------------

//   //prevent extra buttons clicked
//   btnList.remove();

//   //get input from form
//   newForm.addEventListener("submit", e => {
//     e.preventDefault();
//     searchQueryFood = e.target.querySelector("input").value;
//     fetchAPI();
//   });

//   //API call
//   async function fetchAPI() {
//     var baseURL = `https://api.edamam.com/search?q=${searchQueryFood}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=5&mealType=brunch`;
//     var response = await fetch(baseURL);
//     var data = await response.json();
//     generateHTML(data.hits);
//   }

//   //display info from API call
//   function generateHTML(results) {
//     var generatedHTML = "";
//     results.map(result => {
//       generatedHTML += `
//         <div class="item">
//           <img src="${result.recipe.image}" alt="img">
//           <div class="flex-container">
//             <h1 class="title">${result.recipe.label}</h1>
//             <h2 class="title">${result.recipe.mealType}</h2>
//             <a class="view-btn" target="_blank" href="${result.recipe.url}">View Recipe</a>
//           </div>
//           <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
//           <p class="item-data">Diet label: ${
//             result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : "N/A"
//           }</p>
//         </div>
//       `;
//     });
//     resultFood.innerHTML = generatedHTML;

//     //----------------------------------------------
//     //swipe test
//     const _C = document.querySelector("#foodResult"),
//       N = _C.children.length;

//     let i = 0,
//       x0 = null,
//       locked = false,
//       w;

//     function unify(e) {
//       return e.changedTouches ? e.changedTouches[0] : e;
//     }

//     function lock(e) {
//       x0 = unify(e).clientX;
//       _C.classList.toggle("smooth", !(locked = true));
//     }

//     function drag(e) {
//       e.preventDefault();

//       if (locked) _C.style.setProperty("--tx", `${Math.round(unify(e).clientX - x0)}px`);
//     }

//     function move(e) {
//       if (locked) {
//         let dx = unify(e).clientX - x0,
//           s = Math.sign(dx),
//           f = +((s * dx) / w).toFixed(2);

//         if ((i > 0 || s < 0) && (i < N - 1 || s > 0)) {
//           _C.style.setProperty("--i", (i -= s));
//           f = 1 - f;
//         }

//         _C.style.setProperty("--tx", "0px");
//         _C.style.setProperty("--f", f);
//         _C.classList.toggle("smooth", !(locked = false));
//         x0 = null;
//       }
//     }

//     function size() {
//       w = window.innerWidth;
//     }

//     size();
//     _C.style.setProperty("--n", N);

//     addEventListener("resize", size, false);

//     _C.addEventListener("mousedown", lock, false);
//     _C.addEventListener("touchstart", lock, false);

//     _C.addEventListener("mousemove", drag, false);
//     _C.addEventListener("touchmove", drag, false);

//     _C.addEventListener("mouseup", move, false);
//     _C.addEventListener("touchend", move, false);
//     //---------------------------------------------------------
//   }
// }

// //lunchDinner recipe search and display
// function lunchDinnerClick(event) {
//   event.preventDefault();

//   //creat new form for search
//   var newForm = document.createElement("form");
//   containerFood.prepend(newForm);
//   newForm.setAttribute("id", "foodForm");

//   var newInput = document.createElement("input");
//   newForm.appendChild(newInput);
//   newInput.setAttribute("type", "text");
//   newInput.setAttribute("placeholder", "input the ingredients you like");

//   var newBtn = document.createElement("button");
//   newForm.appendChild(newBtn);
//   newBtn.setAttribute("name", "search");
//   newBtn.textContent = "search";

//   //---------------------------------------------
//   //reload test
//   var newForm2 = document.createElement("form");
//   containerFood.appendChild(newForm2);
//   newForm2.setAttribute("id", "reset");

//   var newBtn2 = document.createElement("button");
//   newForm2.appendChild(newBtn2);
//   newBtn2.setAttribute("name", "re-submit");
//   newBtn2.textContent = "search again";

//   newForm2.addEventListener("submit", location.reload);
//   //------------------------------------------------------------

//   //prevent extra buttons clicked
//   btnList.remove();

//   //get input from form
//   newForm.addEventListener("submit", e => {
//     e.preventDefault();
//     searchQueryFood = e.target.querySelector("input").value;
//     fetchAPI();
//   });

//   //API call
//   async function fetchAPI() {
//     var baseURL = `https://api.edamam.com/search?q=${searchQueryFood}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=5&mealType=dinner`;
//     var response = await fetch(baseURL);
//     var data = await response.json();
//     generateHTML(data.hits);
//   }

//   //display info from API call
//   function generateHTML(results) {
//     var generatedHTML = "";
//     results.map(result => {
//       generatedHTML += `
//         <div class="item">
//           <img src="${result.recipe.image}" alt="img">
//           <div class="flex-container">
//             <h1 class="title">${result.recipe.label}</h1>
//             <h2 class="title">${result.recipe.mealType}</h2>
//             <a class="view-btn" target="_blank" href="${result.recipe.url}">View Recipe</a>
//           </div>
//           <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
//           <p class="item-data">Diet label: ${
//             result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : "N/A"
//           }</p>
//         </div>
//       `;
//     });
//     resultFood.innerHTML = generatedHTML;

//     //----------------------------------------------
//     //swipe test
//     const _C = document.querySelector("#foodResult"),
//       N = _C.children.length;

//     let i = 0,
//       x0 = null,
//       locked = false,
//       w;

//     function unify(e) {
//       return e.changedTouches ? e.changedTouches[0] : e;
//     }

//     function lock(e) {
//       x0 = unify(e).clientX;
//       _C.classList.toggle("smooth", !(locked = true));
//     }

//     function drag(e) {
//       e.preventDefault();

//       if (locked) _C.style.setProperty("--tx", `${Math.round(unify(e).clientX - x0)}px`);
//     }

//     function move(e) {
//       if (locked) {
//         let dx = unify(e).clientX - x0,
//           s = Math.sign(dx),
//           f = +((s * dx) / w).toFixed(2);

//         if ((i > 0 || s < 0) && (i < N - 1 || s > 0)) {
//           _C.style.setProperty("--i", (i -= s));
//           f = 1 - f;
//         }

//         _C.style.setProperty("--tx", "0px");
//         _C.style.setProperty("--f", f);
//         _C.classList.toggle("smooth", !(locked = false));
//         x0 = null;
//       }
//     }

//     function size() {
//       w = window.innerWidth;
//     }

//     size();
//     _C.style.setProperty("--n", N);

//     addEventListener("resize", size, false);

//     _C.addEventListener("mousedown", lock, false);
//     _C.addEventListener("touchstart", lock, false);

//     _C.addEventListener("mousemove", drag, false);
//     _C.addEventListener("touchmove", drag, false);

//     _C.addEventListener("mouseup", move, false);
//     _C.addEventListener("touchend", move, false);
//     //---------------------------------------------------------
//   }
// }

// //snack recipe search and display
// function snackClick(event) {
//   event.preventDefault();

//   //creat new form for search
//   var newForm = document.createElement("form");
//   containerFood.prepend(newForm);
//   newForm.setAttribute("id", "foodForm");

//   var newInput = document.createElement("input");
//   newForm.appendChild(newInput);
//   newInput.setAttribute("type", "text");
//   newInput.setAttribute("placeholder", "input the ingredients you like");

//   var newBtn = document.createElement("button");
//   newForm.appendChild(newBtn);
//   newBtn.setAttribute("name", "search");
//   newBtn.textContent = "search";

//   //---------------------------------------------
//   //reload test
//   var newForm2 = document.createElement("form");
//   containerFood.appendChild(newForm2);
//   newForm2.setAttribute("id", "reset");

//   var newBtn2 = document.createElement("button");
//   newForm2.appendChild(newBtn2);
//   newBtn2.setAttribute("name", "re-submit");
//   newBtn2.textContent = "search again";

//   newForm2.addEventListener("submit", location.reload);
//   //------------------------------------------------------------

//   //prevent extra buttons clicked
//   btnList.remove();

//   //get input from form
//   newForm.addEventListener("submit", e => {
//     e.preventDefault();
//     searchQueryFood = e.target.querySelector("input").value;
//     fetchAPI();
//   });

//   //API call
//   async function fetchAPI() {
//     var baseURL = `https://api.edamam.com/search?q=${searchQueryFood}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=5&mealType=snack`;
//     var response = await fetch(baseURL);
//     var data = await response.json();
//     generateHTML(data.hits);
//   }

//   //display info from API call
//   function generateHTML(results) {
//     var generatedHTML = "";
//     results.map(result => {
//       generatedHTML += `
//         <div class="item">
//           <img src="${result.recipe.image}" alt="img">
//           <div class="flex-container">
//             <h1 class="title">${result.recipe.label}</h1>
//             <h2 class="title">${result.recipe.mealType}</h2>
//             <a class="view-btn" target="_blank" href="${result.recipe.url}">View Recipe</a>
//           </div>
//           <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
//           <p class="item-data">Diet label: ${
//             result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : "N/A"
//           }</p>
//         </div>
//       `;
//     });
//     resultFood.innerHTML = generatedHTML;

//     //----------------------------------------------
//     //swipe test
//     const _C = document.querySelector("#foodResult"),
//       N = _C.children.length;

//     let i = 0,
//       x0 = null,
//       locked = false,
//       w;

//     function unify(e) {
//       return e.changedTouches ? e.changedTouches[0] : e;
//     }

//     function lock(e) {
//       x0 = unify(e).clientX;
//       _C.classList.toggle("smooth", !(locked = true));
//     }

//     function drag(e) {
//       e.preventDefault();

//       if (locked) _C.style.setProperty("--tx", `${Math.round(unify(e).clientX - x0)}px`);
//     }

//     function move(e) {
//       if (locked) {
//         let dx = unify(e).clientX - x0,
//           s = Math.sign(dx),
//           f = +((s * dx) / w).toFixed(2);

//         if ((i > 0 || s < 0) && (i < N - 1 || s > 0)) {
//           _C.style.setProperty("--i", (i -= s));
//           f = 1 - f;
//         }

//         _C.style.setProperty("--tx", "0px");
//         _C.style.setProperty("--f", f);
//         _C.classList.toggle("smooth", !(locked = false));
//         x0 = null;
//       }
//     }

//     function size() {
//       w = window.innerWidth;
//     }

//     size();
//     _C.style.setProperty("--n", N);

//     addEventListener("resize", size, false);

//     _C.addEventListener("mousedown", lock, false);
//     _C.addEventListener("touchstart", lock, false);

//     _C.addEventListener("mousemove", drag, false);
//     _C.addEventListener("touchmove", drag, false);

//     _C.addEventListener("mouseup", move, false);
//     _C.addEventListener("touchend", move, false);
//     //---------------------------------------------------------
//   }
// }

// //teatime recipe search and display
// function teatimeClick(event) {
//   event.preventDefault();

//   //creat new form for search
//   var newForm = document.createElement("form");
//   containerFood.prepend(newForm);
//   newForm.setAttribute("id", "foodForm");

//   var newInput = document.createElement("input");
//   newForm.appendChild(newInput);
//   newInput.setAttribute("type", "text");
//   newInput.setAttribute("placeholder", "input the ingredients you like");

//   var newBtn = document.createElement("button");
//   newForm.appendChild(newBtn);
//   newBtn.setAttribute("name", "search");
//   newBtn.textContent = "search";

//   //---------------------------------------------
//   //reload test
//   var newForm2 = document.createElement("form");
//   containerFood.appendChild(newForm2);
//   newForm2.setAttribute("id", "reset");

//   var newBtn2 = document.createElement("button");
//   newForm2.appendChild(newBtn2);
//   newBtn2.setAttribute("name", "re-submit");
//   newBtn2.textContent = "search again";

//   newForm2.addEventListener("submit", location.reload);
//   //------------------------------------------------------------

//   //prevent extra buttons clicked
//   btnList.remove();

//   //get input from form
//   newForm.addEventListener("submit", e => {
//     e.preventDefault();
//     searchQueryFood = e.target.querySelector("input").value;
//     fetchAPI();
//   });

//   //API call
//   async function fetchAPI() {
//     var baseURL = `https://api.edamam.com/search?q=${searchQueryFood}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=5&mealType=teatime`;
//     var response = await fetch(baseURL);
//     var data = await response.json();
//     generateHTML(data.hits);
//   }

//   //display info from API call
//   function generateHTML(results) {
//     var generatedHTML = "";
//     results.map(result => {
//       generatedHTML += `
//         <div class="item">
//           <img src="${result.recipe.image}" alt="img">
//           <div class="flex-container">
//             <h1 class="title">${result.recipe.label}</h1>
//             <h2 class="title">${result.recipe.mealType}</h2>
//             <a class="view-btn" target="_blank" href="${result.recipe.url}">View Recipe</a>
//           </div>
//           <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
//           <p class="item-data">Diet label: ${
//             result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : "N/A"
//           }</p>
//         </div>
//       `;
//     });
//     resultFood.innerHTML = generatedHTML;

//     //----------------------------------------------
//     //swipe test
//     const _C = document.querySelector("#foodResult"),
//       N = _C.children.length;

//     let i = 0,
//       x0 = null,
//       locked = false,
//       w;

//     function unify(e) {
//       return e.changedTouches ? e.changedTouches[0] : e;
//     }

//     function lock(e) {
//       x0 = unify(e).clientX;
//       _C.classList.toggle("smooth", !(locked = true));
//     }

//     function drag(e) {
//       e.preventDefault();

//       if (locked) _C.style.setProperty("--tx", `${Math.round(unify(e).clientX - x0)}px`);
//     }

//     function move(e) {
//       if (locked) {
//         let dx = unify(e).clientX - x0,
//           s = Math.sign(dx),
//           f = +((s * dx) / w).toFixed(2);

//         if ((i > 0 || s < 0) && (i < N - 1 || s > 0)) {
//           _C.style.setProperty("--i", (i -= s));
//           f = 1 - f;
//         }

//         _C.style.setProperty("--tx", "0px");
//         _C.style.setProperty("--f", f);
//         _C.classList.toggle("smooth", !(locked = false));
//         x0 = null;
//       }
//     }

//     function size() {
//       w = window.innerWidth;
//     }

//     size();
//     _C.style.setProperty("--n", N);

//     addEventListener("resize", size, false);

//     _C.addEventListener("mousedown", lock, false);
//     _C.addEventListener("touchstart", lock, false);

//     _C.addEventListener("mousemove", drag, false);
//     _C.addEventListener("touchmove", drag, false);

//     _C.addEventListener("mouseup", move, false);
//     _C.addEventListener("touchend", move, false);
//     //---------------------------------------------------------
//   }
// }

// function renderMealTypeButtons() {
//   Object.values(RecipeQuery.mealTypes).forEach(mealType => {
//     const button = document.createElement("button");
//     button.dataset.value = mealType;
//     button.textContent = mealType;
//     mealTypes.appendChild(button);
//   });
// }

// function renderDishTypeButtons() {
//   Object.values(RecipeQuery.dishTypes).forEach(dishType => {
//     const button = document.createElement("button");
//     button.dataset.value = dishType;
//     button.textContent = dishType;
//     dishTypes.appendChild(button);
//   });
// }

// function renderCuisineTypeButtons() {
//   Object.values(RecipeQuery.cuisineTypes).forEach(cuisineType => {
//     const button = document.createElement("button");
//     button.dataset.value = cuisineType;
//     button.textContent = cuisineType;
//     cuisineTypes.appendChild(button);
//   });
// }

// function init() {
//   query = new RecipeQuery();
//   renderMealTypeButtons();
//   renderDishTypeButtons();
//   renderCuisineTypeButtons();
// }

// init();
