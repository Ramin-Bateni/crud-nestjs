import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { CustomerResponseDto } from '../dto/create-customer.dto';

export const CustomerCreateInformation: ApiOperationOptions = {
  summary: 'Create a new customer',
  description: 'Create a new customer with the provided information',
};

export const CustomerCreateSuccessResponse: ApiResponseOptions = {
  status: HttpStatus.CREATED,
  description: 'Customer has been created successfully',
  type: CustomerResponseDto,
}; 