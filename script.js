//var created to access HTML
var containerFood = document.querySelector("#foodContainer");

var btnList = document.querySelector("#btnList");

var breakfast = document.querySelector("#breakfast");
var brunch = document.querySelector("#brunch");
var lunchDinner = document.querySelector("#l-d");
var snack = document.querySelector("#snack");
var teatime = document.querySelector("#teatime");

var resultFood= document.querySelector("#foodResult");

//API dets for EDAMAM
var APP_ID = "f3b8ca6c";
var APP_key = "ea8fbe49c6485de9c243b4e35249a1b7";

var searchQueryFood = "";

//make the button clickable
breakfast.addEventListener("click", breakfastClick);
brunch.addEventListener("click", brunchClick);
lunchDinner.addEventListener("click", lunchDinnerClick);
snack.addEventListener("click", snackClick);
teatime.addEventListener("click", teatimeClick);

//this is not a effective way to load recipe in each mealType
//was trying to do if button === click, url = newMealTypeLink but didnt work
//if success, only need one big function for all mealType 
//cause once we detect which button wasclicked, we aisgn a new link to api call
//see if you could make it work

//also need input validation for ingredients

//breakfast recipe search and display 
function breakfastClick(event) {
  event.preventDefault();

  //creat new form for search
  var newForm = document.createElement("form");
  containerFood.prepend(newForm);
  newForm.setAttribute("id","foodForm");

  var newInput = document.createElement("input");
  newForm.appendChild(newInput);
  newInput.setAttribute("type","text");
  newInput.setAttribute("placeholder","input the ingredients you like");

  var newBtn = document.createElement("button");
  newForm.appendChild(newBtn);
  newBtn.setAttribute("name","search");
  newBtn.textContent = "search";

  //---------------------------------------------
  //reload test
  var newForm2 = document.createElement("form");
  containerFood.appendChild(newForm2);
  newForm2.setAttribute("id","reset");

  var newBtn2 = document.createElement("button");
  newForm2.appendChild(newBtn2);
  newBtn2.setAttribute("name","re-submit");
  newBtn2.textContent = "search again";  

  newForm2.addEventListener("submit", location.reload);
  //------------------------------------------------------------
  
  //prevent extra buttons clicked
  btnList.remove();

  //get input from form
  newForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQueryFood = e.target.querySelector("input").value;
    fetchAPI();
  });

  //API call
  async function fetchAPI() {
    var baseURL = `https://api.edamam.com/search?q=${searchQueryFood}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=5&mealType=breakfast`;
    var response = await fetch(baseURL);
    var data = await response.json();
    generateHTML(data.hits);
  }
  
  //display info from API call
  function generateHTML(results) {
    var generatedHTML = "";
    results.map((result) => {
      generatedHTML += `
        <div class="item">
          <img src="${result.recipe.image}" alt="img">
          <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <h2 class="title">${result.recipe.mealType}</h2>
            <a class="view-btn" target="_blank" href="${
              result.recipe.url
            }">View Recipe</a>
          </div>
          <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
          <p class="item-data">Diet label: ${
            result.recipe.dietLabels.length > 0
              ? result.recipe.dietLabels
              : "N/A"
          }</p>
        </div>
      `;
    });
    resultFood.innerHTML = generatedHTML;
  

    //----------------------------------------------
    //swipe test
    const _C = document.querySelector("#foodResult"), 
    N = _C.children.length;

    let i = 0, x0 = null, locked = false, w;

    function unify(e) {	return e.changedTouches ? e.changedTouches[0] : e };

    function lock(e) {
      x0 = unify(e).clientX;
      _C.classList.toggle('smooth', !(locked = true))
    };

    function drag(e) {
      e.preventDefault();

      if(locked) 		
        _C.style.setProperty('--tx', `${Math.round(unify(e).clientX - x0)}px`)
    };

    function move(e) {
      if(locked) {
      let dx = unify(e).clientX - x0, s = Math.sign(dx), 
      f = +(s*dx/w).toFixed(2);

      if((i > 0 || s < 0) && (i < N - 1 || s > 0)) {
        _C.style.setProperty('--i', i -= s);
        f = 1 - f
      }
  
      _C.style.setProperty('--tx', '0px');
      _C.style.setProperty('--f', f);
      _C.classList.toggle('smooth', !(locked = false));
      x0 = null
      }
    };

    function size() { w = window.innerWidth };

    size();
    _C.style.setProperty('--n', N);

    addEventListener('resize', size, false);

    _C.addEventListener('mousedown', lock, false);
    _C.addEventListener('touchstart', lock, false);

    _C.addEventListener('mousemove', drag, false);
    _C.addEventListener('touchmove', drag, false);

    _C.addEventListener('mouseup', move, false);
    _C.addEventListener('touchend', move, false);
    //---------------------------------------------------------
  }
}

