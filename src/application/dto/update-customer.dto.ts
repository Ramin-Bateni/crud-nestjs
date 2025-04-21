import { IsEmail, IsOptional, IsString, Validate } from 'class-validator';
import { PhoneNumberValidator } from 'src/infrastructure/validators/phone-number.validator';
import { BankAccountValidator } from 'src/infrastructure/validators/bank-account.validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCustomerDto {
  @ApiProperty({
    example: 'John',
    description: 'Customer first name',
    required: false,
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Customer last name',
    required: false,
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Customer date of birth',
    required: false,
  })
  @IsString()
  @IsOptional()
  dateOfBirth?: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Customer phone number',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Validate(PhoneNumberValidator)
  phoneNumber?: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Customer email',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: '123456789012',
    description: 'Customer bank account number',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Validate(BankAccountValidator)
  bankAccountNumber?: string;
}
