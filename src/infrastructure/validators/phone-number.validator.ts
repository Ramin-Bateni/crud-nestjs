import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import * as libphonenumber from 'google-libphonenumber';

@ValidatorConstraint({ name: 'phoneNumber', async: false })
@Injectable()
export class PhoneNumberValidator implements ValidatorConstraintInterface {
  validate(phoneNumber: string) {
    if (!phoneNumber) return false;

    try {
      const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
      const parsedNumber = phoneUtil.parseAndKeepRawInput(phoneNumber);

      const isValid = phoneUtil.isValidNumber(parsedNumber);
      const numberType = phoneUtil.getNumberType(parsedNumber);

      return (
        isValid &&
        (numberType === libphonenumber.PhoneNumberType.MOBILE ||
          numberType === libphonenumber.PhoneNumberType.FIXED_LINE_OR_MOBILE)
      );
    } catch (error) {
      console.error('Phone validation error:', error);
      return false;
    }
  }

  defaultMessage() {
    return 'Phone number must be a valid mobile number';
  }
}
