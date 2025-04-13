import { ICustomerRepository } from '../../domain/repositories/customer.repository.interface';
import { Customer } from '../../domain/entities/customer.entity';
import { CustomerOrmEntity } from './customer.orm-entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Email } from '../../domain/value-objects/email.vo';
import { PhoneNumber } from '../../domain/value-objects/phone.vo';
import { BankAccountNumber } from '../../domain/value-objects/bank-account.vo';

export class CustomerRepository implements ICustomerRepository {
  constructor(
    @InjectRepository(CustomerOrmEntity)
    private readonly repo: Repository<CustomerOrmEntity>,
  ) {}

  async create(customer: Customer): Promise<Customer> {
    const ormCustomer = this.toOrmEntity(customer);
    const saved = await this.repo.save(ormCustomer);
    return this.toDomainEntity(saved);
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.repo.findOneBy({ email });
    return customer ? this.toDomainEntity(customer) : null;
  }

  async findByIdentity(
    firstName: string,
    lastName: string,
    dob: Date,
  ): Promise<Customer | null> {
    const customer = await this.repo.findOneBy({
      firstName,
      lastName,
      dateOfBirth: dob,
    });
    return customer ? this.toDomainEntity(customer) : null;
  }

  async findAll(): Promise<Customer[]> {
    const customers = await this.repo.find();
    return customers.map((customer) => this.toDomainEntity(customer));
  }

  //  Mapping function
  private toOrmEntity(customer: Customer): CustomerOrmEntity {
    return {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      dateOfBirth: customer.dateOfBirth,
      phoneNumber: customer.phoneNumber.getValue(),
      email: customer.email.getValue(),
      bankAccountNumber: customer.bankAccountNumber.getValue(),
    };
  }

  private toDomainEntity(entity: CustomerOrmEntity): Customer {
    return new Customer(
      entity.id,
      entity.firstName,
      entity.lastName,
      entity.dateOfBirth,
      new Email(entity.email),
      new PhoneNumber(entity.phoneNumber),
      new BankAccountNumber(entity.bankAccountNumber),
    );
  }
}
