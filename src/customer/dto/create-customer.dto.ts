import {
  IsString,
  IsDateString,
  IsEmail,
  ValidationOptions,
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  // ValidationArguments,
  Validate,
} from 'class-validator';
import { PhoneNumberUtil } from 'google-libphonenumber';
@ValidatorConstraint({ name: 'IsBankAccountNumber', async: false })
class IsBankAccountNumberConstraint implements ValidatorConstraintInterface {
  validate(accountNumber: string) {
    if (!accountNumber) return false;

    const isNumeric = /^\d+$/.test(accountNumber);
    const hasValidLength =
      accountNumber.length >= 8 && accountNumber.length <= 34;

    return isNumeric && hasValidLength;
  }

  defaultMessage() {
    return 'Bank account should be numeric and 8-34 digit long';
  }
}

export class CreateCustomerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDateString()
  dateOfBirth: string;

  // @IsString()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  @Validate(IsBankAccountNumberConstraint)
  bankAccountNumber: string;
}

function IsPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) return false;

          try {
            const phoneUtil = PhoneNumberUtil.getInstance();
            const phoneNumber = phoneUtil.parse(value, 'US'); // Default to US
            return phoneUtil.isValidNumber(phoneNumber);
          } catch {
            return false;
          }
        },
        defaultMessage() {
          return 'Phone number must be valid';
        },
      },
    });
  };
}
