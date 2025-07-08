// src/modules/customer/application/commands/impl/create-customer.command-handler.ts

import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateCustomerCommand } from "./create-customer.command";
import { ICustomerRepository } from "@/modules/customer/application/interfaces/customer-repository.interface";

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerCommandHandler
  implements ICommandHandler<CreateCustomerCommand>
{
  constructor(private readonly repository: ICustomerRepository) {}

  async execute(command: CreateCustomerCommand): Promise<void> {
    // TODO: Not implemented yet
  }
}
