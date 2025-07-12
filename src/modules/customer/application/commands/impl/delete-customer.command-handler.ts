import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject, NotFoundException } from "@nestjs/common";
import {
  I_CUSTOMER_REPOSITORY,
  ICustomerRepository,
} from "@/modules/customer/domain/interfaces/customer-repository.interface";
import { DeleteCustomerCommand } from "./delete-customer.command";

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerHandler
  implements ICommandHandler<DeleteCustomerCommand>
{
  constructor(
    @Inject(I_CUSTOMER_REPOSITORY)
    private readonly repo: ICustomerRepository
  ) {}

  async execute(cmd: DeleteCustomerCommand): Promise<void> {
    const ok = await this.repo.deleteByEmail(cmd.email);
    if (!ok) throw new NotFoundException("customer not found");
  }
}
