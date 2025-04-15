import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { CustomerMongoRepository } from '../../../../domain/services/repositories';
import { GetCustomersMap } from '@/customer/application/map';
import { SortEnum } from '@/common/enum';
import { CustomerListQuery } from './customer-list.handler';

@QueryHandler(CustomerListQuery)
export class CustomerListHandler implements IQueryHandler<CustomerListQuery> {
  constructor(
    private readonly customerMongoRepository: CustomerMongoRepository,
  ) {}

  async execute(query: CustomerListQuery) {
    const { paginationDto } = query;
    const { page, size } = paginationDto;

    const result = await this.customerMongoRepository.PageSizePagination(
      {},
      page,
      size,
      'created_at',
      SortEnum.DESC,
    );

    const mappedData = await GetCustomersMap.items(result.data);

    return {
      data: mappedData,
      pagination: result.pagination,
    };
  }
} 