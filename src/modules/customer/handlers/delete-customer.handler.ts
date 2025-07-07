import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCustomerCommand } from '../commands/delete-customer.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { Repository } from 'typeorm';
import { CustomerDeletedEvent } from '../events/customer-deleted.event';

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerHandler
  implements ICommandHandler<DeleteCustomerCommand>
{
  constructor(
    @InjectRepository(Customer)
    private readonly repo: Repository<Customer>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteCustomerCommand): Promise<void> {
    await this.repo.delete({ id: command.id });

    this.eventBus.publish(new CustomerDeletedEvent(command.id));
  }
}
