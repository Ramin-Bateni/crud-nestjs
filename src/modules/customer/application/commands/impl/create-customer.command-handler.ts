// src/modules/customer/application/commands/impl/create-customer.command-handler.ts

import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateCustomerCommand } from "./create-customer.command";
import { ICustomerRepository } from "@/modules/customer/application/interfaces/customer-repository.interface";
import { Customer } from "@/modules/customer/domain/customer.entity";

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerCommandHandler
  implements ICommandHandler<CreateCustomerCommand>
{
  constructor(private readonly repository: ICustomerRepository) {}

  async execute(command: CreateCustomerCommand): Promise<void> {
    const customer = new Customer(
      command.firstName,
      command.lastName,
      command.dateOfBirth,
      command.phoneNumber,
      command.email,
      command.bankAccountNumber
    );

    await this.repository.create(customer);
  }
}
