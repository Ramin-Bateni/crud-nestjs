import { buildSchema, Prop } from '@typegoose/typegoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseSchema } from 'src/common/schema/base.schema';
import { IsValidPhoneNumber, IsValidEmail, IsValidBankAccount } from 'src/common/validators';

export class Customer extends BaseSchema {
  @Prop({ type: String, required: true, maxlength: 50 })
  @ApiProperty({ type: String, required: true, maxLength: 50 })
  firstName: string;

  @Prop({ type: String, required: true, maxlength: 50 })
  @ApiProperty({ type: String, required: true, maxLength: 50 })
  lastName: string;

  @Prop({ type: Date, required: true })
  @ApiProperty({ type: Date, required: true })
  dateOfBirth: Date;

  @Prop({ type: String, required: true, match: /^\d+$/, maxlength: 15 })
  @ApiProperty({ type: String, required: true, maxLength: 15 })
  @IsValidPhoneNumber()
  phoneNumber: string;

  @Prop({ type: String, required: true, unique: true, maxlength: 100 })
  @ApiProperty({ type: String, required: true, maxLength: 100 })
  @IsValidEmail()
  email: string;

  @Prop({ type: String, required: true, maxlength: 34 })
  @ApiProperty({ type: String, required: true, maxLength: 34 })
  @IsValidBankAccount()
  bankAccountNumber: string;

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export type CustomerDocument = Customer & Document;
export const CustomerSchema = buildSchema(Customer, {
  schemaOptions: {
    timestamps: true,
    indexes: [
      {
        fields: { firstName: 1, lastName: 1, dateOfBirth: 1 },
        unique: true,
      },
    ],
  } as any,
}); 