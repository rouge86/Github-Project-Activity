const mapExpandContainer = document.getElementById("mapExpandContainer");
const mapDetailsContainer = document.getElementById("mapDetails");
function toggleMapExpand(expand) {
  if (expand) {
    mapExpandContainer.setAttribute(
      "class",
      "grid grid-rows-[minmax(0,_1fr),_min-content] h-full"
    );
    mapDetailsContainer.setAttribute("class", "h-0 overflow-hidden");
  } else {
    mapExpandContainer.setAttribute(
      "class",
      "grid grid-rows-[15%,_85%] h-full"
    );
    mapDetailsContainer.setAttribute(
      "class",
      "overflow-y-auto mx-auto max-w-full"
    );
  }
}

export default toggleMapExpand;
