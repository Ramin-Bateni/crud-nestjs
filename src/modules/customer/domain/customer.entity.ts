// src/modules/customer/domain/customer.entity.ts

import { Email } from "./value-objects/email.vo";
import { PhoneNumber } from "./value-objects/phone-number.vo";
import { BankAccountNumber } from "./value-objects/bank-account-number.vo";

export class Customer {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly dateOfBirth: Date,
    public readonly phoneNumber: PhoneNumber,
    public readonly email: Email,
    public readonly bankAccountNumber: BankAccountNumber
  ) {}
}
