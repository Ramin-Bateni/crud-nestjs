import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCustomerCommand } from '../commands/update-customer.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { Repository } from 'typeorm';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler
  implements ICommandHandler<UpdateCustomerCommand>
{
  constructor(
    @InjectRepository(Customer)
    private readonly repo: Repository<Customer>,
  ) {}

  async execute(command: UpdateCustomerCommand): Promise<Customer> {
    const customer = await this.repo.findOne({
      where: { id: command.id },
    });

    if (!customer) throw new Error('Customer not found');

    Object.assign(customer, command.updateDto);

    return await this.repo.save(customer);
  }
}
