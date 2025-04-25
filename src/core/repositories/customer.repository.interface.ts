import { Result } from 'src/interfaces/rest/dto/result.dto';
import { Customer } from '../domain/customer.entity';

export interface ICustomerRepository {
  save(customer: Customer): Promise<Result<void>>;
  delete(id: string): Promise<Result<void>>;
  findById(id: string): Promise<Result<Customer | null>>;

  findByEmail(email: string): Promise<Result<Customer | null>>;
  
  // Composite Uniqueness Check (Firstname+Lastname+DOB)
  existsByUniqueFields(
    firstName: string,
    lastName: string,
    dateOfBirth: Date
  ): Promise<Result<boolean>>;

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