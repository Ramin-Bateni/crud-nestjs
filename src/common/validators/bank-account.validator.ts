import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { isValidIBAN } from 'ibantools';

export function IsValidBankAccount(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidBankAccount',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && isValidIBAN(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'Please provide a valid IBAN';
        },
      },
    });
  };
} 