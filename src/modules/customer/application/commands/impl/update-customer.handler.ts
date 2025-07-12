import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject, NotFoundException } from "@nestjs/common";
import {
  I_CUSTOMER_REPOSITORY,
  ICustomerRepository,
} from "@/modules/customer/domain/interfaces/customer-repository.interface";
import { UpdateCustomerCommand } from "./update-customer.command";

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler
  implements ICommandHandler<UpdateCustomerCommand>
{
  constructor(
    @Inject(I_CUSTOMER_REPOSITORY)
    private readonly repo: ICustomerRepository
  ) {}

  async execute(cmd: UpdateCustomerCommand) {
    const updated = await this.repo.updateByEmail(cmd.email, cmd.partial);
    if (!updated) throw new NotFoundException("customer not found");
    return updated;
  }
}
