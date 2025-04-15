import { Controller, Post, Body, Headers, Version, Put, Param, Get, Query, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerUseCase } from '../../../application/use-cases/customer.use-case';
import { CustomerCreateDto, CustomerResponseDto } from '../../dto/create-customer.dto';
import { GetCustomerUpdateResponseDto, GetCustomerId, GetCustomerUpdateRequestDto } from '../../dto/update-customer.dto';
import { CustomerCreateOpenApiDecorator, CustomerUpdateOpenApiDecorator, CustomerGetOpenApiDecorator, CustomerListOpenApiDecorator, CustomerDeleteOpenApiDecorator } from '../../decorators';
import { GetLanguageDto } from '@/common';
import { GetCustomerResponseDto } from '../../dto';
import { GetCustomersResponseDto } from '../../dto/get-customers.dto';
import { PageSizePaginationDto } from '@/common/pagination';
import { DeleteCustomerResponseDto } from '../../dto/delete-customer.dto';

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
    @Body() updateCustomerDto: GetCustomerUpdateRequestDto,
  ): Promise<GetCustomerUpdateResponseDto> {
    return this.customerUseCase.CustomerUpdate(customerId, updateCustomerDto, language);
  }

  @Version('1')
  @Get('/:customerId')
  @CustomerGetOpenApiDecorator()
  public async CustomerGet(
    @Headers() { language }: GetLanguageDto,
    @Param() { customerId }: GetCustomerId,
  ): Promise<GetCustomerResponseDto> {
    return this.customerUseCase.CustomerGet(customerId, language);
  }

  @Version('1')
  @Get()
  @CustomerListOpenApiDecorator()
  public async CustomerList(
    @Headers() { language }: GetLanguageDto,
    @Query() paginationDto: PageSizePaginationDto,
  ): Promise<GetCustomersResponseDto> {
    return this.customerUseCase.CustomerList(paginationDto, language);
  }

  @Version('1')
  @Delete('/:customerId')
  @CustomerDeleteOpenApiDecorator()
  public async CustomerDelete(
    @Headers() { language }: GetLanguageDto,
    @Param() { customerId }: GetCustomerId,
  ): Promise<DeleteCustomerResponseDto> {
    return this.customerUseCase.CustomerDelete(customerId, language);
  }
} 