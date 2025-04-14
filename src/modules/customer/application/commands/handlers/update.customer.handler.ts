import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCustomerCommand } from '../update-customer.command';
import { ICustomerRepository } from 'src/modules/customer/domain/repositories/customer.repository.interface';
import { Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { CustomerOrmEntity } from '../../../infrastructure/typeorm/customer.orm-entity';
import { Customer } from '../../../domain/entities/customer.entity';
import { Email } from '../../../domain/value-objects/email.vo';
import { PhoneNumber } from '../../../domain/value-objects/phone.vo';
import { BankAccountNumber } from '../../../domain/value-objects/bank-account.vo';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler
  implements ICommandHandler<UpdateCustomerCommand>
{
  constructor(
    @Inject('ICustomerRepository')
    private readonly repository: ICustomerRepository,
  ) {}

  async execute(command: UpdateCustomerCommand): Promise<CustomerOrmEntity> {
    const { id, ...dto } = command.dto;

    const customer = await this.repository.findById(id);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const existingEmail = await this.repository.findByEmail(dto.email);
    if (existingEmail && existingEmail.id !== id) {
      throw new ConflictException('Email already in use');
    }

    const existingIdentity = await this.repository.findByIdentity(
      dto.firstName,
      dto.lastName,
      new Date(dto.dateOfBirth),
    );
    if (existingIdentity && existingIdentity.id !== id) {
      throw new ConflictException('Another customer with same identity exists');
    }

    const domainCustomer = new Customer(
      customer.id,
      dto.firstName,
      dto.lastName,
      new Date(dto.dateOfBirth),
      new Email(dto.email),
      new PhoneNumber(dto.phoneNumber),
      new BankAccountNumber(dto.bankAccountNumber),
    );

    return this.repository.update(id, domainCustomer);
  }
}
