import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customers')
export class CustomerOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ type: 'date', name: 'date_of_birth' })
  dateOfBirth: Date;

  @Column({ 
    name: 'phone_number',
    type: 'varchar',
    length: 15 // Optimized storage for E.164 format
  })
  phoneNumber: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'bank_account_number' })
  bankAccountNumber: string;
}