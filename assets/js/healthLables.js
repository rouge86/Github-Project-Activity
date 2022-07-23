function labelCreate(healthLabel, labelObject) {
  var listItem = document.createElement("li");
  var label = document.createElement("label");
  var input = document.createElement("input");

  listItem.appendChild(input);
  listItem.appendChild(label);

  listItem.setAttribute("class", "flex flex-none gap-6");
  input.setAttribute("type", "checkbox");
  input.id = healthLabel;

  //console.log(labelObject);

  input.value = healthLabel;
  input.checked = labelObject[healthLabel];
  label.innerText = healthLabel.replace("-", " ");
  label.setAttribute("for", healthLabel);
  label.setAttribute("class", "hover:bg-blue-100 flex-1 rounded px-2");

  return listItem;
}

function createHealthLabelArray(labelArray) {
  var labelObject = JSON.parse(localStorage.getItem("healthLabel")) || {};
  return labelArray.map((healthLabel) => {
    return labelCreate(healthLabel, labelObject);
  });
}

//--------------
export default createHealthLabelArray;
