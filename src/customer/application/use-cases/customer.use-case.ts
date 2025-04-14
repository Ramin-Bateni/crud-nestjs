import { Injectable, HttpStatus } from '@nestjs/common';
import { CustomerCreateInterface, NewCustomerCreateResponseInterface, NewCustomerCreateInterface, GetCustomerUpdateInterface, GetCustomerUpdateResponseInterface } from '../interfaces';
import { localization } from '@/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CustomerCreateCommand } from '../services/commands/customer-create/customer-create.handler';
import { CustomerUpdateCommand } from '../services/commands/customer-update/customer-update.handler';
import { LocalizationMessage } from '@/customer/infrastructure/localization';
import { CustomerGetQuery } from '../services/queries/customer-get/customer-get.handler';
import { CustomerListQuery } from '../services/queries/customer-list/customer-list.handler';
import { PageSizePaginationDto } from '@/common/pagination';
import { GetCustomersResponseDto } from '@/customer/presentation/dto/get-customers.dto';

@Injectable()
export class CustomerUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  public async CustomerCreate(newCustomer: CustomerCreateInterface, lang: string): Promise<NewCustomerCreateResponseInterface> {
    try {
        const customer = await this.commandBus.execute(new CustomerCreateCommand(newCustomer, lang));
  
        return {
          data: customer,
          meta: {
            ...localization.message(LocalizationMessage.CUSTOMER_CREATE_SUCCESSFULLY, { lang }),
          },
        };
    } catch (error) {
        if (error?.response?.meta) throw error;
        const errorMessage = localization.message(
          LocalizationMessage.INTERNAL_SERVER_ERROR,
          { lang },
          true,
          HttpStatus.INTERNAL_SERVER_ERROR,
          error,
        );
        return {
          data: null,
          meta: errorMessage,
        };
    }
  }

  public async CustomerUpdate(customerId: string, updateCustomer: GetCustomerUpdateInterface, lang: string): Promise<GetCustomerUpdateResponseInterface> {
    try {
      const customer = await this.commandBus.execute(new CustomerUpdateCommand(customerId, updateCustomer, lang));

      return {
        data: customer,
        meta: {
          ...localization.message(LocalizationMessage.CUSTOMER_UPDATE_SUCCESSFULLY, { lang }),
        },
      };
    } catch (error) {
      console.log(error);
      if (error?.response?.meta) throw error;
      const errorMessage = localization.message(
        LocalizationMessage.INTERNAL_SERVER_ERROR,
        { lang },
        true,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
      return {
        data: null,
        meta: errorMessage,
      };
    }
  }

  public async CustomerGet(customerId: string, lang: string): Promise<GetCustomerUpdateResponseInterface> {
    try {
      const customer = await this.queryBus.execute(new CustomerGetQuery(customerId, lang));

      return {
        data: customer,
        meta: {
          ...localization.message(LocalizationMessage.CUSTOMER_GET_SUCCESSFULLY, { lang }),
        },
      };
    } catch (error) {
      if (error?.response?.meta) throw error;
      const errorMessage = localization.message(
        LocalizationMessage.INTERNAL_SERVER_ERROR,
        { lang },
        true,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
      return {
        data: null,
        meta: errorMessage,
      };
    }
  }

  public async CustomerList(paginationDto: PageSizePaginationDto, lang: string): Promise<GetCustomersResponseDto> {
    try {
      const result = await this.queryBus.execute(new CustomerListQuery(paginationDto, lang));

      return {
        data: result.data,
        meta: {
          ...localization.message(LocalizationMessage.GET_PAGINATION_SUCCESSFULLY, { lang }),
          pagination: result.pagination,
        },
      };
    } catch (error) {
      if (error?.response?.meta) throw error;
      const errorMessage = localization.message(
        LocalizationMessage.INTERNAL_SERVER_ERROR,
        { lang },
        true,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
      return {
        data: [],
        meta: errorMessage,
      };
    }
  }
} 