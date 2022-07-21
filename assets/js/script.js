import RecipeQuery from "./RecipeQuery.js";
import recipeCard from "./render-swipe-card.js";
import Swipe from "./Swipe.js";
const query = new RecipeQuery();
let swipe;

var mainCollection = document.querySelectorAll("main");
const nav = document.querySelector("nav");
const recipeCardContainer = document.getElementById("cards");
const cards = document.getElementById("cards");
let pos;
let map;
let bounds;
let infoWindow;
let currentInfoWindow;
let service;
let infoPane;

recipeCardContainer.addEventListener("pointerdown", grabCard);

nav.onclick = function (event) {
  if (!event.target.matches("button")) return;
  const location = event.target.dataset.value;
  Array.from(mainCollection).forEach((mainEl) => {
    mainEl.hidden = true;
  });

  document.getElementById(location).hidden = false;
};

function onAccept(recipeId) {
  // This function will run on a succesful swipe (swipe right only)
  return async (accept, card) => {
    card.addEventListener("transitionend", () => {
      card.remove();
    });
    if (accept) {
      const recipe = query.getActiveRecipeByUri(recipeId);
      saveRecipe(recipe);
    }
    const recipe = await query.getRecipe();
    const newCard = recipeCard(recipe);
    cards.prepend(newCard);
  };
}

function saveRecipe(recipe) {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipes.push(recipe);
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

function grabCard(e) {
  const card = e.target.closest(".recipeCard");
  if (!card) return;
  swipe = new Swipe(e, card, onAccept(card.dataset.id));
}

async function getInitialCards() {
  const arr = [];
  for (let i = 0; i < 5; i++) {
    arr.push(query.getRecipe());
  }
  const recipeArray = await Promise.all(arr);
  recipeArray.forEach((recipe) => {
    const card = recipeCard(recipe);
    cards.prepend(card);
  });
}

function init() {
  getInitialCards();
}

init();

// function initMap() {
//   // Initialize variables
//   bounds = new google.maps.LatLngBounds();
//   infoWindow = new google.maps.InfoWindow();
//   currentInfoWindow = infoWindow;
//   /* TODO: Step 4A3: Add a generic sidebar */
//   infoPane = document.getElementById("panel");

//   // Try HTML5 geolocation
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         pos = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         };
//         map = new google.maps.Map(document.getElementById("map"), {
//           center: pos,
//           zoom: 15,
//         });
//         bounds.extend(pos);

//         infoWindow.setPosition(pos);
//         infoWindow.setContent("Location found.");
//         infoWindow.open(map);
//         map.setCenter(pos);

//         // Call Places Nearby Search on user's location
//         getNearbyPlaces(pos);
//       },
//       () => {
//         // Browser supports geolocation, but user has denied permission
//         handleLocationError(true, infoWindow);
//       }
//     );
//   } else {
//     // Browser doesn't support geolocation
//     handleLocationError(false, infoWindow);
//   }
// }

// // Handle a geolocation error
// function handleLocationError(browserHasGeolocation, infoWindow) {
//   // Set default location to Sydney, Australia
//   pos = { lat: -33.865143, lng: 151.2099 };
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: pos,
//     zoom: 15,
//   });

