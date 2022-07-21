//import RecipeQuery from "./RecipeQuery.js";

function lableCreate(healthLabel) {
  var listItem = document.createElement("li");
  var label = document.createElement("label");
  var input = document.createElement("input");
  listItem.appendChild(label);
  listItem.appendChild(input);

  listItem.setAttribute("class", "w-48 flex flex-none justify-between");
  input.setAttribute("type", "checkbox");

  input.value = healthLabel;
  label.innerText = healthLabel.replace("-", " ");

  return listItem;
}

function realCreate(labelArray) {
  return labelArray.map((healthLabel) => {
    return lableCreate(healthLabel);
  });
}

//--------------
export default realCreate;
