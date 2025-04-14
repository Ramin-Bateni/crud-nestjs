import { IsString, IsEmail, IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MetaDto } from '@/common';

export class CustomerCreateDto {
  @ApiProperty({ 
    type: String,
    example: 'John',
    description: 'Customer first name' 
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ 
    type: String,
    example: 'Doe',
    description: 'Customer last name' 
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ 
    type: String,
    example: 'john.doe@example.com',
    description: 'Customer email address' 
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ 
    type: String,
    example: '+989123456789',
    description: 'Customer phone number' 
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ 
    type: String,
    example: 'DE89370400440532013000',
    description: 'Customer bank account number' 
  })
  @IsString()
  @IsNotEmpty()
  bankAccountNumber: string; 

  @ApiProperty({ 
    type: Date,
    example: '1990-01-01',
    description: 'Customer date of birth' 
  })
  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: Date;
} 

export class NewCustomerDto extends CustomerCreateDto {
  @ApiProperty({ 
    type: String,
    example: '123e4567e89b12d3a456426614174000',
    description: 'Customer unique identifier'
  })
  id: string;
} 

export class CustomerResponseDto {
    @ApiProperty({
      type: NewCustomerDto,
    })
    data!: NewCustomerDto | null;
  
    @ApiProperty({
      type: MetaDto,
    })
    meta!: MetaDto;
}
  