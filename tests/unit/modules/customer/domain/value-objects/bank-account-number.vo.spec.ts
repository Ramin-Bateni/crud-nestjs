import { BankAccountNumber } from "@/modules/customer/domain/value-objects/bank-account-number.vo";

describe("BankAccountNumber", () => {
  it("should accept valid IBAN-like number", () => {
    expect(() => new BankAccountNumber("GB29NWBK60161331926819")).not.toThrow();
  });

  it("should throw error for invalid number", () => {
    expect(() => new BankAccountNumber("INVALID")).toThrow(
      "Invalid bank account number"
    );
  });
});
