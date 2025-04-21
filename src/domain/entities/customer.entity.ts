import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('customers')
@Unique(['firstName', 'lastName', 'dateOfBirth'])
@Unique(['email'])
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ type: 'varchar', length: 30 })
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  bankAccountNumber: string;
}
