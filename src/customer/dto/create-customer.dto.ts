import {
  IsString,
  IsDateString,
  IsEmail,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { PhoneNumberUtil } from 'google-libphonenumber';

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
