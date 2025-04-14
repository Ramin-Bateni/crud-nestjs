import { Controller, Post, Body, Headers, Version, Put, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerUseCase } from '../../../application/use-cases/customer.use-case';
import { CustomerCreateDto, CustomerResponseDto } from '../../dto/create-customer.dto';
import { GetCustomerUpdateResponseDto, GetCustomerId, GetCustomerUpdateDto } from '../../dto/update-customer.dto';
import { CustomerCreateOpenApiDecorator, CustomerUpdateOpenApiDecorator } from '../../decorators';
import { GetLanguageDto } from '@/common';

@ApiTags('Customers')
@Controller('v1/customers')
export class V1CustomerController {
  constructor(private readonly customerUseCase: CustomerUseCase) {}

  @Version('1')
  @Post()
  @CustomerCreateOpenApiDecorator()
  public async CustomerCreate(
    @Headers() { language }: GetLanguageDto,
    @Body() createCustomerDto: CustomerCreateDto
  ): Promise<CustomerResponseDto> {
    return this.customerUseCase.CustomerCreate(createCustomerDto, language);
  }

  @Version('1')
  @Put('/:customerId')
  @CustomerUpdateOpenApiDecorator()
  public async CustomerUpdate(
    @Headers() { language }: GetLanguageDto,
    @Param() { customerId }: GetCustomerId,
    @Body() updateCustomerDto: GetCustomerUpdateDto,
  ): Promise<GetCustomerUpdateResponseDto> {
    return this.customerUseCase.CustomerUpdate(customerId, updateCustomerDto, language);
  }
} 