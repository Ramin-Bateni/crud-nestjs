import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CustomerUpdateInformation,
  CustomerUpdateSuccessResponse,
  CustomerUpdateNotFoundResponse,
} from '../openapis';
import { CommonResponseOpenApi } from '@/common';

export function CustomerUpdateOpenApiDecorator() {
  return applyDecorators(
    ApiOperation(CustomerUpdateInformation),
    ApiResponse(CustomerUpdateSuccessResponse),
    ApiResponse(CustomerUpdateNotFoundResponse),
    ApiResponse(CommonResponseOpenApi.InternalServerErrorResponse),
    ApiResponse(CommonResponseOpenApi.ServiceUnavaiableResponse),
    ApiResponse(CommonResponseOpenApi.TooManyRequestResponse),
  );
} 