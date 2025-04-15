import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from '../../models/entities';
import { BaseMongoRepository } from '@/common/repositories';

@Injectable()
export class CustomerMongoRepository extends BaseMongoRepository<CustomerDocument> {
  constructor(@InjectModel(Customer.name, process.env.DATABASE_NAME?.split('/').pop() || 'nestjs_db') readonly customerModel: Model<CustomerDocument>) {
    super(customerModel);
  }
}
