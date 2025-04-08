/**
 * Card type definitions with their patterns and names
 */
export const CARD_TYPES = [
  {
    name: "visa",
    pattern: /^4/,
    length: [13, 16],
  },
  {
    name: "mastercard",
    pattern: /^(5[1-5]|2[2-7]2[0-1])/,
    length: [16],
  },
  {
    name: "amex",
    pattern: /^3[47]/,
    length: [15],
  },
  {
    name: "discover",
    pattern:
      /^(6011|6[4-5]|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]))/,
    length: [16, 17, 18, 19],
  },
  {
    name: "jcb",
    pattern: /^35(2[8-9]|[3-8][0-9])/,
    length: [16, 17, 18, 19],
  },
  {
    name: "dinersclub",
    pattern: /^(30[0-5]|36|3[8-9])/,
    length: [14, 15, 16, 17, 18, 19],
  },
  {
    name: "mir",
    pattern: /^220[0-4]/,
    length: [16],
  },
];

/**
 * Identifies the type of card based on its number
 * @param {string} cardNumber - Credit card number to identify
 * @returns {string|null} Card type name or null if not identified
 */
export function identifyCardType(cardNumber) {
  // Remove any non-digit characters
  const digitsOnly = cardNumber.replace(/\D/g, "");

  // Try to match the card number against each card type pattern
  for (const cardType of CARD_TYPES) {
    if (
      cardType.pattern.test(digitsOnly) &&
      cardType.length.includes(digitsOnly.length)
    ) {
      return cardType.name;
    }

    // For partial numbers (while user is typing), check just the pattern
    if (digitsOnly.length < 13 && cardType.pattern.test(digitsOnly)) {
      return cardType.name;
    }
  }

  return null;
}