//brunch recipe search and display 
function brunchClick(event) {
  event.preventDefault();

  //creat new form for search
  var newForm = document.createElement("form");
  containerFood.prepend(newForm);
  newForm.setAttribute("id","foodForm");

  var newInput = document.createElement("input");
  newForm.appendChild(newInput);
  newInput.setAttribute("type","text");
  newInput.setAttribute("placeholder","input the ingredients you like");

  var newBtn = document.createElement("button");
  newForm.appendChild(newBtn);
  newBtn.setAttribute("name","search");
  newBtn.textContent = "search";

  //---------------------------------------------
  //reload test
  var newForm2 = document.createElement("form");
  containerFood.appendChild(newForm2);
  newForm2.setAttribute("id","reset");

  var newBtn2 = document.createElement("button");
  newForm2.appendChild(newBtn2);
  newBtn2.setAttribute("name","re-submit");
  newBtn2.textContent = "search again";  

  newForm2.addEventListener("submit", location.reload);
  //------------------------------------------------------------
  
  //prevent extra buttons clicked
  btnList.remove();

  //get input from form
  newForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQueryFood = e.target.querySelector("input").value;
    fetchAPI();
  });

  //API call
  async function fetchAPI() {
    var baseURL = `https://api.edamam.com/search?q=${searchQueryFood}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=5&mealType=brunch`;
    var response = await fetch(baseURL);
    var data = await response.json();
    generateHTML(data.hits);
  }
  
  //display info from API call
  function generateHTML(results) {
    var generatedHTML = "";
    results.map((result) => {
      generatedHTML += `
        <div class="item">
          <img src="${result.recipe.image}" alt="img">
          <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <h2 class="title">${result.recipe.mealType}</h2>
            <a class="view-btn" target="_blank" href="${
              result.recipe.url
            }">View Recipe</a>
          </div>
          <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
          <p class="item-data">Diet label: ${
            result.recipe.dietLabels.length > 0
              ? result.recipe.dietLabels
              : "N/A"
          }</p>
        </div>
      `;
    });
    resultFood.innerHTML = generatedHTML;
  

    //----------------------------------------------
    //swipe test
    const _C = document.querySelector("#foodResult"), 
    N = _C.children.length;

    let i = 0, x0 = null, locked = false, w;

    function unify(e) {	return e.changedTouches ? e.changedTouches[0] : e };

    function lock(e) {
      x0 = unify(e).clientX;
      _C.classList.toggle('smooth', !(locked = true))
    };

    function drag(e) {
      e.preventDefault();

      if(locked) 		
        _C.style.setProperty('--tx', `${Math.round(unify(e).clientX - x0)}px`)
    };

    function move(e) {
      if(locked) {
      let dx = unify(e).clientX - x0, s = Math.sign(dx), 
      f = +(s*dx/w).toFixed(2);

      if((i > 0 || s < 0) && (i < N - 1 || s > 0)) {
        _C.style.setProperty('--i', i -= s);
        f = 1 - f
      }
  
      _C.style.setProperty('--tx', '0px');
      _C.style.setProperty('--f', f);
      _C.classList.toggle('smooth', !(locked = false));
      x0 = null
      }
    };

    function size() { w = window.innerWidth };

    size();
    _C.style.setProperty('--n', N);

    addEventListener('resize', size, false);

    _C.addEventListener('mousedown', lock, false);
    _C.addEventListener('touchstart', lock, false);

    _C.addEventListener('mousemove', drag, false);
    _C.addEventListener('touchmove', drag, false);

    _C.addEventListener('mouseup', move, false);
    _C.addEventListener('touchend', move, false);
    //---------------------------------------------------------
  }
}

