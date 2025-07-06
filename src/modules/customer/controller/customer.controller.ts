import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { CreateCustomerCommand } from '../commands/create-customer.command';
import { CustomerDto } from '../dtos/customer.dto';
import { Customer } from '../entities/customer.entity';
import { GetCustomerQuery } from '../queries/get-customer.query';

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
}
