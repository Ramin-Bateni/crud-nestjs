import { Customer } from '../entities/customer.entity';

export class CustomerDto {
  id: string;

  firstName: string;

  lastName: string;

  dateOfBirth: string;

  email: string;

  phoneNumber: string;

  bankAccountNumber: string;

  static fromCustomer(customer: Customer): CustomerDto {
    return {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      dateOfBirth: customer.dateOfBirth.toISOString().split('T')[0],
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      bankAccountNumber: customer.bankAccountNumber,
    };
  }
}
