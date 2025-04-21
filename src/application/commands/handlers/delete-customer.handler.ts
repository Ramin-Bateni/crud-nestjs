import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCustomerCommand } from 'src/application/commands/delete-customer.command';
import { ICustomerRepository } from 'src/domain/repositories/customer.repository.interface';
import { Inject, NotFoundException } from '@nestjs/common';
import { CustomerDeletedEvent } from 'src/domain/events/customer-deleted.event';

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerHandler
  implements ICommandHandler<DeleteCustomerCommand>
{
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteCustomerCommand): Promise<void> {
    const { id } = command;

    const existingCustomer = await this.customerRepository.findById(id);
    if (!existingCustomer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    await this.customerRepository.delete(id);

    this.eventBus.publish(new CustomerDeletedEvent(id));
  }
}
