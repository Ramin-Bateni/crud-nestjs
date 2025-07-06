import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Unique(['firstName', 'lastName', 'dateOfBirth'])
@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Unique identifier of the customer',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  id: string;

  @ApiProperty({
    description: 'First name of the customer',
    example: 'John',
  })
  @Column()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the customer',
    example: 'Doe',
  })
  @Column()
  lastName: string;

  @ApiProperty({
    description: 'Date of birth of the customer',
    example: '1990-01-01',
    type: String,
    format: 'date',
  })
  @Column({ type: 'date' })
  dateOfBirth: Date;

  @ApiProperty({
    description: 'Phone number in international format',
    example: '+1234567890',
  })
  @Column({ type: 'varchar', length: 15 })
  phoneNumber: string;

  @ApiProperty({
    description: 'Email address of the customer',
    example: 'john.doe@example.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'Bank account number',
    example: '1234567890123456',
  })
  @Column()
  bankAccountNumber: string;
}
