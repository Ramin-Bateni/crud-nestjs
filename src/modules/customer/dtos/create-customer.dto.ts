import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Validate,
} from 'class-validator';
import { IsValidPhoneNumber } from '../validators/phone.validator';
import { IsValidBankAccount } from '../validators/bank-account.validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDateString()
  dateOfBirth: string;

  @Validate(IsValidPhoneNumber)
  phoneNumber: string;

  @IsEmail()
  email: string;

  @Validate(IsValidBankAccount)
  bankAccountNumber: string;
}
