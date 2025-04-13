import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsValidEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidEmail',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return typeof value === 'string' && emailRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'Please provide a valid email address';
        },
      },
    });
  };
} 