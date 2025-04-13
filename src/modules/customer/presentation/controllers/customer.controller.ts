import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCustomerDto } from '../../application/dto/create-customer.dto';
import { CreateCustomerCommand } from '../../application/commands/create-customer.command';
import { ApiTags, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { Customer } from '../../domain/entities/customer.entity';
import { GetCustomersQuery } from '../../application/queries/get-customers.query';
import { GetCustomerQuery } from '../../application/queries/get-customer.query';
import { DeleteCustomerCommand } from '../../application/commands/delete-customer.command';
import { UpdateCustomerCommand } from '../../application/commands/update-customer.command';
import { UpdateCustomerDto } from '../../application/dto/update-customer.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Customer created successfully' })
  @ApiBadRequestResponse({
    description: 'Validation failed or duplicate entry',
  })
  async createCustomer(@Body() dto: CreateCustomerDto): Promise<Customer> {
    const command = new CreateCustomerCommand(dto);
    return await this.commandBus.execute(command);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Customers retrieved successfully' })
  async getCustomers(): Promise<Customer[]> {
    return await this.queryBus.execute(new GetCustomersQuery());
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Customer retrieved successfully' })
  async getCustomer(@Param('id') id: string): Promise<Customer> {
    return await this.queryBus.execute(new GetCustomerQuery(id));
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Customer deleted successfully' })
  async deleteCustomer(@Param('id') id: string): Promise<void> {
    return await this.commandBus.execute(new DeleteCustomerCommand(id));
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Customer updated successfully' })
  async updateCustomer(
    @Param('id') id: string,
    @Body() dto: UpdateCustomerDto,
  ): Promise<Customer> {
    return await this.commandBus.execute(new UpdateCustomerCommand(dto));
  }
}
