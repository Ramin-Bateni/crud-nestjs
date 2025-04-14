import { ApiProperty } from '@nestjs/swagger';
import { CreateCustomerDto } from './create-customer.dto';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
export class UpdateCustomerDto extends CreateCustomerDto {
  @ApiProperty({
    description: 'The id of the customer',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
