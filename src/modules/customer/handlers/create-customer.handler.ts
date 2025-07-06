import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCustomerCommand } from '../commands/create-customer.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler
  implements ICommandHandler<CreateCustomerCommand>
{
  constructor(
    @InjectRepository(Customer)
    private readonly repo: Repository<Customer>,
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

    return await this.repo.save(customer);
  }
}
