import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { CreateCustomerCommand } from '../commands/create-customer.command';
import { CustomerDto } from '../dtos/customer.dto';
import { Customer } from '../entities/customer.entity';
import { GetCustomerQuery } from '../queries/get-customer.query';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';
import { UpdateCustomerCommand } from '../commands/update-customer.command';
import { DeleteCustomerCommand } from '../commands/delete-customer.command';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() dto: CreateCustomerDto): Promise<CustomerDto> {
    const command = new CreateCustomerCommand(
      dto.firstName,
      dto.lastName,
      dto.dateOfBirth,
      dto.email,
      dto.phoneNumber,
      dto.bankAccountNumber,
    );

    const customer = await this.commandBus.execute<
      CreateCustomerCommand,
      Customer
    >(command);

    return CustomerDto.fromCustomer(customer);
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<CustomerDto> {
    const query = new GetCustomerQuery(id);

    const customer = await this.queryBus.execute<
      GetCustomerQuery,
      Customer | null
    >(query);

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return CustomerDto.fromCustomer(customer);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCustomerDto,
  ): Promise<CustomerDto> {
    const command = new UpdateCustomerCommand(id, dto);

    const customer = await this.commandBus.execute<
      UpdateCustomerCommand,
      Customer
    >(command);

    return CustomerDto.fromCustomer(customer);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    const command = new DeleteCustomerCommand(id);

    await this.commandBus.execute<DeleteCustomerCommand, void>(command);
  }
}
