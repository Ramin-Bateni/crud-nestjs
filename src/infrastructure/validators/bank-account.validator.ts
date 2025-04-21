import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'bankAccount', async: false })
@Injectable()
export class BankAccountValidator implements ValidatorConstraintInterface {
  validate(accountNumber: string) {
    if (!accountNumber) return false;

    const isNumeric = /^\d+$/.test(accountNumber);
    const hasValidLength =
      accountNumber.length >= 8 && accountNumber.length <= 34;

    return isNumeric && hasValidLength;
  }

  defaultMessage() {
    return 'Bank account number must be a valid bank account number';
  }
}
