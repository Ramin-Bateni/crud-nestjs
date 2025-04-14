import { Injectable, HttpStatus } from '@nestjs/common';
import { CustomerCreateInterface, NewCustomerCreateResponseInterface, NewCustomerCreateInterface } from '../interfaces';
import { localization } from '@/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CustomerCreateCommand } from '../services/commands';
import { LocalizationMessage } from '@/customer/infrastructure/localization';

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
} 