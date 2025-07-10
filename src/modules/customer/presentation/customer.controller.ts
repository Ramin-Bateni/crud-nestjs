import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { Customer } from "../domain/customer.entity";
import { CustomerService } from "../application/services/customer.service";
import { CreateCustomerCommand } from "@/modules/customer/application/commands/impl/create-customer.command";

@Controller("customers")
export class CustomerController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly customerService: CustomerService
  ) {}

  /**
   * Create a new customer
   * @param body customer data
   * @returns
   */
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

  @Get()
  async findAll(): Promise<Customer[]> {
    // Return all customers via service
    return this.customerService.findAll();
  }
}
