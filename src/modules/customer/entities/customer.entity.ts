import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('customers')
@Unique(['firstName', 'lastName', 'dateOfBirth'])
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 64 })
  firstName: string;

  @Column({ type: 'varchar', length: 64 })
  lastName: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ type: 'varchar', length: 13 })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 64, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 32 })
  bankAccountNumber: string;
}
