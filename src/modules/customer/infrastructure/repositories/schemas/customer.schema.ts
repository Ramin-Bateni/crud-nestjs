import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Customer extends Document {
  @Prop({ required: true })
  firstName!: string;

  @Prop({ required: true })
  lastName!: string;

  @Prop({ required: true })
  dateOfBirth!: Date;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  bankAccountNumber!: string;

  @Prop({ required: true })
  phoneNumber!: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.index(
  { firstName: 1, lastName: 1, dateOfBirth: 1 },
  { unique: true, name: "unique-customer_idx" }
);
CustomerSchema.index({ email: 1 }, { unique: true, name: "unique-email_idx" });

export type CustomerDocument = Customer & Document;
