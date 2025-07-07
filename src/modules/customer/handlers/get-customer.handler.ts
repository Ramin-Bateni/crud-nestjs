import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCustomerQuery } from '../queries/get-customer.query';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerModel } from '../models/customer.model';
import { Model } from 'mongoose';

@QueryHandler(GetCustomerQuery)
export class GetCustomerHandler implements IQueryHandler<GetCustomerQuery> {
  constructor(
    @InjectModel(CustomerModel.name)
    private readonly model: Model<CustomerModel>,
  ) {}

  async execute(query: GetCustomerQuery): Promise<CustomerModel | null> {
    const customer = await this.model.findOne({ uuid: query.id });

    return customer;
  }
}
