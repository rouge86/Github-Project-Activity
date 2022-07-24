const mainCollection = document.querySelectorAll("main");
const recipeContent = document.getElementById("recipeContent");

export function setHighlight() {
  const buttons = document.querySelectorAll("nav button");
  Array.from(buttons).forEach((button) => {
    button.classList.remove("bg-red-500");
    button.classList.remove("text-white");
    button.classList.add("bg-red-300");
    button.classList.add("text-black");
  });
  const id = document.querySelector("main:not([hidden])")?.id;
  const selectedBtn = document.querySelector(`nav button[data-value="${id}"]`);
  if (!selectedBtn) return;
  selectedBtn.classList.remove("bg-red-300");
  selectedBtn.classList.remove("text-black");
  selectedBtn.classList.add("bg-red-500");
  selectedBtn.classList.add("text-white");
}

function navigate(location) {
  recipeContent.scrollTo(0, 0);
  Array.from(mainCollection).forEach((mainEl) => {
    mainEl.hidden = true;
  });
  document.getElementById(location).hidden = false;
  setHighlight();
}

export default navigate;
