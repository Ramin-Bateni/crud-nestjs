import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { Repository } from 'typeorm';
import { FindCustomerQuery } from '../queries/find-customer.query';
import { PaginatedResult } from '../../../common/interfaces/paginated-result.interface';

@QueryHandler(FindCustomerQuery)
export class FindCustomerHandler implements IQueryHandler<FindCustomerQuery> {
  constructor(
    @InjectRepository(Customer)
    private readonly repo: Repository<Customer>,
  ) {}

  async execute(query: FindCustomerQuery): Promise<PaginatedResult<Customer>> {
    const [customers, count] = await this.repo.findAndCount({
      skip: query.dto.skip,
      take: query.dto.take,
    });

    return {
      data: customers,
      total: count,
      skip: query.dto.skip,
      take: query.dto.take,
    };
  }
}