//   // Display an InfoWindow at the map center
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(
//     browserHasGeolocation
//       ? "Geolocation permissions denied. Using default location."
//       : "Error: Your browser doesn't support geolocation."
//   );
//   infoWindow.open(map);
//   currentInfoWindow = infoWindow;

//   // Call Places Nearby Search on the default location
//   getNearbyPlaces(pos);
// }

// // Perform a Places Nearby Search Request
// function getNearbyPlaces(position) {
//   let request = {
//     location: position,
//     rankBy: google.maps.places.RankBy.DISTANCE,
//     keyword: "restaurant",
//     type: ["restaurant"],
//   };
//   console.log(cuisineTypes);

//   service = new google.maps.places.PlacesService(map);
//   service.nearbySearch(request, nearbyCallback);
// }

// // Handle the results (up to 20) of the Nearby Search
// function nearbyCallback(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     createMarkers(results);
//   }
// }

// // Set markers at the location of each place result
// function createMarkers(places) {
//   places.forEach((place) => {
//     let marker = new google.maps.Marker({
//       position: place.geometry.location,
//       map: map,
//       title: place.name,
//     });

//     /* TODO: Step 4B: Add click listeners to the markers */
//     // Add click listener to each marker
//     google.maps.event.addListener(marker, "click", () => {
//       let request = {
//         placeId: place.place_id,
//         fields: [
//           "name",
//           "formatted_address",
//           "geometry",
//           "rating",
//           "website",
//           "photos",
//         ],
//       };

//       /* Only fetch the details of a place when the user clicks on a marker.
//        * If we fetch the details for all place results as soon as we get
//        * the search response, we will hit API rate limits. */
//       service.getDetails(request, (placeResult, status) => {
//         showDetails(placeResult, marker, status);
//       });
//     });

//     // Adjust the map bounds to include the location of this marker
//     bounds.extend(place.geometry.location);
//   });
//   /* Once all the markers have been placed, adjust the bounds of the map to
//    * show all the markers within the visible area. */
//   map.fitBounds(bounds);
// }

// /* TODO: Step 4C: Show place details in an info window */
// // Builds an InfoWindow to display details above the marker
// function showDetails(placeResult, marker, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     let placeInfowindow = new google.maps.InfoWindow();
//     let rating = "None";
//     if (placeResult.rating) rating = placeResult.rating;
//     placeInfowindow.setContent(
//       "<div><strong>" +
//         placeResult.name +
//         "</strong><br>" +
//         "Rating: " +
//         rating +
//         "</div>"
//     );
//     placeInfowindow.open(marker.map, marker);
//     currentInfoWindow.close();
//     currentInfoWindow = placeInfowindow;
//     showPanel(placeResult);
//   } else {
//     console.log("showDetails failed: " + status);
//   }
// }

// /* TODO: Step 4D: Load place details in a sidebar */
// // Displays place details in a sidebar
// function showPanel(placeResult) {
//   // If infoPane is already open, close it
//   if (infoPane.classList.contains("open")) {
//     infoPane.classList.remove("open");
//   }

//   // Clear the previous details
//   while (infoPane.lastChild) {
//     infoPane.removeChild(infoPane.lastChild);
//   }

//   /* TODO: Step 4E: Display a Place Photo with the Place Details */
//   // Add the primary photo, if there is one
//   if (placeResult.photos) {
//     let firstPhoto = placeResult.photos[0];
//     let photo = document.createElement("img");
//     photo.classList.add("hero");
//     photo.src = firstPhoto.getUrl();
//     infoPane.appendChild(photo);
//   }

//   // Add place details with text formatting
//   let name = document.createElement("h1");
//   name.classList.add("place");
//   name.textContent = placeResult.name;
//   infoPane.appendChild(name);
//   if (placeResult.rating) {
//     let rating = document.createElement("p");
//     rating.classList.add("details");
//     rating.textContent = `Rating: ${placeResult.rating} \u272e`;
//     infoPane.appendChild(rating);
//   }
//   let address = document.createElement("p");
//   address.classList.add("details");
//   address.textContent = placeResult.formatted_address;
//   infoPane.appendChild(address);
//   if (placeResult.website) {
//     let websitePara = document.createElement("p");
//     let websiteLink = document.createElement("a");
//     let websiteUrl = document.createTextNode(placeResult.website);
//     websiteLink.appendChild(websiteUrl);
//     websiteLink.title = placeResult.website;
//     websiteLink.href = placeResult.website;
//     websitePara.appendChild(websiteLink);
//     infoPane.appendChild(websitePara);
//   }

//   // Open the infoPane
//   infoPane.classList.add("open");
// }

// window.initMap = initMap;

function initSearch() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.92123, lng: 138.599503 },
    zoom: 13,
    type: ["restaurant"],
    componentRestrictions: { country: "AU", postalCode: "5000" },
  });

  var input = document.getElementById("searchInput");
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29),
  });
  autocomplete.addListener("place_changed", function () {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Bad Entry");
      return;
    }

    //if place has geometry then present it on a map
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    marker.setIcon({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35),
    });
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = "";
    if (place.address_components) {
      address = [
        (place.address_components[0] &&
          place.address_components[0].short_name) ||
          "",
        (place.address_components[1] &&
          place.address_components[1].short_name) ||
          "",
        (place.address_components[2] &&
          place.address_components[2].short_name) ||
          "",
      ].join("");
    }

    infowindow.setContent(
      "<div><strong>" + place.name + "</strong><br>" + address
    );
    infowindow.open(map, marker);

    //location details
    for (var i = 0; i < place.address_components.length; i++) {
      if (place.address_components[i].types[0] == "formatted_phone_number") {
        document.getElementById("phone").innerHTML =
          place.address_components[i].long_name;
      }
      if (place.address_components[i].types[0] == "opening_hours") {
        document.getElementById("hours").innerHTML =
          place.address_components[i].long_name;
      }
      if (place.address_components[i].types[0] == "rating") {
        document.getElementById("rating").innerHTML =
          place.address_components[i].long_name;
      }
      if (place.address_components[i].types[0] == "website") {
        document.getElementById("website").innerHTML =
          place.address_components[i].long_name;
      }
    }
    document.getElementById("location").innerHTML = place.formatted_address;
    document.getElementById("phone").innerHTML = place.formatted_phone_number;
    document.getElementById("hours").innerHTML = place.opening_hours;
    document.getElementById("rating").innerHTML = place.rating;
    document.getElementById("website").innerHTML = place.website;
  });
}

window.initSearch = initSearch;
