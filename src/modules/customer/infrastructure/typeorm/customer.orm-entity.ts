import { Entity, Column, PrimaryColumn, Unique, Index } from 'typeorm';

@Entity('customers')
@Unique(['email'])
@Index(['firstName', 'lastName', 'dateOfBirth'], { unique: true })
export class CustomerOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  bankAccountNumber: string;
}
