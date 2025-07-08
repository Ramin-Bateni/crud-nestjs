// bank-account-number.vo.ts

export class BankAccountNumber {
  constructor(private readonly value: string) {
    if (!BankAccountNumber.isValid(value)) {
      throw new Error("Invalid bank account number");
    }
  }

  /**
   * Validates the given Bank Account (IBAN-like) number.
   * @param iban The Bank Account (IBAN-like) number to validate.
   * @returns True if the IBAN is valid, false otherwise.
   */
  static isValid(iban: string): boolean {
    return /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/.test(iban);
  }

  getValue(): string {
    return this.value;
  }
}
