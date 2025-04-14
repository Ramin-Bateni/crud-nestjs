import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CustomerDeleteInformation,
  CustomerDeleteSuccessResponse,
  CustomerDeleteNotFoundResponse,
  CustomerDeleteBadRequestResponse,
} from '../openapis';
import { CommonResponseOpenApi } from '@/common';

export function CustomerDeleteOpenApiDecorator() {
  return applyDecorators(
    ApiOperation(CustomerDeleteInformation),
    ApiResponse(CustomerDeleteSuccessResponse),
    ApiResponse(CustomerDeleteNotFoundResponse),
    ApiResponse(CustomerDeleteBadRequestResponse),
    ApiResponse(CommonResponseOpenApi.InternalServerErrorResponse),
    ApiResponse(CommonResponseOpenApi.ServiceUnavaiableResponse),
    ApiResponse(CommonResponseOpenApi.TooManyRequestResponse),
  );
} 