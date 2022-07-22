function recipeCard(recipe) {
  var elem = document.createElement("div");
  elem.dataset.id = recipe.uri;
  elem.setAttribute(
    "class",
    "flex absolute flex-col border-gray-600 border-2 rounded-3xl overflow-hidden shadow-2xl inset-0 bg-white recipeCard"
  );
  elem.style.transformOrigin = "center";
  elem.style.transform = "translateZ(-50px)";

  var imgDsp = document.createElement("div");
  imgDsp.setAttribute("class", "flex-none h-2/3");
  elem.appendChild(imgDsp);

  var mealImg = document.createElement("img");
  mealImg.setAttribute("class", "h-full w-full object-cover select-none pointer-events-none");
  mealImg.src = recipe.images.REGULAR.url;
  mealImg.setAttribute("alt", "placeholder");
  imgDsp.appendChild(mealImg);

  var titleDiv = document.createElement("div");
  titleDiv.setAttribute("class", "h-full w-full object-cover select-none pointer-events-none");
  elem.appendChild(titleDiv);

  var titleH2 = document.createElement("h2");
  titleH2.setAttribute(
    "class",
    "text-xl p-2 overflow-hidden overflow-ellipsis whitespace-nowrap"
  );
  titleH2.textContent = recipe.label;
  titleDiv.appendChild(titleH2);

  var btnDiv = document.createElement("div");
  btnDiv.id = "btnD";
  btnDiv.setAttribute("class", "flex flex-none justify-between m-3");
  elem.appendChild(btnDiv);

  var btnNo = document.createElement("button");
  btnNo.setAttribute(
    "class",
    "w-12 h-12 rounded-3xl border-solid border-2 border-rose-500 hover:bg-rose-400 animate-bounc reject"
  );
  btnNo.textContent = "✘";
  btnDiv.appendChild(btnNo);

  var btnYes = document.createElement("button");
  btnYes.setAttribute(
    "class",
    "w-12 h-12 rounded-3xl border-solid border-2 border-lime-500 hover:bg-lime-400 animate-bounc accept"
  );
  btnYes.textContent = "✔";
  btnDiv.appendChild(btnYes);

  return elem;
}

export default recipeCard;
