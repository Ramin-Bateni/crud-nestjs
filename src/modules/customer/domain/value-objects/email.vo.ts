// email.vo.ts

export class Email {
  constructor(private readonly value: string) {
    if (!Email.isValid(value)) {
      throw new Error("Invalid email address");
    }
  }

  /**
   * Validates an email address.
   * @param email The email address to validate.
   * @returns True if the email address is valid, false otherwise.
   */
  static isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  getValue(): string {
    return this.value;
  }
}
