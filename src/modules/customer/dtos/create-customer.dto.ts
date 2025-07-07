import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Validate,
} from 'class-validator';
import { IsValidPhoneNumber } from '../validators/phone.validator';
import { IsValidBankAccount } from '../validators/bank-account.validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'first name of the customer',
    type: String,
    example: 'John',
    writeOnly: true,
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'last name of the customer',
    type: String,
    example: 'Doe',
    writeOnly: true,
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'date of customer birth',
    type: String,
    example: '2025-07-06T18:58:03.072Z',
    writeOnly: true,
  })
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty({
    description: 'the phone number of the customer',
    type: String,
    example: '+989012883045',
    writeOnly: true,
  })
  @Validate(IsValidPhoneNumber)
  phoneNumber: string;

  @ApiProperty({
    description: 'the email of the customer',
    type: String,
    example: 'arian.press2015@gmail.com',
    writeOnly: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'the bank account of the customer',
    type: String,
    example: 'FR290380000003453283954328',
    writeOnly: true,
  })
  @Validate(IsValidBankAccount)
  bankAccountNumber: string;
}