//lunchDinner recipe search and display 
function lunchDinnerClick(event) {
  event.preventDefault();

  //creat new form for search
  var newForm = document.createElement("form");
  containerFood.prepend(newForm);
  newForm.setAttribute("id","foodForm");

  var newInput = document.createElement("input");
  newForm.appendChild(newInput);
  newInput.setAttribute("type","text");
  newInput.setAttribute("placeholder","input the ingredients you like");

  var newBtn = document.createElement("button");
  newForm.appendChild(newBtn);
  newBtn.setAttribute("name","search");
  newBtn.textContent = "search";

  //---------------------------------------------
  //reload test
  var newForm2 = document.createElement("form");
  containerFood.appendChild(newForm2);
  newForm2.setAttribute("id","reset");

  var newBtn2 = document.createElement("button");
  newForm2.appendChild(newBtn2);
  newBtn2.setAttribute("name","re-submit");
  newBtn2.textContent = "search again";  

  newForm2.addEventListener("submit", location.reload);
  //------------------------------------------------------------
  
  //prevent extra buttons clicked
  btnList.remove();

  //get input from form
  newForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQueryFood = e.target.querySelector("input").value;
    fetchAPI();
  });

  //API call
  async function fetchAPI() {
    var baseURL = `https://api.edamam.com/search?q=${searchQueryFood}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=5&mealType=dinner`;
    var response = await fetch(baseURL);
    var data = await response.json();
    generateHTML(data.hits);
  }
  
  //display info from API call
  function generateHTML(results) {
    var generatedHTML = "";
    results.map((result) => {
      generatedHTML += `
        <div class="item">
          <img src="${result.recipe.image}" alt="img">
          <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <h2 class="title">${result.recipe.mealType}</h2>
            <a class="view-btn" target="_blank" href="${
              result.recipe.url
            }">View Recipe</a>
          </div>
          <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
          <p class="item-data">Diet label: ${
            result.recipe.dietLabels.length > 0
              ? result.recipe.dietLabels
              : "N/A"
          }</p>
        </div>
      `;
    });
    resultFood.innerHTML = generatedHTML;
  

    //----------------------------------------------
    //swipe test
    const _C = document.querySelector("#foodResult"), 
    N = _C.children.length;

    let i = 0, x0 = null, locked = false, w;

    function unify(e) {	return e.changedTouches ? e.changedTouches[0] : e };

    function lock(e) {
      x0 = unify(e).clientX;
      _C.classList.toggle('smooth', !(locked = true))
    };

    function drag(e) {
      e.preventDefault();

      if(locked) 		
        _C.style.setProperty('--tx', `${Math.round(unify(e).clientX - x0)}px`)
    };

    function move(e) {
      if(locked) {
      let dx = unify(e).clientX - x0, s = Math.sign(dx), 
      f = +(s*dx/w).toFixed(2);

      if((i > 0 || s < 0) && (i < N - 1 || s > 0)) {
        _C.style.setProperty('--i', i -= s);
        f = 1 - f
      }
  
      _C.style.setProperty('--tx', '0px');
      _C.style.setProperty('--f', f);
      _C.classList.toggle('smooth', !(locked = false));
      x0 = null
      }
    };

    function size() { w = window.innerWidth };

    size();
    _C.style.setProperty('--n', N);

    addEventListener('resize', size, false);

    _C.addEventListener('mousedown', lock, false);
    _C.addEventListener('touchstart', lock, false);

    _C.addEventListener('mousemove', drag, false);
    _C.addEventListener('touchmove', drag, false);

    _C.addEventListener('mouseup', move, false);
    _C.addEventListener('touchend', move, false);
    //---------------------------------------------------------
  }
}

