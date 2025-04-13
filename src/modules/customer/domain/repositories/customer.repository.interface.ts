import { CustomerOrmEntity } from '../../infrastructure/typeorm/customer.orm-entity';
import { Customer } from '../entities/customer.entity';

export interface ICustomerRepository {
  create(customer: Customer): Promise<CustomerOrmEntity>;
  findByEmail(email: string): Promise<CustomerOrmEntity | null>;
  findByIdentity(
    firstName: string,
    lastName: string,
    dob: Date,
  ): Promise<CustomerOrmEntity | null>;
  findAll(): Promise<CustomerOrmEntity[]>;
}
