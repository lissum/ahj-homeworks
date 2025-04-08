import { initCardValidator } from "./domInteraction";

document.addEventListener("DOMContentLoaded", () => {
  initCardValidator("#card-number", "#card-icons");
});
