import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { CustomerMongoRepository } from '../../../../domain/services/repositories';
import { localization, Validation } from 'src/common';
import { CustomerGetQuery } from './customer-get.handler';
import { GetCustomerResponseInterface } from '@/customer/application/interfaces';
import { GetCustomerMap } from '@/customer/application/map';
import { LocalizationMessage } from '@/customer/infrastructure/localization';
import { HttpStatus } from '@nestjs/common';

@QueryHandler(CustomerGetQuery)
export class CustomerGetHandler implements IQueryHandler<CustomerGetQuery> {
  constructor(
    private readonly customerMongoRepository: CustomerMongoRepository,
  ) {}

  async execute(query: CustomerGetQuery): Promise<GetCustomerResponseInterface> {
    const lang = query.lang;
    const customerId = query.customerId;

    try {
      if (!Validation.IsMongoId(customerId)) {
        throw {
          ...localization.message(LocalizationMessage.VALIDATE_OBJECT_ID, { lang }, true, HttpStatus.BAD_REQUEST),
        };
      }
    } catch (error) {
      if (error?.response?.meta) throw error;
    }

    const customer = await this.customerMongoRepository.FindOne({
      _id: customerId,
    });

    if (!customer) {
      throw {
        ...localization.message(LocalizationMessage.CUSTOMER_NOT_FOUND, { lang }, true, HttpStatus.NOT_FOUND),
      };
    }

    return GetCustomerMap.item(customer) as Promise<GetCustomerResponseInterface>;
  }
} 