import { identifyCardType } from "../cardIdentifier";

describe("Card Type Identifier", () => {
  test("should identify Visa cards", () => {
    expect(identifyCardType("4111111111111111")).toBe("visa");
    expect(identifyCardType("4005519200000004")).toBe("visa");
  });

  test("should identify MasterCard cards", () => {
    expect(identifyCardType("5555555555554444")).toBe("mastercard");
    expect(identifyCardType("2221000000000009")).toBe("mastercard");
  });

  test("should identify American Express cards", () => {
    expect(identifyCardType("371449635398431")).toBe("amex");
    expect(identifyCardType("340000000000009")).toBe("amex");
  });

  test("should identify Discover cards", () => {
    expect(identifyCardType("6011111111111117")).toBe("discover");
    expect(identifyCardType("6441111111111117")).toBe("discover");
  });

  test("should identify JCB cards", () => {
    expect(identifyCardType("3530111333300000")).toBe("jcb");
  });

  test("should identify Diners Club cards", () => {
    expect(identifyCardType("30569309025904")).toBe("dinersclub");
    expect(identifyCardType("38520000023237")).toBe("dinersclub");
  });

  test("should identify Mir cards", () => {
    expect(identifyCardType("2200815493994318")).toBe("mir");
  });

  test("should return null for unknown card types", () => {
    expect(identifyCardType("1234567890123456")).toBe(null);
  });

  test("should handle card numbers with spaces", () => {
    expect(identifyCardType("4111 1111 1111 1111")).toBe("visa");
  });
});
