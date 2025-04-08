/**
 * Validates a credit card number using the Luhn algorithm
 * @param {string} cardNumber - Credit card number to validate
 * @returns {boolean} True if valid, false if invalid
 */
export function validateCardNumber(cardNumber) {
  // Remove any non-digit characters
  const digitsOnly = cardNumber.replace(/\D/g, "");

  if (digitsOnly.length < 13 || digitsOnly.length > 19) {
    return false;
  }

  // Luhn algorithm implementation
  let sum = 0;
  let shouldDouble = false;

  // Loop through digits in reverse order
  for (let i = digitsOnly.length - 1; i >= 0; i--) {
    let digit = parseInt(digitsOnly.charAt(i));

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}
