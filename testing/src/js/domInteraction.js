import { validateCardNumber } from "./validator";
import { identifyCardType, CARD_TYPES } from "./cardIdentifier";

export function formatCardNumber(cardNumber) {
  const digitsOnly = cardNumber.replace(/\D/g, "");
  const groups = [];

  for (let i = 0; i < digitsOnly.length; i += 4) {
    groups.push(digitsOnly.slice(i, i + 4));
  }

  return groups.join(" ");
}

export function initCardValidator(
  inputSelector = "#card-number",
  cardIconsSelector = "#card-icons",
) {
  const root = document.querySelector(".card-validator");
  const input = document.querySelector(inputSelector);
  const button = document.querySelector(".js-validate");

  const cardIconsContainer = document.querySelector(cardIconsSelector);

  if (!input || !cardIconsContainer) {
    console.error("Required DOM elements not found");
    return;
  }

  // Create card icons
  CARD_TYPES.forEach((cardType) => {
    const icon = document.createElement("img");
    icon.src = `./img/${cardType.name}.png`;
    icon.alt = cardType.name;
    icon.classList.add("card-icon");
    icon.dataset.cardType = cardType.name;
    cardIconsContainer.appendChild(icon);
  });

  button.addEventListener("click", function (e) {
    const digitsOnly = input.value.replace(/\D/g, "");

    input.value = formatCardNumber(digitsOnly);

    const cardType = identifyCardType(digitsOnly);
    const isValid = validateCardNumber(digitsOnly);

    document.querySelectorAll(".card-icon").forEach((icon) => {
      if (cardType && icon.dataset.cardType === cardType) {
        icon.classList.add("active");
      } else {
        icon.classList.remove("active");
      }
    });

    if (digitsOnly.length >= 13) {
      if (isValid) {
        root.classList.add("valid");
        root.classList.remove("invalid");
      } else {
        root.classList.add("invalid");
        root.classList.remove("valid");
      }
    } else {
      root.classList.remove("valid", "invalid");
    }
  });
}
