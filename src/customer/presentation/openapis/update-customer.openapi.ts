import { ApiOperationOptions, ApiResponseOptions, ApiParamOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { CustomerResponseDto } from '../dto/create-customer.dto';

export const CustomerUpdateInformation: ApiOperationOptions = {
  summary: 'Update an existing customer',
  description: 'Update an existing customer with the provided information',
};

export const CustomerUpdateSuccessResponse: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Customer has been updated successfully',
  type: CustomerResponseDto,
};

export const CustomerUpdateNotFoundResponse: ApiResponseOptions = {
  status: HttpStatus.NOT_FOUND,
  description: 'Customer not found',
  type: CustomerResponseDto,
}; 