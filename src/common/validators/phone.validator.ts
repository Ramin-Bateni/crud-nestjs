import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

const phoneUtil = PhoneNumberUtil.getInstance();

export function IsValidPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false;
          }

          try {
            const phoneNumber = phoneUtil.parse(value);
            return phoneUtil.isValidNumber(phoneNumber) && 
                   phoneUtil.getNumberType(phoneNumber) === phoneUtil.PhoneNumberType.MOBILE;
          } catch (error) {
            return false;
          }
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid mobile phone number`;
        },
      },
    });
  };
} 