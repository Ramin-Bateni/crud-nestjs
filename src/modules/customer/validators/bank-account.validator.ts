import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsValidBankAccount', async: false })
export class IsValidBankAccount implements ValidatorConstraintInterface {
  validate(accountNumber: string): boolean {
    return /^[A-Z]{2}[0-9A-Z]{8,32}$/.test(accountNumber);
  }

  defaultMessage(): string {
    return 'Bank account number format is invalid';
  }
}
