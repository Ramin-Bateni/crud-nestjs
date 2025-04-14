export class Email {
  private readonly value: string;

  constructor(email: string) {
    if (!/\S+@\S+\.\S+/.test(email)) {
      throw new Error('Invalid email');
    }
    this.value = email.toLowerCase();
  }

  getValue(): string {
    return this.value;
  }
}
