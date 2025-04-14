import { ApiProperty } from '@nestjs/swagger';
import { GetCustomerDto } from './get-customer.dto';
import { PaginatedResponse } from '@/common/pagination';

export class GetCustomersResponseDto extends PaginatedResponse<GetCustomerDto> {} 