import { Email } from "@/modules/customer/domain/value-objects/email.vo";

describe("Email", () => {
  it("should accept valid email", () => {
    expect(() => new Email("alice@example.com")).not.toThrow();
  });

  it("should throw error for invalid email", () => {
    expect(() => new Email("invalid-email")).toThrow("Invalid email address");
  });
});
