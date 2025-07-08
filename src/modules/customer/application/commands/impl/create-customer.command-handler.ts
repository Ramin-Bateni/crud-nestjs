// src/modules/customer/application/commands/impl/create-customer.command-handler.ts

import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateCustomerCommand } from "./create-customer.command";
import { ICustomerRepository } from "@/modules/customer/application/interfaces/customer-repository.interface";
import { Customer } from "@/modules/customer/domain/customer.entity";
import { Email } from "@/modules/customer/domain/value-objects/email.vo";
import { PhoneNumber } from "@/modules/customer/domain/value-objects/phone-number.vo";
import { BankAccountNumber } from "@/modules/customer/domain/value-objects/bank-account-number.vo";

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
      new PhoneNumber(command.phoneNumber),
      new Email(command.email),
      new BankAccountNumber(command.bankAccountNumber)
    );

    await this.repository.create(customer);
  }
}
