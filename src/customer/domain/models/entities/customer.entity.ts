import { buildSchema, Prop } from '@typegoose/typegoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseSchema } from 'src/common/schema/base.schema';

export class Customer extends BaseSchema {
  @Prop({ type: String, required: true })
  @ApiProperty({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  @ApiProperty({ type: String, required: true })
  lastName: string;

  @Prop({ type: Date, required: true })
  @ApiProperty({ type: Date, required: true })
  dateOfBirth: Date;

  @Prop({ type: String, required: true })
  @ApiProperty({ type: String, required: true })
  phoneNumber: string;

  @Prop({ type: String, required: true, unique: true })
  @ApiProperty({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  @ApiProperty({ type: String, required: true })
  bankAccountNumber: string;

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export type CustomerDocument = Customer & Document;
export const CustomerSchema = buildSchema(Customer); 