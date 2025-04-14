import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CustomerMongoFactory } from '../../../../domain/services/factories';
import { localization } from '@common';
import { CustomerMongoRepository } from '../../../../domain/services/repositories';
import { CustomerCreateCommand } from './customer-create.handler';
import { NewCustomerCreateInterface } from '@/customer/application/interfaces';
import { NewCustomerMap } from '@/customer/application/map';
import { LocalizationMessage } from '@/customer/infrastructure/localization';
import { HttpStatus } from '@nestjs/common';
import { CustomerValidator } from '@/common/validators/customer.validator';

@CommandHandler(CustomerCreateCommand)
export class CustomerCreateHandler implements ICommandHandler<CustomerCreateCommand> {
  constructor(
    private readonly customerMongoRepository: CustomerMongoRepository,
    private readonly customerMongoFactory: CustomerMongoFactory,
    private readonly validator: CustomerValidator,
  ) {}

  async execute(command: CustomerCreateCommand): Promise<NewCustomerCreateInterface> {
    const lang = command.lang;

    const validatedData = {
      ...command.customer,
      dateOfBirth: this.validator.validateDateOfBirth(command.customer.dateOfBirth),
    };
    
    this.validator.validateCustomerData(validatedData);

    const isExistEmail = await this.IsExistEmail(command);

    if (isExistEmail) {
      throw {
        ...localization.message(LocalizationMessage.CUSTOMER_EMAIL_ALREADY_EXISTS, { lang }, true, HttpStatus.BAD_REQUEST),
      };
    }

    const isExistCustomer = await this.IsExistCustomer(command);

    if (isExistCustomer) {
      throw {
        ...localization.message(LocalizationMessage.CUSTOMER_ALREADY_EXISTS, { lang }, true, HttpStatus.BAD_REQUEST),
      };
    }

    const customer = await this.customerMongoFactory.Create(validatedData);

    const data = (await NewCustomerMap.item(customer)) as NewCustomerCreateInterface;
    
    return data;
  }

  private async IsExistEmail(customer: CustomerCreateCommand): Promise<boolean> {
    const isExist = await this.customerMongoRepository.IsExist({
      email: customer.customer.email.toLowerCase(),
    });

    return isExist;
  }

  private async IsExistCustomer(customer: CustomerCreateCommand): Promise<boolean> {
    const isExist = await this.customerMongoRepository.IsExist({
      firstName: customer.customer.firstName,
      lastName: customer.customer.lastName,
      dateOfBirth: customer.customer.dateOfBirth,
    });

    return isExist;
  }
}
