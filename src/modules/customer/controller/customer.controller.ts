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
import { FindCustomerDto } from '../dtos/find-customer.dto';
import { PaginatedResult } from '../../../common/interfaces/paginated-result.interface';
import { FindCustomerQuery } from '../queries/find-customer.query';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ApiPaginatedResponse } from '../../../common/decorators/api-paginated-response.decorator';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({
    summary: 'creates a new customer',
  })
  @ApiBody({
    description: 'body for creating a customer',
    type: CreateCustomerDto,
  })
  @ApiCreatedResponse({
    description: 'returns the created customer',
    type: CustomerDto,
  })
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

  @ApiOperation({
    summary: 'finds customers',
  })
  @ApiQuery({
    description: 'query params for finding customers',
    type: FindCustomerDto,
  })
  @ApiPaginatedResponse({
    description: 'returns found customers',
    type: CustomerDto,
  })
  @Get()
  async find(
    @Body() dto: FindCustomerDto,
  ): Promise<PaginatedResult<CustomerDto>> {
    const query = new FindCustomerQuery(dto);

    const results = await this.queryBus.execute<
      FindCustomerQuery,
      PaginatedResult<Customer>
    >(query);

    return {
      ...results,
      data: results.data.map((item) => CustomerDto.fromCustomer(item)),
    };
  }

  @ApiOperation({
    summary: 'gets a customer',
  })
  @ApiOkResponse({
    description: 'returns the customer',
    type: CustomerDto,
  })
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

  @ApiOperation({
    summary: 'updates a customer',
  })
  @ApiBody({
    description: 'body for updating a customer',
    type: UpdateCustomerDto,
  })
  @ApiOkResponse({
    description: 'returns the updated customer',
    type: CustomerDto,
  })
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

  @ApiOperation({
    summary: 'deletes a new customer',
  })
  @ApiNoContentResponse({
    description: 'deletes the customer',
  })
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    const command = new DeleteCustomerCommand(id);

    await this.commandBus.execute<DeleteCustomerCommand, void>(command);
  }
}
