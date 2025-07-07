import { IsEmail, IsOptional, Validate } from 'class-validator';
import { IsValidPhoneNumber } from '../validators/phone.validator';
import { IsValidBankAccount } from '../validators/bank-account.validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCustomerDto {
  @ApiPropertyOptional({
    description: 'the phone number to be updated',
    type: String,
    example: '+989012883045',
    writeOnly: true,
    required: false,
  })
  @IsOptional()
  @Validate(IsValidPhoneNumber)
  phoneNumber?: string;

  @ApiPropertyOptional({
    description: 'the email to be updated',
    type: String,
    example: 'arian.press2015@gmail.com',
    writeOnly: true,
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'the bank account number to be updated',
    type: String,
    example: 'FR290380000003453283954328',
    writeOnly: true,
    required: false,
  })
  @IsOptional()
  @Validate(IsValidBankAccount)
  bankAccountNumber?: string;
}
