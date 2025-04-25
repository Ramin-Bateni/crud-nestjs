import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateCustomerCommand } from "src/application/commands/create-customer.command";
import { CreateCustomerDto } from "../dto/customer.dto";
import { GetCustomerQuery } from "src/application/queries/impl/get-customer.query";

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Get(':id')
  async getCustomer(@Param('id') id: string) {
    return this.queryBus.execute(new GetCustomerQuery(id));
  }
  
  @Post()
  async create(@Body() dto: CreateCustomerDto) {
    const command = new CreateCustomerCommand(
      dto.firstName,
      dto.lastName,
      new Date(dto.dateOfBirth),
      dto.phoneNumber,
      dto.email,
      dto.bankAccountNumber
    );
    
    return this.commandBus.execute(command);
  }
}