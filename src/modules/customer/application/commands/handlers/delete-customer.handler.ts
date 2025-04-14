import { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { DeleteCustomerCommand } from '../delete-customer.command';
import { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import { Inject, NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerHandler
  implements ICommandHandler<DeleteCustomerCommand>
{
  constructor(
    @Inject('ICustomerRepository')
    private readonly repository: ICustomerRepository,
  ) {}

  async execute(command: DeleteCustomerCommand): Promise<void> {
    const { id } = command;

    const customer = await this.repository.findById(id);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    await this.repository.delete(id);
  }
}
