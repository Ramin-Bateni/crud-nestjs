import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: 'John',
    description: 'First name of the customer',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the customer',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Date of birth in ISO 8601 format',
    type: String,
    format: 'date-time',
  })
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number in international format',
  })
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the customer',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '1234567890123456',
    description: 'Bank account number validated by custom constraint',
  })
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