//snack recipe search and display 
function snackClick(event) {
  event.preventDefault();

  //creat new form for search
  var newForm = document.createElement("form");
  containerFood.prepend(newForm);
  newForm.setAttribute("id","foodForm");

  var newInput = document.createElement("input");
  newForm.appendChild(newInput);
  newInput.setAttribute("type","text");
  newInput.setAttribute("placeholder","input the ingredients you like");

  var newBtn = document.createElement("button");
  newForm.appendChild(newBtn);
  newBtn.setAttribute("name","search");
  newBtn.textContent = "search";

  //---------------------------------------------
  //reload test
  var newForm2 = document.createElement("form");
  containerFood.appendChild(newForm2);
  newForm2.setAttribute("id","reset");

  var newBtn2 = document.createElement("button");
  newForm2.appendChild(newBtn2);
  newBtn2.setAttribute("name","re-submit");
  newBtn2.textContent = "search again";  

  newForm2.addEventListener("submit", location.reload);
  //------------------------------------------------------------
  
  //prevent extra buttons clicked
  btnList.remove();

  //get input from form
  newForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQueryFood = e.target.querySelector("input").value;
    fetchAPI();
  });

  //API call
  async function fetchAPI() {
    var baseURL = `https://api.edamam.com/search?q=${searchQueryFood}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=5&mealType=snack`;
    var response = await fetch(baseURL);
    var data = await response.json();
    generateHTML(data.hits);
  }
  
  //display info from API call
  function generateHTML(results) {
    var generatedHTML = "";
    results.map((result) => {
      generatedHTML += `
        <div class="item">
          <img src="${result.recipe.image}" alt="img">
          <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <h2 class="title">${result.recipe.mealType}</h2>
            <a class="view-btn" target="_blank" href="${
              result.recipe.url
            }">View Recipe</a>
          </div>
          <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
          <p class="item-data">Diet label: ${
            result.recipe.dietLabels.length > 0
              ? result.recipe.dietLabels
              : "N/A"
          }</p>
        </div>
      `;
    });
    resultFood.innerHTML = generatedHTML;
  

    //----------------------------------------------
    //swipe test
    const _C = document.querySelector("#foodResult"), 
    N = _C.children.length;

    let i = 0, x0 = null, locked = false, w;

    function unify(e) {	return e.changedTouches ? e.changedTouches[0] : e };

    function lock(e) {
      x0 = unify(e).clientX;
      _C.classList.toggle('smooth', !(locked = true))
    };

    function drag(e) {
      e.preventDefault();

      if(locked) 		
        _C.style.setProperty('--tx', `${Math.round(unify(e).clientX - x0)}px`)
    };

    function move(e) {
      if(locked) {
      let dx = unify(e).clientX - x0, s = Math.sign(dx), 
      f = +(s*dx/w).toFixed(2);

      if((i > 0 || s < 0) && (i < N - 1 || s > 0)) {
        _C.style.setProperty('--i', i -= s);
        f = 1 - f
      }
  
      _C.style.setProperty('--tx', '0px');
      _C.style.setProperty('--f', f);
      _C.classList.toggle('smooth', !(locked = false));
      x0 = null
      }
    };

    function size() { w = window.innerWidth };

    size();
    _C.style.setProperty('--n', N);

    addEventListener('resize', size, false);

    _C.addEventListener('mousedown', lock, false);
    _C.addEventListener('touchstart', lock, false);

    _C.addEventListener('mousemove', drag, false);
    _C.addEventListener('touchmove', drag, false);

    _C.addEventListener('mouseup', move, false);
    _C.addEventListener('touchend', move, false);
    //---------------------------------------------------------
  }
}

