import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PhoneNumberUtil, PhoneNumberType } from 'google-libphonenumber';

@ValidatorConstraint({ name: 'IsValidPhoneNumber', async: false })
export class IsValidPhoneNumber implements ValidatorConstraintInterface {
  private readonly phoneUtil: PhoneNumberUtil;

  constructor() {
    this.phoneUtil = PhoneNumberUtil.getInstance();
  }

  validate(phone: string): boolean {
    try {
      const parsed = this.phoneUtil.parseAndKeepRawInput(phone);
      return (
        this.phoneUtil.isValidNumber(parsed) &&
        this.phoneUtil.getNumberType(parsed) === PhoneNumberType.MOBILE
      );
    } catch {
      return false;
    }
  }

  defaultMessage(): string {
    return 'Invalid mobile phone number';
  }
}
