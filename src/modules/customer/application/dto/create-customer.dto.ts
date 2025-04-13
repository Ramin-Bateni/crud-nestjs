import {
  IsString,
  IsEmail,
  IsDateString,
  Matches,
  Length,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDateString()
  dateOfBirth: string;

  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone must be a valid E.164 number',
  })
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 20)
  bankAccountNumber: string;
}
