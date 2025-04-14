import { IsString, IsEmail, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MetaDto } from '@/common';

export class GetCustomerUpdateDto {
  @ApiProperty({ 
    type: String,
    example: 'John',
    description: 'Customer first name',
    required: true
  })
  @IsString()
  firstName!: string;

  @ApiProperty({ 
    type: String,
    example: 'Doe',
    description: 'Customer last name',
    required: true
  })
  @IsString()
  lastName!: string;

  @ApiProperty({ 
    type: String,
    example: 'john.doe@example.com',
    description: 'Customer email address',
    required: true
  })
  @IsEmail()
  email!: string;

  @ApiProperty({ 
    type: String,
    example: '+989123456789',
    description: 'Customer phone number',
    required: true
  })
  @IsString()
  phoneNumber!: string;

  @ApiProperty({ 
    type: String,
    example: 'DE89370400440532013000',
    description: 'Customer bank account number',
    required: true
  })
  @IsString()
  bankAccountNumber!: string;

  @ApiProperty({ 
    type: Date,
    example: '1990-01-01',
    description: 'Customer date of birth',
    required: true
  })
  @IsDateString()
  dateOfBirth!: Date;
}

export class GetCustomerId {
  @ApiProperty({ 
    type: String,
    example: '67fd14a483d1b6e718a5eb87',
    description: 'Customer unique identifier'
  })
  @IsString()
  customerId: string;
}

export class GetCustomerDto extends GetCustomerUpdateDto {
  @ApiProperty({ 
    type: String,
    example: '67fd14a483d1b6e718a5eb87',
    description: 'Customer unique identifier'
  })
  id: string;
}

export class GetCustomerUpdateResponseDto {
  @ApiProperty({
    type: GetCustomerDto,
  })
  data!: GetCustomerDto | null;

  @ApiProperty({
    type: MetaDto,
  })
  meta!: MetaDto;
}
    