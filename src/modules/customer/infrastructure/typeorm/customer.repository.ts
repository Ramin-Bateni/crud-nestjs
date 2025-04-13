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

  async create(customer: Customer): Promise<CustomerOrmEntity> {
    const ormCustomer = this.toOrmEntity(customer);
    const saved = await this.repo.save(ormCustomer);
    return saved;
  }

  async findByEmail(email: string): Promise<CustomerOrmEntity | null> {
    const customer = await this.repo.findOneBy({ email });
    return customer;
  }

  async findByIdentity(
    firstName: string,
    lastName: string,
    dob: Date,
  ): Promise<CustomerOrmEntity | null> {
    const customer = await this.repo.findOneBy({
      firstName,
      lastName,
      dateOfBirth: dob,
    });
    return customer;
  }

  async findById(id: string): Promise<CustomerOrmEntity | null> {
    const customer = await this.repo.findOneBy({ id });
    return customer;
  }

  async update(id: string, customer: Customer): Promise<CustomerOrmEntity> {
    const ormCustomer = this.toOrmEntity(customer);
    await this.repo.update(id, ormCustomer);
    return this.repo.findOneByOrFail({ id });
  }

  async findAll(): Promise<CustomerOrmEntity[]> {
    const customers = await this.repo.find();
    return customers;
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
