import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Unique(['firstName', 'lastName', 'dateOfBirth'])
@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  // @Column({ type: 'date' })
  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ type: 'varchar', length: 15 })
  phoneNumber: string;

  @Column({ unique: true })
  email: string;

  @Column()
  bankAccountNumber: string;
}
