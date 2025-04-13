import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsDateString,
  Matches,
  Length,
} from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'The first name of the customer',
    example: 'John',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'The last name of the customer',
    example: 'Doe',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'The date of birth of the customer',
    example: '1990-01-01',
  })
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty({
    description: 'The phone number of the customer',
    example: '+1234567890',
  })
  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone must be a valid E.164 number',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'The email of the customer',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The bank account number of the customer',
    example: '1234567890',
  })
  @IsString()
  @Length(8, 20)
  bankAccountNumber: string;
}
