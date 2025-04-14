import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { GetCustomerUpdateResponseDto } from '../dto/update-customer.dto';

export const CustomerGetInformation: ApiOperationOptions = {
  summary: 'Get a customer by ID',
  description: 'Retrieve a customer\'s information by their unique identifier',
};

export const CustomerGetSuccessResponse: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Customer has been retrieved successfully',
  type: GetCustomerUpdateResponseDto,
};

export const CustomerGetNotFoundResponse: ApiResponseOptions = {
  status: HttpStatus.NOT_FOUND,
  description: 'Customer not found',
  type: GetCustomerUpdateResponseDto,
}; 