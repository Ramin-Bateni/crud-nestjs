import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsValidBankAccount(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidBankAccount',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // Basic validation for bank account number
          // This can be customized based on specific bank account number formats
          const bankAccountRegex = /^[0-9]{8,17}$/;
          return typeof value === 'string' && bankAccountRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'Please provide a valid bank account number (8-17 digits)';
        },
      },
    });
  };
} 