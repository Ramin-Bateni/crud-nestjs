import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CustomerCreateInformation,
  CustomerCreateSuccessResponse,
} from '../openapis/create-customer.openapi';
import { CommonResponseOpenApi } from '@/common';

export function CustomerCreateOpenApiDecorator() {
  return applyDecorators(
    ApiOperation(CustomerCreateInformation),
    ApiResponse(CustomerCreateSuccessResponse),
    ApiResponse(CommonResponseOpenApi.InternalServerErrorResponse),
    ApiResponse(CommonResponseOpenApi.ServiceUnavaiableResponse),
    ApiResponse(CommonResponseOpenApi.TooManyRequestResponse),
  );
} 