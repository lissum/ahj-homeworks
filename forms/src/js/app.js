import Popover from "./Popover";

document.addEventListener("DOMContentLoaded", function () {
  // Initialize popover
  const popoverBtn = document.getElementById("popoverBtn");

  const myPopover = new Popover({
    target: popoverBtn,
    title: "Popover title",
    content: "And here's some amazing content. It's very engaging. Right?",
  });
});
