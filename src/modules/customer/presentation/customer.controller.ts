import { Body, Controller, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateCustomerCommand } from "@/modules/customer/application/commands/impl/create-customer.command";

@Controller("customers")
export class CustomerController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: any): Promise<{ email: string }> {
    await this.commandBus.execute(
      new CreateCustomerCommand(
        body.firstName,
        body.lastName,
        new Date(body.dateOfBirth),
        body.phoneNumber,
        body.email,
        body.bankAccountNumber
      )
    );
    return { email: body.email };
  }
}
