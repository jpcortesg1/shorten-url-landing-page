import Model from "./model.js";
import View from "./view.js";

// When page loads, create a new instance of the Model and View classes
document.addEventListener("DOMContentLoaded", () => {
  const model = new Model();
  const view = new View();

  model.setView(view);
  view.setModel(model);

  view.render();
});
