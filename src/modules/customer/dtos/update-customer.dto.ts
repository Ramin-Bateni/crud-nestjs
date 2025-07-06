import { IsEmail, IsOptional, Validate } from 'class-validator';
import { IsValidPhoneNumber } from '../validators/phone.validator';
import { IsValidBankAccount } from '../validators/bank-account.validator';

export class UpdateCustomerDto {
  @IsOptional()
  @Validate(IsValidPhoneNumber)
  phoneNumber?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Validate(IsValidBankAccount)
  bankAccountNumber?: string;
}
