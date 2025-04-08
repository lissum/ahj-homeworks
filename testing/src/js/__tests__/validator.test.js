import { validateCardNumber } from "../validator";

describe("Credit Card Validator", () => {
  test("should validate a valid Visa card", () => {
    expect(validateCardNumber("4111111111111111")).toBe(true);
  });

  test("should validate a valid MasterCard card", () => {
    expect(validateCardNumber("5555555555554444")).toBe(true);
  });

  test("should validate a valid Amex card", () => {
    expect(validateCardNumber("371449635398431")).toBe(true);
  });

  test("should validate a valid Discover card", () => {
    expect(validateCardNumber("6011111111111117")).toBe(true);
  });

  test("should validate a valid Mir card", () => {
    expect(validateCardNumber("2200815493994318")).toBe(true);
  });

  test("should not validate an invalid card number", () => {
    expect(validateCardNumber("4111111111111112")).toBe(false);
  });

  test("should handle card numbers with spaces", () => {
    expect(validateCardNumber("4111 1111 1111 1111")).toBe(true);
  });

  test("should handle card numbers with dashes", () => {
    expect(validateCardNumber("4111-1111-1111-1111")).toBe(true);
  });

  test("should reject card numbers that are too short", () => {
    expect(validateCardNumber("411111")).toBe(false);
  });

  test("should reject card numbers that are too long", () => {
    expect(validateCardNumber("41111111111111111111")).toBe(false);
  });
});
