import { PhoneValidator } from "src/infrastructure/validation/phone.validator";
import { Result } from "src/interfaces/rest/dto/result.dto";
import { uuid } from "uuidv4";

export class Customer {
    constructor(
      public readonly id: string,
      public firstName: string,
      public lastName: string,
      public dateOfBirth: Date,
      public phone: string,
      private _phoneNumber: string, // Encapsulated for validation
      public email: string,
      public bankAccountNumber: string
    ) {}
  

    static create(props: {
      phoneNumber: string;
      firstName: string;
      lastName: string;
      dateOfBirth: Date;
      email: string;
      bankAccountNumber: string;
    }, validator: PhoneValidator): Result<Customer> {
      const validation = validator.validate(props.phoneNumber);
      
      if (!validation.isValid) {
        return Result.fail(validation.error!);
      }
  
      return Result.ok(new Customer(
        uuid(),
        props.firstName,
        props.lastName,
        props.dateOfBirth,
        validation.normalizedNumber!,
        validation.normalizedNumber!, // todo fix this
        props.email,
        props.bankAccountNumber
      ));
    }
  
    get phoneNumber(): string {
      return this._phoneNumber;
    }
  
    updatePhoneNumber(phone: string, validator: PhoneValidator): Result<void> {
      const validation = validator.validate(phone);
      if (!validation.isValid) {
        return Result.fail(validation.error!);
      }
      this._phoneNumber = validation.normalizedNumber!;
      return Result.ok();
    }
  }