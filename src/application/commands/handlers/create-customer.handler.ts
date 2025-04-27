import { BadRequestException, Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Customer } from "../../../core/domain/customer.entity";
import { ICustomerRepository } from "src/core/repositories/customer.repository.interface";
import { CustomerValidator } from "../../../core/services/customer.validator.service";
import { CreateCustomerCommand } from "../impl/create-customer.command";
import { PhoneValidator } from "../../../infrastructure/validation/phone.validator";

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler implements ICommandHandler<CreateCustomerCommand> {
  constructor(
    @Inject('ICustomerRepository') private readonly repository: ICustomerRepository,
    private readonly validator: CustomerValidator,
    private readonly phoneValidator: PhoneValidator
  ) {}

  async execute(command: CreateCustomerCommand) {
    const customerResult = Customer.create({ ...command, phoneNumber: command.phone }, this.phoneValidator);
    if (customerResult.isFailure) {
      throw new BadRequestException(customerResult.getError());
    }

    await this.validator.validate(customerResult.getValue());
    await this.repository.save(customerResult.getValue());
  }
}