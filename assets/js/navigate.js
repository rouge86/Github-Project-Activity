const mainCollection = document.querySelectorAll("main");

function navigate(location) {
  Array.from(mainCollection).forEach(mainEl => {
    mainEl.hidden = true;
  });
  document.getElementById(location).hidden = false;
}

export default navigate;
