import { Customer } from '../domain/customer.entity';

export interface ICustomerRepository {
  save(customer: Customer): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Customer | null>;

  findByEmail(email: string): Promise<Customer | null>;
  existsByEmail(email: string): Promise<boolean>;
  
  // Composite Uniqueness Check (Firstname+Lastname+DOB)
  existsByUniqueFields(
    firstName: string,
    lastName: string,
    dateOfBirth: Date
  ): Promise<boolean>;

  findAll(
    filters?: {
      nameContains?: string;
    },
    pagination?: {
      limit: number;
      offset: number;
    }
  ): Promise<[Customer[], number]>;
}