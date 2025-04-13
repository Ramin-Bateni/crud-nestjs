import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from '../../models/entities';
import { BaseMongoFactory } from '@/common/factories';

@Injectable()
export class CustomerMongoFactory extends BaseMongoFactory<CustomerDocument> {
  constructor(@InjectModel(Customer.name, process.env.DATABASE_NAME?.split('/').pop() || 'nestjs_db') readonly customerModel: Model<CustomerDocument>) {
    super(customerModel);
  }
}
