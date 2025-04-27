import { Controller, Post, Body, Get, Param, Query, Patch, Delete, HttpCode } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateCustomerCommand } from "src/application/commands/impl/create-customer.command";
import { CreateCustomerDto, UpdateCustomerDto } from "../dto/customer.dto";
import { GetCustomerQuery } from "src/application/queries/impl/get-customer.query";
import { GetCustomerListQuery } from "src/application/queries/impl/get-customer-list.query";
import { UpdateCustomerCommand } from "src/application/commands/impl/update-customer.command";
import { DeleteCustomerCommand } from "src/application/commands/impl/delete-customer.command";

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
  
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCustomerDto
  ) {
    await this.commandBus.execute(
      new UpdateCustomerCommand(
        id,
        dto.firstName,
        dto.lastName,
        dto.phone,
        dto.email,
        dto.bankAccountNumber
      )
    );
    return { status: 'success' };
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.commandBus.execute(new DeleteCustomerCommand(id));
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