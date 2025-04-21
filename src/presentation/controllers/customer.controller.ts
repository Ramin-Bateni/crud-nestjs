import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCustomerDto } from 'src/application/dto/create-customer.dto';
import { UpdateCustomerDto } from 'src/application/dto/update-customer.dto';
import { CreateCustomerCommand } from 'src/application/commands/create-customer.command';
import { UpdateCustomerCommand } from 'src/application/commands/update-customer.command';
import { DeleteCustomerCommand } from 'src/application/commands/delete-customer.command';
import { GetCustomersQuery } from 'src/application/queries/get-customers.query';
import { GetCustomerByIdQuery } from 'src/application/queries/get-customer-by-id.query';
import { Customer } from 'src/domain/entities/customer.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({
    status: 201,
    description: 'The customer has been successfully created.',
    type: Customer,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return this.commandBus.execute(
      new CreateCustomerCommand(createCustomerDto),
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({
    status: 200,
    description: 'Return all customers.',
    type: [Customer],
  })
  async findAll(): Promise<Customer[]> {
    return this.queryBus.execute(new GetCustomersQuery());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the customer.',
    type: Customer,
  })
  @ApiResponse({ status: 400, description: 'Invalid UUID format.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Customer> {
    return this.queryBus.execute(new GetCustomerByIdQuery(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a customer' })
  @ApiResponse({
    status: 200,
    description: 'The customer has been successfully updated.',
    type: Customer,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.commandBus.execute(
      new UpdateCustomerCommand(id, updateCustomerDto),
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a customer' })
  @ApiResponse({
    status: 200,
    description: 'The customer has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Invalid UUID format.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.commandBus.execute(new DeleteCustomerCommand(id));
  }
}
