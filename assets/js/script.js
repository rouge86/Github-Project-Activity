import RecipeQuery from "./RecipeQuery.js";
import recipeCard from "./render-swipe-card.js";
import Swipe from "./Swipe.js";
import realCreate from "./healthLables.js";
import realrecipeDsp, {
  singleRecipeDsp,
  singleRecipeDelete,
} from "./recipeDisplay.js";
import navigate, { setHighlight } from "./navigate.js";
import { handleCardDisplay, bringForward } from "./handle-card-display.js";
import toggleMapExpand from "./toggle-map-expand.js";
import renderPlaces from "./render-place.js";

const CARD_DRAW = 7;
const query = new RecipeQuery();
let swipe;
const labelArray = Object.values(RecipeQuery.healthLabels);
let isSwiping = false;
let isRedrawRequired = false;
let isMapExpanded = true;

const labelCon = document.getElementById("labelSection");
var labelArry = Object.values(RecipeQuery.healthLabels);

const recipeCon = document.getElementById("recipesContainer");
const nav = document.querySelector("nav");
const labelContainer = document.getElementById("labelSection");
const recipeCardContainer = document.getElementById("cards");
const cards = document.getElementById("cards");
const mapExpandBtn = document.getElementById("mapExpand");

mapExpandBtn.addEventListener("click", function (e) {
  toggleMapExpand(!isMapExpanded);
  isMapExpanded = !isMapExpanded;
});

labelCon.addEventListener("input", async function (event) {
  if (event.target.checked) {
    onLabelSave(event.target.value);
  } else {
    onLabelDelete(event.target.value);
  }
  setHealthOptions();
  isRedrawRequired = true;
});

function setHealthOptions() {
  const healthOptions = JSON.parse(localStorage.getItem("healthLabel")) || {};
  query.setHealthLabels(Object.keys(healthOptions));
  isRedrawRequired = true;
}

nav.addEventListener("click", async (event) => {
  if (!event.target.matches("button")) return;
  if (isRedrawRequired) redrawCards();
  const location = event.target.dataset.value;
  renderRecipes();
  navigate(location);
});
recipeCardContainer.addEventListener("pointerdown", grabCard);
recipeCardContainer.addEventListener("click", onCardClick);
window.addEventListener("keyup", onKeyPress);

function handleDecision(card, accepted) {
  if (isSwiping) return;
  isSwiping = true;
  if (accepted) saveRecipe(card.dataset.id);
  handleCardDisplay(card, accepted, () => (isSwiping = false));
  drawCards(1);
}

async function redrawCards() {
  isRedrawRequired = false;
  dropCards();
  await query.requery();
  await drawCards(CARD_DRAW);
  bringForward(cards.lastChild);
}

function onLabelSave(healthLabel) {
  var labelObject = JSON.parse(localStorage.getItem("healthLabel")) || {};
  labelObject[healthLabel] = true;
  localStorage.setItem("healthLabel", JSON.stringify(labelObject));
}

function onLabelDelete(healthLabel) {
  var labelObject = JSON.parse(localStorage.getItem("healthLabel")) || {};
  delete labelObject[healthLabel];
  localStorage.setItem("healthLabel", JSON.stringify(labelObject));
}

function onKeyPress(e) {
  if (e.key === "ArrowLeft") {
    handleDecision(cards.lastChild, false);
  }
  if (e.key === "ArrowRight") {
    handleDecision(cards.lastChild, true);
  }
}

function onCardClick(e) {
  if (!e.target.matches(".accept, .reject")) return;
  const card = e.target.closest(".recipeCard");
  const accepted = e.target.matches(".accept");
  handleDecision(card, accepted);
}

function saveRecipe(recipeId) {
  const recipe = query.getActiveRecipeByUri(recipeId);
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipes.push(recipe);
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

function grabCard(e) {
  const card = e.target.closest(".recipeCard");
  if (!card) return;
  swipe = new Swipe(e, card, handleDecision);
}

function dropCards() {
  cards.innerHTML = "";
}

async function drawCards(numberOfCards) {
  for (let i = 0; i < numberOfCards; i++) {
    await insertNewCard();
  }
}

async function insertNewCard() {
  const recipe = await query.getRecipe();
  const newCard = recipeCard(recipe);
  cards.prepend(newCard);
}

function renderHealthLabels() {
  var labelElemAry = realCreate(labelArray);
  for (var i = 0; i < labelElemAry.length; i++) {
    labelContainer.appendChild(labelElemAry[i]);
  }
}

function renderRecipes() {
  recipeCon.innerHTML = "";
  var recipeElemAry = realrecipeDsp();
  for (var i = 0; i < recipeElemAry.length; i++) {
    recipeCon.appendChild(recipeElemAry[i]);
  }
}

var recipeList = document.getElementById("recipesContainer");

recipeList.addEventListener("click", function (event) {
  var listItem = event.target.closest("li");
  var id = listItem.id;

  if (event.target.matches("button")) {
    singleRecipeDelete(id);
    renderRecipes();
  } else {
    singleRecipeDsp(id);
  }
});

async function init() {
  renderHealthLabels();
  setHighlight();
  setHealthOptions();
  await drawCards(CARD_DRAW);
  bringForward(cards.lastChild);
  renderRecipes();
}

function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.92123, lng: 138.599503 },
    zoom: 13,
    type: ["restaurant"],
    componentRestrictions: { country: "AU", postalCode: "5000" },
  });
  var input = document.getElementById("searchInput");
  const searchBox = new google.maps.places.SearchBox(input);

  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    const bounds = map.getBounds().toJSON();
    searchBox.setBounds(bounds);
  });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      fallback();
      return;
    }
    handlePlaces(places);
  });

  function fallback() {
    const center = map.getCenter();
    const latLng = new google.maps.LatLng(center);

    const request = {
      location: latLng.toJSON(),
      radius: 1000,
      query: input.value,
    };
    const service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
  }

  function callback(results, status) {
    console.log("callback status", status);
    console.log(results);
    if (results.length > 0) handlePlaces(results);
  }

  function handlePlaces(places) {
    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    renderPlaces(places);

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
    toggleMapExpand(false);
  }
}

window.initAutocomplete = initAutocomplete;

init();
