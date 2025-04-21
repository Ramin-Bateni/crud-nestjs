import { Customer } from 'src/domain/entities/customer.entity';

export interface ICustomerRepository {
  findAll(): Promise<Customer[]>;
  findById(id: string): Promise<Customer>;
  findByEmail(email: string): Promise<Customer>;
  findByNameAndDob(
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
  ): Promise<Customer>;
  create(customer: Customer): Promise<Customer>;
  update(id: string, customer: Partial<Customer>): Promise<Customer>;
  delete(id: string): Promise<void>;
}
