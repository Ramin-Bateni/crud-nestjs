import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CustomerGetInformation,
  CustomerGetSuccessResponse,
  CustomerGetNotFoundResponse,
} from '../openapis/get-customer.openapi';
import { CommonResponseOpenApi } from '@/common';

export function CustomerGetOpenApiDecorator() {
  return applyDecorators(
    ApiOperation(CustomerGetInformation),
    ApiResponse(CustomerGetSuccessResponse),
    ApiResponse(CustomerGetNotFoundResponse),
    ApiResponse(CommonResponseOpenApi.InternalServerErrorResponse),
    ApiResponse(CommonResponseOpenApi.ServiceUnavaiableResponse),
    ApiResponse(CommonResponseOpenApi.TooManyRequestResponse),
  );
} 