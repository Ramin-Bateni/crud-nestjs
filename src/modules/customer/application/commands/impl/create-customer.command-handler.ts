// src/modules/customer/application/commands/impl/create-customer.command-handler.ts

import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateCustomerCommand } from "./create-customer.command";
import { Customer as DomainCustomer } from "@/modules/customer/domain/customer.entity";
import { Email } from "@/modules/customer/domain/value-objects/email.vo";
import { PhoneNumber } from "@/modules/customer/domain/value-objects/phone-number.vo";
import { BankAccountNumber } from "@/modules/customer/domain/value-objects/bank-account-number.vo";
import { CustomerService } from "../../services/customer.service";

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerCommandHandler
  implements ICommandHandler<CreateCustomerCommand>
{
  constructor(private readonly service: CustomerService) {}

  async execute(command: CreateCustomerCommand): Promise<DomainCustomer> {
    const customer = new DomainCustomer(
      command.firstName,
      command.lastName,
      command.dateOfBirth,
      new PhoneNumber(command.phoneNumber),
      new Email(command.email),
      new BankAccountNumber(command.bankAccountNumber)
    );

    return await this.service.create(customer);
  }
}
