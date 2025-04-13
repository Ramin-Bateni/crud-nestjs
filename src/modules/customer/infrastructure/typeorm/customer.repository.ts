import { ICustomerRepository } from '../../domain/repositories/customer.repository.interface';
import { Customer } from '../../domain/entities/customer.entity';
import { CustomerOrmEntity } from './customer.orm-entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class CustomerRepository implements ICustomerRepository {
  constructor(
    @InjectRepository(CustomerOrmEntity)
    private readonly repo: Repository<CustomerOrmEntity>,
  ) {}
  create(customer: Customer): Promise<Customer> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<Customer | null> {
    throw new Error('Method not implemented.');
  }
  findByIdentity(
    firstName: string,
    lastName: string,
    dob: Date,
  ): Promise<Customer | null> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Customer[]> {
    throw new Error('Method not implemented.');
  }
}
