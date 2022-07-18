class RecipeQuery {
  #apiId = "bcfab256";
  #apiKey = "f61e0b4ed3f4b5d198cb292a5bf83160";
  #apiOrigin = "https://api.edamam.com";
  #ingredients;
  #health;
  #mealTypes;
  #cuisineTypes;
  #dishTypes;
  constructor() {
    this.#health = [];
    this.#ingredients = [];
    this.#mealTypes = [];
    this.#cuisineTypes = [];
    this.#dishTypes = [];
  }

  static mealTypes = {
    breakfast: "breakfast",
    brunch: "brunch",
    lunch: "lunch",
    dinner: "dinner",
    snack: "snack",
    teatime: "teatime",
  };
  static cuisineTypes = {
    american: "american",
    asian: "asian",
    british: "british",
    caribbean: "caribbean",
    centralEurope: "central europe",
    chinese: "chinese",
    easternEurpoe: "eastern europe",
    french: "french",
    greek: "greek",
    indian: "indian",
    italian: "italian",
    japanese: "japanese",
    korean: "korean",
    kosher: "kosher",
    mediterranean: "mediterranean",
    mexican: "mexican",
    middleEastern: "middle eastern",
    nordic: "nordic",
    southAmerican: "south american",
    southEastAsian: "south east asian",
    world: "world",
  };
  static dishTypes = {
    // alcoholCocktail: "alcohol cocktail",
    // cookies: "biscuits and cookies",
    // bread: "bread",
    // cereals: "cereals",
    // condimentsAndSauces: "condiments and sauces",
    desserts: "desserts",
    // drinks: "drinks",
    // egg: "egg",
    // iceCreamAndCustard: "ice cream and custard",
    mainCourse: "main course",
    // pancake: "pancake",
    // pasta: "pasta",
    // pastry: "pastry",
    // piesAndTarts: "pies and tarts",
    // pizza: "pizza",
    // preps: "preps",
    // preserve: "preserve",
    // salad: "salad",
    // sandwihces: "sandwiches",
    // seafood: "seafood",
    // sideDish: "side dish",
    // soup: "soup",
    // specialOccasions: "special occasions",
    // starter: "starter",
    // sweets: "sweets",
  };
  static healthLabels = {
    alcoholFree: "alcohol-free",
    celeryFree: "celery-free",
    crustaceanFree: "crustacean-free",
    dairyFree: "dairy-free",
    DASH: "DASH",
    eggFree: "egg-free",
    fishFree: "fish-free",
    FODMAPFree: "fodmap-free",
    glutenFree: "gluten-free",
    immunoSupportive: "immuno-supportive",
    ketoFriendly: "keto-friendly",
    kidneyFriendly: "kidney-friendly",
    kosher: "kosher",
    lowPotassium: "low-potassium",
    lowSugar: "low-sugar",
    lupineFree: "lupine-free",
    mediterranean: "Mediterranean",
    molluskFree: "mollusk-free",
    mustardFree: "mustard-free",
    noOilAdded: "No-oil-added",
    paleo: "paleo",
    peanutFree: "peanut-free",
    pescatarian: "pescatarian",
  };

  async getRecipes() {
    try {
      const data = await this.#executeQuery();
      const recipes = data.hits.map(hit => hit.recipe);
      return recipes;
    } catch (error) {
      console.warn(error);
      return null;
    }
  }

  async #executeQuery() {
    const url = this.#buildUrl();
    const request = new Request(url);
    try {
      const response = await fetch(request);
      if (!response.ok) throw new Error("Invalid request, status:" + response.status);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  #buildUrl() {
    const url = new URL("api/recipes/v2", this.#apiOrigin);
    url.searchParams.append("app_id", this.#apiId);
    url.searchParams.append("app_key", this.#apiKey);
    url.searchParams.append("type", "public");
    url.searchParams.append("random", "true");
    if (this.#ingredients.length > 0)
      url.searchParams.append("q", this.#ingredients.join(" "));

    this.#appendArrayUrl(url, this.#mealTypes, "mealType");
    this.#appendArrayUrl(url, this.#health, "health");
    this.#appendArrayUrl(url, this.#cuisineTypes, "cuisineType");
    this.#appendArrayUrl(url, this.#dishTypes, "dishType");

    return url;
  }

  #appendArrayUrl(url, arr, key) {
    arr.forEach(item => {
      url.searchParams.append(key, item);
    });
  }

  #setType(store, items) {
    const caseSensitive = store === this.#health;
    const data = this.#normaliseItems(items);
    store.length = 0;
    data.forEach(item => {
      const caseSensitiveItem = caseSensitive ? item : item.toLowerCase();
      store.push(caseSensitiveItem);
    });
  }
  #addType(store, items) {
    const caseSensitive = store === this.#health;
    const data = this.#normaliseItems(items);
    data.forEach(item => {
      const caseSensitiveItem = caseSensitive ? item : item.toLowerCase();
      if (!store.some(existingItem => existingItem === caseSensitiveItem))
        store.push(caseSensitiveItem);
    });
  }
  #removeType(store, items) {
    const data = this.#normaliseItems(items);
    const arr = store.filter(item => !data.some(i => i.toLowerCase() === item.toLowerCase()));
    store.length = 0;
    arr.forEach(item => store.push(item));
  }
  #removeAllType(store) {
    store.length = 0;
  }
  getIngredients = () => {
    return this.#ingredients;
  };
  setIngredientTypes = (...ingredientTypes) => {
    this.#setType(this.#ingredients, ingredientTypes);
  };
  addIngredientTypes = (...ingredientTypes) => {
    this.#addType(this.#ingredients, ingredientTypes);
  };
  removeIngredientTypes = (...ingredientTypes) => {
    this.#removeType(this.#ingredients, ingredientTypes);
  };
  removeAllIngredientTypes = () => {
    this.#removeAllType(this.#ingredients);
  };
  setMealTypes = (...mealTypes) => {
    this.#setType(this.#mealTypes, mealTypes);
  };
  addMealTypes = (...mealTypes) => {
    this.#addType(this.#mealTypes, mealTypes);
  };
  removeMealTypes = (...mealTypes) => {
    this.#removeType(this.#mealTypes, mealTypes);
  };
  removeAllMealTypes = () => {
    this.#removeAllType(this.#mealTypes);
  };
  setHealthLabels = (...healthLabels) => {
    this.#setType(this.#health, healthLabels);
  };
  addHealthLabels = (...healthLabels) => {
    this.#addType(this.#health, healthLabels);
  };
  removeHealthLabels = (...healthLabels) => {
    this.#removeType(this.#health, healthLabels);
  };
  removeAllHealthLabels = () => {
    this.#removeAllType(this.#health);
  };
  setCuisineTypes = (...cuisineTypes) => {
    this.#setType(this.#cuisineTypes, cuisineTypes);
  };
  addCuisineTypes = (...cuisineTypes) => {
    this.#addType(this.#cuisineTypes, cuisineTypes);
  };
  removeCuisineTypes = (...cuisineTypes) => {
    this.#removeType(this.#cuisineTypes, cuisineTypes);
  };
  removeAllCuisineTypes = () => {
    this.#removeAllType(this.#cuisineTypes);
  };
  setDishTypes = (...dishTypes) => {
    this.#setType(this.#dishTypes, dishTypes);
  };
  addDishTypes = (...dishTypes) => {
    this.#addType(this.#dishTypes, dishTypes);
  };
  removeDishTypes = (...dishTypes) => {
    this.#removeType(this.#dishTypes, dishTypes);
  };
  removeAllDishTypes = () => {
    this.#removeAllType(this.#dishTypes);
  };

  // Ensure that arguments provided are in the form of a single array of strings:
  //    (["example", "etc"])
  // or multiple strings:
  //    ("more examples", "hello world")
  #normaliseItems(args) {
    let data;
    const type = typeof args[0];
    if (args.some(item => typeof item !== type)) {
      throw new Error(
        "Please provide consistent arguments in the form of strings or an array of strings"
      );
    }
    if (Array.isArray(args[0]) && args.length > 1) {
      throw new Error("When providing an array, please only provide a single array");
    }
    if (!(type === "string" || Array.isArray(args[0]))) {
      throw new Error(
        "Please provide arguments in the form of strings or an array of strings"
      );
    }
    if (Array.isArray(args[0])) {
      if (args[0].some(item => typeof item !== "string"))
        throw new Error("All items provided in array must be of type string");
      data = [...args[0]];
    } else {
      data = [...args];
    }
    const arr = data.map(item => item.trim());
    const filteredArr = arr.filter(item => item);
    return this.#uniqueArray(filteredArr);
  }
  log() {
    console.log("Ingredients:", this.#ingredients);
    console.log("Meal Types:", this.#mealTypes);
    console.log("Dish Types:", this.#dishTypes);
    console.log("Cuisine Types:", this.#cuisineTypes);
    console.log("Health Labels:", this.#health);
    console.log(this.#buildUrl().href);
  }
  #uniqueArray(arr) {
    return [...new Set(arr)];
  }
}

export default RecipeQuery;
