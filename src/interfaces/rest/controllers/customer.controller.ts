import { Controller, Post, Body, Get, Param, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateCustomerCommand } from "src/application/commands/impl/create-customer.command";
import { CreateCustomerDto } from "../dto/customer.dto";
import { GetCustomerQuery } from "src/application/queries/impl/get-customer.query";
import { GetCustomerListQuery } from "src/application/queries/impl/get-customer-list.query";

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

  @Get()
  async getCustomerList(
    @Query('search') search?: string,
    @Query('limit') limit = 10,
    @Query('offset') offset = 0
  ) {
    return this.queryBus.execute(new GetCustomerListQuery(
      { nameContains: search },
      { limit: Number(limit), offset: Number(offset) }
    ));
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