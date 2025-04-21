import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { PhoneNumberValidator } from 'src/infrastructure/validators/phone-number.validator';
import { BankAccountValidator } from 'src/infrastructure/validators/bank-account.validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ example: 'John', description: 'Customer first name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Customer last name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: '1990-01-01', description: 'Customer date of birth' })
  @IsString()
  @IsNotEmpty()
  dateOfBirth: string;

  @ApiProperty({ example: '+1234567890', description: 'Customer phone number' })
  @IsString()
  @IsNotEmpty()
  @Validate(PhoneNumberValidator)
  phoneNumber: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Customer email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '123456789012',
    description: 'Customer bank account number',
  })
  @IsString()
  @IsNotEmpty()
  @Validate(BankAccountValidator)
  bankAccountNumber: string;
}
