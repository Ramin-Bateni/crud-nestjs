import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCustomerQuery } from '../queries/find-customer.query';
import { PaginatedResult } from '../../../common/interfaces/paginated-result.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerModel } from '../models/customer.model';
import { Model } from 'mongoose';

@QueryHandler(FindCustomerQuery)
export class FindCustomerHandler implements IQueryHandler<FindCustomerQuery> {
  constructor(
    @InjectModel(CustomerModel.name)
    private readonly model: Model<CustomerModel>,
  ) {}

  async execute(
    query: FindCustomerQuery,
  ): Promise<PaginatedResult<CustomerModel>> {
    const customers = await this.model
      .find()
      .skip(query.dto.skip)
      .limit(query.dto.take);

    const count = await this.model.countDocuments();

    return {
      data: customers,
      total: count,
      skip: query.dto.skip,
      take: query.dto.take,
    };
  }
}
