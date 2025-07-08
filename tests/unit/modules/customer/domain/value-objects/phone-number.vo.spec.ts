import { PhoneNumber } from "@/modules/customer/domain/value-objects/phone-number.vo";

describe("PhoneNumber", () => {
  it("should accept valid mobile phone number", () => {
    expect(() => new PhoneNumber("+447911123456")).not.toThrow();
  });

  it("should throw error for invalid phone number", () => {
    expect(() => new PhoneNumber("123456")).toThrow(
      "Invalid mobile phone number"
    );
  });
});
