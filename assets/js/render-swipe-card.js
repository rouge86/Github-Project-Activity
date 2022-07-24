function recipeCard(recipe) {
  var card = document.createElement("article");
  card.dataset.id = recipe.uri;
  card.setAttribute(
    "class",
    "absolute grid grid-cols-1 border-gray-600 border-2 rounded-3xl overflow-hidden shadow-2xl inset-0 bg-white recipeCard"
  );
  card.style.transformOrigin = "center";
  card.style.transform = "translateZ(-50px)";

  var imgDsp = document.createElement("div");
  imgDsp.setAttribute("class", "flex-1");

  var mealImg = document.createElement("img");
  mealImg.setAttribute(
    "class",
    "h-full w-full object-cover select-none pointer-events-none"
  );
  mealImg.src = recipe.images.REGULAR.url;
  mealImg.setAttribute("alt", "placeholder");
  imgDsp.appendChild(mealImg);

  var titleDiv = document.createElement("div");
  titleDiv.setAttribute(
    "class",
    "h-fit w-full flex-none object-cover select-none pointer-events-none"
  );

  var titleH2 = document.createElement("h2");
  titleH2.setAttribute(
    "class",
    "text-xl p-2 overflow-hidden overflow-ellipsis whitespace-nowrap text-white text-center text-2xl font-bold"
  );
  titleH2.textContent = recipe.label;
  titleDiv.appendChild(titleH2);

  var btnDiv = document.createElement("div");
  btnDiv.id = "btnD";
  btnDiv.setAttribute(
    "class",
    "flex flex-none h-fit justify-between m-3 mt-auto z-1"
  );

  var btnNo = document.createElement("button");
  btnNo.setAttribute(
    "class",
    "w-12 h-12 rounded-3xl border-solid border-2 border-rose-500 hover:bg-rose-500 hover:bg-opacity-40 animate-bounc reject text-white transition-colors text-l"
  );
  btnNo.textContent = "✘";
  btnDiv.appendChild(btnNo);

  var btnYes = document.createElement("button");
  btnYes.setAttribute(
    "class",
    "w-12 h-12 rounded-3xl border-solid border-2 border-lime-500 hover:bg-lime-400 hover:bg-opacity-40 animate-bounc accept text-white font-bold text-xl"
  );
  btnYes.textContent = "✓";
  btnDiv.appendChild(btnYes);

  var controlsDiv = document.createElement("div");
  var gradientDiv = document.createElement("div");
  gradientDiv.setAttribute(
    "class",
    "absolute bottom-0 h-1/2 w-full border-blue-500 cardGradient"
  );
  controlsDiv.setAttribute("class", "absolute bottom-0 w-full cardControls");

  controlsDiv.appendChild(titleDiv);
  controlsDiv.appendChild(btnDiv);
  gradientDiv.appendChild(controlsDiv);

  card.appendChild(imgDsp);
  card.appendChild(gradientDiv);

  return card;
}

export default recipeCard;
