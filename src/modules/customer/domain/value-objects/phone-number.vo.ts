// phone-number.vo.ts

import { parsePhoneNumberFromString } from "libphonenumber-js";

export class PhoneNumber {
  constructor(private readonly value: string) {
    if (!PhoneNumber.isValid(value)) {
      throw new Error("Invalid mobile phone number");
    }
  }

  /**
   * Validates a phone number.
   * @param phone The phone number to validate.
   * @returns True if the phone number is valid, false otherwise.
   */
  static isValid(phone: string): boolean {
    try {
      const parsed = parsePhoneNumberFromString(phone);

      return !!parsed && parsed.isValid() && parsed.getType() === "MOBILE";
    } catch {
      return false;
    }
  }

  getValue(): string {
    return this.value;
  }
}
