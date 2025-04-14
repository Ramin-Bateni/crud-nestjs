import { Email } from '../value-objects/email.vo';
import { PhoneNumber } from '../value-objects/phone.vo';
import { BankAccountNumber } from '../value-objects/bank-account.vo';

export class Customer {
  constructor(
    public readonly id: string,
    public firstName: string,
    public lastName: string,
    public dateOfBirth: Date,
    public email: Email,
    public phoneNumber: PhoneNumber,
    public bankAccountNumber: BankAccountNumber,
  ) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
