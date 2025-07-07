import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCustomerCommand } from '../commands/update-customer.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { Repository } from 'typeorm';
import { CustomerUpdatedEvent } from '../events/customer-updated.event';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler
  implements ICommandHandler<UpdateCustomerCommand>
{
  constructor(
    @InjectRepository(Customer)
    private readonly repo: Repository<Customer>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateCustomerCommand): Promise<Customer> {
    const customer = await this.repo.findOne({
      where: { id: command.id },
    });

    if (!customer) throw new Error('Customer not found');

    Object.assign(customer, command.updateDto);

    this.eventBus.publish(
      new CustomerUpdatedEvent(command.id, command.updateDto),
    );

    return await this.repo.save(customer);
  }
}
