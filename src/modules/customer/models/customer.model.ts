import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'customers' })
export class CustomerModel extends Document {
  @Prop({ required: true, unique: true })
  uuid: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  dateOfBirth: Date;

  @Prop({ unique: true })
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  bankAccountNumber: string;
}

export const CustomerModelSchema = SchemaFactory.createForClass(CustomerModel);

CustomerModelSchema.index(
  { firstName: 1, lastName: 1, dateOfBirth: 1 },
  { unique: true },
);