//teatime recipe search and display 
function teatimeClick(event) {
  event.preventDefault();

  //creat new form for search
  var newForm = document.createElement("form");
  containerFood.prepend(newForm);
  newForm.setAttribute("id","foodForm");

  var newInput = document.createElement("input");
  newForm.appendChild(newInput);
  newInput.setAttribute("type","text");
  newInput.setAttribute("placeholder","input the ingredients you like");

  var newBtn = document.createElement("button");
  newForm.appendChild(newBtn);
  newBtn.setAttribute("name","search");
  newBtn.textContent = "search";

  //---------------------------------------------
  //reload test
  var newForm2 = document.createElement("form");
  containerFood.appendChild(newForm2);
  newForm2.setAttribute("id","reset");

  var newBtn2 = document.createElement("button");
  newForm2.appendChild(newBtn2);
  newBtn2.setAttribute("name","re-submit");
  newBtn2.textContent = "search again";  

  newForm2.addEventListener("submit", location.reload);
  //------------------------------------------------------------
  
  //prevent extra buttons clicked
  btnList.remove();

  //get input from form
  newForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQueryFood = e.target.querySelector("input").value;
    fetchAPI();
  });

  //API call
  async function fetchAPI() {
    var baseURL = `https://api.edamam.com/search?q=${searchQueryFood}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=5&mealType=teatime`;
    var response = await fetch(baseURL);
    var data = await response.json();
    generateHTML(data.hits);
  }
  
  //display info from API call
  function generateHTML(results) {
    var generatedHTML = "";
    results.map((result) => {
      generatedHTML += `
        <div class="item">
          <img src="${result.recipe.image}" alt="img">
          <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <h2 class="title">${result.recipe.mealType}</h2>
            <a class="view-btn" target="_blank" href="${
              result.recipe.url
            }">View Recipe</a>
          </div>
          <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
          <p class="item-data">Diet label: ${
            result.recipe.dietLabels.length > 0
              ? result.recipe.dietLabels
              : "N/A"
          }</p>
        </div>
      `;
    });
    resultFood.innerHTML = generatedHTML;
  

    //----------------------------------------------
    //swipe test
    const _C = document.querySelector("#foodResult"), 
    N = _C.children.length;

    let i = 0, x0 = null, locked = false, w;

    function unify(e) {	return e.changedTouches ? e.changedTouches[0] : e };

    function lock(e) {
      x0 = unify(e).clientX;
      _C.classList.toggle('smooth', !(locked = true))
    };

    function drag(e) {
      e.preventDefault();

      if(locked) 		
        _C.style.setProperty('--tx', `${Math.round(unify(e).clientX - x0)}px`)
    };

    function move(e) {
      if(locked) {
      let dx = unify(e).clientX - x0, s = Math.sign(dx), 
      f = +(s*dx/w).toFixed(2);

      if((i > 0 || s < 0) && (i < N - 1 || s > 0)) {
        _C.style.setProperty('--i', i -= s);
        f = 1 - f
      }
  
      _C.style.setProperty('--tx', '0px');
      _C.style.setProperty('--f', f);
      _C.classList.toggle('smooth', !(locked = false));
      x0 = null
      }
    };

    function size() { w = window.innerWidth };

    size();
    _C.style.setProperty('--n', N);

    addEventListener('resize', size, false);

    _C.addEventListener('mousedown', lock, false);
    _C.addEventListener('touchstart', lock, false);

    _C.addEventListener('mousemove', drag, false);
    _C.addEventListener('touchmove', drag, false);

    _C.addEventListener('mouseup', move, false);
    _C.addEventListener('touchend', move, false);
    //---------------------------------------------------------
  }
}