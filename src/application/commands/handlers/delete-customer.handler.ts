import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCustomerCommand } from '../impl/delete-customer.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { ICustomerRepository } from 'src/core/repositories/customer.repository.interface';

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerHandler implements ICommandHandler<DeleteCustomerCommand> {
  constructor(
    @Inject('ICustomerRepository') private readonly repository: ICustomerRepository
  ) {}

  async execute(command: DeleteCustomerCommand): Promise<void> {
    const exists = await this.repository.findById(command.id);
    if (!exists) {
      throw new NotFoundException(`Customer ${command.id} not found`);
    }

    // warning: better to do softDelete
    await this.repository.delete(command.id);
  }
}