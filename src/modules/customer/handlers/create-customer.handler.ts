import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateCustomerCommand } from '../commands/create-customer.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { CustomerCreatedEvent } from '../events/customer-created.event';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler
  implements ICommandHandler<CreateCustomerCommand>
{
  constructor(
    @InjectRepository(Customer)
    private readonly repo: Repository<Customer>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateCustomerCommand): Promise<Customer> {
    const { firstName, lastName, dateOfBirth, email } = command;

    const existing = await this.repo.findOne({
      where: [
        { email },
        { firstName, lastName, dateOfBirth: new Date(dateOfBirth) },
      ],
    });

    if (existing) {
      throw new ConflictException('Customer already exists');
    }

    const customer = this.repo.create({
      ...command,
      dateOfBirth: new Date(dateOfBirth),
    });

    const result = await this.repo.save(customer);

    this.eventBus.publish(
      new CustomerCreatedEvent(
        result.id,
        result.firstName,
        result.lastName,
        result.dateOfBirth,
        result.email,
        result.phoneNumber,
        result.bankAccountNumber,
      ),
    );

    return result;
  }
}
