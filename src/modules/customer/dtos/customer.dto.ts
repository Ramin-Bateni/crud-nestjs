import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../entities/customer.entity';

export class CustomerDto {
  @ApiProperty({
    description: 'the id of the customer',
    type: String,
    example: '68b42f7e-705e-406f-ac18-08b3475dc33f',
    readOnly: true,
  })
  readonly id: string;

  @ApiProperty({
    description: 'first name of the customer',
    type: String,
    example: 'John',
    readOnly: true,
  })
  readonly firstName: string;

  @ApiProperty({
    description: 'last name of the customer',
    type: String,
    example: 'Doe',
    readOnly: true,
  })
  readonly lastName: string;

  @ApiProperty({
    description: 'date of customer birth',
    type: String,
    example: '2025-07-06T18:58:03.072Z',
    readOnly: true,
  })
  readonly dateOfBirth: string;

  @ApiProperty({
    description: 'the email of the customer',
    type: String,
    example: 'arian.press2015@gmail.com',
    readOnly: true,
  })
  readonly email: string;

  @ApiProperty({
    description: 'the phone number of the customer',
    type: String,
    example: '+989012883045',
    readOnly: true,
  })
  readonly phoneNumber: string;

  @ApiProperty({
    description: 'the bank account of the customer',
    type: String,
    example: 'FR290380000003453283954328',
    readOnly: true,
  })
  readonly bankAccountNumber: string;

  static fromCustomer(customer: Customer): CustomerDto {
    return {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      dateOfBirth: customer.dateOfBirth.toISOString().split('T')[0],
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      bankAccountNumber: customer.bankAccountNumber,
    };
  }
}
