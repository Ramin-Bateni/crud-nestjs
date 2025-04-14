import { Controller, Post, Body,Headers, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerUseCase } from '../../../application/use-cases/customer.use-case';
import { CustomerCreateDto, CustomerResponseDto } from '../../dto/create-customer.dto';
import { CustomerCreateOpenApiDecorator } from '../../decorators';
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
} 