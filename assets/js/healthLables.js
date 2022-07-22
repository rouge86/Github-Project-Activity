function labelCreate(healthLabel, labelObject) {
  var listItem = document.createElement("li");
  var label = document.createElement("label");
  var input = document.createElement("input");

  listItem.appendChild(label);
  listItem.appendChild(input);

  listItem.setAttribute("class", "w-48 flex flex-none justify-between");
  input.setAttribute("type", "checkbox");

  console.log(labelObject);

  input.value = healthLabel;
  input.checked = labelObject[healthLabel];
  label.innerText = healthLabel.replace("-", " ");

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
