import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetCustomersResponseDto } from '../dto/get-customers.dto';
import { PageSizePaginationDto } from '@/common/pagination';

export function CustomerListOpenApiDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get paginated list of customers',
      description: 'Returns a paginated list of customers with metadata',
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully retrieved customers list',
      type: GetCustomersResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request',
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error',
    }),
  );
} 