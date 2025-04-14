import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CustomerListInformation,
  CustomerListSuccessResponse,
  CustomerListBadRequestResponse,
} from '../openapis';
import { CommonResponseOpenApi } from '@/common';

export function CustomerListOpenApiDecorator() {
  return applyDecorators(
    ApiOperation(CustomerListInformation),
    ApiResponse(CustomerListSuccessResponse),
    ApiResponse(CustomerListBadRequestResponse),
    ApiResponse(CommonResponseOpenApi.InternalServerErrorResponse),
    ApiResponse(CommonResponseOpenApi.ServiceUnavaiableResponse),
    ApiResponse(CommonResponseOpenApi.TooManyRequestResponse),
  );
} 