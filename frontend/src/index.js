import { router, navigateTo } from "./router";

import "./public/css/normalize.css";
import "./public/css/main.css";

window.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});
