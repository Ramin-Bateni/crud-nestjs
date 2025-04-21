import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from 'src/domain/entities/customer.entity';
import { ICustomerRepository } from 'src/domain/repositories/customer.repository.interface';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<Customer> {
    return this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<Customer> {
    return this.repository.findOne({ where: { email } });
  }

  async findByNameAndDob(
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
  ): Promise<Customer> {
    return this.repository.findOne({
      where: {
        firstName,
        lastName,
        dateOfBirth,
      },
    });
  }

  async create(customer: Customer): Promise<Customer> {
    return this.repository.save(customer);
  }

  async update(id: string, customerData: Partial<Customer>): Promise<Customer> {
    await this.repository.update(id, customerData);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
