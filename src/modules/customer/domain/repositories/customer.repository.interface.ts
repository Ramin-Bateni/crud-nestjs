import { Customer } from '../entities/customer.entity';

export interface ICustomerRepository {
  create(customer: Customer): Promise<Customer>;
  findByEmail(email: string): Promise<Customer | null>;
  findByIdentity(
    firstName: string,
    lastName: string,
    dob: Date,
  ): Promise<Customer | null>;
  findAll(): Promise<Customer[]>;
}
