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

  @Prop({ required: true, unique: true })
  bankAccountNumber!: string;

  @Prop({ required: true })
  phoneNumber!: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

export type CustomerDocument = Customer & Document;
