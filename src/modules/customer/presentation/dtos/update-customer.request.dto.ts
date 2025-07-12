import { IsString, IsEmail, IsDateString } from "class-validator";
import { Customer } from "../../domain/customer.entity";

export class UpdateCustomerRequestDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsDateString()
  dateOfBirth!: string;

  @IsString()
  phoneNumber!: string;

  @IsEmail()
  email!: string;

  @IsString()
  bankAccountNumber!: string;

  fill(domainCustomer: Customer) {
    this.firstName = domainCustomer.firstName;
    this.lastName = domainCustomer.lastName;
    // Format date as YYYY-MM-DD
    this.dateOfBirth = domainCustomer.dateOfBirth.toISOString().split("T")[0];
    this.phoneNumber = domainCustomer.phoneNumber.toString();
    this.email = domainCustomer.email.getValue();
    this.bankAccountNumber = domainCustomer.bankAccountNumber.getValue();
  }
}
