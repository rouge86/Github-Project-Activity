const placesContainer = document.getElementById("placesContainer");

function renderPlace(place) {
  const {
    name,
    formatted_address,
    // opening_hours,
    place_id,
    rating,
    user_ratings_total,
  } = place;

  const html = `
    <li class="border-2 rounded-lg bg-white m-3 p-3 hover:bg-green-100 cursor-pointer">
      <p class="font-bold">${name}</p>
      <p>Rating: <span>${rating}</span> ⭐️ out of ${user_ratings_total} ratings</p>
      <p>${formatted_address}</p>
      </li>
      `;
  // <p>${opening_hours?.isOpen() ? "Currently open" : "Closed"}</p>

  const template = document.createElement("div");
  template.innerHTML = html;
  const item = template.querySelector("li");
  item.id = place_id;
  placesContainer.appendChild(item);
}

function renderPlaces(places) {
  placesContainer.innerHTML = "";
  const sortedPlaces = places.sort((a, b) => b.rating - a.rating);
  sortedPlaces.forEach((place) => {
    renderPlace(place);
  });
}

export default renderPlaces;

// business_status: "OPERATIONAL"
// formatted_address: "5/196 Marion Rd, Richmond SA 5033, Australia"
// geometry: {location: _.Ee, viewport: _.Cf}
// html_attributions: []
// icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png"
// icon_background_color: "#FF9E67"
// icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet"
// name: "Marconi Pizza"
// opening_hours: {isOpen: ƒ}
// photos: [{…}]
// place_id: "ChIJtalwJHnFsGoR7O7SE9RZkNY"
// plus_code: {compound_code: '3H43+V5 Richmond, South Australia', global_code: '4QQW3H43+V5'}
// price_level: 2
// rating: 4.6
// reference: "ChIJtalwJHnFsGoR7O7SE9RZkNY"
// types: (6) ['meal_delivery', 'meal_takeaway', 'restaurant', 'food', 'point_of_interest', 'establishment']
// user_ratings_total: 161
