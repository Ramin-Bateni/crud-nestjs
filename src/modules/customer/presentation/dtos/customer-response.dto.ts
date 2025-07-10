import { Customer } from "../../domain/customer.entity";

export class CustomerResponseDto {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  bankAccountNumber: string;

  constructor(domainCustomer: Customer) {
    this.firstName = domainCustomer.firstName;
    this.lastName = domainCustomer.lastName;
    // Format date as YYYY-MM-DD
    this.dateOfBirth = domainCustomer.dateOfBirth.toISOString().split("T")[0];
    this.phoneNumber = domainCustomer.phoneNumber.toString();
    this.email = domainCustomer.email.getValue();
    this.bankAccountNumber = domainCustomer.bankAccountNumber.getValue();
  }
}
