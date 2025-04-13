import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCustomerDto } from '../../application/dto/create-customer.dto';
import { CreateCustomerCommand } from '../../application/commands/create-customer.command';
import { ApiTags, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { Customer } from '../../domain/entities/customer.entity';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  // @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiResponse({ status: 201, description: 'Customer created successfully' })
  @ApiBadRequestResponse({
    description: 'Validation failed or duplicate entry',
  })
  async createCustomer(@Body() dto: CreateCustomerDto): Promise<Customer> {
    const command = new CreateCustomerCommand(dto);
    return await this.commandBus.execute(command);
  }
}
