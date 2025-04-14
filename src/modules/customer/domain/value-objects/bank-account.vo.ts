export class BankAccountNumber {
  private readonly value: string;

  constructor(bankAccount: string) {
    if (!/^\d{8,20}$/.test(bankAccount)) {
      throw new Error('Invalid bank account number');
    }
    this.value = bankAccount;
  }

  getValue(): string {
    return this.value;
  }
}
