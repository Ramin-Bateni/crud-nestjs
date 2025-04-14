import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CustomerMongoRepository } from '../../../../domain/services/repositories';
import { localization, Validation } from 'src/common';
import { CustomerUpdateCommand } from './customer-update.handler';
import { NewCustomerCreateInterface } from '@/customer/application/interfaces';
import { GetCustomerMap } from '@/customer/application/map';
import { LocalizationMessage } from '@/customer/infrastructure/localization';
import { HttpStatus } from '@nestjs/common';
import { CustomerValidator } from '@/common/validators/customer.validator';
import { CustomerDocument } from '@/customer/domain/models/entities';

@CommandHandler(CustomerUpdateCommand)
export class CustomerUpdateHandler implements ICommandHandler<CustomerUpdateCommand> {
  constructor(
    private readonly customerMongoRepository: CustomerMongoRepository,
    private readonly validator: CustomerValidator,
  ) {}

  async execute(command: CustomerUpdateCommand): Promise<NewCustomerCreateInterface> {
    const lang = command.lang;
    const customerId = command.customerId;

    if (!Validation.IsMongoId(customerId)) {
      throw {
        ...localization.message(LocalizationMessage.VALIDATE_OBJECT_ID, { lang }, true, HttpStatus.BAD_REQUEST),
      };
    }

    const existingCustomer = await this.customerMongoRepository.FindOne({
        _id: customerId,
    });
    if (!existingCustomer) {
      throw {
        ...localization.message(LocalizationMessage.CUSTOMER_NOT_FOUND, { lang }, true, HttpStatus.NOT_FOUND),
      };
    }

    const updateData = { ...command.customer };

    if (Object.keys(updateData).length === 0) {
      throw {
        ...localization.message(LocalizationMessage.NO_UPDATE_DATA_PROVIDED, { lang }, true, HttpStatus.BAD_REQUEST),
      };
    }

    if (updateData.email && updateData.email !== existingCustomer.email) {
      const isEmailExists = await this.customerMongoRepository.IsExist({
        email: updateData.email.toLowerCase(),
      });
      if (isEmailExists) {
        throw {
          ...localization.message(LocalizationMessage.CUSTOMER_EMAIL_ALREADY_EXISTS, { lang }, true, HttpStatus.BAD_REQUEST),
        };
      }
    }

    if (updateData.dateOfBirth) {
      updateData.dateOfBirth = this.validator.validateDateOfBirth(updateData.dateOfBirth);
    }

    this.validator.validateCustomerData(updateData);

    const updatedCustomer = await this.customerMongoRepository.UpdateById(customerId, updateData) as CustomerDocument;
    const data = (await GetCustomerMap.item(updatedCustomer)) as NewCustomerCreateInterface;

    return data;
  }
} 