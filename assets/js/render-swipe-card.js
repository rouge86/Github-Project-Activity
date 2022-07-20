//----------------------display test-----------------------------------
//var num = Math.floor(Math.random() * recipes.length);
//console.log(num)
//document.getElementById("imgTest").src= recipes[num].image;
//document.getElementById("testH2").textContent= recipes[num].label;
//----------------------display test-----------------------------------

//---------------------------------------------------------------------
// function renderCard () {
//     var cards = document.getElementById("cards");
//     cards.appendChild(elem);
// }
//----------------------------------------------------------------------


//-------------------- test 1 ------------------------------------------
function recipeCard (recipe) {
    
    var elem = document.createElement('div');
    // elem.id = 'smallCard';
    elem.setAttribute("class", "flex absolute flex-col border-gray-600 border-2 rounded-3xl w-72 h-5/6 overflow-hidden shadow-2xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2");
    
    
    var imgDsp = document.createElement('div');
    //imgDsp.id = 'imgDiv';
    imgDsp.setAttribute("class","flex-none h-2/3");
    elem.appendChild(imgDsp);
    
    var mealImg = document.createElement('img');
    mealImg.id = 'mealImgDsp';
    mealImg.setAttribute("class","h-full w-full object-cover select-none pointer-events-none");
    mealImg.src = recipe.images.REGULAR.url;
    mealImg.setAttribute("alt","placeholder");
    imgDsp.appendChild(mealImg);
    
    var titleDiv = document.createElement('div');
    titleDiv.id = 'titleD';
    titleDiv.setAttribute("class","h-full w-full object-cover select-none pointer-events-none");
    elem.appendChild(titleDiv);
    
    var titleH2 = document.createElement('h2');
    titleH2.id = "tH2";
    titleH2.setAttribute("class","overflow-hidden overflow-ellipsis whitespace-nowrap");
    titleH2.textContent = recipe.label;
    titleDiv.appendChild(titleH2);
    
    var btnDiv = document.createElement('div');
    btnDiv.id = 'btnD';
    btnDiv.setAttribute("class","flex flex-none justify-between m-3");
    elem.appendChild(btnDiv);
    
    var btnYes = document.createElement('button');
    btnYes.setAttribute("class","w-12 h-12 rounded-3xl border-solid border-2 border-rose-500 hover:bg-rose-400 animate-bounc");
    btnYes.textContent = '✘';
    btnDiv.appendChild(btnYes);
    
    var btnNo = document.createElement('button');
    btnNo.setAttribute("class","w-12 h-12 rounded-3xl border-solid border-2 border-lime-500 hover:bg-lime-400 animate-bounc");
    btnNo.textContent = '✔';
    btnDiv.appendChild(btnNo);

    return elem;
    
  }

//-------------------- test 1 ------------------------------------------

//--------------------test 2 -------------------------------------------
// function recipeCard () {

//   var cards = document.getElementById("cards");

//   const html = `
//   <div
//   class="flex absolute flex-col border-gray-600 border-2 rounded-3xl w-72 h-5/6 overflow-hidden shadow-2xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
// >
//   <div class="flex-none h-2/3">
    
//     <img
//       class="h-full w-full object-cover select-none pointer-events-none"
//       src="${recipes[0].images.REGULAR.url}"
//       alt="placeholder"
//     />
  
//   </div>
//   <div class="flex-1 h-1/6 text-xl font-sans p-3 overflow-hidden">
//     <h2 class="overflow-hidden overflow-ellipsis whitespace-nowrap">
//     ${recipes[0].label}
//     </h2>
//   </div>
//   <div class="flex flex-none justify-between m-3">
//     <button
//       class="w-12 h-12 rounded-3xl border-solid border-2 border-rose-500 hover:bg-rose-400 animate-bounc"
//     >
//       ✘
//     </button>
//     <button
//       class="w-12 h-12 rounded-3xl border-solid border-2 border-lime-500 hover:bg-lime-400 animate-bounc"
//     >
//       ✔
//     </button>
//   </div>
// </div>
// `
// cards.innerHTML = html.trim();
// }

//--------------------test 2 -------------------------------------------

export default recipeCard;