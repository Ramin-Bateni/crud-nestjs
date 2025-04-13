import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCustomerCommand } from '../create-customer.command';
import { ICustomerRepository } from 'src/modules/customer/domain/repositories/customer.repository.interface';
import { Email } from 'src/modules/customer/domain/value-objects/email.vo';
import { PhoneNumber } from 'src/modules/customer/domain/value-objects/phone.vo';
import { BankAccountNumber } from 'src/modules/customer/domain/value-objects/bank-account.vo';
import { Customer } from 'src/modules/customer/domain/entities/customer.entity';
import { v4 as uuidv4 } from 'uuid';
import { Inject } from '@nestjs/common';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler
  implements ICommandHandler<CreateCustomerCommand>
{
  constructor(
    @Inject('ICustomerRepository')
    private readonly repository: ICustomerRepository,
  ) {}

  async execute(command: CreateCustomerCommand): Promise<Customer> {
    const {
      firstName,
      lastName,
      dateOfBirth,
      email,
      phoneNumber,
      bankAccountNumber,
    } = command.dto;

    const existingEmail = await this.repository.findByEmail(email);
    if (existingEmail) {
      throw new Error('Email already exists');
    }

    const existingIdentity = await this.repository.findByIdentity(
      firstName,
      lastName,
      new Date(dateOfBirth),
    );
    if (existingIdentity) {
      throw new Error('Customer with this identity already exists');
    }

    const customer = new Customer(
      uuidv4(),
      firstName,
      lastName,
      new Date(dateOfBirth),
      new Email(email),
      new PhoneNumber(phoneNumber),
      new BankAccountNumber(bankAccountNumber),
    );

    return this.repository.create(customer);
  }
}
